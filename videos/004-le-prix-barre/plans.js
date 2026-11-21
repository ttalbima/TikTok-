/* Vidéo 004 — « Regarde bien ce prix barré »
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;

  /* ----- objets propres à cette vidéo ----- */
  // étiquette avec ancien prix barré et nouveau prix
  O.ptag = (o = {}) => {
    const { w = 760, fill = P.cream, ink = P.navy, old = '120 €', now = '60 €', strike = true } = o;
    return svg(w, 620, 400,
      `<path d="M120,0 H590 a30,30 0 0 1 30,30 V370 a30,30 0 0 1 -30,30 H120 L0,200 Z" fill="${fill}"/>
       <circle cx="84" cy="200" r="24" fill="rgba(0,0,0,.35)"/>
       <path d="M84,200 C20,150 -40,110 -100,30" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" opacity=".55"/>
       <text x="372" y="140" text-anchor="middle" font-size="110" fill="${ink}" opacity=".6">${old}</text>
       ${strike ? `<path d="M230,112 L514,96" stroke="${P.coral}" stroke-width="16" stroke-linecap="round"/>` : ''}
       <text x="372" y="340" text-anchor="middle" font-size="190" fill="${P.coral}">${now}</text>`);
  };
  // roue de loterie
  O.wheel = (o = {}) => {
    const { w = 640 } = o;
    const cols = [P.coral, P.yellow, T.green2, P.navy, P.coral, P.yellow, T.green2, P.navy];
    let seg = '';
    for (let i = 0; i < 8; i++) {
      const a0 = (i * 45 - 90) * Math.PI / 180, a1 = ((i + 1) * 45 - 90) * Math.PI / 180;
      seg += `<path d="M300,300 L${300 + 270 * Math.cos(a0)},${300 + 270 * Math.sin(a0)} A270,270 0 0 1 ${300 + 270 * Math.cos(a1)},${300 + 270 * Math.sin(a1)} Z" fill="${cols[i]}"/>`;
    }
    return svg(w, 600, 600, `<circle cx="300" cy="300" r="300" fill="${P.cream}"/>${seg}<circle cx="300" cy="300" r="270" fill="none" stroke="${P.cream}" stroke-width="10"/><circle cx="300" cy="300" r="46" fill="${P.cream}"/>`);
  };
  O.pointer = (o = {}) => { const { w = 120, fill = P.cream } = o; return svg(w, 120, 140, `<path d="M0,0 H120 L60,140 Z" fill="${fill}"/>`); };
  // pull
  O.pull = (o = {}) => {
    const { w = 520, fill = P.coral } = o;
    return svg(w, 520, 460,
      `<path d="M170,30 Q260,90 350,30 L470,90 L520,400 L440,420 L400,190 V450 H120 V190 L80,420 L0,400 L50,90 Z" fill="${fill}"/>
       <path d="M170,30 Q260,90 350,30" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="18"/>
       <rect x="120" y="410" width="280" height="40" fill="rgba(0,0,0,.18)"/>`);
  };
  // ancre marine
  O.anchor = (o = {}) => {
    const { w = 460, col = P.navy } = o;
    return svg(w, 460, 560,
      `<g fill="none" stroke="${col}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round">
       <circle cx="230" cy="70" r="46"/><path d="M230,116 V500"/><path d="M110,220 H350"/><path d="M40,330 Q60,500 230,500 Q400,500 420,330"/></g>`);
  };
  // pouce
  O.thumb = (o = {}) => {
    const { w = 420, fill = P.yellow } = o;
    return svg(w, 420, 900, `<path d="M60,900 V260 Q60,0 210,0 Q360,0 360,260 V900 Z" fill="${fill}"/><path d="M110,230 Q110,60 210,60 Q310,60 310,230 Q310,330 210,330 Q110,330 110,230 Z" fill="rgba(255,255,255,.35)"/>`);
  };

  const CYCLE = ['coral', 'navy', 'yellow', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f) => { const bg = CYCLE[k++ % 5]; shot({ w, bg, scene, html: f(bg) }); };
  const light = bg => bg === 'cream' || bg === 'yellow';
  const fg = bg => (light(bg) ? P.navy : P.cream);
  const tagFill = bg => (bg === 'cream' ? P.yellow : P.cream);
  const pullFill = bg => (bg === 'coral' ? P.navy : P.coral);
  const strike = (y, wpx, o = {}) => E(540, y, O.line(`M20,40 L${wpx - 20},16`, { w: wpx, vw: wpx, vh: 56, col: o.col || P.coral, sw: 34, draw: { dur: .3, sfx: 'swish', ...o.draw } }), { a: 'none', cut: false });
  const who = (bg, o = {}) => O.person({ w: 300, fill: fg(bg), ...o });
  const doc = bg => O.person({ w: 340, fill: light(bg) ? P.navy : P.yellow, coat: true, ink: bg === 'cream' ? P.yellow : P.cream });

  V.keywords = [4, 17, 18, 20, 27, 38, 45, 46, 60, 64, 67, 85, 94, 103, 108, 115, 124, 133, 140, 145, 152, 163, 171, 175, 182, 184, 195, 202, 215, 224];

  /* ===== SCÈNE 1 — HOOK ===== */
  S(0, 1, bg => [
    E(540, 760, O.ptag({ w: 900, fill: tagFill(bg) }), { a: 'drop', sfx: 'thud', rot: -4, m: [{ d: .8, s: 1.06, dur: .18 }, { d: 1.0, s: 1, dur: .2 }] }),
  ]);
  S(3, 1, bg => [
    E(540, 600, Tx('PRIX', 340), { a: 'stamp', sfx: 'stamp' }),
    E(540, 960, Tx('BARRÉ', 340, 'var(--a1)'), { a: 'stamp', w: 4, sfx: 'stamp' }),
    strike(960, 820, { draw: { w: 4, d: .25 } }),
  ]);
  S(5, 1, bg => [
    E(540, 700, O.disc({ w: 560, fill: fg(bg) }), { a: 'pop', sfx: 'pop' }),
    E(540, 700, Tx('i', 420, P[bg], { css: 'text-transform:none;' }), { a: 'pop', d: .08, cut: false }),
    E(540, 1170, Tx('PAS LÀ', 220, 'var(--a1)'), { a: 'up', w: 7 }),
  ]);
  S(9, 1, bg => [
    E(540, 660, O.disc({ w: 520, fill: fg(bg) }), { a: 'none' }),
    E(540, 660, Tx('i', 400, P[bg], { css: 'text-transform:none;' }), { a: 'none', cut: false }),
    E(540, 660, O.cross({ w: 640, col: P.coral, draw: { w: 10, sfx: 'buzz' } }), { a: 'none', w: 10 }),
    E(540, 1150, Tx("POUR T'INFORMER", 150), { a: 'up' }),
  ]);
  S(11, 1, bg => [
    E(540, 420, Tx('IL EST LÀ', 220), { a: 'down' }),
    E(540, 700, Tx('POUR TE FAIRE', 170), { a: 'up', w: 14 }),
    E(540, 1020, Tx('ACHETER', 290, 'var(--a1)'), { a: 'stamp', w: 17, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(18, 2, bg => [
    E(540, 720, Tx('120 €', 440), { a: 'pop', sfx: 'pop' }),
    strike(720, 900, { draw: { w: 19 } }),
    E(540, 1130, Tx('BARRÉS', 220, 'var(--a1)'), { a: 'up', w: 19 }),
  ]);
  S(20, 2, bg => [
    E(540, 380, O.arrow({ w: 300, fill: fg(bg) }), { a: 'down', w: 21, rot: 90, sfx: 'fall' }),
    E(540, 860, Tx('60 €', 560, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(24, 2, bg => [
    E(540, 520, O.burst({ w: 900, n: 14, col: light(bg) ? P.coral : P.yellow }), { a: 'pop', w: 26, loop: 'spin', per: 6, cut: false }),
    E(540, 520, O.eye({ w: 600 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1080, Tx('UNE AFFAIRE', 190, 'var(--a1)'), { a: 'stamp', w: 27, sfx: 'stamp' }),
  ]);
  S(28, 2, bg => [
    E(540, 600, Tx('POURTANT…', 205), { a: 'stamp', sfx: 'stamp' }),
    E(330, 1010, Tx('?', 340, 'var(--a1)'), { w: 31, rot: -10, sfx: 'pop' }),
    E(740, 1010, Tx('?', 340, 'var(--a1)'), { w: 32, rot: 10, sfx: 'pop' }),
  ]);
  S(34, 2, bg => [
    E(540, 640, O.tag('? €', { w: 760, fill: tagFill(bg) }), { a: 'pop', sfx: 'pop', loop: 'swing', amp: 4, per: 1 }),
    E(540, 1090, Tx('ÇA VAUT QUOI', 190, 'var(--a1)'), { a: 'up', w: 36 }),
  ]);
  S(37, 2, bg => [
    E(540, 640, O.pull({ w: 700, fill: pullFill(bg) }), { a: 'pop', sfx: 'pop' }),
    E(540, 1150, Tx('CE PULL', 260, 'var(--a1)'), { a: 'stamp', w: 38, sfx: 'stamp' }),
  ]);
  S(39, 2, bg => [
    E(540, 560, O.magnifier({ w: 520, ring: fg(bg) }), { a: 'left', sfx: 'whoosh' }),
    E(540, 1080, Tx('LA PREUVE', 260, 'var(--a1)'), { a: 'stamp', w: 41, sfx: 'stamp' }),
  ]);
  S(43, 2, bg => [
    E(540, 620, O.wheel({ w: 700 }), { a: 'pop', sfx: 'pop', loop: 'spin', per: 1.4 }),
    E(540, 250, O.pointer({ w: 110, fill: fg(bg) }), { a: 'down', d: .1 }),
    E(540, 1170, Tx('TRUQUÉE', 260, 'var(--a1)'), { a: 'stamp', w: 45, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — L'EXPÉRIENCE DE 1974 ===== */
  S(46, 3, bg => [
    E(540, 740, Tx(cnt({ from: 1960, to: 1974, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    E(540, 1010, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 30, draw: { d: .5, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  S(47, 3, bg => [
    E(320, 720, doc(bg), { a: 'pop', sfx: 'pop' }),
    E(760, 720, doc(bg), { a: 'pop', w: 48, sfx: 'pop' }),
    E(540, 1130, Tx('2 PSYCHOLOGUES', 140, 'var(--a1)'), { a: 'up', w: 48, d: .1 }),
  ]);
  S(49, 3, bg => [
    E(540, 700, O.wheel({ w: 820 }), { a: 'spin', sfx: 'whoosh', loop: 'spin', per: .9 }),
    E(540, 270, O.pointer({ w: 120, fill: fg(bg) }), { a: 'down' }),
  ]);
  S(52, 3, bg => [
    E(540, 480, O.wheel({ w: 520 }), { a: 'none', loop: 'spin', per: 1.2 }),
    E(540, 910, Tx('ROUE DE', 180), { a: 'up' }),
    E(540, 1180, Tx('LOTERIE', 240, 'var(--a1)'), { a: 'stamp', w: 54, sfx: 'stamp' }),
  ]);
  S(55, 3, bg => [
    ...[0, 1, 2, 3].map(i => E(170 + i * 246, 700 + (i % 2) * 60, who(bg, { w: 240 }), { a: 'pop', d: i * .1, sfx: i ? undefined : 'pop' })),
    E(540, 1170, Tx('DES VOLONTAIRES', 132, 'var(--a1)'), { a: 'up', w: 57 }),
  ]);
  S(58, 3, bg => [
    E(540, 620, O.wheel({ w: 700 }), { a: 'pop', loop: 'spin', per: 2.5 }),
    E(540, 640, O.stamp('TRUQUÉE', { w: 820, fs: 150, col: P.cream, h: 250 }), { a: 'stamp', w: 60, rot: -10, sfx: 'stamp' },
      `background:${P.coral};border-radius:26px;`),
    E(540, 1170, Tx('ELLE EST', 180), { a: 'up' }),
  ]);
  S(61, 3, bg => [
    E(540, 500, O.wheel({ w: 520 }), { a: 'none', m: [{ d: 0, r: 500, dur: 1.1, e: 'outCubic' }] }),
    E(540, 190, O.pointer({ w: 100, fill: fg(bg) }), { a: 'none' }),
    E(540, 1040, Tx('10', 520, 'var(--a1)'), { a: 'stamp', w: 64, sfx: 'stamp' }),
  ]);
  S(65, 3, bg => [
    E(540, 360, Tx('OU SUR', 200), { a: 'down' }),
    E(540, 860, Tx('65', 700, 'var(--a1)'), { a: 'stamp', w: 67, sfx: 'stamp' }),
  ]);
  S(68, 3, bg => [
    E(540, 300, Tx('ENSUITE', 200), { a: 'down' }),
    E(540, 780, O.bubble({ w: 720, fill: fg(bg) }), { a: 'pop', w: 70, sfx: 'pop' }),
    E(540, 700, Tx('?', 380, P[bg]), { a: 'pop', w: 72, cut: false }),
  ]);
  S(73, 3, bg => [
    E(280, 600, O.wheel({ w: 380 }), { a: 'left' }),
    E(800, 600, Tx('?', 400), { a: 'right' }),
    E(540, 600, O.cross({ w: 260, draw: { w: 74, sfx: 'buzz' } }), { a: 'none', w: 74 }),
    E(540, 1090, Tx('AUCUN RAPPORT', 152, 'var(--a1)'), { a: 'stamp', w: 75, sfx: 'stamp' }),
  ]);
  S(76, 3, bg => [
    E(540, 730, Tx('%', 620, 'var(--a1)'), { a: 'stamp', w: 77, sfx: 'stamp' }),
    E(540, 290, Tx('QUEL', 190), { a: 'down' }),
    E(540, 1160, Tx('DES PAYS', 220), { a: 'up', w: 79 }),
  ]);
  S(80, 3, bg => [
    E(540, 720, Tx("DE L'ONU", 290), { a: 'stamp', sfx: 'stamp' }),
  ]);
  S(82, 3, bg => [
    E(540, 520, O.pin({ w: 380, fill: light(bg) ? P.coral : P.yellow, ink: P[bg] }), { a: 'drop', sfx: 'thud' }),
    E(540, 1090, Tx('EN AFRIQUE ?', 185, 'var(--a1)'), { a: 'stamp', w: 85, sfx: 'stamp' }),
  ]);
  S(86, 3, bg => [
    E(300, 860, who(bg, { w: 360 }), { a: 'left' }),
    E(730, 520, O.bubble({ w: 520, fill: fg(bg) }), { a: 'pop', w: 89, sfx: 'pop' }),
    E(730, 480, Tx('10', 220, P[bg]), { a: 'pop', w: 90, cut: false }),
  ]);
  S(91, 3, bg => [
    E(540, 340, Tx('AUTOUR DE', 170), { a: 'down', w: 92 }),
    E(540, 800, Tx(cnt({ from: 0, to: 25, w: 92, dur: .5, suf: ' %', sfx: 'tick' }), 400, 'var(--a1)'), { a: 'pop', sfx: 'pop' }),
  ]);
  S(95, 3, bg => [
    E(780, 860, who(bg, { w: 360 }), { a: 'right' }),
    E(350, 520, O.bubble({ w: 520, fill: fg(bg) }), { a: 'pop', w: 98, sfx: 'pop' }),
    E(350, 480, Tx('65', 220, P[bg]), { a: 'pop', w: 99, cut: false }),
  ]);
  S(100, 3, bg => [
    E(540, 340, Tx('AUTOUR DE', 170), { a: 'down', w: 101 }),
    E(540, 800, Tx(cnt({ from: 0, to: 45, w: 101, dur: .5, suf: ' %', sfx: 'tick' }), 400, 'var(--a1)'), { a: 'pop', sfx: 'pop' }),
  ]);
  S(104, 3, bg => [
    E(540, 560, O.wheel({ w: 640 }), { a: 'pop', sfx: 'pop', loop: 'spin', per: 1 }),
    E(540, 1100, Tx('AU HASARD', 212, 'var(--a1)'), { a: 'stamp', w: 108, sfx: 'stamp' }),
  ]);
  S(109, 3, bg => [
    E(540, 700, O.rect(860, 44, fg(bg), 22), { a: 'none' }),
    E(250, 520, Tx('25 %', 170), { a: 'pop' }),
    E(830, 520, Tx('45 %', 170, 'var(--a1)'), { a: 'pop', w: 110, d: .3 }),
    E(250, 700, O.disc({ w: 150, fill: P.coral }), { a: 'pop', m: [{ w: 110, dx: 580, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1090, Tx('DÉPLACÉ', 260, 'var(--a1)'), { a: 'stamp', w: 110, d: .2, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 4 — L'ANCRAGE ===== */
  S(113, 4, bg => [
    E(540, 560, O.anchor({ w: 520, col: fg(bg) }), { a: 'drop', w: 115, sfx: 'thud' }),
    E(540, 300, Tx("ÇA S'APPELLE", 160), { a: 'down', hw: 115 }),
    E(540, 1150, Tx("L'ANCRAGE", 228, 'var(--a1)'), { a: 'stamp', w: 115, d: .3, sfx: 'stamp' }),
  ]);
  S(116, 4, bg => [
    E(540, 520, Tx('1ER', 420, 'var(--a1)'), { a: 'stamp', w: 117, sfx: 'stamp' }),
    E(540, 900, Tx('CHIFFRE', 260), { a: 'up', w: 118 }),
    E(540, 1180, O.eye({ w: 320 }), { a: 'pop', w: 121, sfx: 'pop' }),
  ]);
  S(122, 4, bg => [
    E(540, 480, O.pin({ w: 360, fill: light(bg) ? P.coral : P.yellow, ink: P[bg] }), { a: 'drop', w: 124, dur: .5, sfx: 'thud' }),
    E(540, 920, Tx('POINT DE', 180), { a: 'up', w: 124 }),
    E(540, 1190, Tx('DÉPART', 240, 'var(--a1)'), { a: 'stamp', w: 126, sfx: 'stamp' }),
  ]);
  S(127, 4, bg => [
    E(540, 820, O.rect(900, 16, fg(bg), 8), { a: 'none', cut: false }),
    E(180, 760, O.anchor({ w: 240, col: fg(bg) }), { a: 'none' }),
    E(360, 660, who(bg, { w: 220 }), { a: 'none', m: [{ w: 130, dx: 430, dur: .5, e: 'inOut', sfx: 'whoosh' }, { w: 131, d: .25, dx: 150, dur: .35, e: 'outBack', sfx: 'swish' }] }),
    E(540, 1150, Tx("TU T'ÉLOIGNES…", 160, 'var(--a1)'), { a: 'up', w: 130 }),
  ]);
  S(132, 4, bg => [
    E(540, 620, Tx('JAMAIS', 340), { a: 'stamp', sfx: 'stamp' }),
    E(540, 980, Tx('ASSEZ', 340, 'var(--a1)'), { a: 'stamp', w: 133, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 5 — SUR L'ÉTIQUETTE ===== */
  S(134, 5, bg => [
    E(540, 720, O.ptag({ w: 900, fill: tagFill(bg) }), { a: 'pop', sfx: 'pop', rot: 4 }),
  ]);
  S(136, 5, bg => [
    E(540, 420, O.anchor({ w: 340, col: fg(bg) }), { a: 'drop', sfx: 'thud' }),
    E(540, 760, Tx('=', 220), { a: 'pop', w: 137 }),
    E(540, 1060, Tx('120 €', 340, 'var(--a1)'), { a: 'stamp', w: 139, sfx: 'stamp' }),
    strike(1060, 720, { col: fg(bg), draw: { w: 140 } }),
  ]);
  S(141, 5, bg => [
    E(540, 700, Tx('60 €', 520), { a: 'pop', sfx: 'pop', m: [{ w: 144, o: .25, s: .8, dur: .3, e: 'outCubic' }] }),
    E(540, 1150, Tx('TOUT SEUL ? NON.', 128, 'var(--a1)'), { a: 'up', w: 144 }),
  ]);
  S(146, 5, bg => [
    E(320, 1100 - 150, O.bar(300, { w: 260, fill: P.coral, grow: { w: 148, sfx: 'rise' } }), { a: 'none' }),
    E(320, 1180, Tx('60', 150), { a: 'pop', w: 148 }),
    E(540, 330, Tx('TU JUGES', 220), { a: 'down' }),
  ]);
  S(149, 5, bg => [
    E(320, 1100 - 150, O.bar(300, { w: 260, fill: P.coral, grow: { dur: .01 } }), { a: 'none' }),
    E(320, 1180, Tx('60', 150), { a: 'none' }),
    E(760, 1100 - 300, O.bar(600, { w: 260, fill: fg(bg), grow: { w: 152, dur: .5, sfx: 'rise' } }), { a: 'none' }),
    E(760, 1180, Tx('120', 150), { a: 'pop', w: 152 }),
    E(540, 300, Tx('PAR RAPPORT À', 150, 'var(--a1)'), { a: 'down' }),
  ]);
  S(153, 5, bg => [
    E(540, 620, O.book('ÉTUDES', { w: 520, fs: 110, fill: light(bg) ? P.navy : P.cream, ink: light(bg) ? P.cream : P.navy }), { a: 'drop', sfx: 'thud' }),
    E(540, 1180, Tx('DE MARKETING', 160, 'var(--a1)'), { a: 'up', w: 157 }),
  ]);
  S(158, 5, bg => [
    E(540, 820, O.calendar('ANNÉES 80', { w: 700, fs: 112 }), { a: 'spin', w: 160, sfx: 'swish' }),
    E(540, 270, Tx('DEPUIS LES', 150), { a: 'down', w: 160 }),
    E(540, 700, Tx('ELLES LE RÉPÈTENT', 130, 'var(--a1)'), { a: 'pop', hw: 160 }),
  ]);
  S(164, 5, bg => [
    E(540, 900, O.tag('RÉFÉRENCE', { w: 760, fs: 100, fill: tagFill(bg) }), { a: 'pop', sfx: 'pop', m: [{ w: 168, dy: -120, dur: .4 }] }),
    E(540, 380, Tx('PLUS LE PRIX DE', 140), { a: 'down' }),
  ]);
  S(169, 5, bg => [
    E(540, 860, O.tag('RÉFÉRENCE', { w: 760, fs: 100, fill: tagFill(bg) }), { a: 'none', m: [{ d: 0, dy: -300, s: 1.1, dur: .7, e: 'outCubic' }] }),
    E(540, 1010, O.arrow({ w: 360, fill: P.coral }), { a: 'up', rot: -90, sfx: 'rise', loop: 'float', amp: 16, per: .7 }),
    E(540, 1210, Tx('EST HAUT', 190, 'var(--a1)'), { a: 'stamp', w: 171, sfx: 'stamp' }),
  ]);
  S(172, 5, bg => [
    E(540, 560, O.burst({ w: 1000, n: 14, col: light(bg) ? P.coral : P.yellow }), { a: 'pop', w: 174, loop: 'spin', per: 5, cut: false }),
    E(540, 560, O.tag('60 €', { w: 700, fill: tagFill(bg) }), { a: 'pop', sfx: 'pop' }),
    E(540, 1000, Tx("L'OFFRE PARAÎT", 140), { a: 'up', w: 173 }),
    E(540, 1200, Tx('BONNE', 200, 'var(--a1)'), { a: 'stamp', w: 175, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 6 — LA LOI ===== */
  S(176, 6, bg => [
    E(540, 300, Tx("C'EST POUR ÇA", 160), { a: 'down', hw: 179 }),
    E(540, 640, O.pin({ w: 380, fill: light(bg) ? P.coral : P.yellow, ink: P[bg] }), { a: 'drop', w: 179, dur: .5, sfx: 'thud' }),
    E(540, 1130, Tx('EN FRANCE', 250, 'var(--a1)'), { a: 'stamp', w: 180, sfx: 'stamp' }),
  ]);
  S(181, 6, bg => [
    E(540, 420, Tx('DEPUIS', 200), { a: 'down' }),
    E(540, 840, Tx(cnt({ from: 2010, to: 2022, w: 182, dur: .45, sfx: 'tick' }), 440, 'var(--a1)'), { a: 'pop' }),
  ]);
  S(183, 6, bg => [
    E(540, 640, O.book('LOI', { w: 560, fs: 220, fill: light(bg) ? P.navy : P.cream, ink: light(bg) ? P.cream : P.navy }), { a: 'drop', sfx: 'thud' }),
    E(540, 1190, Tx('ENCADRE', 240, 'var(--a1)'), { a: 'stamp', w: 185, sfx: 'stamp' }),
  ]);
  S(186, 6, bg => [
    E(540, 700, Tx('120 €', 420), { a: 'pop', sfx: 'pop' }),
    E(540, 690, O.line('M20,20 H880 V420 H20 Z', { w: 900, vw: 900, vh: 440, col: P.coral, sw: 26, draw: { d: .15, dur: .6 } }), { a: 'none', cut: false }),
    E(540, 1150, Tx('CE CHIFFRE', 210, 'var(--a1)'), { a: 'up', w: 187 }),
  ]);
  S(188, 6, bg => [
    E(540, 560, Tx('120 €', 400), { a: 'pop' }),
    strike(560, 840, { draw: { w: 190 } }),
    E(540, 1010, Tx('DOIT ÊTRE…', 220, 'var(--a1)'), { a: 'up', w: 191 }),
  ]);
  S(193, 6, bg => [
    E(250, 1040 - 260, O.bar(520, { w: 220, fill: fg(bg), grow: { dur: .3 } }), { a: 'none' }),
    E(540, 1040 - 190, O.bar(380, { w: 220, fill: fg(bg), grow: { d: .08, dur: .3 } }), { a: 'none' }),
    E(830, 1040 - 110, O.bar(220, { w: 220, fill: P.coral, grow: { d: .16, dur: .3 } }), { a: 'none', loop: 'pulse', amp: .05, per: .6, lw: 195 }),
    E(830, 700, O.arrow({ w: 200, fill: P.coral }), { a: 'down', w: 195, rot: 90, sfx: 'fall' }),
    E(540, 1210, Tx('LE PLUS BAS', 220, 'var(--a1)'), { a: 'stamp', w: 195, sfx: 'stamp' }),
  ]);
  S(196, 6, bg => [
    E(330, 700, who(bg, { w: 380 }), { a: 'up', sfx: 'pop' }),
    E(740, 760, O.register({ w: 420, fill: bg === 'yellow' ? P.coral : P.yellow }), { a: 'pop', d: .12 }),
    E(540, 990, O.rect(940, 80, light(bg) ? P.navy : P.cream, 14), { a: 'none' }),
    E(540, 1200, Tx('LE VENDEUR', 220, 'var(--a1)'), { a: 'up', w: 199 }),
  ]);
  S(200, 6, bg => [
    E(540, 640, O.calendar('30 JOURS', { w: 720, fs: 130 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1180, Tx("D'AVANT", 250, 'var(--a1)'), { a: 'stamp', w: 204, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 7 — DÉFI ===== */
  S(205, 7, bg => [
    E(540, 560, Tx('LA PROCHAINE', 180), { a: 'down' }),
    E(540, 900, Tx('FOIS', 420, 'var(--a1)'), { a: 'stamp', w: 208, sfx: 'stamp' }),
  ]);
  S(209, 7, bg => [
    E(540, 640, O.ptag({ w: 900, fill: tagFill(bg) }), { a: 'pop', sfx: 'pop' }),
    E(540, 1180, Tx('CACHE-LE', 240, 'var(--a1)'), { a: 'stamp', d: .15, sfx: 'stamp' }),
  ]);
  S(213, 7, bg => [
    E(540, 700, O.ptag({ w: 900, fill: tagFill(bg) }), { a: 'none' }),
    E(858, 613, O.thumb({ w: 400, fill: bg === 'yellow' ? P.coral : P.yellow }), { a: 'right', dist: 900, w: 214, rot: -90, sfx: 'swish' }),
  ]);
  S(216, 7, bg => [
    E(540, 620, O.brain({ w: 620, fill: light(bg) ? P.coral : P.cream, fold: light(bg) ? P.cream : P.coral }), { a: 'pop', sfx: 'pop', loop: 'float', per: 1.2 }),
    E(540, 1130, Tx('DEMANDE-TOI', 200, 'var(--a1)'), { a: 'up', w: 217 }),
  ]);
  S(218, 7, bg => [
    E(540, 560, Tx('60 €', 470, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1060, O.pull({ w: 420, fill: pullFill(bg) }), { a: 'pop', w: 219, sfx: 'pop' }),
  ]);
  S(221, 7, bg => [
    E(540, 520, Tx('TU LES', 260), { a: 'down' }),
    E(540, 790, Tx('AURAIS', 260), { a: 'up', w: 223 }),
    E(540, 1100, Tx('MIS ?', 380, 'var(--a1)'), { a: 'stamp', w: 224, sfx: 'stamp', loop: 'pulse', amp: .04, per: .6 }),
  ]);
})();
