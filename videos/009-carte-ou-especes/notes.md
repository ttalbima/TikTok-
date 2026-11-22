# Notes — vidéo 009 (Carte ou espèces)

- Hook famille D, structure « origine », fin en question, tonalité musique +4.
- Aucun montant de l'enchère n'est cité : les chiffres en dollars ne viennent que d'un support de cours, pas de l'article.
  « Plus du double » reprend le résumé donné par les auteurs eux-mêmes.
- Le résumé de l'article précise que l'écart n'est pas toujours présent : le script le dit (« pas toujours aussi énorme »)
  et cite la méta-analyse de 2024 (« réel, mais petit »).
- « 71 études » : la méta-analyse porte sur 71 articles (392 mesures).
- L'équipe du match (une marque) et les chercheurs ne sont pas nommés. Carte dessinée sans logo.
- Le croissant et le deuxième café sont des illustrations, pas des résultats d'étude.
- « Répété à chaque passage en caisse » et « moins tu vois l'argent partir, moins tu le sens » reformulent le mécanisme ;
  aucun classement carte / sans contact / téléphone n'est affirmé (non vérifié).
- Aucun conseil de moyen de paiement.

## Fabrication de la v1
- Voix : Adrien Clairon (eleven_v4), deux prises en un seul appel (2 626 crédits). Prise 1 retenue (75,0 s, la plus longue),
  sans écoute ; prise 2 dans `audio/voix-brute-prise2.mp3`. Ralentie de 3 %, silences de plus de 0,6 s raccourcis : 77,8 s.
- Transcription conforme au script, sauf « dernier rachat » entendu pour « dernier achat » (liaison probable) : à écouter vers 74 s.
- Deux débuts de mots corrigés à la main (`starts` dans `voix.json`) : « ceux » et « Pourquoi ? ».
- 223 mots prononcés, 63 plans (1,23 s en moyenne), 126 bruitages.
- Mesures : −13,0 LUFS, musique 21 dB sous la voix, pointes des bruitages 5 dB sous la voix. Son non écouté.
- Objets propres à la vidéo définis en tête de `plans.js` : carte, portefeuille, terminal, croissant, tasse, ballon, billet d'entrée, éclair, enveloppe.

## Retouche v2 (structure recalée)
- Voix remontée : nouvelle accroche « Avec une carte, tu es prêt à payer plus. », 76,8 s.
- Plans : accroche recalée (carte VS billet au mot 0, PRÊT À PAYER au mot 3, PLUS au mot 8, ×2 au mot 9) ; plan QUE DES BILLETS supprimé, CHER retiré du titre. Suite inchangée. 62 plans.
- `remap_plans.py` avait aussi décalé des largeurs d'objets (« w: N » pris pour un indice de mot) : rétablies d'après `plans-avant.js`.
- Son non écouté ; le raccord de voix du montage est à écouter.
