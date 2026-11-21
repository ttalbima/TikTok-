# Cahier des charges — série vidéo « Les pièges des prix »

## OBJECTIF
Produire en autonomie des vidéos verticales (TikTok, Reels, Shorts) animées en 2D, sur une niche unique : **les pièges des prix**, c'est-à-dire les astuces de prix et de magasin qui font dépenser plus sans qu'on le remarque. Public : consommateurs français.

Test de niche, obligatoire pour chaque sujet (les trois à la fois) :
1. Le spectateur l'a vécu cette semaine : supermarché, restaurant, appli, abonnement, achat en ligne.
2. Un mécanisme psychologique précis l'explique, appuyé par au moins une étude publiée.
3. Le hook s'écrit « Pourquoi tu… » et parle de son propre comportement.
Sont hors niche : l'histoire économique, la macroéconomie, les pays étrangers, la bourse, les cryptos.
La liste des sujets à venir est dans `sujets.md`. La vidéo 002 (hyperinflation hongroise) est hors niche : ne pas en refaire de ce type.
Deux étapes : 1) écrire le script, 2) fabriquer la vidéo à partir du script et de la voix off.
Travail en solo : si une info manque, prendre l'option par défaut, la noter dans `notes.md` et continuer.

Règles de fond, sans exception :
- Aucune marque, aucune personne vivante, aucun logo, visuel officiel ou visage réel.
- Aucun conseil d'investissement : on explique des mécanismes, on ne recommande rien.
- Tout est original : visuels, musique, bruitages, texte.

## 1. SCRIPT
- Durée : **entre 75 s et 90 s (1 min 15 à 1 min 30) pour toutes les vidéos**. Débit : 2,5 mots/s, soit 188 à 225 mots. Ne jamais descendre sous 75 s ni dépasser 90 s.
- Vérifier tous les faits sur le web. Ne jamais inventer de date, de chiffre ou de citation. Une légende est présentée comme telle.
- Format unique de la série : « Pourquoi tu… ». La formule ouvre toujours le hook.
- Exemples, prix et situations en euros et dans un décor français (supermarché, boulangerie, restaurant, appli).
- Structure en 4 blocs :
  - Hook (0-3 s) : une phrase courte qui pose une tension. Pas d'intro.
  - Retainer (3-8 s) : une question dont la réponse n'arrive qu'à la fin, ou l'annonce d'un retournement.
  - Body : situation, bascule, conséquence. Phrases courtes, un fait concret toutes les 2-3 s, la révélation la plus forte à la fin.
  - CTA (une seule action) OU boucle (la dernière phrase se raccorde au début du hook), sur les 3-5 dernières s.
- Livrer uniquement le texte, en 4 blocs minutés.
- Ton : conteur, vif, complice, tutoiement, pas de superlatifs creux.

## 2. VIDÉO
- 1080×1920, 30 i/s, durée = durée de la voix.
- Rendu en code : HTML/SVG (2D uniquement tant que la référence n'est pas validée). Filmé image par image, encodé scène par scène pour pouvoir refaire une seule scène.
- Minutage mot à mot de la voix off (ex. faster-whisper) : tout se cale dessus.
- RYTHME : un nouveau plan toutes les 1,3 s en moyenne, jamais plus de 1,5 s sans changement visuel.
  Pourquoi : chaque changement relance l'attention ; une image figée fait swiper.
  Chaque plan démarre au début d'un mot. Si une idée dure plus longtemps, ajouter une phase interne (compteur, objet qui entre, mouvement de caméra) plutôt que couper.
- Illustrer chaque phrase par une image concrète. Les mots chocs arrivent en gros titres.
- CHARTE GRAPHIQUE (fixe pour toute la série) :
  - Style : papier découpé 2D — aplats, ombres portées dures, léger grain.
  - Palette (le fond change de couleur à chaque plan) : vert billet `#0E3B2E`, bleu nuit `#14213D`, crème `#F4EBD9`, jaune or `#FFC83D`, corail `#FF5A4E`.
  - Polices : Anton (gros titres), Inter ExtraBold (sous-titres). Repli si Anton indisponible : Inter Display Black.
  - Personnages : silhouettes sans visage, formes géométriques.
  - Objets récurrents : pièces, billets, étiquettes de prix, courbes, tirelires, caddies génériques.
- Mouvement : zoom léger ou mouvement de caméra à l'entrée de chaque plan, rebonds, transition rapide entre les grandes scènes.
- Zones sûres : rien d'important au-dessus de y=190 ni en dessous de y=1400. Sous-titres vers y=1425, en capitales, 2-4 mots à la fois, mot prononcé surligné, toujours en 2D par-dessus l'image.
- Planche de contrôle (une image par plan) avant le rendu complet.

## 3. SON (voix > bruitages > musique)
- Voix : générée avec ElevenLabs (voix française masculine posée, la même pour toute la série), sauf si un fichier de voix est fourni. Coupe des graves sous 70 Hz, compression légère. C'est la référence de niveau.
- Bruitages faits en code, uniquement sur une action visible, jamais en remplissage. Pointes 5 dB sous la voix.
- Musique composée en code (libre de droits) : électro minimale, environ 100 BPM, basse ronde, notes pincées, percussions sèches ; mineur pendant la tension, résolution à la révélation. Elle suit l'ambiance des scènes et place un accent sur chaque mot-clé.
  Niveau : environ 21 dB sous la voix, mesuré entre 300 et 5000 Hz (réglé à l'écoute sur la vidéo 001 : 26 dB inaudible, 16 dB trop fort). Baisse automatique quand la voix parle.
- Sortie : environ −13 LUFS, AAC 224 kb/s.

## 4. LIVRAISON
- Pistes séparées (voix, bruitages, musique, image muette). Versions numérotées v1, v2… sans écraser les précédentes.
- Compte rendu court : le fichier, ce qui a changé, ce qui n'a pas pu être vérifié (le son ne peut pas être écouté).
- Référence de la série : vidéo 001, version v3 (`videos/001-pourquoi-tu-9-99/livraison/001-pourquoi-tu-9-99-v3.mp4`), validée par le propriétaire du compte. Même charte, même rythme, même voix, mêmes niveaux sonores pour toutes les suivantes.

## VALIDATION
- Autonomie complète, du sujet à la vidéo finie (la vidéo 001 est validée).
- Publication : faite manuellement par le propriétaire du compte.
