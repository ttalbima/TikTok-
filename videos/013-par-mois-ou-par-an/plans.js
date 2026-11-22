/* Vidéo 013 — « 4,99 € par mois ou 60 € par an »
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;

  /* ----- objets propres à cette vidéo ----- */
  // calculatrice
  O.calc = (o = {}) => {
    const { w = 480, fill = P.navy, key = P.cream } = o;
    let k = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) k += `<rect x="${44 + c * 82}" y="${196 + r * 82}" width="62" height="62" rx="12" fill="${c === 3 ? P.coral : key}"/>`;
    return svg(w, 400, 540, `<rect width="400" height="540" rx="36" fill="${fill}"/><rect x="36" y="36" width="328" height="120" rx="14" fill="${T.green2}"/>
      <text x="340" y="126" text-anchor="end" font-size="90" fill="${P.cream}">× 12</text>${k}`);
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

  /* ----- aides de couleur selon le fond ----- */
  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f) => { const bg = CYCLE[k++ % 5]; shot({ w, bg, scene, html: f(bg) }); };
  const T1 = (bg, txt, o = {}) => O.tag(txt, { ...(bg === 'cream' ? { fill: P.navy, ink: P.cream } : {}), ...o });
  const T2 = (bg, txt, o = {}) => O.tag(txt, { ...(bg === 'yellow' ? { fill: P.navy, ink: P.cream } : { fill: P.yellow }), ...o });
  const note = (bg, txt, o = {}) => O.note(txt, bg === 'green' ? { fill: P.cream, ink: P.green, ...o } : o);
  const who = bg => (bg === 'yellow' || bg === 'cream' ? P.navy : P.cream);
  const xcol = bg => (bg === 'coral' ? P.navy : P.coral);
  const cup = (bg, o = {}) => O.cup({ fill: bg === 'cream' ? P.navy : P.cream, band: bg === 'coral' ? P.yellow : P.coral, lid: bg === 'navy' ? P.yellow : bg === 'cream' ? T.navy2 : P.navy, ...o });
  const under = (y, col, an) => E(540, y, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col, sw: 28, draw: an }), { a: 'none', cut: false });

  V.keywords = [5, 6, 10, 18, 32, 38, 39, 41, 46, 53, 55, 62, 80, 85, 93, 103, 112, 119, 127, 133, 139, 147, 154, 158, 166, 179, 186, 190, 202];

  /* ===== SCÈNE 1 — HOOK ===== */
  S(0, 1, bg => [
    E(290, 420, T1(bg, '4,99 €', { w: 470, sub: 'PAR MOIS', fs: 130 }), { a: 'down', dist: 700, org: '8% 50%', loop: 'swing', amp: 7, per: 1.1, sfx: 'swish' }),
    E(790, 640, T2(bg, '60 €', { w: 470, sub: 'PAR AN', fs: 130 }), { a: 'down', dist: 700, d: .14, org: '8% 50%', loop: 'swing', amp: 7, per: 1.3 }),
    E(540, 1010, Tx('TU CROIS CHOISIR', 120), { a: 'up', w: 1 }),
    E(540, 1200, Tx('LE MOINS CHER', 150, 'var(--a1)'), { a: 'stamp', w: 4, sfx: 'stamp' }),
  ]);
  S(6, 1, bg => [
    E(540, 600, T1(bg, '4,99 €', { w: 860, fill: P.navy, ink: P.cream }), { a: 'drop', sfx: 'thud', m: [{ d: .75, s: 1.06, dur: .18 }, { d: .98, s: 1, dur: .2 }] }),
    E(540, 1080, Tx('PAR MOIS', 250, 'var(--a1)'), { a: 'stamp', w: 7, sfx: 'stamp' }),
  ]);
  S(9, 1, bg => [
    E(540, 760, Tx('OU', 640), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .04, per: .5 }),
  ]);
  S(10, 1, bg => [
    E(540, 600, T1(bg, '60 €', { w: 860 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1080, Tx('PAR AN', 250, 'var(--a1)'), { a: 'stamp', w: 11, sfx: 'stamp' }),
    E(900, 300, Tx('?', 280, 'var(--a2)'), { a: 'pop', w: 12, rot: 10, loop: 'swing', amp: 6, per: .8, sfx: 'pop' }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(13, 2, bg => [
    E(540, 420, Tx('LE PREMIER', 200), { a: 'down' }),
    E(540, 860, T1(bg, '4,99 €', { w: 700, sub: 'PAR MOIS', fs: 130 }), { a: 'pop', d: .1, sfx: 'pop' }),
  ]);
  S(16, 2, bg => [
    E(540, 560, T2(bg, '4,99 €', { w: 620 }), { a: 'up', dist: 600, loop: 'float', amp: 34, per: 1.2, sfx: 'rise' }),
    E(540, 1100, Tx('PLUS LÉGER', 200, 'var(--a1)'), { a: 'stamp', w: 18, sfx: 'stamp' }),
  ]);
  S(19, 2, bg => [
    E(540, 620, O.calc({ w: 500 }), { a: 'pop', sfx: 'pop', m: [{ w: 21, r: -5, dur: .2 }, { w: 21, d: .25, r: 0, dur: .2 }] }),
    E(540, 1180, Tx('FAIS LE CALCUL', 150, 'var(--a1)'), { a: 'up', w: 20 }),
  ]);
  S(24, 2, bg => [
    E(540, 520, Tx('RESTE', 340), { a: 'stamp', w: 25, sfx: 'stamp' }),
    E(540, 850, Tx("JUSQU'AU BOUT", 160, 'var(--a1)'), { a: 'up', w: 26 }),
    E(540, 1130, O.arrow({ w: 420, fill: P.navy }), { a: 'left', w: 27, sfx: 'whoosh' }),
  ]);
  S(28, 2, bg => [
    E(540, 520, Tx('CE PIÈGE', 250), { a: 'pop', sfx: 'pop' }),
    E(540, 900, O.box('?', { w: 520, fill: P.navy, fs: 110 }), { a: 'up', d: .12 }),
  ]);
  S(32, 2, bg => [
    E(540, 520, Tx('LIMITE', 360, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    under(740, P.navy, { d: .2, dur: .3 }),
    E(540, 1000, Tx('ELLE SURPREND', 150), { a: 'up', w: 34 }),
    E(540, 1230, Tx('!', 240, 'var(--a2)'), { a: 'pop', w: 35, d: .3, sfx: 'pop', loop: 'pulse', amp: .08, per: .4 }),
  ]);

  /* ===== SCÈNE 3 — LE CALCUL ===== */
  S(36, 3, bg => [
    E(540, 700, Tx('4,99', 480), { a: 'stamp', sfx: 'stamp', m: [{ d: .7, s: 1.06, dur: .2 }, { d: .95, s: 1, dur: .2 }] }),
  ]);
  S(37, 3, bg => [
    E(540, 700, Tx('× 12', 520, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1130, Tx('MOIS', 220), { a: 'up', w: 38 }),
  ]);
  S(39, 3, bg => [
    E(540, 330, Tx('=', 260), { a: 'pop', sfx: 'pop' }),
    E(540, 700, Tx(cnt({ from: 0, to: 59.88, dec: 2, dur: .9, suf: ' €', sfx: 'tick' }), 290, 'var(--a1)'), { a: 'pop', d: .05, m: [{ d: 1.0, s: 1.08, dur: .18 }, { d: 1.22, s: 1, dur: .2 }] }),
    under(900, P.navy, { d: 1.0, dur: .3 }),
    E(540, 1130, Tx('PAR AN', 240), { a: 'stamp', d: 1.45, sfx: 'stamp' }),
  ]);
  S(40, 3, bg => [
    E(540, 400, note(bg, '59,88 €', { w: 620, fs: 110 }), { a: 'left' }),
    E(540, 720, T2(bg, '60 €', { w: 620 }), { a: 'right', d: .1 }),
    E(540, 1110, Tx('12 CENTIMES', 180, 'var(--a1)'), { a: 'stamp', w: 41, sfx: 'stamp' }),
    E(880, 1280, O.coin('1', { w: 150 }), { a: 'spin', w: 42, sfx: 'coin' }),
  ]);
  S(43, 3, bg => [
    E(540, 560, Tx('LE MÊME', 280), { a: 'stamp', w: 45, sfx: 'stamp' }),
    E(540, 940, Tx('PRIX', 460, 'var(--a1)'), { a: 'stamp', w: 46 }),
  ]);
  S(47, 3, bg => [
    E(540, 760, Tx('POURTANT…', 220, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', loop: 'swing', amp: 2, per: .6 }),
  ]);
  S(48, 3, bg => [
    E(300, 900, O.person({ w: 400, fill: who(bg) }), { a: 'left' }),
    E(740, 480, T1(bg, '60 €', { w: 500, sub: 'PAR AN', fs: 130 }), { a: 'pop', d: .1, rot: 5, sfx: 'pop' }),
    E(760, 900, Tx('?', 360, 'var(--a1)'), { a: 'pop', w: 50, rot: 8, loop: 'swing', amp: 7, per: .7, sfx: 'pop' }),
  ]);
  S(52, 3, bg => [
    E(540, 560, T1(bg, '4,99 €', { w: 620, sub: 'PAR MOIS', fs: 130 }), { a: 'left', dist: 1000, m: [{ w: 53, d: .25, dx: 1200, dur: .45, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1080, Tx('ÇA PASSE', 260, 'var(--a1)'), { a: 'stamp', w: 53, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 4 — L'ÉTUDE DE 1998 ===== */
  S(54, 4, bg => [
    E(540, 720, Tx(cnt({ from: 1980, to: 1998, d: .25, dur: .55, sfx: 'tick' }), 440), { a: 'pop', m: [{ w: 55, d: .75, s: 1.07, dur: .2 }, { w: 55, d: 1.0, s: 1, dur: .2 }] }),
    under(990, P.coral, { w: 55, d: .5, dur: .3 }),
  ]);
  S(56, 4, bg => [
    E(440, 640, O.person({ w: 400, fill: P.navy, coat: true, ink: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(800, 860, O.clipboard({ w: 240 }), { a: 'up', w: 57 }),
    E(540, 1210, Tx('UN CHERCHEUR', 150, 'var(--a1)'), { a: 'up', w: 57, d: .1 }),
  ]);
  S(59, 4, bg => [
    E(540, 420, Tx('TOUR DE', 220), { a: 'down' }),
    E(300, 860, T1(bg, '?', { w: 400 }), { a: 'pop', m: [{ w: 60, dx: 480, dur: .4, e: 'inOut', sfx: 'swish' }] }),
    E(780, 860, T2(bg, '?', { w: 400 }), { a: 'pop', d: .08, m: [{ w: 60, dx: -480, dur: .4, e: 'inOut' }] }),
  ]);
  S(62, 4, bg => [
    E(540, 640, O.burst({ w: 1050, n: 14, col: P.coral }), { a: 'pop', loop: 'spin', per: 5, cut: false }),
    E(540, 640, Tx('PASSE-PASSE', 190), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(63, 4, bg => [
    E(540, 620, O.note('€', { w: 720, fs: 150 }), { a: 'pop', sfx: 'pop', m: [{ w: 66, s: 1.06, dur: .2 }, { w: 66, d: .25, s: 1, dur: .2 }] }),
    E(540, 1110, Tx('MÊME DÉPENSE', 170, 'var(--a1)'), { a: 'up', w: 66 }),
  ]);
  S(68, 4, bg => [
    E(540, 560, Tx('2', 640, 'var(--a1)'), { a: 'stamp', w: 69, sfx: 'stamp' }),
    E(540, 1080, Tx('FAÇONS', 260), { a: 'up', w: 70 }),
  ]);
  S(71, 4, bg => [
    E(540, 600, O.note('€', { w: 900, fs: 170 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1110, Tx('GROS MONTANT', 170, 'var(--a1)'), { a: 'stamp', w: 72, sfx: 'stamp' }),
  ]);
  S(74, 4, bg => [
    E(540, 560, O.calendar('1 AN', { w: 620, fs: 190 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1130, Tx('PAR AN', 260, 'var(--a1)'), { a: 'up', w: 74, d: .1 }),
  ]);
  S(76, 4, bg => [
    E(540, 760, Tx('OU', 640), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(77, 4, bg => [
    ...[0, 1, 2, 3, 4].map(i => E(180 + i * 180, 600 + (i % 2) * 60, O.coin('1', { w: 170 }), { a: 'drop', d: i * .17, dur: .45, sfx: 'coin' })),
    E(540, 1090, Tx('PAR JOUR', 260, 'var(--a1)'), { a: 'stamp', w: 79, sfx: 'stamp' }),
  ]);
  const piece = (bg, i, an) => E(240 + i * 120, 640, O.rect(116, 300, bg === 'green' ? P.cream : T.green2, 10), an);
  S(81, 4, bg => [
    ...[0, 1, 2, 3, 4, 5].map(i => piece(bg, i, { a: 'none', m: [{ d: .12 + i * .04, dx: (i - 2.5) * 36, dy: (i % 2 ? 40 : -40), r: (i - 2.5) * 5, dur: .35, sfx: i ? undefined : 'swish' }] })),
    E(540, 1090, Tx('DÉCOUPÉE', 240, 'var(--a1)'), { a: 'stamp', d: .2, sfx: 'stamp' }),
  ]);
  S(82, 4, bg => [
    ...[0, 1, 2, 3, 4, 5].map(i => E(165 + i * 150, 520 + (i % 2) * 50, O.rect(116, 300, T.green2, 10), { a: 'pop', d: i * .05, rot: (i - 2.5) * 5 })),
    E(540, 960, Tx('MIEUX ACCEPTÉE', 150, 'var(--a1)'), { a: 'stamp', w: 84, sfx: 'stamp' }),
    E(540, 1200, O.check({ w: 220, draw: { w: 85, d: .3, sfx: 'pop' } }), { a: 'none', w: 85 }),
  ]);
  S(86, 4, bg => [
    E(300, 1000, O.person({ w: 380, fill: P.cream, coat: true, ink: P.yellow }), { a: 'left' }),
    E(690, 540, O.bubble({ w: 580, fill: P.cream }), { a: 'pop', d: .1, sfx: 'pop' }),
    E(690, 450, Tx('…', 280, P.navy), { a: 'pop', d: .28, cut: false }),
  ]);
  S(90, 4, bg => [
    E(540, 300, Tx('LA STRATÉGIE DES', 110), { a: 'down' }),
    E(540, 500, Tx('QUELQUES', 190), { a: 'pop', w: 92, sfx: 'pop' }),
    E(540, 760, Tx('CENTIMES', 270, 'var(--a1)'), { a: 'stamp', w: 93, sfx: 'stamp' }),
    E(540, 1040, Tx('PAR JOUR', 230), { a: 'up', w: 94 }),
  ]);

  /* ===== SCÈNE 5 — L'EXPLICATION ===== */
  S(96, 5, bg => [
    E(540, 600, O.burst({ w: 900, n: 12 }), { a: 'pop', loop: 'spin', per: 6, cut: false }),
    E(540, 600, O.bulb({ w: 380, ink: P.navy }), { a: 'pop', sfx: 'pop' }),
    E(540, 1130, Tx('EXPLICATION', 180, 'var(--a2)'), { a: 'up', w: 97 }),
  ]);
  S(98, 5, bg => [
    E(540, 640, O.brain({ w: 700 }), { a: 'pop', sfx: 'pop', loop: 'float', per: 1.2 }),
    E(540, 1160, Tx('TON CERVEAU', 180, 'var(--a1)'), { a: 'up', w: 99 }),
  ]);
  S(100, 5, bg => [
    E(430, 560, O.brain({ w: 440, fill: P.navy, fold: P.cream }), { a: 'pop' }),
    E(720, 700, O.magnifier({ w: 400, ring: P.coral }), { a: 'right', d: .1, sfx: 'whoosh', loop: 'float', amp: 16, per: 1 }),
    E(540, 1130, Tx('À QUOI COMPARER ?', 120, 'var(--a1)'), { a: 'stamp', w: 102, sfx: 'stamp' }),
  ]);
  S(104, 5, bg => [
    E(540, 760, T1(bg, '60 €', { w: 860 }), { a: 'drop', sfx: 'thud' }),
  ]);
  S(105, 5, bg => [
    E(540, 330, T1(bg, '60 €', { w: 440, fill: P.navy, ink: P.cream }), { a: 'none' }),
    E(540, 560, Tx('=', 220), { a: 'pop', w: 107, sfx: 'pop' }),
    E(540, 960, O.bag({ w: 480 }), { a: 'up', w: 110, sfx: 'thud', m: [{ w: 112, s: 1.06, dur: .2 }, { w: 112, d: .25, s: 1, dur: .2 }] }),
  ]);
  S(113, 5, bg => [
    E(540, 760, T2(bg, '4,99 €', { w: 860 }), { a: 'drop', sfx: 'thud' }),
  ]);
  S(114, 5, bg => [
    E(540, 330, T2(bg, '4,99 €', { w: 440 }), { a: 'none' }),
    E(540, 560, Tx('=', 220), { a: 'pop', sfx: 'pop' }),
    E(330, 960, cup(bg, { w: 320 }), { a: 'pop', w: 116, sfx: 'pop' }),
    E(760, 1000, O.croissant({ w: 380 }), { a: 'pop', w: 119, sfx: 'pop' }),
  ]);
  S(120, 5, bg => [
    E(540, 700, cup(bg, { w: 560 }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .03, per: .7 }),
  ]);
  S(123, 5, bg => [
    E(540, 520, cup(bg, { w: 400 }), { a: 'none' }),
    E(820, 380, O.check({ w: 220, col: P.yellow, draw: { d: .15, sfx: 'pop' } }), { a: 'none' }),
    E(540, 1010, Tx('ÇA NE SE', 190), { a: 'up', dist: 300 }),
    E(540, 1210, Tx('DISCUTE PAS', 190, 'var(--a1)'), { a: 'stamp', w: 126, sfx: 'stamp' }),
  ]);
  S(128, 5, bg => [
    E(540, 330, Tx('TU NE JUGES PLUS', 120), { a: 'down' }),
    E(540, 760, O.tag('PRIX', { w: 760, fill: P.navy, ink: P.cream }), { a: 'pop', d: .1 }),
    E(540, 760, O.cross({ w: 520, col: P.coral, draw: { w: 131, sfx: 'buzz' } }), { a: 'none', w: 131 }),
  ]);
  S(134, 5, bg => [
    E(540, 320, Tx('TU JUGES', 220), { a: 'down' }),
    E(380, 700, O.rect(560, 380, P.cream, 18), { a: 'pop', d: .08 }),
    E(860, 810, O.rect(150, 100, P.yellow, 12), { a: 'pop', w: 137, sfx: 'pop', loop: 'pulse', amp: .1, per: .5 }),
    E(540, 1150, Tx('LA TAILLE DU MORCEAU', 100, 'var(--a1)'), { a: 'stamp', w: 138, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 6 — LA LIMITE ===== */
  S(140, 6, bg => [
    E(540, 700, O.calendar('+ 5 ANS', { w: 720, fs: 150 }), { a: 'spin', sfx: 'swish' }),
  ]);
  S(144, 6, bg => [
    E(540, 520, O.rect(60, 560, P.coral, 14), { a: 'drop', dur: .45, sfx: 'thud' }),
    E(540, 1010, Tx('UNE LIMITE', 220, 'var(--a1)'), { a: 'stamp', w: 147, sfx: 'stamp' }),
  ]);
  S(148, 6, bg => [
    ...[0, 1, 2, 3].map(i => E(540 + (i % 2 ? 30 : -30), 1080 - i * 170, O.note('€', { w: 520 }), { a: 'drop', d: i * .16, dur: .42, rot: i % 2 ? 5 : -5, sfx: 'thud' })),
    E(540, 310, Tx('GROSSE SOMME', 155, 'var(--a1)'), { a: 'down', w: 150 }),
  ]);
  S(153, 6, bg => [
    E(540, 520, O.arrow({ w: 520, fill: P.navy }), { a: 'pop', m: [{ w: 154, r: 180, dur: .35, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1010, Tx("S'INVERSE", 240, 'var(--a1)'), { a: 'stamp', w: 154, d: .2, sfx: 'stamp' }),
  ]);
  S(155, 6, bg => [
    E(540, 600, O.clipboard({ w: 460 }), { a: 'pop', sfx: 'pop', m: [{ w: 157, r: -4, dur: .2 }] }),
    E(540, 1130, Tx('SON EXEMPLE', 180, 'var(--a1)'), { a: 'up', w: 156 }),
  ]);
  S(158, 6, bg => [
    E(540, 580, note(bg, '11,50 $', { w: 860, fs: 150 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1080, Tx('PAR JOUR', 250, 'var(--a1)'), { a: 'stamp', w: 160, d: .2, sfx: 'stamp' }),
  ]);
  S(162, 6, bg => [
    E(540, 520, O.note('11,50 $', { w: 640, fs: 130 }), { a: 'none' }),
    E(540, 520, O.cross({ w: 440, col: P.coral, draw: { d: .12, sfx: 'buzz' } }), { a: 'none' }),
    E(540, 1010, Tx('PASSE MOINS BIEN', 130, 'var(--a1)'), { a: 'up', w: 163 }),
  ]);
  S(166, 6, bg => [
    E(540, 580, O.note('4 200 $', { w: 860, fs: 150 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1080, Tx('PAR AN', 250, 'var(--a1)'), { a: 'stamp', w: 168, sfx: 'stamp' }),
    E(900, 300, O.check({ w: 200, col: P.yellow, draw: { w: 169, d: .1, sfx: 'pop' } }), { a: 'none', w: 169 }),
  ]);
  S(170, 6, bg => [
    E(540, 620, Tx('PARCE', 340), { a: 'stamp', sfx: 'stamp' }),
    E(540, 960, Tx('QUE…', 340, 'var(--a1)'), { a: 'stamp', w: 171 }),
  ]);
  S(173, 6, bg => [
    E(540, 600, cup(bg, { w: 440 }), { a: 'pop' }),
    E(540, 620, O.cross({ w: 560, col: P.navy, draw: { w: 176, sfx: 'buzz' } }), { a: 'none', w: 176 }),
    E(540, 1150, Tx('PLUS UN CAFÉ', 170, 'var(--a1)'), { a: 'stamp', w: 178, sfx: 'stamp' }),
  ]);
  S(180, 6, bg => [
    ...[0, 1, 2, 3, 4, 5].map(i => E(165 + i * 150, 600 + (i % 2) * 50, O.rect(116, 300, P.cream, 10), { a: 'drop', d: i * .06, dur: .4, rot: (i - 2.5) * 5, sfx: i % 3 ? undefined : 'thud' })),
    E(540, 1110, Tx('LE DÉCOUPAGE', 160, 'var(--a1)'), { a: 'up', w: 181 }),
  ]);
  S(182, 6, bg => [
    ...[0, 1, 2].map(i => E(260 + i * 280, 560, O.coin('€', { w: 230, small: '' }), { a: 'pop', d: i * .12, sfx: i ? undefined : 'coin' })),
    E(540, 960, Tx('PETITES SOMMES', 150, 'var(--a1)'), { a: 'stamp', w: 185, sfx: 'stamp' }),
    E(540, 1200, O.check({ w: 200, draw: { w: 186, d: .25, sfx: 'pop' } }), { a: 'none', w: 186 }),
  ]);
  S(187, 6, bg => [
    E(540, 600, O.phone({ w: 400, fill: P.cream, screen: T.navy2 }), { a: 'up', sfx: 'pop' }),
    E(250, 420, O.tag('/ MOIS', { w: 300, fs: 110 }), { a: 'pop', w: 188, rot: -8, sfx: 'pop' }),
    E(840, 620, O.tag('/ MOIS', { w: 300, fs: 110, fill: P.yellow }), { a: 'pop', w: 188, d: .15, rot: 7 }),
    E(250, 820, O.tag('/ MOIS', { w: 300, fs: 110 }), { a: 'pop', w: 188, d: .3, rot: -5 }),
    E(540, 1200, Tx('ABONNEMENTS', 180, 'var(--a1)'), { a: 'stamp', w: 190, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 7 — DÉFI ===== */
  S(191, 7, bg => [
    E(540, 420, Tx('LA PROCHAINE', 180), { a: 'down', w: 192 }),
    E(540, 800, Tx('FOIS', 420, 'var(--a1)'), { a: 'stamp', w: 194, sfx: 'stamp' }),
    E(540, 1170, O.eye({ w: 320 }), { a: 'pop', w: 197, sfx: 'pop' }),
  ]);
  S(198, 7, bg => [
    E(540, 700, O.tag('PAR MOIS', { w: 900, fs: 120 }), { a: 'drop', sfx: 'thud', org: '8% 50%', loop: 'swing', amp: 4, per: 1, lw: 199 }),
  ]);
  S(200, 7, bg => [
    E(540, 340, Tx('MULTIPLIE', 240), { a: 'down' }),
    E(540, 840, Tx('× 12', 600, 'var(--a1)'), { a: 'stamp', w: 201, sfx: 'stamp', m: [{ w: 202, d: .3, s: 1.07, dur: .2 }, { w: 202, d: .55, s: 1, dur: .2 }] }),
  ]);
  // retouche v2 : la phrase « Et regarde si tu choisis encore le moins cher. » est supprimée, ses trois plans aussi
})();
