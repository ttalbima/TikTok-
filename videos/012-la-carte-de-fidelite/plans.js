/* Vidéo 012 — « La carte de fidélité déjà tamponnée »
   Plans calés sur les indices de mots de mots.json. Le fond suit le cycle de la palette. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;
  const svg = (w, vw, vh, inner) => `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;

  /* ----- objets propres à cette vidéo ----- */
  // carte de fidélité : n cases, `filled` déjà tamponnées
  O.carte = (n, filled, o = {}) => {
    const { w = 760, fill = P.cream, band = P.navy, ink = P.cream, label = 'FIDÉLITÉ', mark = P.coral } = o;
    const cols = n / 2, step = (800 - 180) / (cols - 1);
    let cells = '';
    for (let i = 0; i < n; i++) {
      const cx = 90 + (i % cols) * step, cy = 250 + Math.floor(i / cols) * 150;
      cells += i < filled
        ? `<circle cx="${cx}" cy="${cy}" r="52" fill="${mark}"/><path d="M${cx - 24},${cy + 2} l17,17 l31,-36" fill="none" stroke="${P.cream}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>`
        : `<circle cx="${cx}" cy="${cy}" r="48" fill="rgba(20,33,61,.08)" stroke="${P.navy}" stroke-width="8" opacity=".45" stroke-dasharray="14 12"/>`;
    }
    return svg(w, 800, 500,
      `<rect width="800" height="500" rx="36" fill="${fill}"/><path d="M0,36 a36,36 0 0 1 36,-36 H764 a36,36 0 0 1 36,36 V130 H0 Z" fill="${band}"/>
       <text x="400" y="98" text-anchor="middle" font-size="84" fill="${ink}">${label}</text>${cells}`);
  };
  // tampon encreur
  O.tampon = (o = {}) => {
    const { w = 260, col = P.coral, handle = P.navy } = o;
    return svg(w, 260, 360, `<rect x="92" y="0" width="76" height="210" rx="38" fill="${handle}"/><rect x="60" y="190" width="140" height="70" rx="16" fill="${handle}"/>
      <path d="M20,250 H240 L260,330 H0 Z" fill="${col}"/><rect x="0" y="322" width="260" height="38" rx="10" fill="${T.coral2}"/>`);
  };
  // tasse de café
  O.tasse = (o = {}) => {
    const { w = 420, fill = P.cream, coffee = P.navy, steam = P.cream } = o;
    return svg(w, 420, 420,
      `<g fill="none" stroke="${steam}" stroke-width="16" stroke-linecap="round" opacity=".8"><path d="M130,90 q-26,-36 0,-72"/><path d="M210,100 q26,-40 0,-84"/><path d="M290,90 q-26,-36 0,-72"/></g>
       <path d="M330,190 h30 a56,56 0 0 1 0,112 h-36" fill="none" stroke="${fill}" stroke-width="30"/>
       <path d="M60,150 H350 V290 a110,110 0 0 1 -110,110 H170 a110,110 0 0 1 -110,-110 Z" fill="${fill}"/>
       <rect x="84" y="170" width="242" height="34" rx="17" fill="${coffee}"/>`);
  };
  // voiture
  O.voiture = (o = {}) => {
    const { w = 640, fill = P.coral, glass = P.cream } = o;
    return svg(w, 640, 320,
      `<path d="M40,240 V170 Q50,140 110,130 L190,40 Q205,20 240,20 H420 Q450,20 470,42 L540,130 Q610,140 610,180 V240 Z" fill="${fill}"/>
       <path d="M224,60 H310 V130 H164 Z M340,60 H410 L474,130 H340 Z" fill="${glass}"/>
       <circle cx="170" cy="250" r="62" fill="${P.navy}"/><circle cx="170" cy="250" r="24" fill="${glass}"/>
       <circle cx="480" cy="250" r="62" fill="${P.navy}"/><circle cx="480" cy="250" r="24" fill="${glass}"/>`);
  };
  // drapeau d'arrivée
  O.drapeau = (o = {}) => {
    const { w = 300, pole = P.cream, a = P.cream, b = P.navy } = o;
    let sq = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) sq += `<rect x="${40 + c * 60}" y="${10 + r * 50}" width="60" height="50" fill="${(r + c) % 2 ? b : a}"/>`;
    return svg(w, 300, 520, `<rect x="16" y="0" width="24" height="520" rx="12" fill="${pole}"/><rect x="36" y="6" width="248" height="208" fill="${a}"/>${sq}`);
  };
  // cadeau
  O.cadeau = (o = {}) => {
    const { w = 460, fill = P.coral, ribbon = P.yellow } = o;
    return svg(w, 460, 460,
      `<path d="M230,110 C150,10 60,60 120,110 Z M230,110 C310,10 400,60 340,110 Z" fill="${ribbon}"/>
       <rect x="20" y="110" width="420" height="100" rx="14" fill="${fill}"/><rect x="50" y="210" width="360" height="250" rx="10" fill="${fill}"/>
       <rect x="50" y="210" width="360" height="26" fill="rgba(0,0,0,.18)"/><rect x="196" y="110" width="68" height="350" fill="${ribbon}"/>`);
  };
  // portefeuille
  O.portefeuille = (o = {}) => {
    const { w = 640, fill = P.navy } = o;
    return svg(w, 640, 420,
      `<rect x="0" y="40" width="640" height="380" rx="44" fill="${fill}"/><rect x="0" y="40" width="640" height="130" rx="44" fill="rgba(0,0,0,.25)"/>
       <rect x="440" y="170" width="200" height="130" rx="30" fill="${T.navy2}"/><circle cx="500" cy="235" r="28" fill="${P.yellow}"/>`);
  };
  // barre de progression (fond + remplissage dessiné)
  const barre = (x, y, pct, draw, col = P.coral) => [
    E(x, y, O.rect(820, 90, 'rgba(20,33,61,.22)', 45), { a: 'none', cut: false }),
    pct > 0 ? E(x, y, O.line(`M45,45 H${45 + 730 * pct}`, { w: 820, vw: 820, vh: 90, col, sw: 90, draw }), { a: 'none', cut: false }) : '',
  ].join('');

  V.style = 2;        // charte validée le 26/11/2026
  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f) => { const bg = CYCLE[k++ % 5]; shot({ w, bg, scene, html: f(bg) }); };
  // couleurs lisibles selon le fond
  const carte = (bg, n, f, o = {}) => O.carte(n, f, bg === 'cream' ? { fill: P.yellow, ...o } : bg === 'navy' ? { band: P.coral, mark: P.navy, ...o } : bg === 'coral' ? { mark: P.navy, ...o } : o);
  const tasse = (bg, o = {}) => O.tasse(bg === 'cream' ? { fill: P.coral, steam: P.navy, ...o } : bg === 'yellow' ? { steam: P.navy, ...o } : bg === 'navy' ? { coffee: P.coral, ...o } : o);
  const qui = bg => (bg === 'navy' || bg === 'green' ? P.cream : P.navy);
  const tamp = bg => O.tampon(bg === 'coral' ? { col: P.yellow, w: 240 } : bg === 'navy' ? { handle: P.cream, w: 240 } : { w: 240 });

  const cher = (bg, o = {}) => O.person({ w: 340, fill: bg === 'navy' ? P.yellow : P.navy, coat: true, ink: P.cream, ...o });
  const acc = bg => (bg === 'coral' ? P.yellow : P.coral);
  // geste du tampon : descend sur le mot w, puis remonte
  const frappe = (w, dx, dy = 200) => [{ w, d: -.1, dx, dy, dur: .1, e: 'inOut', sfx: 'stamp', so: .1 }, { w, d: .08, dx, dy: 0, dur: .15 }];

  V.keywords = [1, 7, 12, 15, 20, 28, 33, 40, 44, 49, 55, 60, 67, 76, 80, 88, 90, 100, 101, 108, 109, 117, 123, 133, 141, 149, 159, 170, 174, 184, 193, 200, 209, 212, 219, 226, 237];

  /* ===== SCÈNE 1 — HOOK : la carte reste à l'écran pendant toute l'accroche ===== */
  S(0, 1, bg => [
    E(540, 760, carte(bg, 10, 0, { w: 880 }), { a: 'pop', hw: 1, sfx: 'pop' }),
    E(540, 760, carte(bg, 10, 1, { w: 880 }), { a: 'none', w: 1, hw: 2 }),
    E(540, 760, carte(bg, 10, 2, { w: 880 }), { a: 'none', w: 2 }),
    E(330, 380, tamp(bg), { a: 'down', dist: 300, m: [...frappe(1, -135), ...frappe(2, 15)] }),
    E(540, 1190, Tx('2 TAMPONS OFFERTS', 115, 'var(--a1)'), { a: 'up', d: .1 }),
  ]);
  S(3, 1, bg => [
    E(540, 760, carte(bg, 10, 2, { w: 880 }), { a: 'none' }),
    ...[0, 1, 2].map(i => E(300 + i * 240, 340, O.arrow({ w: 200 + i * 40, fill: i === 2 ? acc(bg) : qui(bg) }), { a: 'left', d: .1 + i * .12, sfx: i ? undefined : 'whoosh' })),
    E(540, 1190, Tx('TU REVIENS + VITE', 115, 'var(--a1)'), { a: 'up', w: 4 }),
  ]);

  /* ===== SCÈNE 2 — RETAINER ===== */
  S(8, 2, bg => [
    E(540, 760, carte(bg, 10, 2, { w: 880 }), { a: 'none', m: [{ w: 11, s: 1.05, dur: .2 }, { w: 11, d: .25, s: 1, dur: .2 }] }),
    E(540, 1190, Tx('POURTANT…', 150), { a: 'up', d: .1 }),
    E(540, 340, Tx('RIEN GAGNÉ', 170, 'var(--a1)'), { a: 'down', w: 10, sfx: 'stamp' }),
  ]);
  S(13, 2, bg => [
    E(540, 560, O.clipboard({ w: 400 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1090, Tx('FAIS LE TEST', 190, 'var(--a1)'), { a: 'up', d: .1 }),
    E(200, 620, O.magnifier({ w: 300, ring: bg === 'coral' ? P.navy : P.coral }), { a: 'left', w: 17, sfx: 'whoosh', m: [{ w: 18, dx: 420, dy: -60, dur: .5, e: 'inOut' }, { w: 20, dx: 300, dy: 40, dur: .4, e: 'inOut' }] }),
  ]);

  /* ===== SCÈNE 3 — LE TEST ===== */
  S(21, 3, bg => [
    E(290, 640, carte(bg, 8, 0, { w: 470, label: 'A' }), { a: 'left', rot: -5, sfx: 'swish' }),
    E(790, 760, carte(bg, 10, 2, { w: 470, label: 'B' }), { a: 'right', d: .12, rot: 5 }),
    E(540, 1170, Tx('2 CARTES', 240, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  S(25, 3, bg => [
    E(290, 400, carte(bg, 8, 0, { w: 420, label: 'A' }), { a: 'none', rot: -5 }),
    E(790, 400, carte(bg, 10, 2, { w: 420, label: 'B' }), { a: 'none', rot: 5 }),
    E(540, 820, tasse(bg, { w: 380 }), { a: 'pop', sfx: 'pop', loop: 'float', per: 1.5 }),
    E(540, 1190, Tx('MÊME CAFÉ', 220, 'var(--a1)'), { a: 'up', w: 26 }),
  ]);
  S(29, 3, bg => [
    E(540, 600, carte(bg, 8, 0, { w: 880, label: 'A' }), { a: 'drop', sfx: 'thud' }),
    E(540, 1110, Tx(`${cnt({ from: 0, to: 8, w: 31, dur: .5, sfx: 'tick' })} CASES VIDES`, 170, 'var(--a1)'), { a: 'up', w: 31 }),
  ]);
  S(34, 3, bg => [
    ...Array.from({ length: 8 }, (_, i) => E(250 + (i % 3) * 290, 380 + Math.floor(i / 3) * 250, tasse(bg, { w: 190 }), { a: 'pop', d: i * .06, dur: .2, sfx: i % 3 === 0 ? 'pop' : undefined })),
    E(830, 880, O.burst({ w: 420, n: 12, col: acc(bg) }), { a: 'pop', w: 38, loop: 'spin', per: 5, cut: false }),
    E(830, 880, tasse(bg, { w: 190 }), { a: 'spin', w: 38, sfx: 'ding' }),
    E(540, 1190, Tx('8 CAFÉS', 220, 'var(--a1)'), { a: 'up', d: .2, hw: 38 }),
    E(540, 1190, Tx('LE 9E OFFERT', 180, 'var(--a1)'), { a: 'up', w: 38 }),
  ]);
  S(41, 3, bg => [
    E(540, 600, carte(bg, 10, 0, { w: 880, label: 'B' }), { a: 'right', sfx: 'swish' }),
    E(540, 1110, Tx(`${cnt({ from: 0, to: 10, w: 43, dur: .5, sfx: 'tick' })} CASES`, 220, 'var(--a1)'), { a: 'up', w: 43 }),
  ]);
  S(45, 3, bg => [
    E(540, 780, carte(bg, 10, 0, { w: 880, label: 'B' }), { a: 'none', hw: 46 }),
    E(540, 780, carte(bg, 10, 1, { w: 880, label: 'B' }), { a: 'none', w: 46, hw: 48 }),
    E(540, 780, carte(bg, 10, 2, { w: 880, label: 'B' }), { a: 'none', w: 48 }),
    E(330, 400, tamp(bg), { a: 'down', dist: 300, m: [...frappe(46, -135), ...frappe(48, 15)] }),
    E(540, 1210, Tx('DÉJÀ TAMPONNÉES', 130, 'var(--a1)'), { a: 'up', w: 48, dist: 200 }),
  ]);
  S(50, 3, bg => [
    E(540, 440, carte(bg, 8, 0, { w: 560, label: 'A' }), { a: 'left' }),
    E(540, 860, carte(bg, 10, 2, { w: 560, label: 'B' }), { a: 'right', d: .1 }),
    E(540, 1200, Tx('LAQUELLE ?', 200, 'var(--a1)'), { a: 'up', d: .25, sfx: 'stamp' }),
    E(930, 440, Tx('?', 260, 'var(--a1)'), { a: 'pop', w: 51, rot: 10, loop: 'swing', amp: 6, per: .8 }),
    E(150, 860, Tx('?', 260, 'var(--a1)'), { a: 'pop', w: 52, rot: -10, loop: 'swing', amp: 6, per: .8 }),
  ]);
  S(56, 3, bg => [
    E(540, 340, Tx('CHOISIS', 260), { a: 'down', sfx: 'stamp' }),
    E(290, 760, carte(bg, 8, 0, { w: 460, label: 'A' }), { a: 'pop', d: .1, loop: 'pulse', amp: .05, per: .5 }),
    E(790, 760, carte(bg, 10, 2, { w: 460, label: 'B' }), { a: 'pop', d: .2, loop: 'pulse', amp: .05, per: .5 }),
    E(540, 1170, Tx(`${cnt({ from: 2, to: 0, w: 59, dur: .9, sfx: 'tick' })} SECONDES`, 170, 'var(--a1)'), { a: 'up', w: 57 }),
  ]);

  /* ===== SCÈNE 4 — ON COMPTE ===== */
  S(61, 4, bg => [
    E(540, 330, Tx('COMPTE', 240, 'var(--a1)'), { a: 'down', sfx: 'stamp' }),
    E(540, 800, carte(bg, 8, 0, { w: 820, label: 'A' }), { a: 'drop', d: .1, sfx: 'thud', m: [{ w: 62, s: 1.06, dur: .2 }, { w: 62, d: .3, s: 1, dur: .2 }] }),
  ]);
  S(64, 4, bg => [
    E(300, 600, Tx('8', 560, 'var(--a1)'), { a: 'pop', sfx: 'pop' }),
    E(760, 620, tasse(bg, { w: 400 }), { a: 'right', d: .1 }),
    E(540, 1130, Tx('CAFÉS À PAYER', 150), { a: 'up', d: .2 }),
  ]);
  S(68, 4, bg => [
    E(540, 520, carte(bg, 10, 2, { w: 760, label: 'B' }), { a: 'left', sfx: 'swish' }),
    E(540, 1080, Tx('10 − 2', 300, 'var(--a1)'), { a: 'up', w: 70, sfx: 'pop' }),
  ]);
  S(73, 4, bg => [
    E(540, 480, Tx('= 8', 460, 'var(--a1)'), { a: 'down', sfx: 'stamp' }),
    E(540, 860, tasse(bg, { w: 300 }), { a: 'spin', d: .1 }),
    E(540, 1190, Tx('CAFÉS À PAYER', 150), { a: 'up', d: .2 }),
  ]);
  S(77, 4, bg => [
    E(300, 900 - 250, O.bar(500, { w: 240, fill: qui(bg), grow: { dur: .4, sfx: 'rise' } }), { a: 'none' }),
    E(780, 900 - 250, O.bar(500, { w: 240, fill: acc(bg), grow: { d: .12, dur: .4 } }), { a: 'none' }),
    E(300, 300, Tx('A', 200), { a: 'pop', d: .3 }), E(780, 300, Tx('B', 200), { a: 'pop', d: .4 }),
    E(540, 640, Tx('=', 300), { a: 'pop', d: .5, sfx: 'pop' }),
    E(540, 1110, Tx('MÊME EFFORT', 180, 'var(--a1)'), { a: 'up', d: .6 }),
  ]);
  // phrase ajoutée : « La seule différence, c'est l'impression d'avoir déjà commencé. » (les deux cartes restent)
  S(81, 4, bg => [
    E(290, 520, carte(bg, 8, 0, { w: 460, label: 'A' }), { a: 'up', sfx: 'pop' }),
    E(790, 520, carte(bg, 10, 2, { w: 460, label: 'B' }), { a: 'up', d: .1 }),
    E(540, 1060, Tx('SEULE DIFFÉRENCE', 120, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  S(84, 4, bg => [
    E(290, 520, carte(bg, 8, 0, { w: 460, label: 'A' }), { a: 'none', m: [{ d: .1, o: .3, dur: .3 }] }),
    E(790, 520, carte(bg, 10, 2, { w: 460, label: 'B' }), { a: 'none', m: [{ d: .1, dx: -250, dy: 30, s: 1.45, dur: .4, e: 'inOut', sfx: 'whoosh' }] }),
    barre(540, 1010, .2, { w: 86, dur: .4, sfx: 'rise' }, acc(bg)),
    E(540, 1200, Tx('DÉJÀ COMMENCÉ', 150, 'var(--a1)'), { a: 'up', w: 87 }),
  ]);

  /* ===== SCÈNE 5 — L'EXPÉRIENCE DE 2006 ===== */
  S(89, 5, bg => [
    E(540, 420, O.calendar('2006', { w: 520, fs: 160 }), { a: 'spin', sfx: 'swish' }),
    E(320, 980, cher(bg, { w: 300 }), { a: 'left', w: 91, sfx: 'pop' }),
    E(760, 980, cher(bg, { w: 300 }), { a: 'right', w: 91, d: .12 }),
  ]);
  S(95, 5, bg => [
    E(540, 640, O.voiture({ w: 760, fill: acc(bg) }), { a: 'right', dist: 900, sfx: 'whoosh' }),
    ...[[220, 330], [400, 260], [660, 300], [860, 380], [300, 440]].map(([x, y], i) => E(x, y, O.disc({ w: 70 + (i % 3) * 30, fill: P.cream }), { a: 'pop', d: .2 + i * .08, loop: 'float', per: 1 + i * .2, cut: false })),
    E(540, 1110, Tx('LAVAGE AUTO', 200, 'var(--a1)'), { a: 'up', w: 97 }),
  ]);
  S(101, 5, bg => [
    ...Array.from({ length: 10 }, (_, i) => E(170 + (i * 233) % 760, 900 + (i * 131) % 330, carte(bg, 10, i % 2 ? 2 : 0, { w: 250 }), { a: 'drop', d: i * .07, dur: .45, rot: (i * 37) % 40 - 20, sfx: i % 4 === 0 ? 'swish' : undefined })),
    E(540, 480, Tx(cnt({ from: 0, to: 300, dur: .7, sfx: 'tick' }), 520, 'var(--a1)'), { a: 'pop' }),
  ]);
  S(104, 5, bg => [
    E(290, 520, carte(bg, 8, 0, { w: 440, label: 'A' }), { a: 'left' }),
    E(790, 520, carte(bg, 10, 2, { w: 440, label: 'B' }), { a: 'right', d: .1 }),
    E(290, 880, Tx('150', 260, 'var(--a1)'), { a: 'pop', d: .2, sfx: 'pop' }),
    E(790, 880, Tx('150', 260, 'var(--a1)'), { a: 'pop', d: .35, sfx: 'pop' }),
    E(540, 1170, Tx('MOITIÉ - MOITIÉ', 140), { a: 'up', d: .15 }),
  ]);
  // « Résultat : la carte déjà tamponnée » : un seul plan
  S(109, 5, bg => [
    E(540, 330, Tx('RÉSULTAT', 230, 'var(--a1)'), { a: 'down', sfx: 'stamp' }),
    E(540, 780, O.burst({ w: 1050, n: 16, col: acc(bg) }), { a: 'pop', w: 110, d: .1, loop: 'spin', per: 7, cut: false }),
    E(540, 780, carte(bg, 10, 2, { w: 760, label: 'B' }), { a: 'spin', w: 110, sfx: 'pop', m: [{ w: 113, s: 1.07, dur: .2 }, { w: 113, d: .25, s: 1, dur: .2 }] }),
    E(540, 1220, Tx('DÉJÀ TAMPONNÉE', 130), { a: 'up', w: 111, dist: 200 }),
  ]);
  S(114, 5, bg => [
    E(300, 1010 - 130, O.bar(260, { w: 240, fill: qui(bg), grow: { dur: .4 } }), { a: 'none' }),
    E(780, 1010 - 290, O.bar(580, { w: 240, fill: acc(bg), grow: { d: .15, dur: .6, sfx: 'rise' } }), { a: 'none' }),
    E(300, 1090, Tx('A', 130), { a: 'fade', cut: false }), E(780, 1090, Tx('B', 130), { a: 'fade', cut: false }),
    E(780, 330, O.crown({ w: 240, fill: bg === 'yellow' ? P.navy : P.yellow }), { a: 'drop', w: 115, dur: .45, sfx: 'ding' }),
    E(540, 1250, Tx('TERMINÉE + SOUVENT', 110, 'var(--a1)'), { a: 'up', w: 115, d: .2, dist: 200 }),
  ]);
  S(118, 5, bg => [
    E(770, 640, O.voiture({ w: 480, fill: acc(bg) }), { a: 'pop' }),
    E(180, 660, O.person({ w: 280, fill: qui(bg) }), { a: 'left', d: .1, m: [{ w: 121, dx: 240, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1130, Tx('ILS REVIENNENT', 150, 'var(--a1)'), { a: 'up', d: .2 }),
  ]);
  S(123, 5, bg => [
    E(540, 600, O.clock({ w: 640 }), { a: 'spin', sfx: 'pop' }),
    E(540, 600, O.hand({ w: 640 }), { a: 'none', loop: 'spin', per: .7, cut: false }),
    E(540, 1130, Tx('+ VITE', 300, 'var(--a1)'), { a: 'up', d: .1, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 6 — LE MÉCANISME ===== */
  // « Ils appellent ça l'effet de progrès offert. » : la barre porte le titre
  S(127, 6, bg => [
    E(540, 330, Tx("L'EFFET DE", 170), { a: 'down', d: .1 }),
    barre(540, 760, .2, { w: 130, dur: .4, sfx: 'rise' }, acc(bg)),
    E(220, 560, O.cadeau({ w: 250, fill: bg === 'coral' ? P.navy : P.coral }), { a: 'drop', w: 132, dur: .4, sfx: 'ding' }),
    E(540, 1090, Tx('PROGRÈS OFFERT', 140, 'var(--a1)'), { a: 'up', w: 131 }),
  ]);
  S(134, 6, bg => [
    E(540, 480, carte(bg, 8, 0, { w: 720, label: 'A' }), { a: 'drop', sfx: 'thud' }),
    barre(540, 880, 0),
    E(540, 1130, Tx('TÂCHE À COMMENCER', 118, 'var(--a1)'), { a: 'up', w: 138 }),
  ]);
  S(142, 6, bg => [
    E(540, 480, carte(bg, 10, 2, { w: 720, label: 'B' }), { a: 'left', sfx: 'swish' }),
    barre(540, 880, .2, { w: 144, dur: .4, sfx: 'rise' }, acc(bg)),
    E(540, 1130, Tx('TÂCHE À FINIR', 160, 'var(--a1)'), { a: 'up', w: 146 }),
  ]);
  // « Et une tâche entamée, on a envie de la finir. » : la même barre, qui se remplit au second plan
  S(150, 6, bg => [
    barre(540, 700, .2, { dur: .3 }, acc(bg)),
    E(540, 420, Tx('20 %', 260), { a: 'pop', sfx: 'pop' }),
    E(540, 1040, Tx('ENTAMÉE…', 220, 'var(--a1)'), { a: 'up', d: .2 }),
  ]);
  S(154, 6, bg => [
    barre(540, 700, .2, { dur: .01 }, acc(bg)),
    E(540, 700, O.line('M45,45 H775', { w: 820, vw: 820, vh: 90, col: acc(bg), sw: 90, draw: { d: .15, dur: .9, sfx: 'rise' } }), { a: 'none', cut: false }),
    E(540, 420, Tx(cnt({ from: 20, to: 100, d: .15, dur: .9, suf: ' %' }), 260), { a: 'none' }),
    E(540, 1040, Tx('ENVIE DE FINIR', 150, 'var(--a1)'), { a: 'up', d: .25 }),
  ]);

  /* ===== SCÈNE 7 — PLUS ON APPROCHE, PLUS ON ACCÉLÈRE ===== */
  S(160, 7, bg => [
    E(540, 360, O.calendar('2006', { w: 400, fs: 124 }), { a: 'spin', sfx: 'swish' }),
    E(240, 860, cher(bg, { w: 250 }), { a: 'pop', d: .15, sfx: 'pop' }),
    E(540, 830, cher(bg, { w: 280 }), { a: 'pop', d: .25 }),
    E(840, 860, cher(bg, { w: 250 }), { a: 'pop', d: .35 }),
    E(540, 1210, Tx('AUTRE ÉQUIPE', 170, 'var(--a1)'), { a: 'up', d: .3 }),
  ]);
  S(166, 7, bg => [
    E(540, 520, carte(bg, 10, 4, { w: 700 }), { a: 'right', sfx: 'swish', rot: -4 }),
    E(820, 880, tasse(bg, { w: 300 }), { a: 'pop', d: .15 }),
    E(430, 1150, Tx('CARTES DE CAFÉ', 130, 'var(--a1)'), { a: 'up', d: .25 }),
  ]);
  S(171, 7, bg => [
    E(540, 460, O.eye({ w: 560 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1010, Tx('AUTRE CHOSE', 190, 'var(--a1)'), { a: 'up', w: 172 }),
  ]);
  S(175, 7, bg => [
    E(540, 500, carte(bg, 10, 8, { w: 760 }), { a: 'drop', sfx: 'thud' }),
    E(540, 1010, O.burst({ w: 620, n: 12, col: acc(bg) }), { a: 'pop', w: 178, d: .1, loop: 'spin', per: 5, cut: false }),
    E(540, 1010, tasse(bg, { w: 300 }), { a: 'pop', w: 178, sfx: 'ding' }),
    E(200, 1010, Tx('PLUS', 150, 'var(--a1)'), { a: 'left', w: 176 }),
    E(880, 1010, Tx('QUE 2', 150, 'var(--a1)'), { a: 'right', w: 176, d: .15 }),
  ]);
  S(181, 7, bg => [
    ...[0, 1, 2].map(i => E(280 + i * 260, 520, O.arrow({ w: 240 + i * 60, fill: i === 2 ? acc(bg) : qui(bg) }), { a: 'left', d: i * .14, sfx: i ? undefined : 'whoosh' })),
    E(540, 980, Tx('+ VITE', 340, 'var(--a1)'), { a: 'up', d: .2, sfx: 'stamp' }),
  ]);
  // « Comme un coureur qui accélère en voyant la ligne. » : un seul plan
  S(185, 7, bg => [
    E(880, 660, O.drapeau({ w: 260, pole: qui(bg), a: P.cream, b: bg === 'navy' ? P.coral : P.navy }), { a: 'down', d: .1 }),
    ...[0, 1, 2].map(i => E(170, 520 + i * 130, O.rect(220 - i * 40, 26, qui(bg), 13), { a: 'left', w: 189, d: i * .06, cut: false, m: [{ w: 189, d: .4, o: 0, dur: .3, e: 'outCubic' }] })),
    E(230, 700, O.person({ w: 320, fill: qui(bg) }), { a: 'left', rot: 16, sfx: 'pop', m: [{ w: 189, dx: 420, dur: .55, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1170, Tx('IL ACCÉLÈRE', 190, 'var(--a1)'), { a: 'up', w: 188 }),
  ]);
  // phrase ajoutée : « Plus c'est proche, plus tu veux finir. »
  S(194, 7, bg => [
    E(540, 660, carte(bg, 10, 9, { w: 800 }), { a: 'pop', sfx: 'pop', hw: 197 }),
    E(540, 660, carte(bg, 10, 10, { w: 800 }), { a: 'none', w: 197 }),
    E(850, 444, tamp(bg), { a: 'down', dist: 300, m: frappe(197, 0) }),
    E(540, 1170, Tx('TU VEUX FINIR', 160, 'var(--a1)'), { a: 'up', d: .2 }),
  ]);

  /* ===== SCÈNE 8 — CONCLUSION ===== */
  S(201, 8, bg => [
    E(540, 660, carte(bg, 10, 2, { w: 860 }), { a: 'spin', sfx: 'pop' }),
    E(540, 1160, Tx('CES 2 TAMPONS', 150, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  S(205, 8, bg => [
    E(540, 600, O.cadeau({ w: 520, fill: bg === 'coral' ? P.navy : P.coral }), { a: 'drop', sfx: 'thud' }),
    E(540, 600, O.cross({ w: 620, col: bg === 'navy' ? P.cream : P.navy, draw: { d: .3, sfx: 'buzz' } }), { a: 'none', d: .3 }),
    E(540, 1150, Tx('PAS UN CADEAU', 150, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  S(210, 8, bg => [
    E(330, 560, O.arrow({ w: 460, fill: acc(bg) }), { a: 'left', sfx: 'whoosh', m: [{ w: 213, dx: 120, dur: .3 }] }),
    E(800, 560, O.person({ w: 300, fill: qui(bg) }), { a: 'pop', rot: 10, m: [{ w: 213, dx: 90, dur: .3 }] }),
    E(540, 1090, Tx('UN ÉLAN', 320, 'var(--a1)'), { a: 'up', w: 211, sfx: 'stamp' }),
  ]);
  S(216, 8, bg => [
    E(800, 600, tasse(bg, { w: 380 }), { a: 'pop' }),
    E(180, 660, O.person({ w: 300, fill: qui(bg) }), { a: 'left', m: [{ d: .25, dx: 300, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1130, Tx('TU REVIENS', 240, 'var(--a1)'), { a: 'up', d: .2 }),
  ]);
  // phrase ajoutée : « Et toi, tu crois avancer plus vite. »
  S(220, 8, bg => [
    E(260, 760, O.person({ w: 340, fill: qui(bg) }), { a: 'up', sfx: 'pop' }),
    E(720, 500, O.bubble({ w: 560, fill: bg === 'cream' ? P.navy : P.cream }), { a: 'pop', d: .15 }),
    ...[0, 1, 2].map(i => E(570 + i * 150, 450, O.arrow({ w: 130, fill: acc(bg) }), { a: 'left', w: 223, d: i * .1, cut: false, sfx: i ? undefined : 'whoosh' })),
    E(540, 1170, Tx('TU CROIS AVANCER', 122, 'var(--a1)'), { a: 'up', w: 222 }),
  ]);

  /* ===== SCÈNE 9 — BOUCLE : on te tend la carte, puis on retrouve l'image du tout premier plan ===== */
  S(227, 9, bg => [
    E(200, 700, O.person({ w: 300, fill: qui(bg) }), { a: 'pop', sfx: 'pop' }),
    E(700, 680, carte(bg, 10, 2, { w: 560 }), { a: 'right', dist: 900, d: .3, rot: -5, sfx: 'whoosh' }),
    E(540, 1170, Tx('LA PROCHAINE FOIS', 115, 'var(--a1)'), { a: 'up', d: .15 }),
  ]);
  shot({ w: 233, bg: 'navy', scene: 9, html: [
    E(540, 760, carte('navy', 10, 2, { w: 880 }), { a: 'none' }),
    E(330, 380, tamp('navy'), { a: 'down', dist: 300 }),
    E(540, 1190, Tx('DÉJÀ ENTAMÉE…', 150, 'var(--a1)'), { a: 'up', w: 236 }),
  ] });
})();
