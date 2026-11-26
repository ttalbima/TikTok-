/* Vidéo 014 — « Le paquet qui rétrécit »
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;

  /* ----- objets propres à la vidéo (couleurs de la charte 2 : pas de brun, pas de citron sur l'aliment) ----- */
  // biscuit : blanc froid, bord lilas, pépites indigo (ou rose vif sur fond clair)
  const bisc = (cx, cy, r, c = {}) => {
    const { fill = P.cream, rim = T.cream2, chip = P.navy } = c;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${rim}"/><circle cx="${cx}" cy="${cy}" r="${r * .82}" fill="${fill}"/>
      <g fill="${chip}"><circle cx="${cx - r * .3}" cy="${cy - r * .3}" r="${r * .11}"/><circle cx="${cx + r * .28}" cy="${cy - r * .16}" r="${r * .11}"/><circle cx="${cx - r * .04}" cy="${cy + r * .32}" r="${r * .11}"/><circle cx="${cx + r * .4}" cy="${cy + r * .3}" r="${r * .09}"/><circle cx="${cx - r * .42}" cy="${cy + r * .16}" r="${r * .09}"/></g>`;
  };
  O.biscuit = (o = {}) => { const { w = 200 } = o; return svg(w, 200, 200, bisc(100, 100, 100, o)); };
  // paquet de biscuits générique
  O.pack = (o = {}) => {
    const { w = 460, fill = P.coral, ink = P.cream, g = '' } = o;
    return svg(w, 400, 520,
      `<rect y="30" width="400" height="490" rx="26" fill="${fill}"/><rect width="400" height="70" rx="20" fill="${fill}"/>
       <rect width="400" height="70" rx="20" fill="rgba(0,0,0,.2)"/>
       ${bisc(200, 215, 92)}
       <rect x="40" y="340" width="320" height="86" rx="12" fill="${ink}"/><text x="200" y="402" text-anchor="middle" font-size="62" fill="${P.navy}">BISCUITS</text>
       ${g ? `<text x="200" y="486" text-anchor="middle" font-size="46" fill="${ink}">${g}</text>` : ''}`);
  };
  // étiquette de rayon : gros prix, petit prix au kilo
  O.shelf = (price, kg, o = {}) => {
    const { w = 700, fill = P.cream, ink = P.navy, hl = null, hlc = P.coral } = o;
    return svg(w, 640, 380,
      `<rect width="640" height="380" rx="22" fill="${fill}"/><rect width="640" height="54" rx="22" fill="${ink}"/><rect y="30" width="640" height="24" fill="${ink}"/>
       <text x="320" y="238" text-anchor="middle" font-size="176" fill="${ink}">${price}</text>
       <text x="320" y="334" text-anchor="middle" font-size="56" fill="${ink}" opacity=".8">${kg}</text>
       ${hl ? `<rect x="120" y="274" width="400" height="82" rx="14" fill="none" stroke="${hlc}" stroke-width="12" data-draw='${JSON.stringify(hl)}'/>` : ''}`);
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
    const { w = 380, cone = T.cream2 } = o;
    return svg(w, 380, 560,
      `<path d="M90,260 L190,560 L290,260 Z" fill="${cone}"/><circle cx="190" cy="190" r="130" fill="${P.coral}"/><circle cx="130" cy="110" r="84" fill="${T.navy2}"/><circle cx="250" cy="110" r="84" fill="${T.green2}"/>
       <path d="M110,300 L270,300" stroke="rgba(0,0,0,.2)" stroke-width="16"/>`);
  };
  O.house = (o = {}) => {
    const { w = 260, fill = P.cream, ink = P.navy, roof = P.coral } = o;
    return svg(w, 260, 280, `<path d="M130,0 L260,120 H0 Z" fill="${roof}"/><rect x="24" y="110" width="212" height="170" fill="${fill}"/><rect x="100" y="170" width="60" height="110" rx="6" fill="${ink}"/>`);
  };
  O.store = (o = {}) => {
    const { w = 620, fill = P.cream, ink = P.navy, aw = P.coral, aw2 = P.cream } = o;
    return svg(w, 620, 460,
      `<rect x="30" y="140" width="560" height="320" fill="${fill}"/>
       <g>${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${i * 88.6},40 h88.6 v90 a44.3,44.3 0 0 1 -88.6,0 Z" fill="${i % 2 ? aw2 : aw}"/>`).join('')}</g>
       <rect x="0" y="0" width="620" height="50" rx="10" fill="${ink}"/>
       <rect x="80" y="230" width="170" height="130" rx="8" fill="${ink}"/><rect x="370" y="230" width="150" height="230" rx="8" fill="${ink}"/>`);
  };
  // affichette de rayon
  O.notice = (o = {}) => {
    const { w = 620, post = P.navy } = o;
    return svg(w, 620, 420,
      `<rect x="290" y="300" width="40" height="120" fill="${post}"/><rect width="620" height="320" rx="22" fill="${P.cream}"/>
       <rect x="16" y="16" width="588" height="288" rx="12" fill="none" stroke="${P.navy}" stroke-width="10"/>
       <text x="310" y="140" text-anchor="middle" font-size="96" fill="${P.navy}">QUANTITÉ</text><text x="310" y="252" text-anchor="middle" font-size="96" fill="${P.coral}">EN BAISSE</text>`);
  };
  O.shelves = (o = {}) => {
    const { w = 760, frame = P.navy } = o;
    const cols = [P.coral, P.yellow, T.green2, P.cream, P.coral, T.cream2];
    let s = '';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) s += `<rect x="${50 + c * 112}" y="${40 + r * 190 + (c % 2) * 14}" width="84" height="${128 - (c % 2) * 14}" rx="8" fill="${cols[(r * 2 + c) % 6]}"/>`;
    return svg(w, 760, 610, `<rect width="760" height="610" rx="18" fill="${frame}"/><rect x="20" y="20" width="720" height="570" rx="8" fill="${T.navy2}"/>${s}
      <g fill="${P.cream}"><rect x="20" y="168" width="720" height="22"/><rect x="20" y="358" width="720" height="22"/><rect x="20" y="548" width="720" height="22"/></g>`);
  };

  V.style = 2;        // charte validée le 26/11/2026
  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f, d) => { const bg = CYCLE[k++ % 5]; shot({ w, d, bg, scene, html: f(bg) }); };
  const light = bg => bg === 'cream' || bg === 'yellow';
  const fg = bg => (light(bg) ? P.navy : P.cream);                          // objet contrasté
  const alt = bg => (bg === 'coral' ? P.navy : P.coral);                     // rose, sauf sur fond rose
  const pk = (bg, o = {}) => O.pack({ fill: alt(bg), ...o });
  const sh = (bg, price, kg, o = {}) => O.shelf(price, kg, light(bg) ? { fill: P.navy, ink: P.cream, ...o } : { hlc: bg === 'coral' ? P.navy : P.coral, ...o });
  const tagc = bg => (light(bg) ? { fill: P.navy, ink: P.cream } : {});
  const tg = (bg, txt, o = {}) => O.tag(txt, { ...tagc(bg), ...o });
  const bi = (bg, o = {}) => O.biscuit(light(bg) ? { fill: P.coral, rim: T.coral2, chip: P.cream, ...o } : o);
  const cher = (bg, o = {}) => O.person({ w: 280, fill: light(bg) ? P.navy : P.cream, coat: true, ink: light(bg) ? P.cream : P.navy, ...o });
  // le paquet de l'accroche, repris tel quel dans la boucle
  const PX = 540, PY = 740, PW = 480;
  const lePaquet = (bg, an = {}, o = {}) => E(PX, PY, pk(bg, { w: PW, ...o }), { a: 'none', ...an });
  const loeil = (an = {}) => E(540, 290, O.eye({ w: 300 }), { a: 'none', ...an });
  // l'étiquette de rayon de la scène 10 (même place sur trois plans)
  const SX = 540, SY = 600, SW = 800;

  V.keywords = [3, 11, 13, 14, 23, 29, 33, 39, 43, 47, 51, 54, 59, 61, 63, 65, 67, 71, 79, 82, 87, 89, 90, 97, 100, 110, 115, 120, 123, 125, 130, 134, 141, 148, 151, 155, 162, 167, 170, 175, 180, 185, 188, 195, 198, 206, 209, 213, 221];

  /* ===== SCÈNE 1 — HOOK : le paquet reste à l'écran, un seul élément change ===== */
  S(0, 1, bg => [
    lePaquet(bg, { a: 'drop', sfx: 'thud' }),
    loeil({ a: 'pop', d: .4, sfx: 'pop' }),
    E(540, 1210, Tx('REGARDE BIEN', 170), { a: 'up', d: .15 }),
  ]);
  S(3, 1, bg => [
    lePaquet(bg, { m: [{ d: .05, s: 1.08, dur: .2, sfx: 'rise' }, { d: .3, s: 1, dur: .25 }] }),
    loeil(),
    E(540, 1210, Tx('CE PAQUET', 200, 'var(--a1)'), { a: 'up', d: .05 }),
  ]);
  // « Le prix n'a pas bougé. » : l'étiquette se pose sur le paquet
  S(6, 1, bg => [
    lePaquet(bg),
    E(770, 940, O.tag('2,49 €', { w: 440 }), { a: 'right', d: .1, rot: -8, sfx: 'pop' }),
    E(540, 1210, Tx('PAS BOUGÉ', 200, 'var(--a1)'), { a: 'stamp', w: 9, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  // « Lui, si. » : le prix reste, le paquet rétrécit
  S(12, 2, bg => [
    lePaquet(bg, { org: '50% 100%', m: [{ w: 13, s: .76, dur: .45, e: 'inOut', sfx: 'fall' }] }),
    E(770, 940, O.tag('2,49 €', { w: 440 }), { a: 'none', rot: -8 }),
    E(540, 1210, Tx('LUI, SI', 240, 'var(--a1)'), { a: 'down', d: .1 }),
  ]);
  S(14, 2, bg => [
    ...[0, 1, 2].map(i => E(300 + i * 240, 560, bi(bg, { w: 200 }), { a: 'pop', d: i * .08, sfx: i ? undefined : 'pop', m: [{ w: 16, d: i * .1, dy: 1500, r: 60, dur: .5, e: 'inOut', sfx: i ? undefined : 'fall' }] })),
    E(540, 1050, Tx('- 30 G', 320, 'var(--a1)'), { a: 'stamp', d: .1, sfx: 'stamp' }),
  ]);
  S(18, 2, bg => [
    E(540, 600, O.eye({ w: 620 }), { a: 'spin', sfx: 'pop' }),
    E(540, 600, O.cross({ w: 520, draw: { w: 20, sfx: 'buzz' } }), { a: 'none', w: 20 }),
    E(540, 1150, Tx("TU NE L'AS PAS VU", 118, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  // « Normal : tout est fait pour ça. » : le paquet rétrécit tout doucement
  S(24, 2, bg => [
    E(540, 310, Tx('NORMAL', 240), { a: 'down', d: .05 }),
    E(540, 760, pk(bg, { w: 440 }), { a: 'left', sfx: 'pop', m: [{ d: .5, s: .8, dur: 1.4, e: 'inOut' }] }),
    E(540, 1220, Tx('TOUT EST FAIT POUR ÇA', 95, 'var(--a1)'), { a: 'up', w: 25, dist: 200, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — D'OÙ ÇA VIENT ===== */
  S(30, 3, bg => [
    E(760, 640, pk(bg, { w: 360 }), { a: 'pop', sfx: 'pop' }),
    E(340, 640, O.arrow({ w: 300, fill: P.cream }), { a: 'right', d: .45, rot: 180, sfx: 'whoosh', loop: 'float', amp: 10, per: .8 }),
    E(540, 1170, Tx("D'OÙ ÇA VIENT ?", 135, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(34, 3, bg => [
    E(450, 620, O.factory({ w: 560 }), { a: 'up', sfx: 'pop' }),
    E(900, 600, O.arrow({ w: 280, fill: P.coral }), { a: 'up', w: 36, rot: -90, sfx: 'rise', loop: 'float', amp: 14, per: .8 }),
    E(540, 1160, Tx('SES COÛTS MONTENT', 118, 'var(--a1)'), { a: 'up', w: 36, d: .1 }),
  ]);
  S(40, 3, bg => [
    E(300, 560, O.disc({ w: 320, fill: P.navy }), { a: 'pop', sfx: 'pop' }), E(300, 560, Tx('1', 240, P.cream), { a: 'pop', d: .05, cut: false }),
    E(780, 560, O.disc({ w: 320, fill: P.coral }), { a: 'pop', d: .15 }), E(780, 560, Tx('2', 240, P.cream), { a: 'pop', d: .2, cut: false }),
    E(540, 1090, Tx('2 OPTIONS', 230), { a: 'stamp', w: 41, sfx: 'stamp' }),
  ]);
  S(44, 3, bg => [
    E(230, 480, Tx('1', 520, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(660, 1000, O.tag('PRIX', { w: 560 }), { a: 'pop', w: 45, sfx: 'pop', m: [{ w: 47, dy: -70, s: 1.12, dur: .3 }] }),
    E(740, 520, O.arrow({ w: 340, fill: P.coral }), { a: 'up', w: 45, d: .15, rot: -90, sfx: 'rise', loop: 'float', amp: 16, per: .8 }),
  ]);
  S(48, 3, bg => [
    E(230, 480, Tx('2', 520, 'var(--a1)'), { a: 'down', sfx: 'stamp' }),
    E(690, 520, tg(bg, '2,49 €', { w: 560 }), { a: 'right', d: .2, sfx: 'pop', m: [{ w: 51, s: 1.1, dur: .15 }, { w: 51, d: .2, s: 1, dur: .2 }] }),
    E(540, 1100, Tx('GARDER LE PRIX', 140), { a: 'up', w: 49, d: -.15 }),
  ]);
  S(52, 3, bg => [
    E(540, 600, pk(bg, { w: 520 }), { a: 'spin', sfx: 'pop', m: [{ w: 54, s: .66, dur: .5, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1180, Tx('MOINS DEDANS', 160, 'var(--a1)'), { a: 'stamp', w: 54, d: .1, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 4 — L'EXEMPLE : le paquet reste, le prix se pose ===== */
  S(58, 4, bg => [
    E(540, 300, Tx('HIER', 200), { a: 'down' }),
    E(540, 700, pk(bg, { w: 420, g: '300 g' }), { a: 'pop', d: .05, sfx: 'pop' }),
    E(540, 1170, Tx('300 G', 240, 'var(--a1)'), { a: 'stamp', w: 59, sfx: 'stamp' }),
  ]);
  S(61, 4, bg => [
    E(540, 300, Tx('HIER', 200), { a: 'none' }),
    E(540, 700, pk(bg, { w: 420, g: '300 g' }), { a: 'none' }),
    E(540, 1150, tg(bg, '2,49 €', { w: 600 }), { a: 'drop', dur: .4, sfx: 'thud', m: [{ d: .6, s: 1.07, dur: .18 }, { d: .82, s: 1, dur: .2 }] }),
  ]);
  S(62, 4, bg => [
    E(540, 300, Tx("AUJOURD'HUI", 150), { a: 'down' }),
    E(540, 720, pk(bg, { w: 370, g: '270 g' }), { a: 'right', d: .05, sfx: 'pop' }),
    E(540, 1170, Tx('270 G', 240, 'var(--a1)'), { a: 'stamp', w: 63, sfx: 'stamp' }),
  ]);
  S(65, 4, bg => [
    E(540, 300, Tx("AUJOURD'HUI", 150), { a: 'none' }),
    E(540, 720, pk(bg, { w: 370, g: '270 g' }), { a: 'none' }),
    E(540, 1150, tg(bg, '2,49 €', { w: 600 }), { a: 'left', sfx: 'thud', m: [{ d: .6, s: 1.07, dur: .18 }, { d: .82, s: 1, dur: .2 }] }),
  ]);
  S(66, 4, bg => [
    E(290, 600, pk(bg, { w: 400 }), { a: 'left', sfx: 'pop' }),
    E(790, 600, pk(bg, { w: 400 }), { a: 'right', org: '50% 100%', m: [{ w: 68, s: .86, dur: .35, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1100, Tx('MÊME BOÎTE', 190, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(70, 4, bg => [
    E(290, 600, sh(bg, '2,49 €', '', { w: 460 }), { a: 'pop', sfx: 'pop' }),
    E(790, 600, sh(bg, '2,49 €', '', { w: 460 }), { a: 'pop', d: .12 }),
    E(540, 880, Tx('=', 240), { a: 'pop', d: .3 }),
    E(540, 1130, Tx('MÊME ÉTIQUETTE', 140, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  // phrase ajoutée : « Dans le rayon, tu ne vois aucune différence. »
  S(72, 4, bg => [
    E(540, 640, O.shelves({ w: 780 }), { a: 'up', sfx: 'whoosh' }),
    E(540, 1190, Tx('AUCUNE DIFFÉRENCE', 118, 'var(--a1)'), { a: 'stamp', w: 77, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 5 — AU KILO ===== */
  S(80, 5, bg => [
    E(540, 600, sh(bg, '2,49 €', '? € / KG', { w: 760, hl: { w: 81, d: .1, dur: .4, sfx: 'swish' } }), { a: 'pop', sfx: 'pop' }),
    E(540, 1130, Tx('AU KILO', 260, 'var(--a1)'), { a: 'stamp', w: 81, d: .1, sfx: 'stamp' }),
  ]);
  S(87, 5, bg => [
    E(540, 660, tg(bg, '8,30 €', { w: 860, sub: 'LE KILO' }), { a: 'drop', sfx: 'thud' }),
    E(540, 1130, Tx('HIER', 200, 'var(--a1)'), { a: 'up', d: .05 }),
  ]);
  S(89, 5, bg => [
    E(540, 760, tg(bg, '9,22 €', { w: 860, sub: 'LE KILO' }), { a: 'right', sfx: 'thud' }),
    E(540, 360, O.arrow({ w: 300, fill: P.navy }), { a: 'up', d: .25, rot: -90, sfx: 'rise', loop: 'float', amp: 14, per: .7 }),
    E(540, 1170, Tx("AUJOURD'HUI", 160, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(90, 5, bg => [
    E(540, 1110, O.line('M20,150 C200,150 330,120 420,70 S560,20 680,20', { w: 720, vw: 700, vh: 170, col: P.coral, sw: 30, draw: { d: .1, dur: .7, sfx: 'rise' } }), { a: 'none', cut: false }),
    E(540, 520, Tx('+11 %', 380, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .7 }),
    E(540, 880, Tx('DE HAUSSE', 180), { a: 'up', w: 91 }),
  ]);
  S(94, 5, bg => [
    E(540, 330, Tx('SANS TOUCHER', 150), { a: 'down' }),
    E(540, 700, sh(bg, '2,49 €', '', { w: 660 }), { a: 'pop', d: .1, sfx: 'pop' }),
    E(540, 1150, Tx('AU PRIX', 240, 'var(--a1)'), { a: 'stamp', w: 95, sfx: 'stamp' }),
  ]);
  // phrase ajoutée : « Tu paies plus, et le ticket de caisse ne te le dira jamais. » : le ticket reste
  S(98, 5, bg => [
    ...[0, 1, 2].map(i => E(300 + i * 240, 320, O.coin('€', { w: 170, small: '' }), { a: 'drop', d: i * .1, dur: .4, sfx: i ? undefined : 'coin' })),
    E(540, 720, O.receipt({ w: 340 }), { a: 'up', w: 101, sfx: 'whoosh' }),
    E(540, 1190, Tx('TU PAIES PLUS', 150, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(106, 5, bg => [
    E(540, 720, O.receipt({ w: 340 }), { a: 'none' }),
    E(540, 700, O.cross({ w: 420, col: P.coral, draw: { w: 108, sfx: 'buzz' } }), { a: 'none', w: 108 }),
    E(540, 1190, Tx('NE LE DIRA JAMAIS', 118, 'var(--a1)'), { a: 'stamp', w: 108, d: -.05, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 6 — LE MOT ===== */
  S(111, 6, bg => [
    E(540, 520, O.bubble({ w: 640, fill: P.cream }), { a: 'spin', sfx: 'pop' }),
    E(540, 420, Tx('…', 280, P.navy), { a: 'pop', d: .15, cut: false }),
    E(540, 990, Tx('UN NOM', 240, 'var(--a1)'), { a: 'stamp', w: 113, sfx: 'stamp' }),
    E(540, 1215, Tx("VENU DE L'ANGLAIS", 105), { a: 'up', w: 116, dist: 200 }),
  ]);
  S(119, 6, bg => [
    E(540, 500, pk(bg, { w: 330 }), { a: 'drop', sfx: 'thud', org: '50% 100%', m: [{ w: 120, d: .1, s: .7, dur: .4, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1010, Tx('RÉDUFLATION', 185, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);

  /* ===== SCÈNE 7 — POURQUOI ÇA MARCHE ===== */
  S(121, 7, bg => [
    E(540, 560, O.bubble({ w: 560, fill: P.navy }), { a: 'pop', sfx: 'pop' }),
    E(540, 480, Tx('?', 260, P.coral), { a: 'pop', d: .15, cut: false, loop: 'swing', amp: 6, per: .8 }),
    E(540, 1100, Tx('POURQUOI ÇA MARCHE ?', 100), { a: 'up', d: .1 }),
  ]);
  S(124, 7, bg => [
    E(540, 600, O.disc({ w: 620, fill: P.cream }), { a: 'pop' }),
    E(540, 590, O.bulb({ w: 340 }), { a: 'down', d: .06, sfx: 'ding' }),
    E(540, 1140, Tx('UNE EXPLICATION', 130, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  S(126, 7, bg => [
    E(540, 740, sh(bg, '2,49 €', '', { w: 680 }), { a: 'left', sfx: 'pop' }),
    E(540, 330, O.eye({ w: 340 }), { a: 'down', d: .2 }),
    E(540, 1170, Tx('TU LE REGARDES', 140, 'var(--a1)'), { a: 'up', w: 127 }),
  ]);
  S(131, 7, bg => [
    E(260, 520, pk(bg, { w: 330, g: '270 g' }), { a: 'pop', sfx: 'pop' }),
    E(770, 500, O.eye({ w: 380 }), { a: 'right', d: .1 }),
    E(770, 500, O.cross({ w: 340, col: P.yellow, draw: { w: 133, sfx: 'buzz' } }), { a: 'none', w: 133, d: -.2 }),
    E(540, 960, Tx('LE POIDS', 220), { a: 'stamp', d: .15, sfx: 'stamp' }),
    E(540, 1200, Tx('PRESQUE JAMAIS', 140, 'var(--a1)'), { a: 'up', w: 133, d: -.2 }),
  ]);

  /* ===== SCÈNE 8 — L'ÉTUDE ===== */
  S(135, 8, bg => [
    E(240, 700, cher(bg), { a: 'pop', sfx: 'pop' }),
    E(540, 640, cher(bg, { w: 320, fill: P.yellow, ink: P.navy }), { a: 'pop', d: .1 }),
    E(840, 700, cher(bg), { a: 'pop', d: .2 }),
    E(540, 1170, Tx('DES CHERCHEURS', 150, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(139, 8, bg => [
    E(300, 640, O.cone({ w: 340 }), { a: 'spin', sfx: 'pop', rot: -8, m: [{ w: 143, s: 1.12, dur: .15 }, { w: 143, d: .2, s: 1, dur: .2 }] }),
    E(760, 560, Tx(cnt({ from: 1, to: 10, dur: .45, sfx: 'tick' }), 440, 'var(--a1)'), { a: 'pop', d: .05 }),
    E(540, 1170, Tx("ANS D'ACHATS", 150), { a: 'up', d: .2 }),
  ]);
  S(145, 8, bg => [
    E(220, 640, O.house({ w: 260 }), { a: 'drop', dur: .4, sfx: 'thud' }),
    E(540, 600, O.house({ w: 300, roof: P.yellow }), { a: 'drop', d: .1, dur: .4 }),
    E(860, 640, O.house({ w: 260 }), { a: 'drop', d: .2, dur: .4 }),
    E(540, 1090, Tx('FOYERS AMÉRICAINS', 115, 'var(--a1)'), { a: 'up', w: 147, d: -.05 }),
  ]);
  S(149, 8, bg => [
    E(330, 700, O.person({ w: 360, fill: P.navy }), { a: 'left', sfx: 'pop' }),
    E(780, 500, Tx('!', 400, 'var(--a1)'), { a: 'stamp', w: 150, sfx: 'stamp' }),
    E(540, 1170, Tx('RÉSULTAT', 220), { a: 'up', d: .1 }),
  ]);
  S(155, 8, bg => [
    E(540, 470, Tx('×4', 540, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .6 }),
    E(440, 1040, O.tag('PRIX', { w: 520, fill: P.navy, ink: P.cream }), { a: 'left', w: 158, d: -.06, sfx: 'pop' }),
    E(880, 1040, O.arrow({ w: 240, fill: P.cream }), { a: 'up', w: 158, d: -.06, rot: -90, sfx: 'rise' }),
  ]);
  S(163, 8, bg => [
    E(400, 620, pk(bg, { w: 400 }), { a: 'pop', sfx: 'pop', org: '50% 100%', m: [{ w: 165, s: .7, dur: .45, e: 'inOut', sfx: 'fall' }] }),
    E(820, 620, O.arrow({ w: 280, fill: P.cream }), { a: 'down', w: 165, rot: 90 }),
    E(540, 1150, Tx('BAISSE DE QUANTITÉ', 104, 'var(--a1)'), { a: 'up', w: 165 }),
  ]);

  /* ===== SCÈNE 9 — LA RÈGLE FRANÇAISE ===== */
  S(168, 9, bg => [
    E(540, 560, O.calendar('JUILLET', { w: 580, fs: 130 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1110, Tx('2024', 300, 'var(--a1)'), { a: 'stamp', w: 170, d: -.1, sfx: 'stamp' }),
  ]);
  S(171, 9, bg => [
    E(540, 780, O.store({ w: 620, ink: T.navy2 }), { a: 'up', sfx: 'pop' }),
    E(540, 370, O.pin({ w: 190 }), { a: 'drop', d: .1, dur: .45, sfx: 'thud' }),
    E(540, 1190, Tx('GRANDES SURFACES', 120, 'var(--a1)'), { a: 'up', w: 173, d: -.3 }),
  ]);
  // « doivent le signaler en rayon. Mais seulement pendant deux mois. » : l'affichette reste, puis se décroche
  S(176, 9, bg => [
    E(540, 520, O.notice({ w: 700 }), { a: 'drop', dur: .5, sfx: 'thud' }),
    E(540, 1100, Tx('LE SIGNALER EN RAYON', 100, 'var(--a1)'), { a: 'up', w: 178, d: -.05 }),
  ]);
  S(181, 9, bg => [
    E(540, 520, O.notice({ w: 700 }), { a: 'none', org: '50% 0%', m: [{ w: 184, r: -9, dur: .3, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1100, Tx('SEULEMENT 2 MOIS', 125, 'var(--a1)'), { a: 'stamp', w: 182, d: -.1, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 10 — LE VRAI REPÈRE : la même étiquette sur trois plans ===== */
  S(186, 10, bg => [
    E(SX, SY, sh(bg, '2,49 €', '9,22 € / KG', { w: SW }), { a: 'pop', sfx: 'pop' }),
    E(540, 950, O.arrow({ w: 180, fill: P.coral }), { a: 'up', w: 189, rot: -90, sfx: 'rise', loop: 'float', amp: 10, per: .7 }),
    E(540, 1190, Tx('LE VRAI REPÈRE', 140, 'var(--a1)'), { a: 'up', w: 187, d: -.1 }),
  ]);
  S(192, 10, bg => [
    E(SX, SY, sh(bg, '2,49 €', '9,22 € / KG', { w: SW, hl: { w: 193, dur: .4, sfx: 'swish' } }), { a: 'none' }),
    E(540, 1130, Tx('PRIX AU KILO', 160, 'var(--a1)'), { a: 'up', d: .05 }),
  ]);
  S(196, 10, bg => [
    E(SX, SY, sh(bg, '2,49 €', '9,22 € / KG', { w: SW }), { a: 'none', m: [{ w: 199, s: 1.05, dur: .2 }, { w: 199, d: .25, s: 1, dur: .2 }] }),
    E(745, 822, O.magnifier({ w: 300, ring: P.coral }), { a: 'right', d: .05, sfx: 'whoosh' }),
    E(540, 1090, Tx('EN PETIT', 190, 'var(--a1)'), { a: 'stamp', d: .15, sfx: 'stamp' }),
    E(540, 1255, Tx("SUR L'ÉTIQUETTE", 95), { a: 'up', w: 199, dist: 200 }),
  ]);
  // « Ne lis pas le gros chiffre. Lis le petit. »
  S(201, 10, bg => [
    E(540, 600, tg(bg, '2,49 €', { w: 780 }), { a: 'spin', sfx: 'pop' }),
    E(540, 600, O.cross({ w: 460, col: P.coral, draw: { w: 203, sfx: 'buzz' } }), { a: 'none', w: 203 }),
    E(540, 1130, Tx('PAS LE GROS CHIFFRE', 105, 'var(--a1)'), { a: 'up', w: 203, d: .05 }),
  ]);
  S(207, 10, bg => [
    E(540, 560, O.burst({ w: 820, n: 14, col: P.cream }), { a: 'pop', loop: 'spin', per: 6, cut: false }),
    E(540, 560, O.tag('9,22 €', { w: 700, sub: 'LE KILO', fill: P.navy, ink: P.cream }), { a: 'pop', sfx: 'ding' }),
    E(540, 1100, Tx('LIS LE PETIT', 170, 'var(--a1)'), { a: 'stamp', d: .05, sfx: 'stamp' }),
  ], -.05);

  /* ===== SCÈNE 11 — BOUCLE : on retrouve l'image du tout premier plan ===== */
  S(210, 11, bg => [
    E(540, 330, Tx('LA PROCHAINE FOIS', 124), { a: 'down', d: .05 }),
    E(540, 800, O.shelves({ w: 700, frame: P.navy }), { a: 'up', sfx: 'whoosh' }),
  ]);
  S(214, 11, bg => [
    lePaquet(bg, { a: 'drop', sfx: 'thud', m: [{ w: 216, dy: -50, dur: .4, e: 'inOut', sfx: 'rise' }, { w: 217, d: .1, dy: 0, dur: .3, e: 'inOut' }] }),
  ]);
  shot({ w: 218, bg: 'navy', scene: 11, html: [
    lePaquet('navy', { loop: 'float', amp: 12, per: 1.1 }),
    E(540, 1210, Tx('PLUS LÉGÈRE…', 165, 'var(--a1)'), { a: 'up', w: 219, d: .1 }),
    loeil({ a: 'pop', w: 221, d: .1, sfx: 'pop' }),
  ] });
})();
