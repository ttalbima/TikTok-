/* Vidéo 001 — « Pourquoi tu trouves que 9,99 €… »
   Un plan = { w: indice du mot où il démarre (voir mots.json), bg, scene, html }.
   Dans E(x, y, contenu, anim) : w = mot déclencheur, d = décalage en secondes. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  V.style = 2;        // nouveau style : typographie cinétique, transitions poussées, fonds animés, ombres douces
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;

  // mots-clés : accents de la musique
  V.keywords = [1, 6, 7, 11, 20, 22, 44, 53, 59, 64, 80, 88, 97, 103, 117, 135, 139, 144, 167, 174, 181, 190];

  /* ===== SCÈNE 1 — HOOK : « Pourquoi 9,99 € te paraît moins cher ? » ===== */
  shot({ w: 0, bg: 'coral', scene: 1, html: [
    E(540, 600, O.burst({ w: 1000 }), { a: 'pop', d: .3, loop: 'spin', per: 7, cut: false }),
    E(540, 600, O.tag('9,99 €', { w: 860 }), { a: 'drop', sfx: 'thud', rot: -4, loop: 'swing', amp: 2.5, per: 1.4 }),
    E(540, 1010, Tx('MOINS CHER', 196), { a: 'up', w: 2 }),
    E(540, 1230, Tx('VRAIMENT ?', 150, 'var(--a1)'), { a: 'up', w: 4, sfx: 'pop' }),
  ] });

  /* ===== SCÈNE 2 — RETAINER ===== */
  shot({ w: 6, bg: 'navy', scene: 2, html: [
    E(540, 470, O.tag('9,99 €', { w: 600 }), { a: 'left', rot: -4 }),
    E(540, 1010, O.tag('10,00 €', { w: 600, fill: P.yellow }), { a: 'right', d: .08, rot: 4 }),
    E(540, 745, Tx("1 CENTIME D'ÉCART", 120, 'var(--a1)'), { a: 'up', w: 7, sfx: 'pop' }),
  ] });
  shot({ w: 9, bg: 'cream', scene: 2, html: [
    E(320, 700, Tx('9', 860, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .7 }),
    E(650, 990, O.bar(200, { w: 110, fill: P.navy, grow: { w: 14, sfx: 'rise' } }), { a: 'none' }),
    E(790, 920, O.bar(340, { w: 110, fill: P.navy, grow: { w: 15 } }), { a: 'none' }),
    E(930, 830, O.bar(520, { w: 110, fill: P.green, grow: { w: 16 } }), { a: 'none' }),
    E(540, 1240, Tx('VEND PLUS', 180), { a: 'up', w: 14 }),
  ] });
  shot({ w: 17, bg: 'yellow', scene: 2, html: [
    E(540, 870, O.tag('PRIX', { w: 640, fill: P.navy, ink: P.cream }), { a: 'pop', m: [{ w: 18, dy: -70, s: 1.12, dur: .4 }] }),
    E(540, 430, O.arrow({ w: 380, fill: P.coral }), { a: 'up', w: 18, rot: -90, sfx: 'rise', loop: 'float', amp: 18, per: .8 }),
    E(540, 1200, Tx('+ CHER', 220, 'var(--a1)'), { a: 'up', w: 18, d: .25, sfx: 'stamp' }),
  ] });

  /* ===== SCÈNE 3 — LE CERVEAU ===== */
  shot({ w: 21, bg: 'coral', scene: 3, html: [
    E(540, 720, O.brain({ w: 720 }), { a: 'pop', sfx: 'pop', loop: 'float', per: 1.4 }),
    E(540, 1190, Tx('TON CERVEAU', 170, 'var(--a1)'), { a: 'up', w: 22 }),
  ] });
  shot({ w: 25, bg: 'navy', scene: 3, html: [
    E(540, 700, Tx('9,99', 440), { a: 'fade', dur: .1 }),
    E(540, 960, O.line('M20,20 H800', { w: 820, vw: 820, vh: 40, col: P.yellow, sw: 30, draw: { dur: .85 } }), { a: 'none', cut: false }),
    E(540, 1200, O.arrow({ w: 460 }), { a: 'left', w: 26, sfx: 'whoosh' }),
  ] });
  shot({ w: 28, bg: 'cream', scene: 3, html: [
    E(540, 500, O.eye({ w: 640 }), { a: 'pop', sfx: 'pop', m: [{ w: 30, dy: 20, s: 1.06, dur: .2 }] }),
    E(540, 1050, Tx('9', 600, 'var(--a1)'), { a: 'stamp', w: 31, sfx: 'stamp' }),
  ] });
  shot({ w: 33, bg: 'green', scene: 3, html: [
    E(540, 400, O.tag('9,99 €', { w: 480 }), { a: 'down', m: [{ w: 34, dy: 330, s: .6, dur: .4, e: 'inOut', sfx: 'swish' }] }),
    E(540, 850, O.box('9 €', { w: 600, fs: 100 }), { a: 'up' }),
    E(540, 1230, Tx('CLASSÉ', 160, 'var(--a1)'), { a: 'stamp', w: 34, d: .3, sfx: 'stamp' }),
  ] });
  shot({ w: 37, bg: 'yellow', scene: 3, html: [
    E(350, 600, Tx('9', 440), { a: 'none', m: [{ w: 38, s: 1.15, dur: .25 }, { w: 40, s: 1, dur: .2 }] }),
    E(700, 600, Tx(',99', 440), { a: 'none', m: [{ w: 39, o: .16, dur: .3, e: 'outCubic' }] }),
    E(540, 930, O.rect(800, 50, 'rgba(20,33,61,.22)', 25), { a: 'none', cut: false }),
    E(540, 930, O.line('M25,25 H280', { w: 800, vw: 800, vh: 50, col: P.coral, sw: 50, draw: { dur: .5 } }), { a: 'none', cut: false }),
    E(540, 1040, Tx(`LECTURE : ${cnt({ from: 0, to: 33, dur: .5, suf: ' %' })}`, 76, 'var(--ink)', { font: 'inter' }), { a: 'fade', cut: false }),
    E(540, 1250, O.stamp('DÉJÀ CLASSÉ', { w: 800, fs: 120 }), { a: 'stamp', w: 41, rot: -6, sfx: 'stamp' }),
  ] });
  shot({ w: 42, bg: 'navy', scene: 3, html: [
    E(540, 760, Tx('RÉSULTAT', 240, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 940, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 28, draw: { d: .2, dur: .3 } }), { a: 'none', cut: false }),
  ] });
  shot({ w: 44, bg: 'coral', scene: 3, html: [
    E(540, 780, O.tag('9,99 €', { w: 880 }), { a: 'drop', sfx: 'thud', m: [{ d: .72, s: 1.07, dur: .18 }, { d: .95, s: 1, dur: .2 }] }),
  ] });
  shot({ w: 44, bg: 'cream', scene: 3, html: [
    E(540, 400, O.tag('9,99 €', { w: 440, fill: P.yellow }), { a: 'down', m: [{ w: 46, dx: -250, dy: 430, s: .6, r: -12, dur: .45, e: 'inOut', sfx: 'swish' }] }),
    E(290, 1020, O.box('9 €…', { w: 430 }), { a: 'up' }),
    E(790, 1020, O.box('10 €', { w: 430, fill: P.green }), { a: 'up', d: .08 }),
  ] });
  shot({ w: 48, bg: 'green', scene: 3, html: [
    E(540, 560, Tx('9 €', 440, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 930, Tx('ET QUELQUES', 180), { a: 'up', w: 49 }),
    E(540, 1210, O.check({ w: 260, col: P.yellow, draw: { w: 50, d: .2, sfx: 'pop' } }), { a: 'none', w: 50 }),
  ] });
  shot({ w: 51, bg: 'yellow', scene: 3, html: [
    E(540, 360, Tx('PAS 10', 220), { a: 'down' }),
    E(540, 860, O.box('10 €', { w: 660, fill: P.green, fs: 100 }), { a: 'pop', m: [{ w: 53, d: .62, dy: 1100, r: 22, dur: .4, e: 'inOut', sfx: 'fall' }] }),
    E(540, 860, O.cross({ w: 640, draw: { w: 53, sfx: 'buzz' } }), { a: 'none', w: 53, m: [{ w: 53, d: .62, dy: 1100, r: 22, dur: .4, e: 'inOut' }] }),
  ] });

  /* ===== SCÈNE 4 — L'ÉTUDE DE 2005 ET SA RÈGLE ===== */
  const cher = o => O.person({ w: 280, fill: P.yellow, coat: true, ink: P.cream, ...o });
  shot({ w: 54, bg: 'navy', scene: 4, html: [
    E(240, 700, cher(), { a: 'pop', sfx: 'pop' }),
    E(540, 640, cher({ w: 320 }), { a: 'pop', d: .14 }),
    E(840, 700, cher(), { a: 'pop', d: .28 }),
    E(540, 1030, O.rect(800, 70, P.yellow, 12), { a: 'left', w: 57, sfx: 'swish' }),
    E(540, 1200, Tx('MESURÉ', 150, 'var(--a1)'), { a: 'up', w: 57, d: .12 }),
  ] });
  shot({ w: 58, bg: 'coral', scene: 4, html: [
    E(540, 740, Tx(cnt({ from: 1990, to: 2005, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    E(540, 1010, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.yellow, sw: 30, draw: { w: 59, d: .3, dur: .3 } }), { a: 'none', cut: false }),
  ] });
  shot({ w: 60, bg: 'cream', scene: 4, html: [
    E(300, 1010, O.person({ w: 380, fill: P.navy }), { a: 'left' }),
    E(690, 560, O.bubble({ w: 580, fill: P.navy }), { a: 'pop', d: .1, sfx: 'pop' }),
    E(690, 470, Tx('…', 280, P.cream), { a: 'pop', d: .28, cut: false }),
  ] });
  shot({ w: 62, bg: 'green', scene: 4, html: [
    E(540, 330, Tx("L'EFFET DU", 150), { a: 'down' }),
    E(540, 570, Tx('CHIFFRE', 260, 'var(--a1)'), { a: 'stamp', w: 64, sfx: 'stamp' }),
    E(540, 810, Tx('DE GAUCHE', 200), { a: 'up', w: 65 }),
    E(540, 1150, Tx(`<span style="color:${P.coral}">9</span>,99`, 300), { a: 'pop', w: 66, d: .05 }),
  ] });
  shot({ w: 67, bg: 'yellow', scene: 4, html: [
    E(540, 720, Tx('ET…', 300), { a: 'pop', hw: 69 }),
    E(540, 690, O.book('RÈGLE', { w: 560 }), { a: 'drop', w: 69, sfx: 'thud' }),
    E(540, 1200, O.stamp('N° 1', { w: 620, fs: 170, h: 250 }), { a: 'stamp', w: 71, rot: -8, sfx: 'stamp' }),
  ] });
  shot({ w: 72, bg: 'navy', scene: 4, html: [
    E(540, 620, O.pill({ w: 640, fill: T.navy2 }), { a: 'none' }),
    E(540, 620, O.pill({ w: 640 }), { a: 'fade', w: 74, dur: .15, cut: false }),
    E(392, 620, O.disc({ w: 236 }), { a: 'none', m: [{ w: 74, dx: 296, dur: .25, sfx: 'click' }] }),
    E(540, 960, Tx('ÇA MARCHE', 180, 'var(--a1)'), { a: 'pop', w: 74, d: .1 }),
    E(540, 1190, Tx('SEULEMENT SI…', 120), { a: 'up', w: 75 }),
  ] });
  shot({ w: 78, bg: 'coral', scene: 4, html: [
    E(540, 320, Tx('1ER CHIFFRE', 130, 'var(--a1)'), { a: 'down', d: .08 }),
    E(270, 780, O.rect(300, 480, P.navy, 30), { a: 'pop', m: [{ w: 80, d: .5, s: 1.1, dur: .2 }, { w: 80, d: .75, s: 1, dur: .2 }] }),
    E(270, 780, Tx('4', 440), { a: 'none', hw: 80, cut: false }),
    E(270, 780, Tx('3', 440, P.yellow), { a: 'down', dist: 300, w: 80, sfx: 'click', cut: false }),
    E(690, 780, Tx(',00', 440), { a: 'none', hw: 80 }),
    E(690, 780, Tx(',99', 440), { a: 'down', dist: 300, w: 80, d: .05 }),
    E(540, 1210, Tx('CHANGE', 180, 'var(--a1)'), { a: 'stamp', w: 80, d: .18, sfx: 'stamp' }),
  ] });
  shot({ w: 81, bg: 'cream', scene: 4, html: [
    E(540, 760, O.tag('3,60 €', { w: 840, fill: P.navy, ink: P.cream }), { a: 'drop', sfx: 'thud' }),
  ] });
  shot({ w: 83, bg: 'green', scene: 4, html: [
    E(540, 450, O.tag('3,60 €', { w: 620 }), { a: 'none' }),
    E(540, 850, O.tag('3,59 €', { w: 620, fill: P.yellow }), { a: 'drop', w: 84, sfx: 'thud' }),
    E(540, 1190, Tx('3 = 3', 240, 'var(--a1)'), { a: 'pop', w: 84, d: .75, sfx: 'pop' }),
  ] });
  shot({ w: 85, bg: 'yellow', scene: 4, html: [
    E(540, 620, O.line('M20,60 H840', { w: 860, vw: 860, vh: 120, col: P.navy, sw: 30, draw: { dur: .8 } }), { a: 'none', cut: false }),
    E(540, 1000, Tx('RIEN.', 420), { a: 'stamp', w: 88, sfx: 'stamp' }),
  ] });
  shot({ w: 89, bg: 'navy', scene: 4, html: [
    E(540, 760, O.tag('4,00 €', { w: 840 }), { a: 'drop', sfx: 'thud' }),
  ] });
  shot({ w: 91, bg: 'coral', scene: 4, html: [
    E(540, 450, O.tag('4,00 €', { w: 620 }), { a: 'none' }),
    E(540, 850, O.tag('3,99 €', { w: 620, fill: P.yellow }), { a: 'drop', w: 92, sfx: 'thud' }),
    E(310, 1190, Tx('4', 260, 'var(--a1)'), { a: 'pop', w: 92, d: .75, sfx: 'pop' }),
    E(540, 1190, O.arrow({ w: 200, fill: P.navy }), { a: 'pop', w: 92, d: .88 }),
    E(770, 1190, Tx('3', 260, 'var(--a1)'), { a: 'pop', w: 92, d: 1.0 }),
  ] });
  shot({ w: 93, bg: 'green', scene: 4, html: [
    E(500, 500, O.line('M20,30 C220,30 260,60 320,170 S440,440 620,460', { w: 820, vw: 640, vh: 490, col: P.coral, sw: 30, draw: { dur: .7, sfx: 'fall' } }), { a: 'none' }),
    E(540, 950, Tx('VRAIE', 230), { a: 'stamp', w: 96, sfx: 'stamp' }),
    E(540, 1180, Tx('BAISSE', 230, 'var(--a1)'), { a: 'stamp', w: 97 }),
    E(880, 330, O.coin('1', { w: 220 }), { a: 'spin', w: 97, d: .5, sfx: 'coin' }),
  ] });

  /* ===== SCÈNE 5 — LA LÉGENDE ===== */
  shot({ w: 98, bg: 'cream', scene: 5, html: [
    E(540, 480, Tx("D'OÙ VIENT", 210), { a: 'down' }),
    E(540, 730, Tx('CETTE HABITUDE', 150, 'var(--a1)'), { a: 'up', w: 100 }),
    E(290, 1090, Tx('?', 320), { w: 101, rot: -12, sfx: 'pop' }),
    E(540, 1070, Tx('?', 320, 'var(--a2)'), { w: 101, d: .3, sfx: 'pop' }),
    E(790, 1090, Tx('?', 320, 'var(--a1)'), { w: 101, d: .6, rot: 12, sfx: 'pop' }),
  ] });
  shot({ w: 102, bg: 'navy', scene: 5, html: [
    E(540, 760, O.burst({ w: 1150, n: 14 }), { a: 'pop', loop: 'spin', per: 9, cut: false }),
    E(540, 760, O.scroll({ w: 900, txt: 'LÉGENDE' }), { a: 'pop', w: 103, sfx: 'swish' }),
  ] });
  shot({ w: 106, bg: 'yellow', scene: 5, html: [
    E(540, 600, Tx('XIX<span style="font-size:.45em;vertical-align:.95em">E</span>', 460), { a: 'stamp', sfx: 'stamp' }),
    E(540, 970, Tx('SIÈCLE', 240, 'var(--a1)'), { a: 'up', w: 107 }),
  ] });
  shot({ w: 108, bg: 'green', scene: 5, html: [
    E(320, 860, O.person({ w: 360, hat: true }), { a: 'pop', sfx: 'pop' }),
    E(760, 860, O.person({ w: 360, hat: true }), { a: 'pop', d: .14 }),
    E(540, 1240, Tx('LES PATRONS', 140, 'var(--a1)'), { a: 'up', w: 109 }),
    E(540, 400, Tx('!', 360, 'var(--a2)'), { a: 'stamp', w: 111, sfx: 'stamp' }),
  ] });
  shot({ w: 112, bg: 'coral', scene: 5, html: [
    E(350, 760, O.person({ w: 380, fill: P.cream }), { a: 'up' }),
    E(730, 780, O.register({ w: 440, fill: P.yellow }), { a: 'pop', d: .14, sfx: 'pop' }),
    E(540, 1000, O.rect(940, 90, P.navy, 14), { a: 'none' }),
    E(540, 1200, Tx('LES CAISSIERS', 140, 'var(--a1)'), { a: 'up', w: 113 }),
  ] });
  shot({ w: 115, bg: 'cream', scene: 5, html: [
    E(540, 905, O.drawer({ w: 560 }), { a: 'none', m: [{ w: 117, dy: 150, dur: .25, sfx: 'kaching' }] }),
    E(540, 680, O.register({ w: 760 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1230, Tx('OUVRIR LE TIROIR', 110), { a: 'up', w: 115, d: .15 }),
  ] });
  shot({ w: 118, bg: 'navy', scene: 5, html: [
    E(540, 1180, O.drawer({ w: 760 }), { a: 'none' }),
    E(540, 1090, O.coin('1', { w: 200 }), { a: 'none', m: [{ w: 119, dy: -590, s: 1.7, dur: .5, sfx: 'coin' }] }),
    E(540, 870, Tx('1 CENTIME', 200, 'var(--a1)'), { a: 'stamp', w: 121, sfx: 'stamp' }),
  ] });
  shot({ w: 122, bg: 'yellow', scene: 5, html: [
    E(540, 450, O.receipt({ w: 320 }), { a: 'up', dist: 420, w: 124, sfx: 'print' }),
    E(540, 900, O.register({ w: 660 }), { a: 'none' }),
    E(540, 1250, Tx('VENTE ENREGISTRÉE', 100), { a: 'up', w: 124, d: .25, dist: 200 }),
  ] });
  shot({ w: 127, bg: 'coral', scene: 5, html: [
    E(330, 900, O.person({ w: 520, fill: P.cream }), { a: 'none' }),
    E(330, 1110, O.rect(170, 130, T.cream2, 16), { a: 'none', cut: false }),
    E(830, 640, O.bill({ w: 380 }), { a: 'right', m: [{ w: 129, dx: -490, dy: 420, s: .5, r: -28, dur: .45, e: 'inOut', sfx: 'swish' }] }),
    E(540, 820, O.cross({ w: 680, col: P.navy, draw: { w: 131, sfx: 'buzz' } }), { a: 'none', w: 131, loop: 'shake', lw: 131, ld: .25, ldur: .3, amp: 8 }),
    E(540, 300, Tx('INTERDIT', 180, 'var(--a1)'), { a: 'stamp', w: 131, d: .25 }),
  ] });
  shot({ w: 132, bg: 'green', scene: 5, html: [
    E(190, 380, O.burst({ w: 240, n: 8 }), { a: 'spin', d: .15, loop: 'spin', per: 5, cut: false }),
    E(890, 1170, O.burst({ w: 240, n: 8, col: P.coral }), { a: 'spin', d: .35, loop: 'spin', per: 5, cut: false }),
    E(540, 620, Tx('JOLIE', 280), { a: 'pop', sfx: 'pop' }),
    E(540, 910, Tx('HISTOIRE', 280, 'var(--a1)'), { a: 'pop', w: 133 }),
  ] });
  shot({ w: 134, bg: 'cream', scene: 5, html: [
    E(540, 760, O.scroll({ w: 860 }), { a: 'none', m: [{ w: 135, d: .16, r: 3, dur: .08 }, { w: 135, d: .26, r: 0, dur: .12 }] }),
    E(540, 760, Tx('?', 260, P.navy), { a: 'pop', hw: 135, cut: false }),
    E(540, 770, O.stamp('JAMAIS PROUVÉE', { w: 900, fs: 100, h: 230 }), { a: 'stamp', w: 135, rot: -10, sfx: 'stamp' }),
  ] });

  /* ===== SCÈNE 6 — L'EXPÉRIENCE DE 2003 ===== */
  shot({ w: 136, bg: 'navy', scene: 6, html: [
    E(540, 620, O.clipboard({ w: 440 }), { a: 'pop', sfx: 'pop' }),
    E(540, 660, O.stamp('PROUVÉ', { w: 640, fs: 150 }), { a: 'stamp', w: 139, rot: -8, sfx: 'stamp' }),
    E(540, 1160, Tx('PLUS ÉTRANGE', 180, 'var(--a1)'), { a: 'pop', w: 141, sfx: 'pop', loop: 'swing', amp: 2.5, per: .5 }),
  ] });
  shot({ w: 143, bg: 'yellow', scene: 6, html: [
    E(540, 740, Tx(cnt({ from: 1990, to: 2003, d: .2, dur: .5, sfx: 'tick' }), 440), { a: 'pop', m: [{ w: 144, d: .5, s: 1.08, dur: .2 }, { w: 144, d: .72, s: 1, dur: .2 }] }),
    E(540, 1010, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 30, draw: { w: 144, d: .25, dur: .3 } }), { a: 'none', cut: false }),
  ] });
  const cher2 = () => O.person({ w: 360, fill: P.navy, coat: true, ink: P.cream });
  shot({ w: 145, bg: 'coral', scene: 6, html: [
    E(320, 780, cher2(), { a: 'pop', sfx: 'pop' }),
    E(760, 780, cher2(), { a: 'pop', w: 146, sfx: 'pop' }),
    E(540, 1180, O.clipboard({ w: 220 }), { a: 'up', w: 147 }),
  ] });
  shot({ w: 148, bg: 'cream', scene: 6, html: [
    E(540, 620, O.catalogue({ w: 540 }), { a: 'drop', sfx: 'thud', m: [{ w: 149, d: .3, r: -4, dur: .3 }] }),
    E(540, 1190, Tx('DE VÊTEMENTS', 150), { a: 'up', w: 150 }),
  ] });
  shot({ w: 152, bg: 'green', scene: 6, html: [
    E(540, 690, O.shirt({ w: 620 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1190, Tx('MÊME ARTICLE', 170, 'var(--a1)'), { a: 'up', w: 153 }),
  ] });
  const t3 = (k, o = {}) => O.tag(['- CHER', '…9', '+ CHER'][k], { w: 310, fs: 110, fill: k === 1 ? P.yellow : P.cream, ...o });
  shot({ w: 154, bg: 'navy', scene: 6, html: [
    E(200, 520, O.shirt({ w: 250 }), { a: 'none' }), E(540, 520, O.shirt({ w: 250 }), { a: 'none' }), E(880, 520, O.shirt({ w: 250 }), { a: 'none' }),
    E(200, 800, t3(0), { a: 'pop', sfx: 'pop' }),
    E(540, 800, t3(1), { a: 'pop', w: 155, sfx: 'pop' }),
    E(880, 800, t3(2), { a: 'pop', w: 156, sfx: 'pop' }),
    E(540, 1150, Tx('3 PRIX', 240, 'var(--a1)'), { a: 'stamp', w: 155, d: .05 }),
  ] });
  const fan = (dx, d) => ({ a: 'pop', m: [{ w: 158, d, dx, dy: 210, dur: .4, e: 'inOut', sfx: d ? undefined : 'swish' }] });
  shot({ w: 156, bg: 'yellow', scene: 6, html: [
    E(200, 940, O.person({ w: 250 }), { a: 'none' }), E(540, 940, O.person({ w: 250 }), { a: 'none' }), E(880, 940, O.person({ w: 250 }), { a: 'none' }),
    E(540, 400, O.catalogue({ w: 210 }), fan(-340, 0)),
    E(540, 400, O.catalogue({ w: 210, fill: P.green }), fan(340, .2)),
    E(540, 400, O.catalogue({ w: 210, fill: P.navy }), fan(0, .1)),
    E(540, 1240, Tx('3 CATALOGUES', 130), { a: 'up', w: 158, d: .3, dist: 200 }),
  ] });
  shot({ w: 160, bg: 'coral', scene: 6, html: [
    E(200, 820, t3(0), { a: 'pop', sfx: 'pop' }),
    E(880, 820, t3(2), { a: 'pop', d: .16 }),
    E(540, 820, t3(1), { a: 'pop', d: .08, m: [{ w: 163, dy: -190, s: 1.5, dur: .35, sfx: 'rise' }] }),
    E(540, 350, O.arrow({ w: 200, fill: P.navy }), { a: 'down', w: 163, d: .15, rot: 90 }),
    E(540, 1160, Tx('LE MILIEU', 180, 'var(--a1)'), { a: 'up', w: 163 }),
  ] });
  shot({ w: 165, bg: 'cream', scene: 6, html: [
    E(540, 470, O.tag('…9', { w: 760, fill: P.yellow }), { a: 'pop' }),
    E(540, 1040, Tx('9', 580, 'var(--a1)'), { a: 'stamp', w: 167, sfx: 'stamp' }),
  ] });
  const lab = (x, s) => E(x, 1125, Tx(s, 64, 'var(--ink)', { font: 'inter' }), { a: 'fade', cut: false });
  shot({ w: 168, bg: 'green', scene: 6, html: [
    E(240, 1070 - 165, O.bar(330, { w: 220, grow: { w: 169 } }), { a: 'none' }),
    E(840, 1070 - 150, O.bar(300, { w: 220, grow: { w: 169, d: .1 } }), { a: 'none' }),
    E(540, 1070 - 320, O.bar(640, { w: 220, fill: P.yellow, grow: { w: 170, dur: .6, sfx: 'rise' } }), { a: 'none' }),
    lab(240, '- CHER'), lab(540, '…9'), lab(840, '+ CHER'),
    E(540, 320, O.crown({ w: 230 }), { a: 'drop', w: 174, dur: .45, sfx: 'ding' }),
    E(540, 1250, Tx('VEND LE PLUS', 130, 'var(--a1)'), { a: 'up', w: 172, dist: 200 }),
  ] });
  shot({ w: 175, bg: 'navy', scene: 6, html: [
    E(270, 1000, O.bar(300, { w: 220, grow: { d: .0, dur: .01 } }), { a: 'none' }),
    E(810, 850, O.bar(600, { w: 220, fill: P.yellow, grow: { d: .0, dur: .01 } }), { a: 'none' }),
    E(270, 740, t3(0, { w: 380 }), { a: 'pop', loop: 'shake', lw: 180, ldur: .45, amp: 7 }),
    E(810, 440, t3(1, { w: 380 }), { a: 'pop', d: .08 }),
    E(540, 700, Tx('&lt;', 300, 'var(--a2)'), { a: 'stamp', w: 176, sfx: 'stamp' }),
    E(540, 1250, Tx('PLUS CHER, PLUS VENDU', 96, 'var(--a1)'), { a: 'up', w: 178, dist: 200 }),
  ] });

  /* ===== SCÈNE 7 — BOUCLE ===== */
  shot({ w: 182, bg: 'cream', scene: 7, html: [
    E(540, 520, O.rect(940, 40, P.navy, 12), { a: 'left' }),
    E(540, 330, Tx('LA PROCHAINE', 140, 'var(--a1)'), { a: 'down', w: 184 }),
    E(240, 1030, O.person({ w: 320, fill: P.green }), { a: 'left', w: 183, sfx: 'pop' }),
    E(690, 800, O.tag('9,99 €', { w: 540, fill: P.yellow }), { a: 'down', dist: 500, w: 186, org: '8% 50%', loop: 'swing', amp: 6, per: 1.1, sfx: 'swish' }),
  ] });
  shot({ w: 187, bg: 'coral', scene: 7, html: [
    E(540, 330, O.eye({ w: 320, px: -.6 }), { a: 'pop', d: .05 }),
    E(540, 780, Tx(`<span style="color:${P.yellow}">9</span>,99`, 440), { a: 'none' }),
    E(310, 824, O.magnifier({ w: 460 }), { a: 'left', dist: 600, d: .08, sfx: 'whoosh', m: [{ w: 189, s: 1.12, dur: .25 }] }),
    E(540, 1230, Tx('1ER CHIFFRE', 160, 'var(--a1)'), { a: 'stamp', w: 189, sfx: 'stamp' }),
  ] });
  shot({ w: 191, bg: 'navy', scene: 7, html: [
    E(340, 620, O.disc({ w: 120 }), { a: 'pop', sfx: 'pop' }),
    E(540, 620, O.disc({ w: 120 }), { a: 'pop', w: 192, sfx: 'pop' }),
    E(740, 620, O.disc({ w: 120 }), { a: 'pop', w: 192, d: .28, sfx: 'pop' }),
    E(540, 1010, Tx('?', 420, 'var(--a1)'), { a: 'pop', w: 192, d: .55, rot: 8, loop: 'swing', amp: 5, per: .9 }),
  ] });
})();
