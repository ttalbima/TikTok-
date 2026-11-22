/* Vidéo 010 — « Pourquoi tu craques toujours à la caisse ? »
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;

  /* ----- objets propres à cette vidéo ----- */
  // chariot générique
  O.cart = (o = {}) => {
    const { w = 520, fill = P.cream, ink = P.navy, full = false } = o;
    return svg(w, 520, 440,
      `${full ? `<rect x="170" y="20" width="110" height="110" rx="12" fill="${P.coral}"/><rect x="290" y="-10" width="120" height="140" rx="12" fill="${P.yellow}"/><rect x="220" y="-50" width="100" height="90" rx="12" fill="${T.green2}"/>` : ''}
       <path d="M20,50 H100 L160,300" fill="none" stroke="${ink}" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
       <path d="M120,110 H500 L450,300 H165 Z" fill="${fill}"/>
       <g stroke="${ink}" stroke-width="8" opacity=".35"><path d="M210,110 L230,300 M300,110 V300 M390,110 L372,300 M135,175 H482 M150,240 H466"/></g>
       <circle cx="210" cy="380" r="36" fill="${ink}"/><circle cx="410" cy="380" r="36" fill="${ink}"/>
       <circle cx="210" cy="380" r="12" fill="${fill}"/><circle cx="410" cy="380" r="12" fill="${fill}"/>`);
  };
  // barre chocolatée générique
  O.candy = (o = {}) => {
    const { w = 420, fill = P.coral, band = P.yellow } = o;
    return svg(w, 420, 130,
      `<path d="M60,5 L0,25 L28,65 L0,105 L60,125 H360 L420,105 L392,65 L420,25 L360,5 Z" fill="${fill}"/>
       <rect x="150" y="5" width="120" height="120" fill="${band}"/>`);
  };
  // paquet de chewing-gums
  O.gum = (o = {}) => {
    const { w = 240, fill = P.cream } = o;
    return svg(w, 240, 140,
      `<rect width="240" height="140" rx="18" fill="${fill}"/><rect y="40" width="240" height="60" fill="${T.green2}"/>
       <g fill="${P.cream}"><rect x="40" y="58" width="36" height="24" rx="6"/><rect x="102" y="58" width="36" height="24" rx="6"/><rect x="164" y="58" width="36" height="24" rx="6"/></g>`);
  };
  // paquet de chips
  O.chips = (o = {}) => {
    const { w = 300, fill = P.yellow, band = P.coral } = o;
    return svg(w, 300, 380,
      `<path d="M20,0 H280 L262,30 Q300,190 262,350 L280,380 H20 L38,350 Q0,190 38,30 Z" fill="${fill}"/>
       <ellipse cx="150" cy="190" rx="92" ry="70" fill="${band}"/><rect x="38" y="20" width="224" height="14" fill="rgba(0,0,0,.18)"/><rect x="38" y="346" width="224" height="14" fill="rgba(0,0,0,.18)"/>`);
  };
  // présentoir de caisse
  O.rack = (o = {}) => {
    const { w = 420, fill = P.navy, empty = false } = o;
    const cols = [P.coral, P.yellow, T.green2, P.cream];
    let items = '';
    if (!empty) for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++)
      items += `<rect x="${44 + c * 116}" y="${44 + r * 170}" width="96" height="96" rx="12" fill="${cols[(r * 2 + c) % 4]}"/>`;
    return svg(w, 420, 560,
      `<rect width="420" height="560" rx="20" fill="${fill}"/>${items}
       <g fill="rgba(255,255,255,.28)"><rect x="20" y="150" width="380" height="22" rx="6"/><rect x="20" y="320" width="380" height="22" rx="6"/><rect x="20" y="490" width="380" height="22" rx="6"/></g>`);
  };
  // main
  O.palm = (o = {}) => {
    const { w = 460, fill = P.cream } = o;
    return svg(w, 460, 260,
      `<rect x="0" y="80" width="260" height="110" fill="${fill}"/><rect x="200" y="30" width="250" height="200" rx="70" fill="${fill}"/>
       <ellipse cx="290" cy="34" rx="62" ry="38" fill="${fill}"/><rect x="0" y="70" width="70" height="130" fill="${T.navy2}"/>`);
  };
  // tapis de caisse
  O.belt = (o = {}) => {
    const { w = 960 } = o;
    let ch = '';
    for (let i = 0; i < 9; i++) ch += `<path d="M${60 + i * 100},30 l30,30 l-30,30" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="12" stroke-linecap="round"/>`;
    return svg(w, 960, 120, `<rect width="960" height="120" rx="24" fill="${T.navy2}"/>${ch}`);
  };
  // dé
  O.dice = (o = {}) => {
    const { w = 360 } = o;
    const d = [[110, 80], [250, 80], [110, 180], [250, 180], [110, 280], [250, 280]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="30" fill="${P.navy}"/>`).join('');
    return svg(w, 360, 360, `<rect width="360" height="360" rx="56" fill="${P.cream}"/>${d}`);
  };
  // magasin
  O.shop = (o = {}) => {
    const { w = 300, fill = P.cream, aw = P.coral } = o;
    let st = '';
    for (let i = 0; i < 5; i++) st += `<path d="M${i * 60},90 h60 v60 a30,30 0 0 1 -60,0 Z" fill="${i % 2 ? P.cream : aw}"/>`;
    return svg(w, 300, 360,
      `<rect x="14" y="80" width="272" height="280" fill="${fill}"/><rect x="0" y="40" width="300" height="56" rx="8" fill="${P.navy}"/>${st}
       <rect x="110" y="230" width="80" height="130" fill="${P.navy}"/><rect x="34" y="210" width="56" height="70" fill="${T.navy2}"/><rect x="210" y="210" width="56" height="70" fill="${T.navy2}"/>`);
  };
  // rayonnage
  O.shelf = (o = {}) => {
    const { w = 700 } = o;
    const cols = [P.coral, P.yellow, T.green2, P.cream, P.coral, P.yellow];
    let it = '';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) it += `<rect x="${30 + c * 108}" y="${20 + r * 170}" width="${70 + ((r + c) % 3) * 12}" height="110" rx="10" fill="${cols[(r + c) % 6]}"/>`;
    return svg(w, 700, 520, `${it}<g fill="${P.navy}"><rect y="130" width="700" height="26" rx="8"/><rect y="300" width="700" height="26" rx="8"/><rect y="470" width="700" height="26" rx="8"/></g>`);
  };

  const flip = h => `<div style="transform:scaleX(-1)">${h}</div>`;
  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f, d) => { const bg = CYCLE[k++ % 5]; shot({ w, d, bg, scene, html: f(bg) }); };
  const light = bg => bg === 'cream' || bg === 'yellow';
  const fg = bg => (light(bg) ? P.navy : P.cream);                       // objet contrasté
  const candy = (bg, o = {}) => O.candy(bg === 'coral' ? { fill: P.navy, ...o } : o);
  const who = (bg, i = 0) => [fg(bg), bg === 'yellow' ? P.coral : P.yellow, bg === 'coral' ? P.navy : P.coral][i % 3];
  const rack = (bg, o = {}) => O.rack({ fill: bg === 'navy' ? T.navy2 : P.navy, ...o });
  const tagc = bg => (light(bg) ? { fill: P.navy, ink: P.cream } : {});

  V.keywords = [6, 12, 13, 17, 24, 33, 37, 53, 58, 64, 68, 69, 74, 80, 89, 94, 100, 103, 115, 126, 142, 143, 152, 155, 165, 169, 172, 186, 202, 202];

  /* ===== SCÈNE 1 — HOOK ===== */
  S(0, 1, bg => [
    E(540, 1010, O.rect(980, 70, T.navy2, 14), { a: 'none' }),
    E(160, 800, O.person({ w: 202, fill: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(380, 800, O.person({ w: 202, fill: P.yellow }), { a: 'pop', d: .1 }),
    E(600, 800, O.person({ w: 202, fill: P.coral }), { a: 'pop', d: .2 }),
    E(880, 850, O.register({ w: 300 }), { a: 'pop', d: .3 }),
    ...[0, 1, 2, 3].map(i => E(170 + i * 240, 1180, O.candy({ w: 184 }), { a: 'pop', d: .1 + i * .05, rot: i % 2 ? 6 : -6 })),
    E(540, 400, Tx('POURQUOI', 220), { a: 'down', d: .05 }),
  ]);
  S(2, 1, bg => [
    E(540, 560, Tx('TU CRAQUES', 200), { a: 'stamp', sfx: 'stamp' }),
    E(540, 980, O.candy({ w: 720, fill: P.coral, band: P.navy }), { a: 'up', d: .1, rot: -8, sfx: 'whoosh' }),
  ]);
  S(4, 1, bg => [
    E(540, 620, O.register({ w: 680, fill: P.navy }), { a: 'pop', sfx: 'kaching' }),
    E(540, 1150, Tx('À LA CAISSE ?', 150, 'var(--a1)'), { a: 'up', w: 5 }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(7, 2, bg => [
    E(540, 620, O.cart({ w: 620, full: true }), { a: 'left', sfx: 'whoosh' }),
    E(840, 380, O.check({ w: 220, col: P.yellow, draw: { w: 9, sfx: 'pop' } }), { a: 'none', w: 9 }),
    E(540, 1130, Tx('TU AS TENU', 200, 'var(--a1)'), { a: 'up', w: 8 }),
  ]);
  S(10, 2, bg => [
    E(540, 620, O.shelf({ w: 820 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1160, Tx('TOUT LE MAGASIN', 140), { a: 'up', w: 11 }),
  ]);
  S(13, 2, bg => [
    E(540, 520, Tx('ET TU', 240), { a: 'down' }),
    E(540, 820, Tx('LÂCHES', 340, 'var(--a1)'), { a: 'stamp', w: 13, sfx: 'stamp' }),
  ]);
  S(13, 2, bg => [
    E(540, 700, O.rect(860, 70, P.cream, 14), { a: 'left', sfx: 'swish' }),
    E(880, 560, O.pin({ w: 194 }), { a: 'drop', w: 13, sfx: 'thud' }),
    E(540, 1010, Tx('DERNIER MÈTRE', 150, 'var(--a1)'), { a: 'stamp', w: 13, d: .1 }),
  ]);
  S(13, 2, bg => [
    E(540, 600, O.dice({ w: 420 }), { a: 'spin', sfx: 'pop' }),
    E(540, 600, O.cross({ w: 520, draw: { w: 15, sfx: 'buzz' } }), { a: 'none', w: 15 }),
    E(540, 1080, Tx('PAS UN HASARD', 150, 'var(--a1)'), { a: 'up', w: 15 }),
  ]);
  S(18, 2, bg => [
    E(540, 620, O.clipboard({ w: 460 }), { a: 'pop', sfx: 'pop' }),
    E(540, 660, O.stamp('PREUVE', { w: 660, fs: 150 }), { a: 'stamp', w: 20, rot: -8, sfx: 'stamp' }),
  ]);
  S(22, 2, bg => [
    E(540, 560, Tx('%', 620, 'var(--a1)'), { a: 'spin', sfx: 'pop', loop: 'pulse', amp: .04, per: .7 }),
    E(540, 1080, Tx('1 CHIFFRE', 230), { a: 'stamp', w: 24, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — DANS LA FILE ===== */
  S(25, 3, bg => [
    ...[0, 1, 2, 3].map(i => E(170 + i * 245, 760, O.person({ w: 230, fill: i === 1 ? P.yellow : fg(bg) }), { a: 'right', d: i * .1, sfx: i ? undefined : 'pop' })),
    E(415, 400, O.arrow({ w: 184, fill: P.coral }), { a: 'down', w: 27, rot: 90 }),
    E(540, 1150, Tx('DANS LA FILE', 190, 'var(--a1)'), { a: 'up', w: 27 }),
  ]);
  S(30, 3, bg => [
    E(540, 660, O.cart({ w: 700, full: true, fill: light(bg) ? P.navy : P.cream, ink: light(bg) ? P.coral : P.navy }), { a: 'left', sfx: 'whoosh' }),
    E(540, 1140, Tx('PLEIN', 320, 'var(--a1)'), { a: 'stamp', w: 33, sfx: 'stamp' }),
  ]);
  S(34, 3, bg => [
    E(540, 600, O.clipboard({ w: 480 }), { a: 'drop', sfx: 'thud' }),
    E(540, 640, O.check({ w: 300, draw: { w: 37, sfx: 'pop' } }), { a: 'none', w: 37 }),
    E(540, 1130, Tx('LISTE FINIE', 190, 'var(--a1)'), { a: 'up', w: 36 }),
  ]);
  S(38, 3, bg => [
    ...[0, 1, 2].map(i => E(240 + i * 300, 680, O.person({ w: 270, fill: who(bg, i) }), { a: 'pop', w: 40, d: i * .12, sfx: 'pop' })),
    E(540, 330, Tx('DEVANT TOI', 170), { a: 'down' }),
    E(540, 1130, Tx('3 PERSONNES', 170, 'var(--a1)'), { a: 'up', w: 40, d: .2 }),
  ]);
  S(42, 3, bg => [
    E(300, 600, O.eye({ w: 400, px: -.7 }), { a: 'pop', sfx: 'pop', m: [{ w: 44, dx: 30, dur: .25 }, { w: 44, d: .3, dx: -30, dur: .25 }] }),
    E(780, 600, O.eye({ w: 400, px: .7 }), { a: 'pop', d: .08, m: [{ w: 44, dx: 30, dur: .25 }, { w: 44, d: .3, dx: -30, dur: .25 }] }),
    E(540, 1060, Tx('TES YEUX', 240, 'var(--a1)'), { a: 'up', w: 43 }),
  ]);
  S(45, 3, bg => [
    E(300, 620, O.magnifier({ w: 440, ring: fg(bg) }), { a: 'left', sfx: 'whoosh', m: [{ w: 46, dx: 380, dur: .5, e: 'inOut' }, { w: 48, dx: 120, dy: 60, dur: .4, e: 'inOut' }] }),
    E(540, 1090, Tx('QUELQUE CHOSE…', 140, 'var(--a1)'), { a: 'up', w: 46 }),
  ]);

  /* ===== SCÈNE 4 — LES PRÉSENTOIRS ===== */
  S(50, 4, bg => [
    E(540, 400, O.arrow({ w: 380, fill: fg(bg) }), { a: 'right', rot: 180, sfx: 'whoosh' }),
    ...[0, 1, 2].map(i => E(260 + i * 280, 800 + (i % 2) * 60, O.gum({ w: 250 }), { a: 'pop', w: 52, d: i * .1, rot: (i - 1) * 8, sfx: i ? undefined : 'pop' })),
    E(540, 1150, Tx('À GAUCHE', 200), { a: 'up', w: 51 }),
  ]);
  S(54, 4, bg => [
    E(540, 400, O.arrow({ w: 380, fill: fg(bg) }), { a: 'left', sfx: 'whoosh' }),
    ...[0, 1, 2].map(i => E(540, 700 + i * 150, candy(bg, { w: 560 }), { a: 'pop', w: 56, d: i * .1, rot: (i - 1) * 5, sfx: i ? undefined : 'pop' })),
    E(540, 1210, Tx('À DROITE', 190, 'var(--a1)'), { a: 'up', w: 55, dist: 200 }),
  ]);
  S(59, 4, bg => [
    E(300, 760, rack(bg, { w: 460 }), { a: 'up', sfx: 'pop' }),
    E(780, 760, Tx('PILE', 300, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(62, 4, bg => [
    E(250, 720, rack(bg, { w: 420 }), { a: 'none' }),
    E(760, 720, flip(O.palm({ w: 480, fill: fg(bg) })), { a: 'right', w: 63, sfx: 'whoosh', m: [{ w: 64, dx: -90, dur: .25 }] }),
    E(540, 1170, Tx('À HAUTEUR DE MAIN', 120, 'var(--a1)'), { a: 'up', d: .05, dist: 200 }),
  ]);
  S(65, 4, bg => [
    E(540, 520, O.eye({ w: 520 }), { a: 'pop', sfx: 'pop' }),
    E(540, 980, Tx('LES PRIX', 260, 'var(--a1)'), { a: 'stamp', w: 67, sfx: 'stamp' }),
  ]);
  S(68, 4, bg => [
    E(540, 760, O.tag('1 €', { w: 760, ...tagc(bg) }), { a: 'drop', dur: .45, sfx: 'thud' }),
  ]);
  S(69, 4, bg => [
    E(540, 470, O.tag('1 €', { w: 560, ...tagc(bg) }), { a: 'none' }),
    E(540, 880, O.tag('2 €', { w: 560, fill: P.yellow }), { a: 'drop', dur: .45, sfx: 'thud' }),
  ]);
  S(70, 4, bg => [
    E(250, 420, O.tag('1 €', { w: 280, fs: 130 }), { a: 'pop', rot: -8 }),
    E(820, 440, O.tag('2 €', { w: 280, fs: 130, fill: P.yellow }), { a: 'pop', d: .08, rot: 8 }),
    E(540, 880, O.tag('80 €', { w: 900, fill: P.navy, ink: P.cream }), { a: 'stamp', w: 74, sfx: 'stamp' }),
  ]);
  S(75, 4, bg => [
    E(540, 620, O.cart({ w: 620, full: true }), { a: 'left', sfx: 'whoosh' }),
    E(540, 1130, Tx('DE COURSES', 200, 'var(--a1)'), { a: 'up', w: 76 }),
  ]);
  S(77, 4, bg => [
    E(540, 470, O.tag('1 €', { w: 380, ...tagc(bg) }), { a: 'pop', loop: 'float', amp: 26, per: 1.1 }),
    E(540, 960, Tx('RIEN', 460, 'var(--a1)'), { a: 'stamp', w: 80, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 5 — TU CRAQUES ===== */
  S(81, 5, bg => [
    E(300, 660, O.person({ w: 340, fill: who(bg, 0) }), { a: 'pop', m: [{ w: 82, dx: 300, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(220, 1000, O.disc({ w: 84, fill: fg(bg) }), { a: 'pop', w: 82 }),
    E(480, 1000, O.disc({ w: 84, fill: fg(bg) }), { a: 'pop', w: 82, d: .25, sfx: 'pop' }),
    E(540, 1190, Tx('1 PAS', 240, 'var(--a1)'), { a: 'stamp', w: 84, sfx: 'stamp' }),
  ]);
  S(85, 5, bg => [
    E(700, 640, O.person({ w: 320, fill: who(bg, 0) }), { a: 'none' }),
    E(-200, 700, rack(bg, { w: 400 }), { a: 'none', m: [{ w: 85, d: .1, dx: 520, dur: .55, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1170, Tx('IL TE SUIT', 200, 'var(--a1)'), { a: 'up', w: 87 }),
  ]);
  S(89, 5, bg => [
    E(540, 760, Tx('HOP !', 460), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(90, 5, bg => [
    E(540, 900, O.belt({ w: 1000 }), { a: 'none' }),
    E(540, 800, candy(bg, { w: 520 }), { a: 'drop', w: 91, dur: .45, rot: -4, sfx: 'thud' }),
    E(540, 1160, Tx('SUR LE TAPIS', 170, 'var(--a1)'), { a: 'up', w: 92 }),
  ]);
  S(95, 5, bg => [
    E(540, 560, candy(bg, { w: 760 }), { a: 'pop', rot: -6, sfx: 'pop' }),
    E(540, 1000, Tx('?', 440, 'var(--a1)'), { a: 'pop', w: 96, rot: 8, loop: 'swing', amp: 6, per: .8 }),
  ]);
  S(98, 5, bg => [
    E(540, 600, O.clipboard({ w: 480 }), { a: 'pop', sfx: 'pop' }),
    E(540, 640, O.cross({ w: 440, draw: { w: 100, sfx: 'buzz' } }), { a: 'none', w: 100 }),
    E(540, 1130, Tx('PAS SUR TA LISTE', 130, 'var(--a1)'), { a: 'up', w: 99 }),
  ]);
  S(101, 5, bg => [
    E(540, 620, O.burst({ w: 1000, n: 14, col: P.navy }), { a: 'pop', w: 103, loop: 'spin', per: 5, cut: false }),
    E(540, 470, Tx('ACHAT', 300), { a: 'down' }),
    E(540, 780, Tx("D'IMPULSION", 190, 'var(--a1)'), { a: 'stamp', w: 103, sfx: 'stamp' }),
  ]);
  S(104, 5, bg => [
    E(540, 600, O.brain({ w: 620, fill: light(bg) ? P.coral : P.cream, fold: light(bg) ? P.cream : P.coral }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .05, per: .6 }),
    E(540, 1110, Tx('1. UNE ENVIE', 160, 'var(--a1)'), { a: 'up', w: 105 }),
  ]);
  S(106, 5, bg => [
    E(430, 640, O.palm({ w: 520, fill: fg(bg) }), { a: 'left', sfx: 'whoosh' }),
    E(680, 500, candy(bg, { w: 400 }), { a: 'pop', w: 107, rot: -10, sfx: 'pop' }),
    E(540, 1110, Tx('2. SOUS LA MAIN', 140, 'var(--a1)'), { a: 'up', w: 108 }),
  ]);
  S(111, 5, bg => [
    E(540, 600, O.clock({ w: 620, fill: light(bg) ? P.cream : P.cream }), { a: 'pop', sfx: 'pop' }),
    E(540, 600, O.hand({ w: 620 }), { a: 'none', loop: 'spin', per: .7, cut: false }),
    E(540, 1110, Tx('3. PAS LE TEMPS', 140, 'var(--a1)'), { a: 'up', w: 113 }),
  ]);

  /* ===== SCÈNE 6 — L'ÉTUDE ===== */
  S(116, 6, bg => [
    E(540, 640, rack(bg, { w: 500 }), { a: 'pop', sfx: 'pop', m: [{ w: 119, dx: -1100, r: -12, dur: .45, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1190, Tx('ET SI ON RETIRE ?', 120), { a: 'up', w: 117, dist: 200 }),
  ]);
  S(122, 6, bg => [
    ...[0, 1, 2].map(i => E(220 + i * 320, 560, O.shop({ w: 280, aw: i === 1 ? P.yellow : P.coral }), { a: 'pop', d: i * .1, sfx: i ? undefined : 'pop' })),
    E(540, 960, Tx('SUPERMARCHÉS', 170), { a: 'up', w: 123 }),
    E(540, 1170, Tx('BRITANNIQUES', 150, 'var(--a1)'), { a: 'up', w: 124 }),
  ]);
  S(125, 6, bg => [
    E(300, 600, candy(bg, { w: 400 }), { a: 'pop', rot: -20, sfx: 'pop' }),
    E(780, 600, O.chips({ w: 300 }), { a: 'pop', d: .08, rot: 8 }),
    E(300, 600, O.cross({ w: 340, col: fg(bg), draw: { w: 127, sfx: 'buzz' } }), { a: 'none', w: 127 }),
    E(780, 600, O.cross({ w: 340, col: fg(bg), draw: { w: 129 } }), { a: 'none', w: 129 }),
    E(540, 1110, Tx('ENLEVÉS', 260, 'var(--a1)'), { a: 'stamp', w: 126, sfx: 'stamp' }),
  ]);
  S(130, 6, bg => [
    E(330, 640, O.register({ w: 480, fill: bg === 'coral' ? P.navy : P.coral }), { a: 'pop', sfx: 'pop' }),
    E(820, 640, rack(bg, { w: 340, empty: true }), { a: 'pop', d: .1 }),
    E(540, 1130, Tx('DES CAISSES', 180, 'var(--a1)'), { a: 'up', w: 131 }),
  ]);
  S(133, 6, bg => [
    E(300, 660, O.person({ w: 330, fill: light(bg) ? P.navy : P.yellow, coat: true, ink: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(740, 660, O.person({ w: 330, fill: light(bg) ? P.navy : P.yellow, coat: true, ink: P.cream }), { a: 'pop', d: .12 }),
    E(540, 1080, O.magnifier({ w: 300, ring: bg === 'coral' ? P.navy : P.coral }), { a: 'spin', w: 136, sfx: 'pop' }),
  ]);
  S(137, 6, bg => [
    ...[0, 1, 2].map(i => E(260 + i * 280, 600, O.receipt({ w: 250 }), { a: 'drop', d: i * .08, dur: .45, rot: (i - 1) * 8, sfx: i ? undefined : 'print' })),
    E(540, 1110, Tx('LES ACHATS', 200, 'var(--a1)'), { a: 'up', w: 138 }),
  ]);
  S(139, 6, bg => [
    E(540, 740, Tx('RÉSULTAT', 240, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 920, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: bg === 'coral' ? P.navy : P.coral, sw: 28, draw: { d: .2, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  S(140, 6, bg => [
    E(540, 400, Tx('PUBLIÉ EN', 150), { a: 'down' }),
    E(540, 780, Tx(cnt({ from: 2000, to: 2018, w: 142, dur: .45, sfx: 'tick' }), 440, 'var(--a1)'), { a: 'pop', w: 141 }),
  ]);
  S(143, 6, bg => [
    E(540, 560, Tx(cnt({ from: 0, to: 17, dur: .5, pre: '-', suf: ' %', sfx: 'tick' }), 320, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 930, Tx("D'ACHATS EN MOINS", 120), { a: 'up', w: 144 }),
    E(540, 1170, O.line('M20,20 C300,20 420,60 780,150', { w: 800, vw: 800, vh: 170, col: bg === 'coral' ? P.navy : P.coral, sw: 28, draw: { w: 145, dur: .5, sfx: 'fall' } }), { a: 'none' }),
  ]);
  S(147, 6, bg => [
    E(320, 600, candy(bg, { w: 420 }), { a: 'pop', rot: -14, sfx: 'pop' }),
    E(780, 600, O.chips({ w: 300 }), { a: 'pop', d: .1, rot: 8 }),
    E(540, 1090, Tx('CES PRODUITS', 170, 'var(--a1)'), { a: 'up', w: 148 }),
  ]);
  S(150, 6, bg => [
    E(540, 640, O.burst({ w: 1000, n: 14, col: P.cream }), { a: 'pop', loop: 'spin', per: 4, cut: false }),
    E(540, 560, Tx('TOUT DE', 240), { a: 'pop', sfx: 'pop' }),
    E(540, 840, Tx('SUITE', 320, 'var(--a1)'), { a: 'stamp', w: 152, sfx: 'stamp' }),
  ]);
  S(153, 6, bg => [
    E(540, 680, Tx(cnt({ from: 0, to: 15, w: 155, dur: .45, pre: '-', suf: ' %', sfx: 'tick' }), 320, 'var(--a1)'), { a: 'stamp', w: 155, sfx: 'stamp' }),
    E(540, 330, Tx('ET ENCORE', 190), { a: 'down' }),
    E(540, 1000, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: fg(bg), sw: 28, draw: { w: 155, d: .4, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  S(156, 6, bg => [
    E(540, 640, O.calendar('+ 1 AN', { w: 640, fs: 150 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1150, Tx('PLUS TARD', 200, 'var(--a1)'), { a: 'up', w: 158 }),
  ]);

  /* ===== SCÈNE 7 — LA NUANCE ET L'IDÉE ===== */
  S(160, 7, bg => [
    E(540, 400, O.eye({ w: 420 }), { a: 'pop', sfx: 'pop' }),
    E(540, 760, Tx('ÉTUDE', 260), { a: 'up', w: 162 }),
    E(540, 1020, Tx("D'OBSERVATION", 150, 'var(--a1)'), { a: 'stamp', w: 163, sfx: 'stamp' }),
  ]);
  S(164, 7, bg => [
    E(540, 600, O.line('M40,40 H760', { w: 800, vw: 800, vh: 80, col: fg(bg), sw: 30, draw: { dur: .4, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(180, 600, O.disc({ w: 240, fill: P.coral }), { a: 'pop' }),
    E(900, 600, O.disc({ w: 240, fill: bg === 'yellow' ? P.navy : P.yellow }), { a: 'pop', d: .25, sfx: 'pop' }),
    E(540, 1040, Tx('UN LIEN', 280, 'var(--a1)'), { a: 'stamp', w: 165, sfx: 'stamp' }),
  ]);
  S(166, 7, bg => [
    E(540, 400, Tx('PAS UNE', 200), { a: 'down' }),
    E(540, 780, O.stamp('PREUVE ABSOLUE', { w: 920, fs: 104, h: 230, col: fg(bg) }), { a: 'pop', w: 168, rot: -5, sfx: 'pop' }),
    E(540, 780, O.cross({ w: 420, col: bg === 'coral' ? P.yellow : P.coral, draw: { w: 169, sfx: 'buzz' } }), { a: 'none', w: 169 }),
  ]);
  S(170, 7, bg => [
    E(540, 560, O.disc({ w: 620, fill: P.navy }), { a: 'pop' }),
    E(540, 540, O.bulb({ w: 340, ink: P.cream }), { a: 'pop', d: .06, sfx: 'pop' }),
    E(540, 1110, Tx('SIMPLE', 320, 'var(--a1)'), { a: 'stamp', w: 172, sfx: 'stamp' }),
  ]);
  S(173, 7, bg => [
    E(540, 860, O.belt({ w: 1000 }), { a: 'none' }),
    E(360, 760, candy(bg, { w: 380 }), { a: 'drop', w: 176, dur: .45, sfx: 'thud' }),
    E(800, 640, O.register({ w: 380, fill: bg === 'coral' ? P.navy : P.coral }), { a: 'pop' }),
    E(540, 330, Tx('CE QUE TU ACHÈTES', 120), { a: 'down', w: 174 }),
    E(540, 1150, Tx('À LA CAISSE', 190, 'var(--a1)'), { a: 'up', w: 177 }),
  ]);
  S(180, 7, bg => [
    E(320, 760, rack(bg, { w: 420, empty: true }), { a: 'pop' }),
    E(760, 330, flip(O.palm({ w: 440, fill: fg(bg) })), { a: 'right', w: 182, sfx: 'whoosh' }),
    E(320, 420, candy(bg, { w: 300 }), { a: 'none', w: 183, m: [{ w: 184, dy: 240, dur: .35, e: 'outBounce', sfx: 'thud' }] }),
    E(540, 1190, Tx("CE QU'ON Y A POSÉ", 120, 'var(--a1)'), { a: 'up', w: 182, d: .1, dist: 200 }),
  ]);

  /* ===== SCÈNE 8 — DÉFI ===== */
  S(187, 8, bg => [
    E(540, 520, Tx('LA PROCHAINE', 170), { a: 'down' }),
    E(540, 860, Tx('FOIS', 440, 'var(--a1)'), { a: 'stamp', w: 189, sfx: 'stamp' }),
  ]);
  S(190, 8, bg => [
    ...[0, 1, 2, 3].map(i => E(170 + i * 245, 700, O.person({ w: 230, fill: i === 2 ? (bg === 'yellow' ? P.coral : P.yellow) : fg(bg) }), { a: 'pop', d: i * .08, sfx: i ? undefined : 'pop' })),
    E(540, 1100, Tx('DANS LA FILE', 190, 'var(--a1)'), { a: 'up', w: 191 }),
  ]);
  S(193, 8, bg => [
    E(540, 480, O.eye({ w: 600 }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .04, per: .8 }),
    E(540, 960, Tx('REGARDE', 300, 'var(--a1)'), { a: 'stamp', d: .1, sfx: 'stamp' }),
  ]);
  S(198, 8, bg => [
    E(260, 700, rack(bg, { w: 420 }), { a: 'pop', sfx: 'pop' }),
    E(780, 700, flip(O.palm({ w: 460, fill: fg(bg) })), { a: 'right', w: 201, sfx: 'whoosh' }),
    E(540, 1160, Tx('À HAUTEUR DE MAIN', 120, 'var(--a1)'), { a: 'up', w: 199, dist: 200 }),
  ]);
  S(202, 8, bg => [
    E(540, 520, Tx('ET', 260), { a: 'pop' }),
    E(540, 860, Tx('COMPTE', 340, 'var(--a1)'), { a: 'stamp', w: 202, sfx: 'stamp' }),
  ]);
  S(202, 8, bg => [
    ...[0, 1, 2, 3, 4].map(i => E(160 + i * 190, 560 + (i % 2) * 90, O.disc({ w: 104, fill: i === 4 ? P.coral : fg(bg) }), { a: 'pop', d: i * .22, sfx: 'pop' })),
    E(540, 940, Tx('COMBIEN DE PAS ?', 130, 'var(--a1)'), { a: 'up', w: 202 }),
    E(540, 1180, candy(bg, { w: 420 }), { a: 'pop', w: 202, rot: -6, loop: 'swing', amp: 5, per: .8 }),
  ]);
})();
