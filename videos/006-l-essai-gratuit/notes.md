# Notes — vidéo 006 (L'essai gratuit)

- Univers abonnements, hook A, structure 5 (côté vendeur), fin en question. Tonalité musique : key -1.
- L'expérience du journal est un document de travail (pas encore publié en revue) : le script dit « à peu près la moitié » et « presque personne », sans pourcentage.
- La même étude montre aussi que le renouvellement automatique fait fuir une partie des clients au départ et n'est pas plus rentable sur un an : non dit dans la vidéo (hors sujet du piège), mais le script n'affirme pas le contraire.
- « Double à peu près les revenus » : formulation de la version publiée de la seconde étude (moyenne, à nombre d'abonnés de départ fixé) ; présenté comme « d'après ses auteurs ».
- Les chercheurs ne sont pas nommés (personnes vivantes), aucune marque de service d'abonnement.
- La loi française sur la résiliation en ligne n'est pas évoquée (non vérifiée).

## Fabrication de la v1
- Voix : Adrien Clairon (eleven_v4), deux prises (2 660 crédits). Prise retenue : la plus longue (74,7 s), choisie sans écoute ; l'autre est dans `audio/voix-brute-prise2.mp3`.
- Voix ralentie de 4 % (tempo 0,96), silences de plus de 0,6 s raccourcis : durée finale 78,3 s.
- La transcription a entendu « désabonner » pour « des abonnés » (homophones) : jeton scindé à la main dans `audio/mots-bruts.json`. Elle a aussi écrit « ses abonnés » / « ces auteurs » (homophones, sans effet).
- 63 plans, 1,24 s en moyenne. « 7 JOURS » à l'écran (durée d'essai) est un exemple illustratif, comme l'étiquette « 9,99 € ».
- Objets propres à la vidéo définis en tête de `plans.js` : bouton, téléphone, journal, carte bancaire.
- Mesures : −13,0 LUFS, musique 21 dB sous la voix, bruitages 5 dB sous la voix, 123 bruitages. Son non écouté.

## Retouche v2 (structure recalée)
- Voix remontée par le chef d'orchestre (phrase raccourcie : « Mets-toi à la place du créateur de l'appli. »), 75,9 s.
- Plans : 4 plans de l'ancienne phrase (POUR COMPRENDRE, 1 MINUTE, À SA PLACE, L'APPLI) remplacés par 2 (À SA PLACE au mot 17, L'APPLI au mot 22). Corps et fin inchangés (fonds d'origine gardés). 61 plans.
- `remap_plans.py` avait aussi décalé des largeurs d'objets (« w: N » pris pour un indice de mot) : rétablies d'après `plans-avant.js`.
- Son non écouté ; le raccord de voix du montage est à écouter.
