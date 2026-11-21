/* Vidéo 014 — « Le paquet qui rétrécit »
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;

  /* ----- objets propres à la vidéo ----- */
  // paquet de biscuits générique
  O.pack = (o = {}) => {
    const { w = 460, fill = P.coral, ink = P.cream, g = '' } = o;
    return svg(w, 400, 520,
      `<rect y="30" width="400" height="490" rx="26" fill="${fill}"/><rect width="400" height="70" rx="20" fill="${fill}"/>
       <rect width="400" height="70" rx="20" fill="rgba(0,0,0,.2)"/>
       <circle cx="200" cy="215" r="92" fill="${T.yellow2}"/><circle cx="200" cy="215" r="74" fill="${P.yellow}"/>
       <g fill="${T.yellow2}"><circle cx="170" cy="190" r="10"/><circle cx="228" cy="200" r="10"/><circle cx="196" cy="246" r="10"/><circle cx="240" cy="244" r="8"/><circle cx="160" cy="232" r="8"/></g>
       <rect x="40" y="340" width="320" height="86" rx="12" fill="${ink}"/><text x="200" y="402" text-anchor="middle" font-size="62" fill="${P.navy}">BISCUITS</text>
       ${g ? `<text x="200" y="486" text-anchor="middle" font-size="46" fill="${ink}">${g}</text>` : ''}`);
  };
  // étiquette de rayon : gros prix, petit prix au kilo
  O.shelf = (price, kg, o = {}) => {
    const { w = 700, fill = P.cream, ink = P.navy, hl = null } = o;
    return svg(w, 640, 380,
      `<rect width="640" height="380" rx="22" fill="${fill}"/><rect width="640" height="54" rx="22" fill="${ink}"/><rect y="30" width="640" height="24" fill="${ink}"/>
       <text x="320" y="238" text-anchor="middle" font-size="176" fill="${ink}">${price}</text>
       <text x="320" y="334" text-anchor="middle" font-size="56" fill="${ink}" opacity=".8">${kg}</text>
       ${hl ? `<rect x="120" y="274" width="400" height="82" rx="14" fill="none" stroke="${P.coral}" stroke-width="12" data-draw='${JSON.stringify(hl)}'/>` : ''}`);
  };
  O.factory = (o = {}) => {
    const { w = 600, fill = P.navy, ink = P.cream } = o;
    return svg(w, 600, 460,
      `<g fill="${ink}" opacity=".7"><circle cx="150" cy="40" r="34"/><circle cx="200" cy="-10" r="26"/></g>
       <rect x="110" y="80" width="80" height="200" fill="${fill}"/>
       <path d="M0,460 V240 L150,160 V240 L300,160 V240 L450,160 V240 H600 V460 Z" fill="${fill}"/>
       <g fill="${ink}"><rect x="60" y="320" width="90" height="70" rx="8"/><rect x="210" y="320" width="90" height="70" rx="8"/><rect x="360" y="320" width="90" height="70" rx="8"/></g>`);
  };
  O.cone = (o = {}) => {
    const { w = 380 } = o;
    return svg(w, 380, 560,
      `<path d="M90,260 L190,560 L290,260 Z" fill="${T.yellow2}"/><circle cx="190" cy="190" r="130" fill="${P.cream}"/><circle cx="130" cy="110" r="84" fill="${P.coral}"/><circle cx="250" cy="110" r="84" fill="${P.yellow}"/>
       <path d="M110,300 L270,300" stroke="rgba(0,0,0,.2)" stroke-width="16"/>`);
  };
  O.house = (o = {}) => {
    const { w = 260, fill = P.cream, ink = P.navy } = o;
    return svg(w, 260, 280, `<path d="M130,0 L260,120 H0 Z" fill="${ink === P.navy ? P.coral : ink}"/><rect x="24" y="110" width="212" height="170" fill="${fill}"/><rect x="100" y="170" width="60" height="110" rx="6" fill="${ink}"/>`);
  };
  O.store = (o = {}) => {
    const { w = 620, fill = P.cream, ink = P.navy } = o;
    return svg(w, 620, 460,
      `<rect x="30" y="140" width="560" height="320" fill="${fill}"/>
       <g>${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${i * 88.6},40 h88.6 v90 a44.3,44.3 0 0 1 -88.6,0 Z" fill="${i % 2 ? P.cream : P.coral}"/>`).join('')}</g>
       <rect x="0" y="0" width="620" height="50" rx="10" fill="${ink}"/>
       <rect x="80" y="230" width="170" height="130" rx="8" fill="${ink}"/><rect x="370" y="230" width="150" height="230" rx="8" fill="${ink}"/>`);
  };
  // affichette de rayon
  O.notice = (o = {}) => {
    const { w = 620 } = o;
    return svg(w, 620, 420,
      `<rect x="290" y="300" width="40" height="120" fill="${P.navy}"/><rect width="620" height="320" rx="22" fill="${P.yellow}"/>
       <rect x="16" y="16" width="588" height="288" rx="12" fill="none" stroke="${P.navy}" stroke-width="10"/>
       <text x="310" y="140" text-anchor="middle" font-size="96" fill="${P.navy}">QUANTITÉ</text><text x="310" y="252" text-anchor="middle" font-size="96" fill="${P.coral}">EN BAISSE</text>`);
  };
  O.shelves = (o = {}) => {
    const { w = 760 } = o;
    const cols = [P.coral, P.yellow, T.green2, P.cream, P.coral, T.navy2];
    let s = '';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) s += `<rect x="${50 + c * 112}" y="${40 + r * 190 + (c % 2) * 14}" width="84" height="${128 - (c % 2) * 14}" rx="8" fill="${cols[(r * 2 + c) % 6]}"/>`;
    return svg(w, 760, 610, `<rect width="760" height="610" rx="18" fill="${P.navy}"/><rect x="20" y="20" width="720" height="570" rx="8" fill="${T.navy2}"/>${s}
      <g fill="${P.cream}"><rect x="20" y="168" width="720" height="22"/><rect x="20" y="358" width="720" height="22"/><rect x="20" y="548" width="720" height="22"/></g>`);
  };
  O.biscuit = (o = {}) => {
    const { w = 200 } = o;
    return svg(w, 200, 200, `<circle cx="100" cy="100" r="100" fill="${T.yellow2}"/><circle cx="100" cy="100" r="82" fill="${P.yellow}"/><g fill="${T.yellow2}"><circle cx="70" cy="70" r="11"/><circle cx="128" cy="84" r="11"/><circle cx="96" cy="132" r="11"/><circle cx="140" cy="130" r="9"/></g>`);
  };

  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f, d) => { const bg = CYCLE[k++ % 5]; shot({ w, d, bg, scene, html: f(bg) }); };
  const pk = (bg, o = {}) => O.pack(bg === 'coral' ? { fill: P.navy, ...o } : o);
  const sh = (bg, price, kg, o = {}) => O.shelf(price, kg, bg === 'cream' ? { fill: P.yellow, ...o } : o);
  const tg = (bg, txt, o = {}) => O.tag(txt, bg === 'cream' ? { fill: P.navy, ink: P.cream, ...o } : o);
  const und = (col, an = {}) => E(540, an.y || 960, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col, sw: 28, draw: { d: .2, dur: .3, ...an } }), { a: 'none', cut: false });

  V.keywords = [3, 10, 12, 13, 22, 31, 36, 46, 50, 54, 58, 64, 68, 72, 78, 81, 88, 89, 95, 105, 108, 115, 119, 133, 140, 147, 152, 155, 165, 170, 173, 180, 183, 198, 201, 206];

  /* ===== SCÈNE 1 — HOOK ===== */
  S(0, 1, bg => [
    E(540, 300, O.eye({ w: 380 }), { a: 'pop', d: .1 }),
    E(540, 800, pk(bg, { w: 500 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1240, Tx('CE PAQUET', 170, 'var(--a1)'), { a: 'up', w: 2, dist: 200 }),
  ]);
  S(6, 1, bg => [
    E(540, 620, sh(bg, '2,49 €', 'LE PRIX', { w: 760 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1130, Tx('PAS BOUGÉ', 220, 'var(--a1)'), { a: 'stamp', w: 9, sfx: 'stamp' }),
  ]);
  S(11, 1, bg => [
    E(540, 640, pk(bg, { w: 560 }), { a: 'none', m: [{ w: 12, s: .68, dur: .5, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1150, Tx('LUI, SI', 300, 'var(--a1)'), { a: 'stamp', w: 12, d: .25, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(13, 2, bg => [
    E(540, 560, Tx('- 30 G', 340, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    ...[0, 1, 2].map(i => E(300 + i * 240, 1000, O.biscuit({ w: 190 }), { a: 'pop', d: .1 + i * .08, m: [{ w: 16, d: i * .1, dy: 1100, r: 60, dur: .45, e: 'inOut', sfx: i ? undefined : 'fall' }] })),
  ]);
  S(17, 2, bg => [
    E(540, 560, O.eye({ w: 620 }), { a: 'pop', sfx: 'pop' }),
    E(540, 560, O.cross({ w: 520, draw: { w: 21, sfx: 'buzz' } }), { a: 'none', w: 21 }),
    E(540, 1130, Tx('PAS VU', 260, 'var(--a1)'), { a: 'up', w: 22 }),
  ]);
  S(23, 2, bg => [
    E(540, 460, Tx('NORMAL', 300), { a: 'stamp', sfx: 'stamp' }),
    E(540, 800, Tx('TOUT EST FAIT', 150), { a: 'up', w: 24 }),
    E(540, 1090, Tx('POUR ÇA', 240, 'var(--a1)'), { a: 'stamp', w: 27, sfx: 'stamp' }),
  ]);
  S(29, 2, bg => [
    E(540, 600, O.clipboard({ w: 440 }), { a: 'pop', sfx: 'pop' }),
    E(700, 760, O.magnifier({ w: 380, ring: P.coral }), { a: 'right', w: 33, sfx: 'whoosh' }),
    E(540, 1170, Tx('UNE ÉTUDE', 200), { a: 'up', w: 31 }),
  ]);
  S(34, 2, bg => [
    E(540, 420, O.rect(820, 70, P.yellow, 12), { a: 'left', sfx: 'swish' }),
    E(540, 720, Tx('À QUEL', 240), { a: 'pop', d: .1 }),
    E(540, 1020, Tx('POINT ?', 280, 'var(--a1)'), { a: 'stamp', w: 36, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — D'OÙ ÇA VIENT ===== */
  S(37, 3, bg => [
    E(540, 600, Tx("D'ABORD", 280), { a: 'stamp', sfx: 'stamp' }),
    E(540, 930, Tx("D'OÙ ÇA VIENT", 150, 'var(--a1)'), { a: 'up', w: 38 }),
    E(540, 1170, O.arrow({ w: 300, fill: P.coral }), { a: 'left', w: 40, sfx: 'whoosh' }),
  ]);
  S(41, 3, bg => [
    E(540, 620, O.factory({ w: 660 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1150, Tx('LE FABRICANT', 160, 'var(--a1)'), { a: 'up', w: 42 }),
  ]);
  S(43, 3, bg => [
    E(540, 540, O.line('M20,440 C240,430 380,360 460,220 S560,60 620,30', { w: 820, vw: 640, vh: 470, col: P.coral, sw: 30, draw: { w: 45, dur: .6, sfx: 'rise' } }), { a: 'none' }),
    E(250, 700, O.coin('€', { w: 220, small: '' }), { a: 'pop', sfx: 'coin' }),
    E(540, 1150, Tx('SES COÛTS', 220, 'var(--a1)'), { a: 'up', w: 44 }),
  ]);
  S(47, 3, bg => [
    E(300, 560, O.disc({ w: 320, fill: P.navy }), { a: 'pop', sfx: 'pop' }), E(300, 560, Tx('1', 240, P.cream), { a: 'pop', d: .05, cut: false }),
    E(780, 560, O.disc({ w: 320, fill: P.coral }), { a: 'pop', d: .15 }), E(780, 560, Tx('2', 240, P.cream), { a: 'pop', d: .2, cut: false }),
    E(540, 1090, Tx('2 OPTIONS', 230), { a: 'stamp', w: 49, sfx: 'stamp' }),
  ]);
  S(51, 3, bg => [
    E(230, 480, Tx('1', 520, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(660, 1000, O.tag('PRIX', { w: 560 }), { a: 'pop', w: 52, sfx: 'pop', m: [{ w: 54, dy: -70, s: 1.12, dur: .3 }] }),
    E(740, 520, O.arrow({ w: 340 }), { a: 'up', w: 52, d: .15, rot: -90, sfx: 'rise', loop: 'float', amp: 16, per: .8 }),
  ]);
  S(55, 3, bg => [
    E(230, 480, Tx('2', 520, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(690, 520, tg(bg, '2,49 €', { w: 560 }), { a: 'pop', w: 56, sfx: 'pop' }),
    E(540, 1100, Tx('MÊME PRIX', 200), { a: 'up', w: 58 }),
  ]);
  S(59, 3, bg => [
    E(540, 600, pk(bg, { w: 560 }), { a: 'pop', sfx: 'pop', m: [{ w: 61, s: .66, dur: .5, e: 'inOut', sfx: 'fall' }, { w: 64, s: .72, dur: .15 }, { w: 64, d: .2, s: .66, dur: .15 }] }),
    E(540, 1180, Tx('MOINS DEDANS', 160, 'var(--a1)'), { a: 'stamp', w: 62, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 4 — L'EXEMPLE ===== */
  S(65, 4, bg => [
    E(540, 760, O.calendar('HIER', { w: 700, fs: 180 }), { a: 'spin', sfx: 'swish' }),
  ]);
  S(66, 4, bg => [
    E(540, 560, pk(bg, { w: 520, g: '300 g' }), { a: 'pop', sfx: 'pop' }),
    E(540, 1150, Tx('300 G', 300, 'var(--a1)'), { a: 'stamp', d: .2, sfx: 'stamp' }),
  ]);
  S(68, 4, bg => [
    E(540, 760, sh(bg, '2,49 €', '8,30 € / KG', { w: 820 }), { a: 'drop', sfx: 'thud', m: [{ d: .72, s: 1.06, dur: .18 }, { d: .95, s: 1, dur: .2 }] }),
  ]);
  S(69, 4, bg => [
    E(540, 760, O.calendar("AUJOURD'HUI", { w: 760, fs: 104 }), { a: 'spin', sfx: 'swish' }),
  ]);
  S(70, 4, bg => [
    E(540, 600, pk(bg, { w: 430, g: '270 g' }), { a: 'pop', sfx: 'pop', m: [{ w: 71, s: 1.08, dur: .18 }, { w: 71, d: .22, s: 1, dur: .18 }] }),
    E(540, 1150, Tx('270 G', 300, 'var(--a1)'), { a: 'stamp', d: .25, sfx: 'stamp' }),
  ]);
  S(72, 4, bg => [
    E(540, 640, sh(bg, '2,49 €', '9,22 € / KG', { w: 820 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1150, Tx('= 2,49 €', 240, 'var(--a1)'), { a: 'pop', d: .65, sfx: 'pop' }),
  ]);
  S(73, 4, bg => [
    E(290, 560, pk(bg, { w: 400 }), { a: 'left' }),
    E(790, 590, pk(bg, { w: 400 }), { a: 'right', m: [{ w: 75, s: .86, dy: 30, dur: .35, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1010, Tx('MÊME BOÎTE', 190), { a: 'up', w: 73, d: .1 }),
    E(540, 1220, Tx('OU PRESQUE', 170, 'var(--a1)'), { a: 'pop', w: 75, sfx: 'pop' }),
  ]);
  S(77, 4, bg => [
    E(290, 600, O.shelf('2,49 €', '', { w: 460 }), { a: 'pop', sfx: 'pop' }),
    E(790, 600, O.shelf('2,49 €', '', { w: 460 }), { a: 'pop', d: .12 }),
    E(540, 600, Tx('=', 260, P.navy), { a: 'pop', d: .3 }),
    E(540, 1090, Tx('MÊME ÉTIQUETTE', 140, 'var(--a1)'), { a: 'up', w: 78 }),
  ]);

  /* ===== SCÈNE 5 — AU KILO ===== */
  S(79, 5, bg => [
    E(540, 560, Tx('SAUF QUE…', 195), { a: 'stamp', sfx: 'stamp' }),
    E(540, 900, Tx('AU KILO', 300, 'var(--a1)'), { a: 'stamp', w: 81, sfx: 'stamp' }),
    und(P.coral, { w: 81, d: .3, y: 1100 }),
  ]);
  S(86, 5, bg => [
    E(540, 700, tg(bg, '8,30 €', { w: 860, sub: 'LE KILO' }), { a: 'drop', sfx: 'thud' }),
    E(540, 1140, Tx('HIER', 200, 'var(--a1)'), { a: 'up', d: .3 }),
  ]);
  S(88, 5, bg => [
    E(540, 760, O.tag('9,22 €', { w: 860, sub: 'LE KILO', fill: P.yellow }), { a: 'drop', sfx: 'thud' }),
    E(540, 340, O.arrow({ w: 320, fill: P.coral }), { a: 'up', d: .7, rot: -90, sfx: 'rise', loop: 'float', amp: 14, per: .7 }),
    E(540, 1170, Tx("AUJOURD'HUI", 170, 'var(--a1)'), { a: 'up', d: .35 }),
  ]);
  S(89, 5, bg => [
    E(540, 600, Tx('+11 %', 400, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .7 }),
    E(540, 1030, Tx('DE HAUSSE', 220), { a: 'up', w: 91 }),
  ]);
  S(92, 5, bg => [
    E(540, 330, Tx('SANS TOUCHER', 160), { a: 'down' }),
    E(540, 700, O.shelf('2,49 €', '', { w: 700 }), { a: 'pop', d: .1, sfx: 'pop' }),
    E(540, 1150, Tx('AU PRIX', 260, 'var(--a1)'), { a: 'stamp', w: 94, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 6 — LE MOT ===== */
  S(96, 6, bg => [
    E(540, 560, O.bubble({ w: 700, fill: P.navy }), { a: 'pop', sfx: 'pop' }),
    E(540, 470, Tx('…', 300, P.cream), { a: 'pop', d: .15, cut: false }),
    E(540, 1130, Tx('UN NOM', 300, 'var(--a1)'), { a: 'stamp', w: 99, sfx: 'stamp' }),
  ]);
  S(101, 6, bg => [
    E(540, 560, Tx('SHRINKFLATION', 140), { a: 'pop', sfx: 'pop' }),
    und(P.coral, { d: .25, y: 700 }),
    E(540, 1030, Tx("DE L'ANGLAIS", 170, 'var(--a1)'), { a: 'up', w: 102 }),
  ]);
  S(104, 6, bg => [
    E(540, 330, pk(bg, { w: 240 }), { a: 'pop', m: [{ w: 105, d: .4, s: .7, dur: .4, e: 'inOut' }] }),
    E(540, 760, Tx('RÉDU', 320), { a: 'stamp', w: 105, sfx: 'stamp' }),
    E(540, 1080, Tx('FLATION', 280, 'var(--a1)'), { a: 'stamp', w: 105, d: .35, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 7 — POURQUOI ÇA MARCHE ===== */
  S(106, 7, bg => [
    E(540, 600, Tx('POURQUOI', 240), { a: 'stamp', sfx: 'stamp' }),
    E(540, 900, Tx('ÇA MARCHE ?', 180, 'var(--a1)'), { a: 'up', w: 107 }),
  ]);
  S(109, 7, bg => [
    E(540, 620, O.disc({ w: 640, fill: P.navy }), { a: 'pop' }),
    E(540, 600, O.bulb({ w: 360, ink: P.cream }), { a: 'pop', d: .06, sfx: 'pop' }),
    E(540, 1140, Tx('UNE EXPLICATION', 130), { a: 'up', w: 110 }),
  ]);
  S(111, 7, bg => [
    E(540, 740, O.shelf('2,49 €', '', { w: 700 }), { a: 'pop', sfx: 'pop' }),
    E(540, 330, O.eye({ w: 340 }), { a: 'down', w: 113 }),
    E(540, 1170, Tx('TU LE REGARDES', 140, 'var(--a1)'), { a: 'up', w: 115 }),
  ]);
  S(116, 7, bg => [
    E(250, 520, O.pack({ w: 330, g: '270 g' }), { a: 'pop', sfx: 'pop' }),
    E(760, 480, O.eye({ w: 380 }), { a: 'pop', w: 118 }),
    E(760, 480, O.cross({ w: 340, col: P.coral, draw: { w: 118, d: .15, sfx: 'buzz' } }), { a: 'none', w: 118 }),
    E(540, 960, Tx('LE POIDS', 240), { a: 'stamp', w: 117, sfx: 'stamp' }),
    E(540, 1200, Tx('PRESQUE JAMAIS', 140, 'var(--a1)'), { a: 'stamp', w: 119, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 8 — L'ÉTUDE ===== */
  const cher = o => O.person({ w: 280, fill: P.yellow, coat: true, ink: P.cream, ...o });
  S(120, 8, bg => [
    E(240, 700, cher(), { a: 'pop', sfx: 'pop' }),
    E(540, 640, cher({ w: 320 }), { a: 'pop', d: .12 }),
    E(840, 700, cher(), { a: 'pop', d: .24 }),
    E(540, 1100, O.rect(800, 70, P.yellow, 12), { a: 'left', w: 123, sfx: 'swish' }),
  ]);
  S(124, 8, bg => [
    E(540, 600, Tx(cnt({ from: 1, to: 10, dur: .45, sfx: 'tick' }), 560, 'var(--a1)'), { a: 'pop' }),
    E(540, 1050, Tx('ANS', 300), { a: 'up', w: 126 }),
  ]);
  S(127, 8, bg => [
    E(380, 640, O.cone({ w: 400 }), { a: 'pop', sfx: 'pop', rot: -8 }),
    E(780, 760, O.receipt({ w: 280 }), { a: 'up', d: .15, rot: 8 }),
    E(540, 1210, Tx("D'ACHATS", 180, 'var(--a1)'), { a: 'up', d: .2, dist: 200 }),
  ]);
  S(130, 8, bg => [
    E(220, 640, O.house({ w: 260 }), { a: 'pop', sfx: 'pop' }),
    E(540, 600, O.house({ w: 300 }), { a: 'pop', d: .12 }),
    E(860, 640, O.house({ w: 260 }), { a: 'pop', d: .24 }),
    E(540, 1090, Tx('FOYERS AMÉRICAINS', 115, 'var(--a1)'), { a: 'up', w: 132 }),
  ]);
  S(134, 8, bg => [
    E(540, 700, Tx('RÉSULTAT', 240, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    und(P.navy, { y: 880 }),
  ]);
  S(135, 8, bg => [
    E(330, 720, O.person({ w: 380, fill: P.cream }), { a: 'left' }),
    E(760, 420, Tx('!', 380, 'var(--a1)'), { a: 'stamp', w: 136, sfx: 'stamp' }),
    E(540, 1170, Tx('ON RÉAGIT', 220), { a: 'up', w: 136 }),
  ]);
  S(140, 8, bg => [
    E(540, 600, Tx('×4', 700, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .6 }),
    E(540, 1110, Tx('FOIS PLUS', 220), { a: 'up', w: 141 }),
  ]);
  S(145, 8, bg => [
    E(540, 760, O.tag('PRIX', { w: 620, fill: P.navy, ink: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(540, 380, O.arrow({ w: 320, fill: P.yellow }), { a: 'up', d: .1, rot: -90, sfx: 'rise' }),
    E(540, 1130, Tx('HAUSSE DE PRIX', 140), { a: 'up', d: .15 }),
  ]);
  S(148, 8, bg => [
    E(400, 620, O.pack({ w: 420 }), { a: 'pop', m: [{ w: 150, s: .7, dur: .45, e: 'inOut', sfx: 'fall' }] }),
    E(820, 620, O.arrow({ w: 300, fill: P.coral }), { a: 'down', w: 150, rot: 90 }),
    E(540, 1130, Tx('BAISSE DE QUANTITÉ', 104, 'var(--a1)'), { a: 'up', w: 150 }),
  ]);

  /* ===== SCÈNE 9 — LA RÈGLE FRANÇAISE ===== */
  S(153, 9, bg => [
    E(540, 560, O.calendar('JUILLET', { w: 600, fs: 130 }), { a: 'spin', sfx: 'swish', m: [{ w: 154, r: -5, dur: .2 }, { w: 154, d: .25, r: 0, dur: .2 }] }),
    E(540, 1100, Tx('2024', 320, 'var(--a1)'), { a: 'stamp', w: 155, sfx: 'stamp', m: [{ w: 155, d: .55, s: 1.08, dur: .2 }, { w: 155, d: .8, s: 1, dur: .2 }] }),
  ]);
  S(156, 9, bg => [
    E(540, 500, O.pin({ w: 340, fill: P.yellow, ink: P.navy }), { a: 'drop', dur: .45, sfx: 'thud' }),
    E(540, 1010, Tx('EN FRANCE', 220), { a: 'up', d: .1 }),
  ]);
  S(158, 9, bg => [
    E(540, 600, O.store({ w: 700, fill: P.cream, ink: P.navy }), { a: 'pop', sfx: 'pop' }),
    E(540, 1110, Tx('GRANDES SURFACES', 120), { a: 'up', w: 159 }),
  ]);
  S(161, 9, bg => [
    E(540, 520, O.notice({ w: 700 }), { a: 'drop', dur: .5, sfx: 'thud' }),
    E(540, 960, Tx('LE SIGNALER', 180), { a: 'stamp', w: 163, sfx: 'stamp' }),
    E(540, 1190, Tx('EN RAYON', 190, 'var(--a1)'), { a: 'up', w: 164 }),
  ]);
  S(166, 9, bg => [
    E(540, 400, Tx('MAIS…', 300), { a: 'stamp', sfx: 'stamp' }),
    E(540, 900, O.calendar('2 MOIS', { w: 560, fs: 150 }), { a: 'spin', w: 169, sfx: 'swish' }),
    E(540, 1250, Tx('SEULEMENT', 150, 'var(--a1)'), { a: 'up', w: 167, dist: 200, hw: 169 }),
  ]);

  /* ===== SCÈNE 10 — LE VRAI REPÈRE ===== */
  S(171, 10, bg => [
    E(540, 520, Tx('LE VRAI', 240), { a: 'down' }),
    E(540, 850, Tx('REPÈRE', 320, 'var(--a1)'), { a: 'stamp', w: 173, sfx: 'stamp' }),
    und(P.coral, { w: 174, y: 1050 }),
  ]);
  S(175, 10, bg => [
    E(540, 420, O.arrow({ w: 320, fill: P.coral }), { a: 'down', rot: 90, sfx: 'fall' }),
    E(540, 900, Tx('RESTE LÀ', 260, 'var(--a1)'), { a: 'stamp', d: .1, sfx: 'stamp' }),
  ]);
  S(177, 10, bg => [
    E(540, 600, O.shelf('2,49 €', '9,22 € / KG', { w: 860, hl: { w: 179, dur: .4, sfx: 'swish' } }), { a: 'pop', sfx: 'pop' }),
    E(540, 1130, Tx('PRIX AU KILO', 160, 'var(--a1)'), { a: 'up', w: 179 }),
  ]);
  S(181, 10, bg => [
    E(540, 560, O.shelf('2,49 €', '9,22 € / KG', { w: 760 }), { a: 'none', m: [{ w: 185, s: 1.06, dur: .2 }, { w: 185, d: .25, s: 1, dur: .2 }] }),
    E(620, 740, O.magnifier({ w: 380, ring: P.navy }), { a: 'right', d: .05, sfx: 'whoosh' }),
    E(540, 1090, Tx('EN PETIT', 240, 'var(--a1)'), { a: 'stamp', w: 183, sfx: 'stamp' }),
    E(540, 1270, Tx("SUR L'ÉTIQUETTE", 100), { a: 'up', w: 185, dist: 200 }),
  ]);

  /* ===== SCÈNE 11 — BOUCLE ===== */
  S(186, 11, bg => [
    E(540, 560, Tx('LA PROCHAINE', 160), { a: 'down' }),
    E(540, 880, Tx('FOIS', 340, 'var(--a1)'), { a: 'stamp', w: 189, sfx: 'stamp' }),
  ]);
  S(190, 11, bg => [
    E(540, 640, O.shelves({ w: 800 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1180, Tx('DANS LE RAYON', 150, 'var(--a1)'), { a: 'up', d: .15, dist: 200 }),
  ]);
  S(193, 11, bg => [
    E(540, 600, Tx('2,49 €', 380), { a: 'pop', sfx: 'pop' }),
    E(540, 600, O.cross({ w: 520, col: P.coral, draw: { w: 197, sfx: 'buzz' } }), { a: 'none', w: 197 }),
    E(540, 1090, Tx('PAS LE GROS', 180, 'var(--a1)'), { a: 'up', w: 196 }),
  ]);
  S(199, 11, bg => [
    E(540, 560, O.burst({ w: 1000, n: 14, col: P.coral }), { a: 'pop', loop: 'spin', per: 6, cut: false }),
    E(540, 560, Tx('9,22 € / KG', 170), { a: 'pop', sfx: 'pop' }),
    E(540, 1090, Tx('LIS LE PETIT', 160, P.navy), { a: 'stamp', w: 201, sfx: 'stamp' }),
  ]);
  S(202, 11, bg => [
    E(540, 300, O.eye({ w: 380 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1240, Tx('REGARDE BIEN', 150, 'var(--a1)'), { a: 'up', w: 203, dist: 200 }),
    E(540, 800, pk(bg, { w: 500 }), { a: 'drop', w: 205, sfx: 'thud', loop: 'pulse', amp: .03, per: .7 }),
  ]);
})();
