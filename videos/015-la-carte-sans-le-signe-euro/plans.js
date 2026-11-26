/* Vidéo 015 — « La carte sans le signe € » (v5 : nouvelle charte, voix du 26/11/2026)
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;

  /* ----- objets propres à cette vidéo ----- */
  // une ligne de carte : libellé à gauche, prix écrit comme on veut à droite
  O.ligne = (p, o = {}) => {
    const { w = 860, fill = P.cream, ink = P.navy, label = 'PLAT DU JOUR', fs = 150, px = 816 } = o;
    return svg(w, 860, 300,
      `<rect width="860" height="300" rx="28" fill="${fill}"/>
       <text x="44" y="92" font-size="58" fill="${ink}" opacity=".7">${label}</text>
       <g fill="${ink}" opacity=".3">${Array.from({ length: 14 }, (_, i) => `<circle cx="${60 + i * 26}" cy="210" r="6"/>`).join('')}</g>
       <text x="${px}" y="${190 + fs * .36}" text-anchor="end" font-size="${fs}" fill="${ink}">${p}</text>`);
  };
  // LA carte du restaurant (objet vedette) : trois lignes, des nombres seuls, le plat du jour à « 20 ».
  // part: 'carte' = la carte ; 'euro' = seulement le signe € à sa place, pour le faire tomber à part.
  O.menu = (o = {}) => {
    const { w = 640, fill = P.cream, ink = P.navy, hl = T.cream2, prix = P.coral, part = 'carte' } = o;
    if (part === 'euro') return svg(w, 620, 800, `<text x="512" y="545" font-size="150" fill="${prix}">€</text>`);
    const rows = [['ENTRÉE', '9'], ['PLAT DU JOUR', '20'], ['DESSERT', '7']];
    const body = rows.map(([l, p], i) => {
      const y = 200 + i * 190, big = i === 1;
      return `<text x="50" y="${y + 72}" font-size="46" fill="${ink}" opacity=".75">${l}</text>
        <g fill="${ink}" opacity=".3">${Array.from({ length: 9 }, (_, j) => `<circle cx="${62 + j * 28}" cy="${y + 132}" r="6"/>`).join('')}</g>
        <text x="500" y="${y + 155}" text-anchor="end" font-size="${big ? 170 : 120}" fill="${big ? prix : ink}"${big ? '' : ' opacity=".6"'}>${p}</text>`;
    }).join('');
    return svg(w, 620, 800,
      `<rect width="620" height="800" rx="30" fill="${fill}"/>
       <rect x="30" y="30" width="560" height="130" rx="18" fill="${ink}"/>
       <text x="310" y="130" text-anchor="middle" font-size="100" fill="${fill}">LA CARTE</text>
       <rect x="20" y="394" width="580" height="182" rx="20" fill="${hl}"/>${body}`);
  };
  // assiette et couverts (aliments : rose vif et violet, jamais citron)
  O.assiette = (o = {}) => {
    const { w = 560, fill = P.cream, ink = P.navy, food = P.coral, food2 = T.navy2, ring = T.cream2 } = o;
    return svg(w, 620, 420,
      `<rect x="20" y="60" width="22" height="300" rx="11" fill="${ink}"/><rect x="0" y="60" width="62" height="110" rx="20" fill="${ink}"/>
       <rect x="578" y="60" width="22" height="300" rx="11" fill="${ink}"/><path d="M578,60 q40,10 40,150 h-40 Z" fill="${ink}"/>
       <circle cx="310" cy="210" r="200" fill="${fill}"/><circle cx="310" cy="210" r="140" fill="none" stroke="${ring}" stroke-width="10"/>
       <circle cx="280" cy="200" r="70" fill="${food}"/><circle cx="360" cy="240" r="46" fill="${food2}"/>`);
  };
  // restaurant générique
  O.resto = (o = {}) => {
    const { w = 620, wall = P.cream, aw = P.coral, aw2 = null, ink = P.navy } = o;
    let st = '';
    for (let i = 0; i < 6; i++) st += `<path d="M${20 + i * 100},130 h100 v90 a50,50 0 0 1 -100,0 Z" fill="${i % 2 ? (aw2 || wall) : aw}"/>`;
    return svg(w, 640, 560,
      `<rect x="40" y="130" width="560" height="430" fill="${wall}"/>
       <rect x="180" y="20" width="280" height="90" rx="14" fill="${ink}"/><text x="320" y="84" text-anchor="middle" font-size="56" fill="${wall}">RESTAURANT</text>
       ${st}<rect x="20" y="118" width="600" height="24" rx="8" fill="${ink}"/>
       <rect x="90" y="320" width="200" height="150" rx="10" fill="${ink}"/><rect x="380" y="300" width="150" height="260" rx="10" fill="${ink}"/>
       <circle cx="500" cy="436" r="10" fill="${aw}"/>`);
  };
  // toque du restaurateur
  O.toque = (o = {}) => {
    const { w = 230, fill = P.cream, edge = P.navy } = o;
    return svg(w, 230, 190,
      `<g fill="${fill}" stroke="${edge}" stroke-width="10" stroke-linejoin="round"><circle cx="62" cy="72" r="54"/><circle cx="168" cy="72" r="54"/><circle cx="115" cy="58" r="58"/>
       <rect x="38" y="96" width="154" height="86" rx="10"/></g><rect x="43" y="80" width="144" height="40" fill="${fill}"/>`);
  };
  // jeton rond portant un signe ou un nombre
  O.jeton = (txt, o = {}) => {
    const { w = 300, fill = P.cream, ink = P.navy, fs = 190 } = o;
    return svg(w, 300, 300, `<circle cx="150" cy="150" r="150" fill="${fill}"/><text x="150" y="${150 + fs * .36}" text-anchor="middle" font-size="${fs}" fill="${ink}">${txt}</text>`);
  };
  // billet (couleurs au choix, pour ne jamais se fondre dans le fond)
  O.billet = (o = {}) => {
    const { w = 420, fill = P.cream, ink = P.navy } = o;
    return svg(w, 420, 220,
      `<rect width="420" height="220" rx="20" fill="${fill}"/>
       <rect x="18" y="18" width="384" height="184" rx="10" fill="none" stroke="${ink}" stroke-width="6" opacity=".45"/>
       <circle cx="210" cy="110" r="62" fill="${ink}"/><text x="210" y="148" text-anchor="middle" font-size="100" fill="${fill}">€</text>`);
  };
  // part de dessert sur son assiette
  O.dessert = (o = {}) => {
    const { w = 520, plate = P.cream, cake = P.cream, cream = P.coral, ink = P.navy } = o;
    return svg(w, 520, 400,
      `<ellipse cx="260" cy="340" rx="260" ry="60" fill="${plate}"/><ellipse cx="260" cy="332" rx="190" ry="38" fill="${T.cream2}"/>
       <path d="M110,330 V170 L410,120 V330 Z" fill="${cake}" stroke="${ink}" stroke-width="10" stroke-linejoin="round"/>
       <path d="M110,236 L410,196 V236 L110,276 Z" fill="${cream}"/>
       <path d="M110,170 L410,120 L330,84 L150,120 Z" fill="${cream}" stroke="${ink}" stroke-width="10" stroke-linejoin="round"/>
       <circle cx="262" cy="74" r="40" fill="${ink}"/><path d="M262,40 q20,-40 54,-40" fill="none" stroke="${ink}" stroke-width="9" stroke-linecap="round"/>`);
  };
  // panneau d'avertissement
  O.warn = (o = {}) => {
    const { w = 560, fill = P.coral, ink = P.cream } = o;
    return svg(w, 560, 500,
      `<path d="M280,30 L530,460 H30 Z" fill="${fill}" stroke="${fill}" stroke-width="56" stroke-linejoin="round"/>
       <rect x="252" y="150" width="56" height="190" rx="28" fill="${ink}"/><circle cx="280" cy="400" r="34" fill="${ink}"/>`);
  };

  V.style = 2;        // charte validée le 26/11/2026
  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f, d) => { const bg = CYCLE[k++ % 5]; shot({ w, d, bg, scene, html: f(bg) }); };
  const light = bg => bg === 'cream' || bg === 'yellow';
  const fg = bg => (light(bg) ? P.navy : P.cream);                           // objet contrasté
  const alt = bg => (bg === 'coral' ? P.navy : P.coral);                     // rose, sauf sur fond rose
  const inv = bg => (bg === 'cream' ? { fill: P.navy, ink: P.cream } : {});  // carton blanc, sauf sur fond blanc
  const lg = (bg, p, o = {}) => O.ligne(p, { ...inv(bg), ...o });
  const tg = (bg, txt, o = {}) => O.tag(txt, { ...inv(bg), ...o });
  const menu = (bg, o = {}) => O.menu(bg === 'cream' ? { fill: P.navy, ink: P.cream, hl: T.navy2, prix: P.yellow, ...o } : o);
  const assiette = (bg, o = {}) => O.assiette(bg === 'cream' ? { fill: P.navy, ring: T.navy2, ink: P.coral, food2: P.cream, ...o } : bg === 'navy' ? { ink: T.cream2, ...o } : o);
  const resto = (bg, o = {}) => O.resto(bg === 'cream' ? { wall: P.navy, ink: P.coral, aw2: P.cream, ...o } : bg === 'coral' ? { aw: P.navy, ...o } : bg === 'navy' ? { ink: P.green, ...o } : o);
  const pers = (bg, o = {}) => O.person({ fill: fg(bg), ...o });
  const toque = (bg, o = {}) => O.toque(light(bg) ? { fill: P.coral, edge: P.navy, ...o } : { edge: bg === 'navy' ? T.navy2 : P.navy, ...o });
  const cher = (bg, o = {}) => O.person(light(bg) ? { fill: P.navy, coat: true, ink: P.coral, ...o } : { fill: P.yellow, coat: true, ink: P.cream, ...o });
  const bulle = (bg, o = {}) => O.bubble({ fill: bg === 'cream' ? P.navy : P.cream, ...o });
  const bink = bg => (bg === 'cream' ? P.cream : P.navy);                    // encre dans la bulle
  // la carte de l'accroche, reprise telle quelle dans la boucle
  const CX = 540, CY = 660, CW = 640;
  const laCarte = (bg, an = {}) => E(CX, CY, menu(bg, { w: CW }), { a: 'none', ...an });
  // le restaurateur : silhouette + toque
  const chef = (bg, x, y, w, an = {}, tq = {}) => [
    E(x, y, pers(bg, { w }), { a: 'none', ...an }),
    E(x, y - w * .815, toque(bg, { w: w * .6 }), { a: 'none', ...an, ...tq }),
  ];

  V.keywords = [2, 6, 10, 13, 19, 23, 28, 34, 38, 44, 51, 57, 61, 63, 66, 74, 78, 80, 82, 90, 91, 94, 100, 101, 106, 110, 112, 115, 121, 125, 128, 135, 142, 144, 147, 151, 158, 160, 163, 169, 173, 177, 187, 191, 197, 200, 203, 206, 210, 215, 218, 226, 231, 235, 237];

  /* ===== SCÈNE 1 — ACCROCHE : la carte est là dès la première image et ne bouge pas ===== */
  S(0, 1, bg => [
    laCarte(bg),
    E(540, 1210, Tx('TU DÉPENSES +', 150, 'var(--a1)'), { a: 'up', d: .1, sfx: 'pop' }),
  ]);
  // « sans le signe euro » : le signe apparaît à côté du 20, puis tombe
  S(4, 1, bg => [
    laCarte(bg),
    E(CX, CY, O.menu({ w: CW, part: 'euro' }), { a: 'pop', cut: false, sfx: 'pop', m: [{ w: 7, d: -.05, dy: 1500, r: 30, dur: .5, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1210, Tx('SANS LE SIGNE', 150, P.navy), { a: 'down', d: .1 }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(8, 2, bg => [
    E(540, 580, O.burst({ w: 760, n: 12, col: P.cream }), { a: 'pop', loop: 'spin', per: 7, cut: false }),
    E(540, 580, O.jeton('€', { w: 260, fill: P.navy, ink: P.cream, fs: 170 }), { a: 'spin', sfx: 'pop', m: [{ w: 12, dy: 1500, r: 40, dur: .5, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1130, Tx('TOUT PETIT', 200, 'var(--a1)'), { a: 'up', w: 9, d: -.05 }),
  ]);
  // « Mets-toi à la place du restaurateur. » : la même silhouette sur deux plans
  S(14, 2, bg => [
    ...chef(bg, 540, 720, 380, { a: 'up', sfx: 'pop' }, { a: 'drop', d: .3, dur: .4, sfx: 'thud' }),
    E(540, 1170, Tx('METS-TOI À SA PLACE', 105, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  S(19, 2, bg => [
    ...chef(bg, 540, 720, 380, {}, { m: [{ d: .1, dy: -40, dur: .16 }, { d: .28, dy: 0, dur: .2 }] }),
    E(540, 1170, Tx('LE RESTAURATEUR', 135, 'var(--a1)'), { a: 'stamp', d: .05, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — TROIS FAÇONS D'ÉCRIRE ===== */
  S(20, 3, bg => [
    E(540, 640, resto(bg, { w: 660 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1170, Tx('TON RESTAURANT', 140, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  S(24, 3, bg => [
    E(540, 930, lg(bg, '?', { w: 560 }), { a: 'down', dist: 360, w: 26, sfx: 'print' }),
    E(540, 560, O.press({ w: 680 }), { a: 'left', sfx: 'pop', loop: 'shake', amp: 5, lw: 26, ldur: .8 }),
    E(540, 1230, Tx('TA CARTE', 180, 'var(--a1)'), { a: 'up', w: 26, d: .15 }),
  ]);
  // « Ton plat du jour coûte 20 euros. » : l'assiette, puis son prix
  S(29, 3, bg => [
    E(540, 500, assiette(bg, { w: 560 }), { a: 'spin', sfx: 'swish' }),
    E(540, 850, Tx('PLAT DU JOUR', 140, 'var(--a1)'), { a: 'up', d: .1 }),
    E(540, 1150, tg(bg, '20 €', { w: 580 }), { a: 'drop', w: 33, d: -.1, dur: .4, sfx: 'thud' }),
  ]);
  S(36, 3, bg => [
    E(540, 330, lg(bg, '?', { w: 600 }), { a: 'left', sfx: 'pop' }),
    E(540, 570, lg(bg, '?', { w: 600 }), { a: 'right', d: .12 }),
    E(540, 810, lg(bg, '?', { w: 600 }), { a: 'left', d: .24, m: [{ w: 41, s: 1.06, dur: .18 }, { w: 41, d: .22, s: 1, dur: .2 }] }),
    E(540, 1150, Tx('3 FAÇONS', 230, 'var(--a1)'), { a: 'stamp', w: 38, d: -.05, sfx: 'stamp' }),
  ]);
  // un numéro, une ligne de carte : le même carton sur deux plans, seul le titre arrive
  const NY = 370, LY = 800, TY = 1170;
  const num = (n, an = {}) => E(230, NY, Tx(n, 440, 'var(--a1)'), { a: 'none', ...an });
  S(42, 3, bg => [
    num('1', { a: 'stamp', sfx: 'stamp' }),
    E(540, LY, lg(bg, '20,00 €'), { a: 'right', d: .3, sfx: 'pop' }),
  ]);
  S(45, 3, bg => [
    num('1'),
    E(540, LY, lg(bg, '20,00 €'), { a: 'none', m: [{ w: 47, s: 1.06, dur: .18 }, { w: 47, d: .22, s: 1, dur: .2 }] }),
    E(540, TY, Tx('AVEC LE SIGNE', 150, 'var(--ink)'), { a: 'up', d: .05 }),
  ]);
  S(49, 3, bg => [
    num('2', { a: 'down', sfx: 'stamp' }),
    E(540, LY, lg(bg, 'VINGT EUROS', { fs: 112 }), { a: 'left', d: .3, sfx: 'pop' }),
  ]);
  S(52, 3, bg => [
    num('2'),
    E(540, LY, lg(bg, 'VINGT EUROS', { fs: 112 }), { a: 'none', m: [{ w: 53, s: 1.06, dur: .18 }, { w: 53, d: .22, s: 1, dur: .2 }] }),
    E(540, TY, Tx('EN TOUTES LETTRES', 120, 'var(--ink)'), { a: 'down', d: .05 }),
  ]);
  S(55, 3, bg => [
    num('3', { a: 'pop', sfx: 'stamp' }),
    E(540, LY, lg(bg, '20'), { a: 'drop', d: .3, dur: .45, sfx: 'thud' }),
    E(540, TY, Tx('LE NOMBRE SEUL', 150, 'var(--ink)'), { a: 'up', w: 57 }),
  ]);
  // « Même plat. Même prix. »
  S(60, 3, bg => [
    E(290, 560, assiette(bg, { w: 440 }), { a: 'pop', sfx: 'pop' }),
    E(290, 880, Tx('MÊME PLAT', 105), { a: 'up', d: .1, dist: 200 }),
    E(790, 560, tg(bg, '20 €', { w: 440 }), { a: 'right', w: 62, sfx: 'pop' }),
    E(790, 880, Tx('MÊME PRIX', 105, 'var(--a1)'), { a: 'up', w: 62, d: .1, dist: 200 }),
  ]);
  S(64, 3, bg => [
    E(540, 330, lg(bg, '20,00 €', { w: 620 }), { a: 'left', sfx: 'swish' }),
    E(540, 570, lg(bg, 'VINGT EUROS', { w: 620, fs: 112 }), { a: 'right', d: .08 }),
    E(540, 810, lg(bg, '20', { w: 620 }), { a: 'left', d: .16 }),
    E(540, 1150, Tx('LAQUELLE ?', 200, 'var(--a1)'), { a: 'stamp', d: .2, sfx: 'stamp' }),
  ]);
  // phrases ajoutées : « Tu te dis que ça ne change rien. Les clients savent lire. »
  S(67, 3, bg => [
    ...chef(bg, 290, 800, 320, { a: 'left', sfx: 'pop' }),
    E(710, 480, bulle(bg, { w: 540 }), { a: 'pop', d: .15 }),
    E(710, 420, Tx('=', 280, bink(bg)), { a: 'pop', d: .3, cut: false }),
    E(540, 1210, Tx('ÇA NE CHANGE RIEN', 118, 'var(--a1)'), { a: 'up', d: .3 }),
  ]);
  S(75, 3, bg => [
    E(540, 310, O.eye({ w: 320 }), { a: 'down', sfx: 'pop' }),
    E(540, 740, menu(bg, { w: 340 }), { a: 'up', d: .08 }),
    E(540, 1200, Tx('ILS SAVENT LIRE', 135, 'var(--a1)'), { a: 'up', d: .2 }),
  ]);

  /* ===== SCÈNE 4 — L'ÉTUDE ===== */
  S(79, 4, bg => [
    E(540, 370, Tx(cnt({ from: 1995, to: 2009, d: .1, dur: .5, sfx: 'tick' }), 300), { a: 'pop' }),
    E(330, 800, cher(bg, { w: 290 }), { a: 'left', w: 81, sfx: 'pop' }),
    E(750, 800, cher(bg, { w: 290 }), { a: 'right', w: 81, d: .12 }),
    E(540, 860, O.clipboard({ w: 190 }), { a: 'pop', w: 81, d: .3 }),
    E(540, 1210, Tx('DES CHERCHEURS', 140, 'var(--a1)'), { a: 'up', w: 82, d: -.1 }),
  ]);
  S(87, 4, bg => [
    E(540, 620, resto(bg, { w: 640 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1150, Tx('UN VRAI RESTAURANT', 112, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  // « 201 clients, au déjeuner. » : le nombre et les clients restent, le titre change
  const clients = (bg, an = i => ({})) => [0, 1, 2, 3, 4].map(i => E(180 + i * 180, 860, pers(bg, { w: 160 }), { a: 'none', ...an(i) }));
  S(91, 4, bg => [
    E(540, 440, Tx(cnt({ from: 0, to: 201, dur: .6, sfx: 'tick' }), 420, 'var(--a1)'), { a: 'pop' }),
    ...clients(bg, i => ({ a: 'up', d: .2 + i * .07, dist: 260 })),
    E(540, 1190, Tx('CLIENTS', 200), { a: 'stamp', d: .5, sfx: 'stamp' }),
  ]);
  S(93, 4, bg => [
    E(540, 440, Tx('201', 420, 'var(--a1)'), { a: 'none' }),
    ...clients(bg, i => ({ m: [{ d: .1 + i * .08, dy: -36, dur: .14 }, { d: .26 + i * .08, dy: 0, dur: .18 }] })),
    E(540, 1190, Tx('AU DÉJEUNER', 180), { a: 'up', d: .05 }),
  ]);
  const give = (bg, x, d, p, fs) => E(540, 400, O.ligne(p, { w: 290, fs }), { a: 'pop', m: [{ w: 96, d, dx: x - 540, dy: 200, dur: .4, e: 'inOut', sfx: d ? undefined : 'swish' }] });
  S(95, 4, bg => [
    ...[200, 540, 880].map(x => E(x, 930, pers(bg, { w: 250 }), { a: 'none' })),
    give(bg, 200, 0, '20,00 €', 120), give(bg, 880, .2, '20', 150), give(bg, 540, .1, 'VINGT', 120),
    E(540, 1250, Tx('3 CARTES', 150, 'var(--a1)'), { a: 'up', w: 98, d: -.1, dist: 200 }),
  ]);

  /* ===== SCÈNE 5 — LE RÉSULTAT ===== */
  S(101, 5, bg => [
    E(540, 590, O.clipboard({ w: 400 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1150, Tx('RÉSULTAT', 230, 'var(--a1)'), { a: 'stamp', d: .1, sfx: 'stamp' }),
  ]);
  S(102, 5, bg => [
    E(540, 620, O.burst({ w: 1000, n: 14, col: alt(bg) }), { a: 'pop', d: .1, loop: 'spin', per: 7, cut: false }),
    E(540, 620, lg(bg, '20'), { a: 'pop', sfx: 'pop' }),
    E(540, 1200, Tx('LE NOMBRE SEUL', 150, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  const lab = (x, s) => E(x, 1130, Tx(s, 50, 'var(--ink)', { font: 'inter' }), { a: 'fade', cut: false });
  S(107, 5, bg => [
    E(220, 1070 - 200, O.bar(400, { w: 210, grow: { d: .05 } }), { a: 'none' }),
    E(540, 1070 - 200, O.bar(400, { w: 210, grow: { d: .17 } }), { a: 'none' }),
    E(860, 1070 - 320, O.bar(640, { w: 210, fill: P.yellow, grow: { w: 110, dur: .6, sfx: 'rise' } }), { a: 'none' }),
    lab(220, '20,00 €'), lab(540, 'VINGT EUROS'), lab(860, '20'),
    E(540, 1260, Tx('DÉPENSÉ', 130, 'var(--a1)'), { a: 'up', w: 109, d: -.1, dist: 200 }),
  ]);
  S(112, 5, bg => [
    E(540, 300, Tx('ENVIRON', 130), { a: 'down' }),
    E(540, 620, Tx('+8 %', 370, 'var(--a1)'), { a: 'stamp', d: .05, sfx: 'stamp' }),
    E(540, 1040, Tx('DE PLUS', 240), { a: 'up', d: .45 }),
    E(540, 1210, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.navy, sw: 28, draw: { d: .75, dur: .3, sfx: 'swish' } }), { a: 'none', cut: false }),
  ]);
  // phrases ajoutées : « Même cuisine. Mêmes plats. Seule l'écriture du prix avait changé. »
  S(116, 5, bg => [
    E(290, 600, resto(bg, { w: 440 }), { a: 'left', sfx: 'pop' }),
    E(290, 920, Tx('MÊME CUISINE', 86), { a: 'up', d: .1, dist: 200 }),
    E(790, 600, assiette(bg, { w: 440 }), { a: 'right', w: 118, sfx: 'pop' }),
    E(790, 920, Tx('MÊMES PLATS', 86, 'var(--a1)'), { a: 'up', w: 118, d: .1, dist: 200 }),
  ]);
  S(120, 5, bg => [
    E(540, 400, lg(bg, '20,00 €', { w: 680 }), { a: 'down', sfx: 'pop' }),
    E(540, 1190, Tx("SEULE L'ÉCRITURE", 125, 'var(--a1)'), { a: 'up', d: .1 }),
    E(540, 625, O.arrow({ w: 170, fill: P.navy }), { a: 'down', w: 123, d: -.1, rot: 90, dist: 160 }),
    E(540, 850, lg(bg, '20', { w: 680 }), { a: 'up', w: 123, d: -.05, sfx: 'swish' }),
  ]);

  /* ===== SCÈNE 6 — POURQUOI ===== */
  S(126, 6, bg => [
    E(300, 580, Tx('?', 560, 'var(--a1)'), { a: 'pop', sfx: 'pop', rot: -6, loop: 'swing', amp: 5, per: .9 }),
    E(770, 580, O.disc({ w: 470, fill: P.navy }), { a: 'pop', w: 127 }),
    E(770, 580, O.bulb({ w: 250, ink: P.cream }), { a: 'down', w: 127, d: .06, sfx: 'ding' }),
    E(540, 1130, Tx('UNE EXPLICATION', 130), { a: 'up', w: 128 }),
  ]);
  S(130, 6, bg => [
    E(540, 560, O.coin('€', { w: 520, small: '' }), { a: 'drop', sfx: 'thud', loop: 'pulse', amp: .05, per: .6, lw: 133 }),
    E(540, 1110, Tx('UN RAPPEL', 220, 'var(--a1)'), { a: 'stamp', w: 133, sfx: 'stamp' }),
  ]);
  // « Il te dit : ça, c'est de l'argent. » : la bulle reste, le billet arrive
  const parle = (bg, an = {}, an2 = {}) => [
    E(250, 900, pers(bg, { w: 320 }), { a: 'none', ...an }),
    E(670, 470, bulle(bg, { w: 600 }), { a: 'none', ...an2 }),
  ];
  S(136, 6, bg => [
    ...parle(bg, { a: 'left', sfx: 'pop' }, { a: 'pop', d: .1 }),
    E(670, 400, Tx('€', 300, alt(bg)), { a: 'pop', w: 137, d: .05, cut: false, sfx: 'pop' }),
  ]);
  S(140, 6, bg => [
    ...parle(bg),
    E(670, 400, Tx('€', 300, P.navy), { a: 'none', cut: false }),
    E(720, 900, O.billet({ w: 420 }), { a: 'right', d: .05, rot: -6, sfx: 'swish' }),
    E(540, 1240, Tx("C'EST DE L'ARGENT", 110, 'var(--a1)'), { a: 'up', d: .1, dist: 200 }),
  ]);
  S(143, 6, bg => [
    E(540, 560, O.billet({ w: 680 }), { a: 'drop', sfx: 'thud', m: [{ d: .55, s: 1.06, dur: .16 }, { d: .75, s: 1, dur: .2 }] }),
    E(540, 1080, Tx('TON ARGENT', 200, 'var(--a1)'), { a: 'stamp', d: .15, sfx: 'stamp' }),
  ]);
  // « Sans lui, 20 n'est plus qu'un nombre. » : la même ligne, le signe tombe
  S(145, 6, bg => [
    E(540, 600, lg(bg, '20', { w: 900, px: 690 }), { a: 'pop', sfx: 'pop' }),
    E(880, 647, Tx('€', 150, P.coral), { a: 'pop', d: .1, cut: false, m: [{ w: 146, d: .1, dy: 1500, r: 35, dur: .5, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1100, Tx('SANS LUI', 230, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(148, 6, bg => [
    E(540, 600, lg(bg, '20', { w: 900, px: 690 }), { a: 'none', m: [{ d: .05, s: 1.05, dur: .18 }, { d: .28, s: 1, dur: .2 }] }),
    E(540, 1100, Tx("QU'UN NOMBRE", 165, 'var(--a1)'), { a: 'stamp', w: 149, sfx: 'stamp' }),
  ]);
  // « Et un nombre, ça fait moins mal qu'une somme. » : le jeton reste, l'étiquette arrive
  S(152, 6, bg => [
    E(250, 560, O.jeton('20', { w: 360 }), { a: 'spin', sfx: 'pop' }),
    E(540, 1080, Tx('UN NOMBRE', 200, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(155, 6, bg => [
    E(250, 560, O.jeton('20', { w: 360 }), { a: 'none' }),
    E(815, 560, O.tag('20,00 €', { w: 400, fs: 120, fill: P.navy, ink: P.cream }), { a: 'right', d: .05, sfx: 'pop', m: [{ w: 159, s: 1.1, dur: .16 }, { w: 159, d: .22, s: 1, dur: .2 }] }),
    E(525, 560, Tx('<', 170, P.cream), { a: 'pop', d: .25, cut: false }),
    E(540, 1080, Tx('MOINS MAL', 210, 'var(--a1)'), { a: 'stamp', d: .15, sfx: 'stamp' }),
  ]);
  // phrase ajoutée : « Alors le dessert en plus passe plus facilement. »
  S(161, 6, bg => [
    E(480, 600, O.dessert({ w: 560 }), { a: 'drop', sfx: 'thud' }),
    E(860, 330, O.check({ w: 230, col: P.yellow, sw: 64, draw: { w: 165, dur: .3, sfx: 'ding' } }), { a: 'none', w: 165 }),
    E(540, 1130, Tx('LE DESSERT EN PLUS', 110, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);

  /* ===== SCÈNE 7 — LA LIMITE ===== */
  S(169, 7, bg => [
    E(540, 570, O.warn({ w: 540 }), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1110, Tx('ATTENTION', 220), { a: 'up', d: .15 }),
  ]);
  // « c'est un seul restaurant, et un seul service. » : le restaurant reste, l'horloge arrive
  S(170, 7, bg => [
    E(540, 660, resto(bg, { w: 620 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1170, Tx('1 SEUL RESTAURANT', 118, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(174, 7, bg => [
    E(540, 660, resto(bg, { w: 620 }), { a: 'none' }),
    E(880, 330, O.clock({ w: 250 }), { a: 'spin', d: .08, sfx: 'pop' }),
    E(880, 330, O.hand({ w: 250, col: P.coral, len: .34 }), { a: 'pop', d: .08, cut: false, m: [{ w: 176, r: 120, dur: .6, e: 'inOut', sfx: 'tick' }] }),
    E(540, 1170, Tx('1 SEUL SERVICE', 140, 'var(--a1)'), { a: 'down', d: .1 }),
  ]);
  S(178, 7, bg => [
    E(290, 820, cher(bg, { w: 310 }), { a: 'left', sfx: 'pop' }),
    E(700, 480, bulle(bg, { w: 520 }), { a: 'pop', d: .12 }),
    E(700, 400, Tx('…', 260, bink(bg)), { a: 'pop', d: .25, cut: false }),
    E(540, 1215, Tx('LES AUTEURS', 150, 'var(--a1)'), { a: 'up', d: .1, dist: 200 }),
  ]);
  S(182, 7, bg => [
    ...[200, 540, 880].map((x, i) => E(x, 600, resto(bg, { w: 290 }), { a: 'pop', d: i * .08, sfx: i ? undefined : 'pop' })),
    ...[200, 540, 880].map((x, i) => E(x, 330, Tx('?', 200, 'var(--a1)'), { a: 'pop', w: 184, d: i * .12, cut: false, sfx: i ? undefined : 'pop' })),
    E(540, 1050, Tx('PAS PARTOUT', 180), { a: 'stamp', w: 185, d: .1, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 8 — LA CHUTE ===== */
  // « Mais maintenant, tu sais pourquoi certaines cartes sont si légères. » : la carte reste et se soulève
  S(188, 8, bg => [
    E(540, 600, menu(bg, { w: 480 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1130, Tx('MAINTENANT TU SAIS', 110, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(193, 8, bg => [
    E(540, 600, menu(bg, { w: 480 }), { a: 'none', loop: 'float', amp: 22, per: 1.3, m: [{ w: 196, dy: -50, r: -4, dur: .5, e: 'inOut', sfx: 'rise' }] }),
    E(540, 1150, Tx('SI LÉGÈRES', 200, 'var(--a1)'), { a: 'up', w: 194 }),
  ]);
  // « Pas de signe. Pas de virgule. Pas de zéros. » : un seul prix, ses morceaux tombent un à un
  const morceau = (x, s, col, an = {}) => E(x, 480, Tx(s, 300, col), { a: 'pop', cut: false, ...an });
  const chute = (w, d = .2) => ({ m: [{ w, d, dy: 1500, r: 30, dur: .5, e: 'inOut', sfx: 'fall' }] });
  S(198, 8, bg => [
    morceau(262, '20', P.navy, { sfx: 'pop', m: [{ w: 204, d: .6, dx: 278, s: 1.25, dur: .4, e: 'inOut' }] }),
    morceau(436, ',', P.coral, chute(201)),
    morceau(604, '00', P.coral, chute(204)),
    morceau(872, '€', P.coral, chute(198, .3)),
    E(540, 880, Tx('PAS DE SIGNE', 100), { a: 'left', d: .1 }),
    E(540, 1030, Tx('PAS DE VIRGULE', 100), { a: 'right', w: 201, d: -.05 }),
    E(540, 1180, Tx('PAS DE ZÉROS', 100), { a: 'left', w: 204, d: -.15 }),
  ]);
  // « Juste un petit nombre, au bout de la ligne. » : la même ligne sur deux plans
  const bout = (bg, an = {}, dr = {}) => [
    E(300, 520, Tx('PLAT DU JOUR', 60, 'var(--ink)', { font: 'inter' }), { a: 'fade', cut: false }),
    E(420, 620, O.line('M20,20 H620', { w: 640, vw: 640, vh: 40, col: fg(bg), sw: 22, draw: { dur: .6, sfx: 'swish', ...dr } }), { a: 'none', cut: false }),
    E(900, 610, Tx('20', 230, 'var(--a1)'), { a: 'none', ...an }),
  ];
  S(207, 8, bg => [
    ...bout(bg, { a: 'pop', d: .5, sfx: 'pop' }),
    E(540, 1090, Tx('UN PETIT NOMBRE', 135, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(211, 8, bg => [
    ...bout(bg, { loop: 'pulse', amp: .07, per: .6 }, { dur: .45 }),
    E(540, 1090, Tx('AU BOUT DE LA LIGNE', 105), { a: 'down', d: .05 }),
  ]);
  // phrases ajoutées : « Rien de caché : juste une façon d'écrire qui pèse moins lourd. »
  S(216, 8, bg => [
    E(540, 300, O.eye({ w: 300 }), { a: 'pop', sfx: 'pop' }),
    E(540, 740, menu(bg, { w: 390 }), { a: 'up', d: .05 }),
    E(540, 1195, Tx('RIEN DE CACHÉ', 150, 'var(--a1)'), { a: 'stamp', d: .15, sfx: 'stamp' }),
  ]);
  // la balance : même objet sur deux plans, elle penche au second
  const balance = (bg, an = {}, tilt = 0) => {
    const col = light(bg) ? P.navy : T.cream2, dy = 42 * tilt;
    const mv = (o) => (tilt ? { m: [{ d: .1, dur: .5, e: 'inOut', ...o }] } : {});
    return [
      E(540, 760, O.rect(26, 640, col, 13), { a: 'none', ...an }),
      E(540, 1075, O.rect(320, 30, col, 15), { a: 'none', ...an }),
      E(540, 440, O.rect(600, 26, col, 13), { a: 'none', ...an, ...mv({ r: -8, sfx: 'fall' }) }),
      E(240, 520, O.rect(10, 150, col, 5), { a: 'none', ...an, ...mv({ dy }) }),
      E(840, 520, O.rect(10, 150, col, 5), { a: 'none', ...an, ...mv({ dy: -dy }) }),
      E(240, 650, O.ligne('20,00 €', { w: 340, fs: 140 }), { a: 'none', ...an, ...mv({ dy }) }),
      E(840, 650, O.ligne('20', { w: 340 }), { a: 'none', ...an, ...mv({ dy: -dy }) }),
    ];
  };
  S(219, 8, bg => [
    ...balance(bg, { a: 'up' }),
    E(540, 1215, Tx("UNE FAÇON D'ÉCRIRE", 110, 'var(--a1)'), { a: 'up', d: .15, dist: 200, sfx: 'pop' }),
  ]);
  S(223, 8, bg => [
    ...balance(bg, {}, 1),
    E(540, 1215, Tx('QUI PÈSE MOINS LOURD', 100, 'var(--a1)'), { a: 'down', d: .1, dist: 200 }),
  ]);

  /* ===== SCÈNE 9 — BOUCLE : on retrouve la carte du tout premier plan, à la même place ===== */
  S(227, 9, bg => [
    laCarte(bg, { a: 'drop', sfx: 'thud' }),
    E(540, 1210, Tx('LA PROCHAINE CARTE', 110, 'var(--a1)'), { a: 'up', d: .2 }),
  ]);
  // la loupe se pose sur la place vide du signe, à droite du 20 (elle ne couvre pas le prix)
  const LX = 858, LY2 = 776;
  S(232, 9, bg => [
    laCarte(bg),
    E(LX, LY2, O.magnifier({ w: 200, ring: P.navy }), { a: 'right', d: .05, sfx: 'whoosh', loop: 'pulse', amp: .05, per: .7 }),
    E(540, 1210, Tx('CHERCHE LE SYMBOLE', 110, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  shot({ w: 236, bg: 'navy', scene: 9, html: [
    laCarte('navy'),
    E(LX, LY2, O.magnifier({ w: 200, ring: P.navy }), { a: 'none', m: [{ w: 237, d: .35, dx: 700, r: 20, dur: .45, e: 'inOut', sfx: 'swish' }] }),
    E(540, 1210, Tx('ET DEMANDE-TOI…', 120, 'var(--a1)'), { a: 'up', d: .05 }),
  ] });
})();
