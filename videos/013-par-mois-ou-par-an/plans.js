/* Vidéo 013 — « 4,99 € par mois ou 60 € par an »
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;

  /* ----- objets propres à cette vidéo ----- */
  // calculatrice
  O.calc = (o = {}) => {
    const { w = 480, fill = P.navy, key = P.cream, scr = P.green, ink = P.cream } = o;
    let k = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) k += `<rect x="${44 + c * 82}" y="${196 + r * 82}" width="62" height="62" rx="12" fill="${c === 3 ? P.coral : key}"/>`;
    return svg(w, 400, 540, `<rect width="400" height="540" rx="36" fill="${fill}"/><rect x="36" y="36" width="328" height="120" rx="14" fill="${scr}"/>
      <text x="340" y="126" text-anchor="end" font-size="90" fill="${ink}">× 12</text>${k}`);
  };
  // gobelet de café
  O.cup = (o = {}) => {
    const { w = 420, fill = P.cream, band = P.coral, lid = P.navy } = o;
    return svg(w, 400, 520, `<g fill="none" stroke="${fill}" stroke-width="14" stroke-linecap="round" opacity=".8"><path d="M150,10 q-24,34 0,68"/><path d="M250,0 q-24,40 0,80"/></g>
      <path d="M60,150 H340 L300,520 H100 Z" fill="${fill}"/><path d="M76,290 H324 L308,420 H92 Z" fill="${band}"/>
      <rect x="36" y="104" width="328" height="56" rx="20" fill="${lid}"/>`);
  };
  // croissant
  O.croissant = (o = {}) => {
    const { w = 400, fill = T.yellow2, ink = P.cream } = o;
    return svg(w, 420, 300, `<path d="M20,240 C10,90 130,10 210,10 C290,10 410,90 400,240 C390,290 330,290 320,240 C315,170 270,130 210,130 C150,130 105,170 100,240 C90,290 30,290 20,240 Z" fill="${fill}"/>
      <g stroke="${ink}" stroke-width="12" stroke-linecap="round" opacity=".7"><path d="M120,70 L150,140 M210,24 V120 M300,70 L270,140"/></g>`);
  };
  // sac de courses plein
  O.bag = (o = {}) => {
    const { w = 460, fill = P.cream } = o;
    return svg(w, 460, 540, `<rect x="250" y="0" width="60" height="260" rx="30" fill="${T.yellow2}" transform="rotate(14 280 130)"/>
      <rect x="120" y="60" width="110" height="200" rx="18" fill="${T.green2}"/><circle cx="330" cy="170" r="62" fill="${P.coral}"/>
      <path d="M40,200 H420 L390,540 H70 Z" fill="${fill}"/><path d="M150,200 q0,-70 80,-70 t80,70" fill="none" stroke="${fill}" stroke-width="18"/>
      <rect x="40" y="200" width="380" height="40" fill="rgba(0,0,0,.14)"/>`);
  };
  // téléphone générique
  O.phone = (o = {}) => {
    const { w = 420, fill = P.navy, screen = P.cream } = o;
    return svg(w, 420, 760, `<rect width="420" height="760" rx="56" fill="${fill}"/><rect x="26" y="26" width="368" height="708" rx="34" fill="${screen}"/>
      <rect x="150" y="44" width="120" height="22" rx="11" fill="${fill}"/>
      <g>${[0, 1, 2].map(i => `<rect x="60" y="${120 + i * 196}" width="300" height="160" rx="22" fill="${[P.coral, T.green2, P.yellow][i]}"/>`).join('')}</g>`);
  };

  // bloc-notes du chercheur (planche de couleur, lisible sur fond clair)
  O.bloc = (o = {}) => {
    const { w = 420, fill = P.navy, page = P.cream, clip = P.coral } = o;
    return svg(w, 200, 260, `<rect width="200" height="260" rx="16" fill="${fill}"/><rect x="18" y="34" width="164" height="208" rx="6" fill="${page}"/>
      <rect x="62" y="-12" width="76" height="46" rx="10" fill="${clip}"/>
      <g stroke="${fill}" stroke-width="9" stroke-linecap="round" opacity=".7"><path d="M40,90 H160 M40,130 H160 M40,170 H120"/></g>`);
  };

  /* ----- aides de couleur selon le fond ----- */
  V.style = 2;        // charte validée le 26/11/2026
  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f, d) => { const bg = CYCLE[k++ % 5]; shot({ w, d, bg, scene, html: f(bg) }); };
  const light = bg => bg === 'cream' || bg === 'yellow';
  const fg = bg => (light(bg) ? P.navy : P.cream);
  const alt = bg => (bg === 'coral' ? P.navy : P.coral);
  const T1 = (bg, txt, o = {}) => O.tag(txt, { ...(bg === 'cream' ? { fill: P.navy, ink: P.cream } : {}), ...o });
  const T2 = (bg, txt, o = {}) => O.tag(txt, { fill: P.yellow, ...o });
  const NV = { fill: T.green2, ink: P.navy };          // billet turquoise, encre indigo
  const NC = { fill: P.cream, ink: P.navy };           // billet blanc
  const who = bg => (light(bg) ? P.navy : P.cream);
  const cher = (bg, o = {}) => O.person({ fill: bg === 'navy' ? P.yellow : P.navy, coat: true, ink: light(bg) ? T.cream2 : P.cream, ...o });
  const cup = (bg, o = {}) => O.cup({ fill: bg === 'cream' ? P.navy : P.cream, band: bg === 'coral' ? P.yellow : P.coral, lid: bg === 'navy' ? P.yellow : bg === 'cream' ? T.navy2 : P.navy, ...o });
  const under = (y, col, an) => E(540, y, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col, sw: 28, draw: an }), { a: 'none', cut: false });
  // les deux étiquettes de l'accroche, reprises telles quelles dans la boucle
  const SW = { org: '8% 50%', loop: 'swing', amp: 5 };
  const tagMois = (an = {}) => E(300, 420, O.tag('4,99 €', { w: 470, sub: 'PAR MOIS', fs: 130 }), { a: 'none', ...SW, per: 1.1, ...an });
  const tagAn = (an = {}) => E(740, 660, O.tag('60 €', { w: 470, sub: 'PAR AN', fs: 130, fill: P.yellow }), { a: 'none', ...SW, per: 1.3, ...an });

  V.keywords = [6, 7, 11, 16, 24, 29, 32, 33, 35, 40, 45, 47, 49, 56, 61, 67, 72, 75, 79, 87, 93, 97, 106, 110, 113, 121, 124, 133, 139, 147, 154, 158, 166, 179, 186, 190, 199, 202, 206, 216];

  /* ===== SCÈNE 1 — HOOK : les deux étiquettes sont à l'écran dès la première image ===== */
  S(0, 1, bg => [
    tagMois({ sfx: 'swish' }),
    tagAn(),
    E(540, 1010, Tx('TU CROIS CHOISIR', 120), { a: 'up', d: .05 }),
  ]);
  S(4, 1, bg => [
    tagMois(),
    tagAn(),
    E(540, 1010, Tx('TU CROIS CHOISIR', 120), { a: 'none' }),
    E(540, 1200, Tx('LE MOINS CHER', 150, 'var(--a1)'), { a: 'up', sfx: 'stamp' }),
  ]);
  /* RETAINER : les mêmes étiquettes, l'une puis l'autre grossit */
  S(7, 1, bg => [
    tagMois({ loop: null, m: [{ d: .05, s: 1.2, dur: .35, sfx: 'rise' }] }),
    tagAn({ loop: null, m: [{ d: .05, s: .85, dur: .35 }] }),
    E(540, 1100, Tx('4,99 € PAR MOIS', 140, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(10, 1, bg => [
    tagMois({ loop: null, m: [{ d: .05, s: .85, dur: .35 }] }),
    tagAn({ loop: null, m: [{ d: .05, s: 1.1, dur: .35, sfx: 'rise' }] }),
    E(540, 1100, Tx('OU 60 € PAR AN ?', 125, 'var(--a1)'), { a: 'down', d: .1 }),
  ]);
  S(14, 2, bg => [
    E(540, 600, O.calc({ w: 500 }), { a: 'pop', sfx: 'pop', m: [{ w: 17, r: -5, dur: .2 }, { w: 17, d: .25, r: 0, dur: .2 }] }),
    E(540, 1180, Tx('FAIS LE CALCUL', 150, 'var(--a1)'), { a: 'up', d: .2 }),
  ]);

  /* ===== SCÈNE 2 — POURQUOI LE PREMIER PARAÎT LÉGER ===== */
  S(19, 2, bg => [
    E(540, 600, T2(bg, '4,99 €', { w: 640, sub: 'PAR MOIS', fs: 130 }), { a: 'up', dist: 700, loop: 'float', amp: 34, per: 1.2, sfx: 'rise' }),
    E(540, 1130, Tx('PLUS LÉGER', 200, 'var(--a1)'), { a: 'down', w: 23, sfx: 'stamp' }),
  ]);
  // phrase ajoutée : « Normal : cinq euros, c'est presque rien. » — le billet reste, puis rapetisse
  S(25, 2, bg => [
    E(540, 620, O.note('5 €', { w: 760, fs: 150, fill: P.green }), { a: 'spin', sfx: 'pop' }),
    E(540, 1130, Tx('NORMAL', 260), { a: 'up', d: .1 }),
  ]);
  S(27, 2, bg => [
    E(540, 620, O.note('5 €', { w: 760, fs: 150, fill: P.green }), { a: 'none', m: [{ d: .05, s: .45, dur: .45, e: 'inOut', sfx: 'fall' }] }),
    E(540, 1130, Tx('PRESQUE RIEN', 165, 'var(--a1)'), { a: 'down', d: .1 }),
  ]);

  /* ===== SCÈNE 3 — LE CALCUL ===== */
  S(30, 3, bg => [
    E(540, 500, Tx('4,99', 400), { a: 'up', sfx: 'stamp' }),
    E(540, 960, Tx('× 12', 400, 'var(--a1)'), { a: 'down', w: 31, d: -.1, sfx: 'stamp' }),
  ]);
  S(33, 3, bg => [
    E(540, 330, Tx('4,99 × 12 =', 170), { a: 'none' }),
    E(540, 720, Tx(cnt({ from: 0, to: 59.88, dec: 2, dur: .8, suf: ' €', sfx: 'tick' }), 280, 'var(--a1)'), { a: 'pop', d: .05, m: [{ d: .9, s: 1.08, dur: .18 }, { d: 1.12, s: 1, dur: .2 }] }),
    under(915, P.navy, { d: .9, dur: .3 }),
    E(540, 1130, Tx('PAR AN', 220), { a: 'up', d: .9, sfx: 'stamp' }),
  ]);
  // « 12 centimes d'écart. C'est le même prix. » : le billet et l'étiquette restent, le signe égal arrive
  S(34, 3, bg => [
    E(540, 380, O.note('59,88 €', { w: 560, fs: 105, ...NV }), { a: 'left', sfx: 'swish' }),
    E(540, 800, T2(bg, '60 €', { w: 560 }), { a: 'right', d: .1 }),
    E(540, 1140, Tx('12 CENTIMES', 180, 'var(--a1)'), { a: 'up', d: .2, sfx: 'coin' }),
  ]);
  S(37, 3, bg => [
    E(540, 380, O.note('59,88 €', { w: 560, fs: 105, ...NV }), { a: 'none' }),
    E(540, 800, T2(bg, '60 €', { w: 560 }), { a: 'none' }),
    E(540, 585, Tx('=', 200), { a: 'pop', d: .05, sfx: 'pop' }),
    E(540, 1140, Tx('LE MÊME PRIX', 170, 'var(--a1)'), { a: 'down', d: .1 }),
  ]);
  S(41, 3, bg => [
    E(300, 860, O.person({ w: 400, fill: P.navy }), { a: 'left' }),
    E(740, 480, T2(bg, '60 €', { w: 500, sub: 'PAR AN', fs: 130 }), { a: 'drop', d: .1, rot: 5, sfx: 'thud' }),
    E(760, 900, Tx('?', 360), { a: 'pop', w: 42, rot: 8, loop: 'swing', amp: 7, per: .7, sfx: 'pop' }),
  ]);
  S(46, 3, bg => [
    E(540, 560, T2(bg, '4,99 €', { w: 620, sub: 'PAR MOIS', fs: 130 }), { a: 'left', dist: 1000, m: [{ w: 47, d: .05, dx: 1200, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1080, Tx('ÇA PASSE', 250, 'var(--a1)'), { a: 'up', d: .12 }),
  ]);

  /* ===== SCÈNE 4 — L'ÉTUDE DE 1998 ===== */
  S(48, 4, bg => [
    E(540, 720, Tx(cnt({ from: 1980, to: 1998, d: .2, dur: .5, sfx: 'tick' }), 440), { a: 'pop', m: [{ d: .8, s: 1.07, dur: .2 }, { d: 1.05, s: 1, dur: .2 }] }),
    under(990, P.coral, { d: .75, dur: .3 }),
  ]);
  S(50, 4, bg => [
    E(400, 640, cher(bg, { w: 400 }), { a: 'right', sfx: 'pop' }),
    E(790, 820, O.clipboard({ w: 240 }), { a: 'up', d: .1 }),
    E(540, 1210, Tx('UN CHERCHEUR', 150, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  S(54, 4, bg => [
    E(300, 620, T1(bg, '?', { w: 400 }), { a: 'pop', m: [{ w: 56, dx: 480, dur: .4, e: 'inOut', sfx: 'swish' }] }),
    E(780, 620, T2(bg, '?', { w: 400 }), { a: 'pop', d: .08, m: [{ w: 56, dx: -480, dur: .4, e: 'inOut' }] }),
    E(540, 1110, Tx('TOUR DE PASSE-PASSE', 100, 'var(--a1)'), { a: 'down', d: .12 }),
  ]);
  // « Il présente la même dépense de deux façons » : le billet reste, puis se dédouble
  S(57, 4, bg => [
    E(540, 600, O.note('€', { w: 480, fs: 150, ...NC }), { a: 'drop', sfx: 'thud' }),
    E(540, 1110, Tx('MÊME DÉPENSE', 160, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(61, 4, bg => [
    E(540, 600, O.note('€', { w: 480, fs: 150, ...NC }), { a: 'none', m: [{ d: .08, dx: -255, r: -5, dur: .4, e: 'inOut', sfx: 'swish' }] }),
    E(540, 600, O.note('€', { w: 480, fs: 150, ...NC }), { a: 'none', m: [{ d: .08, dx: 255, r: 5, dur: .4, e: 'inOut' }] }),
    E(540, 1110, Tx('2 FAÇONS', 230, 'var(--a1)'), { a: 'down', d: .12 }),
  ], .1);
  S(65, 4, bg => [
    E(540, 600, O.note('€€€', { w: 900, fs: 160, fill: P.navy, ink: P.cream }), { a: 'drop', sfx: 'thud' }),
    E(540, 1110, Tx('UN GROS MONTANT', 130, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  S(70, 4, bg => [
    ...[0, 1, 2, 3, 4].map(i => E(180 + i * 180, 600 + (i % 2) * 60, O.coin('1', { w: 170 }), { a: 'drop', d: .1 + i * .13, dur: .45, sfx: 'coin' })),
    E(540, 1100, Tx('QUELQUES PIÈCES', 130, 'var(--a1)'), { a: 'up', w: 71 }),
  ]);
  // « Découpée, elle est mieux acceptée. » : les morceaux restent, la coche arrive
  const PX = i => 240 + i * 120 + (i - 2.5) * 36, PY = i => 640 + (i % 2 ? 40 : -40), PR = i => (i - 2.5) * 5;
  S(75, 4, bg => [
    ...[0, 1, 2, 3, 4, 5].map(i => E(240 + i * 120, 640, O.rect(116, 300, P.navy, 10), { a: 'none', m: [{ d: .12 + i * .04, dx: (i - 2.5) * 36, dy: (i % 2 ? 40 : -40), r: PR(i), dur: .35, sfx: i ? undefined : 'swish' }] })),
    E(540, 1100, Tx('DÉCOUPÉE', 230, 'var(--a1)'), { a: 'up', d: .2 }),
  ]);
  S(78, 4, bg => [
    ...[0, 1, 2, 3, 4, 5].map(i => E(PX(i), PY(i), O.rect(116, 300, P.navy, 10), { a: 'none', rot: PR(i) })),
    E(540, 300, O.check({ w: 220, col: P.yellow, draw: { d: .25, sfx: 'pop' } }), { a: 'none' }),
    E(540, 1100, Tx('MIEUX ACCEPTÉE', 140, 'var(--a1)'), { a: 'down', d: .08 }),
  ]);
  S(80, 4, bg => [
    E(280, 800, cher(bg, { w: 340 }), { a: 'left' }),
    E(700, 480, O.bubble({ w: 560, fill: P.cream }), { a: 'pop', d: .1, sfx: 'pop' }),
    E(700, 440, O.coin('1', { w: 200 }), { a: 'spin', d: .3, cut: false }),
    E(540, 1210, Tx('SA STRATÉGIE', 160, 'var(--a1)'), { a: 'up', w: 82 }),
  ]);
  S(86, 4, bg => [
    ...[0, 1, 2].map(i => E(300 + i * 240, 440, O.coin('1', { w: 210 }), { a: 'drop', d: i * .1, dur: .45, sfx: i ? undefined : 'coin' })),
    E(540, 800, Tx('QUELQUES CENTIMES', 115), { a: 'up', d: .1 }),
    E(540, 1080, Tx('PAR JOUR', 250, 'var(--a1)'), { a: 'up', w: 87 }),
  ]);

  /* ===== SCÈNE 5 — L'EXPLICATION ===== */
  S(90, 5, bg => [
    E(540, 600, O.burst({ w: 900, n: 12, col: P.coral }), { a: 'pop', loop: 'spin', per: 6, cut: false }),
    E(540, 600, O.bulb({ w: 380, ink: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(540, 1150, Tx('SON EXPLICATION', 130), { a: 'up', d: .1 }),
  ]);
  S(92, 5, bg => [
    E(430, 560, O.brain({ w: 500, fill: P.navy, fold: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(730, 700, O.magnifier({ w: 400, ring: P.coral }), { a: 'right', w: 94, sfx: 'whoosh', loop: 'float', amp: 16, per: 1 }),
    E(540, 1130, Tx('À QUOI COMPARER ?', 120, 'var(--a1)'), { a: 'up', w: 95 }),
  ]);
  // « 60 euros, tu les compares à un plein de courses. » : l'étiquette monte, le sac arrive dessous
  S(98, 5, bg => [
    E(540, 700, O.tag('60 €', { w: 860 }), { a: 'drop', sfx: 'thud', m: [{ w: 101, dy: -340, s: .6, dur: .4, e: 'inOut', sfx: 'swish' }] }),
  ]);
  S(102, 5, bg => [
    E(540, 360, O.tag('60 €', { w: 516 }), { a: 'none' }),
    E(540, 590, Tx('=', 200), { a: 'pop', d: .05, sfx: 'pop' }),
    E(540, 960, O.bag({ w: 440 }), { a: 'up', d: .1, sfx: 'thud' }),
  ]);
  S(107, 5, bg => [
    E(540, 700, T2(bg, '4,99 €', { w: 860 }), { a: 'spin', sfx: 'pop', m: [{ w: 108, dy: -340, s: .6, dur: .3, e: 'inOut', sfx: 'swish' }] }),
  ]);
  S(109, 5, bg => [
    E(540, 360, T2(bg, '4,99 €', { w: 516 }), { a: 'none' }),
    E(540, 590, Tx('=', 200), { a: 'pop', d: .05 }),
    E(330, 960, cup(bg, { w: 300 }), { a: 'left', d: .1, sfx: 'pop' }),
    E(760, 1000, O.croissant({ w: 380, ink: P.navy }), { a: 'right', w: 111, d: -.08, sfx: 'pop' }),
  ]);
  // « Et un café, ça ne se discute pas. Tu dis oui sans y penser. » : le gobelet reste, le tampon OUI tombe
  const CAFE = { w: 440, fill: P.cream, band: P.yellow, lid: P.navy };
  S(114, 5, bg => [
    E(400, 620, O.cup(CAFE), { a: 'pop', sfx: 'pop', m: [{ w: 116, s: 1.06, dur: .15 }, { w: 116, d: .25, s: 1, dur: .2 }] }),
    E(850, 400, O.check({ w: 220, col: P.green, draw: { sfx: 'pop' } }), { a: 'none', w: 118 }),
    E(540, 1160, Tx('ÇA NE SE DISCUTE PAS', 100, 'var(--a1)'), { a: 'up', w: 117 }),
  ]);
  S(122, 5, bg => [
    E(400, 620, O.cup(CAFE), { a: 'none' }),
    E(840, 420, O.stamp('OUI', { w: 400, col: P.navy, fs: 170, h: 250 }), { a: 'stamp', w: 123, rot: 8, sfx: 'stamp' }),
    E(540, 1160, Tx('SANS Y PENSER', 150, 'var(--a1)'), { a: 'down', w: 125, d: -.05 }),
  ]);
  S(128, 5, bg => [
    E(540, 330, Tx('TU NE JUGES PLUS', 120), { a: 'down' }),
    E(540, 780, O.tag('PRIX', { w: 760, fill: P.navy, ink: P.cream }), { a: 'left', d: .1 }),
    E(540, 780, O.cross({ w: 420, sw: 40, col: P.coral, draw: { sfx: 'buzz' } }), { a: 'none', w: 130, d: .2 }),
  ]);
  S(134, 5, bg => [
    E(540, 310, Tx('TU JUGES', 200), { a: 'up' }),
    E(380, 700, O.rect(560, 380, P.navy, 18), { a: 'pop', d: .08 }),
    E(860, 840, O.rect(150, 100, P.coral, 12), { a: 'spin', w: 137, sfx: 'pop', loop: 'pulse', amp: .1, per: .5 }),
    E(540, 1160, Tx('LA TAILLE DU MORCEAU', 100, 'var(--a1)'), { a: 'up', w: 136 }),
  ]);

  /* ===== SCÈNE 6 — LA LIMITE ===== */
  // « Cinq ans plus tard, il ajoute une limite. » : le calendrier reste
  S(140, 6, bg => [
    E(540, 640, O.calendar('+ 5 ANS', { w: 640, fs: 150 }), { a: 'spin', sfx: 'swish' }),
  ]);
  S(144, 6, bg => [
    E(540, 640, O.calendar('+ 5 ANS', { w: 640, fs: 150 }), { a: 'none', m: [{ d: .05, dy: -60, s: .88, dur: .35, e: 'inOut' }] }),
    E(540, 1160, Tx('UNE LIMITE', 200, 'var(--a1)'), { a: 'up', d: .08, sfx: 'stamp' }),
  ], .1);
  S(148, 6, bg => [
    ...[0, 1, 2, 3].map(i => E(540 + (i % 2 ? 30 : -30), 1080 - i * 170, O.note('€', { w: 520, ...NC }), { a: 'drop', d: i * .1, dur: .4, rot: i % 2 ? 5 : -5, sfx: i % 2 ? undefined : 'thud' })),
    E(540, 310, Tx('GROSSE SOMME', 155, 'var(--a1)'), { a: 'down', d: .15 }),
  ]);
  S(153, 6, bg => [
    E(540, 520, O.arrow({ w: 520, fill: P.cream }), { a: 'pop', m: [{ w: 154, r: 180, dur: .35, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1010, Tx("S'INVERSE", 220, 'var(--a1)'), { a: 'up', d: .25 }),
  ], -.2);
  S(155, 6, bg => [
    E(540, 600, O.bloc({ w: 420 }), { a: 'left', sfx: 'pop', m: [{ w: 157, r: -4, dur: .2 }] }),
    E(540, 1150, Tx('SON EXEMPLE', 180, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  // « 11,50 dollars par jour passe moins bien que… » : le billet reste, la croix tombe dessus
  S(158, 6, bg => [
    E(540, 560, O.note('11,50 $', { w: 860, fs: 150, ...NV }), { a: 'drop', sfx: 'thud' }),
    E(540, 1090, Tx('PAR JOUR', 250, 'var(--a1)'), { a: 'up', d: .35 }),
  ]);
  S(162, 6, bg => [
    E(540, 560, O.note('11,50 $', { w: 860, fs: 150, ...NV }), { a: 'none' }),
    E(540, 560, O.cross({ w: 380, sw: 40, col: P.coral, draw: { d: .1, sfx: 'buzz' } }), { a: 'none' }),
    E(540, 1090, Tx('PASSE MOINS BIEN', 125, 'var(--a1)'), { a: 'down', d: .08 }),
  ]);
  S(166, 6, bg => [
    E(540, 560, O.note('4 200 $', { w: 860, fs: 150, ...NC }), { a: 'right', sfx: 'thud', m: [{ w: 168, s: 1.06, dur: .15 }, { w: 168, d: .2, s: 1, dur: .2 }] }),
    E(540, 1090, Tx('PAR AN', 250, 'var(--a1)'), { a: 'up', d: .5 }),
  ]);
  // « Parce que là, ça ne ressemble plus à un café. » : le gobelet reste, la croix arrive
  const CAFE2 = { w: 440, fill: P.navy, band: P.coral, lid: T.navy2 };
  S(170, 6, bg => [
    E(540, 640, O.cup(CAFE2), { a: 'spin', sfx: 'pop', m: [{ w: 172, s: 1.08, dur: .15 }, { w: 172, d: .2, s: 1, dur: .2 }] }),
  ]);
  S(173, 6, bg => [
    E(540, 640, O.cup(CAFE2), { a: 'none' }),
    E(540, 660, O.cross({ w: 520, col: P.coral, draw: { d: .1, sfx: 'buzz' } }), { a: 'none' }),
    E(540, 1170, Tx('PLUS UN CAFÉ', 170, 'var(--a1)'), { a: 'up', w: 175 }),
  ]);
  // « Le découpage marche sur les petites sommes. » : les morceaux restent, la coche arrive
  const QX = i => 165 + i * 150, QY = i => 620 + (i % 2) * 50;
  S(180, 6, bg => [
    ...[0, 1, 2, 3, 4, 5].map(i => E(QX(i), QY(i), O.rect(116, 300, P.yellow, 10), { a: 'drop', d: i * .06, dur: .4, rot: PR(i), sfx: i % 3 ? undefined : 'thud' })),
    E(540, 1110, Tx('LE DÉCOUPAGE', 160, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  S(184, 6, bg => [
    ...[0, 1, 2, 3, 4, 5].map(i => E(QX(i), QY(i), O.rect(116, 300, P.yellow, 10), { a: 'none', rot: PR(i) })),
    E(540, 300, O.check({ w: 220, col: P.green, draw: { d: .2, sfx: 'pop' } }), { a: 'none' }),
    E(540, 1110, Tx('PETITES SOMMES', 140, 'var(--a1)'), { a: 'down', d: .08 }),
  ]);
  S(187, 6, bg => [
    E(540, 600, O.phone({ w: 400, fill: P.navy, screen: P.cream }), { a: 'up', sfx: 'pop' }),
    E(250, 420, O.tag('/ MOIS', { w: 300, fs: 110 }), { a: 'pop', d: .3, rot: -8, sfx: 'pop' }),
    E(840, 620, O.tag('/ MOIS', { w: 300, fs: 110, fill: P.yellow }), { a: 'pop', d: .45, rot: 7 }),
    E(250, 820, O.tag('/ MOIS', { w: 300, fs: 110 }), { a: 'pop', d: .6, rot: -5 }),
    E(540, 1200, Tx('ABONNEMENTS', 180, 'var(--a1)'), { a: 'up', w: 188 }),
  ]);

  /* ===== SCÈNE 7 — LE GESTE, PUIS LA BOUCLE ===== */
  // « Alors quand tu lis « par mois », multiplie par douze. » : l'étiquette reste
  const MOIS = { w: 860, fs: 120, fill: P.navy, ink: P.cream };
  S(191, 7, bg => [
    E(540, 350, O.eye({ w: 340 }), { a: 'pop', sfx: 'pop' }),
    E(540, 760, O.tag('PAR MOIS', MOIS), { a: 'drop', w: 194, sfx: 'thud' }),
  ]);
  S(197, 7, bg => [
    E(540, 330, Tx('MULTIPLIE', 190), { a: 'down' }),
    E(540, 760, O.tag('PAR MOIS', MOIS), { a: 'none' }),
    E(540, 1140, Tx('× 12', 300, 'var(--a1)'), { a: 'up', d: .25, sfx: 'stamp' }),
  ]);
  // phrase ajoutée : « Le vrai prix, c'est celui de l'année. »
  S(200, 7, bg => [
    E(540, 330, Tx('LE VRAI PRIX', 165), { a: 'down', d: .05 }),
    E(540, 740, O.tag('60 €', { w: 820 }), { a: 'spin', d: .1, sfx: 'pop', m: [{ w: 206, s: 1.06, dur: .15 }, { w: 206, d: .2, s: 1, dur: .2 }] }),
    E(540, 1150, Tx('PAR AN', 250, 'var(--a1)'), { a: 'up', w: 203, d: -.1 }),
  ]);
  // boucle : les deux étiquettes reviennent, et l'on retrouve l'image du tout premier plan
  shot({ w: 207, bg: 'coral', scene: 7, html: [
    tagMois({ a: 'down', dist: 700, sfx: 'swish' }),
    tagAn({ a: 'down', dist: 700, d: .12 }),
    E(540, 1010, Tx('DEVANT DEUX PRIX', 120), { a: 'up', d: .1 }),
  ] });
  shot({ w: 212, bg: 'navy', scene: 7, html: [
    tagMois(),
    tagAn(),
    E(540, 1010, Tx('DÉCOUPÉS EN', 120), { a: 'up' }),
    E(540, 1200, Tx('PETITS MORCEAUX…', 120, 'var(--a1)'), { a: 'up', w: 214 }),
  ] });
})();
