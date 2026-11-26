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

  V.keywords = [2, 12, 15, 31, 37, 42, 56, 63, 69, 73, 78, 87, 88, 106, 108, 114, 124, 131, 138, 146, 152, 161, 163, 171, 175, 181, 183, 186, 191, 204, 211, 216];

  /* ===== SCÈNE 1 — HOOK ===== */
  // accroche en trois plans, la carte reste à l'écran du début à la fin
  S(0, 1, bg => [
    E(540, 520, card(bg, { w: 660 }), { a: 'left', rot: -6, sfx: 'whoosh', loop: 'float', amp: 8, per: 1.6 }),
    E(540, 960, Tx('PRÊT À PAYER', 168), { a: 'up', w: 3 }),
    E(540, 1190, Tx('PLUS CHER', 240, 'var(--a1)'), { a: 'stamp', w: 8, sfx: 'stamp' }),
  ]);
  k = 2;                                             // garde les fonds d'origine (vert, crème, puis la suite inchangée)
  S(10, 1, bg => [
    E(300, 520, card(bg, { w: 440 }), { a: 'none', rot: -6 }),
    E(780, 700, bill(bg, { w: 440 }), { a: 'right', rot: 8, sfx: 'whoosh' }),
    E(540, 1120, Tx("QU'AVEC DES BILLETS", 120, 'var(--a1)'), { a: 'up', w: 11 }),
  ]);
  S(13, 1, bg => [
    E(540, 440, card(bg, { w: 520 }), { a: 'none', rot: -6 }),
    E(540, 770, Tx('PARFOIS', 180), { a: 'down' }),
    E(540, 1120, Tx('×2', 420, 'var(--a1)'), { a: 'stamp', w: 15, sfx: 'stamp', loop: 'pulse', amp: .03, per: .6 }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(16, 2, bg => [
    E(540, 600, Tx('RIEN', 380), { a: 'stamp', w: 19, sfx: 'stamp' }),
    E(540, 940, Tx('À VOIR', 320, 'var(--a1)'), { a: 'stamp', w: 20 }),
    E(540, 330, Tx('ET ÇA…', 150), { a: 'down' }),
  ]);
  S(22, 2, bg => [
    E(540, 760, O.box('COMPTE', { w: 640, fs: 66 }), { a: 'up', sfx: 'pop' }),
    E(400, 420, O.coin('€', { w: 200, small: '' }), { a: 'drop', w: 23, dur: .45, sfx: 'coin' }),
    E(680, 400, O.coin('€', { w: 200, small: '' }), { a: 'drop', w: 23, d: .12, dur: .45 }),
    E(540, 720, O.cross({ w: 640, draw: { w: 26, sfx: 'buzz' } }), { a: 'none', w: 26 }),
  ]);
  S(27, 2, bg => [
    E(540, 560, bolt(bg, { w: 380 }), { a: 'drop', dur: .4, sfx: 'thud', loop: 'shake', amp: 6, ld: .3, ldur: .5 }),
    E(540, 1110, Tx('DOULEUR', 260, 'var(--a1)'), { a: 'stamp', w: 31, sfx: 'stamp' }),
  ]);
  S(32, 2, bg => [
    E(540, 420, O.eye({ w: 440 }), { a: 'pop', sfx: 'pop' }),
    E(540, 800, Tx("D'OÙ ÇA", 280), { a: 'up', w: 33 }),
    E(540, 1090, Tx('VIENT ?', 300, 'var(--a1)'), { a: 'stamp', w: 35, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — L'ENCHÈRE DE 2001 ===== */
  S(36, 3, bg => [
    E(540, 740, Tx(cnt({ from: 1985, to: 2001, d: .1, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    line(1010, P.coral, { d: .6, dur: .3 }),
  ]);
  const cher = (o = {}) => O.person({ w: 360, fill: P.navy, coat: true, ink: P.cream, ...o });
  S(38, 3, bg => [
    E(320, 720, cher({ fill: P.yellow }), { a: 'pop', sfx: 'pop' }),
    E(760, 720, cher({ fill: P.yellow }), { a: 'pop', w: 39, sfx: 'pop' }),
    E(540, 1170, Tx('2 CHERCHEURS', 160), { a: 'up', w: 39 }),
  ]);
  S(40, 3, bg => [
    E(540, 520, O.clipboard({ w: 360 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1040, O.stamp('ENCHÈRE', { w: 860, fs: 170, h: 280, col: P.coral }), { a: 'stamp', w: 42, rot: -5, sfx: 'stamp' }),
  ]);
  S(43, 3, bg => [
    E(540, 580, O.bank({ w: 640 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1040, Tx('ÉCOLE', 260, 'var(--a1)'), { a: 'stamp', w: 45, sfx: 'stamp' }),
    E(540, 1240, Tx('DE COMMERCE', 130), { a: 'up', w: 46, dist: 200 }),
  ]);
  S(48, 3, bg => [
    E(540, 460, O.crown({ w: 380, fill: P.coral, band: T.coral2 }), { a: 'drop', dur: .45, sfx: 'ding' }),
    E(540, 900, Tx('À GAGNER', 235), { a: 'stamp', w: 49, sfx: 'stamp' }),
  ]);
  S(50, 3, bg => [
    E(480, 560, O.ticket({ w: 640, fill: P.navy, ink: P.cream }), { a: 'left', rot: -7, sfx: 'swish' }),
    E(600, 860, O.ticket({ w: 640, fill: P.yellow }), { a: 'right', w: 51, rot: 6, sfx: 'swish' }),
    E(540, 1170, Tx('2 PLACES', 240, 'var(--a2)'), { a: 'up', w: 51 }),
  ]);
  S(52, 3, bg => [
    E(540, 600, O.ball({ w: 560 }), { a: 'drop', sfx: 'thud', loop: 'float', amp: 20, per: .7, ld: .65 }),
    E(540, 1130, Tx('MATCH DE BASKET', 128, 'var(--a1)'), { a: 'up', w: 54 }),
  ]);
  S(57, 3, bg => [
    E(220, 760, O.person({ w: 280, fill: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(540, 700, O.person({ w: 320, fill: P.navy }), { a: 'pop', d: .12 }),
    E(860, 760, O.person({ w: 280, fill: P.cream }), { a: 'pop', d: .24 }),
    E(540, 1170, Tx('LES ÉTUDIANTS', 160, 'var(--a1)'), { a: 'up', w: 58 }),
  ]);
  S(59, 3, bg => [
    E(540, 640, O.clipboard({ w: 520 }), { a: 'up', sfx: 'pop' }),
    E(560, 700, O.line('M20,60 C120,10 180,110 280,60 S420,10 500,60', { w: 380, vw: 520, vh: 120, col: P.coral, sw: 22, draw: { w: 59, d: .2, dur: .7, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(540, 1180, Tx('LEUR OFFRE', 190, 'var(--a2)'), { a: 'up', w: 60 }),
  ]);
  S(62, 3, bg => [
    E(540, 600, O.envelope({ w: 700 }), { a: 'pop', sfx: 'pop', m: [{ w: 63, r: -5, dur: .2 }, { w: 63, d: .25, r: 0, dur: .2 }] }),
    E(540, 1100, Tx('SECRET', 320, 'var(--a1)'), { a: 'stamp', w: 63, sfx: 'stamp' }),
  ]);
  const trio = (fill, y = 560, a = {}) => [0, 1, 2].map(i => E(240 + i * 300, y, O.person({ w: 250, fill }), { a: 'pop', d: i * .08, ...a })).join('');
  S(64, 3, bg => [
    trio(P.navy),
    E(540, 960, bill(bg, { w: 620 }), { a: 'up', w: 68, sfx: 'swish' }),
    E(540, 1220, Tx('EN ESPÈCES', 180, 'var(--a1)'), { a: 'stamp', w: 69, sfx: 'stamp' }),
  ]);
  S(70, 3, bg => [
    trio(P.cream),
    E(540, 960, O.card({ w: 520, fill: P.coral }), { a: 'up', w: 72, sfx: 'swish' }),
    E(540, 1240, Tx('PAR CARTE', 180, 'var(--a1)'), { a: 'stamp', w: 73, sfx: 'stamp' }),
  ]);
  S(74, 3, bg => [
    E(540, 560, O.ball({ w: 480 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1080, Tx('MÊME MATCH', 185, 'var(--a1)'), { a: 'stamp', w: 75, sfx: 'stamp' }),
  ]);
  S(76, 3, bg => [
    E(540, 500, O.ticket({ w: 600 }), { a: 'pop', rot: -5, sfx: 'pop' }),
    E(540, 760, O.ticket({ w: 600, fill: P.yellow }), { a: 'pop', d: .1, rot: 4 }),
    E(540, 1130, Tx('MÊMES PLACES', 160, 'var(--a1)'), { a: 'stamp', w: 77, sfx: 'stamp' }),
  ]);
  S(78, 3, bg => [
    E(540, 740, Tx('RÉSULTAT', 240, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    line(920, P.coral, { d: .2, dur: .3 }),
  ]);
  S(79, 3, bg => [
    E(300, 1100 - 150, O.bar(300, { w: 260, fill: T.green2, grow: { d: .05 } }), { a: 'none' }),
    E(780, 1100 - 340, O.bar(680, { w: 260, fill: P.navy, grow: { w: 84, dur: .7, sfx: 'rise' } }), { a: 'none' }),
    E(300, 1170, Tx('ESPÈCES', 70, 'var(--ink)', { font: 'inter' }), { a: 'fade', cut: false }),
    E(780, 1170, Tx('CARTE', 70, 'var(--ink)', { font: 'inter' }), { a: 'fade', w: 82, cut: false }),
    E(780, 330, O.card({ w: 240, fill: P.coral }), { a: 'drop', w: 83, dur: .45, sfx: 'pop' }),
  ]);
  S(85, 3, bg => [
    E(540, 700, Tx('×2', 560, 'var(--a1)'), { a: 'stamp', w: 86, sfx: 'stamp' }),
    E(540, 290, Tx('PLUS DU', 170), { a: 'down' }),
    E(540, 1160, Tx('DOUBLE', 260), { a: 'stamp', w: 87 }),
  ]);

  /* ===== SCÈNE 4 — LA DOULEUR DE PAYER ===== */
  S(88, 4, bg => [
    E(540, 640, Tx('POURQUOI', 250), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1000, Tx('?', 440, 'var(--a1)'), { a: 'pop', d: .25, rot: 8, sfx: 'pop', loop: 'swing', amp: 6, per: .7 }),
  ]);
  S(89, 4, bg => [
    E(540, 640, O.calendar('AVANT', { w: 660, fs: 150 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1150, Tx('PLUS TÔT', 240, 'var(--a1)'), { a: 'up', w: 91 }),
  ]);
  S(93, 4, bg => [
    E(240, 760, cher({ w: 280, fill: P.yellow }), { a: 'pop', sfx: 'pop' }),
    E(540, 700, cher({ w: 320, fill: P.yellow }), { a: 'pop', d: .12 }),
    E(840, 760, cher({ w: 280, fill: P.yellow }), { a: 'pop', d: .24 }),
    E(540, 1180, Tx("D'AUTRES CHERCHEURS", 110, 'var(--a1)'), { a: 'up', w: 94, dist: 200 }),
  ], undefined);
  S(96, 4, bg => [
    E(540, 600, O.tag('?', { w: 820, fill: P.navy, ink: P.cream, fs: 190 }), { a: 'drop', sfx: 'thud', rot: -4 }),
    E(540, 1090, Tx('UN NOM', 300, 'var(--a1)'), { a: 'stamp', w: 98, sfx: 'stamp' }),
  ]);
  S(99, 4, bg => [
    E(380, 700, O.person({ w: 420, fill: P.cream }), { a: 'left' }),
    E(800, 480, bolt(bg, { w: 220 }), { a: 'pop', w: 102, sfx: 'pop', loop: 'shake', amp: 8, lw: 102 }),
    E(540, 1180, Tx('EN PAYANT', 220, 'var(--a1)'), { a: 'up', w: 103 }),
  ]);
  S(105, 4, bg => [
    E(540, 1220, bolt(bg, { w: 130 }), { a: 'spin', w: 108, d: .15, sfx: 'pop' }),
    E(540, 520, Tx('LA DOULEUR', 220), { a: 'stamp', w: 106, sfx: 'stamp' }),
    E(540, 860, Tx('DE PAYER', 260, 'var(--a1)'), { a: 'stamp', w: 107, sfx: 'stamp' }),
    line(1070, P.coral, { w: 108, dur: .3 }),
  ]);

  /* ===== SCÈNE 5 — LE BILLET, PUIS LA CARTE ===== */
  S(109, 5, bg => [
    E(540, 560, bill(bg, { w: 820 }), { a: 'drop', sfx: 'thud', rot: -3 }),
    E(860, 300, bolt(bg, { w: 180 }), { a: 'pop', w: 113, sfx: 'pop' }),
    E(540, 1090, Tx('TU LA SENS', 210, 'var(--a1)'), { a: 'stamp', w: 113, sfx: 'stamp' }),
  ]);
  S(115, 5, bg => [
    E(540, 640, bill(bg, { w: 420 }), { a: 'none', w: 117, m: [{ w: 117, dy: -330, r: -8, dur: .4, sfx: 'swish' }] }),
    E(540, 760, O.wallet({ w: 680, fill: bg === 'coral' ? P.navy : T.coral2 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1190, Tx('TU OUVRES', 200, 'var(--a1)'), { a: 'up', w: 116 }),
  ]);
  S(119, 5, bg => [
    ...[0, 1, 2].map(i => E(540 + (i - 1) * 50, 430 + i * 210, bill(bg, { w: 520 }), { a: 'pop', d: .05 + i * .22, rot: (i - 1) * 6, sfx: 'tick' })),
    E(880, 330, Tx(cnt({ from: 0, to: 3, d: .05, dur: .6 }), 260, 'var(--a1)'), { a: 'pop' }),
    E(540, 1210, Tx('TU COMPTES', 170, 'var(--a1)'), { a: 'up', w: 120, dist: 200 }),
  ]);
  S(121, 5, bg => [
    E(300, 440, O.eye({ w: 400, px: .7 }), { a: 'pop', sfx: 'pop' }),
    E(480, 860, bill(bg, { w: 560 }), { a: 'pop', d: .08, m: [{ w: 124, dx: 1100, r: 18, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1200, Tx('PARTIR', 240, 'var(--a2)'), { a: 'stamp', w: 124, d: .1 }),
  ]);
  S(125, 5, bg => [
    E(540, 640, card(bg, { w: 800 }), { a: 'drop', sfx: 'thud', rot: -4 }),
    E(540, 1130, Tx('UNE CARTE', 215, 'var(--a1)'), { a: 'up', w: 126 }),
  ]);
  S(128, 5, bg => [
    E(660, 760, O.terminal({ w: 440, fill: bg === 'navy' ? T.navy2 : P.navy }), { a: 'pop', sfx: 'pop' }),
    E(250, 420, O.card({ w: 400, fill: P.coral }), { a: 'left', m: [{ w: 129, dx: 300, dy: 200, r: 12, dur: .35, e: 'inOut', sfx: 'click' }] }),
    E(300, 1100, Tx('BIP', 340, 'var(--a1)'), { a: 'stamp', w: 131, sfx: 'ding' }),
  ]);
  S(132, 5, bg => [
    E(540, 520, O.check({ w: 440, col: bg === 'green' ? P.yellow : T.green2, draw: { d: .05, sfx: 'pop' } }), { a: 'none' }),
    E(540, 1020, Tx("C'EST FINI", 260, 'var(--a1)'), { a: 'stamp', w: 133, sfx: 'stamp' }),
  ]);
  S(134, 5, bg => [
    E(540, 560, card(bg, { w: 620 }), { a: 'pop', sfx: 'pop', loop: 'float', amp: 12, per: 1.2 }),
    E(540, 960, Tx('RIEN', 300), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1200, Tx('NE QUITTE TA MAIN', 120, 'var(--a1)'), { a: 'up', w: 136, dist: 200 }),
  ]);
  S(139, 5, bg => [
    E(300, 520, bolt(bg, { w: 260 }), { a: 'pop', sfx: 'pop', m: [{ w: 141, dx: 480, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1000, Tx('PLUS TARD', 225, 'var(--a1)'), { a: 'stamp', w: 142, sfx: 'stamp' }),
  ]);
  S(144, 5, bg => [
    E(540, 600, O.receipt({ w: 460 }), { a: 'drop', sfx: 'print' }),
    E(820, 400, bolt(bg, { w: 200 }), { a: 'pop', w: 146, sfx: 'pop', loop: 'shake', amp: 7, lw: 146 }),
    E(540, 1170, Tx('TON RELEVÉ', 200, 'var(--a1)'), { a: 'stamp', w: 146, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 6 — BOULANGERIE ET CAFÉ ===== */
  S(147, 6, bg => [
    E(540, 560, O.bread({ w: 620 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1090, Tx('BOULANGERIE', 190, 'var(--a1)'), { a: 'stamp', w: 150, sfx: 'stamp' }),
  ]);
  S(151, 6, bg => [
    E(540, 620, O.croissant({ w: 700 }), { a: 'spin', w: 152, rot: -14, sfx: 'pop' }),
    E(820, 330, Tx('+1', 280, 'var(--a1)'), { a: 'stamp', w: 154, sfx: 'stamp' }),
    E(540, 1130, Tx('EN PLUS', 240), { a: 'up', w: 153 }),
  ]);
  S(155, 6, bg => [
    E(-200, 620, O.card({ w: 520, fill: P.navy }), { a: 'none', m: [{ d: .05, dx: 1500, r: 10, dur: .9, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1040, Tx('TOUT SEUL', 260, 'var(--a1)'), { a: 'stamp', w: 156, sfx: 'stamp' }),
  ]);
  S(158, 6, bg => [
    E(540, 620, O.cup({ w: 520, fill: bg === 'cream' ? P.navy : P.cream, ink: bg === 'cream' ? P.cream : P.navy }), { a: 'drop', dur: .45, sfx: 'thud' }),
    E(540, 1130, Tx('AU CAFÉ', 280, 'var(--a1)'), { a: 'stamp', w: 159, sfx: 'stamp' }),
  ]);
  S(160, 6, bg => [
    E(320, 640, O.cup({ w: 400 }), { a: 'none' }),
    E(760, 640, O.cup({ w: 400, fill: P.navy, ink: P.cream }), { a: 'drop', w: 161, dur: .45, sfx: 'thud' }),
    E(540, 1130, Tx('LE 2E AUSSI', 220, 'var(--a1)'), { a: 'up', w: 161, d: .15 }),
  ]);

  /* ===== SCÈNE 7 — LA NUANCE ===== */
  S(163, 7, bg => [
    E(540, 520, Tx('!', 560, 'var(--a2)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1040, Tx('ATTENTION', 210, 'var(--a1)'), { a: 'stamp', d: .2 }),
  ]);
  S(164, 7, bg => [
    E(300, 1080 - 150, O.bar(300, { w: 260, fill: T.green2, grow: { d: .0, dur: .01 } }), { a: 'none' }),
    E(780, 1080 - 320, O.bar(640, { w: 260, fill: P.coral, grow: { d: .0, dur: .01 } }), { a: 'none', org: '50% 100%', m: [{ w: 167, dy: 125, s: .61, dur: .6, e: 'inOut', sfx: 'fall' }] }),
    E(540, 300, Tx('PAS TOUJOURS', 180, 'var(--a1)'), { a: 'down', w: 166 }),
    E(540, 1230, Tx('AUSSI ÉNORME', 140), { a: 'pop', w: 168 }),
  ]);
  S(170, 7, bg => [
    E(540, 740, Tx(cnt({ from: 2010, to: 2024, d: .15, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    line(1010, P.coral, { w: 171, d: .5, dur: .3 }),
  ]);
  S(172, 7, bg => [
    E(480, 640, O.clipboard({ w: 480 }), { a: 'pop', sfx: 'pop' }),
    E(680, 760, O.magnifier({ w: 440, ring: P.coral }), { a: 'right', w: 173, sfx: 'whoosh' }),
    E(540, 1180, Tx('UNE ANALYSE', 190, 'var(--a2)'), { a: 'up', w: 173 }),
  ]);
  S(175, 7, bg => [
    E(540, 600, Tx(cnt({ from: 0, to: 71, w: 175, dur: .5, sfx: 'tick' }), 620, 'var(--a1)'), { a: 'pop' }),
    E(540, 1090, Tx('ÉTUDES', 300), { a: 'stamp', w: 176, sfx: 'stamp' }),
  ]);
  S(177, 7, bg => [
    E(540, 640, O.check({ w: 340, col: P.yellow, draw: { w: 180, sfx: 'pop' } }), { a: 'none', w: 180 }),
    E(540, 320, Tx("L'EFFET EST", 170), { a: 'down', w: 177, d: .1 }),
    E(540, 1080, Tx('RÉEL', 400, 'var(--a1)'), { a: 'stamp', w: 181, sfx: 'stamp' }),
  ]);
  S(182, 7, bg => [
    E(540, 560, Tx('MAIS', 300), { a: 'pop', sfx: 'pop' }),
    E(540, 900, Tx('PETIT', 150, 'var(--a1)'), { a: 'stamp', w: 183, sfx: 'click' }),
  ]);
  S(184, 7, bg => [
    E(540, 700, O.disc({ w: 260, fill: P.navy }), { a: 'pop' }),
    E(540, 700, O.coin('1', { w: 200 }), { a: 'pop', d: .06, sfx: 'coin', loop: 'pulse', amp: .05, per: .6 }),
    E(540, 1060, Tx('PETIT.', 220), { a: 'up', d: .1 }),
  ]);
  S(185, 7, bg => [
    ...Array.from({ length: 7 }, (_, i) => E(260 + (i % 4) * 190 + (i > 3 ? 95 : 0), 760 - Math.floor(i / 4) * 230, O.coin('1', { w: 180 }), { a: 'drop', d: .05 + i * .14, dur: .4, sfx: i % 2 ? undefined : 'coin' })),
    E(540, 1130, Tx('RÉPÉTÉ', 300, 'var(--a1)'), { a: 'stamp', w: 186, sfx: 'stamp' }),
  ]);
  S(188, 7, bg => [
    E(540, 835, O.drawer({ w: 520 }), { a: 'none', m: [{ w: 189, dy: 140, dur: .25, sfx: 'kaching' }] }),
    E(540, 620, O.register({ w: 700, fill: P.coral }), { a: 'pop', sfx: 'pop' }),
    E(540, 1220, Tx('À CHAQUE CAISSE', 150, 'var(--a2)'), { a: 'up', w: 190, dist: 200 }),
  ]);
  S(192, 7, bg => [
    E(540, 560, O.burst({ w: 900, n: 12, col: P.coral }), { a: 'pop', w: 194, loop: 'spin', per: 5, cut: false }),
    E(540, 560, O.bulb({ w: 360 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1110, Tx("TOUTE L'IDÉE", 190, 'var(--a1)'), { a: 'up', w: 194 }),
  ]);
  S(196, 7, bg => [
    E(300, 420, O.eye({ w: 380 }), { a: 'pop', sfx: 'pop' }),
    E(600, 820, bill(bg, { w: 620 }), { a: 'pop', d: .08, m: [{ w: 198, o: .18, s: .8, dur: .9, e: 'inOut' }] }),
    E(540, 1190, Tx('MOINS TU VOIS', 160, 'var(--a1)'), { a: 'stamp', w: 198, sfx: 'stamp' }),
  ]);
  S(201, 7, bg => [
    E(540, 560, bolt(bg, { w: 420 }), { a: 'pop', sfx: 'pop', m: [{ w: 202, s: .3, o: .5, dur: .8, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1110, Tx('MOINS TU SENS', 160, 'var(--a1)'), { a: 'stamp', w: 204, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 8 — QUESTION ===== */
  S(205, 8, bg => [
    E(540, 600, O.person({ w: 420, fill: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(540, 1090, Tx('ET TOI ?', 320, 'var(--a1)'), { a: 'stamp', w: 206, sfx: 'stamp' }),
  ]);
  S(207, 8, bg => [
    E(680, 700, O.terminal({ w: 420, fill: T.navy2 }), { a: 'pop', sfx: 'pop' }),
    E(300, 560, O.card({ w: 420, fill: P.coral }), { a: 'left', d: .1, loop: 'float', amp: 14, per: .9 }),
    E(500, 520, O.burst({ w: 260, n: 8 }), { a: 'spin', w: 210, sfx: 'ding', loop: 'spin', per: 3, cut: false }),
    E(540, 1190, Tx('SANS CONTACT', 160, 'var(--a1)'), { a: 'stamp', w: 210, sfx: 'stamp' }),
  ]);
  S(212, 8, bg => [
    E(540, 600, O.tag('? €', { w: 860, fs: 170 }), { a: 'drop', sfx: 'thud', rot: -4, loop: 'swing', amp: 3, per: 1, ld: .65 }),
    E(540, 1110, Tx('COMBIEN ?', 225, 'var(--a1)'), { a: 'stamp', w: 214, sfx: 'stamp' }),
  ]);
})();
