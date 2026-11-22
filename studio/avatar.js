// Photos de profil du compte, dans la charte des vidéos.
// node avatar.js <dossier de sortie>  → profil-A.png, profil-B.png, profil-C.png (1080×1080) + apercu.png
const { chromium } = require('playwright');
const path = require('path');
const out = path.resolve(process.argv[2] || '.');
const P = { green: '#0E3B2E', navy: '#14213D', cream: '#F4EBD9', yellow: '#FFC83D', coral: '#FF5A4E', yellow2: '#E0A419', coral2: '#D9382D' };
const shadow = 'filter="url(#sh)"';
const defs = `<defs>
  <filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="16" dy="20" stdDeviation="0" flood-color="#000" flood-opacity=".26"/></filter>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .55 0"/></filter>
</defs>`;
const grain = `<rect width="1080" height="1080" filter="url(#grain)" opacity=".16" style="mix-blend-mode:overlay"/>`;
// étiquette accrochée à un hameçon : le trou de l'étiquette est au fond du crochet, en (HX, HY)
const HX = 400, HY = 560;
const tag = (fill, ink, hole) => {
  const x = HX - 105, y = HY - 130, w = 690, h = 260, fs = 185;
  return `<g transform="rotate(-12 ${HX} ${HY})">
    <g ${shadow}><path d="M${x + 150},${y} H${x + w - 36} a36,36 0 0 1 36,36 V${y + h - 36} a36,36 0 0 1 -36,36 H${x + 150} L${x},${y + h / 2} Z" fill="${fill}"/></g>
    <circle cx="${HX}" cy="${HY}" r="32" fill="${hole}"/>
    <text x="${x + 150 + (w - 150) / 2 + 45}" y="${y + h / 2 + fs * .36}" text-anchor="middle" font-family="Anton" font-size="${fs}" fill="${ink}">9,99</text></g>`;
};
const hook = col => {
  const cx = HX + 95, cy = HY - 35;          // fond du crochet = trou de l'étiquette
  return `<g ${shadow}><path d="M${cx},${cy - 370} V${cy - 60} a95,95 0 1 1 -190,0 v-50" fill="none" stroke="${col}" stroke-width="34" stroke-linecap="round"/>
    <path d="M${cx - 190},${cy - 128} l-34,58 l70,-8 z" fill="${col}"/>
    <circle cx="${cx}" cy="${cy - 392}" r="26" fill="none" stroke="${col}" stroke-width="20"/></g>`;
};
const look = (bg, tagFill, ink, hookCol) => `<rect width="1080" height="1080" fill="${bg}"/><g transform="translate(-160 92) scale(1.1)">${tag(tagFill, ink, bg)}${hook(hookCol)}</g>`;
const A = look(P.yellow, P.navy, P.cream, P.coral);
const B = look(P.navy, P.yellow, P.navy, P.coral);
const C = look(P.green, P.cream, P.navy, P.yellow);

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1080 } });
  await p.goto('file://' + path.join(__dirname, 'player.html'));
  await p.evaluate(() => document.fonts.load('200px Anton'));
  for (const [k, inner] of Object.entries({ A, B, C })) {
    await p.evaluate(svg => { document.body.innerHTML = svg; document.body.style.cssText = 'margin:0;width:1080px;height:1080px'; },
      `<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">${defs}${inner}${grain}</svg>`);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, `profil-${k}.png`), clip: { x: 0, y: 0, width: 1080, height: 1080 } });
  }
  await b.close();
})();
