/* Vidéo 007 — « Le pop-corn moyen » (effet de leurre)
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;

  /* ----- objets propres à cette vidéo ----- */
  // cornet de pop-corn uni, sans rayures ni logo
  O.cone = (label = '', o = {}) => {
    const { w = 300, fill = P.coral, puff = P.yellow, ink = P.cream } = o;
    return svg(w, 300, 420,
      `<g fill="${puff}"><circle cx="88" cy="126" r="54"/><circle cx="150" cy="92" r="66"/><circle cx="212" cy="126" r="54"/><circle cx="118" cy="150" r="50"/><circle cx="184" cy="150" r="50"/></g>
       <g fill="rgba(0,0,0,.12)"><circle cx="132" cy="112" r="16"/><circle cx="196" cy="136" r="14"/><circle cx="92" cy="140" r="12"/></g>
       <path d="M40,160 H260 L228,420 H72 Z" fill="${fill}"/><path d="M40,160 H260 L255,200 H45 Z" fill="rgba(0,0,0,.18)"/>
       ${label ? `<text x="150" y="352" text-anchor="middle" font-size="120" fill="${ink}">${label}</text>` : ''}`);
  };
  // ticket
  O.ticket = (o = {}) => {
    const { w = 700, fill = P.cream, ink = P.navy } = o;
    return svg(w, 700, 320,
      `<path d="M30,0 H670 a30,30 0 0 1 30,30 V110 a50,50 0 0 0 0,100 V290 a30,30 0 0 1 -30,30 H30 a30,30 0 0 1 -30,-30 V210 a50,50 0 0 0 0,-100 V30 a30,30 0 0 1 30,-30 Z" fill="${fill}"/>
       <path d="M520,30 V290" stroke="${ink}" stroke-width="8" stroke-dasharray="18 16" opacity=".5"/>
       <text x="275" y="212" text-anchor="middle" font-size="150" fill="${ink}">CINÉMA</text>
       <text x="606" y="200" text-anchor="middle" font-size="110" fill="${ink}" opacity=".6">1</text>`);
  };
  // panneau des tarifs
  O.panel = (o = {}) => {
    const { w = 820, fill = P.navy, ink = P.cream, hi = P.yellow } = o;
    const row = (y, a, b, c) => `<text x="70" y="${y}" font-size="96" fill="${c}">${a}</text><text x="750" y="${y}" text-anchor="end" font-size="96" fill="${c}">${b}</text>`;
    return svg(w, 820, 700,
      `<rect width="820" height="700" rx="36" fill="${fill}"/><rect x="0" y="0" width="820" height="170" rx="36" fill="rgba(0,0,0,.25)"/>
       <text x="410" y="124" text-anchor="middle" font-size="110" fill="${hi}">POP-CORN</text>
       ${row(320, 'PETIT', '4 €', ink)}${row(470, 'MOYEN', '7,50 €', ink)}${row(620, 'GRAND', '8 €', ink)}`);
  };

  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f) => { const bg = CYCLE[k++ % 5]; shot({ w, bg, scene, html: f(bg) }); };
  const cone = (bg, label, w) => O.cone(label, { w, fill: bg === 'coral' ? P.navy : P.coral, puff: bg === 'yellow' ? P.cream : P.yellow });
  const tag = (bg, txt, o = {}) => O.tag(txt, bg === 'cream' ? { fill: P.navy, ink: P.cream, ...o } : o);
  const obj = bg => (bg === 'navy' || bg === 'green' ? P.cream : P.navy);
  const box = (bg, label, o = {}) => O.box(label, bg === 'navy' || bg === 'green' ? { fill: P.cream, ink: P.navy, ...o } : o);
  const pop2 = bg => (bg === 'yellow' ? P.coral : P.yellow);
  const cy = (Y, w) => Y - 0.7 * w;                        // centre d'un cornet posé sur la ligne Y
  const cher = (bg, w = 300) => O.person({ w, fill: bg === 'navy' ? P.yellow : P.navy, coat: true, ink: P.cream });

  V.keywords = [6, 13, 22, 34, 45, 50, 58, 63, 65, 83, 90, 98, 104, 108, 110, 128, 136, 150, 156, 159, 170, 184, 192, 201, 214, 214];

  /* ===== SCÈNE 1 — HOOK ===== */
  S(0, 1, bg => [
    E(200, cy(1050, 220), cone(bg, 'P', 220), { a: 'drop', sfx: 'thud' }),
    E(520, cy(1050, 300), cone(bg, 'M', 300), { a: 'drop', d: .14, sfx: 'thud' }),
    E(860, cy(1050, 380), cone(bg, 'G', 380), { a: 'drop', d: .28, sfx: 'thud' }),
  ]);
  S(3, 1, bg => [
    E(540, 620, Tx('3', 620, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1070, Tx('TAILLES', 280), { a: 'up', w: 4 }),
  ]);
  S(7, 1, bg => [
    E(540, 640, Tx('UNE', 380), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1000, Tx('SEULE', 380, 'var(--a1)'), { a: 'stamp', w: 8 }),
  ]);
  S(9, 1, bg => [
    E(540, 640, O.burst({ w: 1050, n: 14, col: pop2(bg) }), { a: 'pop', loop: 'spin', per: 7, cut: false }),
    E(540, 640, cone(bg, 'G', 480), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .03, per: .8 }),
    E(540, 1210, Tx('À ACHETER', 200, 'var(--a1)'), { a: 'stamp', w: 12, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(14, 2, bg => [
    E(540, 620, cone(bg, 'M', 420), { a: 'up', sfx: 'pop' }),
    E(540, 1150, Tx('ET UNE AUTRE…', 150), { a: 'up', w: 15 }),
  ]);
  S(19, 2, bg => [
    E(540, 560, cone(bg, 'M', 400), { a: 'none' }),
    E(540, 560, O.cross({ w: 620, col: obj(bg), draw: { w: 20, sfx: 'buzz' } }), { a: 'none', w: 20 }),
    E(540, 1140, Tx('JAMAIS', 320, 'var(--a1)'), { a: 'stamp', w: 21, sfx: 'stamp' }),
  ]);
  S(23, 2, bg => [
    E(540, 400, Tx('À LA FIN', 260), { a: 'down' }),
    ...[0, 1, 2].map(i => E(230 + i * 310, cy(1180, 200), cone(bg, '', 200), { a: 'pop', d: .1 + i * .08 })),
    ...[0, 1, 2].map(i => E(230 + i * 310, 720, Tx('?', 240, 'var(--a1)'), { a: 'pop', w: 26 + i, sfx: 'pop', rot: (i - 1) * 10 })),
  ]);
  S(29, 2, bg => [
    E(540, 700, cone(bg, 'M', 380), { a: 'pop', loop: 'pulse', amp: .04, per: .7 }),
    ...[0, 1, 2, 3].map(i => E(180 + i * 240, 330 + (i % 2) * 90, O.coin('€', { w: 170, small: '' }), { a: 'drop', w: 31, d: i * .12, dur: .45, sfx: i === 0 ? 'coin' : undefined })),
    E(540, 1200, Tx('ELLE RAPPORTE', 160, 'var(--a1)'), { a: 'stamp', w: 32, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — L'EXEMPLE À DEUX TAILLES ===== */
  S(35, 3, bg => [
    E(540, 760, Tx('EXEMPLE', 270), { a: 'stamp', w: 37, sfx: 'stamp' }),
    E(540, 480, Tx('UN', 240, 'var(--a1)'), { a: 'pop', sfx: 'pop' }),
  ]);
  S(38, 3, bg => [
    E(540, 560, O.ticket(bg === 'cream' ? { w: 820, fill: P.navy, ink: P.cream } : { w: 820 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1070, Tx('2 TAILLES', 260, 'var(--a1)'), { a: 'stamp', w: 40, sfx: 'stamp' }),
  ]);
  S(42, 3, bg => [
    E(540, cy(900, 340), cone(bg, 'P', 340), { a: 'drop', sfx: 'thud' }),
    E(540, 1110, tag(bg, '4 €', { w: 520 }), { a: 'pop', w: 45, sfx: 'pop', rot: -4 }),
  ]);
  S(47, 3, bg => [
    E(540, cy(920, 520), cone(bg, 'G', 520), { a: 'drop', sfx: 'thud' }),
    E(540, 1130, tag(bg, '8 €', { w: 520 }), { a: 'pop', w: 50, sfx: 'pop', rot: 4 }),
  ]);
  S(52, 3, bg => [
    E(200, cy(980, 240), cone(bg, 'P', 240), { a: 'left' }),
    E(880, cy(980, 340), cone(bg, 'G', 340), { a: 'right' }),
    E(540, 760, O.person({ w: 300, fill: obj(bg) }), { a: 'up', loop: 'swing', amp: 5, per: .7 }),
    E(540, 380, Tx('?', 300, 'var(--a1)'), { a: 'pop', w: 53, sfx: 'pop', loop: 'swing', amp: 8, per: .6 }),
    E(540, 1210, Tx('TU HÉSITES', 180), { a: 'up', w: 54 }),
  ]);
  S(55, 3, bg => [
    E(540, 400, tag(bg, 'PRIX', { w: 480 }), { a: 'down' }),
    E(540, 900, Tx('×2', 640, 'var(--a1)'), { a: 'stamp', w: 56, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 4 — ON AJOUTE LE MOYEN ===== */
  S(59, 4, bg => [
    E(540, 760, Tx('MAINTENANT', 200), { a: 'stamp', sfx: 'stamp' }),
    E(540, 960, O.line('M20,20 H880', { w: 900, vw: 900, vh: 40, col: P.coral, sw: 28, draw: { d: .2, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  S(60, 4, bg => [
    E(190, cy(1050, 230), cone(bg, 'P', 230), { a: 'none' }),
    E(880, cy(1050, 360), cone(bg, 'G', 360), { a: 'none' }),
    E(530, cy(1050, 300), cone(bg, 'M', 300), { a: 'drop', w: 62, sfx: 'thud' }),
    E(540, 300, Tx('+ 1', 240, 'var(--a1)'), { a: 'stamp', w: 61, sfx: 'stamp' }),
  ]);
  S(64, 4, bg => [
    E(540, 400, cone(bg, 'M', 300), { a: 'pop' }),
    E(540, 950, tag(bg, '7,50 €', { w: 840 }), { a: 'drop', sfx: 'thud', m: [{ d: .75, s: 1.07, dur: .18 }, { d: .98, s: 1, dur: .2 }] }),
  ]);
  S(67, 4, bg => [
    E(280, cy(820, 320), cone(bg, 'M', 320), { a: 'pop' }),
    E(800, cy(820, 400), cone(bg, 'G', 400), { a: 'pop', d: .1 }),
    E(280, 950, tag(bg, '7,50 €', { w: 420, fs: 130 }), { a: 'pop', w: 69, sfx: 'pop' }),
    E(800, 950, tag(bg, '8 €', { w: 420 }), { a: 'pop', w: 73, sfx: 'pop' }),
    E(540, 1200, Tx('PRESQUE PAREIL', 150, 'var(--a1)'), { a: 'stamp', w: 70, sfx: 'stamp' }),
  ]);
  S(75, 4, bg => [
    E(540, 600, O.coin('50', { w: 520, small: '' }), { a: 'drop', sfx: 'coin', loop: 'pulse', amp: .03, per: .8 }),
    E(540, 1130, Tx('+ 50 CENTIMES', 170), { a: 'up', w: 76 }),
  ]);
  S(80, 4, bg => [
    E(540, 600, O.burst({ w: 1050, n: 14, col: pop2(bg) }), { a: 'pop', loop: 'spin', per: 6, cut: false }),
    E(540, 600, cone(bg, 'G', 480), { a: 'pop', sfx: 'pop' }),
    E(540, 1180, Tx('LE GRAND', 260, 'var(--a1)'), { a: 'stamp', w: 82, sfx: 'stamp' }),
  ]);
  S(84, 4, bg => [
    E(540, 640, Tx("D'UN", 380), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1000, Tx('COUP', 380, 'var(--a1)'), { a: 'stamp', w: 85 }),
  ]);
  S(86, 4, bg => [
    E(540, 640, cone(bg, 'G', 460), { a: 'pop', sfx: 'pop' }),
    E(540, 250, O.crown({ w: 240, fill: pop2(bg), band: bg === 'yellow' ? T.coral2 : T.yellow2 }), { a: 'drop', w: 88, dur: .45, sfx: 'ding' }),
    E(540, 1130, O.stamp('AFFAIRE', { w: 760, fs: 160, col: bg === 'coral' ? P.navy : P.coral }), { a: 'stamp', w: 90, rot: -7, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 5 — LE LEURRE ===== */
  S(91, 5, bg => [
    E(540, 600, cone(bg, 'M', 440), { a: 'pop', sfx: 'pop', loop: 'shake', lw: 93, ldur: .35, amp: 7 }),
    E(540, 1150, O.stamp('PAS À VENDRE', { w: 900, fs: 120, h: 230, col: bg === 'coral' ? P.navy : P.coral }), { a: 'stamp', w: 96, rot: -6, sfx: 'stamp' }),
  ]);
  S(99, 5, bg => [
    E(270, cy(900, 280), cone(bg, 'M', 280), { a: 'left', loop: 'shake', lw: 104, ldur: .4, amp: 9 }),
    E(820, cy(900, 420), cone(bg, 'G', 420), { a: 'right', m: [{ w: 103, s: 1.1, dur: .25 }] }),
    E(520, 620, Tx('&lt;', 300, 'var(--a2)'), { a: 'stamp', w: 102, sfx: 'stamp' }),
    E(540, 1150, Tx('BATTU', 320, 'var(--a1)'), { a: 'stamp', w: 104, sfx: 'stamp' }),
  ]);
  S(105, 5, bg => [
    E(540, 620, O.bubble({ w: 780, fill: obj(bg) }), { a: 'pop', sfx: 'pop' }),
    E(540, 540, Tx('ÇA', 220, bg === 'navy' ? P.navy : P.cream), { a: 'pop', d: .1, cut: false }),
    E(540, 1130, Tx("S'APPELLE…", 185, 'var(--a1)'), { a: 'up', w: 106 }),
  ]);
  S(107, 5, bg => [
    E(540, 360, O.rect(10, 380, obj(bg), 5), { a: 'down', dist: 600 }),
    E(540, 520, cone(bg, 'M', 260), { a: 'down', dist: 600, org: '50% 0%', loop: 'swing', amp: 7, per: 1 }),
    E(540, 1100, Tx('LEURRE', 330, 'var(--a1)'), { a: 'stamp', w: 108, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 6 — L'ÉTUDE DE 1982 ===== */
  S(109, 6, bg => [
    E(540, 740, Tx(cnt({ from: 1965, to: 1982, dur: .55, sfx: 'tick' }), 440), { a: 'pop' }),
    E(540, 1010, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 30, draw: { w: 110, d: .5, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  S(111, 6, bg => [
    E(230, 700, cher(bg, 280), { a: 'pop', sfx: 'pop' }),
    E(540, 640, cher(bg, 320), { a: 'pop', d: .12 }),
    E(850, 700, cher(bg, 280), { a: 'pop', d: .24 }),
    E(540, 1110, O.clipboard({ w: 240 }), { a: 'up', w: 113, sfx: 'swish' }),
  ]);
  S(115, 6, bg => [
    E(290, 660, box(bg, 'A', { w: 400, fs: 110 }), { a: 'left', sfx: 'pop' }),
    E(790, 660, box(bg, 'B', { w: 400, fs: 110 }), { a: 'right' }),
    E(540, 1130, Tx('DES CHOIX', 230, 'var(--a1)'), { a: 'stamp', w: 117, sfx: 'stamp' }),
  ]);
  S(120, 6, bg => [
    E(200, 800, box(bg, 'A', { w: 300, fs: 110 }), { a: 'none' }),
    E(880, 800, box(bg, 'B', { w: 300, fs: 110 }), { a: 'none' }),
    E(540, 840, O.box('C', { w: 240, fs: 110, fill: P.coral, ink: P.cream }), { a: 'drop', w: 122, sfx: 'thud' }),
    E(540, 330, Tx('+ 1 OPTION', 200, 'var(--a1)'), { a: 'down', w: 121 }),
  ]);
  S(124, 6, bg => [
    E(780, 620, box(bg, 'B', { w: 440, fs: 110 }), { a: 'pop' }),
    E(290, 700, O.box('C', { w: 340, fs: 110, fill: P.coral, ink: P.cream }), { a: 'pop', d: .06, m: [{ w: 125, s: .68, dy: 50, dur: .4, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1150, Tx('MOINS BONNE', 180, 'var(--a1)'), { a: 'stamp', w: 125, d: .15, sfx: 'stamp' }),
  ]);
  S(129, 6, bg => [
    E(540, 760, Tx('RÉSULTAT', 250, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 950, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 28, draw: { d: .2, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  S(130, 6, bg => [
    E(540, 720, box(bg, 'B', { w: 600, fs: 110 }), { a: 'pop', sfx: 'pop', m: [{ w: 133, s: 1.1, dur: .2 }, { w: 133, d: .25, s: 1, dur: .2 }] }),
    E(540, 330, O.crown({ w: 260, fill: pop2(bg), band: bg === 'yellow' ? T.coral2 : T.yellow2 }), { a: 'drop', w: 132, dur: .45, sfx: 'ding' }),
    E(540, 1200, Tx('CELLE QUI GAGNE', 140, 'var(--a1)'), { a: 'up', w: 131 }),
  ]);
  S(134, 6, bg => [
    E(540, 480, box(bg, 'B', { w: 420, fs: 110 }), { a: 'pop' }),
    ...[0, 1, 2, 3].map(i => E(180 + i * 240, 920, O.person({ w: 200, fill: obj(bg) }), { a: 'up', d: .1 + i * .1, sfx: i === 0 ? 'pop' : undefined })),
    E(540, 1220, Tx('+ DE CLIENTS', 170, 'var(--a1)'), { a: 'stamp', w: 136, sfx: 'stamp' }),
  ]);
  S(137, 6, bg => [
    E(540, 700, O.book('THÉORIE', { w: 560, fs: 96, fill: bg === 'navy' ? P.green : P.navy }), { a: 'drop', sfx: 'thud', m: [{ w: 139, r: -5, dur: .25 }] }),
  ]);
  S(140, 6, bg => [
    E(540, 600, Tx('+ 1', 520, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1040, Tx('CHOIX', 300), { a: 'up', w: 142 }),
  ]);
  S(143, 6, bg => [
    E(540, 380, Tx('JAMAIS', 300, 'var(--a1)'), { a: 'stamp', w: 145, sfx: 'stamp' }),
    E(330, 1200 - 150, O.bar(300, { w: 220, fill: obj(bg), grow: { d: 0, dur: .3 } }), { a: 'none' }),
    E(750, 1200 - 150, O.bar(300, { w: 220, fill: P.coral, grow: { d: .1, dur: .3 } }), { a: 'none', hw: 148 }),
    E(750, 1200 - 290, O.bar(580, { w: 220, fill: P.coral, grow: { w: 148, dur: .5, sfx: 'rise' } }), { a: 'none', w: 148 }),
    E(330, 1250, Tx('A', 80, 'var(--ink)', { font: 'inter' }), { a: 'fade', cut: false }),
    E(750, 1250, Tx('B', 80, 'var(--ink)', { font: 'inter' }), { a: 'fade', cut: false }),
  ]);

  /* ===== SCÈNE 7 — LA PRÉCISION DE 2014 ===== */
  S(151, 7, bg => [
    ...[0, 1, 2, 3].map(i => E(180 + i * 240, 600, O.check({ w: 200, col: bg === 'green' ? P.yellow : T.green2, draw: { w: 152, d: i * .18, sfx: i === 0 ? 'pop' : undefined } }), { a: 'none', w: 152, d: i * .18 })),
    E(540, 320, Tx('DEPUIS…', 200), { a: 'down' }),
    E(540, 1080, Tx('RETROUVÉ', 250, 'var(--a1)'), { a: 'stamp', w: 155, sfx: 'stamp' }),
  ]);
  S(157, 7, bg => [
    E(540, 780, Tx('MAIS', 500), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(159, 7, bg => [
    E(540, 740, Tx(cnt({ from: 2000, to: 2014, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    E(540, 1010, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 30, draw: { w: 159, d: .4, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  S(160, 7, bg => [
    E(300, 760, cher(bg, 340), { a: 'pop', sfx: 'pop' }),
    E(720, 760, cher(bg, 340), { a: 'pop', d: .12 }),
    E(600, 1050, O.magnifier({ w: 300, ring: bg === 'navy' ? P.coral : P.navy }), { a: 'up', w: 162, sfx: 'swish' }),
  ]);
  S(163, 7, bg => [
    E(540, 600, O.pill({ w: 640, fill: T.navy2 }), { a: 'none' }),
    E(540, 600, O.pill({ w: 640 }), { a: 'fade', w: 164, dur: .15, cut: false }),
    E(392, 600, O.disc({ w: 236 }), { a: 'none', m: [{ w: 164, dx: 296, dur: .25, sfx: 'click' }] }),
    E(540, 960, Tx('ÇA MARCHE', 190, 'var(--a1)'), { a: 'pop', w: 164, d: .1 }),
    E(540, 1180, Tx('SURTOUT…', 150), { a: 'up', w: 165 }),
  ]);
  S(166, 7, bg => [
    E(300, 560, tag(bg, '7,50 €', { w: 460, fs: 130 }), { a: 'left', rot: -5 }),
    E(780, 560, tag(bg, '8 €', { w: 460 }), { a: 'right', rot: 5 }),
    E(540, 300, O.eye({ w: 300 }), { a: 'pop', w: 168, sfx: 'pop' }),
    E(540, 1040, Tx('DES CHIFFRES', 185, 'var(--a1)'), { a: 'stamp', w: 170, sfx: 'stamp' }),
  ]);
  S(171, 7, bg => [
    E(540, 760, tag(bg, 'PRIX', { w: 840 }), { a: 'drop', sfx: 'thud' }),
  ]);
  S(173, 7, bg => [
    E(200, cy(1000, 220), cone(bg, 'P', 220), { a: 'pop', sfx: 'pop' }),
    E(520, cy(1000, 300), cone(bg, 'M', 300), { a: 'pop', d: .12 }),
    E(860, cy(1000, 380), cone(bg, 'G', 380), { a: 'pop', d: .24 }),
    E(540, 1200, Tx('TAILLES', 240, 'var(--a1)'), { a: 'stamp', w: 174, sfx: 'stamp' }),
  ]);
  S(175, 7, bg => [
    E(540, 760, Tx('EXACTEMENT', 165), { a: 'stamp', sfx: 'stamp', m: [{ w: 177, s: 1.08, dur: .2 }, { w: 179, s: 1, dur: .2 }] }),
    E(540, 1000, O.arrow({ w: 300, fill: P.coral }), { a: 'down', w: 177, rot: 90 }),
  ]);
  S(180, 7, bg => [
    E(540, 760, O.panel({ w: 880, fill: bg === 'navy' ? P.green : P.navy }), { a: 'drop', sfx: 'thud', m: [{ w: 184, s: 1.05, dur: .2 }, { w: 184, d: .25, s: 1, dur: .2 }] }),
  ]);

  /* ===== SCÈNE 8 — PAS LE CHOIX DU MILIEU ===== */
  S(185, 8, bg => [
    E(540, 620, Tx('RIEN', 420), { a: 'stamp', sfx: 'stamp' }),
    E(540, 990, Tx('À VOIR', 320, 'var(--a1)'), { a: 'stamp', w: 186 }),
  ]);
  S(188, 8, bg => [
    ...[0, 1, 2].map(i => E(200 + i * 340, i === 1 ? 640 : 720, box(bg, '', { w: 280 }), { a: 'pop', d: i * .08 })),
    E(540, 640, O.cross({ w: 380, draw: { w: 192, sfx: 'buzz' } }), { a: 'none', w: 192 }),
    E(540, 1130, Tx('LE MILIEU', 240, 'var(--a1)'), { a: 'up', w: 190 }),
  ]);
  S(193, 8, bg => [
    E(540, 780, Tx('ICI', 560, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(194, 8, bg => [
    E(540, 620, Tx('PERSONNE', 260), { a: 'stamp', sfx: 'stamp' }),
    E(540, 920, Tx('NE VEUT', 260, 'var(--a1)'), { a: 'up', w: 195 }),
  ]);
  S(197, 8, bg => [
    E(540, 600, cone(bg, 'M', 440), { a: 'pop', sfx: 'pop' }),
    E(540, 600, O.cross({ w: 660, col: obj(bg), draw: { w: 200, sfx: 'buzz' } }), { a: 'none', w: 200 }),
    E(540, 1180, Tx('LE MOYEN', 240, 'var(--a1)'), { a: 'stamp', w: 201, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 9 — DÉFI ===== */
  S(202, 9, bg => [
    E(540, 760, O.calendar('LA PROCHAINE', { w: 760, fs: 96 }), { a: 'spin', sfx: 'swish', m: [{ w: 204, r: -5, dur: .2 }, { w: 204, d: .25, r: 0, dur: .2 }] }),
  ]);
  S(205, 9, bg => [
    E(170, 900, O.person({ w: 260, fill: obj(bg) }), { a: 'left' }),
    E(450, cy(1080, 170), cone(bg, 'P', 170), { a: 'pop', w: 206, sfx: 'pop' }),
    E(660, cy(1080, 230), cone(bg, 'M', 230), { a: 'pop', w: 206, d: .12 }),
    E(900, cy(1080, 290), cone(bg, 'G', 290), { a: 'pop', w: 207 }),
    E(540, 380, Tx('3 TAILLES', 220, 'var(--a1)'), { a: 'down', w: 206 }),
  ]);
  S(208, 9, bg => [
    E(200, cy(900, 220), cone(bg, 'P', 220), { a: 'none' }),
    E(520, cy(900, 300), cone(bg, 'M', 300), { a: 'none' }),
    E(860, cy(900, 380), cone(bg, 'G', 380), { a: 'none' }),
    E(160, 700, O.magnifier({ w: 420, ring: bg === 'navy' ? P.cream : P.navy }), { a: 'left', dist: 500, sfx: 'whoosh', m: [{ w: 209, dx: 400, dur: .5, e: 'inOut' }] }),
    E(540, 1150, Tx('CHERCHE', 260, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(211, 9, bg => [
    E(540, 560, cone(bg, 'M', 420), { a: 'pop', sfx: 'pop', loop: 'shake', lw: 214, ldur: .4, amp: 7 }),
    E(540, 1130, Tx('SERT À RIEN', 200, 'var(--a1)'), { a: 'stamp', w: 213, sfx: 'stamp' }),
  ]);
  S(214, 9, bg => [
    E(540, 560, O.eye({ w: 640, px: .7 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1040, O.arrow({ w: 460, fill: P.coral }), { a: 'left', w: 214, sfx: 'whoosh' }),
  ]);
  S(214, 9, bg => [
    E(250, cy(880, 280), cone(bg, 'M', 280), { a: 'left', m: [{ w: 214, dx: 110, dur: .25, sfx: 'thud' }, { w: 214, d: .3, dx: 60, dur: .25 }] }),
    E(800, cy(880, 420), cone(bg, 'G', 420), { a: 'right', m: [{ w: 214, d: .12, dx: 40, s: 1.12, dur: .3 }] , loop: 'pulse', amp: .03, per: .7, lw: 214 }),
    E(540, 1170, Tx('ELLE TE POUSSE', 160, 'var(--a1)'), { a: 'stamp', w: 214, sfx: 'stamp' }),
  ]);
})();
