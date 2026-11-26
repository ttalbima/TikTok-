# Cahier des charges — série vidéo « Les pièges de l'argent »

## OBJECTIF
Produire en autonomie des vidéos verticales (TikTok, Reels, Shorts) animées en 2D, sur une thématique durable : **les pièges de l'argent au quotidien**, c'est-à-dire tout ce qui fait perdre de l'argent sans qu'on le remarque. Public : consommateurs français.
Promesse, identique pour toutes les vidéos : **« tu repères un piège qui te coûte de l'argent »**.

Six piliers, qui tournent :
1. Prix et magasins : astuces de prix, de rayon, de carte, de site marchand (vidéos 001, 003 à 015).
2. Abonnements, contrats et factures : téléphone, box, énergie, assurance, banque, résiliation, petites lignes.
3. Arnaques et manipulations : faux SMS, faux conseillers, faux avis, ventes entre particuliers, techniques de pression.
4. Ton cerveau et l'argent : les biais qui font dépenser (argent trouvé, dépenses invisibles, comparaison aux autres).
5. Les coulisses du marketing : emballages, couleurs, noms de produits, publicité ciblée, influence.
6. Le vrai coût des choses : ce que coûte vraiment un objet ou une habitude sur un an, calcul sourcé.

Test de niche, obligatoire pour chaque sujet (les quatre à la fois) :
1. Un Français l'a vécu ce mois-ci.
2. Une source vérifiable l'explique : étude publiée, texte de loi, chiffre officiel.
3. Le hook parle du spectateur lui-même (« tu »), pas d'un tiers.
4. La vidéo tient la promesse : à la fin, le spectateur sait repérer le piège.
Sont hors niche : la bourse, les cryptos, les placements et tout conseil d'investissement, la macroéconomie, l'histoire économique, l'actualité politique. La vidéo 002 (hyperinflation hongroise), hors niche, a été supprimée le 23/11/2026 à la demande du propriétaire.
La liste des sujets est dans `sujets.md`.
Deux étapes : 1) écrire le script, 2) fabriquer la vidéo à partir du script et de la voix off.
Travail en solo : si une info manque, prendre l'option par défaut, la noter dans `notes.md` et continuer.

Règles de fond, sans exception :
- Aucune marque, aucune personne vivante, aucun logo, visuel officiel ou visage réel.
- Aucun conseil d'investissement : on explique des mécanismes, on ne recommande rien.
- Tout est original : visuels, musique, bruitages, texte.

