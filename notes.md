# Notes — options par défaut et points non vérifiés

## Vidéo 001 — Pourquoi tu trouves que 9,99 €…
- Sujet choisi sans recherche de tendances payante (aucun crédit vidIQ dépensé).
- Les prix exacts de l'expérience de 2003 ne sont pas cités : les sources secondaires divergent
  (34/39/44 $ ou 44/49/54 $) et l'article original n'a pas pu être lu en entier. Le script dit
  seulement « trois prix, celui du milieu finit par 9 », ce qui est vrai dans les deux versions.
- Les exemples 3,60/3,59 et 4,00/3,99 illustrent la règle de l'étude de 2005 ; ce ne sont pas
  les chiffres de l'étude.
- Les chercheurs ne sont pas nommés à l'écran ni à l'oral (règle « aucune personne vivante »).
- L'ampleur de l'effet est discutée : une étude de 2022 (PLOS ONE) ne l'a pas reproduit en ligne.
  Le script reste donc sur les deux études publiées, sans généraliser.
- L'origine « caisse enregistreuse » n'a aucune preuve d'archive : présentée comme légende.

### Fabrication de la v1 (vidéo 001)
- Voix : ElevenLabs, voix « Adrien Clairon » (id c365oriviHmAhyLhpuN6), modèle eleven_v4. Une seule prise :
  la seconde a échoué faute de crédits (quota de 10 000 atteint, 564 crédits restants après la prise).
  Une vidéo coûte environ 1 340 crédits : la prochaine voix attendra le renouvellement du quota.
- La prise durait 72,2 s, sous le minimum de 75 s. Elle a été ralentie de 4,5 % et les six respirations
  entre paragraphes allongées de 0,25 s : durée finale 77,6 s. Réglages dans `voix.json`.
- Minutage mot à mot : faster-whisper (modèle medium), recalé sur le texte du script.
- Police Anton installée depuis le paquet @fontsource/anton (licence OFL), Inter pour les sous-titres.
- Nuances ajoutées à la palette pour les objets seulement (vert clair, or foncé, crème foncé, corail foncé, bleu moyen).
- Les prix de l'expérience de 2003 étant incertains, les trois étiquettes affichent « - CHER », « …9 », « + CHER ».
  Dans le graphique, les deux prix extrêmes ont des ventes proches et le prix en 9 domine : c'est le sens du
  résultat publié, pas ses chiffres.
- Son non écouté (impossible ici). Mesures : −13,0 LUFS, musique 26 dB sous la voix (300–5000 Hz),
  pointes des bruitages 5 dB sous la voix. 98 bruitages, tous liés à une action visible.
- Environnement cloud « tiktok » créé pour autoriser le téléchargement de la voix et du modèle de minutage.

## Refaire une vidéo
1. `python3 studio/align.py <vidéo>/audio/voix-brute.mp3 <vidéo>/audio/mots-bruts.json` (avec HF_HUB_DISABLE_XET=1)
2. `python3 studio/prep_voice.py <vidéo>` → `audio/voix.wav`, `mots.json`
3. `node studio/render.js <vidéo> sheet` → planche de contrôle ; `scene <n>` pour refaire une scène ; `all` pour tout
4. `python3 studio/audio.py <vidéo> v1` → `livraison/`

### v2 (vidéo 001)
- Musique remontée de 10 dB (16 dB sous la voix au lieu de 26) : elle était inaudible en v1. Image, voix et bruitages inchangés ; l'image muette de la v1 reste valable.

### v3 (vidéo 001)
- Musique baissée de 5 dB par rapport à la v2 (21 dB sous la voix). Image, voix et bruitages inchangés.

## Vidéo 002 — Le jour où un pays a imprimé un billet de cent trillions
- Sujet choisi sans recherche de tendances payante. Format « Le jour où… », fin en boucle.
- « Environ toutes les quinze heures » : les sources donnent 15 h, 15,6 h ou 16 h (une seule dit 11 h).
- « Le triple le lendemain » et « perdre les deux tiers en une nuit » sont calculés à partir de l'inflation quotidienne de 207 %.
- « L'un des pires records d'inflation de l'histoire » plutôt que « le record » : une étude de 2022 le conteste, et la source du record porte un nom de marque, non cité.
- Le taux de conversion du forint (4 × 10^29) est dit « un nombre à trente chiffres », sans le prononcer.
- « La guerre vient de finir, le pays est ruiné, l'État imprime des billets » : contexte général, non chiffré.
### Fabrication de la v1 (vidéo 002)
- Voix : même voix que la vidéo 001 (Adrien Clairon, eleven_v4), deux prises générées après recharge du compte.
  Prise 1 retenue (74,3 s, la plus longue) ; la prise 2 est conservée dans `audio/voix-brute-prise2.mp3`. Choix fait sans écoute.
