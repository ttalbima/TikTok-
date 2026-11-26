/* Vidéo 003 — « Le menu du milieu »
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;

  /* ----- objets propres à cette vidéo ----- */
  // carte de restaurant : rows = [{ p: '14 €', hl: true }]
  O.menuCard = (rows, o = {}) => {
    const { w = 640, fill = P.cream, ink = P.navy, title = 'LA CARTE', hlc = P.yellow } = o;
    const h = 200 + rows.length * 170 + 30;
    const body = rows.map((r, i) => {
      const y = 200 + i * 170, c = r.hl ? P.navy : ink;
      return `${r.hl ? `<rect x="24" y="${y}" width="592" height="150" rx="18" fill="${hlc}"/>` : ''}
        <text x="60" y="${y + 100}" font-size="66" fill="${c}" opacity=".75">MENU</text>
        <text x="580" y="${y + 112}" text-anchor="end" font-size="112" fill="${c}">${r.p}</text>
        ${i < rows.length - 1 && !r.hl && !rows[i + 1].hl ? `<rect x="60" y="${y + 158}" width="520" height="6" rx="3" fill="${ink}" opacity=".25"/>` : ''}`;
    }).join('');
    return svg(w, 640, h,
      `<rect width="640" height="${h}" rx="26" fill="${fill}"/>
       <rect x="24" y="24" width="592" height="130" rx="16" fill="${ink}"/>
       <text x="320" y="122" text-anchor="middle" font-size="96" fill="${fill}">${title}</text>${body}`);
  };
  // une ligne de carte seule (pour l'ajouter sous une carte)
  O.menuRow = (p, o = {}) => {
    const { w = 640, fill = P.yellow, ink = P.navy } = o;
    return svg(w, 640, 170,
      `<rect width="640" height="170" rx="22" fill="${fill}"/>
       <text x="60" y="110" font-size="66" fill="${ink}" opacity=".75">MENU</text>
       <text x="580" y="122" text-anchor="end" font-size="112" fill="${ink}">${p}</text>`);
  };
  // assiette et couverts
  O.plate = (o = {}) => {
    const { w = 560, fill = P.cream, ink = P.navy, food = P.coral } = o;
    return svg(w, 620, 420,
      `<rect x="20" y="60" width="22" height="300" rx="11" fill="${ink}"/><rect x="0" y="60" width="62" height="110" rx="20" fill="${ink}"/>
       <rect x="578" y="60" width="22" height="300" rx="11" fill="${ink}"/><path d="M578,60 q40,10 40,150 h-40 Z" fill="${ink}"/>
       <circle cx="310" cy="210" r="200" fill="${fill}"/><circle cx="310" cy="210" r="140" fill="none" stroke="${T.cream2}" stroke-width="10"/>
       <circle cx="280" cy="200" r="70" fill="${food}"/><circle cx="360" cy="240" r="46" fill="${T.green2}"/>`);
  };

  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f) => { const bg = CYCLE[k++ % 5]; shot({ w, bg, scene, html: f(bg) }); };
  const obj = bg => (bg === 'navy' || bg === 'green' || bg === 'coral' ? P.cream : P.navy);
  // étiquettes lisibles sur chaque fond
  const tg = (bg, txt, o = {}) => O.tag(txt, bg === 'cream' || bg === 'yellow' ? { fill: P.navy, ink: P.cream, ...o } : o);
  const mid = (bg, txt, o = {}) => O.tag(txt, bg === 'yellow' ? { fill: P.coral, ink: P.cream, ...o } : { fill: P.yellow, ...o });
  const card = (bg, rows, o = {}) => O.menuCard(rows, bg === 'cream' ? { fill: P.navy, ink: P.cream, ...o } : o);
  const plate = (bg, o = {}) => O.plate(bg === 'cream' ? { fill: P.yellow, ...o } : bg === 'navy' ? { ink: P.yellow, ...o } : o);
  const R2 = [{ p: '14 €' }, { p: '19 €' }];
  const R3 = [{ p: '14 €' }, { p: '19 €' }, { p: '29 €' }];

  V.keywords = [4, 11, 14, 28, 34, 44, 48, 58, 71, 83, 93, 99, 102, 104, 119, 125, 130, 141, 151, 161, 168, 174, 192, 203, 208, 221];

  /* ===== SCÈNE 1 — HOOK ===== */
  S(0, 1, bg => [
    E(540, 620, card(bg, [{ p: '?' }, { p: '?' }, { p: '?' }], { w: 600 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1210, Tx('TU CROIS CHOISIR', 130, 'var(--a1)'), { a: 'up', w: 1 }),
  ]);
  S(3, 1, bg => [
    E(540, 600, plate(bg, { w: 680 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1110, Tx('TON MENU', 250), { a: 'stamp', w: 4, sfx: 'stamp' }),
  ]);
  S(5, 1, bg => [
    E(540, 640, Tx('EN', 420), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1040, Tx('VRAI', 420, 'var(--a1)'), { a: 'stamp', w: 6 }),
  ]);
  S(7, 1, bg => [
    E(540, 620, O.person({ w: 420, fill: P.cream, hat: true }), { a: 'up', sfx: 'pop' }),
    E(540, 1130, Tx('ON A CHOISI', 190, 'var(--a1)'), { a: 'stamp', w: 9, sfx: 'stamp' }),
  ]);
  S(10, 1, bg => [
    E(540, 600, O.arrow({ w: 420, fill: P.coral }), { a: 'down', rot: 90, sfx: 'whoosh' }),
    E(540, 1040, Tx('POUR TOI', 260), { a: 'stamp', w: 11, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(12, 2, bg => [
    E(540, 560, O.clipboard({ w: 420 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1090, Tx('LE TEST', 300, 'var(--a1)'), { a: 'stamp', w: 14, sfx: 'stamp' }),
  ]);
  S(15, 2, bg => [
    E(330, 640, O.person({ w: 380, fill: P.navy }), { a: 'left', sfx: 'pop' }),
    E(750, 640, O.person({ w: 380, fill: P.coral }), { a: 'right' }),
    E(540, 1130, Tx('AVEC MOI', 250), { a: 'up', w: 16 }),
  ]);
  S(17, 2, bg => [
    E(540, 580, Tx('À LA FIN', 250), { a: 'stamp', w: 18, sfx: 'stamp' }),
    E(540, 940, O.arrow({ w: 460 }), { a: 'left', w: 20, sfx: 'whoosh' }),
  ]);
  S(21, 2, bg => [
    E(540, 660, O.bulb({ w: 300, ink: P.cream }), { a: 'pop', w: 22, sfx: 'pop' }),
    E(540, 310, Tx('TU SAURAS', 180), { a: 'down' }),
    E(540, 1140, Tx('POURQUOI', 240, 'var(--a1)'), { a: 'stamp', w: 23, sfx: 'stamp' }),
  ]);
  S(24, 2, bg => [
    E(540, 760, tg(bg, '29 €', { w: 800 }), { a: 'drop', sfx: 'thud' }),
    E(600, 470, O.crown({ w: 260, fill: P.coral, band: T.coral2 }), { a: 'drop', w: 27, dur: .45, sfx: 'ding' }),
    E(540, 1150, Tx('LE + CHER', 200, 'var(--a1)'), { a: 'up', w: 28 }),
  ]);
  S(29, 2, bg => [
    E(540, 560, O.register({ w: 620, fill: P.coral }), { a: 'pop', sfx: 'pop' }),
    E(540, 560, O.cross({ w: 560, col: P.yellow, draw: { w: 33, sfx: 'buzz' } }), { a: 'none', w: 33 }),
    E(540, 1100, Tx('PAS BESOIN', 200), { a: 'stamp', w: 32, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — PREMIER CAS ===== */
  S(35, 3, bg => [
    E(540, 620, Tx('CAS', 380), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1000, Tx('N° 1', 380, 'var(--a1)'), { a: 'stamp', w: 36 }),
  ]);
  S(37, 3, bg => [
    E(540, 700, card(bg, R2, { w: 720 }), { a: 'drop', sfx: 'thud', m: [{ w: 40, r: -3, dur: .25 }, { w: 41, r: 0, dur: .25 }] }),
  ]);
  S(42, 3, bg => [
    E(540, 760, tg(bg, '14 €', { w: 840 }), { a: 'drop', sfx: 'thud' }),
  ]);
  S(46, 3, bg => [
    E(540, 760, tg(bg, '19 €', { w: 840 }), { a: 'drop', sfx: 'thud' }),
  ]);
  S(50, 3, bg => [
    E(540, 420, tg(bg, '14 €', { w: 560 }), { a: 'left', rot: -4 }),
    E(540, 760, tg(bg, '19 €', { w: 560 }), { a: 'right', rot: 4, d: .1 }),
    E(540, 1140, Tx('LEQUEL ?', 250, 'var(--a1)'), { a: 'stamp', w: 52, sfx: 'stamp', loop: 'swing', amp: 3, per: .7 }),
  ]);
  S(53, 3, bg => [
    E(540, 560, tg(bg, '19 €', { w: 700 }), { a: 'pop', sfx: 'pop', m: [{ w: 55, s: 1.1, dur: .2 }, { w: 56, s: 1, dur: .2 }] }),
    E(880, 300, O.arrow({ w: 240, fill: P.navy }), { a: 'up', w: 57, rot: -90, sfx: 'rise' }),
    E(540, 1060, Tx('CHER', 420, 'var(--a2)'), { a: 'stamp', w: 58, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 4 — DEUXIÈME CAS ===== */
  S(59, 4, bg => [
    E(540, 620, Tx('CAS', 380), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1000, Tx('N° 2', 380, 'var(--a1)'), { a: 'stamp', w: 60 }),
  ]);
  S(61, 4, bg => [
    E(540, 640, card(bg, R2, { w: 640 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1190, Tx('MÊME CARTE', 200, 'var(--a1)'), { a: 'up', w: 62 }),
  ]);
  S(63, 4, bg => [
    E(540, 560, card(bg, R2, { w: 640 }), { a: 'none' }),
    E(540, 940, O.menuRow('29 €', { w: 640 }), { a: 'right', w: 65, sfx: 'swish', m: [{ w: 67, s: 1.07, dur: .2 }, { w: 67, d: .22, s: 1, dur: .2 }] }),
    E(540, 1200, Tx('+ 1 LIGNE', 210), { a: 'stamp', w: 67, sfx: 'stamp' }),
  ]);
  S(68, 4, bg => [
    E(540, 760, tg(bg, '29 €', { w: 840 }), { a: 'drop', w: 70, sfx: 'thud' }),
    E(540, 330, Tx('UN MENU À…', 170), { a: 'down' }),
  ]);
  S(73, 4, bg => [
    E(540, 330, tg(bg, '14 €', { w: 470 }), { a: 'left' }),
    E(540, 600, mid(bg, '19 €', { w: 470 }), { a: 'right', d: .1 }),
    E(540, 870, tg(bg, '29 €', { w: 470 }), { a: 'left', d: .2 }),
    E(540, 1190, Tx('LEQUEL ?', 230, 'var(--a1)'), { a: 'stamp', w: 76, sfx: 'stamp', loop: 'swing', amp: 3, per: .7 }),
  ]);

  /* ===== SCÈNE 5 — LA RÉVÉLATION ===== */
  S(77, 5, bg => [
    E(540, 700, O.burst({ w: 1050, n: 14, col: P.coral }), { a: 'pop', d: .3, loop: 'spin', per: 7, cut: false }),
    E(540, 700, mid(bg, '19 €', { w: 800 }), { a: 'pop', sfx: 'pop' }),
  ]);
  S(81, 5, bg => [
    E(540, 420, mid(bg, '19 €', { w: 520 }), { a: 'none' }),
    E(540, 800, Tx('PAS', 300), { a: 'pop', sfx: 'pop' }),
    E(540, 1090, Tx('CHANGÉ', 300, 'var(--a1)'), { a: 'stamp', w: 83, sfx: 'stamp' }),
  ]);
  S(84, 5, bg => [
    E(540, 580, plate(bg, { w: 640 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1090, Tx('MÊME PLAT', 220, 'var(--a1)'), { a: 'up', w: 85 }),
  ]);
  S(86, 5, bg => [
    E(540, 580, tg(bg, '19 €', { w: 720 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1060, Tx('MÊME PRIX', 220), { a: 'stamp', w: 87, sfx: 'stamp' }),
  ]);
  S(88, 5, bg => [
    E(540, 700, Tx('LE CHER', 300), { a: 'pop', w: 92, sfx: 'pop' }),
    E(540, 700, O.line('M20,20 H900', { w: 920, vw: 920, vh: 40, col: P.coral, sw: 36, draw: { w: 93, dur: .3, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(540, 380, Tx("IL N'EST PLUS", 150, 'var(--a1)'), { a: 'down' }),
  ]);
  S(94, 5, bg => [
    E(200, 800, tg(bg, '14 €', { w: 310, fs: 120 }), { a: 'pop' }),
    E(880, 800, tg(bg, '29 €', { w: 310, fs: 120 }), { a: 'pop', d: .12 }),
    E(540, 800, mid(bg, '19 €', { w: 310, fs: 120 }), { a: 'pop', d: .06, sfx: 'pop', m: [{ w: 97, dy: -200, s: 1.5, dur: .35, sfx: 'rise' }] }),
    E(540, 1170, Tx('CELUI DU MILIEU', 140, 'var(--a1)'), { a: 'up', w: 98 }),
  ]);
  S(100, 5, bg => [
    E(540, 420, Tx('LE CHOIX', 250), { a: 'down' }),
    E(540, 720, Tx('RAISONNABLE', 190, 'var(--a1)'), { a: 'stamp', w: 102, sfx: 'stamp' }),
    E(540, 1060, O.check({ w: 300, col: bg === 'green' ? P.yellow : T.green2, draw: { w: 102, d: .25, sfx: 'pop' } }), { a: 'none', w: 102, d: .25 }),
  ]);

  /* ===== SCÈNE 6 — L'ÉTUDE DE 1989 ===== */
  S(103, 6, bg => [
    E(540, 740, Tx(cnt({ from: 1975, to: 1989, w: 104, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    E(540, 1010, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 30, draw: { w: 104, d: .5, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  S(105, 6, bg => [
    E(420, 660, O.person({ w: 440, fill: bg === 'navy' ? P.yellow : P.navy, coat: true, ink: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(800, 900, O.clipboard({ w: 260 }), { a: 'up', w: 107, rot: 8 }),
  ]);
  S(108, 6, bg => [
    E(230, 620, O.shirt({ w: 300, fill: P.navy }), { a: 'pop', sfx: 'pop' }),
    E(540, 640, O.bread({ w: 300 }), { a: 'pop', w: 110, sfx: 'pop' }),
    E(850, 620, O.book('', { w: 240 }), { a: 'pop', w: 111, sfx: 'pop' }),
    E(540, 1100, Tx('PRODUITS DU QUOTIDIEN', 100), { a: 'up', w: 112 }),
  ]);
  S(114, 6, bg => [
    E(540, 740, Tx('RÉSULTAT', 240, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 930, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 28, draw: { d: .2, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  S(115, 6, bg => [
    E(240, 1050 - 150, O.bar(300, { w: 220, fill: obj(bg), grow: { d: 0, dur: .3 } }), { a: 'none' }),
    E(840, 1050 - 150, O.bar(300, { w: 220, fill: obj(bg), grow: { d: .08, dur: .3 } }), { a: 'none' }),
    E(540, 1050 - 320, O.bar(640, { w: 220, fill: bg === 'yellow' ? P.coral : P.yellow, grow: { w: 117, dur: .6, sfx: 'rise' } }), { a: 'none' }),
    E(540, 1190, Tx('+ DE CLIENTS', 170, 'var(--a1)'), { a: 'up', w: 119 }),
  ]);
  S(120, 6, bg => [
    E(220, 620, O.disc({ w: 240, fill: obj(bg) }), { a: 'pop' }),
    E(860, 620, O.disc({ w: 240, fill: obj(bg) }), { a: 'pop', d: .12 }),
    E(540, 620, O.disc({ w: 300, fill: bg === 'yellow' ? P.coral : P.yellow }), { a: 'pop', d: .06, sfx: 'pop', loop: 'pulse', amp: .06, per: .6 }),
    E(540, 320, O.arrow({ w: 220, fill: P.coral }), { a: 'down', w: 123, rot: 90 }),
    E(540, 1080, Tx('AU MILIEU', 240, 'var(--a1)'), { a: 'stamp', w: 124, sfx: 'stamp' }),
  ]);
  S(126, 6, bg => [
    E(540, 400, Tx("L'EFFET DE", 190), { a: 'down', w: 128 }),
    E(540, 700, Tx('COMPROMIS', 210, 'var(--a1)'), { a: 'stamp', w: 130, sfx: 'stamp' }),
    E(540, 1040, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 28, draw: { w: 130, d: .25, dur: .3 } }), { a: 'none', cut: false }),
    E(540, 400, Tx('ÇA S\'APPELLE…', 150), { a: 'pop', hw: 128 }),
  ]);

  /* ===== SCÈNE 7 — L'AVERSION AUX EXTRÊMES ===== */
  S(131, 7, bg => [
    E(540, 660, O.calendar('+ 3 ANS', { w: 680, fs: 140 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1170, Tx('PLUS TARD', 200, 'var(--a1)'), { a: 'up', w: 133 }),
  ]);
  S(135, 7, bg => [
    E(540, 680, O.book('ÉTUDE', { w: 560, fs: 130, fill: bg === 'navy' ? P.coral : P.navy }), { a: 'drop', sfx: 'thud', m: [{ w: 138, r: -4, s: 1.05, dur: .25 }] }),
  ]);
  S(139, 7, bg => [
    E(540, 520, Tx("L'AVERSION", 210), { a: 'stamp', sfx: 'stamp' }),
    E(540, 800, Tx('AUX EXTRÊMES', 170, 'var(--a1)'), { a: 'stamp', w: 140, sfx: 'stamp' }),
    E(250, 1090, O.arrow({ w: 300, fill: P.coral }), { a: 'right', w: 141, rot: 180 }),
    E(830, 1090, O.arrow({ w: 300, fill: P.coral }), { a: 'left', w: 141 }),
  ]);
  S(142, 7, bg => [
    E(540, 600, tg(bg, '14 €', { w: 760 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1080, Tx('LE - CHER', 210, 'var(--a1)'), { a: 'up', w: 143 }),
  ]);
  S(145, 7, bg => [
    E(540, 580, plate(bg, { w: 640, food: T.cream2 }), { a: 'pop', sfx: 'pop' }),
    E(540, 580, O.cross({ w: 480, col: P.coral, draw: { w: 150, sfx: 'buzz' } }), { a: 'none', w: 150 }),
    E(540, 1090, Tx('MAUVAIS ?', 220), { a: 'stamp', w: 151, sfx: 'stamp' }),
  ]);
  S(152, 7, bg => [
    E(540, 600, tg(bg, '29 €', { w: 760 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1080, Tx('LE + CHER', 210, 'var(--a1)'), { a: 'up', w: 153 }),
  ]);
  S(155, 7, bg => [
    E(340, 620, O.bill({ w: 380 }), { a: 'pop', sfx: 'pop', rot: -8, m: [{ w: 159, dx: 900, dy: -500, r: 40, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(700, 700, O.bill({ w: 380 }), { a: 'pop', d: .1, rot: 8, m: [{ w: 160, dx: 900, dy: -500, r: 40, dur: .5, e: 'inOut' }] }),
    E(540, 1090, Tx('ARNAQUE ?', 165, 'var(--a1)'), { a: 'stamp', w: 161, sfx: 'stamp' }),
  ]);
  S(162, 7, bg => [
    E(540, 600, O.burst({ w: 1000, n: 14, col: bg === 'coral' ? P.yellow : P.coral }), { a: 'pop', loop: 'spin', per: 7, cut: false }),
    E(540, 600, mid(bg, '19 €', { w: 720 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1110, Tx('LE MILIEU', 230), { a: 'up', w: 163 }),
  ]);
  S(165, 7, bg => [
    E(540, 500, O.check({ w: 420, col: bg === 'green' ? P.yellow : T.green2, draw: { dur: .4, sfx: 'pop' } }), { a: 'none' }),
    E(540, 880, Tx('SE JUSTIFIE', 190), { a: 'stamp', w: 166, sfx: 'stamp' }),
    E(540, 1110, Tx('TOUT SEUL', 210, 'var(--a1)'), { a: 'up', w: 167 }),
  ]);

  /* ===== SCÈNE 8 — DEVANT QUELQU'UN ===== */
  S(169, 8, bg => [
    E(540, 420, Tx("L'EFFET", 280), { a: 'pop', w: 170, sfx: 'pop' }),
    E(540, 760, O.arrow({ w: 380, fill: P.coral }), { a: 'up', w: 172, rot: -90, sfx: 'rise', loop: 'float', amp: 16, per: .8 }),
    E(540, 1150, Tx('ENCORE + FORT', 160, 'var(--a1)'), { a: 'stamp', w: 174, sfx: 'stamp' }),
  ]);
  S(175, 8, bg => [
    E(290, 800, O.person({ w: 380, fill: obj(bg) }), { a: 'left' }),
    E(700, 430, O.bubble({ w: 600, fill: obj(bg) }), { a: 'pop', w: 177, sfx: 'pop' }),
    E(700, 380, Tx('PARCE QUE…', 96, bg === 'navy' || bg === 'green' || bg === 'coral' ? P.navy : P.cream), { a: 'pop', w: 178, cut: false }),
    E(540, 1170, Tx('TON CHOIX', 170, 'var(--a1)'), { a: 'up', w: 179 }),
  ]);
  S(181, 8, bg => [
    E(540, 600, O.person({ w: 480, fill: bg === 'coral' ? P.navy : P.coral }), { a: 'pop', sfx: 'pop' }),
    E(540, 1110, Tx("À QUELQU'UN", 190), { a: 'up', w: 182 }),
  ]);
  S(183, 8, bg => [
    E(540, 640, Tx('PAR', 380), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1000, Tx('EXEMPLE', 300, 'var(--a1)'), { a: 'stamp', w: 184 }),
  ]);
  S(185, 8, bg => [
    E(230, 600, O.person({ w: 340, fill: obj(bg) }), { a: 'left', sfx: 'pop' }),
    E(850, 600, O.person({ w: 340, fill: P.coral }), { a: 'right', w: 187, sfx: 'pop' }),
    E(540, 860, O.rect(980, 70, bg === 'yellow' ? P.navy : P.yellow, 14), { a: 'none' }),
    E(540, 760, O.plate({ w: 260, ink: obj(bg) }), { a: 'pop', w: 188 }),
    E(540, 1130, Tx('EN FACE DE TOI', 150, 'var(--a1)'), { a: 'up', w: 189 }),
  ]);

  /* ===== SCÈNE 9 — CONCLUSION ===== */
  S(193, 9, bg => [
    E(540, 760, Tx('DONC', 440), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(196, 9, bg => [
    E(540, 700, card(bg, [{ p: '14 €' }, { p: '19 €' }, { p: '29 €', hl: true }], { w: 640, hlc: bg === 'yellow' ? P.coral : P.yellow }), { a: 'pop', sfx: 'pop', m: [{ w: 197, s: 1.06, dur: .2 }, { w: 198, s: 1, dur: .2 }] }),
  ]);
  S(199, 9, bg => [
    E(540, 560, O.register({ w: 620, fill: bg === 'coral' ? P.navy : P.coral }), { a: 'pop', sfx: 'pop' }),
    E(540, 560, O.cross({ w: 560, col: P.yellow, draw: { w: 201, sfx: 'buzz' } }), { a: 'none', w: 201 }),
    E(540, 1100, Tx("PAS BESOIN D'ÊTRE VENDU", 96), { a: 'stamp', w: 202, sfx: 'stamp' }),
  ]);
  S(204, 9, bg => [
    E(540, 380, Tx('IL SUFFIT', 220), { a: 'down' }),
    E(540, 720, tg(bg, '29 €', { w: 620 }), { a: 'pop', w: 206, sfx: 'pop', loop: 'pulse', amp: .04, per: .7 }),
    E(540, 1110, Tx("QU'IL SOIT LÀ", 170, 'var(--a1)'), { a: 'stamp', w: 207, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 10 — QUESTION ===== */
  S(209, 10, bg => [
    E(540, 600, O.bubble({ w: 760, fill: obj(bg) }), { a: 'pop', sfx: 'pop' }),
    E(540, 540, Tx('DIS-MOI', 200, bg === 'navy' || bg === 'green' || bg === 'coral' ? P.navy : P.cream), { a: 'stamp', d: .1, cut: false }),
  ]);
  S(210, 10, bg => [
    E(540, 660, O.calendar('LA DERNIÈRE FOIS', { w: 760, fs: 74 }), { a: 'spin', sfx: 'swish' }),
  ]);
  S(213, 10, bg => [
    E(540, 560, plate(bg, { w: 660 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1090, Tx('AU RESTO', 250, 'var(--a1)'), { a: 'stamp', w: 214, sfx: 'stamp' }),
  ]);
  S(215, 10, bg => [
    E(540, 330, tg(bg, '14 €', { w: 470 }), { a: 'left' }),
    E(540, 600, mid(bg, '19 €', { w: 470 }), { a: 'right', d: .08 }),
    E(540, 870, tg(bg, '29 €', { w: 470 }), { a: 'left', d: .16 }),
    E(540, 1190, Tx('LEQUEL ?', 230, 'var(--a1)'), { a: 'stamp', w: 218, sfx: 'stamp' }),
  ]);
  S(219, 10, bg => [
    E(540, 640, mid(bg, '19 €', { w: 820 }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .04, per: .7 }),
    E(540, 1110, Tx('CELUI DU MILIEU ?', 125, 'var(--a1)'), { a: 'stamp', w: 221, sfx: 'stamp' }),
  ]);
})();
