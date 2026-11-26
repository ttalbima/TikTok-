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
    const { w = 640, stock = false } = o;
    return svg(w, 640, 900,
      `<rect width="640" height="900" rx="40" fill="${P.cream}"/>
       <rect x="40" y="40" width="560" height="430" rx="26" fill="${T.cream2}"/>
       <g transform="translate(205,75) scale(.55)"><path d="M150,60 Q150,0 210,0 Q270,0 270,60" fill="none" stroke="${T.coral2}" stroke-width="26"/>
         <rect x="40" y="50" width="340" height="450" rx="90" fill="${P.coral}"/><path d="M40,190 H380 V140 a90,90 0 0 0 -90,-90 H130 a90,90 0 0 0 -90,90 Z" fill="${T.coral2}"/>
         <rect x="110" y="290" width="200" height="140" rx="26" fill="${T.coral2}"/></g>
       <rect x="40" y="510" width="360" height="30" rx="15" fill="${P.navy}" opacity=".55"/><rect x="40" y="560" width="240" height="24" rx="12" fill="${P.navy}" opacity=".3"/>
       <text x="40" y="700" font-size="100" fill="${P.navy}">39 €</text>
       <rect x="40" y="760" width="560" height="100" rx="50" fill="${P.navy}"/><text x="320" y="830" text-anchor="middle" font-size="56" fill="${P.cream}">AJOUTER AU PANIER</text>
       ${stock ? `<rect x="300" y="630" width="300" height="80" rx="40" fill="${P.coral}"/><text x="450" y="686" text-anchor="middle" font-size="44" fill="${P.cream}">PLUS QUE 2</text>` : ''}`);
  };
  // biscuit
  const cookieShape = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${T.yellow2}"/>
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

  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f) => { const bg = CYCLE[k++ % 5]; shot({ w, bg, scene, html: f(bg) }); };
  const lightBg = bg => bg === 'cream' || bg === 'yellow';
  const who = bg => (lightBg(bg) ? P.navy : P.cream);                       // silhouette contrastée
  const badge = (bg, txt = 'PLUS QUE 2 EN STOCK', o = {}) => O.badge(txt, { line: bg === 'coral' ? P.cream : null, ...o });
  const sac = (bg, o = {}) => O.sac(bg === 'coral' ? { fill: P.navy, dark: T.navy2, ...o } : o);
  const win = (bg, o = {}) => O.win(bg === 'cream' ? { fill: T.cream2, ...o } : bg === 'navy' ? { bar: T.navy2, ...o } : o);
  const under = (y, col, an = {}) => E(540, y, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col, sw: 28, draw: { d: .2, dur: .3, ...an } }), { a: 'none', cut: false });

  V.keywords = [5, 10, 14, 21, 21, 27, 36, 42, 45, 51, 58, 65, 78, 82, 87, 97, 100, 105, 111, 119, 136, 141, 149, 154, 169, 174, 180, 181, 191, 213, 219, 238];

  /* ===== SCÈNE 1 — HOOK ===== */
  S(0, 1, bg => [
    E(540, 740, O.fiche({ w: 700 }), { a: 'drop', sfx: 'thud' }),
    E(740, 706, O.badge('PLUS QUE 2', { w: 340, fs: 84 }), { a: 'pop', d: .55, sfx: 'pop', loop: 'pulse', amp: .07, per: .45 }),
  ]);
  S(4, 1, bg => [
    E(540, 400, Tx('CE MESSAGE', 190), { a: 'down' }),
    E(540, 760, badge(bg, 'PLUS QUE 2 EN STOCK', { w: 980 }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .05, per: .45 }),
    E(540, 1090, O.arrow({ w: 300, fill: P.navy }), { a: 'up', w: 5, rot: -90 }),
  ]);
  S(6, 1, bg => [
    E(540, 340, Tx('PLUS QUE', 220), { a: 'down' }),
    E(540, 760, Tx('2', 520, 'var(--a1)'), { a: 'stamp', w: 9, sfx: 'stamp' }),
    E(540, 1180, Tx('EN STOCK', 220), { a: 'up', w: 9, m: [{ w: 10, d: .4, s: 1.08, dur: .2 }, { w: 10, d: .65, s: 1, dur: .2 }] }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(11, 2, bg => [
    E(540, 460, sac(bg, { w: 360 }), { a: 'pop', sfx: 'pop' }),
    E(540, 950, Tx('RIEN', 300, 'var(--a1)'), { a: 'stamp', w: 14, sfx: 'stamp' }),
    E(540, 1190, Tx('SUR LE PRODUIT', 140), { a: 'up', w: 19 }),
  ]);
  S(21, 2, bg => [
    E(540, 620, Tx('ET', 340), { a: 'stamp', sfx: 'stamp' }),
    E(540, 940, Tx('POURTANT…', 190, 'var(--a1)'), { a: 'up', w: 21 }),
  ]);
  S(21, 2, bg => [
    E(540, 620, O.burst({ w: 880, n: 14 }), { a: 'pop', w: 21, loop: 'spin', per: 6, cut: false }),
    E(540, 620, sac(bg, { w: 340 }), { a: 'pop', sfx: 'pop', m: [{ w: 21, s: 1.35, dur: .4, sfx: 'rise' }] }),
    E(540, 1170, Tx('PLUS…', 230, 'var(--a1)'), { a: 'up', w: 21 }),
  ]);
  S(21, 2, bg => [
    E(540, 560, sac(bg, { w: 400, fill: P.navy, dark: T.navy2 }), { a: 'none', loop: 'pulse', amp: .04, per: .6 }),
    E(540, 1040, Tx('DÉSIRABLE', 230, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(21, 2, bg => [
    E(540, 560, O.magnifier({ w: 420 }), { a: 'left', sfx: 'whoosh' }),
    E(540, 1040, Tx('LA PREUVE', 240, 'var(--a1)'), { a: 'stamp', w: 21, sfx: 'stamp' }),
  ]);
  S(21, 2, bg => [
    E(300, 660, O.jar(10, { w: 380 }), { a: 'drop', sfx: 'thud' }),
    E(780, 660, O.jar(2, { w: 380 }), { a: 'drop', w: 21, sfx: 'thud' }),
    E(540, 1150, Tx('2 BOCAUX', 230, 'var(--a1)'), { a: 'up', w: 21 }),
  ]);

  /* ===== SCÈNE 3 — CÔTÉ VENDEUR ===== */
  S(21, 3, bg => [
    E(540, 700, O.burst({ w: 1000, n: 12, col: P.coral }), { a: 'pop', loop: 'spin', per: 7, cut: false }),
    E(540, 700, Tx('IMAGINE', 280), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(23, 3, bg => [
    E(280, 800, O.person({ w: 340, fill: P.yellow }), { a: 'left', sfx: 'pop' }),
    E(280, 520, O.crown({ w: 200 }), { a: 'drop', d: .2, dur: .4 }),
    E(740, 760, win(bg, { w: 520 }), { a: 'right', w: 25 }),
    E(540, 1180, Tx('TON SITE', 240, 'var(--a1)'), { a: 'up', w: 26 }),
  ]);
  S(28, 3, bg => [
    E(540, 330, Tx('TU VENDS', 190), { a: 'down' }),
    E(540, 820, O.sac({ w: 560, fill: P.navy, dark: T.navy2 }), { a: 'pop', w: 30, sfx: 'pop' }),
  ]);
  S(36, 3, bg => [
    E(540, 760, O.tag('39 €', { w: 860 }), { a: 'drop', sfx: 'thud', m: [{ d: .7, s: 1.07, dur: .18 }, { d: .92, s: 1, dur: .2 }] }),
  ]);
  S(36, 3, bg => [
    E(240, 840, O.person({ w: 280, fill: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(540, 800, O.person({ w: 300, fill: P.yellow }), { a: 'pop', d: .12 }),
    E(840, 840, O.person({ w: 280, fill: P.cream }), { a: 'pop', d: .24 }),
    E(540, 380, O.eye({ w: 380 }), { a: 'pop', w: 38, sfx: 'pop' }),
  ]);
  S(39, 3, bg => [
    E(540, 600, O.person({ w: 360 }), { a: 'none', loop: 'swing', amp: 4, per: .7 }),
    E(260, 380, Tx('?', 280, 'var(--a1)'), { a: 'pop', rot: -14, sfx: 'pop' }),
    E(820, 380, Tx('?', 280, 'var(--a2)'), { a: 'pop', d: .2, rot: 14 }),
    E(540, 1130, Tx('HÉSITENT', 240, 'var(--a1)'), { a: 'stamp', d: .1, sfx: 'stamp' }),
  ]);
  S(41, 3, bg => [
    E(300, 600, O.person({ w: 300, fill: P.cream }), { a: 'none', m: [{ d: .1, dx: 1100, dur: .6, e: 'inOut', sfx: 'whoosh' }] }),
    E(600, 600, O.person({ w: 300, fill: P.yellow }), { a: 'none', m: [{ d: .25, dx: 1100, dur: .6, e: 'inOut' }] }),
    E(540, 1040, Tx('« RÉFLÉCHIR »', 170, 'var(--a1)'), { a: 'pop', w: 42, sfx: 'pop' }),
    E(540, 560, O.bubble({ w: 460 }), { a: 'pop', w: 42, d: .5, sfx: 'pop' }),
    E(540, 500, Tx('…', 240, P.navy), { a: 'pop', w: 42, d: .65, cut: false }),
  ]);
  S(43, 3, bg => [
    E(540, 500, Tx('TU FAIS', 240), { a: 'down' }),
    E(540, 880, Tx('QUOI ?', 380, 'var(--a1)'), { a: 'stamp', w: 45, sfx: 'stamp' }),
  ]);
  S(47, 3, bg => [
    E(440, 600, O.tag('39 €', { w: 600 }), { a: 'pop', sfx: 'pop', m: [{ w: 47, dy: 160, s: .8, dur: .4, sfx: 'fall' }] }),
    E(880, 620, O.arrow({ w: 300, fill: P.navy }), { a: 'down', w: 47, d: .15, rot: 90 }),
    E(540, 1150, Tx('- CHER ?', 260, 'var(--a1)'), { a: 'up', w: 48 }),
  ]);
  S(49, 3, bg => [
    ...[0, 1, 2].map(i => E(290 + i * 250, 520, O.coin('€', { w: 220, small: '' }), { a: 'pop', d: i * .08, m: [{ d: .3 + i * .1, dy: 1300, r: 60, dur: .5, e: 'inOut', sfx: i ? undefined : 'fall' }] })),
    E(540, 1040, Tx('ÇA COÛTE', 250, 'var(--a1)'), { a: 'stamp', w: 51, sfx: 'stamp' }),
  ]);
  S(52, 3, bg => [
    E(540, 400, Tx('1 LIGNE', 240), { a: 'down' }),
    E(540, 700, O.line('M20,20 H880', { w: 900, vw: 900, vh: 40, col: P.coral, sw: 34, draw: { w: 54, d: 0, dur: .4, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(540, 1010, badge(bg, 'PLUS QUE 2 EN STOCK', { w: 940 }), { a: 'pop', w: 56, sfx: 'pop', loop: 'pulse', amp: .05, per: .45 }),
  ]);
  S(57, 3, bg => [
    E(540, 500, O.tag('0 €', { w: 620 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1010, Tx('GRATUIT', 300, 'var(--a1)'), { a: 'stamp', w: 58, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 4 — L'EXPÉRIENCE DE 1975 ===== */
  S(65, 4, bg => [
    E(540, 740, Tx(cnt({ from: 1960, to: 1975, dur: .5, sfx: 'tick' }), 440), { a: 'pop', m: [{ d: 1.05, s: 1.08, dur: .2 }, { d: 1.3, s: 1, dur: .2 }] }),
    under(1010, P.coral, { d: .6 }),
  ]);
  const cher = (fill = P.navy, ink = P.cream) => O.person({ w: 340, fill, coat: true, ink });
  S(66, 4, bg => [
    E(320, 720, cher(), { a: 'pop', sfx: 'pop' }),
    E(760, 720, cher(), { a: 'pop', d: .15 }),
    E(540, 1130, O.clipboard({ w: 220 }), { a: 'up', w: 68 }),
  ]);
  S(70, 4, bg => [
    E(540, 720, O.cookie({ w: 620 }), { a: 'spin', sfx: 'pop' }),
  ]);
  S(73, 4, bg => [
    ...[0, 1, 2, 3].map(i => E(180 + i * 240, 700 + (i % 2) * 50, O.person({ w: 230, fill: [P.navy, P.coral, P.green, P.navy][i] }), { a: 'pop', d: i * .1, sfx: i ? undefined : 'pop' })),
    E(540, 1150, Tx('ÉTUDIANTES', 200, 'var(--a1)'), { a: 'up', w: 74 }),
  ]);
  S(75, 4, bg => [
    E(540, 620, O.jar(10, { w: 520 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1170, Tx('BOCAL 1', 230, 'var(--a1)'), { a: 'up', w: 76 }),
  ]);
  S(78, 4, bg => [
    E(540, 620, Tx('10', 680), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1100, Tx('BISCUITS', 240, 'var(--a1)'), { a: 'up', w: 78 }),
  ]);
  S(79, 4, bg => [
    E(540, 620, O.jar(2, { w: 520, lid: P.navy }), { a: 'drop', sfx: 'thud' }),
    E(540, 1170, Tx('BOCAL 2', 230, 'var(--a1)'), { a: 'up', w: 80 }),
  ]);
  S(82, 4, bg => [
    E(540, 620, Tx('2', 680, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1100, Tx('BISCUITS', 240), { a: 'up', w: 82 }),
  ]);
  S(83, 4, bg => [
    E(250, 560, O.cookie({ w: 340 }), { a: 'pop', sfx: 'pop' }),
    E(540, 560, Tx('=', 260), { a: 'pop', w: 85, sfx: 'pop' }),
    E(830, 560, O.cookie({ w: 340 }), { a: 'pop', w: 85, d: .25 }),
    E(540, 1080, Tx('LES MÊMES', 205, 'var(--a1)'), { a: 'stamp', w: 87, sfx: 'stamp' }),
  ]);
  S(88, 4, bg => [
    E(540, 420, Tx('POURTANT', 250, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 930, O.jar(2, { w: 440 }), { a: 'up', w: 89, sfx: 'pop' }),
  ]);
  S(92, 4, bg => [
    E(540, 600, O.jar(2, { w: 500, light: true }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .03, per: .6 }),
    E(540, 1160, Tx('PRESQUE VIDE', 170, 'var(--a1)'), { a: 'stamp', d: .1, sfx: 'stamp' }),
  ]);
  S(95, 4, bg => [
    E(540, 660, O.burst({ w: 820, n: 14 }), { a: 'pop', loop: 'spin', per: 6, cut: false }),
    E(540, 660, O.cookie({ w: 360 }), { a: 'pop', sfx: 'pop' }),
    E(540, 380, O.crown({ w: 260 }), { a: 'drop', w: 97, dur: .45, sfx: 'ding' }),
    E(540, 1180, Tx('+ DÉSIRABLES', 170, 'var(--a1)'), { a: 'up', w: 96 }),
  ]);
  S(98, 4, bg => [
    E(330, 520, O.cookie({ w: 300 }), { a: 'pop' }),
    E(730, 540, O.tag('€€€', { w: 440 }), { a: 'right', d: .1, rot: 6, sfx: 'pop' }),
    E(540, 1040, Tx('+ CHERS', 300, 'var(--a1)'), { a: 'stamp', w: 99, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 5 — L'EFFET DE RARETÉ ===== */
  S(101, 5, bg => [
    E(540, 380, Tx("ÇA S'APPELLE", 150), { a: 'down' }),
    E(540, 660, Tx("L'EFFET", 280), { a: 'pop', w: 103, sfx: 'pop' }),
    E(540, 960, Tx('DE RARETÉ', 240, 'var(--a1)'), { a: 'stamp', w: 105, sfx: 'stamp' }),
    under(1130, P.coral, { w: 105, d: .3 }),
  ]);
  S(106, 5, bg => [
    E(540, 620, O.jar(1, { w: 480 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1150, Tx('CE QUI MANQUE', 160, 'var(--a1)'), { a: 'up', w: 108 }),
  ]);
  S(110, 5, bg => [
    E(540, 620, O.disc({ w: 640, fill: P.navy }), { a: 'pop' }),
    E(540, 620, O.cookie({ w: 400 }), { a: 'pop', d: .06, sfx: 'pop', loop: 'pulse', amp: .05, per: .5 }),
    E(540, 1140, Tx('MEILLEUR', 260, 'var(--a1)'), { a: 'stamp', w: 111, sfx: 'stamp' }),
  ]);
  S(112, 5, bg => [
    E(540, 600, O.clock({ w: 620 }), { a: 'pop', sfx: 'pop', loop: 'shake', amp: 7, lw: 119, ld: .2 }),
    E(540, 600, O.hand({ w: 620, col: P.navy }), { a: 'none', loop: 'spin', per: .7, cut: false }),
    E(540, 1150, Tx('VITE !', 340, 'var(--a1)'), { a: 'stamp', w: 119, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 6 — L'ÉTUDE DE 2019 ===== */
  S(135, 6, bg => [
    E(540, 740, Tx(cnt({ from: 2005, to: 2019, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    under(1010, P.yellow, { d: .55 }),
  ]);
  S(137, 6, bg => [
    E(300, 760, cher(P.navy, P.yellow), { a: 'pop', sfx: 'pop' }),
    E(700, 760, cher(P.green, P.yellow), { a: 'pop', d: .15 }),
    E(760, 480, O.magnifier({ w: 320 }), { a: 'right', w: 139, sfx: 'whoosh' }),
  ]);
  S(140, 6, bg => [
    E(540, 420, Tx('11 000', 340, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    ...Array.from({ length: 8 }, (_, i) => E(165 + (i % 4) * 250, 800 + Math.floor(i / 4) * 200, O.win({ w: 220, bar: T.navy2 }), { a: 'pop', w: 141, d: i * .06, dur: .2 })),
    E(540, 1210, Tx('SITES', 200), { a: 'up', w: 142 }),
  ]);
  S(144, 6, bg => [
    E(540, 640, win(bg, { w: 640 }), { a: 'pop' }),
    E(300, 640, O.magnifier({ w: 400 }), { a: 'left', sfx: 'whoosh', m: [{ d: .35, dx: 420, dur: .5, e: 'inOut' }] }),
    E(540, 1150, Tx('AU CRIBLE', 230, 'var(--a1)'), { a: 'up', w: 145 }),
  ]);
  S(146, 6, bg => [
    ...Array.from({ length: 10 }, (_, i) => E(140 + (i % 5) * 200, 400 + Math.floor(i / 5) * 190, O.win({ w: 170, bar: P.navy }), { a: 'pop', d: i * .04, dur: .2, sfx: i ? undefined : 'pop' })),
    E(740, 590, O.win({ w: 210, fill: P.yellow, bar: P.navy }), { a: 'pop', w: 147, sfx: 'ding' }),
    E(540, 1040, Tx('1 SUR 10', 280, 'var(--a1)'), { a: 'stamp', w: 149, sfx: 'stamp' }),
  ]);
  S(151, 6, bg => [
    E(540, 380, O.badge('PLUS QUE 2 EN STOCK', { w: 820 }), { a: 'left', sfx: 'pop' }),
    E(540, 560, O.badge('VITE, DERNIÈRES PIÈCES', { w: 820, fill: P.yellow, ink: P.navy, fs: 64 }), { a: 'right', d: .15 }),
    E(540, 740, O.badge('12 PERSONNES REGARDENT', { w: 820, fill: P.cream, ink: P.navy, fs: 62 }), { a: 'left', d: .3 }),
    E(540, 1100, Tx('PRESSION', 250, 'var(--a1)'), { a: 'stamp', w: 154, sfx: 'stamp' }),
  ]);
  S(155, 6, bg => [
    E(220, 620, O.win({ w: 250, fill: T.cream2 }), { a: 'pop' }),
    E(540, 600, O.win({ w: 330, fill: P.yellow }), { a: 'pop', d: .1, sfx: 'pop', loop: 'pulse', amp: .04, per: .6 }),
    E(860, 620, O.win({ w: 250, fill: T.cream2 }), { a: 'pop', d: .2 }),
    E(540, 1100, Tx('SUR CERTAINS', 170, 'var(--a1)'), { a: 'up', w: 156 }),
  ]);
  S(158, 6, bg => [
    E(540, 500, O.badge('PLUS QUE 2 EN STOCK', { w: 900 }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .07, per: .4 }),
    E(540, 950, O.clock({ w: 420 }), { a: 'pop', w: 160, sfx: 'pop' }),
    E(540, 950, O.hand({ w: 420 }), { a: 'none', w: 160, loop: 'spin', per: .9, cut: false }),
  ]);
  S(163, 6, bg => [
    E(540, 520, O.clock({ w: 420, ink: P.navy }), { a: 'none' }),
    E(540, 520, O.hand({ w: 420 }), { a: 'none', loop: 'spin', per: .9, cut: false }),
    E(540, 1040, Tx('PROGRAMMÉ', 200), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(164, 6, bg => [
    E(540, 360, badge(bg, 'PLUS QUE 2', { w: 640, fs: 84 }), { a: 'pop', sfx: 'pop' }),
    E(540, 560, O.cross({ w: 180, col: P.navy, sw: 50, draw: { w: 165, sfx: 'buzz' } }), { a: 'none', w: 165 }),
    ...[0, 1, 2, 3, 4, 5].map(i => E(250 + (i % 3) * 290, 800 + Math.floor(i / 3) * 190, O.box('', { w: 240, fill: P.navy }), { a: 'pop', w: 167, d: i * .06, dur: .2, sfx: i ? undefined : 'pop' })),
    E(540, 1230, Tx('VRAI STOCK', 190, 'var(--a1)'), { a: 'up', w: 168, dist: 200 }),
  ]);

  /* ===== SCÈNE 7 — LA LOI, ET LE VRAI STOCK BAS ===== */
  S(170, 7, bg => [
    E(540, 500, O.pin({ w: 320 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1000, Tx('EN FRANCE', 230, 'var(--a1)'), { a: 'stamp', w: 171, sfx: 'stamp' }),
  ]);
  S(172, 7, bg => [
    E(540, 560, O.badge('PLUS QUE 2 EN STOCK', { w: 900 }), { a: 'pop', sfx: 'pop' }),
    E(540, 600, O.stamp('FAUX', { w: 640, col: P.navy, fs: 190, h: 280 }), { a: 'stamp', w: 174, rot: -10, sfx: 'stamp' }),
    E(540, 1080, Tx('FAUX STOCK', 195, 'var(--a1)'), { a: 'up', w: 175 }),
  ]);
  S(176, 7, bg => [
    E(540, 500, O.book('LOI', { w: 400, fill: P.cream, ink: P.navy, fs: 150 }), { a: 'drop', sfx: 'thud' }),
    E(540, 970, Tx('PRATIQUE', 200), { a: 'up', w: 178 }),
    E(540, 1190, Tx('TROMPEUSE', 220, 'var(--a1)'), { a: 'stamp', w: 180, sfx: 'stamp' }),
  ]);
  S(181, 7, bg => [
    E(540, 600, O.cross({ w: 560, col: P.coral, sw: 70, draw: { sfx: 'buzz' } }), { a: 'none', loop: 'shake', ld: .3, ldur: .3, amp: 8 }),
    E(540, 1100, Tx('INTERDIT', 250), { a: 'stamp', d: .15, sfx: 'stamp' }),
  ]);
  S(182, 7, bg => [
    E(540, 360, Tx('MAIS…', 280), { a: 'stamp', sfx: 'stamp' }),
    E(380, 780, O.box('', { w: 280, fill: P.navy }), { a: 'drop', w: 184, dur: .45, sfx: 'thud' }),
    E(700, 780, O.box('', { w: 280, fill: P.navy }), { a: 'drop', w: 184, d: .15, dur: .45 }),
    E(540, 1170, Tx('VRAI STOCK BAS', 150, 'var(--a1)'), { a: 'up', w: 185 }),
  ]);
  S(188, 7, bg => [
    E(540, 480, O.brain({ w: 480 }), { a: 'pop', sfx: 'pop', loop: 'float', per: 1.2 }),
    E(540, 930, Tx('MÊME EFFET', 210, 'var(--a1)'), { a: 'stamp', w: 190, sfx: 'stamp' }),
    E(540, 1170, Tx('SUR TOI', 220), { a: 'up', w: 192 }),
  ]);

  /* ===== SCÈNE 8 — BOUCLE ===== */
  S(206, 8, bg => [
    E(540, 380, Tx('AVANT DE CLIQUER', 130, 'var(--a1)'), { a: 'down', w: 207 }),
    E(540, 760, O.btn('ACHETER', { w: 760, fs: 100 }), { a: 'pop', sfx: 'pop' }),
    E(900, 1100, O.cursor({ w: 200 }), { a: 'right', d: .1, m: [{ w: 207, dx: -260, dy: -260, dur: .55, e: 'inOut', sfx: 'whoosh' }] }),
  ]);
  S(210, 8, bg => [
    E(540, 400, Tx('?', 360, 'var(--a2)'), { a: 'pop', rot: 8, sfx: 'pop', loop: 'swing', amp: 6, per: .8 }),
    E(540, 800, Tx('1 SEULE', 300, 'var(--a1)'), { a: 'stamp', w: 212, sfx: 'stamp' }),
    E(540, 1100, Tx('QUESTION', 250), { a: 'up', w: 213, m: [{ w: 213, d: .5, s: 1.07, dur: .2 }, { w: 213, d: .75, s: 1, dur: .2 }] }),
  ]);
  S(214, 8, bg => [
    E(540, 740, O.fiche({ w: 700 }), { a: 'pop' }),
    E(740, 706, O.badge('PLUS QUE 2', { w: 340, fs: 84 }), { a: 'none', m: [{ w: 215, dx: 700, dy: -900, r: 40, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
  ]);
  S(217, 8, bg => [
    E(540, 400, Tx("TU L'AURAIS", 180), { a: 'down' }),
    E(540, 760, Tx('VOULU ?', 320, 'var(--a1)'), { a: 'stamp', w: 219, sfx: 'stamp' }),
    E(540, 1130, sac(bg, { w: 240 }), { a: 'up', w: 219, d: .3 }),
  ]);
  S(238, 8, bg => [
    E(540, 400, O.bulb({ w: 260, ink: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(540, 800, Tx('MAINTENANT', 200, 'var(--a1)'), { a: 'stamp', w: 238, sfx: 'stamp' }),
    E(540, 1080, Tx('TU SAIS', 280), { a: 'stamp', w: 238, sfx: 'stamp', m: [{ w: 238, s: 1.08, dur: .2 }, { w: 238, d: .25, s: 1, dur: .2 }] }),
  ]);
  S(238, 8, bg => [
    E(540, 700, O.badge('PLUS QUE 2 EN STOCK', { w: 980 }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .06, per: .45 }),
    E(540, 380, O.eye({ w: 340 }), { a: 'pop', w: 238, sfx: 'pop' }),
    E(540, 1040, Tx('…', 340, 'var(--a1)'), { a: 'pop', w: 238 }),
  ]);
})();
