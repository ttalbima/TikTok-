/* Vidéo 006 — « Pourquoi tu oublies toujours de résilier après l'essai gratuit ? »
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;

  /* ----- objets propres à cette vidéo ----- */
  // bouton d'appli
  O.btn = (txt, o = {}) => {
    const { w = 700, fill = P.coral, ink = P.cream, fs = 110, h = 220 } = o;
    return svg(w, 700, h,
      `<rect y="16" width="700" height="${h - 16}" rx="${(h - 16) / 2}" fill="rgba(0,0,0,.28)"/>
       <rect width="700" height="${h - 16}" rx="${(h - 16) / 2}" fill="${fill}"/>
       <text x="350" y="${(h - 16) / 2 + fs * .36}" text-anchor="middle" font-size="${fs}" fill="${ink}">${txt}</text>`);
  };
  // téléphone générique ; cta = texte du gros bouton à l'écran
  O.phone = (o = {}) => {
    const { w = 460, body = P.navy, screen = P.cream, cta = '', btn = P.coral, ink = P.cream, off = false } = o;
    const line = off ? 'rgba(0,0,0,.18)' : T.navy2;
    return svg(w, 460, 860,
      `<rect width="460" height="860" rx="64" fill="${body}"/>
       <rect x="26" y="26" width="408" height="808" rx="42" fill="${off ? T.cream2 : screen}"/>
       <rect x="170" y="44" width="120" height="26" rx="13" fill="${body}"/>
       <rect x="70" y="130" width="320" height="220" rx="24" fill="${line}" opacity=".35"/>
       <g fill="${line}" opacity=".45"><rect x="70" y="390" width="320" height="24" rx="12"/><rect x="70" y="434" width="220" height="24" rx="12"/></g>
       ${cta ? `<rect x="50" y="556" width="360" height="130" rx="65" fill="rgba(0,0,0,.25)"/><rect x="50" y="544" width="360" height="130" rx="65" fill="${btn}"/>
       <text x="230" y="628" text-anchor="middle" font-size="54" fill="${ink}">${cta}</text>` : ''}`);
  };
  // journal
  O.news = (o = {}) => {
    const { w = 560, ink = P.navy } = o;
    return svg(w, 560, 680,
      `<rect x="20" y="16" width="540" height="664" fill="${T.cream2}"/><rect width="540" height="664" fill="${P.cream}"/>
       <rect x="36" y="36" width="468" height="110" fill="${ink}"/><text x="270" y="124" text-anchor="middle" font-size="92" fill="${P.cream}">JOURNAL</text>
       <rect x="36" y="180" width="220" height="200" fill="${ink}" opacity=".3"/>
       <g stroke="${ink}" stroke-width="14" stroke-linecap="round" opacity=".5">
       <path d="M290,196 H500 M290,250 H500 M290,304 H500 M290,358 H440 M40,430 H500 M40,484 H500 M40,538 H500 M40,592 H360"/></g>`);
  };
  // carte bancaire générique
  O.bcard = (o = {}) => {
    const { w = 640, fill = P.navy, ink = P.cream } = o;
    return svg(w, 640, 400,
      `<rect width="640" height="400" rx="40" fill="${fill}"/>
       <rect x="60" y="110" width="110" height="84" rx="14" fill="${P.yellow}"/>
       <g fill="${ink}" opacity=".85">${[0, 1, 2, 3].map(g => [0, 1, 2, 3].map(i => `<circle cx="${78 + g * 138 + i * 30}" cy="270" r="11"/>`).join('')).join('')}</g>
       <rect x="60" y="320" width="240" height="22" rx="11" fill="${ink}" opacity=".5"/>`);
  };

  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f) => { const bg = CYCLE[k++ % 5]; shot({ w, bg, scene, html: f(bg) }); };
  const dark = bg => bg === 'navy' || bg === 'green';
  const fig = bg => (dark(bg) || bg === 'coral' ? P.cream : P.navy);                 // couleur d'objet contrastée
  const phone = (bg, o = {}) => O.phone(dark(bg) ? { body: P.cream, screen: P.navy, ...o } : o);
  const btn = (bg, txt, o = {}) => O.btn(txt, bg === 'coral' ? { fill: P.yellow, ink: P.navy, ...o } : o);
  const who = (bg, o = {}) => O.person({ fill: fig(bg), ...o });
  const crown = bg => O.crown(bg === 'yellow' ? { w: 220, fill: P.coral, band: T.coral2 } : { w: 220 });
  const under = (y, col, an) => E(540, y, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col, sw: 28, draw: an }), { a: 'none', cut: false });

  V.keywords = [8, 13, 16, 24, 28, 36, 45, 50, 61, 66, 75, 79, 90, 99, 112, 116, 120, 130, 133, 143, 160, 174, 182, 186, 192, 206, 216];

  /* ===== SCÈNE 1 — HOOK ===== */
  S(0, 1, bg => [
    E(540, 700, Tx('POURQUOI', 240), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1010, Tx('?', 420, 'var(--a1)'), { w: 1, rot: 8, loop: 'swing', amp: 5, per: .9, sfx: 'pop' }),
  ]);
  S(2, 1, bg => [
    E(540, 760, phone(bg, { w: 560, cta: 'ESSAI GRATUIT' }), { a: 'up', dist: 900, sfx: 'whoosh', m: [{ w: 3, r: -4, dur: .2 }, { w: 4, r: 3, dur: .2 }] }),
  ]);
  S(5, 1, bg => [
    E(540, 700, Tx('RÉSILIER', 270), { a: 'pop', sfx: 'pop' }),
    E(540, 700, O.line('M20,20 H900', { w: 920, vw: 920, vh: 40, col: P.navy, sw: 36, draw: { d: .15, dur: .2, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(540, 1050, Tx('OUBLIÉ', 260, 'var(--a1)'), { a: 'stamp', d: .3, sfx: 'stamp' }),
  ]);
  S(7, 1, bg => [
    E(540, 600, O.burst({ w: 1100, n: 14 }), { a: 'pop', loop: 'spin', per: 7, cut: false }),
    E(540, 600, btn(bg, 'ESSAI GRATUIT', { w: 900, fs: 96 }), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .6 }),
    E(540, 1080, Tx('0 €', 380, 'var(--a1)'), { a: 'stamp', w: 8, sfx: 'coin' }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(9, 2, bg => [
    E(540, 640, O.brain({ w: 640, fill: P.coral, fold: P.cream }), { a: 'pop', sfx: 'pop', loop: 'float', per: 1.2 }),
    E(540, 640, O.cross({ w: 560, col: P.navy, sw: 54, draw: { w: 11, sfx: 'buzz' } }), { a: 'none', w: 11 }),
    E(540, 1150, Tx('PAS TA MÉMOIRE', 150), { a: 'up', w: 12 }),
  ]);
  S(14, 2, bg => [
    E(540, 600, O.pill({ w: 640, fill: T.navy2 }), { a: 'pop' }),
    E(540, 600, O.pill({ w: 640 }), { a: 'fade', w: 16, dur: .15, cut: false }),
    E(392, 600, O.disc({ w: 236 }), { a: 'pop', m: [{ w: 16, dx: 296, dur: .25, sfx: 'click' }] }),
    E(540, 1040, Tx('UN RÉGLAGE', 210, 'var(--a1)'), { a: 'stamp', w: 16, d: .1, sfx: 'stamp' }),
  ]);
  // v2 : « Mets-toi à la place du créateur de l'appli. » (phrase raccourcie : 2 plans au lieu de 4)
  k = 8;                                             // garde les fonds d'origine pour la suite (vert, crème, puis le corps inchangé)
  S(17, 2, bg => [
    E(540, 380, Tx('À SA PLACE', 220, 'var(--a1)'), { a: 'down', w: 19 }),
    E(250, 900, who(bg, { w: 340 }), { a: 'left', m: [{ w: 18, dx: 580, dur: .45, e: 'inOut', sfx: 'whoosh' }] }),
    E(830, 900, O.person({ w: 340, fill: P.coral }), { a: 'right', m: [{ w: 18, dx: -580, dur: .45, e: 'inOut' }] }),
  ]);
  S(22, 2, bg => [
    E(330, 640, who(bg, { w: 380 }), { a: 'up', sfx: 'pop' }),
    E(770, 640, phone(bg, { w: 300, cta: 'ESSAI' }), { a: 'pop', w: 23, rot: 8, sfx: 'pop' }),
    E(540, 1160, Tx("L'APPLI", 280, 'var(--a1)'), { a: 'stamp', w: 24, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — TU ES LE PATRON ===== */
  S(25, 3, bg => [
    E(540, 760, who(bg, { w: 440 }), { a: 'pop', sfx: 'pop' }),
    E(540, 330, crown(bg), { a: 'drop', w: 27, dur: .45, sfx: 'ding' }),
    E(540, 1210, Tx('LE PATRON', 220, 'var(--a1)'), { a: 'stamp', w: 28, sfx: 'stamp' }),
  ]);
  S(29, 3, bg => [
    ...[0, 1, 2, 3, 4].map(i => E(180 + i * 180, 700 + (i % 2) * 60, who(bg, { w: 190 }), { a: 'pop', d: i * .1, sfx: i ? undefined : 'pop' })),
    E(540, 1130, Tx('+ ABONNÉS', 230, 'var(--a1)'), { a: 'stamp', w: 32, sfx: 'stamp' }),
  ]);
  S(33, 3, bg => [
    E(300, 600, btn(bg, '1', { w: 400, fs: 150 }), { a: 'pop', w: 35, sfx: 'pop', rot: -5 }),
    E(780, 600, btn(bg, '2', { w: 400, fs: 150 }), { a: 'pop', w: 35, d: .15, sfx: 'pop', rot: 5 }),
    E(540, 1050, Tx('2 BOUTONS', 240, 'var(--a1)'), { a: 'stamp', w: 36, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 4 — BOUTON 1 ===== */
  S(37, 4, bg => [
    E(540, 560, btn(bg, '1', { w: 760, fs: 150 }), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1020, Tx('BOUTON 1', 260, 'var(--a1)'), { a: 'up', w: 38 }),
  ]);
  S(39, 4, bg => [
    E(540, 560, O.rect(820, 60, 'rgba(20,33,61,.2)', 30), { a: 'none', cut: false }),
    E(540, 560, O.line('M30,30 H790', { w: 820, vw: 820, vh: 60, col: P.coral, sw: 60, draw: { dur: 1.0, sfx: 'rise' } }), { a: 'none', cut: false }),
    E(540, 400, Tx('7 JOURS', 150), { a: 'down' }),
    E(540, 960, Tx("FIN DE L'ESSAI", 150, 'var(--a1)'), { a: 'stamp', w: 43, sfx: 'stamp' }),
  ]);
  S(44, 4, bg => [
    E(540, 620, O.rect(520, 520, P.coral, 60), { a: 'stamp', w: 45, sfx: 'stamp' }),
    E(540, 620, Tx('STOP', 230, P.cream), { a: 'stamp', w: 45, cut: false }),
    E(540, 1150, Tx("TOUT S'ARRÊTE", 170, 'var(--a1)'), { a: 'up', w: 45, d: .15 }),
    E(540, 300, Tx('TOUT…', 180), { a: 'down', hw: 45 }),
  ]);
  S(46, 4, bg => [
    E(300, 900, who(bg, { w: 400 }), { a: 'left', sfx: 'pop' }),
    E(700, 480, O.bubble({ w: 560, fill: P.navy }), { a: 'pop', w: 48, sfx: 'pop' }),
    E(700, 400, Tx('…', 260, P.cream), { a: 'pop', w: 49, cut: false }),
  ]);
  S(50, 4, bg => [
    E(540, 620, Tx('OUI', 620, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1130, O.check({ w: 260, col: P.navy, draw: { d: .3, sfx: 'pop' } }), { a: 'none', d: .3 }),
  ]);
  S(52, 4, bg => [
    E(540, 560, O.arrow({ w: 560 }), { a: 'left', sfx: 'whoosh', loop: 'float', per: .8 }),
    E(540, 1000, Tx('POUR CONTINUER', 150), { a: 'up', d: .08 }),
  ]);

  /* ===== SCÈNE 5 — BOUTON 2 ===== */
  S(53, 5, bg => [
    E(540, 560, btn(bg, '2', { w: 760, fs: 150 }), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1020, Tx('BOUTON 2', 260, 'var(--a1)'), { a: 'up', w: 54 }),
  ]);
  S(55, 5, bg => [
    E(540, 560, O.rect(820, 60, 'rgba(244,235,217,.25)', 30), { a: 'none', cut: false }),
    E(540, 560, O.line('M30,30 H790', { w: 820, vw: 820, vh: 60, col: P.coral, sw: 60, draw: { dur: 1.0, sfx: 'rise' } }), { a: 'none', cut: false }),
    E(540, 400, Tx('7 JOURS', 150), { a: 'down' }),
    E(540, 960, Tx("FIN DE L'ESSAI", 150, 'var(--a1)'), { a: 'stamp', w: 59, sfx: 'stamp' }),
  ]);
  S(60, 5, bg => [
    E(540, 420, Tx('TOUT CONTINUE', 170), { a: 'stamp', w: 61, sfx: 'stamp' }),
    ...[0, 1, 2].map(i => E(240, 900, O.coin('€', { w: 220, small: '' }), { a: 'pop', w: 60, d: i * .22, m: [{ w: 60, d: i * .22 + .1, dx: 620, dy: -60 + i * 30, dur: .5, e: 'inOut', sfx: 'coin' }] })),
    E(860, 900, O.box('', { w: 300, fill: P.navy }), { a: 'pop' }),
  ]);
  S(62, 5, bg => [
    E(300, 900, who(bg, { w: 400 }), { a: 'left', sfx: 'pop' }),
    E(700, 480, O.bubble({ w: 560, fill: P.navy }), { a: 'pop', w: 64, sfx: 'pop' }),
    E(700, 400, Tx('…', 260, P.cream), { a: 'pop', w: 65, cut: false }),
  ]);
  S(66, 5, bg => [
    E(540, 620, Tx('NON', 600, 'var(--a2)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1130, O.cross({ w: 240, col: P.cream, sw: 50, draw: { d: .3, sfx: 'pop' } }), { a: 'none', d: .3 }),
  ]);
  S(68, 5, bg => [
    E(540, 560, O.rect(360, 360, P.coral, 44), { a: 'pop', sfx: 'pop' }),
    E(540, 1000, Tx('POUR ARRÊTER', 170), { a: 'up', d: .08 }),
  ]);

  /* ===== SCÈNE 6 — LA SEULE DIFFÉRENCE ===== */
  S(69, 6, bg => [
    E(300, 560, O.tag('9,99 €', { w: 440, fs: 130 }), { a: 'left', rot: -5 }),
    E(780, 560, O.tag('9,99 €', { w: 440, fs: 130 }), { a: 'right', rot: 5 }),
    E(540, 1000, Tx('MÊME PRIX', 210, 'var(--a1)'), { a: 'stamp', w: 70, sfx: 'stamp' }),
  ]);
  S(71, 6, bg => [
    E(300, 620, phone(bg, { w: 330 }), { a: 'pop', sfx: 'pop' }),
    E(780, 620, phone(bg, { w: 330 }), { a: 'pop', d: .1 }),
    E(540, 1160, Tx('MÊME SERVICE', 165, 'var(--a1)'), { a: 'stamp', w: 72, sfx: 'stamp' }),
  ]);
  S(73, 6, bg => [
    E(540, 560, Tx('LA SEULE', 230), { a: 'down' }),
    E(540, 860, Tx('DIFFÉRENCE', 215, 'var(--a1)'), { a: 'stamp', w: 75, sfx: 'stamp' }),
    under(1030, P.navy, { w: 75, d: .25, dur: .3 }),
  ]);
  S(76, 6, bg => [
    E(320, 620, who(bg, { w: 340 }), { a: 'left', m: [{ w: 78, dx: 120, dur: .6, e: 'inOut' }] }),
    E(700, 700, O.box('', { w: 360, fill: P.yellow, ink: P.yellow }), { a: 'pop', m: [{ w: 78, dx: 120, dur: .6, e: 'inOut', sfx: 'swish' }] }),
    E(540, 1150, Tx("L'EFFORT ?", 250, 'var(--a1)'), { a: 'stamp', w: 79, sfx: 'stamp' }),
    E(540, 310, Tx('QUI FAIT…', 170), { a: 'down' }),
  ]);

  /* ===== SCÈNE 7 — L'EXPÉRIENCE DU JOURNAL ===== */
  S(80, 7, bg => [
    E(540, 640, O.news({ w: 600 }), { a: 'drop', sfx: 'thud', rot: -4 }),
    E(540, 1200, Tx('EUROPÉEN', 190, 'var(--a1)'), { a: 'up', w: 82 }),
  ]);
  S(83, 7, bg => [
    E(300, 520, btn(bg, '1', { w: 400, fs: 150 }), { a: 'pop', sfx: 'pop' }),
    E(780, 520, btn(bg, '2', { w: 400, fs: 150 }), { a: 'pop', d: .12 }),
    E(540, 960, Tx('TESTÉS', 300, 'var(--a1)'), { a: 'stamp', w: 84, sfx: 'stamp' }),
  ]);
  S(87, 7, bg => [
    E(540, 560, Tx(cnt({ from: 0, to: 2, w: 89, dur: .5, sfx: 'tick' }), 620), { a: 'pop' }),
    E(540, 960, Tx('MILLIONS', 260, 'var(--a1)'), { a: 'stamp', w: 90, sfx: 'stamp' }),
    E(540, 1200, Tx('DE LECTEURS', 150), { a: 'up', w: 92 }),
  ]);
  S(93, 7, bg => [
    E(540, 480, btn(bg, '1', { w: 560, fs: 150 }), { a: 'pop', sfx: 'pop' }),
    E(540, 900, O.rect(300, 300, P.navy, 40), { a: 'stamp', w: 95, sfx: 'stamp' }),
    E(540, 1200, Tx('ARRÊT AUTO', 190, 'var(--a1)'), { a: 'up', w: 96 }),
  ]);
  S(98, 7, bg => [
    ...Array.from({ length: 10 }, (_, i) => E(140 + (i % 5) * 200, 480 + Math.floor(i / 5) * 300, O.person({ w: 170, fill: i === 7 ? P.yellow : T.green2 }), { a: 'pop', d: i * .04 })),
    E(540, 1150, Tx('PRESQUE PERSONNE', 120, 'var(--a1)'), { a: 'stamp', w: 99, sfx: 'stamp' }),
    E(540, 630, O.cross({ w: 560, col: P.coral, sw: 50, draw: { w: 101, d: .1, sfx: 'buzz' } }), { a: 'none', w: 101, d: .1 }),
  ]);
  S(103, 7, bg => [
    E(540, 480, btn(bg, '2', { w: 560, fs: 150 }), { a: 'pop', sfx: 'pop' }),
    E(540, 900, O.arrow({ w: 420, fill: P.navy }), { a: 'left', w: 105, sfx: 'whoosh', loop: 'float', per: .7 }),
    E(540, 1200, Tx('SUITE AUTO', 190, 'var(--a1)'), { a: 'up', w: 106 }),
  ]);
  S(108, 7, bg => [
    ...Array.from({ length: 10 }, (_, i) => E(140 + (i % 5) * 200, 420 + Math.floor(i / 5) * 300, O.person({ w: 170, fill: i % 2 ? P.yellow : T.navy2 }), { a: 'pop', d: i * .04, m: i % 2 ? [{ w: 112, s: 1.15, dur: .25 }] : [] })),
    E(540, 1130, Tx('LA MOITIÉ', 250, 'var(--a1)'), { a: 'stamp', w: 112, sfx: 'stamp' }),
  ]);
  S(113, 7, bg => [
    E(540, 560, O.tag('PLEIN TARIF', { w: 820, fill: P.navy, ink: P.cream, fs: 100 }), { a: 'drop', sfx: 'thud' }),
    ...[0, 1, 2].map(i => E(300 + i * 240, 1050, O.coin('€', { w: 200, small: '' }), { a: 'drop', w: 115, d: i * .12, dur: .45, sfx: i ? undefined : 'coin' })),
  ]);
  S(117, 7, bg => [
    E(540, 560, Tx('LE PLUS', 240), { a: 'down' }),
    E(540, 900, Tx('ÉTRANGE', 270, 'var(--a1)'), { a: 'stamp', w: 120, sfx: 'stamp', loop: 'swing', amp: 2.5, per: .5 }),
  ]);
  S(121, 7, bg => [
    ...[0, 1, 2].map(i => E(280 + i * 260, 640, who(bg, { w: 240 }), { a: 'pop', d: i * .12, sfx: i ? undefined : 'pop' })),
    E(540, 1100, Tx('LES ABONNÉS EN +', 135, 'var(--a1)'), { a: 'up', w: 122 }),
  ]);
  S(125, 7, bg => [
    E(540, 620, O.news({ w: 560 }), { a: 'pop', sfx: 'pop' }),
    E(540, 620, O.cross({ w: 600, col: P.coral, sw: 56, draw: { w: 127, sfx: 'buzz' } }), { a: 'none', w: 127 }),
    E(540, 1190, Tx('JAMAIS LU', 230, 'var(--a1)'), { a: 'stamp', w: 129, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 8 — L'INERTIE ===== */
  S(131, 8, bg => [
    E(540, 440, Tx("ÇA S'APPELLE", 170), { a: 'down' }),
    E(540, 800, Tx("L'INERTIE", 290, 'var(--a1)'), { a: 'stamp', w: 133, sfx: 'stamp' }),
    under(990, P.coral, { w: 133, d: .25, dur: .3 }),
  ]);
  S(134, 8, bg => [
    E(540, 900, O.rect(900, 60, P.navy, 20), { a: 'none' }),
    E(480, 720, who(bg, { w: 300 }), { a: 'pop', rot: 90, sfx: 'pop' }),
    E(760, 420, Tx('Z', 200, 'var(--a1)'), { a: 'pop', w: 135 }),
    E(880, 300, Tx('Z', 130, 'var(--a1)'), { a: 'pop', w: 136 }),
    E(540, 1150, Tx('NE RIEN FAIRE', 180), { a: 'up', w: 135 }),
  ]);
  S(137, 8, bg => [
    E(540, 620, Tx('LE CHOIX', 300), { a: 'stamp', w: 140, sfx: 'stamp' }),
    E(540, 300, Tx('TOUJOURS', 170, 'var(--a1)'), { a: 'down', w: 138 }),
    E(540, 1000, O.arrow({ w: 300, fill: P.navy }), { a: 'down', rot: 90, sfx: 'fall' }),
  ]);
  S(141, 8, bg => [
    E(540, 600, Tx('LE + FACILE', 220, 'var(--a1)'), { a: 'stamp', w: 142, sfx: 'stamp' }),
    E(540, 1010, O.check({ w: 300, col: P.cream, draw: { w: 143, sfx: 'pop' } }), { a: 'none', w: 143 }),
  ]);
  S(144, 8, bg => [
    E(540, 760, who(bg, { w: 420 }), { a: 'pop', sfx: 'pop' }),
    E(540, 350, crown(bg), { a: 'drop', dur: .45, d: .1, sfx: 'ding' }),
    E(540, 1200, Tx('CELUI QUI DÉCIDE', 130, 'var(--a1)'), { a: 'up', w: 147 }),
  ]);
  S(148, 8, bg => [
    E(540, 560, O.pill({ w: 640, fill: T.navy2 }), { a: 'pop' }),
    E(540, 560, O.pill({ w: 640 }), { a: 'fade', w: 152, dur: .15, cut: false }),
    E(392, 560, O.disc({ w: 236 }), { a: 'pop', m: [{ w: 152, dx: 296, dur: .25, sfx: 'click' }] }),
    E(540, 960, Tx('SI TU NE FAIS RIEN', 125), { a: 'up', w: 153 }),
    E(540, 1170, Tx('PAR DÉFAUT', 200, 'var(--a1)'), { a: 'stamp', w: 156, sfx: 'stamp' }),
  ]);
  S(157, 8, bg => [
    E(540, 520, Tx('DÉCIDE', 300), { a: 'stamp', sfx: 'stamp' }),
    E(540, 900, Tx('À TA PLACE', 215, 'var(--a1)'), { a: 'stamp', w: 159, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 9 — LA CARTE REMPLACÉE ===== */
  S(161, 9, bg => [
    E(540, 600, O.clipboard({ w: 440 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1130, Tx('AUTRE ÉTUDE', 200, 'var(--a1)'), { a: 'up', w: 162 }),
  ]);
  S(164, 9, bg => [
    E(540, 480, O.eye({ w: 600 }), { a: 'pop', sfx: 'pop', m: [{ w: 167, dy: 20, s: 1.06, dur: .2 }] }),
    E(540, 1000, O.magnifier({ w: 380, ring: P.cream }), { a: 'left', w: 166, sfx: 'whoosh' }),
  ]);
  S(169, 9, bg => [
    E(540, 620, O.bcard({ w: 780 }), { a: 'drop', w: 170, sfx: 'thud', rot: -5 }),
    E(540, 1130, Tx('TA CARTE', 240, 'var(--a1)'), { a: 'up', w: 171 }),
  ]);
  S(173, 9, bg => [
    E(540, 600, O.bcard({ w: 700, fill: P.cream, ink: P.navy }), { a: 'none', rot: -5, m: [{ w: 174, dx: -1200, r: -30, dur: .4, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 600, O.bcard({ w: 700, fill: P.yellow, ink: P.navy }), { a: 'right', dist: 1200, w: 174, d: .15, rot: 5 }),
    E(540, 1100, Tx('REMPLACÉE', 195, 'var(--a1)'), { a: 'stamp', w: 174, d: .3, sfx: 'stamp' }),
  ]);
  S(175, 9, bg => [
    ...[0, 1, 2, 3].map(i => E(180 + i * 240, 600, Tx('••••', 150), { a: 'pop', w: 178, d: i * .14, sfx: 'click' })),
    E(540, 330, Tx('TON NUMÉRO', 180, 'var(--a1)'), { a: 'down', w: 176 }),
    E(540, 1000, O.bcard({ w: 520 }), { a: 'up', rot: 4 }),
  ]);
  S(181, 9, bg => [
    E(300, 520, btn(bg, 'OUI', { w: 420, fs: 120 }), { a: 'pop', sfx: 'pop', rot: -4 }),
    E(780, 520, btn(bg, 'NON', { w: 420, fs: 120, fill: P.navy, ink: P.cream }), { a: 'pop', d: .12, rot: 4 }),
    E(540, 960, Tx('CHOISIR', 320, 'var(--a1)'), { a: 'stamp', w: 182, sfx: 'stamp' }),
  ]);
  S(183, 9, bg => [
    E(540, 760, Tx('RÉSULTAT', 250, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    under(950, P.coral, { d: .2, dur: .3 }),
  ]);
  S(184, 9, bg => [
    E(540, 540, O.line('M20,420 H280 C330,420 330,60 380,50 H620', { w: 860, vw: 640, vh: 470, col: P.coral, sw: 30, draw: { w: 185, dur: .6, sfx: 'rise' } }), { a: 'none' }),
    E(540, 1130, Tx('RÉSILIATIONS', 180), { a: 'stamp', w: 185, d: .1, sfx: 'stamp', m: [{ w: 186, d: .3, s: 1.1, dur: .2 }, { w: 186, d: .55, s: 1, dur: .2 }] }),
  ]);
  const cher = () => O.person({ w: 340, fill: P.yellow, coat: true, ink: P.cream });
  S(187, 9, bg => [
    E(320, 760, cher(), { a: 'pop', sfx: 'pop' }),
    E(760, 760, cher(), { a: 'pop', d: .14 }),
    E(540, 1180, O.clipboard({ w: 200 }), { a: 'up', w: 189 }),
  ]);
  S(190, 9, bg => [
    E(540, 520, O.eye({ w: 560 }), { a: 'pop', sfx: 'pop' }),
    E(540, 520, O.line('M20,20 H640', { w: 660, vw: 660, vh: 40, col: P.coral, sw: 40, draw: { w: 191, dur: .25, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(540, 1040, Tx('INATTENTION', 195), { a: 'up', w: 191 }),
  ]);
  S(192, 9, bg => [
    E(540, 700, Tx('×2', 700, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .6 }),
  ]);
  S(196, 9, bg => [
    E(330, 1000 - 130, O.bar(260, { w: 240, grow: { d: 0 } }), { a: 'none' }),
    E(750, 1000 - 260, O.bar(520, { w: 240, fill: P.yellow, grow: { w: 197, dur: .6, sfx: 'rise' } }), { a: 'none' }),
    E(750, 390, O.coin('€', { w: 200, small: '' }), { a: 'drop', w: 199, dur: .45, sfx: 'coin' }),
    E(540, 1150, Tx('REVENUS', 240, 'var(--a1)'), { a: 'stamp', w: 197, d: .2, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 10 — QUESTION ===== */
  S(201, 10, bg => [
    E(300, 560, btn(bg, '1', { w: 420, fs: 150 }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .06, per: .8 }),
    E(780, 560, btn(bg, '2', { w: 420, fs: 150 }), { a: 'pop', d: .12, loop: 'pulse', amp: .06, per: .8, ld: .4 }),
    E(540, 1010, Tx('QUEL BOUTON ?', 160, 'var(--a1)'), { a: 'stamp', w: 205, sfx: 'stamp' }),
    E(540, 300, Tx('ALORS, PATRON', 150), { a: 'down' }),
  ]);
  S(207, 10, bg => [
    E(540, 700, Tx('ET TOI ?', 320, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    under(920, P.coral, { w: 208, dur: .3 }),
  ]);
  S(210, 10, bg => [
    ...[0, 1, 2, 3].map(i => E(170 + i * 247, 620, phone(bg, { w: 210, cta: '€' }), { a: 'drop', d: i * .14, dur: .45, sfx: i % 2 ? undefined : 'thud' })),
    E(540, 1130, Tx('COMBIEN ?', 230, 'var(--a1)'), { a: 'stamp', w: 211, sfx: 'stamp' }),
  ]);
  S(213, 10, bg => [
    ...[0, 1, 2, 3].map(i => E(170 + i * 247, 560, O.phone({ w: 210, off: true }), { a: 'none', rot: (i - 1.5) * 5 })),
    E(540, 300, Tx('Z Z Z', 150, 'var(--a1)'), { a: 'pop', w: 214, loop: 'float', per: 1 }),
    E(540, 1080, Tx('PLUS UTILISÉS ?', 150), { a: 'stamp', w: 215, sfx: 'stamp', loop: 'pulse', amp: .03, per: .7 }),
  ]);
})();
