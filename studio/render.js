/* Rendu image par image avec Chromium.
   node render.js <dossier vidéo> meta            → build/meta.json (plans, scènes, événements sonores)
   node render.js <dossier vidéo> sheet           → planche de contrôle (une image par plan)
   node render.js <dossier vidéo> scene <n> [...] → encode les scènes demandées
   node render.js <dossier vidéo> all             → toutes les scènes en parallèle, puis assemblage */
const { chromium } = require('playwright');
const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.resolve(process.argv[2]);
const cmd = process.argv[3] || 'meta';
const build = path.join(dir, 'build');
fs.mkdirSync(path.join(build, 'scenes'), { recursive: true });
const FPS = 30;

async function open() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => { console.error('ERREUR PAGE', e.message); process.exitCode = 1; });
  await page.goto('file://' + path.join(__dirname, 'player.html'));
  await page.addScriptTag({ path: path.join(dir, 'plans.js') });
  const data = JSON.parse(fs.readFileSync(path.join(dir, 'mots.json'), 'utf8'));
  const meta = await page.evaluate(async d => { V.grain(); const m = V.setup(d); await document.fonts.ready; renderAt(0); return m; }, data);
  await page.evaluate(() => Promise.all([document.fonts.load('200px Anton'), document.fonts.load('800 60px InterX'), document.fonts.load('900 60px InterX')]));
  fs.writeFileSync(path.join(build, 'meta.json'), JSON.stringify(meta, null, 1));
  return { browser, page, meta };
}

async function sheet() {
  const { browser, page, meta } = await open();
  const out = path.join(build, 'planche'); fs.mkdirSync(out, { recursive: true });
  for (const s of meta.shots) {
    const t = Math.max(s.t0, s.t1 - 0.2);
    await page.evaluate(([t, label]) => {
      renderAt(t);
      let l = document.getElementById('lbl');
      if (!l) { l = document.createElement('div'); l.id = 'lbl'; l.style.cssText = 'position:absolute;left:0;top:0;background:#000;color:#fff;font:700 70px sans-serif;padding:8px 22px;z-index:99'; document.getElementById('root').appendChild(l); }
      l.textContent = label;
    }, [t, `${s.i + 1} · ${s.t0.toFixed(1)}s`]);
    await page.screenshot({ path: path.join(out, String(s.i + 1).padStart(2, '0') + '.jpg'), type: 'jpeg', quality: 82 });
  }
  await browser.close();
  const per = 20, n = Math.ceil(meta.shots.length / per);
  for (let k = 0; k < n; k++) {
    spawnSync('ffmpeg', ['-v', 'error', '-y', '-start_number', String(k * per + 1), '-i', path.join(out, '%02d.jpg'), '-frames:v', '1',
      '-vf', `scale=432:768,tile=5x4:padding=8:color=white`, '-q:v', '3', path.join(build, `planche-${k + 1}.jpg`)], { stdio: 'inherit' });
  }
  console.log(`${meta.shots.length} plans → ${n} planches`);
}

async function scene(ids) {
  const { browser, page, meta } = await open();
  for (const id of ids) {
    const sc = meta.scenes.find(s => s.id === id);
    const f0 = Math.round(sc.t0 * FPS), f1 = Math.round(sc.t1 * FPS);
    const out = path.join(build, 'scenes', `scene-${id}.mp4`);
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '15', '-pix_fmt', 'yuv420p', '-r', String(FPS),
      '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise(r => ff.on('close', r));
    for (let f = f0; f < f1; f++) {
      await page.evaluate(t => renderAt(t), f / FPS + 1e-4);
      const buf = await page.screenshot({ type: 'png' });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end(); await done;
    console.log(`scène ${id} : ${f1 - f0} images`);
  }
  await browser.close();
}

async function all() {
  const { browser, meta } = await open(); await browser.close();
  const ids = meta.scenes.map(s => s.id);
  const groups = [[], [], [], []];
  // répartit les scènes sur 4 processus en équilibrant les durées
  const load = [0, 0, 0, 0];
  [...meta.scenes].sort((a, b) => (b.t1 - b.t0) - (a.t1 - a.t0)).forEach(s => {
    const k = load.indexOf(Math.min(...load)); groups[k].push(s.id); load[k] += s.t1 - s.t0;
  });
  await Promise.all(groups.filter(g => g.length).map(g => new Promise((res, rej) => {
    const p = spawn(process.execPath, [__filename, dir, 'scene', ...g.map(String)], { stdio: 'inherit' });
    p.on('close', c => (c ? rej(new Error('échec scène ' + g)) : res()));
  })));
  concat(ids);
}

function concat(ids) {
  const list = path.join(build, 'scenes.txt');
  fs.writeFileSync(list, ids.map(i => `file 'scenes/scene-${i}.mp4'`).join('\n'));
  spawnSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', '-movflags', '+faststart', path.join(build, 'image-muette.mp4')], { stdio: 'inherit' });
  console.log('image-muette.mp4 assemblée');
}

(async () => {
  if (cmd === 'meta') { const { browser, meta } = await open(); await browser.close(); console.log(meta.shots.length, 'plans,', meta.scenes.length, 'scènes,', meta.events.length, 'bruitages'); }
  else if (cmd === 'sheet') await sheet();
  else if (cmd === 'scene') { await scene(process.argv.slice(4).map(Number)); }
  else if (cmd === 'concat') { const m = JSON.parse(fs.readFileSync(path.join(build, 'meta.json'))); concat(m.scenes.map(s => s.id)); }
  else if (cmd === 'all') await all();
})();