- Voix ralentie de 2 % et silences de plus de 0,6 s raccourcis : durée finale 76,1 s.
- « pengős » écrit « pengueus » pour la synthèse ; la prononciation n'a pas pu être vérifiée à l'oreille.
- La transcription plaçait « 1946 » une seconde trop tard : `prep_voice.py` recale désormais les débuts de mots sur les
  reprises de voix mesurées, et un début a été corrigé à la main (`starts` dans `voix.json`).
- Les plans de la vidéo ont été dessinés avant la voix, sur un minutage provisoire, puis recalés sur la vraie voix.
- Mesures : −13,1 LUFS, musique 21 dB sous la voix, pointes des bruitages 5 dB sous la voix, 111 bruitages. Son non écouté.

## Recentrage de la niche (après la vidéo 002)
- Retour du propriétaire : la vidéo 001 plaît plus que la 002, jugée peu intéressante pour le public français. Demande : une niche très serrée où celui qui aime une vidéo aime toutes les autres.
- Décision : niche unique « Les pièges des prix », format unique « Pourquoi tu… », décor français. Les formats « Le jour où… » et « Le vrai prix de… » sont abandonnés.
- La vidéo 002 est conservée mais hors niche. Les sujets à venir sont dans `sujets.md`, le guide de création des comptes dans `guide-comptes.md`.

## Règle de variété (demande du propriétaire)
- Les vidéos ne doivent pas se répéter. Niche et promesse fixes ; univers, famille de hook, structure, fin, objet vedette et tonalité de la musique tournent. Le format unique « Pourquoi tu… » est remplacé par quatre familles de hook.

## Marque à éviter
- « Caddie » est une marque déposée en France (signalé pendant la fabrication de la vidéo 005) : on dit et on écrit « chariot ». Le dossier de la vidéo 005 garde son nom d'origine.

## Lot des vidéos 003 à 015
- Fabriquées en parallèle par des agents, une par dossier ; chaque dossier contient son `script.md`, `sources.md` et `notes.md` (points non vérifiés, écarts).
- Les objets propres à une vidéo sont définis en tête de son `plans.js`, pas dans `studio/objets.js`.
- Les vidéos 011 à 014 ont été interrompues par une limite d'utilisation du compte Claude, puis terminées (rendu, son, contrôle) dans la session principale.
- Plusieurs scripts dépassent légèrement 225 mots (jusqu'à 239 pour la 004) : la voix parle plus vite que 2,5 mots/s, et la durée reste entre 75 et 90 s.
- Vidéo 010 : voix ralentie de 6 % et respirations allongées, les deux prises étant courtes (68 s). À réécouter en priorité.
- Aucune des treize n'a été écoutée ; les prises de voix ont été choisies à la durée.

## Élargissement de la thématique (22/11/2026)
- Le propriétaire refuse une niche qui s'épuise en quelques mois. Thématique élargie : « Les pièges de l'argent au quotidien », six piliers, même promesse, même charte. Les vidéos 001 et 003 à 015 restent valables (pilier 1).
- Nom de compte recommandé : piegesdelargent (aucun profil public trouvé sur TikTok ni Instagram le 22/11/2026).

## Rôle de chef d'orchestre (22/11/2026)
- Le propriétaire demande qu'aucun sujet ne démarre sans sa validation, et confie à la session principale la coordination des agents (connexions, adaptations). Agents créés : fabrication, verification (en plus de croissance). Chaîne de travail dans CLAUDE.md.
- Les fabrications 016 à 018 ont été arrêtées par le propriétaire après la voix (crédits ElevenLabs déjà dépensés) : scripts et voix gardés pour reprise après validation.

## Audit de structure des vidéos 001 et 003 à 015 (22/11/2026)
- Résultat de studio/controle_structure.py : aucune ne respecte toute la structure. Hooks de 3,3 à 6,8 s (sauf 010 et 014), retainers qui finissent entre 9,8 et 15,1 s au lieu de 8 s, fins trop longues (004, 007, 010, 011, 013, 014, 015), hooks sans « tu » (005, 009, 012), défis à deux actions (004, 007, 010, 013). Boucles (001, 005, 008, 011, 014) et durées (75-90 s) conformes, variété respectée entre vidéos consécutives.
- Cause : budgets de mots non chiffrés et aucun contrôle automatique. Corrigé : budgets dans CLAUDE.md et dans les agents, contrôle obligatoire.