## 1. SCRIPT
- Durée : **entre 75 s et 90 s (1 min 15 à 1 min 30) pour toutes les vidéos**. Débit : 2,5 mots/s, soit 188 à 225 mots. Ne jamais descendre sous 75 s ni dépasser 90 s.
- Vérifier tous les faits sur le web. Ne jamais inventer de date, de chiffre ou de citation. Une légende est présentée comme telle.
- La niche et la promesse ne changent jamais ; tout le reste tourne (voir « VARIÉTÉ » ci-dessous).
- Exemples, prix et situations en euros et dans un décor français. Règles et lois : uniquement le droit français ou européen, vérifié, avec sa date.
- Structure en 4 blocs :
  - Hook (0-3 s) : une phrase courte qui pose une tension. Pas d'intro. **8 mots maximum**, avec « tu » (ou un impératif adressé au spectateur), y compris pour la famille D (« Avec une carte, tu paies plus… », pas « on paie plus »).
  - Retainer (3-8 s) : une question dont la réponse n'arrive qu'à la fin, ou l'annonce d'un retournement. **Hook + retainer : 22 mots maximum.**
  - Body : situation, bascule, conséquence. Phrases courtes, un fait concret toutes les 2-3 s, la révélation la plus forte à la fin.
  - CTA (une seule action : un seul verbe d'action, pas « regarde… et compte… ») OU boucle (la dernière phrase se raccorde au début du hook), sur les 3-5 dernières s : **9 à 14 mots**.
  - Une boucle ne répète jamais les mots de l'accroche : la dernière phrase s'arrête juste avant, et c'est le redémarrage de la vidéo qui les dit (pas de « regarde bien ce message » à la fin si la vidéo commence par « Regarde bien ce message »).
  - Repère : la voix parle à environ 2,8 mots par seconde. Contrôle obligatoire après minutage : `python3 studio/controle_structure.py videos/<dossier>` doit répondre « OK ».
- Livrer uniquement le texte, en 4 blocs minutés.
- Ton : conteur, vif, complice, tutoiement, pas de superlatifs creux.

## 2. VIDÉO
- 1080×1920, 30 i/s, durée = durée de la voix.
- Rendu en code : HTML/SVG (2D uniquement tant que la référence n'est pas validée). Filmé image par image, encodé scène par scène pour pouvoir refaire une seule scène.
- Minutage mot à mot de la voix off (ex. faster-whisper) : tout se cale dessus.
- RYTHME : un nouveau plan toutes les 1,3 s en moyenne, jamais plus de 1,5 s sans changement visuel. **Une animation différente toutes les 1,5 s au plus, jamais deux fois la même de suite** (consigne du propriétaire, 23/11/2026).
  Pourquoi : chaque changement relance l'attention ; une image figée fait swiper.
  Chaque plan démarre au début d'un mot. Si une idée dure plus longtemps, ajouter une phase interne (compteur, objet qui entre, mouvement de caméra) plutôt que couper.
- Illustrer chaque phrase par une image concrète. Les mots chocs arrivent en gros titres.
- Aucun plan de moins de 1 s, et chaque titre ou objet reste au moins 1 s à l'écran avant le changement de plan (le moteur l'impose) : un visuel qui passe trop vite ne se lit pas. Un objet a toujours une couleur différente de son fond (jamais corail sur corail, jaune sur jaune…).
- **CHARTE VALIDÉE LE 26/11/2026 (style 2, `V.style = 2` dans plans.js), pour toutes les nouvelles vidéos** : palette indigo `#2A1E8C`, violet électrique `#5B3BF5`, turquoise `#00A88A`, lilas `#E2D9FF`, blanc froid `#F7F5FF`, rose vif `#FF4F7B`, accent citron vert `#C8F560` ; fonds en dégradé avec halo ; ombres douces ; titres qui entrent mot par mot ; transitions poussées ou en cercle ; pas de fond noir ni jaune. Référence : 001 v10. L'ancienne charte ci-dessous ne vaut plus que pour les vidéos déjà faites.
- ANCIENNE CHARTE GRAPHIQUE (vidéos 003 à 015 tant qu'elles ne sont pas refaites) :
  - Style : papier découpé 2D — aplats, ombres portées dures, léger grain.
  - Palette (le fond change de couleur à chaque plan) : vert billet `#0E3B2E`, bleu nuit `#14213D`, crème `#F4EBD9`, jaune or `#FFC83D`, corail `#FF5A4E`.
  - Polices : Anton (gros titres), Inter ExtraBold (sous-titres). Repli si Anton indisponible : Inter Display Black.
  - Personnages : silhouettes sans visage, formes géométriques.
  - Objets récurrents : pièces, billets, étiquettes de prix, courbes, tirelires, chariots de courses génériques (ne jamais dire ni écrire « caddie », marque déposée).
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

## VARIÉTÉ (même niche, jamais la même vidéo)
Constant : la thématique, la promesse (« tu repères un piège qui te coûte de l'argent »), la charte, la voix, la durée.
Variable : cinq éléments tournent. **Deux vidéos qui se suivent ne partagent ni le même univers, ni la même structure, ni la même famille de hook.**
- Pilier : deux vidéos qui se suivent ne viennent pas du même pilier, et aucun pilier ne revient plus de deux fois sur cinq vidéos.
- Univers : supermarché · restaurant et café · achat en ligne · abonnements et applis · vêtements et soldes · cinéma et loisirs · banque et factures · téléphone et messages.
- Famille de hook :
  - A. « Pourquoi tu… » (ton comportement)
  - B. « Regarde bien ce prix… » (un objet ou une étiquette qu'on décortique)
  - C. « Tu crois choisir… » (l'illusion de choix)
  - D. Le résultat surprenant d'une étude, annoncé d'entrée
- Structure du récit :
  1. Démonstration : le mécanisme, puis l'étude (vidéo 001).
  2. Parcours : on suit un client de l'entrée à la caisse.
  3. Test : deux options à l'écran, le spectateur choisit, puis la révélation.
  4. Origine : d'où vient cette pratique.
  5. Côté vendeur : « si tu tenais le magasin, tu ferais quoi ? »
- Fin : boucle · question au spectateur · défi (« la prochaine fois, regarde… »).
- Image et son : objet vedette différent, ouverture différente (gros titre, objet ou personnage), tonalité de la musique décalée d'une vidéo à l'autre (`key` dans `son.json`).
Le choix fait pour chaque vidéo est noté dans `sujets.md`.

## OBJECTIF À TERME ET PRIORITÉS DU PROPRIÉTAIRE
- But final : proposer une offre payante à l'audience, **plus tard**, une fois la communauté installée. D'ici là : aucune vente, aucun lien commercial, aucun appel à acheter dans les vidéos ni les descriptions.
- Le propriétaire a peu de temps : tout ce qui est livré doit être prêt à l'emploi (fichier, description, hashtags), et la même vidéo sert sur TikTok, Instagram et YouTube Shorts.
- État au 23/11/2026 (décision du propriétaire) : les vidéos 001 et 003 à 015 utilisent le **fichier ElevenLabs brut, sans aucun réglage** (`"brut": true` dans `voix.json` : ni ralenti, ni filtre, ni découpage, ni remontage). Ne plus retoucher ni régénérer ces voix. Conséquence acceptée : certaines vidéos durent moins de 75 s (de 69 à 78 s) et le contrôle de structure ne s'applique pas à elles. Versions : 001 v10 (refaite le 26/11/2026 et validée par le propriétaire : script, voix avec émotions à ne plus toucher, style visuel 2) ; 004 et 009 v6 ; 010 v5 ; 014 v3 ; les autres v4. Ne corriger que les vidéos que le propriétaire désigne, et lui envoyer le mp4 après chaque correction. La 001 v10 est la nouvelle référence de la série.
- Documents de lancement : `guide-comptes.md`, `comptes/descriptions.md`, `comptes/banniere-youtube.png`, `comptes/photo-de-profil.png` (logo typographique choisi par le propriétaire : texte seul « PIÈGES DE L'ARGENT », indigo sur fond blanc froid, bandeau rose vif, aux couleurs de la nouvelle charte ; les anciennes versions sont gardées en `-ancienne.png` ; il trouve le noir trop sombre et le jaune trop agressif en fond ; il a refusé les logos à illustration : étiquette, hameçon, tapette à souris).

## CROISSANCE
- Rythme décidé par le propriétaire : **2 vidéos par jour dès le lancement** (vers 12 h et 19 h), même vidéo sur les trois réseaux. Objectif de fabrication : 14 vidéos par semaine, et toujours au moins une semaine d'avance en stock.
- Stratégie par réseau : `strategie-lancement.md`. Agent dédié : `.claude/agents/croissance.md` (plan de publication, emballage par réseau, analyse des chiffres, veille datée sur les trois réseaux). Journal : `croissance/journal.md`.

## ORCHESTRATION DES AGENTS
La session principale est le **chef d'orchestre** (rôle confié par le propriétaire) : elle choisit quel agent lancer, avec quelle commande, dans quel ordre, et adapte leurs instructions quand une leçon est apprise (elle met alors à jour les fichiers `.claude/agents/*.md` et `notes.md`).
- `fabrication` : fabrique une vidéo, d'un sujet validé au fichier livré.
- `verification` : contrôle indépendant du script (avant la voix) puis de la vidéo finie.
- `croissance` : plan de publication, emballage par réseau, analyse des chiffres, veille.
Chaîne de travail pour chaque vidéo :
1. Le chef d'orchestre propose des sujets ; **le propriétaire valide** (rien ne démarre avant).
2. `fabrication` écrit le script et les sources, puis s'arrête.
3. `verification` contrôle le script ; le chef d'orchestre fait corriger si besoin.
4. `fabrication` reprend : voix, plans, son, livraison.
5. `verification` contrôle la vidéo ; corrections en v2 si besoin.
6. `croissance` prépare la publication.
Pas plus de 3 agents en même temps (limite d'utilisation du compte Claude).
Passages de relais (qui écrit quoi) :
- `verification` écrit son verdict dans `videos/<dossier>/controle.md` ; une vidéo « À refaire » n'est ni terminée ni programmée.
- `croissance` écrit le plan dans `croissance/semaine-AAAA-MM-JJ.md`, alerte quand il reste moins de 7 jours de stock, et propose des sujets dans `sujets.md` (section « à valider ») : c'est le chef d'orchestre qui les présente au propriétaire.
- Les défauts trouvés par `verification` qui reviennent deviennent une règle dans `notes.md` et dans l'agent `fabrication`.

## VALIDATION
- **Depuis le 26/11/2026 : le propriétaire valide chaque SCRIPT avant tout démarrage** (ni voix, ni image avant son accord). Le script lui est envoyé dans la discussion.
- Le script porte des indications d'émotion entre crochets pour la voix ElevenLabs (`[curious]`, `[excited]`…), non prononcées.
- Visuels : modernes et toujours dynamiques, jamais « vieillots ». On peut tester des modèles et bibliothèques d'animation existants (GSAP, Remotion, collections de skills d'animation pour Claude) avant de fabriquer.
- **Aucun sujet n'est lancé sans la validation explicite du propriétaire.** Une fois le sujet validé, la fabrication est autonome jusqu'à la vidéo finie.
- Publication : faite manuellement par le propriétaire du compte.
