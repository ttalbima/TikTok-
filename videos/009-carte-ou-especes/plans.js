/* Vidéo 009 — « Carte ou espèces »
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;

  /* ----- objets propres à cette vidéo (génériques, sans logo) ----- */
  O.card = (o = {}) => {
    const { w = 560, fill = P.navy, ink = P.cream } = o;
    return svg(w, 560, 350,
      `<rect width="560" height="350" rx="34" fill="${fill}"/>
       <rect x="50" y="110" width="96" height="74" rx="12" fill="${P.yellow}"/><path d="M50,147 H146 M98,110 V184" stroke="${T.yellow2}" stroke-width="6"/>
       <g fill="${ink}" opacity=".85">${[0, 1, 2, 3].map(g => [0, 1, 2, 3].map(i => `<circle cx="${62 + g * 118 + i * 24}" cy="250" r="8"/>`).join('')).join('')}</g>
       <rect x="50" y="290" width="200" height="16" rx="8" fill="${ink}" opacity=".5"/>`);
  };
  O.wallet = (o = {}) => {
    const { w = 600, fill = T.coral2, ink = P.cream } = o;
    return svg(w, 600, 420,
      `<rect width="600" height="420" rx="40" fill="${fill}"/><rect x="0" y="0" width="600" height="150" rx="40" fill="rgba(0,0,0,.22)"/>
       <rect x="400" y="170" width="200" height="110" rx="26" fill="rgba(0,0,0,.28)"/><circle cx="452" cy="225" r="24" fill="${ink}"/>
       <path d="M40,330 H360" stroke="${ink}" stroke-width="10" stroke-dasharray="26 18" opacity=".5"/>`);
  };
  O.terminal = (o = {}) => {
    const { w = 400, fill = P.navy } = o;
    return svg(w, 400, 640,
      `<rect width="400" height="640" rx="44" fill="${fill}"/><rect x="40" y="46" width="320" height="210" rx="18" fill="${T.green2}"/>
       <g fill="${P.cream}">${[0, 1, 2, 3].map(r => [0, 1, 2].map(c => `<rect x="${56 + c * 104}" y="${300 + r * 78}" width="80" height="54" rx="12"/>`).join('')).join('')}</g>`);
  };
  O.croissant = (o = {}) => {
    const { w = 520 } = o;
    return svg(w, 520, 320,
      `<path d="M10,290 Q0,40 260,20 Q520,40 510,290 Q430,210 260,215 Q90,210 10,290 Z" fill="${T.yellow2}"/>
       <g stroke="${P.cream}" stroke-width="14" stroke-linecap="round" opacity=".8"><path d="M130,70 L160,205 M260,36 V210 M390,70 L360,205"/></g>`);
  };
  O.cup = (o = {}) => {
    const { w = 420, fill = P.cream, ink = P.navy } = o;
    return svg(w, 420, 440,
      `<g fill="none" stroke="${fill}" stroke-width="16" stroke-linecap="round" opacity=".7"><path d="M130,90 q-30,-40 0,-80 M210,90 q-30,-40 0,-80"/></g>
       <path d="M300,190 h50 a60,60 0 0 1 0,130 h-60" fill="none" stroke="${fill}" stroke-width="34"/>
       <path d="M30,140 H310 V300 a110,110 0 0 1 -110,110 h-60 a110,110 0 0 1 -110,-110 Z" fill="${fill}"/>
       <rect x="60" y="170" width="220" height="36" rx="18" fill="${ink}" opacity=".85"/>`);
  };
  O.ball = (o = {}) => {
    const { w = 420 } = o;
    return svg(w, 420, 420,
      `<circle cx="210" cy="210" r="205" fill="${P.coral}"/>
       <g fill="none" stroke="${P.navy}" stroke-width="14"><path d="M5,210 H415 M210,5 V415"/><path d="M60,70 Q210,210 60,350 M360,70 Q210,210 360,350"/></g>`);
  };
  O.ticket = (o = {}) => {
    const { w = 520, fill = P.cream, ink = P.navy } = o;
    return svg(w, 520, 240,
      `<path d="M0,0 H520 V80 a40,40 0 0 0 0,80 V240 H0 V160 a40,40 0 0 0 0,-80 Z" fill="${fill}"/>
       <path d="M370,20 V220" stroke="${ink}" stroke-width="8" stroke-dasharray="18 14" opacity=".6"/>
       <text x="205" y="150" text-anchor="middle" font-size="96" fill="${ink}">PLACE</text>`);
  };
  O.bolt = (o = {}) => {
    const { w = 300, fill = P.yellow } = o;
    return svg(w, 300, 460, `<path d="M190,0 L20,260 H140 L100,460 L290,180 H160 Z" fill="${fill}"/>`);
  };
  O.envelope = (o = {}) => {
    const { w = 560, fill = P.cream, ink = P.navy } = o;
    return svg(w, 560, 380,
      `<rect width="560" height="380" rx="20" fill="${fill}"/><path d="M0,20 L280,220 L560,20" fill="none" stroke="${ink}" stroke-width="14" opacity=".55"/>
       <circle cx="280" cy="250" r="46" fill="${P.coral}"/>`);
  };

  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f, d) => { const bg = CYCLE[k++ % 5]; shot({ w, d, bg, scene, html: f(bg) }); };
  // variantes lisibles selon le fond
  const bill = (bg, o = {}) => O.note('', bg === 'green' ? { fill: P.cream, ink: P.green, ...o } : o);
  const card = (bg, o = {}) => O.card(bg === 'navy' ? { fill: P.cream, ink: P.navy, ...o } : o);
  const bolt = (bg, o = {}) => O.bolt({ fill: bg === 'yellow' ? P.coral : P.yellow, ...o });
  const dk = bg => (bg === 'navy' ? P.cream : P.navy);
  const line = (y, col, d = {}) => E(540, y, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col, sw: 28, draw: d }), { a: 'none', cut: false });

  V.keywords = [1, 7, 9, 23, 29, 34, 48, 55, 61, 65, 70, 79, 80, 98, 100, 106, 116, 134, 140, 148, 166, 175, 177, 185, 189, 195, 197, 200, 205, 214, 218, 236];

  /* ===== SCÈNE 1 — HOOK ===== */
  // accroche en trois plans, la carte reste à l'écran du début à la fin
  S(1, 1, bg => [
    E(540, 520, card(bg, { w: 660 }), { a: 'left', rot: -6, sfx: 'whoosh', loop: 'float', amp: 8, per: 1.6 }),
    E(540, 960, Tx('PRÊT À PAYER', 168), { a: 'up', w: 5 }),
    E(540, 1190, Tx('PLUS CHER', 240, 'var(--a1)'), { a: 'stamp', w: 6, sfx: 'stamp' }),
  ]);
  k = 2;                                             // garde les fonds d'origine (vert, crème, puis la suite inchangée)
  S(7, 1, bg => [
    E(300, 520, card(bg, { w: 440 }), { a: 'none', rot: -6 }),
    E(780, 700, bill(bg, { w: 440 }), { a: 'right', rot: 8, sfx: 'whoosh' }),
    E(540, 1120, Tx("QU'AVEC DES BILLETS", 120, 'var(--a1)'), { a: 'up', w: 7 }),
  ]);
  S(7, 1, bg => [
    E(540, 440, card(bg, { w: 520 }), { a: 'none', rot: -6 }),
    E(540, 770, Tx('PARFOIS', 180), { a: 'down' }),
    E(540, 1120, Tx('×2', 420, 'var(--a1)'), { a: 'stamp', w: 9, sfx: 'stamp', loop: 'pulse', amp: .03, per: .6 }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(10, 2, bg => [
    E(540, 600, Tx('RIEN', 380), { a: 'stamp', w: 13, sfx: 'stamp' }),
    E(540, 940, Tx('À VOIR', 320, 'var(--a1)'), { a: 'stamp', w: 14 }),
    E(540, 330, Tx('ET ÇA…', 150), { a: 'down' }),
  ]);
  S(16, 2, bg => [
    E(540, 760, O.box('COMPTE', { w: 640, fs: 66 }), { a: 'up', sfx: 'pop' }),
    E(400, 420, O.coin('€', { w: 200, small: '' }), { a: 'drop', w: 17, dur: .45, sfx: 'coin' }),
    E(680, 400, O.coin('€', { w: 200, small: '' }), { a: 'drop', w: 17, d: .12, dur: .45 }),
    E(540, 720, O.cross({ w: 640, draw: { w: 18, sfx: 'buzz' } }), { a: 'none', w: 18 }),
  ]);
  S(19, 2, bg => [
    E(540, 560, bolt(bg, { w: 380 }), { a: 'drop', dur: .4, sfx: 'thud', loop: 'shake', amp: 6, ld: .3, ldur: .5 }),
    E(540, 1110, Tx('DOULEUR', 260, 'var(--a1)'), { a: 'stamp', w: 23, sfx: 'stamp' }),
  ]);
  S(24, 2, bg => [
    E(540, 420, O.eye({ w: 440 }), { a: 'pop', sfx: 'pop' }),
    E(540, 800, Tx("D'OÙ ÇA", 280), { a: 'up', w: 25 }),
    E(540, 1090, Tx('VIENT ?', 300, 'var(--a1)'), { a: 'stamp', w: 27, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — L'ENCHÈRE DE 2001 ===== */
  S(28, 3, bg => [
    E(540, 740, Tx(cnt({ from: 1985, to: 2001, d: .1, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    line(1010, P.coral, { d: .6, dur: .3 }),
  ]);
  const cher = (o = {}) => O.person({ w: 360, fill: P.navy, coat: true, ink: P.cream, ...o });
  S(30, 3, bg => [
    E(320, 720, cher({ fill: P.yellow }), { a: 'pop', sfx: 'pop' }),
    E(760, 720, cher({ fill: P.yellow }), { a: 'pop', w: 31, sfx: 'pop' }),
    E(540, 1170, Tx('2 CHERCHEURS', 160), { a: 'up', w: 31 }),
  ]);
  S(32, 3, bg => [
    E(540, 520, O.clipboard({ w: 360 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1040, O.stamp('ENCHÈRE', { w: 860, fs: 170, h: 280, col: P.coral }), { a: 'stamp', w: 34, rot: -5, sfx: 'stamp' }),
  ]);
  S(35, 3, bg => [
    E(540, 580, O.bank({ w: 640 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1040, Tx('ÉCOLE', 260, 'var(--a1)'), { a: 'stamp', w: 37, sfx: 'stamp' }),
    E(540, 1240, Tx('DE COMMERCE', 130), { a: 'up', w: 38, dist: 200 }),
  ]);
  S(40, 3, bg => [
    E(540, 460, O.crown({ w: 380, fill: P.coral, band: T.coral2 }), { a: 'drop', dur: .45, sfx: 'ding' }),
    E(540, 900, Tx('À GAGNER', 235), { a: 'stamp', w: 41, sfx: 'stamp' }),
  ]);
  S(42, 3, bg => [
    E(480, 560, O.ticket({ w: 640, fill: P.navy, ink: P.cream }), { a: 'left', rot: -7, sfx: 'swish' }),
    E(600, 860, O.ticket({ w: 640, fill: P.yellow }), { a: 'right', w: 43, rot: 6, sfx: 'swish' }),
    E(540, 1170, Tx('2 PLACES', 240, 'var(--a2)'), { a: 'up', w: 43 }),
  ]);
  S(44, 3, bg => [
    E(540, 600, O.ball({ w: 560 }), { a: 'drop', sfx: 'thud', loop: 'float', amp: 20, per: .7, ld: .65 }),
    E(540, 1130, Tx('MATCH DE BASKET', 128, 'var(--a1)'), { a: 'up', w: 46 }),
  ]);
  S(49, 3, bg => [
    E(220, 760, O.person({ w: 280, fill: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(540, 700, O.person({ w: 320, fill: P.navy }), { a: 'pop', d: .12 }),
    E(860, 760, O.person({ w: 280, fill: P.cream }), { a: 'pop', d: .24 }),
    E(540, 1170, Tx('LES ÉTUDIANTS', 160, 'var(--a1)'), { a: 'up', w: 50 }),
  ]);
  S(51, 3, bg => [
    E(540, 640, O.clipboard({ w: 520 }), { a: 'up', sfx: 'pop' }),
    E(560, 700, O.line('M20,60 C120,10 180,110 280,60 S420,10 500,60', { w: 380, vw: 520, vh: 120, col: P.coral, sw: 22, draw: { w: 51, d: .2, dur: .7, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(540, 1180, Tx('LEUR OFFRE', 190, 'var(--a2)'), { a: 'up', w: 52 }),
  ]);
  S(54, 3, bg => [
    E(540, 600, O.envelope({ w: 700 }), { a: 'pop', sfx: 'pop', m: [{ w: 55, r: -5, dur: .2 }, { w: 55, d: .25, r: 0, dur: .2 }] }),
    E(540, 1100, Tx('SECRET', 320, 'var(--a1)'), { a: 'stamp', w: 55, sfx: 'stamp' }),
  ]);
  const trio = (fill, y = 560, a = {}) => [0, 1, 2].map(i => E(240 + i * 300, y, O.person({ w: 250, fill }), { a: 'pop', d: i * .08, ...a })).join('');
  S(56, 3, bg => [
    trio(P.navy),
    E(540, 960, bill(bg, { w: 620 }), { a: 'up', w: 60, sfx: 'swish' }),
    E(540, 1220, Tx('EN ESPÈCES', 180, 'var(--a1)'), { a: 'stamp', w: 61, sfx: 'stamp' }),
  ]);
  S(62, 3, bg => [
    trio(P.cream),
    E(540, 960, O.card({ w: 520, fill: P.coral }), { a: 'up', w: 64, sfx: 'swish' }),
    E(540, 1240, Tx('PAR CARTE', 180, 'var(--a1)'), { a: 'stamp', w: 65, sfx: 'stamp' }),
  ]);
  S(66, 3, bg => [
    E(540, 560, O.ball({ w: 480 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1080, Tx('MÊME MATCH', 185, 'var(--a1)'), { a: 'stamp', w: 67, sfx: 'stamp' }),
  ]);
  S(70, 3, bg => [
    E(540, 500, O.ticket({ w: 600 }), { a: 'pop', rot: -5, sfx: 'pop' }),
    E(540, 760, O.ticket({ w: 600, fill: P.yellow }), { a: 'pop', d: .1, rot: 4 }),
    E(540, 1130, Tx('MÊMES PLACES', 160, 'var(--a1)'), { a: 'stamp', w: 70, sfx: 'stamp' }),
  ]);
  S(70, 3, bg => [
    E(540, 740, Tx('RÉSULTAT', 240, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    line(920, P.coral, { d: .2, dur: .3 }),
  ]);
  S(71, 3, bg => [
    E(300, 1100 - 150, O.bar(300, { w: 260, fill: T.green2, grow: { d: .05 } }), { a: 'none' }),
    E(780, 1100 - 340, O.bar(680, { w: 260, fill: P.navy, grow: { w: 76, dur: .7, sfx: 'rise' } }), { a: 'none' }),
    E(300, 1170, Tx('ESPÈCES', 70, 'var(--ink)', { font: 'inter' }), { a: 'fade', cut: false }),
    E(780, 1170, Tx('CARTE', 70, 'var(--ink)', { font: 'inter' }), { a: 'fade', w: 74, cut: false }),
    E(780, 330, O.card({ w: 240, fill: P.coral }), { a: 'drop', w: 75, dur: .45, sfx: 'pop' }),
  ]);
  S(77, 3, bg => [
    E(540, 700, Tx('×2', 560, 'var(--a1)'), { a: 'stamp', w: 78, sfx: 'stamp' }),
    E(540, 290, Tx('PLUS DU', 170), { a: 'down' }),
    E(540, 1160, Tx('DOUBLE', 260), { a: 'stamp', w: 79 }),
  ]);

  /* ===== SCÈNE 4 — LA DOULEUR DE PAYER ===== */
  S(80, 4, bg => [
    E(540, 640, Tx('POURQUOI', 250), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1000, Tx('?', 440, 'var(--a1)'), { a: 'pop', d: .25, rot: 8, sfx: 'pop', loop: 'swing', amp: 6, per: .7 }),
  ]);
  S(81, 4, bg => [
    E(540, 640, O.calendar('AVANT', { w: 660, fs: 150 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1150, Tx('PLUS TÔT', 240, 'var(--a1)'), { a: 'up', w: 83 }),
  ]);
  S(85, 4, bg => [
    E(240, 760, cher({ w: 280, fill: P.yellow }), { a: 'pop', sfx: 'pop' }),
    E(540, 700, cher({ w: 320, fill: P.yellow }), { a: 'pop', d: .12 }),
    E(840, 760, cher({ w: 280, fill: P.yellow }), { a: 'pop', d: .24 }),
    E(540, 1180, Tx("D'AUTRES CHERCHEURS", 110, 'var(--a1)'), { a: 'up', w: 86, dist: 200 }),
  ], undefined);
  S(88, 4, bg => [
    E(540, 600, O.tag('?', { w: 820, fill: P.navy, ink: P.cream, fs: 190 }), { a: 'drop', sfx: 'thud', rot: -4 }),
    E(540, 1090, Tx('UN NOM', 300, 'var(--a1)'), { a: 'stamp', w: 90, sfx: 'stamp' }),
  ]);
  S(91, 4, bg => [
    E(380, 700, O.person({ w: 420, fill: P.cream }), { a: 'left' }),
    E(800, 480, bolt(bg, { w: 220 }), { a: 'pop', w: 94, sfx: 'pop', loop: 'shake', amp: 8, lw: 94 }),
    E(540, 1180, Tx('EN PAYANT', 220, 'var(--a1)'), { a: 'up', w: 95 }),
  ]);
  S(97, 4, bg => [
    E(540, 1220, bolt(bg, { w: 130 }), { a: 'spin', w: 100, d: .15, sfx: 'pop' }),
    E(540, 520, Tx('LA DOULEUR', 220), { a: 'stamp', w: 98, sfx: 'stamp' }),
    E(540, 860, Tx('DE PAYER', 260, 'var(--a1)'), { a: 'stamp', w: 99, sfx: 'stamp' }),
    line(1070, P.coral, { w: 100, dur: .3 }),
  ]);

  /* ===== SCÈNE 5 — LE BILLET, PUIS LA CARTE ===== */
  S(101, 5, bg => [
    E(540, 560, bill(bg, { w: 820 }), { a: 'drop', sfx: 'thud', rot: -3 }),
    E(860, 300, bolt(bg, { w: 180 }), { a: 'pop', w: 105, sfx: 'pop' }),
    E(540, 1090, Tx('TU LA SENS', 210, 'var(--a1)'), { a: 'stamp', w: 105, sfx: 'stamp' }),
  ]);
  S(107, 5, bg => [
    E(540, 640, bill(bg, { w: 420 }), { a: 'none', w: 109, m: [{ w: 109, dy: -330, r: -8, dur: .4, sfx: 'swish' }] }),
    E(540, 760, O.wallet({ w: 680, fill: bg === 'coral' ? P.navy : T.coral2 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1190, Tx('TU OUVRES', 200, 'var(--a1)'), { a: 'up', w: 108 }),
  ]);
  S(111, 5, bg => [
    ...[0, 1, 2].map(i => E(540 + (i - 1) * 50, 430 + i * 210, bill(bg, { w: 520 }), { a: 'pop', d: .05 + i * .22, rot: (i - 1) * 6, sfx: 'tick' })),
    E(880, 330, Tx(cnt({ from: 0, to: 3, d: .05, dur: .6 }), 260, 'var(--a1)'), { a: 'pop' }),
    E(540, 1210, Tx('TU COMPTES', 170, 'var(--a1)'), { a: 'up', w: 112, dist: 200 }),
  ]);
  S(113, 5, bg => [
    E(300, 440, O.eye({ w: 400, px: .7 }), { a: 'pop', sfx: 'pop' }),
    E(480, 860, bill(bg, { w: 560 }), { a: 'pop', d: .08, m: [{ w: 116, dx: 1100, r: 18, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1200, Tx('PARTIR', 240, 'var(--a2)'), { a: 'stamp', w: 116, d: .1 }),
  ]);
  S(127, 5, bg => [
    E(540, 640, card(bg, { w: 800 }), { a: 'drop', sfx: 'thud', rot: -4 }),
    E(540, 1130, Tx('UNE CARTE', 215, 'var(--a1)'), { a: 'up', w: 128 }),
  ]);
  S(130, 5, bg => [
    E(660, 760, O.terminal({ w: 440, fill: bg === 'navy' ? T.navy2 : P.navy }), { a: 'pop', sfx: 'pop' }),
    E(250, 420, O.card({ w: 400, fill: P.coral }), { a: 'left', m: [{ w: 131, dx: 300, dy: 200, r: 12, dur: .35, e: 'inOut', sfx: 'click' }] }),
    E(300, 1100, Tx('BIP', 340, 'var(--a1)'), { a: 'stamp', w: 134, sfx: 'ding' }),
  ]);
  S(134, 5, bg => [
    E(540, 520, O.check({ w: 440, col: bg === 'green' ? P.yellow : T.green2, draw: { d: .05, sfx: 'pop' } }), { a: 'none' }),
    E(540, 1020, Tx("C'EST FINI", 260, 'var(--a1)'), { a: 'stamp', w: 135, sfx: 'stamp' }),
  ]);
  S(136, 5, bg => [
    E(540, 560, card(bg, { w: 620 }), { a: 'pop', sfx: 'pop', loop: 'float', amp: 12, per: 1.2 }),
    E(540, 960, Tx('RIEN', 300), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1200, Tx('NE QUITTE TA MAIN', 120, 'var(--a1)'), { a: 'up', w: 138, dist: 200 }),
  ]);
  S(141, 5, bg => [
    E(300, 520, bolt(bg, { w: 260 }), { a: 'pop', sfx: 'pop', m: [{ w: 143, dx: 480, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1000, Tx('PLUS TARD', 225, 'var(--a1)'), { a: 'stamp', w: 144, sfx: 'stamp' }),
  ]);
  S(146, 5, bg => [
    E(540, 600, O.receipt({ w: 460 }), { a: 'drop', sfx: 'print' }),
    E(820, 400, bolt(bg, { w: 200 }), { a: 'pop', w: 148, sfx: 'pop', loop: 'shake', amp: 7, lw: 148 }),
    E(540, 1170, Tx('TON RELEVÉ', 200, 'var(--a1)'), { a: 'stamp', w: 148, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 6 — BOULANGERIE ET CAFÉ ===== */
  S(161, 6, bg => [
    E(540, 560, O.bread({ w: 620 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1090, Tx('BOULANGERIE', 190, 'var(--a1)'), { a: 'stamp', w: 164, sfx: 'stamp' }),
  ]);
  S(165, 6, bg => [
    E(540, 620, O.croissant({ w: 700 }), { a: 'spin', w: 166, rot: -14, sfx: 'pop' }),
    E(820, 330, Tx('+1', 280, 'var(--a1)'), { a: 'stamp', w: 168, sfx: 'stamp' }),
    E(540, 1130, Tx('EN PLUS', 240), { a: 'up', w: 167 }),
  ]);
  S(169, 6, bg => [
    E(-200, 620, O.card({ w: 520, fill: P.navy }), { a: 'none', m: [{ d: .05, dx: 1500, r: 10, dur: .9, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1040, Tx('TOUT SEUL', 260, 'var(--a1)'), { a: 'stamp', w: 170, sfx: 'stamp' }),
  ]);
  S(172, 6, bg => [
    E(540, 620, O.cup({ w: 520, fill: bg === 'cream' ? P.navy : P.cream, ink: bg === 'cream' ? P.cream : P.navy }), { a: 'drop', dur: .45, sfx: 'thud' }),
    E(540, 1130, Tx('AU CAFÉ', 280, 'var(--a1)'), { a: 'stamp', w: 173, sfx: 'stamp' }),
  ]);
  S(174, 6, bg => [
    E(320, 640, O.cup({ w: 400 }), { a: 'none' }),
    E(760, 640, O.cup({ w: 400, fill: P.navy, ink: P.cream }), { a: 'drop', w: 175, dur: .45, sfx: 'thud' }),
    E(540, 1130, Tx('LE 2E AUSSI', 220, 'var(--a1)'), { a: 'up', w: 175, d: .15 }),
  ]);

  /* ===== SCÈNE 7 — LA NUANCE ===== */
  S(177, 7, bg => [
    E(540, 520, Tx('!', 560, 'var(--a2)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1040, Tx('ATTENTION', 210, 'var(--a1)'), { a: 'stamp', d: .2 }),
  ]);
  S(178, 7, bg => [
    E(300, 1080 - 150, O.bar(300, { w: 260, fill: T.green2, grow: { d: .0, dur: .01 } }), { a: 'none' }),
    E(780, 1080 - 320, O.bar(640, { w: 260, fill: P.coral, grow: { d: .0, dur: .01 } }), { a: 'none', org: '50% 100%', m: [{ w: 181, dy: 125, s: .61, dur: .6, e: 'inOut', sfx: 'fall' }] }),
    E(540, 300, Tx('PAS TOUJOURS', 180, 'var(--a1)'), { a: 'down', w: 180 }),
    E(540, 1230, Tx('AUSSI ÉNORME', 140), { a: 'pop', w: 182 }),
  ]);
  S(184, 7, bg => [
    E(540, 740, Tx(cnt({ from: 2010, to: 2024, d: .15, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    line(1010, P.coral, { w: 185, d: .5, dur: .3 }),
  ]);
  S(186, 7, bg => [
    E(480, 640, O.clipboard({ w: 480 }), { a: 'pop', sfx: 'pop' }),
    E(680, 760, O.magnifier({ w: 440, ring: P.coral }), { a: 'right', w: 187, sfx: 'whoosh' }),
    E(540, 1180, Tx('UNE ANALYSE', 190, 'var(--a2)'), { a: 'up', w: 187 }),
  ]);
  S(189, 7, bg => [
    E(540, 600, Tx(cnt({ from: 0, to: 71, w: 189, dur: .5, sfx: 'tick' }), 620, 'var(--a1)'), { a: 'pop' }),
    E(540, 1090, Tx('ÉTUDES', 300), { a: 'stamp', w: 190, sfx: 'stamp' }),
  ]);
  S(191, 7, bg => [
    E(540, 640, O.check({ w: 340, col: P.yellow, draw: { w: 194, sfx: 'pop' } }), { a: 'none', w: 194 }),
    E(540, 320, Tx("L'EFFET EST", 170), { a: 'down', w: 191, d: .1 }),
    E(540, 1080, Tx('RÉEL', 400, 'var(--a1)'), { a: 'stamp', w: 195, sfx: 'stamp' }),
  ]);
  S(196, 7, bg => [
    E(540, 560, Tx('MAIS', 300), { a: 'pop', sfx: 'pop' }),
    E(540, 900, Tx('PETIT', 150, 'var(--a1)'), { a: 'stamp', w: 197, sfx: 'click' }),
  ]);
  S(198, 7, bg => [
    E(540, 700, O.disc({ w: 260, fill: P.navy }), { a: 'pop' }),
    E(540, 700, O.coin('1', { w: 200 }), { a: 'pop', d: .06, sfx: 'coin', loop: 'pulse', amp: .05, per: .6 }),
    E(540, 1060, Tx('PETIT.', 220), { a: 'up', d: .1 }),
  ]);
  S(199, 7, bg => [
    ...Array.from({ length: 7 }, (_, i) => E(260 + (i % 4) * 190 + (i > 3 ? 95 : 0), 760 - Math.floor(i / 4) * 230, O.coin('1', { w: 180 }), { a: 'drop', d: .05 + i * .14, dur: .4, sfx: i % 2 ? undefined : 'coin' })),
    E(540, 1130, Tx('RÉPÉTÉ', 300, 'var(--a1)'), { a: 'stamp', w: 200, sfx: 'stamp' }),
  ]);
  S(202, 7, bg => [
    E(540, 835, O.drawer({ w: 520 }), { a: 'none', m: [{ w: 203, dy: 140, dur: .25, sfx: 'kaching' }] }),
    E(540, 620, O.register({ w: 700, fill: P.coral }), { a: 'pop', sfx: 'pop' }),
    E(540, 1220, Tx('À CHAQUE CAISSE', 150, 'var(--a2)'), { a: 'up', w: 204, dist: 200 }),
  ]);
  S(206, 7, bg => [
    E(540, 560, O.burst({ w: 900, n: 12, col: P.coral }), { a: 'pop', w: 206, loop: 'spin', per: 5, cut: false }),
    E(540, 560, O.bulb({ w: 360 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1110, Tx("TOUTE L'IDÉE", 190, 'var(--a1)'), { a: 'up', w: 206 }),
  ]);
  S(206, 7, bg => [
    E(300, 420, O.eye({ w: 380 }), { a: 'pop', sfx: 'pop' }),
    E(600, 820, bill(bg, { w: 620 }), { a: 'pop', d: .08, m: [{ w: 208, o: .18, s: .8, dur: .9, e: 'inOut' }] }),
    E(540, 1190, Tx('MOINS TU VOIS', 160, 'var(--a1)'), { a: 'stamp', w: 208, sfx: 'stamp' }),
  ]);
  S(211, 7, bg => [
    E(540, 560, bolt(bg, { w: 420 }), { a: 'pop', sfx: 'pop', m: [{ w: 212, s: .3, o: .5, dur: .8, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1110, Tx('MOINS TU SENS', 160, 'var(--a1)'), { a: 'stamp', w: 214, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 8 — QUESTION ===== */
  S(215, 8, bg => [
    E(540, 600, O.person({ w: 420, fill: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(540, 1090, Tx('ET TOI ?', 320, 'var(--a1)'), { a: 'stamp', w: 218, sfx: 'stamp' }),
  ]);
  S(218, 8, bg => [
    E(680, 700, O.terminal({ w: 420, fill: T.navy2 }), { a: 'pop', sfx: 'pop' }),
    E(300, 560, O.card({ w: 420, fill: P.coral }), { a: 'left', d: .1, loop: 'float', amp: 14, per: .9 }),
    E(500, 520, O.burst({ w: 260, n: 8 }), { a: 'spin', w: 218, sfx: 'ding', loop: 'spin', per: 3, cut: false }),
    E(540, 1190, Tx('SANS CONTACT', 160, 'var(--a1)'), { a: 'stamp', w: 218, sfx: 'stamp' }),
  ]);
  S(218, 8, bg => [
    E(540, 600, O.tag('? €', { w: 860, fs: 170 }), { a: 'drop', sfx: 'thud', rot: -4, loop: 'swing', amp: 3, per: 1, ld: .65 }),
    E(540, 1110, Tx('COMBIEN ?', 225, 'var(--a1)'), { a: 'stamp', w: 236, sfx: 'stamp' }),
  ]);
})();
