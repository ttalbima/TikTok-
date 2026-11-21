/* Bibliothèque d'objets « papier découpé » réutilisés dans toute la série.
   Chaque fonction renvoie un SVG (largeur w, hauteur proportionnelle). */
(function () {
  const { PAL: P, TINT: T } = V;
  const svg = (w, vw, vh, inner) =>
    `<svg width="${w}" height="${(w * vh) / vw}" viewBox="0 0 ${vw} ${vh}" style="overflow:visible">${inner}</svg>`;
  const O = (window.O = {});

  // étiquette de prix
  O.tag = (txt, o = {}) => {
    const { w = 560, fill = P.cream, ink = P.navy, fs = 150, sub = '' } = o;
    return svg(w, 620, 260,
      `<path d="M110,0 H590 a30,30 0 0 1 30,30 V230 a30,30 0 0 1 -30,30 H110 L0,130 Z" fill="${fill}"/>
       <circle cx="78" cy="130" r="22" fill="rgba(0,0,0,.35)"/>
       <path d="M78,130 C20,90 -40,60 -90,-10" fill="none" stroke="${ink}" stroke-width="7" stroke-linecap="round" opacity=".55"/>
       <text x="365" y="${sub ? 160 : 185}" text-anchor="middle" font-size="${fs}" fill="${ink}">${txt}</text>
       ${sub ? `<text x="365" y="232" text-anchor="middle" font-size="46" fill="${ink}" opacity=".7">${sub}</text>` : ''}`);
  };
  // pièce
  O.coin = (label = '1', o = {}) => {
    const { w = 260, small = 'c' } = o;
    return svg(w, 260, 260,
      `<circle cx="130" cy="130" r="128" fill="${T.yellow2}"/><circle cx="130" cy="130" r="112" fill="${P.yellow}"/>
       <circle cx="130" cy="130" r="92" fill="none" stroke="${T.yellow2}" stroke-width="8"/>
       <text x="${small ? 112 : 130}" y="178" text-anchor="middle" font-size="140" fill="${P.navy}">${label}</text>
       ${small ? `<text x="176" y="176" text-anchor="middle" font-size="70" fill="${P.navy}">${small}</text>` : ''}`);
  };
  // billet
  O.bill = (o = {}) => {
    const { w = 420 } = o;
    return svg(w, 420, 220,
      `<rect width="420" height="220" rx="20" fill="${T.green2}"/>
       <rect x="18" y="18" width="384" height="184" rx="10" fill="none" stroke="${P.cream}" stroke-width="6" opacity=".55"/>
       <circle cx="210" cy="110" r="62" fill="${P.cream}"/><text x="210" y="148" text-anchor="middle" font-size="100" fill="${P.green}">€</text>`);
  };
  // cerveau
  O.brain = (o = {}) => {
    const { w = 520, fill = P.cream, fold = P.coral } = o;
    return svg(w, 520, 420,
      `<g fill="${fill}"><circle cx="150" cy="170" r="120"/><circle cx="260" cy="130" r="130"/><circle cx="380" cy="180" r="120"/>
       <circle cx="190" cy="280" r="110"/><circle cx="340" cy="290" r="105"/><rect x="235" y="330" width="70" height="90" rx="30"/></g>
       <g fill="none" stroke="${fold}" stroke-width="13" stroke-linecap="round">
       <path d="M260,20 V330"/><path d="M110,150 q50,-50 100,0 t-40,90"/><path d="M410,150 q-50,-50 -100,0 t40,90"/>
       <path d="M130,300 q40,30 80,-10"/><path d="M390,300 q-40,30 -80,-10"/></g>`);
  };
  // œil (px : -1 gauche … 1 droite)
  O.eye = (o = {}) => {
    const { w = 460, px = 0 } = o;
    return svg(w, 460, 260,
      `<path d="M0,130 Q230,-70 460,130 Q230,330 0,130 Z" fill="${P.cream}" stroke="${P.navy}" stroke-width="14" stroke-linejoin="round"/>
       <circle cx="${230 + px * 60}" cy="130" r="84" fill="${P.navy}"/><circle cx="${230 + px * 60}" cy="130" r="40" fill="#000"/>
       <circle cx="${258 + px * 60}" cy="100" r="18" fill="${P.cream}"/>`);
  };
  // vêtement (tee-shirt) avec cintre optionnel
  O.shirt = (o = {}) => {
    const { w = 420, fill = P.coral, hanger = false } = o;
    return svg(w, 420, 400,
      `${hanger ? `<path d="M210,40 q0,-40 -22,-52 M60,92 L210,40 L360,92" fill="none" stroke="${P.cream}" stroke-width="12" stroke-linecap="round"/>` : ''}
       <path d="M130,50 Q210,110 290,50 L410,120 L350,210 L310,180 V390 H110 V180 L70,210 L10,120 Z" fill="${fill}"/>
       <path d="M130,50 Q210,110 290,50" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="12"/>`);
  };
  // silhouette sans visage
  O.person = (o = {}) => {
    const { w = 280, fill = P.navy, hat = false, coat = false, ink = P.cream } = o;
    return svg(w, 280, 420,
      `${hat ? `<rect x="88" y="-62" width="104" height="96" rx="6" fill="${fill}"/><rect x="52" y="24" width="176" height="20" rx="8" fill="${fill}"/>` : ''}
       <circle cx="140" cy="92" r="72" fill="${fill}"/>
       <path d="M20,420 Q20,190 140,190 Q260,190 260,420 Z" fill="${coat ? ink : fill}"/>
       ${coat ? `<path d="M140,200 L100,330 M140,200 L180,330 M140,250 V420" stroke="${fill}" stroke-width="9" fill="none" stroke-linecap="round"/>
       <rect x="176" y="300" width="50" height="46" rx="6" fill="none" stroke="${fill}" stroke-width="7"/>` : ''}`);
  };
  // bloc-notes
  O.clipboard = (o = {}) => {
    const { w = 200 } = o;
    return svg(w, 200, 260,
      `<rect width="200" height="260" rx="16" fill="${T.cream2}"/><rect x="18" y="34" width="164" height="208" rx="6" fill="${P.cream}"/>
       <rect x="62" y="-12" width="76" height="46" rx="10" fill="${P.navy}"/>
       <g stroke="${P.navy}" stroke-width="9" stroke-linecap="round" opacity=".6"><path d="M40,90 H160 M40,130 H160 M40,170 H120"/></g>`);
  };
  // caisse enregistreuse (corps) et tiroir séparés
  O.register = (o = {}) => {
    const { w = 600, fill = P.coral } = o;
    return svg(w, 600, 470,
      `<rect x="330" y="0" width="200" height="110" rx="14" fill="${P.navy}"/><rect x="348" y="18" width="164" height="64" rx="6" fill="${T.green2}"/>
       <text x="430" y="68" text-anchor="middle" font-size="50" fill="${P.cream}">0,01</text>
       <path d="M60,150 H540 L600,360 H0 Z" fill="${fill}"/>
       <g fill="${P.cream}">${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<rect x="${170 + c * 72}" y="${186 + r * 52}" width="52" height="34" rx="8"/>`).join('')).join('')}</g>
       <rect x="0" y="360" width="600" height="110" rx="10" fill="${T.coral2}"/>`);
  };
  O.drawer = (o = {}) => {
    const { w = 540 } = o;
    return svg(w, 540, 130,
      `<rect width="540" height="130" rx="10" fill="${P.navy}"/><rect x="20" y="16" width="500" height="70" rx="6" fill="${T.navy2}"/>
       <g fill="${P.yellow}"><circle cx="90" cy="52" r="26"/><circle cx="160" cy="52" r="26"/></g>
       <g fill="${T.green2}"><rect x="240" y="26" width="110" height="52" rx="6"/><rect x="370" y="26" width="110" height="52" rx="6"/></g>
       <rect x="220" y="98" width="100" height="18" rx="9" fill="${P.cream}"/>`);
  };
  // ticket de caisse
  O.receipt = (o = {}) => {
    const { w = 300 } = o;
    return svg(w, 300, 420,
      `<path d="M0,0 H300 V400 l-30,20 -30,-20 -30,20 -30,-20 -30,20 -30,-20 -30,20 -30,-20 -30,20 -30,-20 Z" fill="${P.cream}"/>
       <g stroke="${P.navy}" stroke-width="10" stroke-linecap="round" opacity=".55"><path d="M40,70 H260 M40,120 H260 M40,170 H180"/></g>
       <path d="M70,280 l50,50 l110,-110" fill="none" stroke="${T.green2}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>`);
  };
  // catalogue
  O.catalogue = (o = {}) => {
    const { w = 420, fill = P.coral, mark = P.yellow } = o;
    return svg(w, 420, 540,
      `<rect x="24" y="16" width="396" height="524" rx="12" fill="${T.cream2}"/><rect x="12" y="8" width="396" height="524" rx="12" fill="${P.cream}"/>
       <rect width="396" height="524" rx="12" fill="${fill}"/>
       <rect x="40" y="40" width="316" height="70" rx="8" fill="${P.cream}"/><text x="198" y="96" text-anchor="middle" font-size="58" fill="${P.navy}">CATALOGUE</text>
       <path d="M148,190 Q198,228 248,190 L324,236 L286,292 L262,274 V420 H134 V274 L110,292 L72,236 Z" fill="${mark}"/>`);
  };
  // parchemin
  O.scroll = (o = {}) => {
    const { w = 760, txt = '', fs = 150 } = o;
    return svg(w, 760, 380,
      `<rect x="40" y="30" width="680" height="320" fill="${P.cream}"/>
       <rect x="0" y="0" width="80" height="380" rx="40" fill="${T.cream2}"/><rect x="680" y="0" width="80" height="380" rx="40" fill="${T.cream2}"/>
       <text x="380" y="${190 + fs * .36}" text-anchor="middle" font-size="${fs}" fill="${P.navy}">${txt}</text>`);
  };
  // loupe
  O.magnifier = (o = {}) => {
    const { w = 420, ring = P.navy } = o;
    return svg(w, 420, 420,
      `<path d="M270,270 L400,400" stroke="${ring}" stroke-width="46" stroke-linecap="round"/>
       <circle cx="170" cy="170" r="150" fill="rgba(244,235,217,.28)" stroke="${ring}" stroke-width="34"/>`);
  };
  // flèche pleine (pointe vers la droite ; tourner avec rot)
  O.arrow = (o = {}) => {
    const { w = 420, fill = P.yellow } = o;
    return svg(w, 420, 240, `<path d="M0,80 H250 V0 L420,120 L250,240 V160 H0 Z" fill="${fill}"/>`);
  };
  // boîte de rangement avec libellé
  O.box = (label, o = {}) => {
    const { w = 420, fill = P.navy, ink = P.cream, fs = 76 } = o;
    return svg(w, 420, 330,
      `<path d="M0,60 H420 L390,330 H30 Z" fill="${fill}"/><rect x="-14" y="30" width="448" height="60" rx="12" fill="${fill}"/>
       <rect x="-14" y="30" width="448" height="60" rx="12" fill="rgba(0,0,0,.2)"/>
       <rect x="70" y="140" width="280" height="130" rx="10" fill="${ink}"/>
       <text x="210" y="${205 + fs * .36}" text-anchor="middle" font-size="${fs}" fill="${fill}">${label}</text>`);
  };
  // page de calendrier
  O.calendar = (txt, o = {}) => {
    const { w = 520, fs = 130 } = o;
    return svg(w, 520, 520,
      `<rect width="520" height="520" rx="34" fill="${P.cream}"/><path d="M0,34 a34,34 0 0 1 34,-34 H486 a34,34 0 0 1 34,34 V140 H0 Z" fill="${P.coral}"/>
       <g fill="${P.navy}"><rect x="120" y="-40" width="34" height="110" rx="17"/><rect x="366" y="-40" width="34" height="110" rx="17"/></g>
       <text x="260" y="${330 + fs * .36}" text-anchor="middle" font-size="${fs}" fill="${P.navy}">${txt}</text>`);
  };
  // tampon (cadre + texte), à poser avec l'animation « stamp »
  O.stamp = (txt, o = {}) => {
    const { w = 760, col = P.coral, fs = 130, h = 240 } = o;
    return svg(w, 760, h,
      `<rect x="10" y="10" width="740" height="${h - 20}" rx="26" fill="none" stroke="${col}" stroke-width="20"/>
       <text x="380" y="${h / 2 + fs * .37}" text-anchor="middle" font-size="${fs}" fill="${col}">${txt}</text>`);
  };
  // bulle
  O.bubble = (o = {}) => {
    const { w = 520, fill = P.cream } = o;
    return svg(w, 520, 360, `<path d="M40,0 H480 a40,40 0 0 1 40,40 V240 a40,40 0 0 1 -40,40 H190 L90,360 L110,280 H40 a40,40 0 0 1 -40,-40 V40 a40,40 0 0 1 40,-40 Z" fill="${fill}"/>`);
  };
  // livre
  O.book = (txt, o = {}) => {
    const { w = 520, fill = P.navy, ink = P.cream, fs = 120 } = o;
    return svg(w, 520, 640,
      `<rect x="26" y="20" width="494" height="620" rx="14" fill="${T.cream2}"/><rect width="494" height="620" rx="14" fill="${fill}"/>
       <rect x="0" y="0" width="56" height="620" rx="14" fill="rgba(0,0,0,.25)"/>
       <rect x="100" y="110" width="340" height="14" rx="7" fill="${ink}" opacity=".5"/><rect x="100" y="500" width="340" height="14" rx="7" fill="${ink}" opacity=".5"/>
       <text x="270" y="${310 + fs * .36}" text-anchor="middle" font-size="${fs}" fill="${ink}">${txt}</text>`);
  };
  // interrupteur
  O.pill = (o = {}) => {
    const { w = 520, fill = T.green2 } = o;
    return svg(w, 520, 240, `<rect width="520" height="240" rx="120" fill="${fill}"/>`);
  };
  O.disc = (o = {}) => {
    const { w = 200, fill = P.cream } = o;
    return svg(w, 200, 200, `<circle cx="100" cy="100" r="100" fill="${fill}"/>`);
  };
  O.rect = (w, h, fill, rx = 0) => `<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${rx}" fill="${fill}"/></svg>`;
  // trait dessiné (animation data-draw)
  O.line = (d, o = {}) => {
    const { w = 600, vw = 600, vh = 300, col = P.coral, sw = 34, draw = {} } = o;
    return svg(w, vw, vh, `<path d="${d}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" data-draw='${JSON.stringify(draw)}'/>`);
  };
  O.cross = (o = {}) => {
    const { w = 420, col = P.coral, sw = 60, draw = {} } = o;
    const d2 = { ...draw, d: (draw.d || 0) + .12, sfx: undefined };
    return svg(w, 400, 400,
      `<path d="M50,50 L350,350" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" data-draw='${JSON.stringify(draw)}'/>
       <path d="M350,50 L50,350" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" data-draw='${JSON.stringify(d2)}'/>`);
  };
  O.check = (o = {}) => {
    const { w = 360, col = T.green2, sw = 60, draw = {} } = o;
    return svg(w, 400, 320, `<path d="M40,170 L150,280 L360,40" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" data-draw='${JSON.stringify(draw)}'/>`);
  };
  // éclats autour d'un objet
  O.burst = (o = {}) => {
    const { w = 700, col = P.yellow, n = 10 } = o;
    let s = '';
    for (let i = 0; i < n; i++) s += `<rect x="340" y="0" width="20" height="90" rx="10" fill="${col}" transform="rotate(${(360 / n) * i} 350 350)"/>`;
    return svg(w, 700, 700, s);
  };
  // colonne de graphique (pousse depuis le bas)
  O.bar = (h, o = {}) => {
    const { w = 200, fill = P.cream, grow = {} } = o;
    return `<div style="width:${w}px;height:${h}px;background:${fill};border-radius:18px 18px 0 0;transform-origin:50% 100%" data-grow='${JSON.stringify(grow)}'></div>`;
  };
  O.crown = (o = {}) => {
    const { w = 220 } = o;
    return svg(w, 220, 160, `<path d="M0,160 L10,30 L70,90 L110,0 L150,90 L210,30 L220,160 Z" fill="${P.yellow}"/><rect x="0" y="134" width="220" height="26" fill="${T.yellow2}"/>`);
  };
})();
