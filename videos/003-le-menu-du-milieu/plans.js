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

  V.style = 2;        // charte validée le 26/11/2026
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

  V.keywords = [4, 9, 12, 15, 22, 32, 36, 46, 66, 78, 88, 94, 97, 99, 114, 120, 125, 136, 146, 156, 163, 169, 187, 198, 204, 232];

  /* ===== SCÈNE 1 — HOOK : « Tu crois choisir ton menu. » ===== */
  S(0, 1, bg => [
    E(540, 600, card(bg, [{ p: '?' }, { p: '?' }, { p: '?' }], { w: 600 }), { a: 'drop', sfx: 'thud', rot: -3 }),
    E(540, 1200, Tx('TU CROIS CHOISIR', 130, 'var(--a1)'), { a: 'up', w: 1 }),
  ]);
  S(5, 1, bg => [
    E(540, 600, card(bg, [{ p: '?' }, { p: '?', hl: true }, { p: '?' }], { w: 600, hlc: bg === 'yellow' ? P.coral : P.yellow }), { a: 'none', rot: -3, m: [{ w: 7, s: 1.06, dur: .25 }] }),
    E(540, 1040, Tx('ON A CHOISI', 170), { a: 'up', w: 5 }),
    E(540, 1215, Tx('POUR TOI', 150, 'var(--a1)'), { a: 'up', w: 8, sfx: 'pop' }),
  ]);

  /* ===== SCÈNE 2 — RETAINER : « Fais le test : le plus cher n'est même pas là pour être vendu. » ===== */
  S(10, 2, bg => [
    E(540, 330, Tx('FAIS LE TEST', 170), { a: 'down', sfx: 'pop' }),
    E(540, 760, tg(bg, '29 €', { w: 760 }), { a: 'drop', w: 13, sfx: 'thud' }),
    E(610, 500, O.crown({ w: 240, fill: P.coral, band: T.coral2 }), { a: 'drop', w: 14, dur: .45, sfx: 'ding' }),
    E(540, 1085, Tx('PAS LÀ POUR', 140), { a: 'up', w: 18 }),
    E(540, 1235, Tx('ÊTRE VENDU', 150, 'var(--a1)'), { a: 'up', w: 21, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — PREMIER CAS ===== */
  S(23, 3, bg => [
    E(540, 620, Tx('CAS', 380), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1000, Tx('N° 1', 380, 'var(--a1)'), { a: 'stamp', w: 24 }),
  ]);
  S(25, 3, bg => [
    E(540, 700, card(bg, R2, { w: 720 }), { a: 'drop', sfx: 'thud', m: [{ w: 28, r: -3, dur: .25 }, { w: 29, r: 0, dur: .25 }] }),
  ]);
  S(30, 3, bg => [
    E(540, 760, tg(bg, '14 €', { w: 840 }), { a: 'drop', sfx: 'thud' }),
  ]);
  S(34, 3, bg => [
    E(540, 760, tg(bg, '19 €', { w: 840 }), { a: 'drop', sfx: 'thud' }),
  ]);
  S(38, 3, bg => [
    E(540, 420, tg(bg, '14 €', { w: 560 }), { a: 'left', rot: -4 }),
    E(540, 760, tg(bg, '19 €', { w: 560 }), { a: 'right', rot: 4, d: .1 }),
    E(540, 1140, Tx('LEQUEL ?', 250, 'var(--a1)'), { a: 'stamp', w: 40, sfx: 'stamp', loop: 'swing', amp: 3, per: .7 }),
  ]);
  S(41, 3, bg => [
    E(540, 560, tg(bg, '19 €', { w: 700 }), { a: 'pop', sfx: 'pop', m: [{ w: 43, s: 1.1, dur: .2 }, { w: 44, s: 1, dur: .2 }] }),
    E(880, 300, O.arrow({ w: 240, fill: P.navy }), { a: 'up', w: 45, rot: -90, sfx: 'rise' }),
    E(540, 1060, Tx('CHER', 420, 'var(--a2)'), { a: 'stamp', w: 46, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 4 — DEUXIÈME CAS ===== */
  S(49, 4, bg => [
    E(540, 620, Tx('CAS', 380), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1000, Tx('N° 2', 380, 'var(--a1)'), { a: 'stamp', w: 50 }),
  ]);
  S(51, 4, bg => [
    E(540, 640, card(bg, R2, { w: 640 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1190, Tx('MÊME CARTE', 200, 'var(--a1)'), { a: 'up', w: 52 }),
  ]);
  S(56, 4, bg => [
    E(540, 560, card(bg, R2, { w: 640 }), { a: 'none' }),
    E(540, 940, O.menuRow('29 €', { w: 640 }), { a: 'right', w: 57, sfx: 'swish', m: [{ w: 59, s: 1.07, dur: .2 }, { w: 59, d: .22, s: 1, dur: .2 }] }),
    E(540, 1200, Tx('+ 1 LIGNE', 210), { a: 'stamp', w: 59, sfx: 'stamp' }),
  ]);
  S(63, 4, bg => [
    E(540, 760, tg(bg, '29 €', { w: 840 }), { a: 'drop', w: 65, sfx: 'thud' }),
    E(540, 330, Tx('UN MENU À…', 170), { a: 'down' }),
  ]);
  S(68, 4, bg => [
    E(540, 330, tg(bg, '14 €', { w: 470 }), { a: 'left' }),
    E(540, 600, mid(bg, '19 €', { w: 470 }), { a: 'right', d: .1 }),
    E(540, 870, tg(bg, '29 €', { w: 470 }), { a: 'left', d: .2 }),
    E(540, 1190, Tx('LEQUEL ?', 230, 'var(--a1)'), { a: 'stamp', w: 71, sfx: 'stamp', loop: 'swing', amp: 3, per: .7 }),
  ]);

  /* ===== SCÈNE 5 — LA RÉVÉLATION ===== */
  S(72, 5, bg => [
    E(540, 700, O.burst({ w: 1050, n: 14, col: P.coral }), { a: 'pop', d: .3, loop: 'spin', per: 7, cut: false }),
    E(540, 700, mid(bg, '19 €', { w: 800 }), { a: 'pop', sfx: 'pop' }),
  ]);
  S(76, 5, bg => [
    E(540, 420, mid(bg, '19 €', { w: 520 }), { a: 'none' }),
    E(540, 800, Tx('PAS', 300), { a: 'pop', sfx: 'pop' }),
    E(540, 1090, Tx('CHANGÉ', 300, 'var(--a1)'), { a: 'stamp', w: 78, sfx: 'stamp' }),
  ]);
  S(79, 5, bg => [
    E(540, 580, plate(bg, { w: 640 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1090, Tx('MÊME PLAT', 220, 'var(--a1)'), { a: 'up', w: 80 }),
  ]);
  S(81, 5, bg => [
    E(540, 580, tg(bg, '19 €', { w: 720 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1060, Tx('MÊME PRIX', 220), { a: 'stamp', w: 82, sfx: 'stamp' }),
  ]);
  S(83, 5, bg => [
    E(540, 700, Tx('LE CHER', 300), { a: 'pop', w: 87, sfx: 'pop' }),
    E(540, 700, O.line('M20,20 H900', { w: 920, vw: 920, vh: 40, col: P.coral, sw: 36, draw: { w: 88, dur: .3, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(540, 380, Tx("IL N'EST PLUS", 150, 'var(--a1)'), { a: 'down' }),
  ]);
  S(89, 5, bg => [
    E(200, 800, tg(bg, '14 €', { w: 310, fs: 120 }), { a: 'pop' }),
    E(880, 800, tg(bg, '29 €', { w: 310, fs: 120 }), { a: 'pop', d: .12 }),
    E(540, 800, mid(bg, '19 €', { w: 310, fs: 120 }), { a: 'pop', d: .06, sfx: 'pop', m: [{ w: 92, dy: -200, s: 1.5, dur: .35, sfx: 'rise' }] }),
    E(540, 1170, Tx('CELUI DU MILIEU', 140, 'var(--a1)'), { a: 'up', w: 93 }),
  ]);
  S(95, 5, bg => [
    E(540, 420, Tx('LE CHOIX', 250), { a: 'down' }),
    E(540, 720, Tx('RAISONNABLE', 190, 'var(--a1)'), { a: 'stamp', w: 97, sfx: 'stamp' }),
    E(540, 1060, O.check({ w: 300, col: bg === 'green' ? P.yellow : T.green2, draw: { w: 97, d: .25, sfx: 'pop' } }), { a: 'none', w: 97, d: .25 }),
  ]);

  /* ===== SCÈNE 6 — L'ÉTUDE DE 1989 ===== */
  S(98, 6, bg => [
    E(540, 740, Tx(cnt({ from: 1975, to: 1989, w: 99, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    E(540, 1010, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 30, draw: { w: 99, d: .5, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  S(100, 6, bg => [
    E(420, 660, O.person({ w: 440, fill: bg === 'navy' ? P.yellow : P.navy, coat: true, ink: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(800, 900, O.clipboard({ w: 260 }), { a: 'up', w: 102, rot: 8 }),
  ]);
  S(103, 6, bg => [
    E(230, 620, O.shirt({ w: 300, fill: P.navy }), { a: 'pop', sfx: 'pop' }),
    E(540, 640, O.bread({ w: 300 }), { a: 'pop', w: 105, sfx: 'pop' }),
    E(850, 620, O.book('', { w: 240 }), { a: 'pop', w: 106, sfx: 'pop' }),
    E(540, 1100, Tx('PRODUITS DU QUOTIDIEN', 100), { a: 'up', w: 107 }),
  ]);
  S(109, 6, bg => [
    E(540, 740, Tx('RÉSULTAT', 240, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 930, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 28, draw: { d: .2, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  S(110, 6, bg => [
    E(240, 1050 - 150, O.bar(300, { w: 220, fill: obj(bg), grow: { d: 0, dur: .3 } }), { a: 'none' }),
    E(840, 1050 - 150, O.bar(300, { w: 220, fill: obj(bg), grow: { d: .08, dur: .3 } }), { a: 'none' }),
    E(540, 1050 - 320, O.bar(640, { w: 220, fill: bg === 'yellow' ? P.coral : P.yellow, grow: { w: 112, dur: .6, sfx: 'rise' } }), { a: 'none' }),
    E(540, 1190, Tx('+ DE CLIENTS', 170, 'var(--a1)'), { a: 'up', w: 114 }),
  ]);
  S(115, 6, bg => [
    E(220, 620, O.disc({ w: 240, fill: obj(bg) }), { a: 'pop' }),
    E(860, 620, O.disc({ w: 240, fill: obj(bg) }), { a: 'pop', d: .12 }),
    E(540, 620, O.disc({ w: 300, fill: bg === 'yellow' ? P.coral : P.yellow }), { a: 'pop', d: .06, sfx: 'pop', loop: 'pulse', amp: .06, per: .6 }),
    E(540, 320, O.arrow({ w: 220, fill: P.coral }), { a: 'down', w: 118, rot: 90 }),
    E(540, 1080, Tx('AU MILIEU', 240, 'var(--a1)'), { a: 'stamp', w: 119, sfx: 'stamp' }),
  ]);
  S(121, 6, bg => [
    E(540, 400, Tx("L'EFFET DE", 190), { a: 'down', w: 123 }),
    E(540, 700, Tx('COMPROMIS', 210, 'var(--a1)'), { a: 'stamp', w: 125, sfx: 'stamp' }),
    E(540, 1040, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 28, draw: { w: 125, d: .25, dur: .3 } }), { a: 'none', cut: false }),
    E(540, 400, Tx('ÇA S\'APPELLE…', 150), { a: 'pop', hw: 123 }),
  ]);

  /* ===== SCÈNE 7 — L'AVERSION AUX EXTRÊMES ===== */
  S(126, 7, bg => [
    E(540, 660, O.calendar('+ 3 ANS', { w: 680, fs: 140 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1170, Tx('PLUS TARD', 200, 'var(--a1)'), { a: 'up', w: 128 }),
  ]);
  S(130, 7, bg => [
    E(540, 680, O.book('ÉTUDE', { w: 560, fs: 130, fill: bg === 'navy' ? P.coral : P.navy }), { a: 'drop', sfx: 'thud', m: [{ w: 133, r: -4, s: 1.05, dur: .25 }] }),
  ]);
  S(134, 7, bg => [
    E(540, 520, Tx("L'AVERSION", 210), { a: 'stamp', sfx: 'stamp' }),
    E(540, 800, Tx('AUX EXTRÊMES', 170, 'var(--a1)'), { a: 'stamp', w: 135, sfx: 'stamp' }),
    E(250, 1090, O.arrow({ w: 300, fill: P.coral }), { a: 'right', w: 136, rot: 180 }),
    E(830, 1090, O.arrow({ w: 300, fill: P.coral }), { a: 'left', w: 136 }),
  ]);
  S(137, 7, bg => [
    E(540, 600, tg(bg, '14 €', { w: 760 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1080, Tx('LE - CHER', 210, 'var(--a1)'), { a: 'up', w: 138 }),
  ]);
  S(140, 7, bg => [
    E(540, 580, plate(bg, { w: 640, food: T.cream2 }), { a: 'pop', sfx: 'pop' }),
    E(540, 580, O.cross({ w: 480, col: P.coral, draw: { w: 145, sfx: 'buzz' } }), { a: 'none', w: 145 }),
    E(540, 1090, Tx('MAUVAIS ?', 220), { a: 'stamp', w: 146, sfx: 'stamp' }),
  ]);
  S(147, 7, bg => [
    E(540, 600, tg(bg, '29 €', { w: 760 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1080, Tx('LE + CHER', 210, 'var(--a1)'), { a: 'up', w: 148 }),
  ]);
  S(150, 7, bg => [
    E(340, 620, O.bill({ w: 380 }), { a: 'pop', sfx: 'pop', rot: -8, m: [{ w: 154, dx: 900, dy: -500, r: 40, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(700, 700, O.bill({ w: 380 }), { a: 'pop', d: .1, rot: 8, m: [{ w: 155, dx: 900, dy: -500, r: 40, dur: .5, e: 'inOut' }] }),
    E(540, 1090, Tx('ARNAQUE ?', 165, 'var(--a1)'), { a: 'stamp', w: 156, sfx: 'stamp' }),
  ]);
  S(157, 7, bg => [
    E(540, 600, O.burst({ w: 1000, n: 14, col: bg === 'coral' ? P.yellow : P.coral }), { a: 'pop', loop: 'spin', per: 7, cut: false }),
    E(540, 600, mid(bg, '19 €', { w: 720 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1110, Tx('LE MILIEU', 230), { a: 'up', w: 158 }),
  ]);
  S(160, 7, bg => [
    E(540, 500, O.check({ w: 420, col: bg === 'green' ? P.yellow : T.green2, draw: { dur: .4, sfx: 'pop' } }), { a: 'none' }),
    E(540, 880, Tx('SE JUSTIFIE', 190), { a: 'stamp', w: 161, sfx: 'stamp' }),
    E(540, 1110, Tx('TOUT SEUL', 210, 'var(--a1)'), { a: 'up', w: 162 }),
  ]);

  /* ===== SCÈNE 8 — DEVANT QUELQU'UN ===== */
  S(164, 8, bg => [
    E(540, 420, Tx("L'EFFET", 280), { a: 'pop', w: 165, sfx: 'pop' }),
    E(540, 760, O.arrow({ w: 380, fill: P.coral }), { a: 'up', w: 167, rot: -90, sfx: 'rise', loop: 'float', amp: 16, per: .8 }),
    E(540, 1150, Tx('ENCORE + FORT', 160, 'var(--a1)'), { a: 'stamp', w: 169, sfx: 'stamp' }),
  ]);
  S(170, 8, bg => [
    E(290, 800, O.person({ w: 380, fill: obj(bg) }), { a: 'left' }),
    E(700, 430, O.bubble({ w: 600, fill: obj(bg) }), { a: 'pop', w: 172, sfx: 'pop' }),
    E(700, 380, Tx('PARCE QUE…', 96, bg === 'navy' || bg === 'green' || bg === 'coral' ? P.navy : P.cream), { a: 'pop', w: 173, cut: false }),
    E(540, 1170, Tx('TON CHOIX', 170, 'var(--a1)'), { a: 'up', w: 174 }),
  ]);
  S(176, 8, bg => [
    E(540, 600, O.person({ w: 480, fill: bg === 'coral' ? P.navy : P.coral }), { a: 'pop', sfx: 'pop' }),
    E(540, 1110, Tx("À QUELQU'UN", 190), { a: 'up', w: 177 }),
  ]);
  S(178, 8, bg => [
    E(540, 640, Tx('PAR', 380), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1000, Tx('EXEMPLE', 300, 'var(--a1)'), { a: 'stamp', w: 179 }),
  ]);
  S(180, 8, bg => [
    E(230, 600, O.person({ w: 340, fill: obj(bg) }), { a: 'left', sfx: 'pop' }),
    E(850, 600, O.person({ w: 340, fill: P.coral }), { a: 'right', w: 182, sfx: 'pop' }),
    E(540, 860, O.rect(980, 70, bg === 'yellow' ? P.navy : P.yellow, 14), { a: 'none' }),
    E(540, 760, O.plate({ w: 260, ink: obj(bg) }), { a: 'pop', w: 183 }),
    E(540, 1130, Tx('EN FACE DE TOI', 150, 'var(--a1)'), { a: 'up', w: 184 }),
  ]);

  /* ===== SCÈNE 9 — CONCLUSION ===== */
  S(188, 9, bg => [
    E(540, 760, Tx('DONC', 440), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(191, 9, bg => [
    E(540, 700, card(bg, [{ p: '14 €' }, { p: '19 €' }, { p: '29 €', hl: true }], { w: 640, hlc: bg === 'yellow' ? P.coral : P.yellow }), { a: 'pop', sfx: 'pop', m: [{ w: 192, s: 1.06, dur: .2 }, { w: 193, s: 1, dur: .2 }] }),
  ]);
  S(194, 9, bg => [
    E(540, 560, O.register({ w: 620, fill: bg === 'coral' ? P.navy : P.coral }), { a: 'pop', sfx: 'pop' }),
    E(540, 560, O.cross({ w: 560, col: P.yellow, draw: { w: 196, sfx: 'buzz' } }), { a: 'none', w: 196 }),
    E(540, 1100, Tx("PAS BESOIN D'ÊTRE VENDU", 96), { a: 'stamp', w: 197, sfx: 'stamp' }),
  ]);
  S(199, 9, bg => [
    E(540, 380, Tx('IL SUFFIT', 220), { a: 'down' }),
    E(540, 720, tg(bg, '29 €', { w: 620 }), { a: 'pop', w: 201, sfx: 'pop', loop: 'pulse', amp: .04, per: .7 }),
    E(540, 1110, Tx('SUR LA CARTE', 170, 'var(--a1)'), { a: 'up', w: 203, sfx: 'stamp' }),
  ]);
  S(206, 9, bg => [
    E(540, 620, mid(bg, '19 €', { w: 780 }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .03, per: .8 }),
    E(540, 1100, Tx('« PAR RAISON »', 170, 'var(--a1)'), { a: 'up', w: 211 }),
  ]);
  S(213, 9, bg => [
    E(540, 640, card(bg, [{ p: '14 €' }, { p: '19 €', hl: true }, { p: '29 €' }], { w: 640, hlc: bg === 'yellow' ? P.coral : P.yellow }), { a: 'pop', sfx: 'pop', m: [{ w: 217, s: 1.06, dur: .25 }] }),
    E(540, 1210, Tx("LA CARTE L'A DÉSIGNÉ", 112, 'var(--a1)'), { a: 'up', w: 216, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 10 — BOUCLE : on revient sur la carte fermée du premier plan ===== */
  S(220, 10, bg => [
    E(540, 400, Tx('LA PROCHAINE FOIS', 124), { a: 'down' }),
    E(540, 820, card(bg, [{ p: '?' }, { p: '?' }, { p: '?' }], { w: 560 }), { a: 'right', w: 224, rot: 4, sfx: 'whoosh' }),
  ]);
  S(229, 10, bg => [
    E(540, 600, card(bg, [{ p: '?' }, { p: '?' }, { p: '?' }], { w: 600 }), { a: 'none', rot: -3, loop: 'swing', amp: 2, per: 1.2 }),
    E(540, 1200, Tx("AVANT DE L'OUVRIR…", 124, 'var(--a1)'), { a: 'up' }),
  ]);
})();
