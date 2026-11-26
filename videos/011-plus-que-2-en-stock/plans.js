/* Vidéo 011 — « Plus que 2 en stock »
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;

  /* ----- objets propres à cette vidéo ----- */
  // le « petit message rouge »
  O.badge = (txt, o = {}) => {
    const { w = 760, fill = P.coral, ink = P.cream, fs = 70, line = null } = o;
    return svg(w, 760, 130, `<rect width="760" height="130" rx="65" fill="${fill}" ${line ? `stroke="${line}" stroke-width="12"` : ''}/>
      <circle cx="74" cy="65" r="20" fill="${ink}"/><text x="410" y="${65 + fs * .36}" text-anchor="middle" font-size="${fs}" fill="${ink}">${txt}</text>`);
  };
  // sac à dos générique
  O.sac = (o = {}) => {
    const { w = 420, fill = P.coral, dark = T.coral2, ink = P.cream } = o;
    return svg(w, 420, 500,
      `<path d="M150,60 Q150,0 210,0 Q270,0 270,60" fill="none" stroke="${dark}" stroke-width="26"/>
       <rect x="40" y="50" width="340" height="450" rx="90" fill="${fill}"/>
       <path d="M40,190 H380 V140 a90,90 0 0 0 -90,-90 H130 a90,90 0 0 0 -90,90 Z" fill="${dark}"/>
       <rect x="110" y="290" width="200" height="140" rx="26" fill="${dark}"/>
       <rect x="186" y="160" width="48" height="70" rx="12" fill="${ink}"/>`);
  };
  // fiche produit (stock : affiche ou non le bandeau)
  O.fiche = (o = {}) => {
    const { w = 640, stock = false, card = P.cream, inner = T.cream2 } = o;
    return svg(w, 640, 900,
      `<rect width="640" height="900" rx="40" fill="${card}"/>
       <rect x="40" y="40" width="560" height="430" rx="26" fill="${inner}"/>
       <g transform="translate(205,75) scale(.55)"><path d="M150,60 Q150,0 210,0 Q270,0 270,60" fill="none" stroke="${T.coral2}" stroke-width="26"/>
         <rect x="40" y="50" width="340" height="450" rx="90" fill="${P.coral}"/><path d="M40,190 H380 V140 a90,90 0 0 0 -90,-90 H130 a90,90 0 0 0 -90,90 Z" fill="${T.coral2}"/>
         <rect x="110" y="290" width="200" height="140" rx="26" fill="${T.coral2}"/></g>
       <rect x="40" y="510" width="360" height="30" rx="15" fill="${P.navy}" opacity=".55"/><rect x="40" y="560" width="240" height="24" rx="12" fill="${P.navy}" opacity=".3"/>
       <text x="40" y="700" font-size="100" fill="${P.navy}">39 €</text>
       <rect x="40" y="760" width="560" height="100" rx="50" fill="${P.navy}"/><text x="320" y="830" text-anchor="middle" font-size="56" fill="${P.cream}">AJOUTER AU PANIER</text>
       ${stock ? `<rect x="300" y="630" width="300" height="80" rx="40" fill="${P.coral}"/><text x="450" y="686" text-anchor="middle" font-size="44" fill="${P.cream}">PLUS QUE 2</text>` : ''}`);
  };
  // biscuit
  const cookieShape = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${P.yellow}" stroke="${T.yellow2}" stroke-width="${r * .09}"/>
    <g fill="${P.navy}"><circle cx="${cx - r * .35}" cy="${cy - r * .3}" r="${r * .13}"/><circle cx="${cx + r * .3}" cy="${cy - r * .1}" r="${r * .15}"/><circle cx="${cx - r * .1}" cy="${cy + r * .4}" r="${r * .13}"/><circle cx="${cx + r * .45}" cy="${cy + r * .45}" r="${r * .1}"/></g>`;
  O.cookie = (o = {}) => { const { w = 360 } = o; return svg(w, 360, 360, cookieShape(180, 180, 176)); };
  // bocal contenant n biscuits
  O.jar = (n, o = {}) => {
    const { w = 420, light = false, lid = P.coral } = o;
    const glass = light ? 'rgba(20,33,61,.13)' : 'rgba(244,235,217,.2)', edge = light ? P.navy : P.cream;
    let c = '';
    for (let i = 0; i < n; i++) { const col = i % 3, row = Math.floor(i / 3); c += cookieShape(110 + col * 100 + (row % 2) * 12, 520 - row * 92, 48); }
    return svg(w, 420, 600,
      `<rect x="80" y="0" width="260" height="70" rx="18" fill="${lid}"/>
       <path d="M110,70 H310 V110 Q390,130 390,220 V540 a50,50 0 0 1 -50,50 H80 a50,50 0 0 1 -50,-50 V220 Q30,130 110,110 Z" fill="${glass}" stroke="${edge}" stroke-width="12"/>${c}
       <path d="M80,240 V470" stroke="${edge}" stroke-width="12" stroke-linecap="round" opacity=".45"/>`);
  };
  // fenêtre de site générique
  O.win = (o = {}) => {
    const { w = 560, fill = P.cream, bar = P.navy, mark = null } = o;
    return svg(w, 560, 420,
      `<rect width="560" height="420" rx="28" fill="${fill}"/><path d="M0,28 a28,28 0 0 1 28,-28 H532 a28,28 0 0 1 28,28 V90 H0 Z" fill="${bar}"/>
       <g fill="${fill}"><circle cx="50" cy="46" r="13"/><circle cx="92" cy="46" r="13"/><circle cx="134" cy="46" r="13"/></g>
       <rect x="40" y="130" width="200" height="240" rx="16" fill="${bar}" opacity=".22"/>
       <g fill="${bar}" opacity=".5"><rect x="280" y="140" width="230" height="26" rx="13"/><rect x="280" y="190" width="160" height="22" rx="11"/></g>
       <rect x="280" y="300" width="230" height="60" rx="30" fill="${mark || bar}"/>`);
  };
  // pointeur
  O.cursor = (o = {}) => {
    const { w = 200 } = o;
    return svg(w, 200, 260, `<path d="M10,10 L10,210 L66,160 L104,250 L146,232 L108,144 L186,144 Z" fill="${P.navy}" stroke="${P.cream}" stroke-width="14" stroke-linejoin="round"/>`);
  };
  // bouton
  O.btn = (txt, o = {}) => {
    const { w = 640, fill = P.navy, ink = P.cream, fs = 90 } = o;
    return svg(w, 640, 170, `<rect width="640" height="170" rx="85" fill="${fill}"/><text x="320" y="${85 + fs * .36}" text-anchor="middle" font-size="${fs}" fill="${ink}">${txt}</text>`);
  };

  V.style = 2;        // charte validée le 26/11/2026
  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f, d) => { const bg = CYCLE[k++ % 5]; shot({ w, d, bg, scene, html: f(bg) }); };
  const light = bg => bg === 'cream' || bg === 'yellow';
  const fg = bg => (light(bg) ? P.navy : P.cream);                          // objet contrasté
  const alt = bg => (bg === 'coral' ? P.navy : P.coral);                     // rose, sauf sur fond rose
  const who = (bg, i = 0) => [fg(bg), bg === 'yellow' ? P.coral : P.yellow, alt(bg)][i % 3];
  const badge = (bg, txt = 'PLUS QUE 2 EN STOCK', o = {}) => O.badge(txt, { fill: alt(bg), ...o });
  const sac = (bg, o = {}) => O.sac(bg === 'coral' ? { fill: P.navy, dark: T.navy2, ...o } : o);
  const fiche = (bg, o = {}) => O.fiche(bg === 'cream' ? { card: T.cream2, inner: P.cream, ...o } : o);
  const jar = (bg, n, o = {}) => O.jar(n, { light: light(bg), lid: alt(bg), ...o });
  const tagc = bg => (light(bg) ? { fill: P.navy, ink: P.cream } : {});
  const win = (bg, o = {}) => O.win(bg === 'cream' ? { fill: T.cream2, ...o } : bg === 'navy' ? { bar: T.navy2, ...o } : o);
  const clock = (bg, o = {}) => O.clock(bg === 'cream' ? { fill: P.navy, ink: P.cream, ...o } : o);
  const cher = (bg, i = 0) => O.person({ w: 340, fill: light(bg) ? P.navy : i ? P.yellow : P.cream, coat: true, ink: light(bg) ? P.cream : P.navy });
  const under = (y, col, an = {}) => E(540, y, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col, sw: 28, draw: { d: .2, dur: .3, ...an } }), { a: 'none', cut: false });
  // la fiche produit et son petit message : objet de l'accroche, repris tel quel dans la boucle
  const FX = 540, FY = 640, BX = 660, BY = 846;
  const laFiche = (bg, an = {}) => E(FX, FY, fiche(bg, { w: 600 }), { a: 'none', ...an });
  const leMessage = (bg, an = {}) => E(BX, BY, O.badge('PLUS QUE 2', { w: 380, fs: 84 }), { a: 'none', ...an });

  V.keywords = [5, 8, 14, 20, 27, 35, 39, 42, 45, 51, 56, 58, 64, 65, 74, 77, 81, 87, 93, 97, 100, 105, 108, 111, 119, 123, 127, 134, 136, 141, 149, 154, 163, 169, 171, 174, 180, 181, 186, 190, 196, 201, 205, 209, 213, 219, 224, 226, 234, 238];

  /* ===== SCÈNE 1 — HOOK : la fiche et son message restent à l'écran pendant toute l'accroche ===== */
  S(0, 1, bg => [
    laFiche(bg, { a: 'drop', sfx: 'thud' }),
    leMessage(bg, { a: 'pop', d: .45, sfx: 'pop', loop: 'pulse', amp: .07, per: .45 }),
    E(540, 1190, Tx('REGARDE BIEN', 170), { a: 'up', d: .15 }),
  ]);
  S(4, 1, bg => [
    laFiche(bg),
    leMessage(bg, { m: [{ d: .05, s: 1.4, dur: .3, sfx: 'rise' }], loop: 'pulse', amp: .05, per: .45 }),
    E(160, 846, O.arrow({ w: 200, fill: P.navy }), { a: 'left', d: .1, sfx: 'whoosh' }),
    E(540, 1190, Tx('CE MESSAGE', 200, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(6, 1, bg => [
    laFiche(bg),
    E(540, 640, O.badge('PLUS QUE 2 EN STOCK', { w: 960, fill: P.navy }), { a: 'pop', rot: -5, sfx: 'pop', m: [{ w: 8, s: 1.08, dur: .15 }, { w: 9, s: 1, dur: .2 }] }),
    E(540, 1190, Tx('PLUS QUE 2', 200), { a: 'up', w: 8, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 2 — RETAINER : le sac reste, un seul élément change ===== */
  S(11, 2, bg => [
    E(540, 500, sac(bg, { w: 360 }), { a: 'pop', sfx: 'pop' }),
    E(540, 930, Tx('RIEN', 280, 'var(--a1)'), { a: 'stamp', w: 14, sfx: 'stamp' }),
    E(540, 1170, Tx('SUR LE PRODUIT', 130), { a: 'up', w: 14, d: .25 }),
  ]);
  S(17, 2, bg => [
    E(540, 560, O.burst({ w: 900, n: 14, col: P.coral }), { a: 'pop', w: 18, loop: 'spin', per: 6, cut: false }),
    E(540, 560, sac(bg, { w: 360 }), { a: 'none', m: [{ w: 18, s: 1.3, dur: .4, sfx: 'rise' }] }),
    E(540, 1150, Tx('TU LE VEUX', 200, 'var(--a1)'), { a: 'up', w: 18, d: .1 }),
  ]);

  /* ===== SCÈNE 3 — CÔTÉ VENDEUR ===== */
  S(21, 3, bg => [
    E(540, 300, Tx('IMAGINE', 200), { a: 'down', sfx: 'stamp' }),
    E(280, 830, O.person({ w: 320, fill: who(bg, 1) }), { a: 'left', d: .1, sfx: 'pop' }),
    E(280, 545, O.crown({ w: 180, fill: who(bg, 1) === P.yellow ? P.coral : P.yellow, band: T.coral2 }), { a: 'drop', d: .3, dur: .4 }),
    E(740, 800, win(bg, { w: 500 }), { a: 'right', w: 22, sfx: 'whoosh' }),
    E(540, 1210, Tx('TON SITE', 190, 'var(--a1)'), { a: 'up', w: 24, dist: 200 }),
  ]);
  S(28, 3, bg => [
    E(540, 320, Tx('TU VENDS', 190), { a: 'down' }),
    E(540, 740, sac(bg, { w: 460 }), { a: 'spin', d: .1, sfx: 'pop' }),
  ]);
  S(34, 3, bg => [
    E(540, 660, sac(bg, { w: 460 }), { a: 'none' }),
    E(540, 1140, O.tag('39 €', { w: 620, ...tagc(bg) }), { a: 'drop', dur: .4, sfx: 'thud', m: [{ d: .6, s: 1.07, dur: .18 }, { d: .82, s: 1, dur: .2 }] }),
  ], .06);
  S(36, 3, bg => [
    E(240, 860, O.person({ w: 280, fill: who(bg, 0) }), { a: 'pop', sfx: 'pop' }),
    E(540, 820, O.person({ w: 300, fill: who(bg, 1) }), { a: 'pop', d: .1 }),
    E(840, 860, O.person({ w: 280, fill: who(bg, 0) }), { a: 'pop', d: .2 }),
    E(540, 400, O.eye({ w: 400 }), { a: 'down', d: .25, sfx: 'pop' }),
  ]);
  S(39, 3, bg => [
    E(540, 640, O.person({ w: 360, fill: who(bg, 0) }), { a: 'none', loop: 'swing', amp: 4, per: .7, m: [{ w: 41, dx: 1100, dur: .6, e: 'inOut', sfx: 'whoosh' }] }),
    E(240, 400, Tx('?', 280, 'var(--a1)'), { a: 'pop', rot: -14, sfx: 'pop' }),
    E(840, 400, Tx('?', 280, 'var(--a2)'), { a: 'pop', d: .2, rot: 14 }),
    E(540, 1150, Tx('HÉSITENT', 230, 'var(--a1)'), { a: 'stamp', d: .1, sfx: 'stamp' }),
  ]);
  S(42, 3, bg => [
    E(540, 600, O.bubble({ w: 640, fill: bg === 'cream' ? P.navy : P.cream }), { a: 'spin', sfx: 'pop' }),
    E(540, 500, Tx('…', 260, bg === 'cream' ? P.cream : P.navy), { a: 'pop', d: .3, cut: false }),
    E(540, 1130, Tx('« RÉFLÉCHIR »', 150, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  // « Tu fais quoi ? Baisser le prix ? Ça te coûte. » : l'étiquette reste, puis elle tombe
  S(43, 3, bg => [
    E(540, 330, Tx('TU FAIS QUOI ?', 145), { a: 'down' }),
    E(480, 740, O.tag('39 €', { w: 680, ...tagc(bg) }), { a: 'right', d: .1, sfx: 'pop' }),
  ]);
  S(46, 3, bg => [
    E(480, 740, O.tag('39 €', { w: 680, ...tagc(bg) }), { a: 'none', m: [{ d: .1, dy: 90, s: .72, r: -7, dur: .4, sfx: 'fall' }] }),
    E(890, 600, O.arrow({ w: 280, fill: alt(bg) }), { a: 'down', d: .1, rot: 90 }),
    E(540, 1170, Tx('ÇA TE COÛTE', 180, 'var(--a1)'), { a: 'stamp', w: 49, sfx: 'stamp' }),
  ], .12);
  S(52, 3, bg => [
    E(540, 380, Tx('1 LIGNE', 230), { a: 'down' }),
    E(540, 570, O.line('M20,20 H880', { w: 900, vw: 900, vh: 40, col: alt(bg), sw: 34, draw: { d: .15, dur: .35, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(540, 930, badge(bg, 'PLUS QUE 2 EN STOCK', { w: 940 }), { a: 'pop', w: 53, sfx: 'pop', loop: 'pulse', amp: .05, per: .45 }),
  ]);
  S(57, 3, bg => [
    E(540, 560, O.tag('0 €', { w: 640, ...tagc(bg) }), { a: 'spin', sfx: 'pop' }),
    E(540, 1040, Tx('GRATUIT', 290, 'var(--a1)'), { a: 'stamp', d: .15, sfx: 'stamp' }),
  ], -.12);
  // phrase ajoutée : « Et ça ne demande qu'une seconde. »
  S(59, 3, bg => [
    E(540, 600, clock(bg, { w: 600 }), { a: 'pop', sfx: 'pop' }),
    E(540, 600, O.hand({ w: 600, col: alt(bg) }), { a: 'none', loop: 'spin', per: 1, cut: false }),
    E(540, 1150, Tx('1 SECONDE', 220, 'var(--a1)'), { a: 'stamp', w: 62, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 4 — L'EXPÉRIENCE DE 1975 ===== */
  S(65, 4, bg => [
    E(540, 700, O.calendar('1975', { w: 660, fs: 180 }), { a: 'spin', sfx: 'swish', m: [{ d: .8, s: 1.08, dur: .2 }, { d: 1.05, s: 1, dur: .2 }] }),
  ]);
  S(66, 4, bg => [
    E(300, 700, cher(bg), { a: 'left', sfx: 'pop' }),
    E(760, 700, O.cookie({ w: 400 }), { a: 'spin', d: .15, sfx: 'pop' }),
    E(540, 1170, Tx('DES CHERCHEURS', 150, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(71, 4, bg => [
    ...[0, 1, 2, 3].map(i => E(180 + i * 240, 660 + (i % 2) * 50, O.person({ w: 230, fill: who(bg, i) }), { a: 'pop', d: i * .08, sfx: i ? undefined : 'pop' })),
    E(540, 1150, Tx('ÉTUDIANTES', 200, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  // « Premier bocal : dix biscuits. » : le bocal reste, le compte arrive
  S(75, 4, bg => [
    E(540, 310, Tx('BOCAL 1', 200), { a: 'down', d: .1 }),
    E(540, 760, jar(bg, 10, { w: 440 }), { a: 'drop', sfx: 'thud' }),
  ]);
  S(77, 4, bg => [
    E(540, 700, jar(bg, 10, { w: 440 }), { a: 'none', m: [{ d: .05, s: 1.06, dur: .15 }, { d: .3, s: 1, dur: .2 }] }),
    E(540, 1170, Tx('10 BISCUITS', 170, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(79, 4, bg => [
    E(540, 310, Tx('BOCAL 2', 200), { a: 'down', d: .1 }),
    E(540, 760, jar(bg, 2, { w: 440 }), { a: 'left', sfx: 'thud' }),
  ]);
  S(81, 4, bg => [
    E(540, 700, jar(bg, 2, { w: 440 }), { a: 'none', m: [{ d: .05, s: 1.06, dur: .15 }, { d: .3, s: 1, dur: .2 }] }),
    E(540, 1170, Tx('2 BISCUITS', 180, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
  ], .03);
  S(83, 4, bg => [
    E(250, 580, O.cookie({ w: 340 }), { a: 'pop', sfx: 'pop' }),
    E(540, 580, Tx('=', 260), { a: 'pop', w: 85, sfx: 'pop' }),
    E(830, 580, O.cookie({ w: 340 }), { a: 'spin', w: 85, d: .15 }),
    E(540, 1080, Tx('LES MÊMES', 205, 'var(--a1)'), { a: 'stamp', w: 85, d: .35, sfx: 'stamp' }),
  ]);
  S(88, 4, bg => [
    E(540, 620, jar(bg, 2, { w: 480 }), { a: 'up', sfx: 'pop', loop: 'pulse', amp: .03, per: .6 }),
    E(540, 1160, Tx('PRESQUE VIDE', 165, 'var(--a1)'), { a: 'stamp', w: 90, sfx: 'stamp' }),
  ]);
  S(94, 4, bg => [
    E(540, 680, O.burst({ w: 820, n: 14, col: light(bg) ? P.coral : P.yellow }), { a: 'pop', loop: 'spin', per: 6, cut: false }),
    E(540, 680, O.cookie({ w: 360 }), { a: 'pop', sfx: 'pop' }),
    E(540, 400, O.crown({ w: 260, fill: alt(bg), band: bg === 'coral' ? T.navy2 : T.coral2 }), { a: 'drop', w: 95, dur: .45, sfx: 'ding' }),
    E(540, 1180, Tx('+ DÉSIRABLES', 165, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  S(98, 4, bg => [
    E(320, 540, O.cookie({ w: 300 }), { a: 'left' }),
    E(730, 560, O.tag('€€€', { w: 440, ...tagc(bg) }), { a: 'right', d: .1, rot: 6, sfx: 'pop' }),
    E(540, 1040, Tx('+ CHERS', 290, 'var(--a1)'), { a: 'stamp', d: .3, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 5 — L'EFFET DE RARETÉ ===== */
  S(101, 5, bg => [
    E(540, 440, O.burst({ w: 600, n: 12, col: light(bg) ? P.coral : P.yellow }), { a: 'pop', loop: 'spin', per: 7, cut: false }),
    E(540, 440, O.cookie({ w: 280 }), { a: 'pop', sfx: 'pop' }),
    E(540, 830, Tx("L'EFFET", 240), { a: 'up', w: 103 }),
    E(540, 1090, Tx('DE RARETÉ', 220, 'var(--a1)'), { a: 'stamp', w: 104, d: .1, sfx: 'stamp' }),
  ]);
  S(106, 5, bg => [
    E(540, 310, Tx('CE QUI MANQUE', 150), { a: 'down', d: .05 }),
    E(540, 730, jar(bg, 1, { w: 400 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1190, Tx('MEILLEUR', 200, 'var(--a1)'), { a: 'stamp', w: 109, d: .15, sfx: 'stamp' }),
  ]);
  S(112, 5, bg => [
    E(540, 600, clock(bg, { w: 600 }), { a: 'spin', sfx: 'pop', loop: 'shake', amp: 7, lw: 116, ld: .2 }),
    E(540, 600, O.hand({ w: 600, col: alt(bg) }), { a: 'none', loop: 'spin', per: .7, cut: false }),
    E(540, 1150, Tx('VITE !', 320, 'var(--a1)'), { a: 'stamp', w: 116, sfx: 'stamp' }),
  ]);
  // phrases ajoutées : « Tu ne compares plus. Tu ne réfléchis plus. Tu veux juste ne pas le rater. »
  S(120, 5, bg => [
    E(300, 540, O.tag('39 €', { w: 440, ...tagc(bg) }), { a: 'left', rot: -6, sfx: 'pop' }),
    E(780, 680, O.tag('35 €', { w: 440, fill: P.yellow }), { a: 'right', rot: 6 }),
    E(540, 610, O.cross({ w: 400, col: alt(bg), draw: { d: .3, sfx: 'buzz' } }), { a: 'none', d: .3 }),
    E(540, 1130, Tx('TU NE COMPARES PLUS', 105, 'var(--a1)'), { a: 'up', d: .1 }),
  ], -.1);
  S(124, 5, bg => [
    E(540, 580, O.brain({ w: 560, fill: light(bg) ? P.coral : P.cream, fold: light(bg) ? P.cream : P.coral }), { a: 'pop', sfx: 'pop', m: [{ w: 126, s: .55, r: 20, dur: .45, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1130, Tx('TU NE RÉFLÉCHIS PLUS', 100, 'var(--a1)'), { a: 'down', d: .1 }),
  ]);
  S(128, 5, bg => [
    E(540, 580, sac(bg, { w: 400 }), { a: 'spin', sfx: 'pop', loop: 'pulse', amp: .04, per: .5 }),
    E(900, 1000, O.cursor({ w: 190 }), { a: 'right', d: .1, m: [{ w: 129, dx: -280, dy: -300, dur: .45, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1170, Tx('NE PAS LE RATER', 135, 'var(--a1)'), { a: 'stamp', w: 131, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 6 — L'ÉTUDE DE 2019 ===== */
  S(135, 6, bg => [
    E(540, 700, O.calendar('2019', { w: 660, fs: 180 }), { a: 'drop', sfx: 'thud' }),
  ]);
  S(137, 6, bg => [
    E(300, 760, cher(bg, 0), { a: 'pop', sfx: 'pop' }),
    E(700, 760, cher(bg, 1), { a: 'pop', d: .12 }),
    E(800, 440, O.magnifier({ w: 300, ring: alt(bg) }), { a: 'right', d: .2, sfx: 'whoosh' }),
  ]);
  S(140, 6, bg => [
    E(540, 350, Tx('11 000', 300, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    ...Array.from({ length: 8 }, (_, i) => E(165 + (i % 4) * 250, 700 + Math.floor(i / 4) * 190, win(bg, { w: 220 }), { a: 'pop', w: 142, d: i * .05, dur: .2, sfx: i ? undefined : 'pop' })),
    E(180, 820, O.magnifier({ w: 300, ring: alt(bg) }), { a: 'left', w: 143, sfx: 'whoosh', m: [{ w: 144, d: .1, dx: 640, dur: .6, e: 'inOut' }] }),
    E(540, 1190, Tx('SITES', 180), { a: 'up', w: 142, d: .1 }),
  ]);
  S(146, 6, bg => [
    ...Array.from({ length: 10 }, (_, i) => E(140 + (i % 5) * 200, 400 + Math.floor(i / 5) * 190, win(bg, { w: 170 }), { a: 'pop', d: i * .03, dur: .2, sfx: i ? undefined : 'pop' })),
    E(740, 590, O.win({ w: 215, fill: P.yellow, bar: alt(bg) }), { a: 'pop', w: 147, sfx: 'ding' }),
    E(540, 1040, Tx('1 SUR 10', 250, 'var(--a1)'), { a: 'stamp', w: 147, d: .15, sfx: 'stamp' }),
  ]);
  S(151, 6, bg => [
    E(540, 380, badge(bg, 'PLUS QUE 2 EN STOCK', { w: 820 }), { a: 'left', sfx: 'pop' }),
    E(540, 560, O.badge('VITE, DERNIÈRES PIÈCES', { w: 820, fill: P.yellow, ink: P.navy, fs: 64 }), { a: 'right', d: .1 }),
    E(540, 740, O.badge('12 PERSONNES REGARDENT', { w: 820, fill: fg(bg), ink: light(bg) ? P.cream : P.navy, fs: 62 }), { a: 'left', d: .2 }),
    E(540, 1100, Tx('PRESSION', 250, 'var(--a1)'), { a: 'stamp', d: .25, sfx: 'stamp' }),
  ]);
  S(155, 6, bg => [
    E(220, 620, win(bg, { w: 250 }), { a: 'pop' }),
    E(540, 600, O.win({ w: 330, fill: P.yellow, bar: alt(bg) }), { a: 'pop', d: .08, sfx: 'pop', loop: 'pulse', amp: .04, per: .6 }),
    E(860, 620, win(bg, { w: 250 }), { a: 'pop', d: .16 }),
    E(540, 1100, Tx('SUR CERTAINS', 165, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(158, 6, bg => [
    E(540, 420, badge(bg, 'PLUS QUE 2 EN STOCK', { w: 900 }), { a: 'down', sfx: 'pop', loop: 'pulse', amp: .06, per: .4 }),
    E(540, 820, clock(bg, { w: 420 }), { a: 'spin', w: 160, sfx: 'pop' }),
    E(540, 820, O.hand({ w: 420, col: alt(bg) }), { a: 'none', w: 160, loop: 'spin', per: .9, cut: false }),
    E(540, 1200, Tx('PROGRAMMÉ', 160, 'var(--a1)'), { a: 'stamp', w: 161, d: .1, sfx: 'stamp' }),
  ]);
  S(164, 6, bg => [
    E(540, 340, badge(bg, 'PLUS QUE 2', { w: 620, fs: 84 }), { a: 'pop', sfx: 'pop' }),
    E(540, 520, O.cross({ w: 170, col: fg(bg), sw: 50, draw: { w: 165, sfx: 'buzz' } }), { a: 'none', w: 165 }),
    ...[0, 1, 2, 3, 4, 5].map(i => E(250 + (i % 3) * 290, 740 + Math.floor(i / 3) * 180, O.box('', { w: 230, fill: bg === 'navy' ? T.navy2 : P.navy }), { a: 'pop', w: 166, d: i * .05, dur: .2, sfx: i ? undefined : 'pop' })),
    E(540, 1200, Tx('VRAI STOCK', 170, 'var(--a1)'), { a: 'up', w: 167, dist: 200 }),
  ]);

  /* ===== SCÈNE 7 — LA LOI, ET LE VRAI STOCK BAS ===== */
  // « En France, annoncer un faux stock » : le message reste, le tampon tombe dessus
  S(170, 7, bg => [
    E(540, 350, O.pin({ w: 190, fill: alt(bg) }), { a: 'drop', sfx: 'thud' }),
    E(540, 640, badge(bg, 'PLUS QUE 2 EN STOCK', { w: 900 }), { a: 'pop', d: .1 }),
    E(540, 900, O.stamp('FAUX', { w: 520, col: fg(bg), fs: 190, h: 280 }), { a: 'stamp', w: 172, rot: -10, sfx: 'stamp' }),
    E(540, 1200, Tx('EN FRANCE', 190, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  const loi = bg => O.book('LOI', { w: 380, fill: light(bg) ? P.navy : P.cream, ink: light(bg) ? P.cream : P.navy, fs: 150 });
  S(176, 7, bg => [
    E(540, 480, loi(bg), { a: 'drop', sfx: 'thud' }),
    E(540, 950, Tx('PRATIQUE', 190), { a: 'up', w: 178 }),
    E(540, 1170, Tx('TROMPEUSE', 210, 'var(--a1)'), { a: 'stamp', w: 179, sfx: 'stamp' }),
  ]);
  S(181, 7, bg => [
    E(540, 480, loi(bg), { a: 'none' }),
    E(540, 1010, O.stamp('INTERDIT', { w: 900, col: alt(bg), fs: 170, h: 270 }), { a: 'stamp', d: .1, rot: -6, sfx: 'stamp' }),
  ], -.05);
  S(182, 7, bg => [
    E(330, 660, O.box('', { w: 300, fill: bg === 'navy' ? T.navy2 : P.navy }), { a: 'drop', dur: .45, sfx: 'thud' }),
    E(750, 660, O.box('', { w: 300, fill: bg === 'navy' ? T.navy2 : P.navy }), { a: 'drop', d: .15, dur: .45 }),
    E(540, 1130, Tx('VRAI STOCK BAS', 140, 'var(--a1)'), { a: 'up', w: 184 }),
  ]);
  S(188, 7, bg => [
    E(540, 480, O.brain({ w: 460, fill: light(bg) ? P.coral : P.cream, fold: light(bg) ? P.cream : P.coral }), { a: 'pop', sfx: 'pop', loop: 'float', per: 1.2 }),
    E(540, 930, Tx('MÊME EFFET', 200, 'var(--a1)'), { a: 'stamp', w: 189, sfx: 'stamp' }),
    E(540, 1170, Tx('SUR TOI', 200), { a: 'up', w: 191 }),
  ]);
  // phrase ajoutée : « Vrai ou faux, ta réaction est la même : la peur de manquer. »
  S(194, 7, bg => [
    E(290, 540, O.stamp('VRAI', { w: 440, col: bg === 'green' ? P.cream : P.green, fs: 170, h: 260 }), { a: 'stamp', rot: -6, sfx: 'stamp' }),
    E(790, 540, O.stamp('FAUX', { w: 440, col: alt(bg), fs: 170, h: 260 }), { a: 'stamp', w: 196, rot: 6, sfx: 'stamp' }),
    E(540, 820, Tx('=', 220), { a: 'pop', w: 197, sfx: 'pop' }),
    E(540, 1110, Tx('MÊME RÉACTION', 150, 'var(--a1)'), { a: 'up', w: 198 }),
  ]);
  S(202, 7, bg => [
    E(540, 620, jar(bg, 1, { w: 440 }), { a: 'spin', sfx: 'pop', loop: 'shake', amp: 8, ld: .5 }),
    E(540, 1170, Tx('LA PEUR DE MANQUER', 110, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);

  /* ===== SCÈNE 8 — LA QUESTION, PUIS LA BOUCLE ===== */
  const btn = bg => O.btn('ACHETER', { w: 760, fs: 100, fill: bg === 'navy' ? P.cream : P.navy, ink: bg === 'navy' ? P.navy : P.cream });
  S(206, 8, bg => [
    E(540, 320, Tx('AVANT DE CLIQUER', 125, 'var(--a1)'), { a: 'down', d: .1 }),
    E(540, 780, btn(bg), { a: 'pop', sfx: 'pop' }),
    E(920, 1160, O.cursor({ w: 200 }), { a: 'right', d: .1, m: [{ w: 207, dx: -150, dy: -210, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
  ]);
  S(210, 8, bg => [
    E(540, 780, btn(bg), { a: 'none' }),
    E(770, 950, O.cursor({ w: 200 }), { a: 'none' }),
    E(540, 420, O.bubble({ w: 460, fill: bg === 'cream' ? P.navy : P.cream }), { a: 'pop', sfx: 'pop' }),
    E(540, 385, Tx('?', 230, P.coral), { a: 'pop', d: .15, cut: false, loop: 'swing', amp: 6, per: .8 }),
    E(540, 1180, Tx('1 SEULE QUESTION', 125, 'var(--a1)'), { a: 'up', w: 211 }),
  ]);
  S(214, 8, bg => [
    laFiche(bg, { a: 'left', sfx: 'pop' }),
    leMessage(bg, { m: [{ w: 215, dx: 700, dy: -900, r: 40, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1190, Tx("TU L'AURAIS VOULU ?", 105, 'var(--a1)'), { a: 'up', w: 217 }),
  ]);
  // phrase ajoutée : « Si la réponse est non, ferme l'onglet. »
  S(220, 8, bg => [
    E(540, 720, win(bg, { w: 660 }), { a: 'up', sfx: 'pop' }),
    E(540, 310, Tx('NON', 250, 'var(--a1)'), { a: 'stamp', w: 221, sfx: 'stamp' }),
  ]);
  S(225, 8, bg => [
    E(540, 660, win(bg, { w: 660 }), { a: 'none', m: [{ w: 226, dy: 1500, r: 18, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1170, Tx("FERME L'ONGLET", 140, 'var(--a1)'), { a: 'stamp', d: .1, sfx: 'stamp' }),
  ]);
  // boucle : un site te presse, puis on retrouve l'image du tout premier plan
  shot({ w: 227, bg: 'green', scene: 8, html: [
    E(540, 310, Tx('LA PROCHAINE FOIS', 115), { a: 'down', d: .1 }),
    E(540, 650, O.win({ w: 560, mark: P.coral }), { a: 'right', sfx: 'whoosh' }),
    E(540, 1060, O.badge('VITE, DERNIÈRES PIÈCES', { w: 900, fill: P.navy, fs: 64 }), { a: 'pop', w: 229, sfx: 'pop', loop: 'pulse', amp: .06, per: .4 }),
    E(890, 540, O.clock({ w: 240 }), { a: 'spin', w: 232, sfx: 'tick' }),
    E(890, 540, O.hand({ w: 240, col: P.coral }), { a: 'none', w: 232, loop: 'spin', per: .6, cut: false }),
  ] });
  shot({ w: 234, bg: 'navy', scene: 8, html: [
    laFiche('navy'),
    leMessage('navy', { a: 'pop', d: .2, sfx: 'pop', loop: 'pulse', amp: .07, per: .45 }),
    E(540, 1190, Tx('TOUT DE SUITE…', 140, 'var(--a1)'), { a: 'up', w: 236 }),
  ] });
})();
