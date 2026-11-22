---
name: fabrication
description: Fabrique UNE vidéo de la série « Les pièges de l'argent » à partir d'un sujet déjà validé par le propriétaire : recherche, script, voix ElevenLabs, minutage, plans animés, son, livraison dans son dossier. Lancé uniquement par la session principale (le chef d'orchestre), jamais sur un sujet non validé.
---

Tu fabriques une seule vidéo, dans un seul dossier `videos/<n°>-<nom>/`. Le cahier des charges `CLAUDE.md` fait foi : lis-le en entier avant de commencer, ainsi que `notes.md` (leçons des vidéos précédentes) et le dossier d'une vidéo terminée comme modèle (par exemple `videos/015-la-carte-sans-le-signe-euro/` : script.md, sources.md, notes.md, voix.json, plans.js, son.json).

## Étapes
1. **Recherche** sur le web : au moins une source vérifiable (étude publiée, texte de loi daté, chiffre officiel). Aucun chiffre, date ou citation non confirmé. Aucune marque, aucune personne vivante nommée.
2. **Script** (`script.md`) : 4 blocs minutés, 215 à 225 mots prononcés (nombres comptés en toutes lettres), format imposé par la commande (pilier, univers, famille de hook, structure, fin). `sources.md` et `notes.md` (points non vérifiés, choix par défaut).
3. **Arrêt de contrôle** : écris `script.md` et `sources.md`, puis rends la main au chef d'orchestre avec le script et les sources, sauf si la commande dit explicitement de continuer. Le chef d'orchestre les fait vérifier avant la voix, qui coûte des crédits.
4. **Voix** : un seul appel `creative_generate_speech` (voice_id `c365oriviHmAhyLhpuN6`, modèle `eleven_v4`, nombres en toutes lettres), jamais de relance. Prise la plus longue dans `audio/voix-brute.mp3`, l'autre dans `audio/voix-brute-prise2.mp3`.
5. **Minutage** : `HF_HUB_DISABLE_XET=1 python3 studio/align.py`, puis `voix.json` (display, tempo, max_silence 0.6, starts pour corriger un mot mal placé) et `python3 studio/prep_voice.py`. Durée finale 75 à 90 s ; voix ralentie de 5 % au maximum, sinon allonger les respirations.
6. **Plans** (`plans.js`) : environ 60 plans calés sur les indices de mots, 1,3 s en moyenne, jamais plus de 1,5 s sans changement visuel, fond différent à chaque plan, contenu entre y=190 et y≈1330. Largeur d'un titre = caractères × taille × 0,47, sous 980 px. Aucun objet devant un titre. Objets nouveaux définis en tête de ton `plans.js`, jamais dans `studio/`.
7. **Planche** : `node studio/render.js <dossier> sheet`, regarde chaque planche, corrige, recommence. Puis `render all`, `son.json` (reveal_word, music_db -21, key imposée), `python3 studio/audio.py <dossier> v1`. Copie les planches dans `livraison/`.

## Interdits
- N'écrire que dans ton dossier. Aucun git. N'envoie rien à l'utilisateur. N'arrête aucun processus qui n'est pas le tien.
- Ne jamais dire ni écrire « caddie » (marque déposée) : « chariot ».

## Rapport
Court, texte brut : chemin du mp4, durée, mesures audio, script final, sources (URL), points non vérifiés et écarts, problèmes, et ce qui n'est pas terminé.
