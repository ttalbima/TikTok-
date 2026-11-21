/* Vidéo 002 — « Le jour où un pays a imprimé un billet de cent trillions »
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  // S(mot, scène, bg => [éléments])
  const S = (w, scene, f) => { const bg = CYCLE[k++ % 5]; shot({ w, bg, scene, html: f(bg) }); };
  // billet lisible sur tous les fonds
  const note = (bg, txt, o = {}) => O.note(txt, bg === 'green' ? { fill: P.cream, ink: P.green, ...o } : o);
  const dark = bg => bg === 'navy' || bg === 'green' || bg === 'coral';
  const obj = bg => (bg === 'navy' ? P.cream : P.navy);          // couleur d'objet contrastée
  const zeros = (n, cols, x0, y0, dx, dy, size, col, w, step = .06) =>
    Array.from({ length: n }, (_, i) => E(x0 + (i % cols) * dx, y0 + Math.floor(i / cols) * dy, Tx('0', size, col), { a: 'pop', w, d: i * step, dur: .2 })).join('');

  V.keywords = [11, 17, 27, 39, 40, 41, 50, 58, 72, 76, 83, 89, 94, 100, 109, 122, 131, 142, 147, 155, 162, 170, 177, 190, 194, 207];

  /* ===== SCÈNE 1 — HOOK ===== */
  S(0, 1, bg => [
    E(540, 700, Tx('LE JOUR OÙ', 220), { a: 'stamp', sfx: 'stamp' }),
    E(540, 960, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.yellow, sw: 28, draw: { d: .2, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  S(3, 1, bg => [
    E(540, 600, O.pin({ w: 420 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1090, Tx('UN PAYS', 240), { a: 'up', w: 4 }),
  ]);
  S(6, 1, bg => [
    E(540, 960, O.note('', { w: 440 }), { a: 'down', dist: 380, w: 8, sfx: 'print' }),
    E(540, 600, O.press({ w: 680, fill: P.navy }), { a: 'pop', sfx: 'pop', loop: 'shake', amp: 4, ld: .3, ldur: 2 }),
  ]);
  S(10, 1, bg => [
    E(540, 560, Tx('100', 520, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 990, Tx('TRILLIONS', 240), { a: 'stamp', w: 11, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(12, 2, bg => [
    E(540, 760, Tx('1', 900, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .7 }),
  ]);
  S(14, 2, bg => [
    zeros(20, 5, 180, 380, 180, 190, 190, 'var(--ink)', 14, .07),
    E(540, 1190, Tx(`${cnt({ from: 0, to: 20, dur: 1.4, sfx: 'tick' })} ZÉROS`, 170, 'var(--a1)'), { a: 'fade' }),
  ]);
  S(18, 2, bg => [
    E(540, 700, O.calendar('3 SEMAINES', { w: 700, fs: 104 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1190, Tx('PLUS TARD', 180, 'var(--a1)'), { a: 'up', w: 20 }),
  ]);
  S(22, 2, bg => [
    E(540, 560, note(bg, '100…', { w: 760 }), { a: 'pop', sfx: 'pop', m: [{ w: 25, s: .55, o: .35, r: -8, dur: .5, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1040, Tx('RIEN', 440, 'var(--a1)'), { a: 'stamp', w: 27, sfx: 'stamp' }),
  ]);
  S(28, 2, bg => [
    E(540, 520, Tx("POUR S'EN", 220), { a: 'down' }),
    E(540, 780, Tx('SORTIR', 300, 'var(--a1)'), { a: 'stamp', w: 31, sfx: 'stamp' }),
    E(540, 1110, O.arrow({ w: 420, fill: P.coral }), { a: 'left', w: 30, sfx: 'whoosh' }),
  ]);
  S(32, 2, bg => [
    E(540, 400, O.pin({ w: 260 }), { a: 'drop', sfx: 'thud' }),
    E(540, 760, Tx('UN TRUC', 240), { a: 'pop', w: 37, sfx: 'pop' }),
    E(540, 1060, Tx('RADICAL', 270, 'var(--a1)'), { a: 'stamp', w: 39, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — HONGRIE, 1946 ===== */
  S(40, 3, bg => [
    E(540, 500, O.pin({ w: 340 }), { a: 'drop', sfx: 'thud' }),
    E(540, 960, Tx('HONGRIE', 280, 'var(--a1)'), { a: 'stamp', d: .1, sfx: 'stamp' }),
  ]);
  S(41, 3, bg => [
    E(540, 740, Tx(cnt({ from: 1930, to: 1946, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    E(540, 1010, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 30, draw: { d: .5, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  S(42, 3, bg => [
    E(540, 620, Tx('GUERRE', 300), { a: 'pop', sfx: 'pop' }),
    E(540, 620, O.line('M20,20 H880', { w: 900, vw: 900, vh: 40, col: P.navy, sw: 34, draw: { w: 44, dur: .3, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(540, 990, Tx('FINIE', 300, 'var(--a2)'), { a: 'stamp', w: 46, sfx: 'stamp' }),
  ]);
  S(47, 3, bg => [
    E(540, 620, O.bank({ w: 640 }), { a: 'pop', m: [{ w: 49, r: 9, dy: 30, dur: .35, e: 'outBounce', sfx: 'thud' }] }),
    E(540, 1130, Tx('RUINÉ', 320, 'var(--a1)'), { a: 'stamp', w: 50, sfx: 'stamp' }),
  ]);
  S(51, 3, bg => [
    E(300, 640, O.receipt({ w: 300 }), { a: 'pop', rot: -10, sfx: 'pop' }),
    E(540, 600, O.receipt({ w: 300 }), { a: 'pop', d: .12 }),
    E(780, 640, O.receipt({ w: 300 }), { a: 'pop', d: .24, rot: 10 }),
    E(540, 1130, Tx('DÉPENSES', 230, 'var(--a1)'), { a: 'up', w: 54 }),
  ]);
  S(55, 3, bg => [
    E(300, 1000, note(bg, '', { w: 360 }), { a: 'none', w: 57, m: [{ w: 57, dx: -40, dy: 110, r: -12, dur: .35, sfx: 'print' }] }),
    E(780, 1000, note(bg, '', { w: 360 }), { a: 'none', w: 58, m: [{ w: 58, dx: 40, dy: 110, r: 12, dur: .35, sfx: 'print' }] }),
    E(540, 640, O.press({ w: 700 }), { a: 'pop', sfx: 'pop', loop: 'shake', amp: 4, lw: 56 }),
    E(540, 300, Tx("L'ÉTAT", 180, 'var(--a1)'), { a: 'down', d: .05 }),
  ]);
  S(59, 3, bg => [
    ...Array.from({ length: 14 }, (_, i) => E(150 + (i * 263) % 800, 330 + (i * 197) % 760, note(bg, '', { w: 300 }), { a: 'drop', d: i * .06, dur: .5, rot: (i * 47) % 50 - 25, sfx: i % 5 === 0 ? 'swish' : undefined })),
    E(540, 760, Tx('BEAUCOUP', 250), { a: 'stamp', d: .25, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 4 — LE MÉCANISME ===== */
  S(62, 4, bg => [
    E(540, 660, Tx('SAUF', 380), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1020, Tx('QUE…', 380, 'var(--a1)'), { a: 'stamp', w: 63 }),
  ]);
  S(64, 4, bg => [
    ...[0, 1, 2, 3].map(i => E(540 + (i % 2 ? 30 : -30), 1040 - i * 170, note(bg, '', { w: 520 }), { a: 'drop', d: i * .22, dur: .45, rot: i % 2 ? 5 : -5, sfx: 'thud' })),
    E(540, 330, Tx('+ DE BILLETS', 170, 'var(--a1)'), { a: 'down', w: 68 }),
  ]);
  S(70, 4, bg => [
    E(540, 620, note(bg, '', { w: 820 }), { a: 'pop', m: [{ w: 71, s: .32, dur: .7, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1100, Tx('- DE VALEUR', 190, 'var(--a1)'), { a: 'stamp', w: 72, sfx: 'stamp' }),
  ]);
  S(73, 4, bg => [
    E(540, 520, O.line('M20,440 C240,430 380,360 460,220 S560,60 620,30', { w: 860, vw: 640, vh: 470, col: P.coral, sw: 30, draw: { w: 75, dur: .6, sfx: 'rise' } }), { a: 'none' }),
    E(300, 840, O.tag('PRIX', { w: 420 }), { a: 'pop', sfx: 'pop', m: [{ w: 75, dx: 420, dy: -470, dur: .6, e: 'inOut' }] }),
    E(540, 1150, Tx('MONTENT', 240, 'var(--a1)'), { a: 'stamp', w: 76, sfx: 'stamp' }),
  ]);
  S(77, 4, bg => [
    ...[0, 1, 2].map(i => E(540, 1030, O.note('', { w: 380 }), { a: 'none', w: 79, d: i * .18, m: [{ w: 79, d: i * .18, dx: (i - 1) * 300, dy: 150, r: (i - 1) * 14, dur: .3, sfx: 'print' }] })),
    E(540, 700, O.press({ w: 660 }), { a: 'pop', sfx: 'pop', loop: 'shake', amp: 5, lw: 79 }),
    E(540, 310, Tx('ENCORE', 200, 'var(--a1)'), { a: 'stamp', w: 80 }),
  ]);
  S(81, 4, bg => [
    E(540, 640, O.burst({ w: 1100, n: 16 }), { a: 'pop', loop: 'spin', per: 1.6, cut: false }),
    E(540, 640, O.press({ w: 620, fill: P.navy }), { a: 'pop', sfx: 'pop', loop: 'shake', amp: 12 }),
    E(540, 1150, Tx("S'EMBALLE", 210, 'var(--a1)'), { a: 'stamp', w: 83, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 5 — TOUTES LES QUINZE HEURES ===== */
  S(84, 5, bg => [
    E(540, 600, O.calendar('JUILLET', { w: 640, fs: 130 }), { a: 'spin', sfx: 'swish', m: [{ w: 85, r: -5, dur: .2 }, { w: 85, d: .25, r: 0, dur: .2 }] }),
    E(540, 1120, Tx('1946', 320, 'var(--a1)'), { a: 'stamp', w: 86, sfx: 'stamp', m: [{ w: 86, d: .7, s: 1.08, dur: .2 }, { w: 86, d: .95, s: 1, dur: .2 }] }),
  ]);
  S(87, 5, bg => [
    E(540, 420, O.tag('PRIX', { w: 520, fill: P.navy, ink: P.cream }), { a: 'down' }),
    E(540, 900, Tx('×2', 620, 'var(--a1)'), { a: 'stamp', w: 89, sfx: 'stamp' }),
  ]);
  S(90, 5, bg => [
    E(540, 640, O.clock({ w: 700 }), { a: 'pop', sfx: 'pop' }),
    E(540, 640, O.hand({ w: 700 }), { a: 'none', loop: 'spin', per: 1.1, cut: false }),
    E(540, 640, O.hand({ w: 700, col: P.navy, len: .24, sw: 30 }), { a: 'none', loop: 'spin', per: 6, cut: false }),
    E(540, 1170, Tx('15 H', 260, 'var(--a1)'), { a: 'stamp', w: 93, sfx: 'stamp' }),
  ]);
  S(95, 5, bg => [
    E(540, 560, Tx('TU AS BIEN', 210), { a: 'down' }),
    E(540, 860, Tx('ENTENDU', 300, 'var(--a1)'), { a: 'stamp', w: 98, sfx: 'stamp' }),
  ]);
  S(99, 5, bg => [
    E(540, 620, Tx('15', 700), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1090, Tx('HEURES', 260, 'var(--a1)'), { a: 'up', w: 100 }),
  ]);
  S(101, 5, bg => [
    E(250, 400, O.sun({ w: 340 }), { a: 'spin', w: 105, loop: 'spin', per: 8, cut: false }),
    E(540, 800, O.bread({ w: 560 }), { a: 'pop', sfx: 'pop' }),
    E(780, 1100, O.tag('PRIX', { w: 380 }), { a: 'pop', w: 104, rot: -6 }),
  ]);
  S(107, 5, bg => [
    E(540, 400, O.bread({ w: 320 }), { a: 'pop' }),
    E(540, 900, Tx('×3', 660, 'var(--a1)'), { a: 'stamp', w: 109, sfx: 'stamp' }),
  ]);
  S(110, 5, bg => [
    E(300, 520, O.moon({ w: 300 }), { a: 'pop', m: [{ w: 112, dx: -600, dy: -300, dur: .4, e: 'inOut' }] }),
    E(700, 620, O.sun({ w: 460 }), { a: 'up', dist: 800, w: 112, sfx: 'rise', loop: 'spin', per: 8, cut: false }),
    E(540, 1130, Tx('LE LENDEMAIN', 160, 'var(--a1)'), { a: 'up', w: 111 }),
  ]);
  S(113, 5, bg => [
    E(540, 820, note(bg, '', { w: 720 }), { a: 'pop', sfx: 'pop' }),
    E(760, 420, O.moon({ w: 300, fill: P.navy }), { a: 'spin', w: 116, sfx: 'pop' }),
    E(300, 400, Tx('1 NUIT', 180), { a: 'left', w: 116 }),
  ]);
  const third = (x, o) => E(x, 620, O.rect(280, 420, P.cream, 18), o);
  S(118, 5, bg => [
    third(240, { a: 'pop' }),
    third(540, { a: 'pop', d: .06, m: [{ w: 121, dy: 1300, r: 25, dur: .45, e: 'inOut', sfx: 'fall' }] }),
    third(840, { a: 'pop', d: .12, m: [{ w: 122, dy: 1300, r: -25, dur: .45, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1130, Tx('- 2/3', 320, 'var(--a1)'), { a: 'stamp', w: 122, d: .1, sfx: 'stamp' }),
  ]);
  S(123, 5, bg => [
    E(540, 600, O.rect(280, 420, P.cream, 18), { a: 'none', loop: 'pulse', amp: .04, per: .8 }),
    E(540, 1090, Tx('IL RESTE 1/3', 190, 'var(--a1)'), { a: 'up', w: 124 }),
  ]);

  /* ===== SCÈNE 6 — DES ZÉROS, ENCORE DES ZÉROS ===== */
  S(126, 6, bg => [
    E(540, 640, O.bank({ w: 700, fill: P.navy }), { a: 'drop', sfx: 'thud' }),
    E(540, 1130, Tx('LA BANQUE', 210, 'var(--a1)'), { a: 'up', w: 128 }),
  ]);
  S(129, 6, bg => [
    E(170, 700, Tx('1', 320, 'var(--a1)'), { a: 'pop', sfx: 'pop' }),
    zeros(5, 5, 330, 700, 150, 0, 320, 'var(--ink)', 129, .14),
    E(540, 1090, Tx('+ DES ZÉROS', 170, 'var(--a1)'), { a: 'up', w: 131 }),
  ]);
  S(132, 6, bg => [
    zeros(12, 6, 165, 420, 150, 240, 240, 'var(--ink)', 132, .04),
    E(540, 1090, Tx('ENCORE', 300, 'var(--a1)'), { a: 'stamp', d: .1, sfx: 'stamp' }),
  ]);
  S(133, 6, bg => [
    zeros(24, 6, 165, 330, 150, 190, 190, 'var(--ink)', 133, .03),
    E(540, 1160, Tx('ET ENCORE', 250, 'var(--a1)'), { a: 'stamp', w: 134, sfx: 'stamp' }),
  ]);
  S(135, 6, bg => [
    E(540, 760, O.calendar('11 JUILLET', { w: 760, fs: 112 }), { a: 'spin', sfx: 'swish' }),
  ]);
  S(138, 6, bg => [
    E(540, 760, O.note('100 000 000 000 000 000 000', { w: 960, fs: 44 }), { a: 'drop', sfx: 'thud', rot: -4, m: [{ w: 139, d: .3, s: 1.06, dur: .2 }, { w: 139, d: .55, s: 1, dur: .2 }] }),
  ]);
  S(141, 6, bg => [
    E(540, 500, Tx('100', 520, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 890, Tx('TRILLIONS', 240), { a: 'stamp', w: 142, sfx: 'stamp' }),
    E(540, 1150, Tx('DE PENGŐS', 180, 'var(--a2)'), { a: 'up', w: 144 }),
  ]);
  S(145, 6, bg => [
    E(540, 800, O.note('100…', { w: 760 }), { a: 'pop', sfx: 'pop' }),
    E(540, 480, O.crown({ w: 300, fill: P.coral, band: T.coral2 }), { a: 'drop', w: 147, dur: .45, sfx: 'ding' }),
    E(540, 1170, Tx('LE PLUS GROS', 200), { a: 'stamp', w: 147, d: .1 }),
  ]);
  S(149, 6, bg => [
    E(230, 760, O.person({ w: 340, fill: P.cream }), { a: 'left' }),
    E(850, 760, O.person({ w: 340, fill: P.navy }), { a: 'right' }),
    E(330, 1010, O.note('', { w: 300 }), { a: 'pop', d: .15, m: [{ w: 150, dx: 420, dur: .45, e: 'inOut', sfx: 'swish' }] }),
    E(540, 1240, Tx('EN CIRCULATION', 130, 'var(--a1)'), { a: 'up', w: 151, dist: 200 }),
  ]);
  S(152, 6, bg => [
    E(540, 540, O.line('M20,450 C320,445 480,380 540,240 S600,60 620,20', { w: 860, vw: 640, vh: 470, col: P.coral, sw: 30, draw: { dur: .8, sfx: 'rise' } }), { a: 'none' }),
    E(540, 1100, Tx('RECORD', 340, 'var(--a1)'), { a: 'stamp', w: 155, sfx: 'stamp' }),
  ]);
  S(156, 6, bg => [
    E(540, 400, Tx("D'INFLATION", 190, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 900, O.book('HISTOIRE', { w: 520, fs: 100 }), { a: 'drop', w: 158, sfx: 'thud' }),
  ]);

  /* ===== SCÈNE 7 — LE TRUC RADICAL ===== */
  S(159, 7, bg => [
    E(540, 560, Tx('ET LE TRUC', 220), { a: 'down' }),
    E(540, 880, Tx('RADICAL ?', 250, 'var(--a1)'), { a: 'stamp', w: 162, sfx: 'stamp' }),
  ]);
  S(163, 7, bg => [
    E(540, 760, O.calendar('1ER AOÛT', { w: 760, fs: 130 }), { a: 'spin', sfx: 'swish' }),
  ]);
  S(166, 7, bg => [
    E(540, 360, O.note('', { w: 420 }), { a: 'down', m: [{ w: 168, dy: 520, s: .6, r: 20, dur: .45, e: 'inOut', sfx: 'fall' }] }),
    E(540, 960, O.bin({ w: 520 }), { a: 'up', sfx: 'pop' }),
  ]);
  S(169, 7, bg => [
    E(540, 660, Tx('PENGŐ', 400), { a: 'pop', sfx: 'pop' }),
    E(540, 660, O.line('M20,20 H900', { w: 920, vw: 920, vh: 40, col: P.coral, sw: 36, draw: { w: 170, dur: .3, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(540, 1090, Tx('À LA POUBELLE', 150, 'var(--a1)'), { a: 'up', w: 170, d: .15 }),
  ]);
  S(171, 7, bg => [
    E(540, 660, O.burst({ w: 1050, n: 14, col: P.coral }), { a: 'pop', w: 173, loop: 'spin', per: 6, cut: false }),
    E(540, 660, O.coin('F', { w: 460, small: 't' }), { a: 'spin', w: 173, sfx: 'coin' }),
    E(540, 1150, Tx('NOUVELLE', 240, 'var(--a1)'), { a: 'up', w: 175 }),
  ]);
  S(176, 7, bg => [
    E(540, 560, O.coin('F', { w: 520, small: 't' }), { a: 'drop', sfx: 'coin' }),
    E(540, 1090, Tx('FORINT', 340, 'var(--a1)'), { a: 'stamp', w: 177, sfx: 'stamp' }),
  ]);
  S(178, 7, bg => [
    E(540, 600, O.disc({ w: 560, fill: P.navy }), { a: 'pop' }),
    E(540, 600, O.coin('F', { w: 420, small: 't' }), { a: 'pop', d: .08, sfx: 'pop' }),
    E(540, 1110, Tx('1 SEUL', 280), { a: 'stamp', w: 180, sfx: 'stamp' }),
  ]);
  S(182, 7, bg => [
    E(540, 420, O.coin('F', { w: 300, small: 't' }), { a: 'pop' }),
    E(540, 700, Tx('=', 300), { a: 'pop', w: 183, sfx: 'pop' }),
    ...[0, 1, 2, 3, 4].map(i => E(300 + i * 120, 1040 - (i % 2) * 60, note(bg, '', { w: 300 }), { a: 'drop', w: 185, d: i * .08, dur: .45, rot: (i - 2) * 9 })),
  ]);
  S(188, 7, bg => [
    E(540, 420, Tx('400 000 000 000', 135), { a: 'left', sfx: 'tick' }),
    E(540, 600, Tx('000 000 000 000', 135), { a: 'right', d: .15 }),
    E(540, 780, Tx('000 000', 135), { a: 'left', d: .3 }),
    E(540, 1110, Tx('30 CHIFFRES', 200, 'var(--a1)'), { a: 'stamp', w: 189, sfx: 'stamp' }),
  ]);
  S(191, 7, bg => [
    E(540, 560, O.coin('F', { w: 480, small: 't' }), { a: 'pop', sfx: 'coin', loop: 'pulse', amp: .03, per: .9 }),
    E(820, 380, O.check({ w: 220, draw: { w: 193, sfx: 'pop' } }), { a: 'none', w: 193 }),
    E(540, 1090, Tx('EXISTE TOUJOURS', 135, 'var(--a1)'), { a: 'up', w: 193 }),
  ]);

  /* ===== SCÈNE 8 — BOUCLE ===== */
  S(195, 8, bg => [
    E(540, 660, Tx('ET TOUT', 300), { a: 'stamp', sfx: 'stamp' }),
    E(540, 990, Tx('ÇA…', 380, 'var(--a1)'), { a: 'stamp', w: 197 }),
  ]);
  S(198, 8, bg => [
    E(540, 600, O.burst({ w: 900, n: 12 }), { a: 'pop', w: 202, loop: 'spin', per: 5, cut: false }),
    E(540, 620, O.disc({ w: 660, fill: P.navy }), { a: 'pop' }),
    E(540, 600, O.bulb({ w: 380, ink: P.cream }), { a: 'pop', d: .06, sfx: 'pop' }),
    E(540, 1130, Tx('UNE IDÉE', 240, 'var(--a2)'), { a: 'up', w: 201 }),
  ]);
  S(203, 8, bg => [
    E(540, 640, Tx('TOUTE', 320), { a: 'pop', sfx: 'pop' }),
    E(540, 960, Tx('SIMPLE', 320, 'var(--a1)'), { a: 'pop', w: 204, sfx: 'pop' }),
  ]);
  S(205, 8, bg => [
    ...[0, 1, 2].map(i => E(540, 980, note(bg, '', { w: 380 }), { a: 'none', w: 206, d: i * .16, m: [{ w: 206, d: i * .16, dx: (i - 1) * 300, dy: 150, r: (i - 1) * 14, dur: .3, sfx: 'print' }] })),
    E(540, 620, O.press({ w: 700 }), { a: 'pop', sfx: 'pop', loop: 'shake', amp: 5, lw: 206 }),
  ]);
  S(208, 8, bg => [
    E(540, 600, Tx("JUSQU'AU", 240), { a: 'down' }),
    E(540, 880, Tx('JOUR OÙ…', 250, 'var(--a1)'), { a: 'stamp', w: 209, sfx: 'stamp', loop: 'pulse', amp: .04, per: .6 }),
  ]);
})();
