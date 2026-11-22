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

  const CYCLE = ['navy', 'yellow', 'coral', 'green', 'cream'];
  let k = 0;
  const S = (w, scene, f) => { const bg = CYCLE[k++ % 5]; shot({ w, bg, scene, html: f(bg) }); };
  // couleurs lisibles selon le fond
  const carte = (bg, n, f, o = {}) => O.carte(n, f, bg === 'cream' ? { fill: P.yellow, ...o } : bg === 'navy' ? { band: P.coral, mark: P.navy, ...o } : bg === 'coral' ? { mark: P.navy, ...o } : o);
  const tasse = (bg, o = {}) => O.tasse(bg === 'cream' ? { fill: P.coral, steam: P.navy, ...o } : bg === 'yellow' ? { steam: P.navy, ...o } : bg === 'navy' ? { coffee: P.coral, ...o } : o);
  const qui = bg => (bg === 'navy' || bg === 'green' ? P.cream : P.navy);
  const tamp = bg => O.tampon(bg === 'coral' ? { col: P.yellow, w: 240 } : bg === 'navy' ? { handle: P.cream, w: 240 } : { w: 240 });

  V.keywords = [2, 9, 14, 17, 24, 32, 42, 44, 51, 58, 62, 71, 78, 80, 90, 91, 107, 113, 122, 131, 139, 149, 160, 174, 183, 192, 195, 202, 214];

  /* ===== SCÈNE 1 — HOOK (retouche v2 : « Deux tampons offerts, et tu finis ta carte plus vite. ») ===== */
  S(0, 1, bg => [
    E(540, 760, carte(bg, 10, 0, { w: 880 }), { a: 'pop', hw: 1, sfx: 'pop' }),
    E(540, 760, carte(bg, 10, 1, { w: 880 }), { a: 'none', w: 1, hw: 2 }),
    E(540, 760, carte(bg, 10, 2, { w: 880 }), { a: 'none', w: 2 }),
    E(330, 380, tamp(bg), { a: 'down', dist: 300, m: [{ w: 1, d: -.1, dx: -135, dy: 200, dur: .1, e: 'inOut', sfx: 'stamp', so: .1 }, { w: 1, d: .08, dx: -135, dy: 0, dur: .15 }, { w: 2, d: -.1, dx: 15, dy: 200, dur: .1, e: 'inOut', sfx: 'stamp', so: .1 }, { w: 2, d: .08, dx: 15, dy: 0, dur: .15 }] }),
    E(540, 1215, Tx('2 OFFERTS', 190, 'var(--a1)'), { a: 'up', w: 2, d: .2, dist: 200 }),
  ]);
  S(3, 1, bg => [
    E(540, 400, Tx('TU FINIS', 250), { a: 'down' }),
    E(540, 860, carte(bg, 10, 10, { w: 820 }), { a: 'pop', w: 5, sfx: 'pop' }),
  ]);
  S(8, 1, bg => [
    E(540, 520, Tx('PLUS', 260), { a: 'pop' }),
    E(540, 830, Tx('VITE', 400, 'var(--a1)'), { a: 'stamp', w: 9, sfx: 'stamp' }),
    E(540, 1170, O.arrow({ w: 420, fill: P.navy }), { a: 'left', w: 9, d: .1, sfx: 'whoosh' }),
  ]);

  /* ===== SCÈNE 2 — RETAINER (« Pourtant, tu n'as rien gagné. ») ===== */
  S(10, 2, bg => [
    E(540, 700, Tx('POURTANT…', 230), { a: 'stamp', sfx: 'stamp' }),
    E(540, 900, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.yellow, sw: 28, draw: { d: .15, dur: .25 } }), { a: 'none', cut: false }),
  ]);
  S(11, 2, bg => [
    E(540, 300, Tx('TU AS…', 150), { a: 'down' }),
    E(540, 700, Tx('0', 500, 'var(--a2)'), { a: 'stamp', w: 13, sfx: 'stamp' }),
    E(540, 1110, Tx('RIEN GAGNÉ', 200, 'var(--a1)'), { a: 'up', w: 14 }),
  ]);
  k += 2;   // deux plans de moins qu'en v1 : on saute deux couleurs pour que la suite garde ses fonds d'origine
  S(15, 2, bg => [
    E(540, 560, O.clipboard({ w: 400 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1060, Tx('FAIS LE TEST', 200, 'var(--a1)'), { a: 'stamp', w: 17, sfx: 'stamp' }),
  ]);
  S(18, 2, bg => [
    E(540, 420, O.eye({ w: 520 }), { a: 'pop', sfx: 'pop' }),
    E(540, 800, Tx('OÙ EST', 200), { a: 'up', w: 21 }),
    E(540, 1080, Tx('LE PIÈGE ?', 250, 'var(--a1)'), { a: 'stamp', w: 24, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 3 — LE TEST ===== */
  S(25, 3, bg => [
    E(290, 640, carte(bg, 8, 0, { w: 470, label: 'A' }), { a: 'left', rot: -5, sfx: 'swish' }),
    E(790, 760, carte(bg, 10, 2, { w: 470, label: 'B' }), { a: 'right', d: .12, rot: 5 }),
    E(540, 1170, Tx('2 CARTES', 240, 'var(--a1)'), { a: 'up', w: 26 }),
  ]);
  S(27, 3, bg => [
    E(540, 600, tasse(bg, { w: 560 }), { a: 'pop', sfx: 'pop', loop: 'float', per: 1.5 }),
    E(540, 1110, Tx('MÊME CAFÉ', 230, 'var(--a1)'), { a: 'stamp', w: 29, sfx: 'stamp' }),
  ]);
  S(31, 3, bg => [
    E(540, 640, Tx('CARTE', 300), { a: 'pop' }),
    E(540, 1000, Tx('A', 520, 'var(--a1)'), { a: 'stamp', w: 32, sfx: 'stamp' }),
  ]);
  S(33, 3, bg => [
    E(540, 600, carte(bg, 8, 0, { w: 880, label: 'A' }), { a: 'pop', sfx: 'pop' }),
    E(540, 1110, Tx(`${cnt({ from: 0, to: 8, dur: .6, sfx: 'tick' })} CASES VIDES`, 170, 'var(--a1)'), { a: 'fade' }),
  ]);
  S(36, 3, bg => [
    ...Array.from({ length: 8 }, (_, i) => E(195 + (i % 4) * 230, 480 + Math.floor(i / 4) * 300, tasse(bg, { w: 190 }), { a: 'pop', d: i * .07, dur: .2, sfx: i % 3 === 0 ? 'pop' : undefined })),
    E(540, 1150, Tx('8 CAFÉS', 240, 'var(--a1)'), { a: 'stamp', w: 37, sfx: 'stamp' }),
  ]);
  S(39, 3, bg => [
    E(540, 600, O.burst({ w: 1000, n: 14, col: bg === 'yellow' ? P.coral : P.yellow }), { a: 'pop', w: 41, loop: 'spin', per: 6, cut: false }),
    E(540, 600, tasse(bg, { w: 460 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1130, Tx('LE 9E OFFERT', 190, 'var(--a1)'), { a: 'stamp', w: 42, sfx: 'ding' }),
  ]);
  S(43, 3, bg => [
    E(540, 640, Tx('CARTE', 300), { a: 'pop' }),
    E(540, 1000, Tx('B', 520, 'var(--a1)'), { a: 'stamp', w: 44, sfx: 'stamp' }),
  ]);
  S(45, 3, bg => [
    E(540, 600, carte(bg, 10, 0, { w: 880, label: 'B' }), { a: 'pop', sfx: 'pop' }),
    E(540, 1110, Tx(`${cnt({ from: 0, to: 10, dur: .5, sfx: 'tick' })} CASES`, 220, 'var(--a1)'), { a: 'fade' }),
  ]);
  S(47, 3, bg => [
    E(540, 780, carte(bg, 10, 0, { w: 880, label: 'B' }), { a: 'none', hw: 48 }),
    E(540, 780, carte(bg, 10, 1, { w: 880, label: 'B' }), { a: 'none', w: 48, hw: 50 }),
    E(540, 780, carte(bg, 10, 2, { w: 880, label: 'B' }), { a: 'none', w: 50 }),
    E(330, 400, tamp(bg), { a: 'down', dist: 300, m: [{ w: 48, d: -.1, dx: -135, dy: 200, dur: .1, e: 'inOut', sfx: 'stamp', so: .1 }, { w: 48, d: .08, dx: -135, dy: 0, dur: .15 }, { w: 50, d: -.1, dx: 15, dy: 200, dur: .1, e: 'inOut', sfx: 'stamp', so: .1 }, { w: 50, d: .08, dx: 15, dy: 0, dur: .15 }] }),
    E(540, 1210, Tx('DÉJÀ TAMPONNÉES', 130, 'var(--a1)'), { a: 'up', w: 51, dist: 200 }),
  ]);
  S(52, 3, bg => [
    E(540, 440, carte(bg, 8, 0, { w: 560, label: 'A' }), { a: 'left' }),
    E(540, 860, carte(bg, 10, 2, { w: 560, label: 'B' }), { a: 'right', d: .1 }),
    E(540, 1200, Tx('LAQUELLE ?', 220, 'var(--a1)'), { a: 'stamp', w: 52, d: .25, sfx: 'stamp' }),
    E(930, 440, Tx('?', 260, 'var(--a1)'), { a: 'pop', w: 54, rot: 10, loop: 'swing', amp: 6, per: .8 }),
    E(150, 860, Tx('?', 260, 'var(--a1)'), { a: 'pop', w: 56, rot: -10, loop: 'swing', amp: 6, per: .8 }),
  ]);
  S(58, 3, bg => [
    E(540, 620, Tx('CHOISIS', 340), { a: 'stamp', sfx: 'stamp' }),
    E(300, 1000, Tx('A', 320, 'var(--a1)'), { a: 'pop', d: .2, loop: 'pulse', amp: .08, per: .5 }),
    E(780, 1000, Tx('B', 320, 'var(--a1)'), { a: 'pop', d: .32, loop: 'pulse', amp: .08, per: .5 }),
  ]);

  /* ===== SCÈNE 4 — ON COMPTE ===== */
  S(59, 4, bg => [
    E(540, 760, Tx('COMPTE', 320, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .6 }),
  ]);
  S(60, 4, bg => [
    E(540, 560, carte(bg, 8, 0, { w: 820, label: 'A' }), { a: 'drop', sfx: 'thud' }),
    E(540, 1110, Tx('CARTE A', 230, 'var(--a1)'), { a: 'up', w: 61 }),
  ]);
  S(62, 4, bg => [
    E(540, 560, Tx('8', 720, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1090, Tx('CAFÉS À PAYER', 170), { a: 'up', w: 63 }),
  ]);
  S(66, 4, bg => [
    E(540, 560, carte(bg, 10, 2, { w: 820, label: 'B' }), { a: 'drop', sfx: 'thud' }),
    E(540, 1110, Tx('CARTE B', 230, 'var(--a1)'), { a: 'up', w: 67 }),
  ]);
  S(68, 4, bg => [
    E(240, 760, Tx('10', 420), { a: 'pop', sfx: 'pop' }),
    E(560, 760, Tx('-', 420, 'var(--a1)'), { a: 'pop', w: 69, sfx: 'pop' }),
    E(820, 760, Tx('2', 420), { a: 'pop', w: 70, sfx: 'pop' }),
  ]);
  S(71, 4, bg => [
    E(540, 560, Tx('= 8', 640, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1090, Tx('CAFÉS À PAYER', 170), { a: 'up', w: 72 }),
  ]);
  S(75, 4, bg => [
    E(540, 760, Tx('EXACTEMENT', 195), { a: 'stamp', sfx: 'stamp' }),
    E(540, 960, O.line('M20,20 H880', { w: 900, vw: 900, vh: 40, col: P.coral, sw: 30, draw: { d: .2, dur: .35 } }), { a: 'none', cut: false }),
  ]);
  S(76, 4, bg => [
    E(300, 900 - 250, O.bar(500, { w: 240, fill: P.navy, grow: { dur: .4, sfx: 'rise' } }), { a: 'none' }),
    E(780, 900 - 250, O.bar(500, { w: 240, fill: P.coral, grow: { d: .12, dur: .4 } }), { a: 'none' }),
    E(300, 300, Tx('A', 200), { a: 'pop', d: .3 }), E(780, 300, Tx('B', 200), { a: 'pop', d: .4 }),
    E(540, 640, Tx('=', 300, P.navy), { a: 'pop', w: 77, sfx: 'pop' }),
    E(540, 1110, Tx('MÊME EFFORT', 180, 'var(--a1)'), { a: 'stamp', w: 78, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 5 — L'EXPÉRIENCE DE 2006 ===== */
  S(79, 5, bg => [
    E(540, 740, Tx(cnt({ from: 1990, to: 2006, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    E(540, 1010, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 30, draw: { d: .5, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  const cher = (bg, o = {}) => O.person({ w: 340, fill: bg === 'navy' ? P.yellow : P.navy, coat: true, ink: P.cream, ...o });
  S(81, 5, bg => [
    E(310, 700, cher(bg), { a: 'pop', sfx: 'pop' }),
    E(770, 700, cher(bg), { a: 'pop', w: 82 }),
    E(540, 1080, O.clipboard({ w: 240 }), { a: 'up', w: 83 }),
  ]);
  S(85, 5, bg => [
    E(540, 640, O.voiture({ w: 760, fill: bg === 'coral' ? P.yellow : P.coral }), { a: 'right', dist: 900, sfx: 'whoosh' }),
    ...[[220, 330], [400, 260], [660, 300], [860, 380], [300, 440]].map(([x, y], i) => E(x, y, O.disc({ w: 70 + (i % 3) * 30, fill: P.cream }), { a: 'pop', w: 87, d: i * .08, loop: 'float', per: 1 + i * .2, cut: false })),
    E(540, 1110, Tx('LAVAGE AUTO', 200, 'var(--a1)'), { a: 'stamp', w: 89, sfx: 'stamp' }),
  ]);
  S(91, 5, bg => [
    ...Array.from({ length: 10 }, (_, i) => E(170 + (i * 233) % 760, 900 + (i * 131) % 330, carte(bg, 10, i % 2 ? 2 : 0, { w: 250 }), { a: 'drop', d: i * .07, dur: .45, rot: (i * 37) % 40 - 20, sfx: i % 4 === 0 ? 'swish' : undefined })),
    E(540, 480, Tx(cnt({ from: 0, to: 300, dur: .7, sfx: 'tick' }), 520, 'var(--a1)'), { a: 'pop' }),
  ]);
  S(94, 5, bg => [
    E(290, 520, carte(bg, 8, 0, { w: 440, label: 'A' }), { a: 'left' }),
    E(790, 520, carte(bg, 10, 2, { w: 440, label: 'B' }), { a: 'right', d: .1 }),
    E(290, 880, Tx('150', 260, 'var(--a1)'), { a: 'pop', w: 95, sfx: 'pop' }),
    E(790, 880, Tx('150', 260, 'var(--a1)'), { a: 'pop', w: 97, sfx: 'pop' }),
    E(540, 1170, Tx('MOITIÉ - MOITIÉ', 140), { a: 'up', w: 95, d: .2 }),
  ]);
  S(99, 5, bg => [
    E(540, 760, Tx('RÉSULTAT', 250, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 950, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 28, draw: { d: .2, dur: .3 } }), { a: 'none', cut: false }),
  ]);
  S(100, 5, bg => [
    E(540, 640, O.burst({ w: 1150, n: 16, col: bg === 'yellow' ? P.coral : P.yellow }), { a: 'pop', w: 102, loop: 'spin', per: 7, cut: false }),
    E(540, 640, carte(bg, 10, 2, { w: 800, label: 'B' }), { a: 'pop', sfx: 'pop', m: [{ w: 103, s: 1.07, dur: .2 }, { w: 103, d: .25, s: 1, dur: .2 }] }),
    E(540, 1160, Tx('DÉJÀ TAMPONNÉE', 140, 'var(--a1)'), { a: 'up', w: 102 }),
  ]);
  S(104, 5, bg => [
    E(300, 1010 - 130, O.bar(260, { w: 240, fill: P.cream, grow: { dur: .4 } }), { a: 'none' }),
    E(780, 1010 - 290, O.bar(580, { w: 240, fill: P.yellow, grow: { w: 105, dur: .6, sfx: 'rise' } }), { a: 'none' }),
    E(300, 1090, Tx('A', 130), { a: 'fade', cut: false }), E(780, 1090, Tx('B', 130), { a: 'fade', cut: false }),
    E(780, 330, O.crown({ w: 240 }), { a: 'drop', w: 106, dur: .45, sfx: 'ding' }),
    E(540, 1250, Tx('TERMINÉE + SOUVENT', 110, 'var(--a1)'), { a: 'up', w: 106, d: .2, dist: 200 }),
  ]);
  S(108, 5, bg => [
    E(780, 620, tasse(bg, { w: 300 }), { a: 'pop' }),
    E(200, 700, O.person({ w: 300, fill: qui(bg) }), { a: 'left', w: 109, m: [{ w: 111, dx: 300, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1130, Tx('REVIENNENT', 195, 'var(--a1)'), { a: 'stamp', w: 111, d: .1, sfx: 'stamp' }),
  ]);
  S(112, 5, bg => [
    E(540, 600, O.clock({ w: 640 }), { a: 'pop', sfx: 'pop' }),
    E(540, 600, O.hand({ w: 640 }), { a: 'none', loop: 'spin', per: .7, cut: false }),
    E(540, 1130, Tx('+ VITE', 300, 'var(--a1)'), { a: 'stamp', w: 113, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 6 — LE MÉCANISME ===== */
  S(117, 6, bg => [
    E(300, 960, O.person({ w: 360, fill: qui(bg) }), { a: 'left' }),
    E(690, 540, O.bubble({ w: 560, fill: P.navy }), { a: 'pop', d: .1, sfx: 'pop' }),
    E(690, 450, Tx('…', 280, P.cream), { a: 'pop', d: .25, cut: false }),
  ]);
  S(120, 6, bg => [
    E(540, 400, Tx("L'EFFET DE", 170), { a: 'down' }),
    E(540, 700, Tx('PROGRÈS', 300, 'var(--a1)'), { a: 'stamp', w: 122, sfx: 'stamp' }),
    E(540, 1020, Tx('OFFERT', 300), { a: 'stamp', w: 123, sfx: 'stamp' }),
  ]);
  S(124, 6, bg => [
    E(540, 640, carte(bg, 8, 0, { w: 860, label: 'A' }), { a: 'drop', sfx: 'thud' }),
    E(540, 1160, Tx('CARTE VIDE', 200, 'var(--a1)'), { a: 'up', w: 126 }),
  ]);
  S(127, 6, bg => [
    barre(540, 560, 0),
    E(540, 400, Tx('0 %', 200), { a: 'pop' }),
    E(540, 860, Tx('UNE TÂCHE', 180), { a: 'up', w: 129 }),
    E(540, 1100, Tx('À COMMENCER', 172, 'var(--a1)'), { a: 'stamp', w: 131, sfx: 'stamp' }),
  ]);
  S(132, 6, bg => [
    E(540, 640, carte(bg, 10, 2, { w: 860, label: 'B' }), { a: 'drop', sfx: 'thud' }),
    E(540, 1160, Tx('CARTE ENTAMÉE', 150, 'var(--a1)'), { a: 'up', w: 134 }),
  ]);
  S(135, 6, bg => [
    barre(540, 560, .2, { dur: .4, sfx: 'rise' }),
    E(540, 400, Tx('20 %', 200), { a: 'pop' }),
    E(540, 860, Tx('UNE TÂCHE', 180), { a: 'up', w: 137 }),
    E(540, 1100, Tx('À FINIR', 280, 'var(--a1)'), { a: 'stamp', w: 139, sfx: 'stamp' }),
  ]);
  S(140, 6, bg => [
    barre(540, 620, .2, { dur: .01 }, bg === 'coral' ? P.yellow : P.coral),
    E(540, 400, Tx('ENTAMÉE', 260, 'var(--a1)'), { a: 'stamp', w: 143, sfx: 'stamp' }),
    E(540, 900, Tx('…', 300), { a: 'pop', d: .1, loop: 'pulse', amp: .1, per: .5 }),
  ]);
  S(144, 6, bg => [
    barre(540, 560, 1, { dur: 1.0, sfx: 'rise' }, bg === 'coral' ? P.yellow : P.coral),
    E(540, 400, Tx(cnt({ from: 20, to: 100, dur: 1.0, suf: ' %' }), 200), { a: 'pop' }),
    E(540, 860, Tx('ENVIE DE', 200), { a: 'up', w: 146 }),
    E(540, 1100, Tx('LA FINIR', 260, 'var(--a1)'), { a: 'stamp', w: 149, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 7 — PLUS ON APPROCHE, PLUS ON ACCÉLÈRE ===== */
  S(150, 7, bg => [
    E(540, 700, O.calendar('2006', { w: 680, fs: 200 }), { a: 'spin', sfx: 'swish' }),
    E(540, 1180, Tx('MÊME ANNÉE', 190, 'var(--a1)'), { a: 'up', w: 151 }),
  ]);
  S(153, 7, bg => [
    E(240, 760, cher(bg, { w: 280 }), { a: 'pop', sfx: 'pop' }),
    E(540, 700, cher(bg, { w: 320 }), { a: 'pop', d: .1 }),
    E(840, 760, cher(bg, { w: 280 }), { a: 'pop', d: .2 }),
    E(540, 1150, Tx('AUTRE ÉQUIPE', 180, 'var(--a1)'), { a: 'up', w: 154 }),
  ]);
  S(156, 7, bg => [
    E(540, 520, carte(bg, 10, 4, { w: 700 }), { a: 'pop', sfx: 'pop', rot: -4 }),
    E(820, 860, tasse(bg, { w: 300 }), { a: 'pop', w: 158 }),
    E(430, 1130, Tx('CARTES DE CAFÉ', 130, 'var(--a1)'), { a: 'up', w: 158 }),
  ]);
  S(161, 7, bg => [
    E(540, 460, O.eye({ w: 560 }), { a: 'pop', sfx: 'pop' }),
    E(540, 860, Tx('AUTRE', 260), { a: 'up', w: 163 }),
    E(540, 1110, Tx('CHOSE', 260, 'var(--a1)'), { a: 'stamp', w: 164, sfx: 'stamp' }),
  ]);
  S(165, 7, bg => [
    E(540, 500, carte(bg, 10, 8, { w: 760 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1010, O.burst({ w: 620, n: 12, col: bg === 'yellow' ? P.coral : P.yellow }), { a: 'pop', w: 170, loop: 'spin', per: 5, cut: false }),
    E(540, 1010, tasse(bg, { w: 300 }), { a: 'pop', w: 169, sfx: 'ding' }),
    E(200, 1010, Tx('PLUS', 150, 'var(--a1)'), { a: 'left', w: 167 }),
    E(880, 1010, Tx('QUE 2', 150, 'var(--a1)'), { a: 'right', w: 167, d: .15 }),
  ]);
  S(171, 7, bg => [
    ...[0, 1, 2].map(i => E(280 + i * 260, 520, O.arrow({ w: 240 + i * 60, fill: i === 2 ? P.coral : P.navy }), { a: 'left', d: i * .14, sfx: i ? undefined : 'whoosh' })),
    E(540, 980, Tx('+ VITE', 340, 'var(--a1)'), { a: 'stamp', w: 174, sfx: 'stamp' }),
  ]);
  S(175, 7, bg => [
    E(420, 660, O.person({ w: 380, fill: qui(bg) }), { a: 'left', rot: 14, sfx: 'whoosh', loop: 'float', amp: 10, per: .4 }),
    E(540, 1150, Tx('UN COUREUR', 200, 'var(--a1)'), { a: 'up', w: 177 }),
  ]);
  S(178, 7, bg => [
    E(880, 660, O.drapeau({ w: 260, pole: qui(bg), a: P.cream, b: bg === 'navy' ? P.coral : P.navy }), { a: 'pop' }),
    ...[0, 1, 2].map(i => E(170, 520 + i * 130, O.rect(220 - i * 40, 26, qui(bg), 13), { a: 'left', w: 179, d: i * .06, cut: false, m: [{ w: 179, d: .4, o: 0, dur: .3, e: 'outCubic' }] })),
    E(230, 700, O.person({ w: 320, fill: qui(bg) }), { a: 'left', rot: 16, m: [{ w: 179, dx: 420, dur: .55, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1170, Tx('LA LIGNE', 240, 'var(--a1)'), { a: 'stamp', w: 183, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 8 — CONCLUSION ===== */
  S(184, 8, bg => [
    E(540, 760, Tx('DONC', 460), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .6 }),
  ]);
  S(185, 8, bg => [
    E(540, 660, carte(bg, 10, 2, { w: 860 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1160, Tx('CES 2 TAMPONS', 150, 'var(--a1)'), { a: 'up', w: 186 }),
  ]);
  S(188, 8, bg => [
    E(540, 600, O.cadeau({ w: 520, fill: bg === 'coral' ? P.navy : P.coral }), { a: 'pop', sfx: 'pop' }),
    E(540, 600, O.cross({ w: 620, col: bg === 'navy' ? P.cream : P.navy, draw: { w: 190, sfx: 'buzz' } }), { a: 'none', w: 190 }),
    E(540, 1150, Tx('PAS UN CADEAU', 150, 'var(--a1)'), { a: 'stamp', w: 192, sfx: 'stamp' }),
  ]);
  S(193, 8, bg => [
    E(330, 560, O.arrow({ w: 460, fill: P.coral }), { a: 'left', sfx: 'whoosh', m: [{ w: 196, dx: 120, dur: .3 }] }),
    E(800, 560, O.person({ w: 300, fill: qui(bg) }), { a: 'pop', rot: 10, m: [{ w: 196, dx: 90, dur: .3 }] }),
    E(540, 1090, Tx('UN ÉLAN', 320, 'var(--a1)'), { a: 'stamp', w: 195, sfx: 'stamp' }),
  ]);
  S(199, 8, bg => [
    E(800, 600, tasse(bg, { w: 380 }), { a: 'pop' }),
    E(180, 660, O.person({ w: 300, fill: qui(bg) }), { a: 'left', m: [{ w: 201, dx: 300, dur: .5, e: 'inOut', sfx: 'whoosh' }] }),
    E(540, 1130, Tx('TU REVIENS', 240, 'var(--a1)'), { a: 'stamp', w: 202, sfx: 'stamp' }),
  ]);

  /* ===== SCÈNE 9 — QUESTION ===== */
  S(203, 9, bg => [
    E(540, 700, Tx('ET TOI', 340), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1040, Tx('?', 420, 'var(--a1)'), { a: 'pop', w: 204, rot: 8, loop: 'swing', amp: 5, per: .9 }),
  ]);
  S(205, 9, bg => [
    ...[0, 1, 2, 3].map(i => E(250 + i * 195, 560 + (i % 2) * 70, carte(bg, 10, [2, 5, 1, 7][i], { w: 440 }), { a: 'drop', d: i * .12, dur: .45, rot: (i - 1.5) * 9, sfx: i % 2 ? undefined : 'swish' })),
    E(540, 1130, Tx('COMBIEN ?', 220, 'var(--a1)'), { a: 'stamp', w: 208, sfx: 'stamp' }),
  ]);
  S(212, 9, bg => [
    E(420, 480, carte(bg, 10, 3, { w: 380 }), { a: 'up', dist: 300, d: .1, rot: -8 }),
    E(660, 500, carte(bg, 8, 1, { w: 380, label: 'A' }), { a: 'up', dist: 300, d: .22, rot: 7 }),
    E(540, 760, O.portefeuille({ w: 720, fill: bg === 'navy' ? T.navy2 : P.navy }), { a: 'pop', sfx: 'pop' }),
    E(540, 1170, Tx('TON PORTEFEUILLE ?', 110, 'var(--a1)'), { a: 'up', w: 214 }),
  ]);
})();
