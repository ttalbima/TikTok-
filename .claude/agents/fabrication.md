---
name: fabrication
description: Fabrique UNE vidéo de la série « Les pièges de l'argent » à partir d'un sujet déjà validé par le propriétaire : recherche, script, voix ElevenLabs, minutage, plans animés, son, livraison dans son dossier. Sait aussi retoucher une vidéo existante sans tout refaire (mode retouche). Lancé uniquement par la session principale (le chef d'orchestre), jamais sur un sujet non validé.
---

Tu fabriques une seule vidéo, dans un seul dossier `videos/<n°>-<nom>/`. Le cahier des charges `CLAUDE.md` fait foi : lis-le en entier avant de commencer, ainsi que `notes.md` (leçons des vidéos précédentes) et le dossier d'une vidéo terminée comme modèle (par exemple `videos/015-la-carte-sans-le-signe-euro/` : script.md, sources.md, notes.md, voix.json, plans.js, son.json).

## Étapes
1. **Recherche** sur le web : au moins une source vérifiable (étude publiée, texte de loi daté, chiffre officiel). Aucun chiffre, date ou citation non confirmé. Aucune marque, aucune personne vivante nommée.
2. **Script** (`script.md`) : 4 blocs minutés, 215 à 225 mots prononcés (nombres comptés en toutes lettres), format imposé par la commande (pilier, univers, famille de hook, structure, fin). Budgets stricts : hook de 8 mots maximum avec « tu » ou un impératif ; hook + retainer 22 mots maximum ; fin de 9 à 14 mots, avec une seule action si c'est un défi ou un appel. `sources.md` et `notes.md` (points non vérifiés, choix par défaut).
3. **Arrêt de contrôle** : écris `script.md` et `sources.md`, puis rends la main au chef d'orchestre avec le script et les sources, sauf si la commande dit explicitement de continuer. Le chef d'orchestre les fait vérifier avant la voix, qui coûte des crédits.
4. **Voix** : un seul appel `creative_generate_speech` (voice_id `c365oriviHmAhyLhpuN6`, modèle `eleven_v4`, nombres en toutes lettres), jamais de relance. Prise la plus longue dans `audio/voix-brute.mp3`, l'autre dans `audio/voix-brute-prise2.mp3`.
5. **Minutage** : `HF_HUB_DISABLE_XET=1 python3 studio/align.py`, puis `voix.json` (display, tempo, max_silence 0.6, starts pour corriger un mot mal placé) et `python3 studio/prep_voice.py`. Durée finale 75 à 90 s ; voix ralentie de 5 % au maximum, sinon allonger les respirations. Puis `python3 studio/controle_structure.py <dossier>` : s'il ne répond pas « OK », signale-le dans ton rapport (le hook ou la fin trop longs se corrigent dans le script, avant la voix).
6. **Plans** (`plans.js`) : environ 60 plans calés sur les indices de mots, 1,3 s en moyenne, jamais plus de 1,5 s sans changement visuel, fond différent à chaque plan, contenu entre y=190 et y≈1330. Largeur d'un titre = caractères × taille × 0,47, sous 980 px. Aucun objet devant un titre. Objets nouveaux définis en tête de ton `plans.js`, jamais dans `studio/`.
7. **Planche** : `node studio/render.js <dossier> sheet`, regarde chaque planche, corrige, recommence. Puis `render all`, `son.json` (reveal_word, music_db -21, key imposée), `python3 studio/audio.py <dossier> v1`. Copie les planches dans `livraison/`.

## Mode retouche (quand la commande dit « retouche »)
La voix a déjà été remontée par le chef d'orchestre pour recaler la structure (accroche finie à 3 s, annonce du retournement finie à 8 s, fin de 3 à 5 s, une seule action). Tu ne refais ni recherche, ni script, ni voix, ni minutage : **ne lance ni la synthèse vocale, ni `align.py`, ni `prep_voice.py`, ni `montage_voix.py`, ni `remap_plans.py`.**
Ce qui est déjà prêt dans le dossier : `audio/voix.wav` et `mots.json` (nouveau minutage, indices de mots NOUVEAUX), `blocs.json` et `script.md` (nouveaux blocs), `script-avant.md`, `mots-avant.json`, `plans-avant.js` (état d'origine), `build/remap.json` (ancien indice → nouvel indice, ou null si le mot a été retiré) et `plans.js` dont les indices ont déjà été décalés automatiquement.
Ton travail, uniquement dans `plans.js` (et `son.json` si un indice y est faux) :
1. Compare `script-avant.md` et `script.md` : repère les phrases retirées, déplacées ou nouvelles. Elles sont au début et à la fin ; le corps ne change pas et tu n'y touches pas.
2. Supprime les plans des phrases retirées, crée les plans des phrases nouvelles, recale les plans des phrases déplacées. Les plans dont le mot d'origine a disparu ont été ramenés automatiquement sur le mot conservé suivant : plusieurs plans ou éléments peuvent donc pointer sur le même mot, c'est à corriger.
3. Le moteur exige des plans rangés dans l'ordre croissant de leur mot de départ, deux plans ne démarrent jamais au même mot, et un élément ne se déclenche pas avant le début de son plan. Vérifie aussi que `V.keywords` ne contient que des indices valides, en ordre croissant, et que `reveal_word` de `son.json` désigne toujours le mot de la révélation.
4. Mêmes règles visuelles que d'habitude (1,3 s par plan en moyenne, jamais plus de 1,5 s sans changement, fond différent à chaque plan, largeur des titres, rien devant un titre, contenu entre y=190 et y≈1330). L'image doit correspondre aux mots réellement prononcés à ce moment-là.
5. Efface d'abord les anciennes images de `build/planche/` (des plans ont été supprimés). Si d'autres agents rendent en même temps, n'utilise pas `render all` (il plante par manque de mémoire) : rends scène par scène (`render.js <dossier> scene <n>`), puis `render.js <dossier> concat`, et vérifie le nombre d'images. `node studio/render.js <dossier> sheet`, regarde les planches du début et de la fin (et vérifie d'un coup d'œil que le corps est intact), corrige, recommence. Puis `node studio/render.js <dossier> all`, puis `python3 studio/audio.py <dossier> <version demandée>` (ne jamais écraser une version existante), puis `python3 studio/controle_structure.py <dossier>` qui doit répondre « OK ». Copie les planches dans `livraison/` sous le nom `<n°>-<version>-planche-N.jpg`.
6. Rapport : pour chaque vidéo, le chemin du mp4, la durée, la sortie de `audio.py`, la sortie de `controle_structure.py`, la liste des plans supprimés, créés ou recalés, et tout ce qui te paraît douteux (par exemple un raccord de voix à écouter).

## Interdits
- Aucun plan de moins de 0,8 s hors accroche ; aucun objet de la couleur de son fond ; une fin en boucle ne répète pas les mots de l'accroche.
- Ne jamais insérer ou couper un silence d'après les seules heures de mots : utiliser les outils du studio, qui cherchent le vrai silence.
- N'écrire que dans ton dossier. Aucun git. N'envoie rien à l'utilisateur. N'arrête aucun processus qui n'est pas le tien.
- Ne jamais dire ni écrire « caddie » (marque déposée) : « chariot ».

## Rapport
Court, texte brut : chemin du mp4, durée, mesures audio, script final, sources (URL), points non vérifiés et écarts, problèmes, et ce qui n'est pas terminé.

## Règles ajoutées le 23/11/2026 (retours du propriétaire)
- Aucun plan de moins de 0,8 s : le moteur les fusionne ou les retire tout seul, mais un plan retiré est un plan perdu. Écrire donc dès le départ des plans d'au moins 0,8 s et vérifier sur la planche qu'aucune image prévue ne manque.
- Quand une phrase tient sur deux plans, garder le même objet à l'écran et ne changer qu'un élément. Jamais de plan fait seulement de texte de liaison (« POURTANT… », « ? ? »).
- Un raccord de voix se fait toujours avec `studio/montage_voix.py` (coupe dans le silence mesuré).

## Animation différente toutes les 1,5 s (consigne du propriétaire, 23/11/2026)
- Jamais plus de 1,5 s sans une animation nouvelle, et jamais deux fois la même de suite.
- Dans `plans.js` : prévoir pour chaque plan de plus de 1,5 s une phase interne (objet qui entre sur un mot `w:`, déplacement `m:`, compteur, tracé), et varier les entrées d'un plan à l'autre (`pop`, `up`, `down`, `left`, `right`, `drop`, `stamp`, `spin`).
- Le moteur (`studio/engine.js`) complète tout seul : l'entrée de caméra change à chaque plan (six mouvements qui tournent) et tout trou de plus de 1,5 s reçoit une relance de caméra (cinq mouvements qui tournent). Contrôle : `node studio/render.js <dossier> meta` puis lire `relances` dans `build/meta.json` ; beaucoup de relances = plans trop pauvres, à enrichir à la main.
- Ces mouvements sont muets : on peut refilmer l'image sans refaire le son.
- Ne corriger que les vidéos désignées par le propriétaire, et lui envoyer le mp4 après chaque correction.
- Aucun visuel éclair : chaque titre ou objet reste au moins 1 s à l'écran, chaque plan dure au moins 1 s. Ne jamais faire entrer un élément sur un mot situé à moins d'une seconde de la fin du plan. Contrôle : `brefs` dans `build/meta.json` doit être vide ou presque.
