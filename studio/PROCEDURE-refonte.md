# Refaire une vidéo existante dans la nouvelle charte (procédure du 26/11/2026)

Cas visé : la vidéo existe déjà (plans d'origine dans `plans.js`), le propriétaire a validé un nouveau script
(`script-propose.md`) et les deux prises de la nouvelle voix sont déjà téléchargées. On ne génère AUCUNE voix,
on ne dépense aucun crédit, on ne touche à aucune autre vidéo.

## Étapes

1. **Installer la voix et recaler les plans**
   `python3 studio/nouvelle_voix.py videos/<dossier> file://<prise la plus longue> file://<autre prise>`
   Le script sauvegarde l'état précédent (`plans-prec.js`, `mots-prec.json`…), minute la voix, écrit `voix.json`
   en mode brut, décale les indices de mots de `plans.js` et installe `script.md`. Il affiche :
   la durée, les anciens mots sans équivalent, et la liste « indice:mot@seconde » de la nouvelle voix.
   La voix reste BRUTE : ni ralenti, ni filtre, ni coupe.

2. **Corriger l'affichage des sous-titres** dans `voix.json` (`display`) quand la transcription s'écarte du script
   validé (majuscule du premier mot, « même/mêmes », « ses/ces », pluriels). Ne jamais changer le NOMBRE de mots.
   Puis `python3 studio/prep_voice.py videos/<dossier>`.

3. **Réécrire les plans à la main dans `plans.js`** (le reste du corps est repris tel quel) :
   - poser `V.style = 2;` juste avant `const CYCLE` (ou avant le premier `shot(`) ;
   - **accroche + retainer** : 2 à 4 plans, un objet concret à l'écran dès la première image, le même objet
     reste à l'écran pendant l'accroche (un seul élément change d'un plan à l'autre) ;
   - **phrases ajoutées** par le nouveau script : un plan par phrase, sinon l'image reste figée ;
   - **plans chiffrés** : les nombres changent le découpage des mots (« 31 € » devient « 31 euros ») :
     relire tous les indices `w:` des scènes pleines de prix, et les réécrire s'ils sont décalés ;
   - **boucle** : les deux derniers plans ; le dernier reprend l'objet et la mise en page du tout premier plan,
     avec un titre qui reste en suspens (« … ») ;
   - quand on retire ou ajoute des plans `S(...)`, compenser avec `k += n;` pour que les fonds de la suite ne
     changent pas (le fond suit `CYCLE[k++ % 5]`) ;
   - deux plans ne doivent jamais porter le même indice de mot.

4. **Règles de mise en page** (toutes vérifiées sur la planche)
   - Titre : largeur ≈ nombre de caractères × taille × 0,47, à garder sous 980 px.
   - Rien d'important sous y = 1330. Sur deux lignes de titre, la seconde ne descend pas sous y = 1210
     pour une taille de 120 à 150 (sinon elle touche le sous-titre).
   - Un objet n'a jamais la couleur de son fond ni de l'objet posé dessus (croix sur cornet, etc.).
   - Entrées de titres : `a: 'up'` ou `a: 'down'` (les titres entrent mot par mot en style 2).
   - Aucun plan de moins de 1 s : le moteur les retire. Un plan utile de moins de 1 s doit être fusionné
     avec son voisin à la main.

5. **Contrôler**
   `node studio/render.js videos/<dossier> meta` puis lire `build/meta.json` : `retires` (plans retirés),
   `relances`, `brefs` (objets visibles moins de 0,7 s : viser 0 à 2).
   `find videos/<dossier>/build/planche -name '*.jpg' -delete; node studio/render.js videos/<dossier> sheet`
   puis REGARDER les planches `build/planche-*.jpg` (outil Read) : chevauchements, textes coupés, contrastes,
   plan dont l'image ne correspond pas au sous-titre. Corriger et refaire la planche jusqu'à ce que ce soit propre.

6. **Rendre** (jamais deux rendus en même temps sur la machine)
   `node studio/render.js videos/<dossier> all > videos/<dossier>/build/render.log 2>&1`
   (la dernière ligne doit dire « image-muette.mp4 assemblée » ; sinon relancer une fois)
   `cd videos/<dossier> && python3 ../../studio/audio.py . <nouvelle version>`
   Copier les planches dans `livraison/<n°>-<version>-planche-<i>.jpg`.

7. **Rendre compte** : fichier livré, durée, nombre de plans, ce qui a été réécrit, écarts entre la
   transcription et le script, et ce qui n'a pas pu être vérifié (le son ne peut pas être écouté).
   Ne pas faire de commit.

## Modèles déjà faits à imiter
`videos/004-le-prix-barre/plans.js`, `videos/006-l-essai-gratuit/plans.js`, `videos/008-la-livraison-gratuite/plans.js`
(accroche, phrases ajoutées, boucle, `k += n`).
