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
