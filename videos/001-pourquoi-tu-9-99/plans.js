/* Vidéo 001 — « Pourquoi tu trouves que 9,99 €… »
   Un plan = { w: indice du mot où il démarre (voir mots.json), bg, scene, html }.
   Dans E(x, y, contenu, anim) : w = mot déclencheur, d = décalage en secondes. */
(function () {
  const { E, Tx, shot, PAL: P, TINT: T } = V;
  const cnt = o => `<span data-count='${JSON.stringify(o)}'></span>`;

  // mots-clés : accents de la musique
  V.keywords = [4, 10, 13, 20, 30, 32, 53, 63, 70, 75, 91, 99, 108, 114, 128, 146, 150, 155, 179, 186, 193, 202];

  /* ===== SCÈNE 1 — HOOK ===== */
  shot({ w: 0, bg: 'navy', scene: 1, html: [
    E(540, 700, Tx('POURQUOI', 240), { a: 'stamp', sfx: 'stamp' }),
    E(540, 1010, Tx('?', 420, 'var(--a1)'), { w: 1, rot: 8, loop: 'swing', amp: 5, per: .9, sfx: 'pop' }),
  ] });
  shot({ w: 2, bg: 'yellow', scene: 1, html: [
    E(540, 880, O.person({ w: 460, fill: P.navy }), { a: 'up', sfx: 'pop' }),
    E(540, 380, Tx('TOI', 240, 'var(--a1)'), { a: 'down', d: .1 }),
  ] });
  shot({ w: 4, bg: 'coral', scene: 1, html: [
    E(540, 760, O.burst({ w: 1000 }), { a: 'pop', d: .72, loop: 'spin', per: 7, cut: false }),
    E(540, 760, O.tag('9,99 €', { w: 840 }), { a: 'drop', sfx: 'thud', m: [{ d: 1.0, s: 1.08, dur: .18 }, { d: 1.2, s: 1, dur: .2 }] }),
  ] });
  shot({ w: 5, bg: 'green', scene: 1, html: [
    E(540, 450, O.arrow({ w: 340, fill: P.coral }), { a: 'down', rot: 90, sfx: 'fall' }),
    E(540, 850, Tx('MOINS', 300), { a: 'stamp', w: 7, sfx: 'stamp' }),
    E(540, 1150, Tx('CHER', 300, 'var(--a1)'), { a: 'stamp', w: 8 }),
  ] });
  shot({ w: 9, bg: 'cream', scene: 1, html: [
    E(330, 560, O.tag('9,99 €', { w: 480, fill: P.yellow }), { a: 'left', rot: -6 }),
    E(720, 880, O.tag('10 €', { w: 600, fill: P.navy, ink: P.cream }), { w: 10, rot: 5, sfx: 'pop' }),
    E(540, 1170, Tx('?', 280, 'var(--a1)'), { w: 10, d: .45, loop: 'swing', amp: 7, per: .8 }),
  ] });

  /* ===== SCÈNE 2 — RETAINER ===== */
  shot({ w: 11, bg: 'navy', scene: 2, html: [
    E(540, 680, O.coin('1', { w: 480 }), { a: 'drop', sfx: 'coin', loop: 'pulse', amp: .03, per: 1 }),
    E(540, 1150, Tx('1 CENTIME', 200, 'var(--a1)'), { a: 'up', w: 13 }),
  ] });
  shot({ w: 14, bg: 'yellow', scene: 2, html: [
    E(540, 500, O.tag('9,99 €', { w: 620 }), { a: 'left' }),
    E(540, 1060, O.tag('10,00 €', { w: 620, fill: P.navy, ink: P.cream }), { a: 'right', d: .08 }),
    E(540, 780, Tx("0,01 € D'ÉCART", 130), { d: .3, sfx: 'pop' }),
  ] });
  shot({ w: 15, bg: 'coral', scene: 2, html: [
    E(540, 620, Tx('ET', 320), { a: 'stamp', sfx: 'stamp' }),
    E(540, 930, Tx('POURTANT…', 220, 'var(--a1)'), { a: 'up', w: 16 }),
  ] });
  shot({ w: 17, bg: 'green', scene: 2, html: [
    E(540, 780, O.calendar('UN JOUR', { w: 680 }), { a: 'spin', sfx: 'swish', m: [{ w: 18, r: -6, dur: .25 }, { w: 18, d: .3, r: 0, dur: .25 }] }),
  ] });
  shot({ w: 19, bg: 'cream', scene: 2, html: [
    E(320, 760, Tx('9', 860, 'var(--a1)'), { a: 'stamp', sfx: 'stamp', loop: 'pulse', amp: .03, per: .7 }),
    E(650, 1050, O.bar(200, { w: 110, fill: P.navy, grow: { w: 22, sfx: 'rise' } }), { a: 'none' }),
    E(790, 980, O.bar(340, { w: 110, fill: P.navy, grow: { w: 23 } }), { a: 'none' }),
    E(930, 890, O.bar(520, { w: 110, fill: P.green, grow: { w: 24 } }), { a: 'none' }),
  ] });
  shot({ w: 25, bg: 'navy', scene: 2, html: [
    E(540, 420, O.shirt({ w: 640, hanger: true }), { a: 'down', dist: 900, org: '50% 0%', loop: 'swing', amp: 7, per: 1.1, damp: 1.2, sfx: 'swish' },
      'transform-origin:50% 0%'),
    E(540, 1210, Tx('UN VÊTEMENT', 160, 'var(--a1)'), { a: 'up', w: 26 }),
  ] });
  shot({ w: 27, bg: 'yellow', scene: 2, html: [
    E(540, 870, O.tag('PRIX', { w: 640, fill: P.navy, ink: P.cream }), { a: 'pop', m: [{ w: 28, dy: -70, s: 1.12, dur: .4 }, { w: 30, d: .55, s: 1.2, dur: .2 }, { w: 30, d: .78, s: 1.12, dur: .2 }] }),
    E(540, 430, O.arrow({ w: 380, fill: P.coral }), { a: 'up', w: 28, rot: -90, sfx: 'rise', loop: 'float', amp: 18, per: .8 }),
    E(540, 1200, Tx('+ CHER', 220, 'var(--a1)'), { a: 'stamp', w: 30, sfx: 'stamp' }),
  ] });

  /* ===== SCÈNE 3 — LE CERVEAU ===== */
  shot({ w: 31, bg: 'coral', scene: 3, html: [
    E(540, 720, O.brain({ w: 720 }), { a: 'pop', sfx: 'pop', loop: 'float', per: 1.4 }),
    E(540, 1190, Tx('TON CERVEAU', 170, 'var(--a1)'), { a: 'up', w: 32 }),
  ] });
  shot({ w: 35, bg: 'navy', scene: 3, html: [
    E(540, 700, Tx('9,99', 440), { a: 'fade', dur: .1 }),
    E(540, 960, O.line('M20,20 H800', { w: 820, vw: 820, vh: 40, col: P.yellow, sw: 30, draw: { dur: .85 } }), { a: 'none', cut: false }),
    E(540, 1200, O.arrow({ w: 460 }), { a: 'left', w: 36, sfx: 'whoosh' }),
  ] });
  shot({ w: 38, bg: 'cream', scene: 3, html: [
    E(540, 500, O.eye({ w: 640 }), { a: 'pop', sfx: 'pop', m: [{ w: 40, dy: 20, s: 1.06, dur: .2 }] }),
    E(540, 1050, Tx('9', 600, 'var(--a1)'), { a: 'stamp', w: 41, sfx: 'stamp' }),
  ] });
  shot({ w: 43, bg: 'green', scene: 3, html: [
    E(540, 400, O.tag('9,99 €', { w: 480 }), { a: 'down', m: [{ w: 44, dy: 330, s: .6, dur: .4, e: 'inOut', sfx: 'swish' }] }),
    E(540, 850, O.box('9 €', { w: 600, fs: 100 }), { a: 'up' }),
    E(540, 1230, Tx('CLASSÉ', 160, 'var(--a1)'), { a: 'stamp', w: 44, d: .3, sfx: 'stamp' }),
  ] });
  shot({ w: 47, bg: 'yellow', scene: 3, html: [
    E(350, 600, Tx('9', 440), { a: 'none', m: [{ w: 48, s: 1.15, dur: .25 }, { w: 50, s: 1, dur: .2 }] }),
    E(700, 600, Tx(',99', 440), { a: 'none', m: [{ w: 49, o: .16, dur: .3, e: 'outCubic' }] }),
    E(540, 930, O.rect(800, 50, 'rgba(20,33,61,.22)', 25), { a: 'none', cut: false }),
    E(540, 930, O.line('M25,25 H280', { w: 800, vw: 800, vh: 50, col: P.coral, sw: 50, draw: { dur: .5 } }), { a: 'none', cut: false }),
    E(540, 1040, Tx(`LECTURE : ${cnt({ from: 0, to: 33, dur: .5, suf: ' %' })}`, 76, 'var(--ink)', { font: 'inter' }), { a: 'fade', cut: false }),
    E(540, 1250, O.stamp('DÉJÀ CLASSÉ', { w: 800, fs: 120 }), { a: 'stamp', w: 51, rot: -6, sfx: 'stamp' }),
  ] });
  shot({ w: 52, bg: 'navy', scene: 3, html: [
    E(540, 760, Tx('RÉSULTAT', 240, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 940, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 28, draw: { d: .2, dur: .3 } }), { a: 'none', cut: false }),
  ] });
  shot({ w: 53, bg: 'coral', scene: 3, html: [
    E(540, 780, O.tag('9,99 €', { w: 880 }), { a: 'drop', sfx: 'thud', m: [{ d: .72, s: 1.07, dur: .18 }, { d: .95, s: 1, dur: .2 }] }),
  ] });
  shot({ w: 54, bg: 'cream', scene: 3, html: [
    E(540, 400, O.tag('9,99 €', { w: 440, fill: P.yellow }), { a: 'down', m: [{ w: 56, dx: -250, dy: 430, s: .6, r: -12, dur: .45, e: 'inOut', sfx: 'swish' }] }),
    E(290, 1020, O.box('9 €…', { w: 430 }), { a: 'up' }),
    E(790, 1020, O.box('10 €', { w: 430, fill: P.green }), { a: 'up', d: .08 }),
  ] });
  shot({ w: 58, bg: 'green', scene: 3, html: [
    E(540, 560, Tx('9 €', 440, 'var(--a1)'), { a: 'stamp', sfx: 'stamp' }),
    E(540, 930, Tx('ET QUELQUES', 180), { a: 'up', w: 59 }),
    E(540, 1210, O.check({ w: 260, col: P.yellow, draw: { w: 60, d: .2, sfx: 'pop' } }), { a: 'none', w: 60 }),
  ] });
  shot({ w: 61, bg: 'yellow', scene: 3, html: [
    E(540, 360, Tx('PAS 10', 220), { a: 'down' }),
    E(540, 860, O.box('10 €', { w: 660, fill: P.green, fs: 100 }), { a: 'pop', m: [{ w: 63, d: .62, dy: 1100, r: 22, dur: .4, e: 'inOut', sfx: 'fall' }] }),
    E(540, 860, O.cross({ w: 640, draw: { w: 63, sfx: 'buzz' } }), { a: 'none', w: 63, m: [{ w: 63, d: .62, dy: 1100, r: 22, dur: .4, e: 'inOut' }] }),
  ] });

  /* ===== SCÈNE 4 — L'ÉTUDE DE 2005 ET SA RÈGLE ===== */
  const cher = o => O.person({ w: 280, fill: P.yellow, coat: true, ink: P.cream, ...o });
  shot({ w: 64, bg: 'navy', scene: 4, html: [
    E(240, 700, cher(), { a: 'pop', sfx: 'pop' }),
    E(540, 640, cher({ w: 320 }), { a: 'pop', d: .14 }),
    E(840, 700, cher(), { a: 'pop', d: .28 }),
    E(540, 1030, O.rect(800, 70, P.yellow, 12), { a: 'left', w: 67, sfx: 'swish' }),
    E(540, 1200, Tx('MESURÉ', 150, 'var(--a1)'), { a: 'up', w: 67, d: .12 }),
  ] });
  shot({ w: 69, bg: 'coral', scene: 4, html: [
    E(540, 740, Tx(cnt({ from: 1990, to: 2005, dur: .5, sfx: 'tick' }), 440), { a: 'pop' }),
    E(540, 1010, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.yellow, sw: 30, draw: { w: 70, d: .3, dur: .3 } }), { a: 'none', cut: false }),
  ] });
  shot({ w: 71, bg: 'cream', scene: 4, html: [
    E(300, 1010, O.person({ w: 380, fill: P.navy }), { a: 'left' }),
    E(690, 560, O.bubble({ w: 580, fill: P.navy }), { a: 'pop', d: .1, sfx: 'pop' }),
    E(690, 470, Tx('…', 280, P.cream), { a: 'pop', d: .28, cut: false }),
  ] });
  shot({ w: 73, bg: 'green', scene: 4, html: [
    E(540, 330, Tx("L'EFFET DU", 150), { a: 'down' }),
    E(540, 570, Tx('CHIFFRE', 260, 'var(--a1)'), { a: 'stamp', w: 75, sfx: 'stamp' }),
    E(540, 810, Tx('DE GAUCHE', 200), { a: 'up', w: 76 }),
    E(540, 1150, Tx(`<span style="color:${P.coral}">9</span>,99`, 300), { a: 'pop', w: 77, d: .05 }),
  ] });
  shot({ w: 78, bg: 'yellow', scene: 4, html: [
    E(540, 720, Tx('ET…', 300), { a: 'pop', hw: 80 }),
    E(540, 690, O.book('RÈGLE', { w: 560 }), { a: 'drop', w: 80, sfx: 'thud' }),
    E(540, 1200, O.stamp('N° 1', { w: 620, fs: 170, h: 250 }), { a: 'stamp', w: 82, rot: -8, sfx: 'stamp' }),
  ] });
  shot({ w: 83, bg: 'navy', scene: 4, html: [
    E(540, 620, O.pill({ w: 640, fill: T.navy2 }), { a: 'none' }),
    E(540, 620, O.pill({ w: 640 }), { a: 'fade', w: 85, dur: .15, cut: false }),
    E(392, 620, O.disc({ w: 236 }), { a: 'none', m: [{ w: 85, dx: 296, dur: .25, sfx: 'click' }] }),
    E(540, 960, Tx('ÇA MARCHE', 180, 'var(--a1)'), { a: 'pop', w: 85, d: .1 }),
    E(540, 1190, Tx('SEULEMENT SI…', 120), { a: 'up', w: 86 }),
  ] });
  shot({ w: 89, bg: 'coral', scene: 4, html: [
    E(540, 320, Tx('1ER CHIFFRE', 130, 'var(--a1)'), { a: 'down', d: .08 }),
    E(270, 780, O.rect(300, 480, P.navy, 30), { a: 'pop', m: [{ w: 91, d: .5, s: 1.1, dur: .2 }, { w: 91, d: .75, s: 1, dur: .2 }] }),
    E(270, 780, Tx('4', 440), { a: 'none', hw: 91, cut: false }),
    E(270, 780, Tx('3', 440, P.yellow), { a: 'down', dist: 300, w: 91, sfx: 'click', cut: false }),
    E(690, 780, Tx(',00', 440), { a: 'none', hw: 91 }),
    E(690, 780, Tx(',99', 440), { a: 'down', dist: 300, w: 91, d: .05 }),
    E(540, 1210, Tx('CHANGE', 180, 'var(--a1)'), { a: 'stamp', w: 91, d: .18, sfx: 'stamp' }),
  ] });
  shot({ w: 92, bg: 'cream', scene: 4, html: [
    E(540, 760, O.tag('3,60 €', { w: 840, fill: P.navy, ink: P.cream }), { a: 'drop', sfx: 'thud' }),
  ] });
  shot({ w: 94, bg: 'green', scene: 4, html: [
    E(540, 450, O.tag('3,60 €', { w: 620 }), { a: 'none' }),
    E(540, 850, O.tag('3,59 €', { w: 620, fill: P.yellow }), { a: 'drop', w: 95, sfx: 'thud' }),
    E(540, 1190, Tx('3 = 3', 240, 'var(--a1)'), { a: 'pop', w: 95, d: .75, sfx: 'pop' }),
  ] });
  shot({ w: 96, bg: 'yellow', scene: 4, html: [
    E(540, 620, O.line('M20,60 H840', { w: 860, vw: 860, vh: 120, col: P.navy, sw: 30, draw: { dur: .8 } }), { a: 'none', cut: false }),
    E(540, 1000, Tx('RIEN.', 420), { a: 'stamp', w: 99, sfx: 'stamp' }),
  ] });
  shot({ w: 100, bg: 'navy', scene: 4, html: [
    E(540, 760, O.tag('4,00 €', { w: 840 }), { a: 'drop', sfx: 'thud' }),
  ] });
  shot({ w: 102, bg: 'coral', scene: 4, html: [
    E(540, 450, O.tag('4,00 €', { w: 620 }), { a: 'none' }),
    E(540, 850, O.tag('3,99 €', { w: 620, fill: P.yellow }), { a: 'drop', w: 103, sfx: 'thud' }),
    E(310, 1190, Tx('4', 260, 'var(--a1)'), { a: 'pop', w: 103, d: .75, sfx: 'pop' }),
    E(540, 1190, O.arrow({ w: 200, fill: P.navy }), { a: 'pop', w: 103, d: .88 }),
    E(770, 1190, Tx('3', 260, 'var(--a1)'), { a: 'pop', w: 103, d: 1.0 }),
  ] });
  shot({ w: 104, bg: 'green', scene: 4, html: [
    E(500, 500, O.line('M20,30 C220,30 260,60 320,170 S440,440 620,460', { w: 820, vw: 640, vh: 490, col: P.coral, sw: 30, draw: { dur: .7, sfx: 'fall' } }), { a: 'none' }),
    E(540, 950, Tx('VRAIE', 230), { a: 'stamp', w: 107, sfx: 'stamp' }),
    E(540, 1180, Tx('BAISSE', 230, 'var(--a1)'), { a: 'stamp', w: 108 }),
    E(880, 330, O.coin('1', { w: 220 }), { a: 'spin', w: 108, d: .5, sfx: 'coin' }),
  ] });

  /* ===== SCÈNE 5 — LA LÉGENDE ===== */
  shot({ w: 109, bg: 'cream', scene: 5, html: [
    E(540, 480, Tx("D'OÙ VIENT", 210), { a: 'down' }),
    E(540, 730, Tx('CETTE HABITUDE', 150, 'var(--a1)'), { a: 'up', w: 111 }),
    E(290, 1090, Tx('?', 320), { w: 112, rot: -12, sfx: 'pop' }),
    E(540, 1070, Tx('?', 320, 'var(--a2)'), { w: 112, d: .3, sfx: 'pop' }),
    E(790, 1090, Tx('?', 320, 'var(--a1)'), { w: 112, d: .6, rot: 12, sfx: 'pop' }),
  ] });
  shot({ w: 113, bg: 'navy', scene: 5, html: [
    E(540, 760, O.burst({ w: 1150, n: 14 }), { a: 'pop', loop: 'spin', per: 9, cut: false }),
    E(540, 760, O.scroll({ w: 900, txt: 'LÉGENDE' }), { a: 'pop', w: 114, sfx: 'swish' }),
  ] });
  shot({ w: 117, bg: 'yellow', scene: 5, html: [
    E(540, 600, Tx('XIX<span style="font-size:.45em;vertical-align:.95em">E</span>', 460), { a: 'stamp', sfx: 'stamp' }),
    E(540, 970, Tx('SIÈCLE', 240, 'var(--a1)'), { a: 'up', w: 118 }),
  ] });
  shot({ w: 119, bg: 'green', scene: 5, html: [
    E(320, 860, O.person({ w: 360, hat: true }), { a: 'pop', sfx: 'pop' }),
    E(760, 860, O.person({ w: 360, hat: true }), { a: 'pop', d: .14 }),
    E(540, 1240, Tx('LES PATRONS', 140, 'var(--a1)'), { a: 'up', w: 120 }),
    E(540, 400, Tx('!', 360, 'var(--a2)'), { a: 'stamp', w: 122, sfx: 'stamp' }),
  ] });
  shot({ w: 123, bg: 'coral', scene: 5, html: [
    E(350, 760, O.person({ w: 380, fill: P.cream }), { a: 'up' }),
    E(730, 780, O.register({ w: 440, fill: P.yellow }), { a: 'pop', d: .14, sfx: 'pop' }),
    E(540, 1000, O.rect(940, 90, P.navy, 14), { a: 'none' }),
    E(540, 1200, Tx('LES CAISSIERS', 140, 'var(--a1)'), { a: 'up', w: 124 }),
  ] });
  shot({ w: 126, bg: 'cream', scene: 5, html: [
    E(540, 905, O.drawer({ w: 560 }), { a: 'none', m: [{ w: 128, dy: 150, dur: .25, sfx: 'kaching' }] }),
    E(540, 680, O.register({ w: 760 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1230, Tx('OUVRIR LE TIROIR', 110), { a: 'up', w: 126, d: .15 }),
  ] });
  shot({ w: 129, bg: 'navy', scene: 5, html: [
    E(540, 1180, O.drawer({ w: 760 }), { a: 'none' }),
    E(540, 1090, O.coin('1', { w: 200 }), { a: 'none', m: [{ w: 130, dy: -590, s: 1.7, dur: .5, sfx: 'coin' }] }),
    E(540, 870, Tx('1 CENTIME', 200, 'var(--a1)'), { a: 'stamp', w: 132, sfx: 'stamp' }),
  ] });
  shot({ w: 133, bg: 'yellow', scene: 5, html: [
    E(540, 450, O.receipt({ w: 320 }), { a: 'up', dist: 420, w: 135, sfx: 'print' }),
    E(540, 900, O.register({ w: 660 }), { a: 'none' }),
    E(540, 1250, Tx('VENTE ENREGISTRÉE', 100), { a: 'up', w: 135, d: .25, dist: 200 }),
  ] });
  shot({ w: 138, bg: 'coral', scene: 5, html: [
    E(330, 900, O.person({ w: 520, fill: P.cream }), { a: 'none' }),
    E(330, 1110, O.rect(170, 130, T.cream2, 16), { a: 'none', cut: false }),
    E(830, 640, O.bill({ w: 380 }), { a: 'right', m: [{ w: 140, dx: -490, dy: 420, s: .5, r: -28, dur: .45, e: 'inOut', sfx: 'swish' }] }),
    E(540, 820, O.cross({ w: 680, col: P.navy, draw: { w: 142, sfx: 'buzz' } }), { a: 'none', w: 142, loop: 'shake', lw: 142, ld: .25, ldur: .3, amp: 8 }),
    E(540, 300, Tx('INTERDIT', 180, 'var(--a1)'), { a: 'stamp', w: 142, d: .25 }),
  ] });
  shot({ w: 143, bg: 'green', scene: 5, html: [
    E(190, 380, O.burst({ w: 240, n: 8 }), { a: 'spin', d: .15, loop: 'spin', per: 5, cut: false }),
    E(890, 1170, O.burst({ w: 240, n: 8, col: P.coral }), { a: 'spin', d: .35, loop: 'spin', per: 5, cut: false }),
    E(540, 620, Tx('JOLIE', 280), { a: 'pop', sfx: 'pop' }),
    E(540, 910, Tx('HISTOIRE', 280, 'var(--a1)'), { a: 'pop', w: 144 }),
  ] });
  shot({ w: 145, bg: 'cream', scene: 5, html: [
    E(540, 760, O.scroll({ w: 860 }), { a: 'none', m: [{ w: 146, d: .16, r: 3, dur: .08 }, { w: 146, d: .26, r: 0, dur: .12 }] }),
    E(540, 760, Tx('?', 260, P.navy), { a: 'pop', hw: 146, cut: false }),
    E(540, 770, O.stamp('JAMAIS PROUVÉE', { w: 900, fs: 100, h: 230 }), { a: 'stamp', w: 146, rot: -10, sfx: 'stamp' }),
  ] });

  /* ===== SCÈNE 6 — L'EXPÉRIENCE DE 2003 ===== */
  shot({ w: 147, bg: 'navy', scene: 6, html: [
    E(540, 620, O.clipboard({ w: 440 }), { a: 'pop', sfx: 'pop' }),
    E(540, 660, O.stamp('PROUVÉ', { w: 640, fs: 150 }), { a: 'stamp', w: 150, rot: -8, sfx: 'stamp' }),
    E(540, 1160, Tx('PLUS ÉTRANGE', 180, 'var(--a1)'), { a: 'pop', w: 152, sfx: 'pop', loop: 'swing', amp: 2.5, per: .5 }),
  ] });
  shot({ w: 154, bg: 'yellow', scene: 6, html: [
    E(540, 740, Tx(cnt({ from: 1990, to: 2003, d: .2, dur: .5, sfx: 'tick' }), 440), { a: 'pop', m: [{ w: 155, d: .5, s: 1.08, dur: .2 }, { w: 155, d: .72, s: 1, dur: .2 }] }),
    E(540, 1010, O.line('M20,20 H780', { w: 800, vw: 800, vh: 40, col: P.coral, sw: 30, draw: { w: 155, d: .25, dur: .3 } }), { a: 'none', cut: false }),
  ] });
  const cher2 = () => O.person({ w: 360, fill: P.navy, coat: true, ink: P.cream });
  shot({ w: 156, bg: 'coral', scene: 6, html: [
    E(320, 780, cher2(), { a: 'pop', sfx: 'pop' }),
    E(760, 780, cher2(), { a: 'pop', w: 157, sfx: 'pop' }),
    E(540, 1180, O.clipboard({ w: 220 }), { a: 'up', w: 158 }),
  ] });
  shot({ w: 159, bg: 'cream', scene: 6, html: [
    E(540, 620, O.catalogue({ w: 540 }), { a: 'drop', sfx: 'thud', m: [{ w: 160, d: .3, r: -4, dur: .3 }] }),
    E(540, 1190, Tx('DE VÊTEMENTS', 150), { a: 'up', w: 161 }),
  ] });
  shot({ w: 163, bg: 'green', scene: 6, html: [
    E(540, 690, O.shirt({ w: 620 }), { a: 'pop', sfx: 'pop' }),
    E(540, 1190, Tx('MÊME ARTICLE', 170, 'var(--a1)'), { a: 'up', w: 164 }),
  ] });
  const t3 = (k, o = {}) => O.tag(['- CHER', '…9', '+ CHER'][k], { w: 310, fs: 110, fill: k === 1 ? P.yellow : P.cream, ...o });
  shot({ w: 165, bg: 'navy', scene: 6, html: [
    E(200, 520, O.shirt({ w: 250 }), { a: 'none' }), E(540, 520, O.shirt({ w: 250 }), { a: 'none' }), E(880, 520, O.shirt({ w: 250 }), { a: 'none' }),
    E(200, 800, t3(0), { a: 'pop', sfx: 'pop' }),
    E(540, 800, t3(1), { a: 'pop', w: 166, sfx: 'pop' }),
    E(880, 800, t3(2), { a: 'pop', w: 167, sfx: 'pop' }),
    E(540, 1150, Tx('3 PRIX', 240, 'var(--a1)'), { a: 'stamp', w: 166, d: .05 }),
  ] });
  const fan = (dx, d) => ({ a: 'pop', m: [{ w: 170, d, dx, dy: 210, dur: .4, e: 'inOut', sfx: d ? undefined : 'swish' }] });
  shot({ w: 168, bg: 'yellow', scene: 6, html: [
    E(200, 940, O.person({ w: 250 }), { a: 'none' }), E(540, 940, O.person({ w: 250 }), { a: 'none' }), E(880, 940, O.person({ w: 250 }), { a: 'none' }),
    E(540, 400, O.catalogue({ w: 210 }), fan(-340, 0)),
    E(540, 400, O.catalogue({ w: 210, fill: P.green }), fan(340, .2)),
    E(540, 400, O.catalogue({ w: 210, fill: P.navy }), fan(0, .1)),
    E(540, 1240, Tx('3 CATALOGUES', 130), { a: 'up', w: 170, d: .3, dist: 200 }),
  ] });
  shot({ w: 172, bg: 'coral', scene: 6, html: [
    E(200, 820, t3(0), { a: 'pop', sfx: 'pop' }),
    E(880, 820, t3(2), { a: 'pop', d: .16 }),
    E(540, 820, t3(1), { a: 'pop', d: .08, m: [{ w: 175, dy: -190, s: 1.5, dur: .35, sfx: 'rise' }] }),
    E(540, 350, O.arrow({ w: 200, fill: P.navy }), { a: 'down', w: 175, d: .15, rot: 90 }),
    E(540, 1160, Tx('LE MILIEU', 180, 'var(--a1)'), { a: 'up', w: 175 }),
  ] });
  shot({ w: 177, bg: 'cream', scene: 6, html: [
    E(540, 470, O.tag('…9', { w: 760, fill: P.yellow }), { a: 'pop' }),
    E(540, 1040, Tx('9', 580, 'var(--a1)'), { a: 'stamp', w: 179, sfx: 'stamp' }),
  ] });
  const lab = (x, s) => E(x, 1125, Tx(s, 64, 'var(--ink)', { font: 'inter' }), { a: 'fade', cut: false });
  shot({ w: 180, bg: 'green', scene: 6, html: [
    E(240, 1070 - 165, O.bar(330, { w: 220, grow: { w: 181 } }), { a: 'none' }),
    E(840, 1070 - 150, O.bar(300, { w: 220, grow: { w: 181, d: .1 } }), { a: 'none' }),
    E(540, 1070 - 320, O.bar(640, { w: 220, fill: P.yellow, grow: { w: 182, dur: .6, sfx: 'rise' } }), { a: 'none' }),
    lab(240, '- CHER'), lab(540, '…9'), lab(840, '+ CHER'),
    E(540, 320, O.crown({ w: 230 }), { a: 'drop', w: 186, dur: .45, sfx: 'ding' }),
    E(540, 1250, Tx('VEND LE PLUS', 130, 'var(--a1)'), { a: 'up', w: 184, dist: 200 }),
  ] });
  shot({ w: 187, bg: 'navy', scene: 6, html: [
    E(270, 1000, O.bar(300, { w: 220, grow: { d: .0, dur: .01 } }), { a: 'none' }),
    E(810, 850, O.bar(600, { w: 220, fill: P.yellow, grow: { d: .0, dur: .01 } }), { a: 'none' }),
    E(270, 740, t3(0, { w: 380 }), { a: 'pop', loop: 'shake', lw: 192, ldur: .45, amp: 7 }),
    E(810, 440, t3(1, { w: 380 }), { a: 'pop', d: .08 }),
    E(540, 700, Tx('&lt;', 300, 'var(--a2)'), { a: 'stamp', w: 188, sfx: 'stamp' }),
    E(540, 1250, Tx('PLUS CHER, PLUS VENDU', 96, 'var(--a1)'), { a: 'up', w: 190, dist: 200 }),
  ] });

  /* ===== SCÈNE 7 — BOUCLE ===== */
  shot({ w: 194, bg: 'cream', scene: 7, html: [
    E(540, 520, O.rect(940, 40, P.navy, 12), { a: 'left' }),
    E(540, 330, Tx('LA PROCHAINE', 140, 'var(--a1)'), { a: 'down', w: 196 }),
    E(240, 1030, O.person({ w: 320, fill: P.green }), { a: 'left', w: 195, sfx: 'pop' }),
    E(690, 800, O.tag('9,99 €', { w: 540, fill: P.yellow }), { a: 'down', dist: 500, w: 198, org: '8% 50%', loop: 'swing', amp: 6, per: 1.1, sfx: 'swish' }),
  ] });
  shot({ w: 199, bg: 'coral', scene: 7, html: [
    E(540, 330, O.eye({ w: 320, px: -.6 }), { a: 'pop', d: .05 }),
    E(540, 780, Tx(`<span style="color:${P.yellow}">9</span>,99`, 440), { a: 'none' }),
    E(310, 824, O.magnifier({ w: 460 }), { a: 'left', dist: 600, d: .08, sfx: 'whoosh', m: [{ w: 201, s: 1.12, dur: .25 }] }),
    E(540, 1230, Tx('1ER CHIFFRE', 160, 'var(--a1)'), { a: 'stamp', w: 201, sfx: 'stamp' }),
  ] });
  shot({ w: 203, bg: 'navy', scene: 7, html: [
    E(340, 620, O.disc({ w: 120 }), { a: 'pop', sfx: 'pop' }),
    E(540, 620, O.disc({ w: 120 }), { a: 'pop', w: 204, sfx: 'pop' }),
    E(740, 620, O.disc({ w: 120 }), { a: 'pop', w: 204, d: .28, sfx: 'pop' }),
    E(540, 1010, Tx('?', 420, 'var(--a1)'), { a: 'pop', w: 204, d: .55, rot: 8, loop: 'swing', amp: 5, per: .9 }),
  ] });
})();
