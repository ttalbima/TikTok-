/* Vidéo 008 — « La livraison gratuite dès 35 € »
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;

  /* ----- objets propres à cette vidéo ----- */
  // panier d'achat générique
  O.panier = (o = {}) => {
    const { w = 520, fill = P.coral, ink = P.cream } = o;
    return svg(w, 520, 460,
      `<path d="M150,150 Q260,-60 370,150" fill="none" stroke="${fill}" stroke-width="30" stroke-linecap="round"/>
       <rect x="0" y="140" width="520" height="60" rx="20" fill="${fill}"/>
       <path d="M40,200 H480 L430,460 H90 Z" fill="${fill}"/>
       <g stroke="${ink}" stroke-width="16" stroke-linecap="round" opacity=".55"><path d="M170,250 L190,410 M260,250 V410 M350,250 L330,410"/></g>`);
  };
  // message de panier avec barre de progression (pct = remplissage de 0 à 1)
  O.msg = (l1, l2, pct, o = {}) => {
    const { w = 900, fill = P.cream, ink = P.navy, bar = P.coral } = o;
    return svg(w, 900, 420,
      `<rect width="900" height="420" rx="44" fill="${fill}"/>
       <text x="450" y="140" text-anchor="middle" font-size="110" fill="${ink}">${l1}</text>
       <text x="450" y="236" text-anchor="middle" font-size="62" fill="${ink}" opacity=".75">${l2}</text>
       <rect x="70" y="296" width="760" height="56" rx="28" fill="${ink}" opacity=".2"/>
       <rect x="70" y="296" width="${760 * pct}" height="56" rx="28" fill="${bar}"/>`);
  };
  // camion de livraison générique
  O.camion = (o = {}) => {
    const { w = 640, fill = P.cream, cab = P.yellow, ink = P.navy } = o;
    return svg(w, 640, 400,
      `<rect x="0" y="0" width="400" height="290" rx="22" fill="${fill}"/>
       <path d="M410,90 H540 L640,200 V290 H410 Z" fill="${cab}"/><path d="M450,120 H528 L590,196 H450 Z" fill="${ink}" opacity=".8"/>
       <rect x="0" y="280" width="640" height="34" rx="10" fill="${ink}"/>
       <circle cx="130" cy="320" r="70" fill="${ink}"/><circle cx="130" cy="320" r="28" fill="${fill}"/>
       <circle cx="510" cy="320" r="70" fill="${ink}"/><circle cx="510" cy="320" r="28" fill="${fill}"/>`);
  };
  // paire de chaussettes
  O.chaussettes = (o = {}) => {
    const { w = 420, fill = P.coral, band = P.cream } = o;
    const one = (x, r) => `<g transform="translate(${x},0) rotate(${r} 110 200)"><path d="M40,0 H180 V230 Q180,300 250,330 Q330,360 300,420 Q280,460 200,440 L80,400 Q40,385 40,330 Z" fill="${fill}"/><rect x="40" y="0" width="140" height="56" fill="${band}"/><path d="M48,300 Q60,372 120,400" fill="none" stroke="${band}" stroke-width="16" stroke-linecap="round" opacity=".7"/></g>`;
    return svg(w, 520, 470, one(0, -8) + one(190, 8));
  };
  // deux chocolats sans marque : un beau (dôme décoré) et un basique (carré)
  O.chocoBon = (o = {}) => {
    const { w = 420, dome = P.navy } = o;
    return svg(w, 420, 360,
      `<path d="M20,250 L60,360 H360 L400,250 Z" fill="${P.cream}"/>
       <g stroke="${T.cream2}" stroke-width="10"><path d="M110,262 L130,350 M210,262 V350 M310,262 L290,350"/></g>
       <path d="M40,260 Q40,20 210,20 Q380,20 380,260 Z" fill="${dome}"/>
       <path d="M90,170 Q150,110 210,170 T330,170" fill="none" stroke="${P.yellow}" stroke-width="20" stroke-linecap="round"/>
       <path d="M120,100 Q170,60 220,100 T310,100" fill="none" stroke="${P.yellow}" stroke-width="16" stroke-linecap="round"/>`);
  };
  O.chocoBasique = (o = {}) => {
    const { w = 300 } = o;
    return svg(w, 300, 240,
      `<rect x="0" y="40" width="300" height="200" rx="26" fill="${T.coral2}"/><rect x="26" y="0" width="248" height="200" rx="22" fill="${P.coral}"/>
       <rect x="56" y="30" width="188" height="140" rx="12" fill="none" stroke="${T.coral2}" stroke-width="12"/>`);
  };
  // drapeau d'arrivée
  O.drapeau = (o = {}) => {
    const { w = 420, ink = P.navy, light = P.cream } = o;
    let c = '';
    for (let r = 0; r < 4; r++) for (let k = 0; k < 5; k++) c += `<rect x="${60 + k * 68}" y="${20 + r * 60}" width="68" height="60" fill="${(r + k) % 2 ? ink : light}"/>`;
    return svg(w, 420, 560, `<rect x="60" y="20" width="340" height="240" fill="${light}"/>${c}<rect x="30" y="0" width="34" height="560" rx="17" fill="${ink}"/>`);
  };
  // paquet cadeau
  O.cadeau = (o = {}) => {
    const { w = 480, fill = P.coral, rib = P.yellow } = o;
    return svg(w, 480, 480,
      `<path d="M240,110 C140,-20 60,60 240,110 C420,60 340,-20 240,110 Z" fill="${rib}"/>
       <rect x="0" y="110" width="480" height="110" rx="16" fill="${fill}"/><rect x="34" y="220" width="412" height="260" rx="12" fill="${fill}"/>
       <rect x="34" y="220" width="412" height="30" fill="rgba(0,0,0,.2)"/><rect x="200" y="110" width="80" height="370" fill="${rib}"/>`);
  };
  // fenêtre de boutique en ligne générique
  O.ecran = (o = {}) => {
    const { w = 760, fill = P.cream, bar = P.navy, item = P.coral } = o;
    return svg(w, 760, 620,
      `<rect width="760" height="620" rx="36" fill="${fill}"/><path d="M0,36 a36,36 0 0 1 36,-36 H724 a36,36 0 0 1 36,36 V110 H0 Z" fill="${bar}"/>
       <circle cx="64" cy="56" r="18" fill="${P.coral}"/><circle cx="124" cy="56" r="18" fill="${P.yellow}"/><circle cx="184" cy="56" r="18" fill="${T.green2}"/>
       <path d="M300,210 Q380,268 460,210 L580,280 L520,370 L480,340 V550 H280 V340 L240,370 L180,280 Z" fill="${item}"/>`);
  };

  V.style = 2;        // charte validée le 26/11/2026
  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f) => { const bg = CYCLE[k++ % 5]; shot({ w, bg, scene, html: f(bg) }); };
  const dark = bg => bg === 'navy' || bg === 'green';
  // couleurs lisibles selon le fond
  const tagc = bg => (bg === 'cream' ? { fill: P.navy, ink: P.cream } : bg === 'yellow' ? { fill: P.navy, ink: P.cream } : {});
  const pan = (bg, o = {}) => O.panier({ fill: bg === 'coral' ? P.navy : P.coral, ink: P.cream, ...o });
  const cam = (bg, o = {}) => O.camion({ fill: bg === 'cream' ? P.navy : P.cream, cab: bg === 'yellow' ? P.coral : P.yellow, ink: bg === 'navy' ? T.navy2 : bg === 'cream' ? T.navy2 : P.navy, ...o });
  const msg = (bg, a, b, pct, o = {}) => O.msg(a, b, pct, bg === 'cream' ? { fill: P.navy, ink: P.cream, bar: P.yellow, ...o } : o);
  const per = (bg, o = {}) => O.person({ fill: bg === 'navy' ? P.cream : P.navy, ...o });
  const under = (y, col, d = {}) => E(540, y, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col, sw: 28, draw: d }), { a: 'none', cut: false });

  V.keywords = [11, 11, 18, 21, 28, 28, 41, 50, 55, 57, 69, 82, 90, 96, 107, 114, 120, 128, 132, 137, 143, 156, 161, 174, 182, 191, 195, 227, 227];

  /* ===== SCÈNE 1 — HOOK : « Regarde bien ce message de livraison gratuite. » ===== */
  S(0, 1, bg => [
    E(540, 560, msg(bg, 'PLUS QUE 4 €', 'pour la livraison gratuite', .88, { w: 940 }), { a: 'drop', sfx: 'thud', loop: 'float', amp: 8, per: 1.2 }),
    E(540, 1130, Tx('REGARDE BIEN', 190, 'var(--a1)'), { a: 'up', w: 0 }),
  ]);
  S(7, 1, bg => [
    E(540, 500, msg(bg, 'PLUS QUE 4 €', 'pour la livraison gratuite', .88, { w: 940 }), { a: 'none', m: [{ w: 9, s: 1.07, dur: .25 }] }),
    E(540, 960, pan(bg, { w: 400 }), { a: 'up', sfx: 'pop' }),
  ]);
  S(11, 1, bg => [
    E(540, 300, O.chaussettes({ w: 300 }), { a: 'down', dist: 400, w: 15, m: [{ w: 16, dy: 330, s: .8, dur: .4, e: 'inOut', sfx: 'thud' }] }),
    E(540, 760, pan(bg, { w: 560 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1190, Tx('+ 1 ARTICLE', 190, 'var(--a1)'), { a: 'up', w: 16, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 2 — LE TEST ===== */
  S(19, 2, bg => [
    E(540, 360, Tx('FAIS LE TEST', 190), { a: 'down', sfx: 'pop' }),
    E(290, 760, pan(bg, { w: 380 }), { a: 'left', w: 22, sfx: 'swish' }),
    E(790, 760, pan(bg, { w: 380 }), { a: 'right', w: 23 }),
    E(540, 1170, Tx('2 PANIERS', 220, 'var(--a1)'), { a: 'up', w: 22 }),
  ]);

  /* ===== SCÈNE 3 — PANIER A ===== */
  S(28, 3, bg => [
    E(540, 330, Tx('PANIER A', 230, 'var(--a1)'), { a: 'down', sfx: 'stamp' }),
    E(540, 680, pan(bg, { w: 440 }), { a: 'pop', d: .1, sfx: 'pop' }),
    E(540, 1110, O.tag('31 €', { w: 620, ...tagc(bg) }), { a: 'up', w: 30, sfx: 'thud' }),
  ]);
  S(33, 3, bg => [
    E(540, 520, cam(bg, { w: 640 }), { a: 'left', dist: 1100, sfx: 'whoosh', loop: 'float', amp: 6, per: .4 }),
    E(540, 1060, O.tag('+ 4,90 €', { w: 780, fs: 130, ...tagc(bg) }), { a: 'up', w: 34, sfx: 'thud' }),
  ]);
  S(38, 3, bg => [
    E(540, 400, Tx('TOTAL', 260), { a: 'down', sfx: 'stamp' }),
    E(540, 800, Tx(cnt({ from: 31, to: 35.9, w: 39, dur: .8, dec: 2, suf: ' €', sfx: 'tick' }), 300, 'var(--a1)'), { a: 'pop', w: 39 }),
    under(1010, P.coral, { w: 39, d: .9, dur: .35 }),
  ]);

  /* ===== SCÈNE 4 — PANIER B ===== */
  S(41, 4, bg => [
    E(540, 330, Tx('PANIER B', 230, 'var(--a1)'), { a: 'down', sfx: 'stamp' }),
    E(540, 760, pan(bg, { w: 440 }), { a: 'pop', d: .1, sfx: 'pop' }),
    E(540, 330, O.chaussettes({ w: 240 }), { a: 'down', dist: 300, w: 45, m: [{ w: 46, dy: 320, s: .8, dur: .4, e: 'inOut', sfx: 'thud' }] }),
    E(540, 1170, O.tag('+ 9 €', { w: 520, ...tagc(bg) }), { a: 'up', w: 47, sfx: 'pop' }),
  ]);
  S(50, 4, bg => [
    E(540, 540, cam(bg, { w: 660 }), { a: 'left', dist: 1100, sfx: 'whoosh', loop: 'float', amp: 6, per: .4 }),
    E(540, 1080, Tx('OFFERTE', 260, 'var(--a1)'), { a: 'up', w: 51, sfx: 'stamp' }),
  ]);
  S(52, 4, bg => [
    E(540, 400, Tx('TOTAL', 260), { a: 'down', sfx: 'stamp' }),
    E(540, 800, Tx('40 €', 340, 'var(--a1)'), { a: 'pop', w: 53, sfx: 'pop' }),
    under(1010, P.coral, { w: 53, d: .3, dur: .35 }),
  ]);
  S(55, 4, bg => [
    E(540, 400, O.tag('A : 35,90 €', { w: 800, fs: 110, ...tagc(bg) }), { a: 'left', sfx: 'pop' }),
    E(540, 720, O.tag('B : 40 €', { w: 800, fs: 120, fill: bg === 'yellow' ? P.coral : P.yellow }), { a: 'right', d: .1, m: [{ w: 62, s: 1.1, dur: .25, sfx: 'pop' }] }),
    E(540, 1130, Tx('LEQUEL ?', 240, 'var(--a1)'), { a: 'up', d: .2 }),
  ]);

  /* ===== SCÈNE 5 — LA RÉVÉLATION ===== */
  S(63, 5, bg => [
    E(540, 420, Tx('TU PAIES', 220), { a: 'down' }),
    E(540, 800, O.tag('+ 4,10 €', { w: 860, fs: 130, ...tagc(bg) }), { a: 'drop', w: 66, sfx: 'thud' }),
    E(540, 1160, Tx('DE PLUS', 220, 'var(--a1)'), { a: 'up', w: 69, sfx: 'stamp' }),
  ]);
  S(71, 5, bg => [
    E(540, 420, Tx('POUR ÉCONOMISER', 130), { a: 'down' }),
    E(540, 800, O.tag('4,90 €', { w: 820, fill: bg === 'yellow' ? P.navy : P.yellow, ink: bg === 'yellow' ? P.cream : P.navy }), { a: 'drop', w: 72, sfx: 'thud' }),
    E(540, 1170, Tx('?', 300, 'var(--a1)'), { a: 'pop', w: 73, d: .4, rot: 8, sfx: 'pop', loop: 'swing', amp: 6, per: .7 }),
  ]);
  S(75, 5, bg => [
    E(540, 560, O.chaussettes({ w: 480 }), { a: 'pop', sfx: 'pop' }),
    E(540, 560, O.cross({ w: 600, col: bg === 'navy' || bg === 'coral' || bg === 'green' ? P.cream : P.navy, draw: { w: 79, sfx: 'buzz' } }), { a: 'none', w: 79 }),
    E(540, 1130, Tx('PAS CHERCHÉES', 160, 'var(--a1)'), { a: 'up', w: 78 }),
  ]);
  k += 15;                                           // garde les fonds d'origine pour la suite

  /* ===== SCÈNE 6 — LE CERVEAU ET LE GRATUIT ===== */
  S(82, 6, bg => [
    E(540, 660, O.brain({ w: 720, fill: bg === 'cream' ? P.coral : P.cream, fold: bg === 'cream' ? P.cream : P.coral }), { a: 'pop', sfx: 'pop', loop: 'float', per: 1.2 }),
    E(540, 1170, Tx('TON CERVEAU', 180, 'var(--a1)'), { a: 'up', w: 85 }),
  ]);
  S(90, 6, bg => [
    E(540, 560, Tx('GRATUIT', 310, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 970, O.tag('0 €', { w: 560, ...tagc(bg) }), { a: 'pop', d: .25, rot: -5, sfx: 'pop' }),
  ]);
  S(92, 6, bg => [
    E(540, 520, Tx('PAS UN PRIX', 196), { a: 'down' }),
    E(540, 850, Tx('NORMAL', 290, 'var(--a1)'), { a: 'stamp', w: 94, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 7 — LES DEUX CHOCOLATS ===== */
  k++;                                               // plan « 2007 » trop court : la date est portée par le plan des chercheurs
  S(95, 7, bg => [
    E(540, 330, Tx('2007', 260, 'var(--a1)'), { a: 'down', sfx: 'tick' }),
    E(320, 760, O.person({ w: 360, fill: P.navy, coat: true, ink: P.cream }), { a: 'pop', w: 97, sfx: 'pop' }),
    E(760, 760, O.person({ w: 360, fill: P.navy, coat: true, ink: P.cream }), { a: 'pop', w: 98 }),
    E(540, 1150, O.clipboard({ w: 220 }), { a: 'up', w: 99 }),
  ]);
  S(100, 7, bg => [
    E(300, 640, O.chocoBon({ w: 400 }), { a: 'pop', sfx: 'pop' }),
    E(790, 680, O.chocoBasique({ w: 300 }), { a: 'pop', w: 101, sfx: 'pop' }),
    E(540, 1110, Tx('2 CHOCOLATS', 190, 'var(--a1)'), { a: 'up', w: 101 }),
  ]);
  S(102, 7, bg => [
    E(540, 560, O.chocoBon({ w: 600, dome: T.navy2 }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .03, per: .8 }),
    E(540, 1110, Tx('TRÈS BON', 260, 'var(--a1)'), { a: 'stamp', w: 103, sfx: 'stamp' }),
  ]);
  S(106, 7, bg => [
    E(300, 420, O.chocoBon({ w: 320 }), { a: 'none' }),
    E(600, 760, O.tag('15 c', { w: 700, ...tagc(bg) }), { a: 'drop', w: 107, sfx: 'thud' }),
    E(540, 1130, Tx('ENVIRON', 190, 'var(--a1)'), { a: 'up' }),
  ]);
  S(110, 7, bg => [
    E(540, 580, O.chocoBasique({ w: 480 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1090, Tx('BASIQUE', 280, 'var(--a1)'), { a: 'stamp', w: 111, sfx: 'stamp' }),
  ]);
  S(113, 7, bg => [
    E(300, 440, O.chocoBasique({ w: 280 }), { a: 'none' }),
    E(600, 780, O.tag('1 c', { w: 660, ...tagc(bg) }), { a: 'drop', w: 113, d: .1, sfx: 'thud' }),
  ]);
  S(115, 7, bg => [
    ...[0, 1, 2, 3].map(i => E(180 + i * 240, 720 + (i % 2) * 40, per(bg, { w: 230 }), { a: 'pop', d: i * .1, sfx: i ? undefined : 'pop' })),
    E(540, 1170, Tx('LA GRANDE MAJORITÉ', 114, 'var(--a1)'), { a: 'up', w: 116, dist: 200 }),
  ]);
  S(118, 7, bg => [
    E(330, 1060 - 300, O.bar(600, { w: 260, fill: P.yellow, grow: { dur: .5, sfx: 'rise' } }), { a: 'none' }),
    E(760, 1060 - 80, O.bar(160, { w: 260, fill: P.cream, grow: { d: .1 } }), { a: 'none' }),
    E(330, 1190, O.chocoBon({ w: 200, dome: T.navy2 }), { a: 'pop', d: .1, cut: false }),
    E(760, 1190, O.chocoBasique({ w: 170 }), { a: 'pop', d: .15, cut: false }),
    E(330, 330, O.crown({ w: 220 }), { a: 'drop', w: 120, dur: .4, sfx: 'ding' }),
  ]);
  S(121, 7, bg => [
    E(300, 520, O.arrow({ w: 300, fill: P.coral }), { a: 'down', rot: 90, sfx: 'fall' }),
    E(780, 520, O.arrow({ w: 300, fill: P.coral }), { a: 'down', d: .12, rot: 90 }),
    E(540, 1010, Tx('LES 2 PRIX', 230), { a: 'up', w: 124 }),
  ]);
  S(127, 7, bg => [
    E(290, 520, O.tag('15 c', { w: 440, ...tagc(bg) }), { a: 'none', hw: 128 }),
    E(790, 520, O.tag('1 c', { w: 440, ...tagc(bg) }), { a: 'none', hw: 128 }),
    E(290, 520, O.tag('14 c', { w: 440, fill: P.yellow }), { a: 'pop', w: 128, sfx: 'click' }),
    E(790, 520, O.tag('0 c', { w: 440, fill: P.yellow }), { a: 'pop', w: 128, d: .08 }),
    E(540, 1010, Tx('- 1 CENTIME', 210, 'var(--a1)'), { a: 'stamp', w: 128, d: .1, sfx: 'stamp' }),
  ]);
  S(129, 7, bg => [
    E(540, 400, Tx('15 - 1', 230), { a: 'left', sfx: 'swish' }),
    E(540, 640, Tx('=', 230, 'var(--a1)'), { a: 'pop', w: 130 }),
    E(540, 880, Tx('14 - 0', 230), { a: 'right', w: 130, d: .1 }),
    E(540, 1180, Tx('LE MÊME ÉCART', 150, 'var(--a1)'), { a: 'stamp', w: 132, sfx: 'stamp' }),
  ]);
  S(133, 7, bg => [
    E(540, 520, O.chocoBasique({ w: 460 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1030, O.tag('0 c', { w: 600, ...tagc(bg) }), { a: 'drop', w: 135, sfx: 'thud' }),
  ]);
  S(137, 7, bg => [
    E(540, 640, Tx('GRATUIT', 310), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .04, per: .5 }),
  ]);
  S(138, 7, bg => [
    ...[0, 1, 2, 3].map(i => E(180 + i * 240, 620 + (i % 2) * 40, per(bg, { w: 230 }), { a: 'pop', d: i * .08, sfx: i ? undefined : 'pop', m: [{ w: 140, d: i * .06, dx: 160, r: 6, dur: .4, e: 'inOut' }] })),
    E(540, 1130, Tx('LA MAJORITÉ', 200, 'var(--a1)'), { a: 'up', w: 139 }),
  ]);
  S(140, 7, bg => [
    E(330, 1060 - 90, O.bar(180, { w: 260, fill: P.cream, grow: { d: .1 } }), { a: 'none' }),
    E(760, 1060 - 300, O.bar(600, { w: 260, fill: P.yellow, grow: { dur: .5, sfx: 'rise' } }), { a: 'none' }),
    E(330, 1190, O.chocoBon({ w: 200 }), { a: 'pop', d: .1, cut: false }),
    E(760, 1190, O.chocoBasique({ w: 170 }), { a: 'pop', d: .15, cut: false }),
    E(760, 330, O.crown({ w: 220, fill: bg === 'yellow' ? P.coral : P.yellow, band: bg === 'yellow' ? T.coral2 : T.yellow2 }), { a: 'drop', w: 143, dur: .4, sfx: 'ding' }),
    E(330, 560, Tx('BASCULE', 130, 'var(--a1)'), { a: 'stamp', d: .2, rot: -8, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 8 — LE NOM, ET LA NUANCE ===== */
  S(151, 8, bg => [
    E(540, 700, Tx("ÇA S'APPELLE", 200), { a: 'stamp', sfx: 'stamp' }),
    under(880, P.coral, { d: .2, dur: .3 }),
  ]);
  S(153, 8, bg => [
    E(540, 400, Tx("L'EFFET DU", 190), { a: 'down' }),
    E(540, 680, Tx('PRIX', 300, 'var(--a1)'), { a: 'stamp', w: 155, sfx: 'stamp' }),
    E(540, 1040, Tx('ZÉRO', 400, 'var(--a1)'), { a: 'stamp', w: 156, sfx: 'stamp' }),
  ]);
  S(157, 8, bg => [
    E(540, 700, O.calendar('DEPUIS', { w: 700, fs: 150 }), { a: 'spin', sfx: 'swish', m: [{ d: .5, r: -5, dur: .2 }, { d: .75, r: 0, dur: .2 }] }),
  ]);
  S(158, 8, bg => [
    E(260, 560, O.clipboard({ w: 260 }), { a: 'pop', rot: -8, sfx: 'pop' }),
    E(540, 520, O.clipboard({ w: 260 }), { a: 'pop', d: .12 }),
    E(820, 560, O.clipboard({ w: 260 }), { a: 'pop', d: .24, rot: 8 }),
    E(540, 1080, Tx('NUANCÉ', 300, 'var(--a1)'), { a: 'stamp', w: 161, sfx: 'stamp' }),
  ]);
  S(162, 8, bg => [
    E(300, 520, O.arrow({ w: 300, fill: bg === 'coral' ? P.yellow : P.coral }), { a: 'up', rot: -90, sfx: 'rise' }),
    E(780, 560, O.arrow({ w: 300, fill: P.navy }), { a: 'down', d: .12, rot: 90 }),
    E(540, 960, Tx('ÇA DÉPEND', 240), { a: 'stamp', w: 163, sfx: 'stamp' }),
    E(540, 1200, Tx('DU CONTEXTE', 170, 'var(--a1)'), { a: 'up', w: 164 }),
  ]);

  /* ===== SCÈNE 9 — LE SITE DE MODE ===== */
  S(166, 9, bg => [
    E(540, 680, O.ecran({ w: 800, fill: bg === 'cream' ? P.navy : P.cream, bar: bg === 'navy' ? T.navy2 : bg === 'cream' ? T.navy2 : P.navy }), { a: 'pop', sfx: 'pop' }),
    E(540, 1210, Tx('SITE DE MODE', 170, 'var(--a1)'), { a: 'up', w: 169 }),
  ]);
  S(172, 9, bg => [
    E(540, 540, msg(bg, 'LIVRAISON GRATUITE', 'à partir d’un montant', .7, { w: 940 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1060, Tx('UN SEUIL', 300, 'var(--a1)'), { a: 'stamp', w: 174, sfx: 'stamp' }),
  ]);
  S(178, 9, bg => [
    ...[0, 1, 2].map(i => E(220 + i * 320, 620, per(bg, { w: 270 }), { a: 'pop', d: i * .1, sfx: i ? undefined : 'pop' })),
    ...[0, 1, 2].map(i => E(220 + i * 320, 960, pan(bg, { w: 200 }), { a: 'pop', d: .15 + i * .1 })),
    E(540, 1210, Tx('LES CLIENTS', 180, 'var(--a1)'), { a: 'up', w: 179 }),
  ]);
  S(181, 9, bg => [
    E(540, 330, Tx('ENVIRON', 170), { a: 'down' }),
    E(540, 720, Tx(cnt({ from: 0, to: 9, w: 182, dur: .5, pre: '+', suf: ' %', sfx: 'tick' }), 400, 'var(--a1)'), { a: 'pop', w: 182, m: [{ w: 182, d: .6, s: 1.08, dur: .2 }, { w: 182, d: .85, s: 1, dur: .2 }] }),
    E(540, 1130, Tx('DE PLUS', 260), { a: 'stamp', w: 184, d: .1, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 10 — LA MORALE ===== */
  S(186, 10, bg => [
    E(540, 620, O.cadeau({ w: 560, fill: bg === 'coral' ? P.navy : P.coral }), { a: 'pop', sfx: 'pop' }),
    E(540, 620, O.cross({ w: 620, col: bg === 'navy' || bg === 'coral' ? P.cream : P.navy, draw: { w: 189, sfx: 'buzz' } }), { a: 'none', w: 189 }),
    E(540, 1170, Tx('PAS UN CADEAU', 170, 'var(--a1)'), { a: 'stamp', w: 190, d: .1, sfx: 'stamp' }),
  ]);
  S(192, 10, bg => [
    E(540, 620, O.drapeau({ w: 520, ink: bg === 'navy' ? T.navy2 : P.navy }), { a: 'drop', sfx: 'thud', loop: 'swing', amp: 3, per: .9 }),
    E(540, 1190, Tx("LIGNE D'ARRIVÉE", 148, 'var(--a1)'), { a: 'up', w: 194 }),
  ]);
  S(196, 10, bg => [
    E(540, 900, O.line('M20,20 H900', { w: 920, vw: 920, vh: 40, col: bg === 'navy' ? P.cream : P.navy, sw: 16, draw: { dur: .5 } }), { a: 'none', cut: false }),
    E(230, 720, pan(bg, { w: 300 }), { a: 'pop', sfx: 'pop' }),
    E(560, 640, O.drapeau({ w: 260, ink: bg === 'navy' ? T.navy2 : P.navy }), { a: 'pop', d: .1, m: [{ w: 197, dx: 150, dur: .3, sfx: 'swish' }, { w: 199, dx: 300, dur: .35, sfx: 'swish' }] }),
    E(540, 1150, Tx('UN PEU PLUS LOIN', 136, 'var(--a1)'), { a: 'up', w: 198 }),
  ]);

  // phrase déplacée ici : « Et le gratuit, c'est ce que tu as payé le plus cher. »
  S(204, 10, bg => [
    E(540, 420, O.tag('0 €', { w: 520, ...tagc(bg) }), { a: 'pop', rot: -5, sfx: 'pop' }),
    ...[0, 1, 2].map(i => E(320 + i * 220, 800 - (i % 2) * 40, O.coin('€', { w: 220, small: '' }), { a: 'drop', w: 210, d: i * .14, dur: .45, sfx: i ? undefined : 'coin' })),
    E(540, 1170, Tx('PAYÉ LE PLUS CHER', 124, 'var(--a1)'), { a: 'up', w: 212, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 11 — BOUCLE : on revient sur le message du premier plan ===== */
  S(216, 11, bg => [
    E(540, 400, Tx('LA PROCHAINE FOIS', 124), { a: 'down' }),
    E(540, 820, pan(bg, { w: 480 }), { a: 'up', w: 218, sfx: 'pop' }),
  ]);
  S(222, 11, bg => [
    E(540, 560, msg(bg, 'PLUS QUE 4 €', 'pour la livraison gratuite', .88, { w: 940 }), { a: 'drop', sfx: 'thud', loop: 'float', amp: 8, per: 1.2 }),
    E(540, 1130, Tx('TROIS FOIS RIEN…', 140, 'var(--a1)'), { a: 'up', w: 222 }),
  ]);
})();
