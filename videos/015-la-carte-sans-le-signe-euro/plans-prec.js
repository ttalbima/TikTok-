/* Vidéo 015 — « La carte sans le signe € »
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
  // carte complète, prix au format voulu
  O.carte = (rows, o = {}) => {
    const { w = 640, fill = P.cream, ink = P.navy } = o;
    const h = 190 + rows.length * 150 + 30;
    const body = rows.map((r, i) => {
      const y = 190 + i * 150;
      return `<rect x="56" y="${y + 50}" width="${r.l || 240}" height="26" rx="13" fill="${ink}" opacity=".35"/>
        <text x="584" y="${y + 104}" text-anchor="end" font-size="104" fill="${ink}">${r.p}</text>`;
    }).join('');
    return svg(w, 640, h,
      `<rect width="640" height="${h}" rx="26" fill="${fill}"/>
       <rect x="24" y="24" width="592" height="130" rx="16" fill="${ink}"/>
       <text x="320" y="122" text-anchor="middle" font-size="96" fill="${fill}">LA CARTE</text>${body}`);
  };
  // assiette et couverts
  O.assiette = (o = {}) => {
    const { w = 560, fill = P.cream, ink = P.navy, food = P.coral } = o;
    return svg(w, 620, 420,
      `<rect x="20" y="60" width="22" height="300" rx="11" fill="${ink}"/><rect x="0" y="60" width="62" height="110" rx="20" fill="${ink}"/>
       <rect x="578" y="60" width="22" height="300" rx="11" fill="${ink}"/><path d="M578,60 q40,10 40,150 h-40 Z" fill="${ink}"/>
       <circle cx="310" cy="210" r="200" fill="${fill}"/><circle cx="310" cy="210" r="140" fill="none" stroke="${T.cream2}" stroke-width="10"/>
       <circle cx="280" cy="200" r="70" fill="${food}"/><circle cx="360" cy="240" r="46" fill="${T.green2}"/>`);
  };
  // restaurant générique
  O.resto = (o = {}) => {
    const { w = 620, wall = P.cream, aw = P.coral, ink = P.navy } = o;
    let st = '';
    for (let i = 0; i < 6; i++) st += `<path d="M${20 + i * 100},130 h100 v90 a50,50 0 0 1 -100,0 Z" fill="${i % 2 ? wall : aw}"/>`;
    return svg(w, 640, 560,
      `<rect x="40" y="130" width="560" height="430" fill="${wall}"/>
       <rect x="180" y="20" width="280" height="90" rx="14" fill="${ink}"/><text x="320" y="84" text-anchor="middle" font-size="56" fill="${wall}">RESTAURANT</text>
       ${st}<rect x="20" y="118" width="600" height="24" rx="8" fill="${ink}"/>
       <rect x="90" y="320" width="200" height="150" rx="10" fill="${ink}"/><rect x="380" y="300" width="150" height="260" rx="10" fill="${ink}"/>
       <circle cx="500" cy="436" r="10" fill="${aw}"/>`);
  };

  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f) => { const bg = CYCLE[k++ % 5]; shot({ w, bg, scene, html: f(bg) }); };
  const obj = bg => (bg === 'navy' || bg === 'green' || bg === 'coral' ? P.cream : P.navy);
  const lg = (bg, p, o = {}) => O.ligne(p, bg === 'cream' ? { fill: P.navy, ink: P.cream, ...o } : o);
  const assiette = (bg, o = {}) => O.assiette(bg === 'cream' ? { fill: P.yellow, ...o } : bg === 'navy' ? { ink: P.yellow, ...o } : o);
  const resto = (bg, o = {}) => O.resto(bg === 'cream' ? { wall: P.yellow, ...o } : bg === 'coral' ? { aw: P.navy, ...o } : o);
  const cher = (bg, o = {}) => O.person(bg === 'cream' || bg === 'yellow' ? { fill: P.navy, coat: true, ink: P.coral, ...o } : { fill: P.yellow, coat: true, ink: P.cream, ...o });
  const under = (y, col, an = {}) => E(540, y, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col, sw: 28, draw: { d: .2, dur: .3, ...an } }), { a: 'none', cut: false });

  V.keywords = [8, 12, 18, 30, 41, 48, 52, 61, 67, 72, 79, 81, 92, 101, 107, 113, 117, 126, 133, 135, 142, 151, 152, 160, 170, 180, 189, 193, 198, 214, 218];

  /* ===== SCÈNE 1 — HOOK ===== */
  S(0, 1, bg => [
    E(540, 620, lg(bg, '20', { w: 900, px: 690 }), { a: 'drop', sfx: 'thud' }),
    E(880, 667, Tx('€', 150, P.coral), { a: 'pop', d: .3, cut: false, m: [{ w: 3, o: .15, dur: .2, e: 'outCubic' }, { w: 4, o: 1, dur: .12, e: 'outCubic' }, { w: 5, o: 0, dy: -70, dur: .3, e: 'outCubic', sfx: 'swish' }] }),
    E(540, 1150, Tx('TU DÉPENSES +', 170, 'var(--a1)'), { a: 'up', w: 2 }),
  ]);
  S(7, 1, bg => [
    E(540, 400, O.carte([{ p: '12' }, { p: '20', l: 300 }], { w: 420 }), { a: 'down' }),
    E(540, 980, Tx('20', 620), { a: 'stamp', w: 8, sfx: 'stamp' }),
  ]);
  S(9, 1, bg => [
    E(540, 600, Tx('€', 760), { a: 'pop', sfx: 'pop' }),
    E(540, 620, O.cross({ w: 620, col: P.navy, draw: { w: 11, sfx: 'buzz' } }), { a: 'none', w: 11 }),
    E(540, 1180, Tx('SANS LE SIGNE', 150, 'var(--a1)'), { a: 'up', w: 10 }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(13, 2, bg => [
    E(540, 560, Tx('€', 150, 'var(--a1)'), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .08, per: .6 }),
    E(600, 610, O.magnifier({ w: 460, ring: P.cream }), { a: 'right', w: 14, dist: 600, sfx: 'whoosh' }),
    E(540, 1130, Tx('TOUT PETIT', 230), { a: 'up', w: 15 }),
  ]);
  S(17, 2, bg => [
    E(540, 660, Tx('EN MOINS', 250, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    under(860, P.navy),
  ]);
  S(19, 2, bg => [
    E(540, 560, O.eye({ w: 600 }), { a: 'pop', sfx: 'pop', m: [{ w: 22, s: 1.1, dur: .2 }] }),
    E(540, 1090, Tx("CE QU'IL CHANGE", 150, 'var(--a1)'), { a: 'up', w: 22 }),
  ]);
  S(25, 2, bg => [
    E(540, 760, O.person({ w: 420, fill: P.navy }), { a: 'up', sfx: 'pop' }),
    E(540, 400, O.crown({ w: 240, fill: P.coral, band: T.coral2 }), { a: 'drop', w: 26, dur: .4 }),
    E(540, 1210, Tx('À SA PLACE', 200), { a: 'up', w: 28 }),
  ]);
  S(30, 2, bg => [
    E(540, 560, assiette(bg, { w: 520 }), { a: 'pop', d: .1 }),
    E(540, 1060, Tx('LE PATRON', 225), { a: 'stamp', sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — TROIS FAÇONS D'ÉCRIRE ===== */
  S(33, 3, bg => [
    E(540, 640, resto(bg, { w: 660 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1170, Tx('TON RESTAURANT', 150, 'var(--a1)'), { a: 'up', w: 35 }),
  ]);
  S(37, 3, bg => [
    E(540, 930, lg(bg, '?', { w: 560 }), { a: 'down', dist: 360, w: 39, sfx: 'print' }),
    E(540, 560, O.press({ w: 680 }), { a: 'pop', sfx: 'pop', loop: 'shake', amp: 5, lw: 39, ldur: .8 }),
    E(540, 1230, Tx('TA CARTE', 190, 'var(--a1)'), { a: 'up', w: 40 }),
  ]);
  S(42, 3, bg => [
    E(540, 600, assiette(bg, { w: 620 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1130, Tx('PLAT DU JOUR', 170, 'var(--a1)'), { a: 'up', w: 43 }),
  ]);
  S(46, 3, bg => [
    E(540, 760, O.tag('20 €', { w: 840, fill: P.navy, ink: P.cream }), { a: 'drop', sfx: 'thud', m: [{ w: 48, s: 1.07, dur: .18 }, { w: 48, d: .22, s: 1, dur: .2 }] }),
  ]);
  S(49, 3, bg => [
    E(540, 580, Tx('3', 700), { a: 'stamp', w: 51, sfx: 'stamp' }),
    E(540, 1090, Tx('FAÇONS', 260, 'var(--a1)'), { a: 'up', w: 52 }),
  ]);
  S(55, 3, bg => [
    E(540, 700, Tx('1', 760, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .7 }),
  ]);
  S(56, 3, bg => [
    E(540, 600, lg(bg, '20,00 €'), { a: 'drop', sfx: 'thud', m: [{ w: 60, s: 1.06, dur: .2 }] }),
    E(540, 1090, Tx('AVEC LE SIGNE', 150, 'var(--a1)'), { a: 'up', w: 58 }),
  ]);
  S(62, 3, bg => [
    E(540, 700, Tx('2', 760, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .7 }),
  ]);
  S(63, 3, bg => [
    E(540, 600, lg(bg, 'VINGT EUROS', { fs: 112 }), { a: 'drop', sfx: 'thud', m: [{ w: 66, s: 1.06, dur: .2 }] }),
    E(540, 1090, Tx('EN TOUTES LETTRES', 122, 'var(--a1)'), { a: 'up', w: 65 }),
  ]);
  S(68, 3, bg => [
    E(540, 700, Tx('3', 760, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .7 }),
  ]);
  S(69, 3, bg => [
    E(540, 600, lg(bg, '20'), { a: 'drop', sfx: 'thud', m: [{ w: 71, s: 1.06, dur: .2 }] }),
    E(540, 1090, Tx('LE NOMBRE SEUL', 150, 'var(--a1)'), { a: 'up', w: 70 }),
  ]);
  S(73, 3, bg => [
    E(540, 560, assiette(bg, { w: 560 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1080, Tx('MÊME PLAT', 220, 'var(--a1)'), { a: 'stamp', w: 74 }),
  ]);
  S(75, 3, bg => [
    E(240, 560, O.tag('20 €', { w: 300, fs: 130 }), { a: 'pop', sfx: 'pop' }),
    E(560, 560, O.tag('20 €', { w: 300, fs: 130 }), { a: 'pop', d: .08 }),
    E(880, 560, O.tag('20 €', { w: 300, fs: 130 }), { a: 'pop', d: .16 }),
    E(540, 1000, Tx('MÊME PRIX', 220, 'var(--a1)'), { a: 'stamp', w: 76, sfx: 'stamp' }),
  ]);
  S(77, 3, bg => [
    E(540, 340, O.ligne('20,00 €', { w: 620 }), { a: 'left' }),
    E(540, 580, O.ligne('VINGT EUROS', { w: 620, fs: 112 }), { a: 'right', d: .08 }),
    E(540, 820, O.ligne('20', { w: 620 }), { a: 'left', d: .16 }),
    E(540, 1170, Tx('LAQUELLE ?', 230), { a: 'stamp', w: 79, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 4 — L'ÉTUDE ===== */
  S(80, 4, bg => [
    E(540, 740, Tx(cnt({ from: 1995, to: 2009, d: .1, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    under(1010, P.yellow, { d: .6 }),
  ]);
  S(82, 4, bg => [
    E(320, 720, cher(bg, { w: 340 }), { a: 'pop', sfx: 'pop' }),
    E(760, 720, cher(bg, { w: 340 }), { a: 'pop', d: .14 }),
    E(540, 1080, O.clipboard({ w: 240 }), { a: 'up', w: 87, sfx: 'pop' }),
  ]);
  S(88, 4, bg => [
    E(540, 620, resto(bg, { w: 640 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1150, Tx('UN VRAI RESTAURANT', 118, 'var(--a1)'), { a: 'up', w: 90 }),
  ]);
  S(92, 4, bg => [
    E(540, 620, Tx(cnt({ from: 0, to: 201, dur: .6, sfx: 'tick' }), 520, 'var(--a1)'), { a: 'pop' }),
    E(540, 1060, Tx('CLIENTS', 250), { a: 'stamp', w: 93, sfx: 'stamp' }),
  ]);
  S(94, 4, bg => [
    E(540, 600, O.assiette({ w: 560 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1100, Tx('AU DÉJEUNER', 180), { a: 'up', w: 95 }),
  ]);
  const give = (x, d, p, fs) => E(540, 380, O.ligne(p, { w: 290, fs }), { a: 'pop', m: [{ w: 98, d, dx: x - 540, dy: 220, dur: .4, e: 'inOut', sfx: d ? undefined : 'swish' }] });
  S(96, 4, bg => [
    E(200, 920, O.person({ w: 250, fill: P.cream }), { a: 'none' }), E(540, 920, O.person({ w: 250, fill: P.cream }), { a: 'none' }), E(880, 920, O.person({ w: 250, fill: P.cream }), { a: 'none' }),
    give(200, 0, '20,00 €', 120), give(880, .2, '20', 150), give(540, .1, 'VINGT', 120),
    E(540, 1250, Tx('3 CARTES', 160, 'var(--a1)'), { a: 'up', w: 100, dist: 200 }),
  ]);

  /* ===== SCÈNE 5 — LE RÉSULTAT ===== */
  S(102, 5, bg => [
    E(540, 740, Tx('RÉSULTAT', 250, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    under(930, P.coral),
  ]);
  S(103, 5, bg => [
    E(540, 640, O.burst({ w: 1000, n: 14, col: P.coral }), { a: 'pop', w: 105, loop: 'spin', per: 7, cut: false }),
    E(540, 640, lg(bg, '20'), { a: 'pop', sfx: 'pop' }),
    E(540, 1230, Tx('LE NOMBRE SEUL', 150, 'var(--a1)'), { a: 'up', w: 105 }),
  ]);
  const lab = (x, s) => E(x, 1130, Tx(s, 50, 'var(--ink)', { font: 'inter' }), { a: 'fade', cut: false });
  S(108, 5, bg => [
    E(220, 1070 - 200, O.bar(400, { w: 210, grow: { w: 108 } }), { a: 'none' }),
    E(540, 1070 - 200, O.bar(400, { w: 210, grow: { w: 108, d: .12 } }), { a: 'none' }),
    E(860, 1070 - 320, O.bar(640, { w: 210, fill: P.yellow, grow: { w: 111, dur: .6, sfx: 'rise' } }), { a: 'none' }),
    lab(220, '20,00 €'), lab(540, 'VINGT EUROS'), lab(860, '20'),
    E(540, 1260, Tx('DÉPENSÉ', 150, 'var(--a1)'), { a: 'up', w: 111, dist: 200 }),
  ]);
  S(112, 5, bg => [
    E(540, 600, Tx('+8 %', 370, 'var(--a1)'), { a: 'stamp', w: 113, sfx: 'stamp' }),
    E(540, 1060, Tx('DE PLUS', 250), { a: 'stamp', w: 115, sfx: 'stamp' }),
    E(540, 300, Tx('ENVIRON', 150), { a: 'down' }),
  ]);

  /* ===== SCÈNE 6 — POURQUOI ===== */
  S(117, 6, bg => [
    E(540, 640, Tx('POURQUOI', 250), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1000, Tx('?', 420, 'var(--a1)'), { a: 'pop', d: .3, rot: 8, loop: 'swing', amp: 5, per: .9 }),
  ]);
  S(118, 6, bg => [
    E(540, 600, O.bulb({ w: 380, ink: P.cream }), { a: 'pop', sfx: 'pop' }),
    E(540, 1100, Tx('UNE EXPLICATION', 135, 'var(--a1)'), { a: 'up', w: 119 }),
  ]);
  S(121, 6, bg => [
    E(540, 560, Tx('€', 640, P.navy), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .05, per: .6 }),
    E(540, 1110, Tx('UN RAPPEL', 225, 'var(--a1)'), { a: 'stamp', w: 125, sfx: 'stamp' }),
  ]);
  S(127, 6, bg => [
    E(300, 1010, O.person({ w: 380, fill: P.cream }), { a: 'left' }),
    E(690, 560, O.bubble({ w: 580 }), { a: 'pop', d: .1, sfx: 'pop' }),
    E(690, 480, Tx('€', 280, P.navy), { a: 'pop', w: 128, cut: false }),
  ]);
  S(130, 6, bg => [
    E(540, 560, O.bill({ w: 660 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1060, Tx("DE L'ARGENT", 185), { a: 'stamp', w: 132, sfx: 'stamp' }),
  ]);
  S(134, 6, bg => [
    E(540, 520, O.bill({ w: 520 }), { a: 'pop', m: [{ w: 135, dy: 120, s: .8, dur: .3 }] }),
    E(540, 1060, Tx('TON ARGENT', 200, 'var(--a1)'), { a: 'stamp', w: 135, sfx: 'stamp' }),
  ]);
  S(136, 6, bg => [
    E(400, 700, Tx('20', 560), { a: 'pop', sfx: 'pop' }),
    E(830, 700, Tx('€', 560, 'var(--a1)'), { a: 'pop', m: [{ w: 137, dy: 1500, r: 35, dur: .5, e: 'inOut', sfx: 'fall' }] }),
  ]);
  S(139, 6, bg => [
    E(540, 600, Tx('20', 640), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1090, Tx("QU'UN NOMBRE", 165, 'var(--a1)'), { a: 'up', w: 141 }),
  ]);
  S(143, 6, bg => [
    E(300, 520, Tx('20', 300), { a: 'left' }),
    E(780, 520, O.tag('20 €', { w: 420, fs: 150 }), { a: 'right', d: .1 }),
    E(540, 520, Tx('<', 220, 'var(--a2)'), { a: 'pop', w: 146, sfx: 'pop' }),
    E(540, 1030, Tx('MOINS MAL', 225, 'var(--a1)'), { a: 'stamp', w: 148, sfx: 'stamp' }),
  ]);
  S(150, 6, bg => [
    E(540, 620, O.tag('20,00 €', { w: 840, fill: P.coral, ink: P.cream, fs: 140 }), { a: 'pop', sfx: 'pop', loop: 'pulse', amp: .04, per: .5 }),
    E(540, 1090, Tx("QU'UNE SOMME", 165), { a: 'up', w: 151 }),
  ]);

  /* ===== SCÈNE 7 — LA LIMITE ===== */
  S(152, 7, bg => [
    E(540, 520, Tx('!', 520, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1060, Tx('ATTENTION', 240), { a: 'up', d: .15 }),
  ]);
  S(153, 7, bg => [
    E(540, 620, resto(bg, { w: 620 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1150, Tx('1 SEUL RESTAURANT', 120, 'var(--a1)'), { a: 'up', w: 155 }),
  ]);
  S(157, 7, bg => [
    E(540, 600, assiette(bg, { w: 560 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1100, Tx('1 SEUL SERVICE', 145, 'var(--a1)'), { a: 'up', w: 159 }),
  ]);
  S(161, 7, bg => [
    E(300, 880, cher(bg, { w: 340 }), { a: 'left' }),
    E(700, 480, O.bubble({ w: 520 }), { a: 'pop', w: 163, sfx: 'pop' }),
    E(700, 400, Tx('…', 260, P.navy), { a: 'pop', w: 164, cut: false }),
    E(540, 1210, Tx('LES AUTEURS', 160, 'var(--a1)'), { a: 'up', w: 162, dist: 200 }),
  ]);
  S(165, 7, bg => [
    E(200, 520, resto(bg, { w: 280 }), { a: 'pop' }), E(540, 520, resto(bg, { w: 280 }), { a: 'pop', d: .1 }), E(880, 520, resto(bg, { w: 280 }), { a: 'pop', d: .2 }),
    E(200, 250, Tx('?', 200, 'var(--a1)'), { a: 'pop', w: 167, sfx: 'pop' }), E(540, 250, Tx('?', 200, 'var(--a1)'), { a: 'pop', w: 168 }), E(880, 250, Tx('?', 200, 'var(--a1)'), { a: 'pop', w: 168, d: .15 }),
    E(540, 1030, Tx('PAS PARTOUT', 190), { a: 'stamp', w: 169, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 8 — LA CHUTE ===== */
  S(171, 8, bg => [
    E(540, 600, Tx('MAINTENANT', 200), { a: 'stamp', sfx: 'stamp' }),
    E(540, 900, Tx('TU SAIS', 300, 'var(--a1)'), { a: 'stamp', w: 173, sfx: 'stamp' }),
  ]);
  S(175, 8, bg => [
    E(540, 600, O.carte([{ p: '12' }, { p: '20', l: 300 }, { p: '28', l: 200 }], { w: 560 }), { a: 'pop', sfx: 'pop', loop: 'float', amp: 22, per: 1.3 }),
    E(540, 1200, Tx('SI LÉGÈRES', 210, 'var(--a1)'), { a: 'up', w: 179 }),
  ]);
  const barre = (bg, glyph, label, size, gy = 600) => [
    E(540, gy, Tx(glyph, size), { a: 'pop', sfx: 'pop' }),
    E(540, 620, O.cross({ w: 560, col: P.coral, draw: { d: .2, sfx: 'buzz' } }), { a: 'none', d: .2 }),
    E(540, 1110, Tx(label, 145, 'var(--a1)'), { a: 'up', d: .1 }),
  ];
  S(181, 8, bg => barre(bg, '€', 'PAS DE SIGNE', 640));
  S(184, 8, bg => barre(bg, ',', 'PAS DE VIRGULE', 900, 310));
  S(187, 8, bg => barre(bg, '00', 'PAS DE ZÉROS', 560));
  S(190, 8, bg => [
    E(540, 620, lg(bg, '20'), { a: 'drop', sfx: 'thud' }),
    E(540, 1110, Tx('UN PETIT NOMBRE', 135, 'var(--a1)'), { a: 'up', w: 192 }),
  ]);
  S(194, 8, bg => [
    E(430, 640, O.line('M20,20 H640', { w: 660, vw: 660, vh: 40, col: P.cream, sw: 22, draw: { dur: .7, sfx: 'swish' } }), { a: 'none', cut: false }),
    E(900, 640, Tx('20', 200, 'var(--a1)'), { a: 'pop', w: 198, sfx: 'pop', loop: 'pulse', amp: .06, per: .6 }),
    E(540, 1090, Tx('AU BOUT DE LA LIGNE', 105), { a: 'up', w: 195 }),
  ]);

  /* ===== SCÈNE 9 — QUESTION ===== */
  S(199, 9, bg => [
    E(540, 760, Tx('ET TOI ?', 320, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(201, 9, bg => [
    E(540, 580, O.carte([{ p: '?' }, { p: '?', l: 300 }, { p: '?', l: 200 }], { w: 520 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1190, Tx('LA DERNIÈRE CARTE', 118, 'var(--a1)'), { a: 'up', w: 203 }),
  ]);
  S(209, 9, bg => [
    E(540, 700, Tx('€', 520, P.navy), { a: 'pop', w: 213, sfx: 'pop', loop: 'pulse', amp: .05, per: .6 }),
    E(540, 1110, Tx('LE SIGNE ?', 220), { a: 'up', w: 212 }),
    E(540, 290, O.eye({ w: 300 }), { a: 'pop' }),
  ]);
  S(215, 9, bg => [
    E(540, 600, Tx('20', 640), { a: 'stamp', w: 216, sfx: 'stamp', loop: 'pulse', amp: .04, per: .6 }),
    E(540, 1100, Tx('OU UN NOMBRE ?', 145, 'var(--a1)'), { a: 'up', w: 217 }),
  ]);
})();
