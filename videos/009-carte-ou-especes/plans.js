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

  V.style = 2;        // charte validée le 26/11/2026
  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f, d) => { const bg = CYCLE[k++ % 5]; shot({ w, d, bg, scene, html: f(bg) }); };
  // variantes lisibles selon le fond
  const dark = bg => bg === 'navy' || bg === 'green' || bg === 'coral';
  const fg = bg => (dark(bg) ? P.cream : P.navy);
  const bill = (bg, o = {}, txt = '') => O.note(txt, bg === 'green' ? { fill: P.cream, ink: P.green, ...o } : o);
  const card = (bg, o = {}) => O.card(bg === 'navy' || bg === 'coral' ? { fill: P.cream, ink: P.navy, ...o } : o);
  const bolt = (bg, o = {}) => O.bolt({ fill: dark(bg) ? P.yellow : P.coral, ...o });
  const per = (bg, o = {}) => O.person({ w: 280, fill: fg(bg), ...o });
  const cher = (bg, o = {}) => O.person({ w: 340, fill: dark(bg) ? P.yellow : P.navy, coat: true, ink: dark(bg) ? P.cream : P.coral, ...o });
  const line = (y, col, d = {}) => E(540, y, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col, sw: 28, draw: d }), { a: 'none', cut: false });
  // les deux colonnes de l'enchère (espèces à gauche, carte à droite)
  const barL = g => E(300, 1080 - 150, O.bar(300, { w: 260, fill: P.coral, grow: g }), { a: 'none' });
  const barR = (g, an = {}) => E(780, 1080 - 320, O.bar(640, { w: 260, fill: P.navy, grow: g }), { a: 'none', ...an });

  V.keywords = [1, 6, 9, 15, 23, 29, 34, 39, 43, 48, 55, 61, 65, 67, 69, 70, 76, 79, 80, 84, 90, 98, 100, 106, 110, 116, 118, 126, 129, 133, 140, 145, 148, 154, 160, 164, 168, 173, 175, 177, 183, 185, 189, 195, 197, 200, 205, 208, 214, 220, 225, 233, 236];

  /* ===== SCÈNE 1 — ACCROCHE : « Par carte, tu acceptes de payer plus. Parfois le double. » ===== */
  // la carte reste à l'écran pendant toute l'accroche
  S(0, 1, bg => [
    E(540, 520, card(bg, { w: 660 }), { a: 'left', rot: -6, sfx: 'whoosh', loop: 'float', amp: 8, per: 1.6 }),
    E(540, 960, Tx('TU ACCEPTES', 180), { a: 'up', w: 2 }),
    E(540, 1190, Tx('DE PAYER PLUS', 155, 'var(--a1)'), { a: 'up', w: 4, sfx: 'stamp' }),
  ]);
  S(7, 1, bg => [
    E(540, 520, card(bg, { w: 660 }), { a: 'none', rot: -6, loop: 'float', amp: 8, per: 1.6 }),
    E(540, 850, Tx('PARFOIS', 130), { a: 'down', dist: 200 }),
    E(540, 1120, Tx('×2', 380, 'var(--a1)'), { a: 'stamp', w: 8, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 2 — RETAINER : « Et ça n'a rien à voir avec ton compte. C'est une histoire de douleur. » ===== */
  k = 4;
  S(10, 2, bg => [
    E(540, 400, card(bg, { w: 480 }), { a: 'none', rot: -6 }),
    E(540, 840, O.box('COMPTE', { w: 520, fs: 66 }), { a: 'up', sfx: 'pop' }),
    E(540, 840, O.cross({ w: 560, sw: 34, draw: { w: 16, sfx: 'buzz' } }), { a: 'none', w: 16 }),
    E(540, 1210, Tx('RIEN À VOIR', 170, 'var(--a1)'), { a: 'up', w: 13 }),
  ]);
  k = 6;
  S(19, 2, bg => [
    E(540, 560, bolt(bg, { w: 380 }), { a: 'drop', sfx: 'thud', loop: 'shake', amp: 6, ld: .3, ldur: .5 }),
    E(540, 1110, Tx('DOULEUR', 260, 'var(--a1)'), { a: 'stamp', w: 21, sfx: 'stamp' }),
  ]);
  S(24, 2, bg => [
    E(540, 520, O.eye({ w: 520 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1090, Tx("D'OÙ ÇA VIENT ?", 130, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);

  /* ===== SCÈNE 3 — L'ENCHÈRE DE 2001 ===== */
  S(28, 3, bg => [
    E(540, 740, Tx(cnt({ from: 1985, to: 2001, d: .1, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    line(1010, P.coral, { d: .6, dur: .3 }),
  ]);
  S(30, 3, bg => [
    E(320, 640, cher(bg), { a: 'left', sfx: 'pop' }),
    E(760, 640, cher(bg), { a: 'right', d: .15 }),
    E(540, 1120, O.stamp('ENCHÈRE', { w: 820, fs: 170, h: 280, col: P.coral }), { a: 'stamp', w: 32, rot: -4, sfx: 'stamp' }),
  ]);
  k = 11;
  S(35, 3, bg => [
    E(540, 560, O.bank({ w: 620 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1010, Tx('ÉCOLE', 250, 'var(--a1)'), { a: 'stamp', d: .15 }),
    E(540, 1210, Tx('DE COMMERCE', 130), { a: 'up', d: .3, dist: 200 }),
  ]);
  k = 13;
  S(40, 3, bg => [
    E(540, 300, Tx('2 PLACES À GAGNER', 120, 'var(--a1)'), { a: 'down' }),
    E(470, 660, O.ticket({ w: 640, fill: P.navy, ink: P.cream }), { a: 'left', rot: -7, sfx: 'swish' }),
    E(610, 960, O.ticket({ w: 640, fill: P.yellow }), { a: 'right', w: 41, rot: 6, sfx: 'swish' }),
  ]);
  S(44, 3, bg => [
    E(540, 600, O.ball({ w: 560 }), { a: 'drop', sfx: 'thud', loop: 'float', amp: 20, per: .7, ld: .65 }),
    E(540, 1130, Tx('MATCH DE BASKET', 128, 'var(--a1)'), { a: 'up', w: 46 }),
  ]);
  S(49, 3, bg => [
    E(220, 720, per(bg), { a: 'pop', sfx: 'pop' }),
    E(540, 660, per(bg, { w: 320 }), { a: 'pop', d: .1 }),
    E(860, 720, per(bg), { a: 'pop', d: .2 }),
    E(540, 1160, Tx('LES ÉTUDIANTS', 150, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  // « écrivent leur offre en secret » : l'offre s'écrit, puis l'enveloppe la recouvre
  S(52, 3, bg => [
    E(540, 600, O.clipboard({ w: 480 }), { a: 'up', sfx: 'pop' }),
    E(560, 660, O.line('M20,60 C120,10 180,110 280,60 S420,10 500,60', { w: 340, vw: 520, vh: 120, col: P.coral, sw: 22, draw: { d: .15, dur: .45, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(540, 640, O.envelope({ w: 720, fill: P.navy, ink: P.cream }), { a: 'up', dist: 900, w: 54, sfx: 'whoosh' }),
    E(540, 1170, Tx('EN SECRET', 220, 'var(--a1)'), { a: 'stamp', w: 54, d: .12, sfx: 'stamp' }),
  ], .06);
  k = 18;
  const trio = (fill, y = 560) => [0, 1, 2].map(i => E(240 + i * 300, y, O.person({ w: 250, fill }), { a: 'pop', d: i * .08 })).join('');
  S(56, 3, bg => [
    trio(fg(bg)),
    E(540, 960, bill(bg, { w: 620 }), { a: 'up', w: 60, sfx: 'swish' }),
    E(540, 1215, Tx('EN ESPÈCES', 170, 'var(--a1)'), { a: 'stamp', w: 61, sfx: 'stamp' }),
  ]);
  S(62, 3, bg => [
    trio(fg(bg)),
    E(540, 950, O.card({ w: 480, fill: P.coral }), { a: 'left', w: 64, sfx: 'swish' }),
    E(540, 1215, Tx('PAR CARTE', 170, 'var(--a1)'), { a: 'up', w: 65, dist: 200, sfx: 'stamp' }),
  ]);
  // « Même match. Mêmes places. » : le ballon reste, les places le rejoignent
  S(66, 3, bg => [
    E(290, 500, O.ball({ w: 400 }), { a: 'pop', sfx: 'pop' }),
    E(770, 430, O.ticket({ w: 440 }), { a: 'right', w: 68, rot: -5, sfx: 'swish' }),
    E(790, 600, O.ticket({ w: 440, fill: P.yellow }), { a: 'right', w: 68, d: .1, rot: 4 }),
    E(540, 930, Tx('MÊME MATCH', 170), { a: 'stamp', d: .15, sfx: 'stamp' }),
    E(540, 1170, Tx('MÊMES PLACES', 150, 'var(--a1)'), { a: 'up', w: 68, d: .1 }),
  ]);
  k = 22;
  S(70, 3, bg => [
    E(540, 540, O.envelope({ w: 620 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1090, Tx('RÉSULTAT', 240, 'var(--a1)'), { a: 'stamp', d: .15, sfx: 'stamp' }),
  ]);
  S(71, 3, bg => [
    barL({ d: .05 }),
    barR({ w: 76, dur: .5, sfx: 'rise' }),
    E(300, 1150, Tx('ESPÈCES', 70, 'var(--ink)', { font: 'inter' }), { a: 'fade', cut: false }),
    E(780, 1150, Tx('CARTE', 70, 'var(--ink)', { font: 'inter' }), { a: 'fade', w: 74, cut: false }),
    E(780, 310, O.card({ w: 240, fill: P.coral }), { a: 'drop', w: 75, sfx: 'pop' }),
  ]);
  // « plus du double. Pourquoi ? » : le ×2 reste, la question arrive dessous
  k = 25;
  S(77, 3, bg => [
    E(540, 330, O.card({ w: 380, fill: P.coral }), { a: 'down' }),
    E(540, 740, Tx('×2', 520, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', m: [{ w: 80, r: -6, s: .92, dur: .25 }] }),
    E(540, 1160, Tx('PLUS DU DOUBLE', 140), { a: 'up', w: 78, hw: 80 }),
    E(540, 1160, Tx('POURQUOI ?', 200), { a: 'stamp', w: 80, sfx: 'pop' }),
  ]);

  /* ===== SCÈNE 4 — LA DOULEUR DE PAYER ===== */
  S(81, 4, bg => [
    E(540, 620, O.calendar('AVANT', { w: 640, fs: 150 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1150, Tx('PLUS TÔT', 240, 'var(--a1)'), { a: 'up', w: 83 }),
  ]);
  S(85, 4, bg => [
    E(240, 780, cher(bg, { w: 280 }), { a: 'pop', sfx: 'pop' }),
    E(540, 720, cher(bg, { w: 320 }), { a: 'pop', d: .1 }),
    E(840, 780, cher(bg, { w: 280 }), { a: 'pop', d: .2 }),
    E(560, 320, O.tag('?', { w: 460, fill: P.navy, ink: P.cream, fs: 190 }), { a: 'drop', w: 88, rot: -4, sfx: 'thud' }),
    E(540, 1180, Tx('UN NOM', 250, 'var(--a1)'), { a: 'stamp', w: 88, d: .15, sfx: 'stamp' }),
  ]);
  k = 29;
  S(91, 4, bg => [
    E(380, 700, per(bg, { w: 420 }), { a: 'left' }),
    E(800, 480, bolt(bg, { w: 220 }), { a: 'pop', w: 94, sfx: 'pop', loop: 'shake', amp: 8, lw: 94 }),
    E(540, 1180, Tx('EN PAYANT', 220, 'var(--a1)'), { a: 'up', w: 95 }),
  ]);
  S(97, 4, bg => [
    E(540, 400, bolt(bg, { w: 260 }), { a: 'drop', sfx: 'thud', loop: 'shake', amp: 6, ld: .3, ldur: .5 }),
    E(540, 800, Tx('LA DOULEUR', 200), { a: 'up', w: 98, sfx: 'stamp' }),
    E(540, 1080, Tx('DE PAYER', 250, 'var(--a1)'), { a: 'stamp', w: 99, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 5 — LE BILLET, PUIS LA CARTE ===== */
  S(101, 5, bg => [
    E(540, 560, bill(bg, { w: 820 }), { a: 'drop', sfx: 'thud', rot: -3 }),
    E(860, 300, bolt(bg, { w: 180 }), { a: 'pop', w: 104, sfx: 'pop', loop: 'shake', amp: 6, lw: 104 }),
    E(540, 1090, Tx('TU LA SENS', 210, 'var(--a1)'), { a: 'stamp', w: 105, sfx: 'stamp' }),
  ]);
  S(107, 5, bg => [
    E(540, 640, bill(bg, { w: 420 }), { a: 'none', w: 109, m: [{ w: 109, dy: -330, r: -8, dur: .4, sfx: 'swish' }] }),
    E(540, 760, O.wallet({ w: 680, fill: bg === 'coral' ? P.navy : T.coral2 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1190, Tx('TU OUVRES', 200, 'var(--a1)'), { a: 'up', w: 108 }),
  ]);
  // « tu comptes, tu vois l'argent partir » : les mêmes billets, comptés puis envolés
  S(111, 5, bg => [
    ...[0, 1, 2].map(i => E(400 + (i - 1) * 40, 470 + i * 200, bill(bg, { w: 500 }), { a: 'pop', d: .05 + i * .2, rot: (i - 1) * 6, sfx: 'tick', m: [{ w: 116, d: i * .08, dx: 1200, r: 18, dur: .5, e: 'inOut', sfx: i ? undefined : 'whoosh' }] })),
    E(890, 330, Tx(cnt({ from: 0, to: 3, d: .05, dur: .6 }), 260, 'var(--a1)'), { a: 'pop' }),
    E(880, 700, O.eye({ w: 300 }), { a: 'spin', w: 113, sfx: 'pop' }),
    E(540, 1215, Tx('TU LE VOIS PARTIR', 120, 'var(--a1)'), { a: 'up', w: 113, dist: 200 }),
  ]);
  // phrase ajoutée : « Dix euros de moins dans ta poche, ça se remarque. » (le billet reste sur les deux plans)
  S(117, 5, bg => [
    E(540, 560, bill(bg, { w: 700 }, '10 €'), { a: 'pop', sfx: 'pop', rot: -3, m: [{ w: 119, dx: 220, dy: -140, s: .6, r: 13, o: .5, dur: .45, e: 'inOut', sfx: 'swish' }] }),
    E(540, 1090, Tx('−10 €', 320, 'var(--a1)'), { a: 'stamp', w: 119, d: .1, sfx: 'stamp' }),
  ]);
  S(124, 5, bg => [
    E(760, 420, bill(bg, { w: 420 }, '10 €'), { a: 'none', rot: 10 }, 'opacity:.5;'),
    E(400, 660, O.eye({ w: 480, px: .7 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1150, Tx('ÇA SE REMARQUE', 140, 'var(--a1)'), { a: 'up', d: .12 }),
  ]);
  // « Avec une carte, tu poses, ça bipe, c'est fini. » : le même terminal sur deux plans
  S(127, 5, bg => [
    E(660, 700, O.terminal({ w: 420 }), { a: 'pop', sfx: 'pop' }),
    E(250, 400, O.card({ w: 400, fill: P.coral }), { a: 'left', d: .1, m: [{ w: 131, dx: 300, dy: 200, r: 12, dur: .35, e: 'inOut', sfx: 'click' }] }),
    E(540, 1210, Tx('AVEC UNE CARTE', 130, 'var(--a1)'), { a: 'up', d: .15, dist: 200 }),
  ]);
  k = 38;
  S(132, 5, bg => [
    E(660, 700, O.terminal({ w: 420 }), { a: 'none' }),
    E(550, 600, O.card({ w: 400, fill: P.coral }), { a: 'none', rot: 12 }),
    E(270, 1130, Tx('BIP', 300, 'var(--a1)'), { a: 'stamp', sfx: 'ding' }),
    E(250, 520, O.check({ w: 300, col: P.cream, draw: { w: 134, sfx: 'pop' } }), { a: 'none', w: 134 }),
  ]);
  S(136, 5, bg => [
    E(540, 520, card(bg, { w: 620 }), { a: 'pop', sfx: 'pop', loop: 'float', amp: 12, per: 1.2 }),
    E(540, 940, Tx('RIEN', 280), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1200, Tx('NE QUITTE TA MAIN', 120, 'var(--a1)'), { a: 'up', w: 138, dist: 200 }),
  ]);
  S(141, 5, bg => [
    E(300, 520, bolt(bg, { w: 260 }), { a: 'pop', sfx: 'pop', m: [{ w: 143, dx: 480, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1000, Tx('PLUS TARD', 225, 'var(--a1)'), { a: 'stamp', w: 144, sfx: 'stamp' }),
  ]);
  // le relevé reste à l'écran pour la phrase ajoutée : « Et souvent, tu ne te souviens même plus de ce que c'était. »
  S(146, 5, bg => [
    E(540, 600, O.receipt({ w: 460 }), { a: 'drop', sfx: 'print' }),
    E(830, 400, bolt(bg, { w: 200 }), { a: 'pop', w: 148, sfx: 'pop', loop: 'shake', amp: 7, lw: 148 }),
    E(540, 1170, Tx('TON RELEVÉ', 200, 'var(--a1)'), { a: 'up', w: 147 }),
  ]);
  S(149, 5, bg => [
    E(540, 600, O.receipt({ w: 460 }), { a: 'none' }),
    E(880, 420, Tx('?', 320, 'var(--a1)'), { a: 'pop', d: .15, rot: 10, sfx: 'pop', loop: 'swing', amp: 6, per: .7 }),
    E(540, 1170, Tx('TU NE TE SOUVIENS', 120), { a: 'stamp', w: 151 }),
  ]);
  S(155, 5, bg => [
    E(540, 600, O.receipt({ w: 460 }), { a: 'none' }),
    E(560, 640, O.tag('? €', { w: 640, fs: 170, fill: P.navy, ink: P.cream }), { a: 'right', rot: -6, sfx: 'swish' }),
    E(540, 1170, Tx("C'ÉTAIT QUOI ?", 140, 'var(--a1)'), { a: 'up', w: 157 }),
  ]);

  /* ===== SCÈNE 6 — BOULANGERIE ET CAFÉ ===== */
  S(161, 6, bg => [
    E(540, 560, O.bread({ w: 620 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1090, Tx('BOULANGERIE', 180, 'var(--a1)'), { a: 'stamp', w: 164, sfx: 'stamp' }),
  ]);
  S(165, 6, bg => [
    E(540, 600, O.croissant({ w: 640 }), { a: 'spin', rot: -14, sfx: 'pop' }),
    E(850, 310, Tx('+1', 260, 'var(--a1)'), { a: 'stamp', w: 167, sfx: 'stamp' }),
    E(540, 1130, Tx('PASSE TOUT SEUL', 130), { a: 'up', w: 169 }),
  ]);
  // « Au café, le deuxième aussi. » : la même tasse, puis sa jumelle
  S(172, 6, bg => [
    E(540, 620, O.cup({ w: 520, fill: P.navy, ink: P.cream }), { a: 'drop', sfx: 'thud' }),
    E(540, 1130, Tx('AU CAFÉ', 280, 'var(--a1)'), { a: 'stamp', w: 173, sfx: 'stamp' }),
  ]);
  S(174, 6, bg => [
    E(320, 640, O.cup({ w: 400, fill: P.navy, ink: P.cream }), { a: 'none' }),
    E(760, 640, O.cup({ w: 400 }), { a: 'right', d: .08, sfx: 'thud' }),
    E(540, 1130, Tx('LE 2E AUSSI', 220, 'var(--a1)'), { a: 'up', d: .2 }),
  ]);

  /* ===== SCÈNE 7 — LA NUANCE ===== */
  // « Attention : l'écart n'est pas toujours aussi énorme. » : les mêmes colonnes, la grande rétrécit
  S(177, 7, bg => [
    barL({ d: 0, dur: .01 }),
    barR({ d: 0, dur: .01 }),
    E(540, 300, Tx('ATTENTION', 210, 'var(--a1)'), { a: 'down', sfx: 'stamp' }),
    E(540, 610, O.line('M30,20 V320', { w: 60, vw: 60, vh: 340, col: P.cream, sw: 24, draw: { w: 178, dur: .3, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(540, 1210, Tx("L'ÉCART", 150), { a: 'up', w: 178, dist: 200 }),
  ]);
  S(180, 7, bg => [
    barL({ d: 0, dur: .01 }),
    barR({ d: 0, dur: .01 }, { org: '50% 100%', m: [{ w: 181, s: .61, dur: .6, e: 'inOut', sfx: 'fall' }] }),
    E(540, 300, Tx('PAS TOUJOURS', 180, 'var(--a1)'), { a: 'down', d: .1 }),
    E(540, 1210, Tx('AUSSI ÉNORME', 140), { a: 'stamp', w: 182 }),
  ]);
  S(184, 7, bg => [
    E(540, 740, Tx(cnt({ from: 2010, to: 2024, d: .15, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    line(1010, P.coral, { d: .65, dur: .3 }),
  ]);
  S(186, 7, bg => [
    E(430, 520, O.clipboard({ w: 400 }), { a: 'pop', sfx: 'pop' }),
    E(640, 640, O.magnifier({ w: 400, ring: P.navy }), { a: 'right', d: .15, sfx: 'whoosh' }),
    E(540, 1130, Tx(cnt({ from: 0, to: 71, w: 189, dur: .45, suf: ' ÉTUDES', sfx: 'tick' }), 220, 'var(--a1)'), { a: 'up', w: 189 }),
  ]);
  S(191, 7, bg => [
    E(540, 640, O.check({ w: 340, col: P.yellow, draw: { w: 194, sfx: 'pop' } }), { a: 'none', w: 194 }),
    E(540, 320, Tx("L'EFFET EST", 170), { a: 'down', d: .1 }),
    E(540, 1080, Tx('RÉEL', 400, 'var(--a1)'), { a: 'stamp', w: 195, sfx: 'stamp' }),
  ]);
  S(196, 7, bg => [
    E(540, 560, O.disc({ w: 300, fill: P.navy }), { a: 'pop' }),
    E(540, 560, O.coin('1', { w: 230 }), { a: 'spin', d: .06, sfx: 'coin', m: [{ w: 198, s: 1.3, dur: .15, sfx: 'coin' }, { w: 198, d: .2, s: 1, dur: .25 }] }),
    E(540, 1060, Tx('PETIT', 300, 'var(--a1)'), { a: 'stamp', w: 197, d: .1, sfx: 'stamp' }),
  ]);
  S(199, 7, bg => [
    ...Array.from({ length: 7 }, (_, i) => E(260 + (i % 4) * 190 + (i > 3 ? 95 : 0), 760 - Math.floor(i / 4) * 230, O.coin('1', { w: 180 }), { a: 'drop', d: .03 + i * .07, dur: .4, sfx: i % 2 ? undefined : 'coin' })),
    E(540, 1130, Tx('RÉPÉTÉ', 300, 'var(--a1)'), { a: 'up', w: 200, d: .1, sfx: 'stamp' }),
  ]);
  S(202, 7, bg => [
    E(540, 835, O.drawer({ w: 520 }), { a: 'none', m: [{ w: 203, dy: 140, dur: .25, sfx: 'kaching' }] }),
    E(540, 620, O.register({ w: 700, fill: P.coral }), { a: 'pop', sfx: 'pop' }),
    E(540, 1220, Tx('À CHAQUE CAISSE', 140, 'var(--a1)'), { a: 'stamp', d: .2 }),
  ]);
  S(206, 7, bg => [
    E(300, 420, O.eye({ w: 380 }), { a: 'pop', sfx: 'pop' }),
    E(600, 820, bill(bg, { w: 620 }), { a: 'right', d: .08, m: [{ w: 208, o: .18, s: .8, dur: .9, e: 'inOut' }] }),
    E(540, 1190, Tx('MOINS TU VOIS', 160, 'var(--a1)'), { a: 'up', w: 207, dist: 200 }),
  ]);
  S(211, 7, bg => [
    E(540, 560, bolt(bg, { w: 420 }), { a: 'pop', sfx: 'pop', m: [{ w: 212, s: .6, o: .45, dur: .7, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1110, Tx('MOINS TU SENS', 160, 'var(--a1)'), { a: 'stamp', d: .2, sfx: 'stamp' }),
  ]);
  // phrase ajoutée : « Et ce que tu ne sens pas, tu ne le comptes pas. » (l'éclair barré reste sur les deux plans)
  S(215, 7, bg => [
    E(540, 520, bolt(bg, { w: 252 }), { a: 'none' }, 'opacity:.45;'),
    E(540, 520, O.cross({ w: 440, col: P.cream, sw: 46, draw: { w: 218, sfx: 'buzz' } }), { a: 'none', w: 218 }),
    E(540, 1110, Tx('TU NE SENS PAS', 140, 'var(--a1)'), { a: 'up', w: 218 }),
  ]);
  k = 60;
  S(222, 7, bg => [
    E(540, 420, bolt(bg, { w: 252 }), { a: 'none' }, 'opacity:.45;'),
    E(540, 420, O.cross({ w: 440, col: P.cream, sw: 46, draw: { d: 0, dur: .01 } }), { a: 'none' }),
    ...[0, 1, 2].map(i => E(260 + i * 280, 860, O.coin('€', { w: 190, small: '' }), { a: 'pop', d: i * .06, sfx: i ? undefined : 'coin', m: [{ w: 224, d: i * .07, dx: 1100, dur: .45, e: 'inOut', sfx: i ? undefined : 'whoosh' }] })),
    E(540, 1190, Tx('TU NE COMPTES PAS', 120, 'var(--a1)'), { a: 'stamp', d: .12 }),
  ]);

  /* ===== SCÈNE 8 — BOUCLE : on revient sur la carte du premier plan ===== */
  k = 62;
  S(227, 8, bg => [
    E(540, 290, Tx('LA PROCHAINE FOIS', 120), { a: 'down' }),
    E(660, 780, O.terminal({ w: 400 }), { a: 'up', sfx: 'pop' }),
    E(250, 520, card(bg, { w: 400 }), { a: 'left', d: .1, m: [{ w: 229, dx: 300, dy: 170, r: 12, dur: .3, e: 'inOut', sfx: 'click' }] }),
    E(270, 1150, Tx('BIP', 280, 'var(--a1)'), { a: 'stamp', w: 233, sfx: 'ding' }),
  ]);
  k = 65;
  S(234, 8, bg => [
    E(540, 520, card(bg, { w: 660 }), { a: 'left', rot: -6, sfx: 'whoosh', loop: 'float', amp: 8, per: 1.6 }),
    E(540, 1080, Tx('SOUVIENS-TOI…', 150, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
})();
