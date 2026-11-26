/* Moteur d'animation 2D « papier découpé » — rendu déterministe image par image.
   Une vidéo = une liste de plans (V.shot) calés sur les mots de la voix off.
   window.renderAt(t) dessine l'image exacte de l'instant t (en secondes). */
(function () {
  const W = 1080, H = 1920;
  const PAL = { green: '#0E3B2E', navy: '#14213D', cream: '#F4EBD9', yellow: '#FFC83D', coral: '#FF5A4E' };
  // nuances dérivées de la palette (objets uniquement)
  const TINT = { green2: '#2E8B6A', yellow2: '#E0A419', cream2: '#DFD0B3', coral2: '#D9382D', navy2: '#2B3F6B' };
  const THEME = {
    navy: { ink: PAL.cream, a1: PAL.yellow, a2: PAL.coral },
    green: { ink: PAL.cream, a1: PAL.yellow, a2: PAL.coral },
    cream: { ink: PAL.navy, a1: PAL.coral, a2: PAL.green },
    yellow: { ink: PAL.navy, a1: PAL.coral, a2: PAL.green },
    coral: { ink: PAL.cream, a1: PAL.yellow, a2: PAL.navy },
  };

  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const ease = {
    lin: p => p,
    outCubic: p => 1 - Math.pow(1 - p, 3),
    inOut: p => (p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
    outExpo: p => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)),
    outBack: (p, s = 1.70158) => 1 + (s + 1) * Math.pow(p - 1, 3) + s * Math.pow(p - 1, 2),
    outBounce: p => {
      const n = 7.5625, d = 2.75;
      if (p < 1 / d) return n * p * p;
      if (p < 2 / d) return n * (p -= 1.5 / d) * p + .75;
      if (p < 2.5 / d) return n * (p -= 2.25 / d) * p + .9375;
      return n * (p -= 2.625 / d) * p + .984375;
    },
  };

  /* ---------- animations d'entrée : p (0→1) → état ---------- */
  const ENTRY = {
    none: { dur: 0, f: () => ({}) },
    pop: { dur: .32, f: p => ({ s: ease.outBack(p, 2.4), o: clamp(p * 4) }) },
    stamp: { dur: .2, f: p => ({ s: 3.2 - 2.2 * ease.outCubic(p), o: clamp(p * 3) }) },
    drop: { dur: .62, f: p => ({ dy: -(1 - ease.outBounce(p)) * 1500 }) },
    up: { dur: .36, f: (p, a) => ({ dy: (1 - ease.outBack(p, 1.3)) * (a.dist || 520), o: clamp(p * 3) }) },
    down: { dur: .36, f: (p, a) => ({ dy: -(1 - ease.outBack(p, 1.3)) * (a.dist || 520), o: clamp(p * 3) }) },
    left: { dur: .36, f: (p, a) => ({ dx: -(1 - ease.outBack(p, 1.3)) * (a.dist || 700), o: clamp(p * 3) }) },
    right: { dur: .36, f: (p, a) => ({ dx: (1 - ease.outBack(p, 1.3)) * (a.dist || 700), o: clamp(p * 3) }) },
    fade: { dur: .25, f: p => ({ o: p }) },
    spin: { dur: .45, f: p => ({ s: ease.outBack(p, 2), r: (1 - ease.outCubic(p)) * -200, o: clamp(p * 4) }) },
  };

  /* Style 2 (V.style = 2) : entrées nettes et rapides (décélération forte, presque pas de rebond). */
  const ENTRY2 = {
    pop: { dur: .45, f: p => ({ s: .55 + .45 * ease.outBack(ease.outCubic(p), 1.1), r: (1 - ease.outExpo(p)) * -8, o: clamp(p * 5) }) },
    stamp: { dur: .36, f: p => ({ s: 1.7 - .7 * ease.outExpo(p), o: clamp(p * 4) }) },
    drop: { dur: .55, f: p => ({ dy: -(1 - ease.outExpo(p)) * 1100, s: 1 + .05 * Math.sin(Math.PI * p), o: clamp(p * 6) }) },
    up: { dur: .5, f: (p, a) => ({ dy: (1 - ease.outExpo(p)) * (a.dist || 420), o: clamp(p * 4) }) },
    down: { dur: .5, f: (p, a) => ({ dy: -(1 - ease.outExpo(p)) * (a.dist || 420), o: clamp(p * 4) }) },
    left: { dur: .5, f: (p, a) => ({ dx: -(1 - ease.outExpo(p)) * (a.dist || 700), r: (1 - ease.outExpo(p)) * -6, o: clamp(p * 4) }) },
    right: { dur: .5, f: (p, a) => ({ dx: (1 - ease.outExpo(p)) * (a.dist || 700), r: (1 - ease.outExpo(p)) * 6, o: clamp(p * 4) }) },
    spin: { dur: .55, f: p => ({ s: .5 + .5 * ease.outExpo(p), r: (1 - ease.outExpo(p)) * -90, o: clamp(p * 4) }) },
  };

  /* Palette du style 2 : indigo, violet électrique, turquoise, lilas, rose vif, citron vert. Pas de fond noir ni jaune. */
  const PAL2 = { navy: '#2A1E8C', green: '#00A88A', cream: '#F7F5FF', yellow: '#C8F560', coral: '#FF4F7B' };
  const TINT2 = { green2: '#35D6B6', yellow2: '#9BD12C', cream2: '#DCD6F5', coral2: '#D92C5F', navy2: '#7A5CFF' };
  const BG2 = { navy: ['#5B3BF5', '#2A1E8C'], green: ['#00B899', '#04706F'], cream: ['#FBFAFF', '#E3DCFF'], yellow: ['#E2D9FF', '#BDAEFF'], coral: ['#FF6A8F', '#E52F6B'] };
  const THEME2 = {
    navy: { ink: PAL2.cream, a1: PAL2.yellow, a2: PAL2.coral },
    green: { ink: PAL2.cream, a1: PAL2.yellow, a2: PAL2.navy },
    cream: { ink: PAL2.navy, a1: PAL2.coral, a2: PAL2.green },
    yellow: { ink: PAL2.navy, a1: PAL2.coral, a2: PAL2.green },
    coral: { ink: PAL2.cream, a1: PAL2.yellow, a2: PAL2.navy },
  };
  const V = (window.V = { W, H, PAL, TINT, shots: [], keywords: [] });
  let _style = 1;
  Object.defineProperty(V, 'style', { get: () => _style, set: v => { _style = v; if (v === 2) { Object.assign(PAL, PAL2); Object.assign(TINT, TINT2); } } });
  let words = [], duration = 0, shots = [], anims = [], draws = [], counts = [], grows = [], wipes = [], chunks = [];
  let events = [];

  /* ---------- aides d'écriture des plans ---------- */
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  // E : élément centré en (x, y), animé selon `an`
  V.E = (x, y, content, an = {}, style = '') =>
    `<div class="pos" style="left:${x}px;top:${y}px"><div class="an${an.cut === false ? '' : ' cut'}" data-an="${esc(JSON.stringify(an))}" style="${an.org ? `transform-origin:${an.org};` : ''}${style}">${content}</div></div>`;
  // Tx : texte (gros titre Anton par défaut)
  V.Tx = (text, size = 200, color = 'var(--ink)', o = {}) =>
    `<div class="tx ${o.font === 'inter' ? 'inter' : 'anton'}" style="font-size:${size}px;color:${color};${o.ls != null ? `letter-spacing:${o.ls}px;` : ''}${o.lh ? `line-height:${o.lh};` : ''}${o.css || ''}">${text}</div>`;
  V.shot = def => { V.shots.push(def); };

  /* ---------- mise en place ---------- */
  V.setup = function (data) {
    words = data.words; duration = data.duration;
    const stage = document.getElementById('stage');
    stage.innerHTML = '';
    const tOf = (spec, t0) => (spec.w != null ? words[spec.w].s : t0) + (spec.d || 0);
    let all = V.shots.map((d, i) => ({ ...d, i, t0: words[d.w].s + (d.d || 0) }));
    all[0].t0 = 0;
    all.forEach((s, i) => { s.t1 = i + 1 < all.length ? all[i + 1].t0 : duration; });
    // Aucun plan éclair : un plan de moins de MIN secondes est illisible. Deux plans courts qui se suivent
    // n'en font qu'un (le premier reste à l'écran) ; un plan court isolé est retiré et le plan précédent
    // reste à l'écran (ou le suivant démarre plus tôt si c'est le tout premier plan).
    const MIN = V.minShot != null ? V.minShot : 1.0;
    const court = s => s.t1 - s.t0 < MIN;
    const kept = [];
    for (let i = 0; i < all.length; i++) {
      const s = all[i];
      if (!court(s)) { kept.push(s); continue; }
      let j = i + 1;
      while (j < all.length && court(all[j]) && s.t1 - s.t0 < MIN) { s.t1 = all[j].t1; j++; }
      if (j > i + 1) { kept.push(s); i = j - 1; }                 // fusion de plans courts consécutifs
      else if (!kept.length && all[i + 1]) all[i + 1].t0 = s.t0;  // premier plan trop court : le suivant le remplace
      // sinon : plan court isolé, retiré ; le plan précédent reste à l'écran
    }
    V.retires = all.length - kept.length;
    shots = kept;
    shots.forEach((s, i) => { s.i = i; s.t1 = i + 1 < shots.length ? shots[i + 1].t0 : duration; });
    events = [];
    const S2 = V.style === 2;
    document.getElementById('root').classList.toggle('s2', S2);
    const VU = V.minVu != null ? V.minVu : 1.0;
    const tot = (spec, s) => Math.min(tOf(spec, s.t0), Math.max(s.t0, s.t1 - (VU ? .8 : 0)));
    shots.forEach(s => {
      const el = document.createElement('div');
      el.className = 'shot';
      const th = (S2 ? THEME2 : THEME)[s.bg];
      el.style.cssText = `background:${S2 ? `linear-gradient(165deg, ${BG2[s.bg][0]}, ${BG2[s.bg][1]})` : PAL[s.bg]};--ink:${th.ink};--a1:${th.a1};--a2:${th.a2};`;
      const inner = Array.isArray(s.html) ? s.html.join('') : s.html;
      if (S2) {
        // fond vivant : halo de lumière + trois formes qui dérivent lentement (texture, jamais au premier plan)
        const k = s.i, ink = th.ink, a1 = th.a1;
        const sh = [
          `<div style="left:${-260 + (k * 137) % 500}px;top:${120 + (k * 211) % 500}px;width:900px;height:900px;border:34px solid ${ink};opacity:.07"></div>`,
          `<div style="left:${420 + (k * 97) % 420}px;top:${900 + (k * 173) % 500}px;width:620px;height:620px;background:${a1};opacity:.10"></div>`,
          `<div style="left:${(k * 59) % 700}px;top:${1350 + (k * 83) % 300}px;width:260px;height:260px;border:18px solid ${a1};opacity:.12"></div>`,
        ].join('');
        el.innerHTML = `<div class="glow"></div><div class="amb">${sh}</div><div class="cam">${inner}</div>`;
      } else el.innerHTML = `<div class="cam">${inner}</div>`;
      stage.appendChild(el);
      s.el = el; s.cam = el.querySelector('.cam'); s.amb = S2 ? [...el.querySelectorAll('.amb > div')] : [];
      el.querySelectorAll('.an').forEach(n => {
        const a = JSON.parse(n.dataset.an);
        let en = (S2 && ENTRY2[a.a || 'pop']) || ENTRY[a.a || 'pop'];
        // Aucun visuel éclair : un objet ou un titre reste au moins VU secondes à l'écran avant le changement de plan.
        // S'il devait entrer trop tard (sur un mot proche de la fin du plan), il entre plus tôt.
        let t0 = tOf(a, s.t0); const dur = a.dur != null ? a.dur : en.dur;
        const tard = Math.max(s.t0, s.t1 - VU);
        if (VU && t0 > tard) { t0 = Math.max(s.t0, tard - .1 * (s.nTard = (s.nTard || 0) + 1) + .1); }
        const moves = (a.m || []).map(m => ({ ...m, t: tOf(m, s.t0), dur: m.dur != null ? m.dur : .35 }));
        const hide = a.hw != null || a.hd != null ? tOf({ w: a.hw, d: a.hd }, s.t0) : null;
        const loopT = a.lw != null || a.ld != null ? tOf({ w: a.lw, d: a.ld }, s.t0) : t0;
        // typographie cinétique : un titre entre mot par mot, chaque mot monte de derrière un cache
        let kin = null, dur2 = dur;
        const tx = n.firstElementChild;
        if (S2 && tx && tx.classList.contains('tx') && !tx.children.length && !['none', 'fade'].includes(a.a || 'pop')) {
          tx.innerHTML = tx.textContent.trim().split(/\s+/).map(w => `<span class="wm"><span class="wi">${w}</span></span>`).join(' ');
          kin = [...tx.querySelectorAll('.wi')]; en = ENTRY.none; dur2 = 0;
        }
        anims.push({ n, a, en, t0, dur: dur2, moves, hide, loopT, shot: s, kin });
        if (a.sfx) {
          const off = a.a === 'drop' ? dur * .364 : a.a === 'stamp' ? dur * .8 : 0;
          events.push({ t: +(t0 + off + (a.so || 0)).toFixed(3), type: a.sfx });
        }
        moves.forEach(m => m.sfx && events.push({ t: +(m.t + (m.so || 0)).toFixed(3), type: m.sfx }));
      });
      el.querySelectorAll('[data-draw]').forEach(n => {
        const a = JSON.parse(n.dataset.draw);
        n.setAttribute('pathLength', '1'); n.style.strokeDasharray = '1';
        draws.push({ n, t0: tot(a, s), dur: a.dur || .35 });
        if (a.sfx) events.push({ t: +tot(a, s).toFixed(3), type: a.sfx });
      });
      el.querySelectorAll('[data-count]').forEach(n => {
        const a = JSON.parse(n.dataset.count);
        counts.push({ n, a, t0: tot(a, s), dur: a.dur || .6 });
        if (a.sfx) events.push({ t: +tot(a, s).toFixed(3), type: a.sfx, dur: a.dur || .6 });
      });
      el.querySelectorAll('[data-grow]').forEach(n => {
        const a = JSON.parse(n.dataset.grow);
        grows.push({ n, a, t0: tot(a, s), dur: a.dur || .45 });
        if (a.sfx) events.push({ t: +tot(a, s).toFixed(3), type: a.sfx });
      });
    });
    // RELANCES : jamais plus de 1,5 s sans une animation nouvelle. On relève tout ce qui bouge déjà dans le plan
    // (entrée du plan, entrées d'objets, déplacements, tracés, compteurs) et on comble chaque trou de plus de
    // GAP secondes par un mouvement de caméra, d'un type différent à chaque fois. Muet : le son ne change pas.
    const GAP = V.relance != null ? V.relance : 1.5;
    let nb = 0;
    shots.forEach(s => {
      s.beats = [];
      if (!GAP) return;
      const ts = [s.t0];
      anims.forEach(an => { if (an.shot === s) { ts.push(an.t0); an.moves.forEach(m => ts.push(m.t)); } });
      [draws, counts, grows].forEach(l => l.forEach(x => { if (x.t0 >= s.t0 && x.t0 < s.t1) ts.push(x.t0); }));
      const ev = ts.filter(x => x >= s.t0 - 1e-6 && x < s.t1).sort((x, y) => x - y);
      ev.push(s.t1);
      for (let i = 0; i + 1 < ev.length; i++) {
        const trou = ev[i + 1] - ev[i];
        if (trou <= GAP + 1e-6) continue;
        const n = Math.ceil(trou / GAP) - 1;
        for (let j = 1; j <= n; j++) { const t = ev[i] + (trou * j) / (n + 1); if (s.t1 - t > .3) s.beats.push({ t, k: nb++ }); }
      }
    });
    V.nbRelances = nb;
    // visuels éclair : durée pendant laquelle chaque objet reste visible une fois entré
    V.brefs = anims.map(an => ({ t: +an.t0.toFixed(2), vu: +(((an.hide != null ? Math.min(an.hide, an.shot.t1) : an.shot.t1) - an.t0)).toFixed(2), plan: an.shot.i + 1, a: an.a.a || 'pop', txt: an.n.textContent.trim().slice(0, 18) }))
      .filter(x => x.vu < 1 && x.vu > -50);
    // contrôle de la règle des 1,5 s : liste de toutes les animations (instant, type)
    const suivi = [];
    shots.forEach(s => {
      suivi.push({ t: s.t0, k: 'plan' + (s.i % 6) });
      anims.forEach(an => { if (an.shot === s && an.t0 > s.t0 + .05 && an.t0 < s.t1) suivi.push({ t: an.t0, k: an.a.a || 'pop' }); if (an.shot === s) an.moves.forEach(m => m.t < s.t1 && suivi.push({ t: m.t, k: 'déplacement' })); });
      draws.forEach(x => { if (x.t0 > s.t0 + .05 && x.t0 < s.t1) suivi.push({ t: x.t0, k: 'tracé' }); });
      counts.forEach(x => { if (x.t0 > s.t0 + .05 && x.t0 < s.t1) suivi.push({ t: x.t0, k: 'compteur' }); });
      grows.forEach(x => { if (x.t0 > s.t0 + .05 && x.t0 < s.t1) suivi.push({ t: x.t0, k: 'barre' }); });
      s.beats.forEach(b => suivi.push({ t: b.t, k: 'relance' + (b.k % 5) }));
    });
    suivi.sort((x, y) => x.t - y.t);
    V.suivi = suivi;
    // volets entre grandes scènes
    const wipeEl = document.getElementById('wipe');
    shots.forEach((s, i) => {
      if (i && s.scene !== shots[i - 1].scene) {
        const col = Object.keys(PAL).find(c => c !== s.bg && c !== shots[i - 1].bg && c !== 'cream');
        if (!S2) wipes.push({ t: s.t0, col: PAL[col] });
        events.push({ t: +(s.t0 - .1).toFixed(3), type: 'whoosh' });
      }
    });
    V.wipeEl = wipeEl;
    buildSubs();
    events.sort((a, b) => a.t - b.t);
    const scenes = [];
    shots.forEach(s => {
      const last = scenes[scenes.length - 1];
      if (!last || last.id !== s.scene) scenes.push({ id: s.scene, t0: s.t0, t1: s.t1 }); else last.t1 = s.t1;
    });
    V.meta = {
      duration, fps: 30,
      shots: shots.map(s => ({ i: s.i, t0: s.t0, t1: s.t1, scene: s.scene, bg: s.bg, w: s.w })),
      scenes, events, relances: shots.flatMap(x => x.beats.map(b => +b.t.toFixed(2))), retires: V.retires, suivi: V.suivi, brefs: V.brefs,
      keywords: V.keywords.map(i => ({ t: words[i].s, w: words[i].w })),
    };
    return V.meta;
  };

  /* ---------- sous-titres ---------- */
  function clean(w) {
    return w.replace(/[«»"]/g, '').replace(/€/g, ' €').replace(/[.,:;]+$/g, '').toUpperCase();
  }
  function buildSubs() {
    const box = document.getElementById('subs');
    box.innerHTML = ''; chunks = [];
    let cur = [];
    const flush = () => { if (cur.length) { chunks.push(cur); cur = []; } };
    words.forEach((w, i) => {
      const txt = clean(w.w);
      const len = cur.reduce((n, c) => n + c.txt.length + 1, 0) + txt.length;
      if (cur.length && (len > 17 || cur.length >= 3)) flush();
      cur.push({ ...w, txt });
      if (/[.?!…:,]$/.test(w.w)) flush();
    });
    flush();
    chunks = chunks.map((c, k) => {
      const el = document.createElement('div');
      el.className = 'chunk';
      el.innerHTML = c.map(w => `<span>${w.txt}</span>`).join(' ');
      box.appendChild(el);
      return { el, words: c, spans: [...el.querySelectorAll('span')], t0: c[0].s };
    });
    chunks.forEach((c, k) => {
      const next = chunks[k + 1];
      c.t1 = Math.min(next ? next.t0 : duration, c.words[c.words.length - 1].e + .45);
    });
  }

  /* ---------- rendu d'un instant ---------- */
  window.renderAt = function (t) {
    let cur = shots[0];
    for (const s of shots) if (t >= s.t0 - 1e-6) cur = s;
    // transition entre deux plans (style 2) : le nouveau plan pousse l'ancien, ou s'ouvre en cercle
    const S2 = V.style === 2, TR = S2 ? .34 : 0;
    const prev = cur.i > 0 ? shots[cur.i - 1] : null;
    const inTr = TR && prev && t - cur.t0 < TR;
    for (const s of shots) {
      const on = s === cur || (inTr && s === prev);
      s.el.style.display = on ? 'block' : 'none';
      if (on && S2) { s.el.style.transform = ''; s.el.style.clipPath = ''; s.el.style.zIndex = s === cur ? 2 : 1; }
    }
    if (inTr) {
      const p = ease.outExpo((t - cur.t0) / TR), kind = cur.i % 4;
      if (kind === 0) { cur.el.style.transform = `translateX(${((1 - p) * 1080).toFixed(1)}px)`; prev.el.style.transform = `translateX(${(-p * 380).toFixed(1)}px)`; }
      else if (kind === 1) { cur.el.style.transform = `translateY(${((1 - p) * 1920).toFixed(1)}px)`; prev.el.style.transform = `translateY(${(-p * 560).toFixed(1)}px)`; }
      else if (kind === 2) { cur.el.style.clipPath = `circle(${(p * 125).toFixed(2)}% at 50% 42%)`; prev.el.style.transform = `scale(${(1 + .08 * p).toFixed(4)})`; }
      else { cur.el.style.transform = `translateX(${(-(1 - p) * 1080).toFixed(1)}px)`; prev.el.style.transform = `translateX(${(p * 380).toFixed(1)}px)`; }
    }
    const camera = cur => {
    const lt = t - cur.t0, len = cur.t1 - cur.t0;
    const dir = cur.i % 2 ? 1 : -1;
    const e = 1 - ease.outCubic(clamp(lt / .38)), pr = clamp(lt / Math.max(len, .3));
    let cx = dir * 10 * pr, cy = 0, cz = 1 + .035 * pr, cr = 0;
    // entrée de plan : six mouvements de caméra qui tournent, jamais deux fois le même de suite
    const style = V.relance === 0 ? 0 : S2 ? [0, 2, 4][cur.i % 3] : cur.i % 6;
    if (style === 0) cz += .075 * e;
    else if (style === 1) { cx += 70 * e; cz += .03 * e; }
    else if (style === 2) cz -= .06 * e;
    else if (style === 3) { cy += 80 * e; cz += .03 * e; }
    else if (style === 4) { cr += 2.4 * e; cz += .06 * e; }
    else { cx -= 70 * e; cz += .03 * e; }
    // relances à l'intérieur du plan : cinq mouvements différents qui tournent
    for (const b of cur.beats || []) {
      const u = t - b.t; if (u < 0) continue;
      const k = b.k % 5, p = clamp(u / .45), osc = Math.sin(Math.PI * p), am = Math.exp(-u * 5) * Math.sin(u * 22);
      if (k === 0) cz += .06 * osc;                       // coup de zoom
      else if (k === 1) cr += 1.6 * am;                   // balancement
      else if (k === 2) cz += .045 * ease.outCubic(p);    // zoom qui reste
      else if (k === 3) cy -= 26 * osc;                   // petit saut
      else cx += 30 * am;                                 // secousse latérale
    }
    cur.cam.style.transform = `translate(${cx.toFixed(2)}px,${cy.toFixed(2)}px) rotate(${cr.toFixed(3)}deg) scale(${cz.toFixed(4)})`;
    // formes de fond : dérive lente, à contre-sens de la caméra (profondeur)
    cur.amb.forEach((d, j) => {
      const sp = .22 + j * .09, ph = cur.i * 1.7 + j * 2.1;
      d.style.transform = `translate(${(Math.sin(t * sp + ph) * (46 + j * 18) - cx * (1.5 + j)).toFixed(2)}px,${(Math.cos(t * sp * .8 + ph) * (60 + j * 22) - lt * (14 + j * 9)).toFixed(2)}px) scale(${(1 + .04 * Math.sin(t * .5 + ph)).toFixed(4)})`;
    });
    };
    camera(cur); if (inTr) camera(prev);

    for (const an of anims) {
      if (an.shot !== cur && !(inTr && an.shot === prev)) continue;
      const { n, a, en } = an;
      if (t < an.t0 - 1e-6 || (an.hide != null && t >= an.hide)) { n.style.visibility = 'hidden'; continue; }
      n.style.visibility = 'visible';
      const st = { dx: 0, dy: 0, s: 1, r: 0, o: 1 };
      Object.assign(st, en.f(an.dur ? clamp((t - an.t0) / an.dur) : 1, a));
      let base = { dx: 0, dy: 0, s: 1, r: 0, o: 1 };
      for (const m of an.moves) {
        if (t < m.t) break;
        const p = (ease[m.e || 'outBack'])(clamp((t - m.t) / m.dur));
        const tgt = { ...base };
        for (const k of ['dx', 'dy', 's', 'r', 'o']) if (m[k] != null) tgt[k] = m[k];
        const now = {};
        for (const k in base) now[k] = base[k] + (tgt[k] - base[k]) * p;
        if (t >= m.t + m.dur) base = tgt; else { base = now; break; }
      }
      st.dx += base.dx; st.dy += base.dy; st.s *= base.s; st.r += base.r; st.o *= base.o;
      if (a.loop && t >= an.loopT && (a.ldur == null || t < an.loopT + a.ldur)) {
        const u = t - an.loopT, amp = a.amp, per = a.per || 1.6, ph = Math.sin((2 * Math.PI * u) / per);
        if (a.loop === 'float') st.dy += ph * (amp || 14);
        else if (a.loop === 'pulse') st.s *= 1 + (amp || .05) * ph;
        else if (a.loop === 'swing') st.r += (amp || 6) * ph * Math.exp(-u * (a.damp || 0));
        else if (a.loop === 'spin') st.r += (360 * u) / per;
        else if (a.loop === 'shake') { st.dx += Math.sin(u * 61) * (amp || 10); st.dy += Math.cos(u * 53) * (amp || 10) * .6; }
      }
      if (an.kin) an.kin.forEach((wi, k) => {
        const p = ease.outExpo(clamp((t - an.t0 - k * .07) / .5));
        wi.style.transform = `translateY(${((1 - p) * 115).toFixed(2)}%) rotate(${((1 - p) * 7).toFixed(2)}deg)`;
      });
      n.style.opacity = clamp(st.o);
      n.style.transform = `translate(-50%,-50%) translate(${st.dx.toFixed(2)}px,${st.dy.toFixed(2)}px) rotate(${((a.rot || 0) + st.r).toFixed(2)}deg) scale(${Math.max(st.s, 0).toFixed(4)})`;
    }
    for (const d of draws) d.n.style.strokeDashoffset = 1 - ease.outCubic(clamp((t - d.t0) / d.dur));
    for (const c of counts) {
      const p = ease.outCubic(clamp((t - c.t0) / c.dur));
      const v = c.a.from + (c.a.to - c.a.from) * p;
      c.n.textContent = (c.a.pre || '') + v.toFixed(c.a.dec || 0).replace('.', ',') + (c.a.suf || '');
    }
    for (const g of grows) {
      const p = ease.outBack(clamp((t - g.t0) / g.dur), 1.2);
      g.n.style.transform = g.a.axis === 'x' ? `scaleX(${Math.max(p, 0)})` : `scaleY(${Math.max(p, 0)})`;
    }
    // volet
    let wp = null;
    for (const w of wipes) { const p = (t - (w.t - .12)) / .36; if (p > 0 && p < 1) wp = { p, col: w.col }; }
    if (wp) {
      V.wipeEl.style.display = 'block'; V.wipeEl.style.background = wp.col;
      V.wipeEl.style.transform = `translateX(${-2000 + wp.p * 4320}px) skewX(-12deg)`;
    } else V.wipeEl.style.display = 'none';
    // sous-titres
    for (const c of chunks) {
      const nx = chunks[chunks.indexOf(c) + 1];
      const on = t >= c.t0 - .02 && t < c.t1 && !(nx && t >= nx.t0 - .02);
      c.el.style.display = on ? 'block' : 'none';
      if (!on) continue;
      const k = .92 + .08 * ease.outBack(clamp((t - c.t0 + .02) / .12), 2);
      c.el.style.transform = `translate(-50%,-50%) scale(${k})`;
      let act = 0;
      c.words.forEach((w, i) => { if (t >= w.s - .02) act = i; });
      c.spans.forEach((s, i) => s.classList.toggle('act', i === act));
    }
  };

  /* ---------- grain papier ---------- */
  V.grain = function () {
    const c = document.createElement('canvas'); c.width = 270; c.height = 480;
    const g = c.getContext('2d'), im = g.createImageData(270, 480);
    let seed = 1234567;
    const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
    for (let i = 0; i < im.data.length; i += 4) { const v = 90 + rnd() * 165; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
    g.putImageData(im, 0, 0);
    document.getElementById('grain').style.backgroundImage = `url(${c.toDataURL()})`;
  };
})();
