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

  V.style = 2;        // charte validée le 26/11/2026
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

  V.keywords = [7, 12, 15, 22, 26, 33, 42, 47, 58, 63, 72, 76, 92, 101, 114, 118, 122, 132, 135, 145, 162, 192, 200, 204, 210, 224, 227];

  /* ===== SCÈNE 1 — HOOK : « Pourquoi tu oublies toujours de résilier l'essai gratuit ? » ===== */
  S(0, 1, bg => [
    E(540, 520, phone(bg, { w: 380, cta: 'ESSAI GRATUIT' }), { a: 'up', dist: 900, sfx: 'whoosh', loop: 'swing', amp: 2.5, per: 1.2 }),
    E(540, 1040, Tx('TU OUBLIES', 190), { a: 'up', w: 1 }),
    E(540, 1210, Tx('DE RÉSILIER ?', 150, 'var(--a1)'), { a: 'up', w: 4, sfx: 'pop' }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(8, 2, bg => [
    E(540, 600, O.brain({ w: 620, fill: P.coral, fold: P.cream }), { a: 'pop', sfx: 'pop', loop: 'float', per: 1.2 }),
    E(540, 600, O.cross({ w: 560, col: P.navy, sw: 54, draw: { w: 10, sfx: 'buzz' } }), { a: 'none', w: 10 }),
    E(540, 1150, Tx('PAS TA MÉMOIRE', 150), { a: 'up', w: 9 }),
  ]);
  S(13, 2, bg => [
    E(540, 600, O.pill({ w: 640, fill: T.navy2 }), { a: 'pop' }),
    E(540, 600, O.pill({ w: 640 }), { a: 'fade', w: 14, dur: .15, cut: false }),
    E(392, 600, O.disc({ w: 236 }), { a: 'pop', m: [{ w: 14, dx: 296, dur: .25, sfx: 'click' }] }),
    E(540, 1040, Tx('UN RÉGLAGE', 210, 'var(--a1)'), { a: 'up', w: 14, sfx: 'stamp' }),
  ]);
  S(16, 2, bg => [
    E(250, 620, who(bg, { w: 320 }), { a: 'left', m: [{ w: 17, dx: 580, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(830, 620, O.person({ w: 320, fill: bg === 'navy' ? P.coral : P.navy }), { a: 'right', m: [{ w: 17, dx: -580, dur: .5, e: 'inOut' }] }),
    E(540, 1110, Tx('À LA PLACE DU PATRON', 108, 'var(--a1)'), { a: 'up', w: 18 }),
  ]);
  k += 6;                                            // garde les fonds d'origine pour la suite

  /* ===== SCÈNE 3 — TU ES LE PATRON ===== */
  S(22, 3, bg => [
    E(540, 760, who(bg, { w: 440 }), { a: 'pop', sfx: 'pop' }),
    E(540, 330, crown(bg), { a: 'drop', w: 26, dur: .45, sfx: 'ding' }),
    E(540, 1210, Tx('LE PATRON', 220, 'var(--a1)'), { a: 'stamp', w: 26, sfx: 'stamp' }),
  ]);
  S(26, 3, bg => [
    ...[0, 1, 2, 3, 4].map(i => E(180 + i * 180, 700 + (i % 2) * 60, who(bg, { w: 190 }), { a: 'pop', d: i * .1, sfx: i ? undefined : 'pop' })),
    E(540, 1130, Tx('+ ABONNÉS', 230, 'var(--a1)'), { a: 'stamp', w: 29, sfx: 'stamp' }),
  ]);
  S(30, 3, bg => [
    E(300, 600, btn(bg, '1', { w: 400, fs: 150 }), { a: 'pop', w: 32, sfx: 'pop', rot: -5 }),
    E(780, 600, btn(bg, '2', { w: 400, fs: 150 }), { a: 'pop', w: 32, d: .15, sfx: 'pop', rot: 5 }),
    E(540, 1050, Tx('2 BOUTONS', 240, 'var(--a1)'), { a: 'stamp', w: 33, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 4 — BOUTON 1 ===== */
  S(34, 4, bg => [
    E(540, 560, btn(bg, '1', { w: 760, fs: 150 }), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1020, Tx('BOUTON 1', 260, 'var(--a1)'), { a: 'up', w: 36 }),
  ]);
  S(36, 4, bg => [
    E(540, 560, O.rect(820, 60, 'rgba(20,33,61,.2)', 30), { a: 'none', cut: false }),
    E(540, 560, O.line('M30,30 H790', { w: 820, vw: 820, vh: 60, col: P.coral, sw: 60, draw: { dur: 1.0, sfx: 'rise' } }), { a: 'none', cut: false }),
    E(540, 400, Tx('7 JOURS', 150), { a: 'down' }),
    E(540, 960, Tx("FIN DE L'ESSAI", 150, 'var(--a1)'), { a: 'stamp', w: 40, sfx: 'stamp' }),
  ]);
  S(41, 4, bg => [
    E(540, 620, O.rect(520, 520, P.coral, 60), { a: 'stamp', w: 42, sfx: 'stamp' }),
    E(540, 620, Tx('STOP', 230, P.cream), { a: 'stamp', w: 42, cut: false }),
    E(540, 1150, Tx("TOUT S'ARRÊTE", 170, 'var(--a1)'), { a: 'up', w: 42, d: .15 }),
    E(540, 300, Tx('TOUT…', 180), { a: 'down', hw: 42 }),
  ]);
  S(43, 4, bg => [
    E(300, 900, who(bg, { w: 400 }), { a: 'left', sfx: 'pop' }),
    E(700, 480, O.bubble({ w: 560, fill: P.navy }), { a: 'pop', w: 45, sfx: 'pop' }),
    E(700, 400, Tx('…', 260, P.cream), { a: 'pop', w: 46, cut: false }),
  ]);
  S(47, 4, bg => [
    E(540, 620, Tx('OUI', 620, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1130, O.check({ w: 260, col: P.navy, draw: { d: .3, sfx: 'pop' } }), { a: 'none', d: .3 }),
  ]);
  S(49, 4, bg => [
    E(540, 560, O.arrow({ w: 560 }), { a: 'left', sfx: 'whoosh', loop: 'float', per: .8 }),
    E(540, 1000, Tx('POUR CONTINUER', 150), { a: 'up', d: .08 }),
  ]);

  /* ===== SCÈNE 5 — BOUTON 2 ===== */
  S(50, 5, bg => [
    E(540, 560, btn(bg, '2', { w: 760, fs: 150 }), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1020, Tx('BOUTON 2', 260, 'var(--a1)'), { a: 'up', w: 52 }),
  ]);
  S(52, 5, bg => [
    E(540, 560, O.rect(820, 60, 'rgba(244,235,217,.25)', 30), { a: 'none', cut: false }),
    E(540, 560, O.line('M30,30 H790', { w: 820, vw: 820, vh: 60, col: P.coral, sw: 60, draw: { dur: 1.0, sfx: 'rise' } }), { a: 'none', cut: false }),
    E(540, 400, Tx('7 JOURS', 150), { a: 'down' }),
    E(540, 960, Tx("FIN DE L'ESSAI", 150, 'var(--a1)'), { a: 'stamp', w: 56, sfx: 'stamp' }),
  ]);
  S(57, 5, bg => [
    E(540, 420, Tx('TOUT CONTINUE', 170), { a: 'stamp', w: 58, sfx: 'stamp' }),
    ...[0, 1, 2].map(i => E(240, 900, O.coin('€', { w: 220, small: '' }), { a: 'pop', w: 57, d: i * .22, m: [{ w: 57, d: i * .22 + .1, dx: 620, dy: -60 + i * 30, dur: .5, e: 'inOut', sfx: 'coin' }] })),
    E(860, 900, O.box('', { w: 300, fill: P.navy }), { a: 'pop' }),
  ]);
  S(59, 5, bg => [
    E(300, 900, who(bg, { w: 400 }), { a: 'left', sfx: 'pop' }),
    E(700, 480, O.bubble({ w: 560, fill: P.navy }), { a: 'pop', w: 61, sfx: 'pop' }),
    E(700, 400, Tx('…', 260, P.cream), { a: 'pop', w: 62, cut: false }),
  ]);
  S(63, 5, bg => [
    E(540, 620, Tx('NON', 600, 'var(--a2)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1130, O.cross({ w: 240, col: P.cream, sw: 50, draw: { d: .3, sfx: 'pop' } }), { a: 'none', d: .3 }),
  ]);
  S(65, 5, bg => [
    E(540, 560, O.rect(360, 360, P.coral, 44), { a: 'pop', sfx: 'pop' }),
    E(540, 1000, Tx('POUR ARRÊTER', 170), { a: 'up', d: .08 }),
  ]);

  /* ===== SCÈNE 6 — LA SEULE DIFFÉRENCE ===== */
  S(66, 6, bg => [
    E(300, 560, O.tag('9,99 €', { w: 440, fs: 130 }), { a: 'left', rot: -5 }),
    E(780, 560, O.tag('9,99 €', { w: 440, fs: 130 }), { a: 'right', rot: 5 }),
    E(540, 1000, Tx('MÊME PRIX', 210, 'var(--a1)'), { a: 'stamp', w: 67, sfx: 'stamp' }),
  ]);
  S(68, 6, bg => [
    E(300, 620, phone(bg, { w: 330 }), { a: 'pop', sfx: 'pop' }),
    E(780, 620, phone(bg, { w: 330 }), { a: 'pop', d: .1 }),
    E(540, 1160, Tx('MÊME SERVICE', 165, 'var(--a1)'), { a: 'stamp', w: 69, sfx: 'stamp' }),
  ]);
  S(70, 6, bg => [
    E(540, 560, Tx('LA SEULE', 230), { a: 'down' }),
    E(540, 860, Tx('DIFFÉRENCE', 215, 'var(--a1)'), { a: 'stamp', w: 72, sfx: 'stamp' }),
    under(1030, P.navy, { w: 72, d: .25, dur: .3 }),
  ]);
  S(73, 6, bg => [
    E(320, 620, who(bg, { w: 340 }), { a: 'left', m: [{ w: 75, dx: 120, dur: .6, e: 'inOut' }] }),
    E(700, 700, O.box('', { w: 360, fill: P.yellow, ink: P.yellow }), { a: 'pop', m: [{ w: 75, dx: 120, dur: .6, e: 'inOut', sfx: 'swish' }] }),
    E(540, 1150, Tx("L'EFFORT ?", 250, 'var(--a1)'), { a: 'stamp', w: 76, sfx: 'stamp' }),
    E(540, 310, Tx('QUI FAIT…', 170), { a: 'down' }),
  ]);

  /* ===== SCÈNE 7 — L'EXPÉRIENCE DU JOURNAL ===== */
  S(82, 7, bg => [
    E(540, 640, O.news({ w: 600 }), { a: 'drop', sfx: 'thud', rot: -4 }),
    E(540, 1200, Tx('EUROPÉEN', 190, 'var(--a1)'), { a: 'up', w: 84 }),
  ]);
  S(85, 7, bg => [
    E(300, 520, btn(bg, '1', { w: 400, fs: 150 }), { a: 'pop', sfx: 'pop' }),
    E(780, 520, btn(bg, '2', { w: 400, fs: 150 }), { a: 'pop', d: .12 }),
    E(540, 960, Tx('TESTÉS', 300, 'var(--a1)'), { a: 'stamp', w: 86, sfx: 'stamp' }),
  ]);
  S(89, 7, bg => [
    E(540, 560, Tx(cnt({ from: 0, to: 2, w: 92, dur: .5, sfx: 'tick' }), 620), { a: 'pop' }),
    E(540, 960, Tx('MILLIONS', 260, 'var(--a1)'), { a: 'stamp', w: 92, sfx: 'stamp' }),
    E(540, 1200, Tx('DE LECTEURS', 150), { a: 'up', w: 94 }),
  ]);
  S(95, 7, bg => [
    E(540, 480, btn(bg, '1', { w: 560, fs: 150 }), { a: 'pop', sfx: 'pop' }),
    E(540, 900, O.rect(300, 300, P.navy, 40), { a: 'stamp', w: 97, sfx: 'stamp' }),
    E(540, 1200, Tx('ARRÊT AUTO', 190, 'var(--a1)'), { a: 'up', w: 98 }),
  ]);
  S(100, 7, bg => [
    ...Array.from({ length: 10 }, (_, i) => E(140 + (i % 5) * 200, 480 + Math.floor(i / 5) * 300, O.person({ w: 170, fill: i === 7 ? P.yellow : T.green2 }), { a: 'pop', d: i * .04 })),
    E(540, 1150, Tx('PRESQUE PERSONNE', 120, 'var(--a1)'), { a: 'stamp', w: 101, sfx: 'stamp' }),
    E(540, 630, O.cross({ w: 560, col: P.coral, sw: 50, draw: { w: 103, d: .1, sfx: 'buzz' } }), { a: 'none', w: 103, d: .1 }),
  ]);
  S(105, 7, bg => [
    E(540, 480, btn(bg, '2', { w: 560, fs: 150 }), { a: 'pop', sfx: 'pop' }),
    E(540, 900, O.arrow({ w: 420, fill: P.navy }), { a: 'left', w: 107, sfx: 'whoosh', loop: 'float', per: .7 }),
    E(540, 1200, Tx('SUITE AUTO', 190, 'var(--a1)'), { a: 'up', w: 108 }),
  ]);
  S(110, 7, bg => [
    ...Array.from({ length: 10 }, (_, i) => E(140 + (i % 5) * 200, 420 + Math.floor(i / 5) * 300, O.person({ w: 170, fill: i % 2 ? P.yellow : T.navy2 }), { a: 'pop', d: i * .04, m: i % 2 ? [{ w: 114, s: 1.15, dur: .25 }] : [] })),
    E(540, 1130, Tx('LA MOITIÉ', 250, 'var(--a1)'), { a: 'stamp', w: 114, sfx: 'stamp' }),
  ]);
  S(115, 7, bg => [
    E(540, 560, O.tag('PLEIN TARIF', { w: 820, fill: P.navy, ink: P.cream, fs: 100 }), { a: 'drop', sfx: 'thud' }),
    ...[0, 1, 2].map(i => E(300 + i * 240, 1050, O.coin('€', { w: 200, small: '' }), { a: 'drop', w: 117, d: i * .12, dur: .45, sfx: i ? undefined : 'coin' })),
  ]);
  S(119, 7, bg => [
    E(540, 560, Tx('LE PLUS', 240), { a: 'down' }),
    E(540, 900, Tx('ÉTRANGE', 270, 'var(--a1)'), { a: 'stamp', w: 122, sfx: 'stamp', loop: 'swing', amp: 2.5, per: .5 }),
  ]);
  S(123, 7, bg => [
    ...[0, 1, 2].map(i => E(280 + i * 260, 640, who(bg, { w: 240 }), { a: 'pop', d: i * .12, sfx: i ? undefined : 'pop' })),
    E(540, 1100, Tx('LES ABONNÉS EN +', 135, 'var(--a1)'), { a: 'up', w: 124 }),
  ]);
  S(127, 7, bg => [
    E(540, 620, O.news({ w: 560 }), { a: 'pop', sfx: 'pop' }),
    E(540, 620, O.cross({ w: 600, col: P.coral, sw: 56, draw: { w: 129, sfx: 'buzz' } }), { a: 'none', w: 129 }),
    E(540, 1190, Tx('JAMAIS LU', 230, 'var(--a1)'), { a: 'stamp', w: 131, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 8 — L'INERTIE ===== */
  S(133, 8, bg => [
    E(540, 440, Tx("ÇA S'APPELLE", 170), { a: 'down' }),
    E(540, 800, Tx("L'INERTIE", 290, 'var(--a1)'), { a: 'stamp', w: 135, sfx: 'stamp' }),
    under(990, P.coral, { w: 135, d: .25, dur: .3 }),
  ]);
  S(136, 8, bg => [
    E(540, 900, O.rect(900, 60, P.navy, 20), { a: 'none' }),
    E(480, 720, who(bg, { w: 300 }), { a: 'pop', rot: 90, sfx: 'pop' }),
    E(760, 420, Tx('Z', 200, 'var(--a1)'), { a: 'pop', w: 137 }),
    E(880, 300, Tx('Z', 130, 'var(--a1)'), { a: 'pop', w: 138 }),
    E(540, 1150, Tx('NE RIEN FAIRE', 180), { a: 'up', w: 137 }),
  ]);
  S(139, 8, bg => [
    E(540, 620, Tx('LE CHOIX', 300), { a: 'stamp', w: 142, sfx: 'stamp' }),
    E(540, 300, Tx('TOUJOURS', 170, 'var(--a1)'), { a: 'down', w: 140 }),
    E(540, 1000, O.arrow({ w: 300, fill: P.navy }), { a: 'down', rot: 90, sfx: 'fall' }),
  ]);
  S(143, 8, bg => [
    E(540, 600, Tx('LE + FACILE', 220, 'var(--a1)'), { a: 'stamp', w: 144, sfx: 'stamp' }),
    E(540, 1010, O.check({ w: 300, col: P.cream, draw: { w: 145, sfx: 'pop' } }), { a: 'none', w: 145 }),
  ]);
  S(146, 8, bg => [
    E(540, 760, who(bg, { w: 420 }), { a: 'pop', sfx: 'pop' }),
    E(540, 350, crown(bg), { a: 'drop', dur: .45, d: .1, sfx: 'ding' }),
    E(540, 1200, Tx('CELUI QUI DÉCIDE', 130, 'var(--a1)'), { a: 'up', w: 149 }),
  ]);
  S(150, 8, bg => [
    E(540, 560, O.pill({ w: 640, fill: T.navy2 }), { a: 'pop' }),
    E(540, 560, O.pill({ w: 640 }), { a: 'fade', w: 154, dur: .15, cut: false }),
    E(392, 560, O.disc({ w: 236 }), { a: 'pop', m: [{ w: 154, dx: 296, dur: .25, sfx: 'click' }] }),
    E(540, 960, Tx('SI TU NE FAIS RIEN', 125), { a: 'up', w: 155 }),
    E(540, 1170, Tx('PAR DÉFAUT', 200, 'var(--a1)'), { a: 'stamp', w: 158, sfx: 'stamp' }),
  ]);
  S(159, 8, bg => [
    E(540, 520, Tx('DÉCIDE', 300), { a: 'stamp', sfx: 'stamp' }),
    E(540, 900, Tx('À TA PLACE', 215, 'var(--a1)'), { a: 'stamp', w: 161, sfx: 'stamp' }),
  ]);

  // passage ajouté : « Toi, tu avais prévu d'annuler. Tu avais même mis un rappel. Puis la journée est passée. »
  S(163, 8, bg => [
    E(540, 600, phone(bg, { w: 440, cta: 'ANNULER' }), { a: 'pop', sfx: 'pop' }),
    E(540, 1140, Tx("PRÉVU D'ANNULER", 150, 'var(--a1)'), { a: 'up', w: 165 }),
  ]);
  S(168, 8, bg => [
    E(540, 620, O.calendar('RAPPEL', { w: 640 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1150, Tx('UN RAPPEL', 220, 'var(--a1)'), { a: 'up', w: 171 }),
  ]);
  S(174, 8, bg => [
    E(540, 600, O.clock({ w: 520 }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .03, per: .6 }),
    E(540, 1130, Tx('JOURNÉE PASSÉE', 150, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);

  /* ===== SCÈNE 9 — LA CARTE REMPLACÉE ===== */
  S(179, 9, bg => [
    E(540, 600, O.clipboard({ w: 440 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1130, Tx('AUTRE ÉTUDE', 200, 'var(--a1)'), { a: 'up', w: 180 }),
  ]);
  S(184, 9, bg => [
    E(540, 480, O.eye({ w: 600 }), { a: 'pop', sfx: 'pop', m: [{ w: 185, dy: 20, s: 1.06, dur: .2 }] }),
    E(540, 1000, O.magnifier({ w: 380, ring: P.cream }), { a: 'left', w: 184, sfx: 'whoosh' }),
  ]);
  S(187, 9, bg => [
    E(540, 620, O.bcard({ w: 780 }), { a: 'drop', w: 188, sfx: 'thud', rot: -5 }),
    E(540, 1130, Tx('TA CARTE', 240, 'var(--a1)'), { a: 'up', w: 189 }),
  ]);
  S(191, 9, bg => [
    E(540, 600, O.bcard({ w: 700, fill: P.cream, ink: P.navy }), { a: 'none', rot: -5, m: [{ w: 192, dx: -1200, r: -30, dur: .4, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 600, O.bcard({ w: 700, fill: P.yellow, ink: P.navy }), { a: 'right', dist: 1200, w: 192, d: .15, rot: 5 }),
    E(540, 1100, Tx('REMPLACÉE', 195, 'var(--a1)'), { a: 'stamp', w: 192, d: .3, sfx: 'stamp' }),
  ]);
  S(193, 9, bg => [
    ...[0, 1, 2, 3].map(i => E(180 + i * 240, 600, Tx('••••', 150), { a: 'pop', w: 196, d: i * .14, sfx: 'click' })),
    E(540, 330, Tx('TON NUMÉRO', 180, 'var(--a1)'), { a: 'down', w: 194 }),
    E(540, 1000, O.bcard({ w: 520 }), { a: 'up', rot: 4 }),
  ]);
  S(199, 9, bg => [
    E(300, 520, btn(bg, 'OUI', { w: 420, fs: 120 }), { a: 'pop', sfx: 'pop', rot: -4 }),
    E(780, 520, btn(bg, 'NON', { w: 420, fs: 120, fill: P.navy, ink: P.cream }), { a: 'pop', d: .12, rot: 4 }),
    E(540, 960, Tx('CHOISIR', 320, 'var(--a1)'), { a: 'stamp', w: 200, sfx: 'stamp' }),
  ]);
  S(201, 9, bg => [
    E(540, 760, Tx('RÉSULTAT', 250, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    under(950, P.coral, { d: .2, dur: .3 }),
  ]);
  S(202, 9, bg => [
    E(540, 540, O.line('M20,420 H280 C330,420 330,60 380,50 H620', { w: 860, vw: 640, vh: 470, col: P.coral, sw: 30, draw: { w: 203, dur: .6, sfx: 'rise' } }), { a: 'none' }),
    E(540, 1130, Tx('RÉSILIATIONS', 180), { a: 'stamp', w: 203, d: .1, sfx: 'stamp', m: [{ w: 204, d: .3, s: 1.1, dur: .2 }, { w: 204, d: .55, s: 1, dur: .2 }] }),
  ]);
  const cher = () => O.person({ w: 340, fill: P.yellow, coat: true, ink: P.cream });
  S(205, 9, bg => [
    E(320, 760, cher(), { a: 'pop', sfx: 'pop' }),
    E(760, 760, cher(), { a: 'pop', d: .14 }),
    E(540, 1180, O.clipboard({ w: 200 }), { a: 'up', w: 207 }),
  ]);
  S(208, 9, bg => [
    E(540, 520, O.eye({ w: 560 }), { a: 'pop', sfx: 'pop' }),
    E(540, 520, O.line('M20,20 H640', { w: 660, vw: 660, vh: 40, col: P.coral, sw: 40, draw: { w: 209, dur: .25, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(540, 1040, Tx('INATTENTION', 195), { a: 'up', w: 209 }),
  ]);
  S(210, 9, bg => [
    E(540, 700, Tx('×2', 700, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .6 }),
  ]);
  S(214, 9, bg => [
    E(330, 1000 - 130, O.bar(260, { w: 240, grow: { d: 0 } }), { a: 'none' }),
    E(750, 1000 - 260, O.bar(520, { w: 240, fill: P.yellow, grow: { w: 215, dur: .6, sfx: 'rise' } }), { a: 'none' }),
    E(750, 390, O.coin('€', { w: 200, small: '' }), { a: 'drop', w: 217, dur: .45, sfx: 'coin' }),
    E(540, 1150, Tx('REVENUS', 240, 'var(--a1)'), { a: 'stamp', w: 215, d: .2, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 10 — QUESTION ===== */
  S(219, 10, bg => [
    E(300, 560, btn(bg, '1', { w: 420, fs: 150 }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .06, per: .8 }),
    E(780, 560, btn(bg, '2', { w: 420, fs: 150 }), { a: 'pop', d: .12, loop: 'pulse', amp: .06, per: .8, ld: .4 }),
    E(540, 1010, Tx('QUEL BOUTON ?', 160, 'var(--a1)'), { a: 'stamp', w: 223, sfx: 'stamp' }),
    E(540, 300, Tx('ALORS, PATRON', 150), { a: 'down' }),
  ]);
  // boucle : on revient sur le téléphone du premier plan
  S(225, 10, bg => [
    E(540, 520, phone(bg, { w: 380, cta: 'ESSAI GRATUIT' }), { a: 'up', dist: 900, sfx: 'whoosh', loop: 'swing', amp: 2.5, per: 1.2 }),
    E(540, 1110, Tx('MAINTENANT, TU SAIS…', 112, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
})();
