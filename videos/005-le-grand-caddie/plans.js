/* Vidéo 005 — « Donne un chariot plus grand à des clients : ils achètent plus. »
   Univers supermarché · structure « parcours d'un client » · fin en boucle.
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;

  /* ----- objets propres à cette vidéo ----- */
  // chariot de supermarché générique
  O.cart = (o = {}) => {
    const { w = 600, fill = P.cream, ink = P.yellow } = o;
    let grid = '';
    for (let i = 1; i < 7; i++) grid += `<path d="M${90 + i * 67},70 L${150 + i * 50},330" stroke="${ink}" stroke-width="7" opacity=".45"/>`;
    grid += `<path d="M105,150 H542 M125,240 H520" stroke="${ink}" stroke-width="7" opacity=".45"/>`;
    return svg(w, 600, 520,
      `<path d="M10,30 H70 L92,74" fill="none" stroke="${ink}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
       <path d="M90,70 H560 L500,330 H150 Z" fill="${fill}"/>${grid}
       <path d="M150,330 L130,420 H480" fill="none" stroke="${ink}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
       <circle cx="170" cy="470" r="40" fill="${ink}"/><circle cx="450" cy="470" r="40" fill="${ink}"/>
       <circle cx="170" cy="470" r="14" fill="${fill}"/><circle cx="450" cy="470" r="14" fill="${fill}"/>`);
  };
  O.milk = (o = {}) => {
    const { w = 160, fill = P.cream, ink = P.navy } = o;
    return svg(w, 160, 270, `<path d="M0,70 L40,0 H120 L160,70 V270 H0 Z" fill="${fill}"/><path d="M0,70 H160" stroke="rgba(0,0,0,.2)" stroke-width="8"/>
      <rect x="0" y="130" width="160" height="80" fill="${ink}"/><circle cx="80" cy="170" r="24" fill="${fill}"/>`);
  };
  O.pasta = (o = {}) => {
    const { w = 220, fill = P.coral } = o;
    return svg(w, 220, 300, `<rect width="220" height="300" rx="16" fill="${fill}"/><rect x="0" y="0" width="220" height="56" rx="16" fill="rgba(0,0,0,.2)"/>
      <ellipse cx="110" cy="180" rx="70" ry="80" fill="${P.cream}"/>
      <g stroke="${T.yellow2}" stroke-width="12" stroke-linecap="round"><path d="M80,130 V230 M110,120 V240 M140,130 V230"/></g>`);
  };
  O.pack = (o = {}) => {
    const { w = 200, fill = P.yellow, band = P.navy } = o;
    return svg(w, 200, 240, `<rect width="200" height="240" rx="14" fill="${fill}"/><rect x="0" y="80" width="200" height="70" fill="${band}"/><circle cx="100" cy="115" r="20" fill="${fill}"/>`);
  };
  O.plate = (o = {}) => {
    const { w = 500, fill = P.cream, rim = T.cream2 } = o;
    return svg(w, 500, 500, `<circle cx="250" cy="250" r="250" fill="${fill}"/><circle cx="250" cy="250" r="165" fill="none" stroke="${rim}" stroke-width="14"/>`);
  };
  O.store = (o = {}) => {
    const { w = 600, fill = P.cream, ink = P.navy } = o;
    let aw = '';
    for (let i = 0; i < 8; i++) aw += `<path d="M${i * 75},110 h75 v70 a37.5,30 0 0 1 -75,0 Z" fill="${i % 2 ? P.cream : P.coral}"/>`;
    return svg(w, 600, 520,
      `<rect x="150" y="0" width="300" height="86" rx="12" fill="${ink}"/><text x="300" y="64" text-anchor="middle" font-size="58" fill="${fill}">MAGASIN</text>
       <rect x="30" y="110" width="540" height="410" fill="${fill}"/>${aw}
       <rect x="240" y="290" width="120" height="230" rx="8" fill="${ink}"/>
       <rect x="70" y="290" width="130" height="130" rx="8" fill="${ink}" opacity=".85"/><rect x="400" y="290" width="130" height="130" rx="8" fill="${ink}" opacity=".85"/>`);
  };
  O.shelf = (o = {}) => {
    const { w = 700, fill = P.cream, ink = P.navy } = o;
    const cols = [P.coral, P.yellow, T.green2, ink, P.coral, P.yellow];
    let s = '';
    for (let r = 0; r < 3; r++) {
      for (let i = 0; i < 6; i++) s += `<rect x="${44 + i * 104}" y="${50 + r * 240 + (i % 2) * 24}" width="84" height="${150 - (i % 2) * 24}" rx="10" fill="${cols[(i + r * 2) % 6]}"/>`;
      s += `<rect x="20" y="${200 + r * 240}" width="660" height="26" rx="8" fill="${ink}"/>`;
    }
    return svg(w, 700, 760, `<rect width="700" height="760" rx="20" fill="${fill}"/>${s}`);
  };
  O.ticket = (o = {}) => {
    const { w = 380, h = 900, fill = P.cream } = o;
    let l = '', z = `M0,0 H380 V${h - 20}`;
    for (let x = 380; x > 0; x -= 38) z += ` l-19,20 l-19,-20`;
    for (let y = 70; y < h - 80; y += 62) l += `<path d="M40,${y} H${(y / 62) % 3 < 1 ? 250 : 340}" />`;
    return `<svg width="${w}" height="${h * w / 380}" viewBox="0 0 380 ${h}" style="overflow:visible"><path d="${z} Z" fill="${fill}"/><g stroke="${P.navy}" stroke-width="12" stroke-linecap="round" opacity=".5">${l}</g></svg>`;
  };
  O.warn = (o = {}) => {
    const { w = 340 } = o;
    return svg(w, 340, 300, `<path d="M170,0 L340,300 H0 Z" fill="${P.yellow}" stroke="${P.navy}" stroke-width="22" stroke-linejoin="round"/><rect x="152" y="96" width="36" height="110" rx="14" fill="${P.navy}"/><circle cx="170" cy="250" r="22" fill="${P.navy}"/>`);
  };

  /* ----- aides ----- */
  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f) => { const bg = CYCLE[k++ % 5]; shot({ w, bg, scene, html: f(bg) }); };
  const light = bg => bg === 'yellow' || bg === 'cream';
  const cart = (bg, o = {}) => O.cart(light(bg) ? { fill: P.navy, ink: P.coral, ...o } : { fill: P.cream, ink: P.yellow, ...o });
  const obj = bg => (light(bg) ? P.navy : P.cream);
  // position dans le panier d'un chariot centré en (cx, cy), de largeur w : fx de 170 à 480, article de hauteur h
  const inCart = (cx, cy, w, fx, h) => [cx + (fx - 300) * w / 600, cy + 70 * w / 600 - h / 2 - 6];
  const under = (y, col, an) => E(540, y, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col, sw: 28, draw: an }), { a: 'none', cut: false });

  V.keywords = [4, 10, 16, 20, 24, 30, 35, 50, 63, 77, 79, 91, 97, 101, 108, 112, 116, 127, 136, 141, 147, 149, 153, 158, 167, 173, 177, 183, 195, 198, 204, 213, 221];

  /* ===== SCÈNE 1 — HOOK ===== */
  S(0, 1, bg => [
    E(540, 660, cart(bg, { w: 620 }), { a: 'left', dist: 1300, dur: .55, sfx: 'whoosh', m: [{ d: .55, r: -4, dur: .12 }, { d: .7, r: 0, dur: .2 }] }),
    E(540, 1160, Tx('UN CHARIOT', 180, 'var(--a1)'), { a: 'up', w: 2 }),
  ]);
  S(3, 1, bg => [
    E(540, 640, cart(bg, { w: 420 }), { a: 'none', m: [{ d: .04, s: 1.75, dur: .3, sfx: 'rise' }] }),
    E(540, 1190, Tx('+ GRAND', 250), { a: 'stamp', d: .2, sfx: 'stamp' }),
  ]);
  S(5, 1, bg => [
    E(240, 720, O.person({ w: 260, fill: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(540, 680, O.person({ w: 300, fill: P.navy }), { a: 'pop', d: .12 }),
    E(840, 720, O.person({ w: 260, fill: P.cream }), { a: 'pop', d: .24 }),
    E(540, 1150, Tx('DES CLIENTS', 170, 'var(--a1)'), { a: 'up', w: 7 }),
  ]);
  S(8, 1, bg => [
    E(540, 520, Tx('ILS ACHÈTENT', 160), { a: 'down' }),
    E(540, 900, Tx('PLUS', 460, 'var(--a1)'), { a: 'stamp', w: 10, sfx: 'stamp', loop: 'pulse', amp: .03, per: .6 }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(11, 2, bg => [
    E(540, 640, O.store({ w: 700, fill: P.navy, ink: P.yellow }), { a: 'pop', sfx: 'pop' }),
    E(540, 1150, Tx('MÊME MAGASIN', 150, 'var(--a1)'), { a: 'up', w: 12 }),
  ]);
  S(13, 2, bg => [
    E(540, 440, O.tag('2,50 €', { w: 560 }), { a: 'left', sfx: 'pop' }),
    E(540, 690, Tx('=', 220, 'var(--a1)'), { a: 'pop', d: .15 }),
    E(540, 940, O.tag('2,50 €', { w: 560 }), { a: 'right', d: .08 }),
    E(540, 1210, Tx('MÊMES PRIX', 150, 'var(--a1)'), { a: 'up', w: 14 }),
  ]);
  S(15, 2, bg => [
    E(540, 600, Tx('MÊMES', 280), { a: 'pop', sfx: 'pop' }),
    E(540, 910, Tx('ENVIES', 320, 'var(--a1)'), { a: 'stamp', w: 16, sfx: 'stamp' }),
  ]);
  S(17, 2, bg => [
    E(540, 560, Tx('LE PLUS', 250), { a: 'down', w: 18 }),
    E(540, 860, Tx('ÉTRANGE', 280, 'var(--a1)'), { a: 'stamp', w: 20, sfx: 'stamp', loop: 'swing', amp: 2.5, per: .5 }),
  ]);
  S(21, 2, bg => [
    E(540, 660, O.plate({ w: 700 }), { a: 'spin', w: 23, sfx: 'swish' }),
    E(540, 1170, Tx('TON ASSIETTE', 155, 'var(--a1)'), { a: 'up', w: 24 }),
  ]);
  S(25, 2, bg => [
    E(260, 640, O.plate({ w: 400, fill: P.navy, rim: T.navy2 }), { a: 'left' }),
    E(820, 650, cart(bg, { w: 400 }), { a: 'right' }),
    E(540, 640, Tx('=', 240, 'var(--a1)'), { a: 'pop', w: 27, sfx: 'pop' }),
    E(540, 1130, Tx('LE MÊME COUP', 160, 'var(--a1)'), { a: 'stamp', w: 29, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — L'ENTRÉE ===== */
  S(31, 3, bg => [
    E(540, 600, Tx('SUIS-MOI', 250), { a: 'stamp', sfx: 'stamp' }),
    E(540, 960, O.arrow({ w: 520 }), { a: 'left', d: .15, sfx: 'whoosh', loop: 'float', amp: 10, per: .6 }),
  ]);
  S(32, 3, bg => [
    E(540, 300, Tx('3 COURSES', 200), { a: 'stamp', w: 35, sfx: 'stamp' }),
    E(560, 740, O.store({ w: 600, fill: P.navy, ink: P.cream }), { a: 'pop' }),
    E(170, 1090, O.person({ w: 210, fill: P.coral }), { a: 'left', m: [{ w: 33, dx: 330, dur: .7, e: 'inOut' }] }),
  ]);
  S(37, 3, bg => [
    E(540, 640, O.bread({ w: 640 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1130, Tx('PAIN', 280, 'var(--a1)'), { a: 'stamp', w: 38 }),
  ]);
  S(39, 3, bg => [
    E(540, 600, O.milk({ w: 330 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1160, Tx('LAIT', 280, 'var(--a1)'), { a: 'stamp', w: 40 }),
  ]);
  S(41, 3, bg => [
    E(540, 600, O.pasta({ w: 400 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1160, Tx('PÂTES', 280, 'var(--a1)'), { a: 'stamp', w: 42 }),
  ]);
  S(43, 3, bg => [
    E(540, 600, O.store({ w: 620 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1140, Tx("À L'ENTRÉE", 200, 'var(--a1)'), { a: 'stamp', w: 44, sfx: 'stamp' }),
  ]);
  S(45, 3, bg => [
    E(420, 640, cart(bg, { w: 460 }), { a: 'none' }),
    E(500, 640, cart(bg, { w: 460 }), { a: 'none' }),
    E(580, 640, cart(bg, { w: 460 }), { a: 'none', m: [{ w: 46, dx: 190, dur: .3, sfx: 'click' }, { w: 47, dx: 230, r: -5, dur: .2 }, { w: 47, d: .22, dx: 230, r: 0, dur: .2 }] }),
    E(540, 1170, Tx('UN CHARIOT', 180), { a: 'up', w: 48 }),
  ]);
  S(49, 3, bg => [
    E(540, 600, cart(bg, { w: 800 }), { a: 'pop', sfx: 'thud', dur: .4 }),
    E(540, 1150, Tx('GRAND', 280, 'var(--a1)'), { a: 'stamp', w: 50, sfx: 'stamp' }),
  ]);
  S(51, 3, bg => [
    E(540, 820, O.person({ w: 420, fill: P.cream }), { a: 'up' }),
    E(540, 340, Tx('?', 360, 'var(--a1)'), { a: 'pop', w: 54, rot: 8, sfx: 'pop', loop: 'swing', amp: 6, per: .8 }),
    E(540, 1210, Tx('PAS ENCORE…', 150), { a: 'up', w: 55 }),
  ]);
  S(57, 3, bg => [
    E(540, 360, Tx("C'EST LÀ", 260, 'var(--a1)'), { a: 'stamp', w: 59, sfx: 'stamp' }),
    E(540, 620, O.arrow({ w: 220, fill: P.coral }), { a: 'down', w: 59, d: .12, rot: 90, loop: 'float', amp: 14, per: .6 }),
    E(540, 930, cart(bg, { w: 440 }), { a: 'pop' }),
    E(540, 1250, Tx('TOUT SE JOUE', 140), { a: 'up', w: 61, dist: 220 }),
  ]);

  /* ===== SCÈNE 4 — LE CHARIOT VIDE ===== */
  S(64, 4, bg => {
    const [cx, cy, w] = [540, 660, 860];
    const it = (fx, h, html, an) => { const [x, y] = inCart(cx, cy, w, fx, h); return E(x, y, html, an); };
    return [
      E(cx, cy, cart(bg, { w }), { a: 'pop' }),
      it(240, 130, O.bread({ w: 200 }), { a: 'drop', w: 65, dur: .5, sfx: 'thud' }),
      it(340, 186, O.milk({ w: 110, fill: P.navy, ink: P.yellow }), { a: 'drop', w: 67, dur: .5, sfx: 'thud' }),
      it(430, 190, O.pasta({ w: 140 }), { a: 'drop', w: 68, dur: .5, sfx: 'thud' }),
      E(540, 1200, Tx('AU FOND', 260, 'var(--a1)'), { a: 'stamp', w: 69, d: .1, sfx: 'stamp' }),
    ];
  });
  S(71, 4, bg => {
    const [cx, cy, w] = [540, 680, 720];
    const it = (fx, h, html) => { const [x, y] = inCart(cx, cy, w, fx, h); return E(x, y, html, { a: 'none' }); };
    return [
      E(cx, cy, cart(bg, { w }), { a: 'none' }),
      it(230, 100, O.bread({ w: 150 })), it(310, 135, O.milk({ w: 80 })), it(380, 136, O.pasta({ w: 100 })),
      E(540, 270, Tx('TON CHARIOT', 140), { a: 'down', w: 73 }),
      E(540, 1170, Tx('VIDE', 300, 'var(--a1)'), { a: 'stamp', w: 77, sfx: 'stamp' }),
    ];
  });
  S(78, 4, bg => [
    E(540, 440, cart(bg, { w: 420 }), { a: 'pop', m: [{ w: 79, r: -14, dy: 20, dur: .4, e: 'outBounce', sfx: 'fall' }] }),
    E(540, 820, Tx('PRESQUE', 210), { a: 'down' }),
    E(540, 1110, Tx('TRISTE', 330, 'var(--a1)'), { a: 'stamp', w: 79, sfx: 'stamp' }),
  ]);
  S(80, 4, bg => [
    E(540, 620, O.disc({ w: 680, fill: P.navy }), { a: 'pop' }),
    E(540, 600, O.bulb({ w: 380, ink: P.cream }), { a: 'pop', d: .06, sfx: 'pop', loop: 'pulse', amp: .04, per: .7 }),
    E(540, 1170, Tx('UNE EXPLICATION', 130, 'var(--a1)'), { a: 'up', w: 81 }),
  ]);
  S(83, 4, bg => [
    E(250, 560, O.bread({ w: 300 }), { a: 'pop', sfx: 'pop' }),
    E(540, 540, O.milk({ w: 150, fill: P.navy, ink: P.yellow }), { a: 'pop', d: .1 }),
    E(810, 540, O.pasta({ w: 200 }), { a: 'pop', d: .2 }),
    E(540, 550, O.cross({ w: 520, draw: { w: 86, sfx: 'buzz' } }), { a: 'none', w: 86 }),
    E(540, 960, Tx('TU NE COMPTES PAS', 120), { a: 'up', w: 85 }),
    E(540, 1170, Tx('CE QUE TU AS PRIS', 120, 'var(--a1)'), { a: 'up', w: 89 }),
  ]);
  S(92, 4, bg => [
    E(540, 330, O.eye({ w: 320 }), { a: 'pop', w: 93, sfx: 'pop' }),
    E(540, 820, cart(bg, { w: 780 }), { a: 'pop' }),
    E(570, 800, O.rect(330, 190, P.coral, 22), { a: 'pop', w: 95, loop: 'pulse', amp: .06, per: .6, sfx: 'pop' }),
    E(570, 800, Tx('LIBRE', 110, P.cream), { a: 'pop', w: 95, d: .08, cut: false }),
    E(540, 1270, Tx('LA PLACE QUI RESTE', 100), { a: 'up', w: 96, dist: 200 }),
  ]);

  /* ===== SCÈNE 5 — LES RAYONS, LA CAISSE ===== */
  S(98, 5, bg => [
    E(540, 640, O.shelf({ w: 760 }), { a: 'right', dist: 1100, sfx: 'whoosh' }),
    E(540, 1210, Tx('RAYON SUIVANT', 150, 'var(--a1)'), { a: 'up', w: 99 }),
  ]);
  S(100, 5, bg => [
    E(540, 720, O.burst({ w: 1050, n: 14, col: P.cream }), { a: 'pop', w: 101, loop: 'spin', per: 6, cut: false }),
    E(540, 720, O.tag('PROMO', { w: 820, fill: P.yellow }), { a: 'drop', sfx: 'thud', rot: -5 }),
  ]);
  S(102, 5, bg => [
    E(540, 660, cart(bg, { w: 780 }), { a: 'pop' }),
    E(570, 640, O.rect(330, 190, P.coral, 22), { a: 'pop', d: .15, loop: 'pulse', amp: .06, per: .5 }),
    E(540, 1180, Tx('IL Y A DE LA PLACE', 105, 'var(--a1)'), { a: 'stamp', w: 104, sfx: 'stamp' }),
  ]);
  S(108, 5, bg => [
    E(540, 400, Tx('HOP', 360, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 960, cart(bg, { w: 620 }), { a: 'none', m: [{ d: .37, dy: 14, dur: .08 }, { d: .45, dy: 0, dur: .15 }] }),
    E(180, 420, O.pack({ w: 190, fill: P.yellow, band: P.coral }), { a: 'none', m: [{ d: .05, dx: 330, dy: 510, r: 30, dur: .32, e: 'inOut', sfx: 'thud', so: .3 }] }),
  ]);
  S(109, 5, bg => [
    E(540, 640, O.shelf({ w: 760, fill: P.yellow, ink: P.navy }), { a: 'left', dist: 1100, sfx: 'whoosh' }),
    E(540, 1210, Tx('ENCORE UN RAYON', 130), { a: 'up', w: 110 }),
  ]);
  S(112, 5, bg => [
    E(540, 400, Tx('HOP', 360, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 960, cart(bg, { w: 620 }), { a: 'none', m: [{ d: .37, dy: 14, dur: .08 }, { d: .45, dy: 0, dur: .15 }] }),
    E(470, 930, O.pack({ w: 150, fill: P.yellow, band: P.coral }), { a: 'none' }), E(610, 925, O.milk({ w: 100 }), { a: 'none' }),
    E(900, 420, O.pack({ w: 190, fill: P.coral, band: P.cream }), { a: 'none', m: [{ d: .05, dx: -200, dy: 500, r: -30, dur: .32, e: 'inOut', sfx: 'thud', so: .3 }] }),
  ]);
  S(113, 5, bg => [
    E(540, 600, O.register({ w: 660, fill: P.yellow }), { a: 'pop', sfx: 'pop' }),
    E(540, 900, O.rect(960, 70, P.navy, 14), { a: 'none' }),
    E(540, 1150, Tx('LA CAISSE', 230, 'var(--a1)'), { a: 'stamp', w: 116, sfx: 'kaching' }),
  ]);
  S(117, 5, bg => [
    E(540, 380, Tx('3 COURSES', 220), { a: 'pop' }),
    E(540, 380, O.line('M20,20 H880', { w: 900, vw: 900, vh: 40, col: P.coral, sw: 34, draw: { w: 120, dur: .3, sfx: 'swish' } }), { a: 'none', cut: false }),
    ...Array.from({ length: 12 }, (_, i) => E(150 + (i * 271) % 800, 700 + (i * 173) % 480,
      i % 3 === 0 ? O.milk({ w: 110 }) : O.pack({ w: 150, fill: [P.coral, P.yellow, P.cream][i % 3], band: P.navy }),
      { a: 'drop', w: 120, d: .2 + i * .07, dur: .45, rot: (i * 47) % 40 - 20, sfx: i % 4 === 0 ? 'thud' : undefined })),
  ]);
  S(122, 5, bg => [
    E(540, 700, O.ticket({ w: 400, h: 860, fill: P.yellow }), { a: 'down', dist: 1300, dur: .8, sfx: 'print' }),
    E(540, 1250, Tx('LONG COMME LE BRAS', 100, 'var(--a1)'), { a: 'up', w: 124, dist: 200 }),
  ]);

  /* ===== SCÈNE 6 — L'ÉTUDE DE 2024 ===== */
  const cher = (bg, w = 340) => O.person({ w, fill: light(bg) ? P.navy : P.yellow, coat: true, ink: P.cream });
  S(128, 6, bg => [
    E(320, 720, cher(bg), { a: 'pop', sfx: 'pop' }),
    E(760, 720, cher(bg), { a: 'pop', w: 129, sfx: 'pop' }),
    E(540, 1130, O.clipboard({ w: 230 }), { a: 'up', w: 130 }),
  ]);
  S(131, 6, bg => [
    E(540, 620, O.store({ w: 640 }), { a: 'pop' }),
    E(330, 640, O.magnifier({ w: 380 }), { a: 'left', dist: 600, d: .1, sfx: 'whoosh', m: [{ w: 133, dx: 360, dur: .6, e: 'inOut' }] }),
    E(540, 1170, Tx('TESTÉ EN MAGASIN', 120, 'var(--a1)'), { a: 'up', w: 132 }),
  ]);
  S(135, 6, bg => [
    E(540, 720, Tx(cnt({ from: 2010, to: 2024, w: 136, dur: .5, sfx: 'tick' }), 440), { a: 'pop', m: [{ w: 136, d: .6, s: 1.08, dur: .2 }, { w: 136, d: .82, s: 1, dur: .2 }] }),
    under(990, P.yellow, { w: 136, d: .45, dur: .3 }),
  ]);
  S(137, 6, bg => [
    E(230, 760, cart(bg, { w: 300 }), { a: 'pop' }),
    E(700, 640, O.cart({ w: 420, fill: P.coral, ink: P.navy }), { a: 'pop', w: 139, sfx: 'pop', m: [{ w: 141, s: 1.4, dur: .35, sfx: 'rise' }] }),
    E(230, 1010, Tx('PETIT', 80, 'var(--ink)', { font: 'inter' }), { a: 'fade', cut: false }),
    E(700, 1130, Tx('+ GRAND', 170, 'var(--a1)'), { a: 'stamp', w: 141, d: .1 }),
  ]);
  S(142, 6, bg => {
    const [cx, cy, w] = [540, 780, 720];
    const it = (i, fx, lift) => { const [x, y] = inCart(cx, cy, w, fx, 180); return E(x, y - lift, O.pack({ w: 140, fill: [P.coral, P.yellow, T.green2, P.cream][i % 4], band: i % 4 === 1 ? P.coral : P.cream === [P.coral, P.yellow, T.green2, P.cream][i % 4] ? P.coral : P.cream }), { a: 'drop', w: 144, d: i * .14, dur: .45, sfx: 'thud' }); };
    return [
      E(cx, cy, cart(bg, { w }), { a: 'pop' }),
      it(0, 200, 0), it(1, 320, 0), it(2, 440, 0), it(3, 260, 150), it(4, 390, 150), it(5, 330, 300),
      E(540, 300, Tx('+ DE PRODUITS', 150, 'var(--a1)'), { a: 'stamp', w: 145, sfx: 'stamp' }),
    ];
  });
  S(148, 6, bg => [
    ...[0, 1, 2, 3].map(i => E(540 + (i % 2 ? 60 : -60), 900 - i * 150, O.bill({ w: 520 }), { a: 'drop', d: i * .12, dur: .45, rot: i % 2 ? 7 : -7, sfx: i % 2 ? undefined : 'swish' })),
    E(540, 1190, Tx('+ DÉPENSÉ', 220), { a: 'stamp', w: 149, sfx: 'stamp' }),
  ]);
  S(150, 6, bg => [
    E(540, 620, O.clock({ w: 680 }), { a: 'pop', sfx: 'pop' }),
    E(540, 620, O.hand({ w: 680, col: P.coral }), { a: 'none', loop: 'spin', per: 1.2, cut: false }),
    E(540, 620, O.hand({ w: 680, col: P.navy, len: .24, sw: 30 }), { a: 'none', loop: 'spin', per: 7, cut: false }),
    E(540, 1170, Tx('+ LONGTEMPS', 180, 'var(--a1)'), { a: 'stamp', w: 152, sfx: 'stamp' }),
  ]);
  S(154, 6, bg => [
    E(260, 800, O.person({ w: 300, fill: P.cream }), { a: 'left' }),
    E(700, 520, O.bubble({ w: 560 }), { a: 'pop', d: .1, sfx: 'pop' }),
    E(700, 470, O.line('M20,180 L140,110 L260,140 L440,20', { w: 380, vw: 460, vh: 200, col: P.coral, sw: 24, draw: { w: 156, dur: .5 } }), { a: 'none', cut: false }),
    E(540, 1200, Tx('CONGRÈS', 220, 'var(--a1)'), { a: 'stamp', w: 158, sfx: 'stamp' }),
  ]);
  S(159, 6, bg => [
    E(540, 560, O.book('REVUE', { w: 460, fs: 110 }), { a: 'pop', sfx: 'pop', m: [{ w: 164, r: -4, dur: .25 }, { w: 165, r: 0, dur: .25 }] }),
    E(540, 600, O.stamp('PAS ENCORE CONFIRMÉ', { w: 940, fs: 74, h: 200 }), { a: 'stamp', w: 161, rot: -8, sfx: 'stamp' }),
    E(540, 1150, Tx('GRANDE REVUE', 150), { a: 'up', w: 164 }),
  ]);
  S(166, 6, bg => [
    E(540, 420, O.warn({ w: 380 }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .05, per: .6 }),
    E(540, 800, Tx('DONC', 240), { a: 'down' }),
    E(540, 1080, Tx('PRUDENCE', 250, 'var(--a1)'), { a: 'stamp', w: 167, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 7 — LA SYNTHÈSE DE 72 ÉTUDES ===== */
  S(168, 7, bg => [
    E(540, 560, O.disc({ w: 620, fill: P.cream }), { a: 'pop' }),
    E(540, 540, O.bulb({ w: 340, ink: P.navy }), { a: 'pop', d: .06, sfx: 'pop' }),
    E(540, 1110, Tx("L'IDÉE", 320), { a: 'stamp', w: 169, sfx: 'stamp' }),
  ]);
  S(171, 7, bg => [
    E(540, 560, Tx('ELLE…', 240), { a: 'pop', hw: 173 }),
    E(540, 600, Tx('SOLIDE', 360, 'var(--a1)'), { a: 'stamp', w: 173, sfx: 'stamp' }),
    E(540, 900, O.rect(820, 90, P.navy, 16), { a: 'pop', w: 173, d: .12 }),
  ]);
  S(174, 7, bg => [
    E(300, 660, O.clipboard({ w: 300 }), { a: 'pop', rot: -10, sfx: 'pop' }),
    E(540, 620, O.clipboard({ w: 300 }), { a: 'pop', d: .12 }),
    E(780, 660, O.clipboard({ w: 300 }), { a: 'pop', d: .24, rot: 10 }),
    E(540, 1150, Tx('UNE SYNTHÈSE', 155, 'var(--a1)'), { a: 'up', w: 175 }),
  ]);
  S(177, 7, bg => [
    E(540, 600, Tx(cnt({ from: 0, to: 72, dur: .45, sfx: 'tick' }), 680, 'var(--a1)'), { a: 'pop' }),
    E(540, 1130, Tx('ÉTUDES', 270), { a: 'stamp', w: 178, sfx: 'stamp' }),
  ]);
  S(179, 7, bg => [
    E(200, 640, O.arrow({ w: 260, fill: P.navy }), { a: 'left', sfx: 'whoosh' }),
    E(880, 640, O.arrow({ w: 260, fill: P.navy }), { a: 'right', rot: 180 }),
    E(540, 330, O.arrow({ w: 220, fill: P.navy }), { a: 'down', rot: 90, d: .1 }),
    E(540, 640, O.disc({ w: 230, fill: P.coral }), { a: 'pop', w: 182, sfx: 'pop', loop: 'pulse', amp: .08, per: .5 }),
    E(540, 1130, Tx('MÊME CONCLUSION', 125, 'var(--a1)'), { a: 'stamp', w: 183, sfx: 'stamp' }),
  ]);
  S(184, 7, bg => [
    E(540, 780, O.plate({ w: 400 }), { a: 'pop', sfx: 'pop', m: [{ w: 185, s: 1.6, dur: .4, sfx: 'rise' }] }),
    E(540, 290, Tx('ASSIETTE', 180), { a: 'down' }),
  ]);
  S(187, 7, bg => [
    E(540, 780, O.pack({ w: 260, fill: P.cream, band: P.navy }), { a: 'pop', sfx: 'pop', m: [{ w: 188, s: 1.9, dur: .4, sfx: 'rise' }] }),
    E(540, 290, Tx('PAQUET', 200, 'var(--a1)'), { a: 'down' }),
  ]);
  S(190, 7, bg => [
    E(540, 760, O.bread({ w: 320 }), { a: 'pop', sfx: 'pop', m: [{ w: 191, s: 2.5, dur: .4, sfx: 'rise' }] }),
    E(540, 290, Tx('PORTION', 200, 'var(--a1)'), { a: 'down' }),
  ]);
  S(193, 7, bg => [
    E(540, 500, Tx('ON CONSOMME', 170), { a: 'down' }),
    E(540, 880, Tx('PLUS', 480, 'var(--a1)'), { a: 'stamp', w: 195, sfx: 'stamp', loop: 'pulse', amp: .03, per: .6 }),
  ]);
  S(196, 7, bg => [
    E(540, 540, Tx('À CHAQUE', 250), { a: 'pop', sfx: 'pop' }),
    E(540, 900, Tx('FOIS', 420, 'var(--a1)'), { a: 'stamp', w: 198, sfx: 'stamp' }),
  ]);
  S(199, 7, bg => [
    E(540, 700, cart(bg, { w: 760 }), { a: 'left', dist: 1300, dur: .5, sfx: 'whoosh', m: [{ d: .5, r: -4, dur: .12 }, { d: .64, r: 0, dur: .2 }] }),
  ]);
  S(201, 7, bg => [
    E(380, 990, O.disc({ w: 130, fill: P.navy }), { a: 'pop', w: 205, sfx: 'pop' }),
    E(700, 990, O.disc({ w: 130, fill: P.navy }), { a: 'pop', w: 205, d: .1 }),
    E(540, 620, O.plate({ w: 520 }), { a: 'pop', sfx: 'pop', m: [{ w: 204, s: 1.35, dur: .35, sfx: 'rise' }] }),
    E(540, 1230, Tx('SUR ROULETTES', 150, 'var(--a1)'), { a: 'up', w: 206, dist: 220 }),
  ]);

  /* ===== SCÈNE 8 — BOUCLE ===== */
  S(207, 8, bg => [
    E(540, 300, O.eye({ w: 300 }), { a: 'pop', w: 211, sfx: 'pop' }),
    E(540, 720, cart(bg, { w: 660 }), { a: 'pop' }),
    E(540, 1030, O.line('M20,40 H780 M20,10 V70 M780,10 V70', { w: 700, vw: 800, vh: 80, col: P.navy, sw: 22, draw: { w: 213, dur: .4, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(540, 1210, Tx('REGARDE SA TAILLE', 110, 'var(--a1)'), { a: 'stamp', w: 213, sfx: 'stamp' }),
  ]);
  S(214, 8, bg => [
    E(540, 600, O.store({ w: 660, fill: P.navy, ink: P.yellow }), { a: 'pop', sfx: 'pop' }),
    E(540, 1140, Tx("AVANT D'ENTRER", 140, 'var(--a1)'), { a: 'up', w: 215 }),
  ]);
  S(216, 8, bg => [
    E(540, 560, Tx('TU CONNAIS', 200), { a: 'down' }),
    E(540, 860, Tx('LA RÈGLE…', 220, 'var(--a1)'), { a: 'stamp', w: 220, sfx: 'stamp', loop: 'pulse', amp: .04, per: .6 }),
  ]);
})();
