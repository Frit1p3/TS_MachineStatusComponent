# Guidelines esthétiques, UX/UI et interfaces industrielles — Portfolio professionnel

## Role du document

Ce document fixe les guidelines visuelles, UX et UI du portfolio et des démonstrateurs industriels qu’il présente. Il sert de référence pour les maquettes Figma, le design system et le développement applicatif. Le portfolio est historiquement orienté Blazor ; les démonstrateurs peuvent utiliser d’autres technologies, notamment TypeScript et Zod.

**Périmètre :** distinguer systématiquement (1) le site portfolio, (2) les démonstrateurs de supervision et (3) les interfaces de contrôle réellement déployées. Une maquette ne constitue ni une IHM certifiée ni une commande machine sûre.

Le portfolio doit etre concu comme une application metier premium : clair, structure, credible, precis, oriente decision et impact operationnel.

## Sources principales

### DOSS

Reference : https://www.doss.com/

Ce que l'on retient :

- Univers B2B operations, ERP, data et automatisation.
- Presentation de produit complexe sous forme claire, modulaire et business-oriented.
- Alternance entre messages courts, preuves, chiffres et modules fonctionnels.
- Importance accordee aux resultats : temps gagne, vitesse, precision, operations simplifiees.
- Vocabulaire visuel proche des plateformes SaaS metier premium.

A adapter pour le portfolio :

- Utiliser une logique de plateforme professionnelle plutot qu'une page personnelle decorative.
- Montrer les competences comme des modules de valeur : UI, UX, data, Blazor, design system, industrie.
- Mettre les impacts metier au premier plan dans les etudes de cas.
- Construire des sections qui ressemblent a des surfaces d'application, pas a des blocs marketing generiques.

### Linkup ST Design

Reference : https://linkupst.com/design

Ce que l'on retient :

- Direction artistique premium, editoriale et tres maitrisee.
- Association entre emotion, precision fonctionnelle et performance business.
- Usage fort de la hierarchie, des sequences numerotees et du rythme vertical.
- UX presentee comme un levier mesurable : activation, friction, orientation, clarte, decision.
- Importance de la clarte perceptive, de la memoire spatiale et de la reduction de friction.

A adapter pour le portfolio :

- Donner une dimension plus sensible et design au profil, sans perdre le serieux industriel.
- Structurer les contenus en sequences numerotees lorsque cela aide la comprehension.
- Relier chaque choix UX a un effet attendu : comprehension, adoption, rapidite, reduction d'erreurs.
- Traiter le portfolio comme une demonstration de pensee design, pas seulement comme une liste de projets.

## Positionnement visuel

Le design doit evoquer :

- Industrie.
- Aeronautique.
- Supervision.
- Dashboards.
- Design System.
- ERP et applications B2B.
- Precision technique.
- Performance operationnelle.

Le rendu doit etre premium, calme et maitrise. Il ne doit pas devenir futuriste, gaming, trop sombre ou artificiellement spectaculaire.

## Mots-cles de direction artistique

- Precise.
- Structure.
- Modulaire.
- Operationnel.
- Lisible.
- Premium.
- Technique.
- Sobre.
- Data-driven.
- Confiant.

## Principes UI fondamentaux

### 1. Interface avant vitrine

Chaque section doit pouvoir etre lue comme une interface utile. Les blocs doivent presenter des informations, des decisions, des indicateurs ou des preuves.

A eviter :

- Hero decoratif sans information concrete.
- Grands effets visuels sans fonction.
- Cartes trop marketing ou trop emotionnelles.
- Sections uniquement narratives sans preuve.

### 2. Hierarchie forte

L'utilisateur doit comprendre immediatement :

- Qui est Merryl.
- Quelle est sa specialisation.
- Quelle valeur il apporte.
- Quelles preuves soutiennent cette valeur.
- Comment le contacter.

La hierarchie doit guider l'oeil avec des tailles, espacements, contrastes et groupements coherents.

### 3. Clarte perceptive

Les elements importants doivent etre identifiables sans effort. La page doit privilegier les contrastes utiles, les alignements nets, les groupes visuels clairs et les composants previsibles.

### 4. Reduction de friction

La navigation, les filtres, les cartes projets et les etudes de cas doivent etre simples a comprendre. Le portfolio doit donner une impression de competence et de calme, pas de complexite gratuite.

### 5. Impact mesurable

Les realisations doivent etre presentees avec des resultats : gain de temps, reduction d'erreurs, meilleure adoption, meilleure lisibilite, fluidification de processus, fiabilisation de donnees.

## Palette couleur

### Base

- Blanc casse : fond principal chaud et professionnel.
- Gris tres clair : surfaces secondaires et separations douces.
- Gris moyen : textes secondaires, metadonnees, bordures.
- Gris anthracite : texte principal.

### Couleurs structurantes

- Bleu profond : confiance, architecture, technologie, navigation, titres forts.
- Cyan technique : accent fonctionnel, liens, focus, data highlight, elements actifs.

### Couleurs d'etat

- Vert : succès ou validation, uniquement lorsque le sens est explicite.
- Orange / ambre : avertissement ou dépassement de seuil, selon le référentiel d’alarmes.
- Rouge : défaut ou alarme critique, jamais simple accent décoratif.
- Bleu clair : information neutre ou action, sans confusion avec un état machine.
- Gris : information neutre ou état non mis en évidence ; ne jamais assimiler automatiquement gris à « machine arrêtée ».

### Regles d'usage

- Le bleu profond structure l'identite, mais ne doit pas saturer l'interface.
- Le cyan doit rester un accent precis, jamais une couleur de remplissage massive.
- Les couleurs d'etat doivent etre reservees aux informations fonctionnelles.
- Les fonds du portfolio doivent rester majoritairement clairs pour conserver une sensation d'espace, de lisibilite et de maitrise. Les démonstrateurs HMI peuvent disposer d’un thème clair et d’un thème sombre, validés selon le contexte lumineux.
- Aucun degrade dominant violet, bleu-violet ou purement decoratif.

## Typographies

### Familles recommandees

- Inter : interface, texte courant, navigation, formulaires.
- IBM Plex Sans : alternative pour un rendu plus technique et industriel.
- Space Grotesk : titres, chiffres, accents editoriaux, modules KPI.

### Regles typographiques

- Titres courts, nets, orientes valeur.
- Paragraphes courts pour faciliter le scan.
- Labels et metadonnees tres lisibles.
- Chiffres et KPI traites avec soin : taille, alignement, contexte.
- Pas de letter-spacing negatif.
- Pas de taille de police basee directement sur la largeur du viewport.

## Grille et layout

### Desktop

- Layout centre avec largeur maximale controlee.
- Grille 12 colonnes pour les sections complexes.
- Sections verticales bien separees.
- Alignements nets et repetables.
- Espace blanc genereux, mais jamais vide de sens.

### Mobile

- Grille simplifiee en une colonne.
- Priorite a la lisibilite des contenus.
- Navigation compacte et previsible.
- Cartes empilees avec hierarchie conservee.
- Aucun texte ou bouton ne doit deborder.

### Densite

Le rendu doit etre plus dense qu'un portfolio creatif, mais plus respirant qu'un outil interne brut. L'equilibre recherche : application B2B premium.

## Iconographie

### Style

- Icônes lineaires, simples, techniques.
- Epaisseur coherente.
- Angles nets ou legerement arrondis.
- Usage fonctionnel avant decoratif.

### Usages

- Navigation.
- Actions.
- Categories de competences.
- Etats.
- Indicateurs de projet.

### A eviter

- Illustrations cartoon.
- Icones trop expressives.
- Melange de styles.
- Icones uniquement decoratives sans signification.

## Imagerie et visuels

Le portfolio doit utiliser des visuels qui renforcent l'univers industriel et applicatif.

Types de visuels recommandes :

- Mockups d'interfaces metier.
- Extraits anonymises de dashboards recrees.
- Schemas de flux.
- Cartographies de modules.
- Captures stylisees de composants UI.
- Representations de donnees ou KPI.

A eviter :

- Photos de bureau generiques.
- Images abstraites floues.
- Illustrations SVG decoratives sans rapport metier.
- Visuels trop sombres qui masquent l'information.

## Data visualisation

### Principes

- La donnee doit etre lisible avant d'etre belle.
- Chaque graphique doit avoir un titre clair, une unite et un contexte.
- Les couleurs doivent indiquer un sens fonctionnel.
- Les KPI doivent toujours etre accompagnes d'une interpretation.

### Composants data prioritaires

- Carte KPI.
- Mini tendance.
- Tableau synthetique.
- Badge de statut.
- Comparaison avant / apres.
- Timeline de processus.
- Module de filtrage simple.

### Regles

- Pas de graphiques decoratifs sans valeur.
- Pas de palette arc-en-ciel.
- Pas de surcharge d'indicateurs.
- Les seuils critiques doivent etre comprehensibles sans legende complexe.

## Composants UI a concevoir dans Figma

### Fondations

- Couleurs / tokens.
- Typographie.
- Spacing.
- Grille.
- Rayons.
- Ombres.
- Borders.
- Etats focus.

### Composants principaux

- Header.
- Footer.
- Boutons primaires, secondaires et ghost.
- Liens textuels.
- Badges.
- Cartes projet.
- Cartes KPI.
- Cartes competence.
- Tabs.
- Accordions.
- Timeline.
- Tableau simple.
- Formulaire de contact.
- Bloc etude de cas.
- Bloc citation ou retour utilisateur.
- Bloc decision / impact.

### Variants minimum

- Default.
- Hover.
- Focus.
- Active.
- Disabled.
- Error si applicable.
- Success si applicable.

## Pages a maquettter dans Figma

### Accueil

Objectif : faire comprendre en quelques secondes le positionnement Front-End .NET, UI/UX industriel et data-driven.

Elements attendus :

- Hero applicatif avec proposition de valeur.
- Apercu de modules d'expertise.
- Preuves par KPI ou impacts.
- Apercu de realisations.
- Bloc vision.
- Appel au contact.

### Realisations

Objectif : presenter les projets comme des cas metier.

Elements attendus :

- Filtres ou categories.
- Cartes projet structurees.
- Role, contexte, stack, impact.
- Mise en avant des projets industriels.

### Etude de cas

Objectif : demontrer la methode.

Structure attendue :

1. Contexte.
2. Problematique.
3. Contraintes.
4. Solution.
5. Choix UX.
6. Choix techniques.
7. Resultats.
8. Impact metier.
9. Enseignements.

### Competences

Objectif : montrer un profil complet et coherent.

Groupes recommandes :

- Front-End .NET / Blazor.
- UI / UX.
- Design System.
- Data / BI / KPI.
- Applications industrielles.
- Back-End ASP.NET MVC.

### Vision

Objectif : exprimer une pensee professionnelle forte sur les interfaces metier.

Angles :

- Reduction de charge cognitive.
- Lisibilite de la donnee.
- Performance operationnelle.
- Design system comme levier de qualite.
- UX comme outil de decision.

### Contact

Objectif : faciliter la prise de contact sans surcharge.

Elements attendus :

- Message court.
- Coordonnees ou formulaire.
- Liens professionnels.
- Disponibilite ou type d'opportunites recherchees.

## Animations et interactions

### Principes

- Sobres.
- Rapides.
- Utiles.
- Non intrusives.
- Orientees comprehension.

### Usages pertinents

- Transition d'etat sur boutons et liens.
- Apparition douce de sections.
- Highlight de KPI.
- Ouverture d'accordions.
- Changement de tab.
- Feedback de formulaire.

### A eviter

- Effets de parallaxe lourds.
- Animations permanentes distrayantes.
- Transitions lentes.
- Effets purement demonstratifs.

## Accessibilite

L'accessibilite doit etre integree des la conception Figma et pendant le developpement.

Criteres :

- Contrastes conformes WCAG AA.
- Attention particuliere aux preconisations du RGAA.
- Etats focus visibles.
- Navigation clavier anticipee.
- Structure semantique claire.
- Alternatives textuelles pour les images utiles.
- Couleur jamais utilisee comme unique moyen de comprehension.
- Composants interactifs comprehensibles par les technologies d'assistance.

## Regles Figma

### Organisation

- Une page `Foundations`.
- Une page `Components`.
- Une page `Layouts`.
- Une page `Pages`.
- Une page `Prototype`.

### Nommage

- Tokens : `color/background/default`, `color/text/primary`, `space/4`, etc.
- Composants : `Button/Primary`, `Card/Project`, `KPI/Card`, `Navigation/Header`.
- Frames : nommer par page, viewport et etat.

### Auto-layout

- Utiliser Auto Layout par defaut pour les composants.
- Definir les contraintes responsive des le debut.
- Eviter les dimensions fixes lorsque le contenu peut varier.
- Prevoir les textes longs.

### Variants

Chaque composant interactif doit prevoir au minimum les etats default, hover, focus et disabled.

## Regles de contenu

### Titres

- Courts.
- Concrets.
- Orientes valeur.
- Pas de promesse vague.

### Paragraphes

- 2 a 4 lignes maximum lorsque possible.
- Une idee par paragraphe.
- Formulations professionnelles mais lisibles.

### Etudes de cas

Chaque etude de cas doit suivre : Contexte -> Problematique -> Solution -> Choix UX -> Resultat -> Impact metier.

### Ton

- Precise.
- Professionnel.
- Calme.
- Oriente preuve.
- Ambitieux sans etre emphatique.

## Anti-patterns

A eviter absolument :

- Portfolio trop artistique qui masque la competence metier.
- Landing page SaaS generique sans identite personnelle.
- Effets visuels trop lourds.
- Palette trop sombre ou trop monochrome.
- Cartes empilees sans logique d'information.
- KPI sans contexte.
- Textes trop longs dans les composants.
- Accessibilite repoussee a la fin.
- Figma sans design system.
- Developpement avant validation des fondations visuelles.

## Definition de succes esthetique

Le design est reussi si un Lead Tech, une DSI ou un responsable digitalisation comprend rapidement que Merryl sait concevoir des interfaces metier robustes, lisibles, modernes et utiles, avec une sensibilite UI/UX forte et une vraie culture industrielle.

Le portfolio doit donner l'impression d'une application professionnelle haut de gamme : precise, claire, calme et orientee decision.


---

# Extension — Design system industriel et composant MachineStatus

> **Statut :** prescriptions de conception pour un démonstrateur et une bibliothèque de composants ; à adapter et valider avec les métiers avant tout déploiement sur machine réelle. Cette extension complète les sections portfolio précédentes sans les remplacer.

## 1. Références et cadre de conception

- **Siemens Industrial Experience (iX)** — composants, tokens, documentation et cohérence des applications industrielles : https://ix.siemens.io/ ; https://github.com/siemens/ix
- **Siemens WinCC Unified** — navigation opérateur, vues machine, alarmes et contextualisation des commandes : https://www.siemens.com/fr-fr/products/simatic-hmi/wincc-unified/
- **Ignition Perspective** — vues web adaptatives et supervision multi-équipements : https://www.inductiveautomation.com/ignition/modules/perspective
- **Beckhoff TwinCAT HMI** — interfaces modulaires de machines spéciales : https://www.beckhoff.com/
- **AVEVA InTouch HMI / Situational Awareness** — visibilité des anomalies et sobriété des synoptiques : https://www.aveva.com/
- **ANSI/ISA-101** — référence de conception et de cycle de vie des IHM ; **ISA-18.2 / IEC 62682** — gestion des alarmes ; **IEC 62443** — cybersécurité des systèmes industriels ; **ISO 9241-110** — principes ergonomiques ; **IEC 60204-1 / ISO 13849-1** — exigences à examiner selon l'architecture de commande et de sécurité.

Ces références inspirent le travail mais ne garantissent pas la conformité d'un produit. Ne pas présenter les palettes ou seuils d'exemple comme des prescriptions normatives.

## 2. Principes opérationnels non négociables

1. **L'état machine est prioritaire** : l'opérateur identifie immédiatement l'équipement, son état, les alarmes actives et la fiabilité des données.
2. **Une mesure sans contexte n'est pas interprétable** : afficher unité, consigne ou référence, plage admissible et écart si ces informations sont disponibles et pertinentes.
3. **Ne pas confondre les dimensions** : état opérationnel, gravité d'alarme, qualité/fraîcheur des données et disponibilité de la liaison sont indépendants.
4. **La couleur ne suffit jamais** : texte, forme ou icône complètent chaque statut. Réserver les couleurs fortes aux informations qui exigent l'attention.
5. **Les alarmes sont des objets métier** : sévérité, origine, horodatage, état actif/acquitté, contexte et accès au diagnostic ; ne pas assimiler « acquittée » à « résolue ».
6. **Les commandes sont distinctes des informations** : actions autorisées explicites, confirmation proportionnée au risque, retours d'exécution et traitement des refus/temporisations.
7. **Aucune commande de sécurité via un simple composant web** : les arrêts d'urgence, interverrouillages et fonctions de sécurité relèvent de systèmes adaptés et validés.
8. **Ne jamais masquer une incertitude** : données périmées, invalides, absentes ou incohérentes ne doivent pas apparaître comme nominales.

## 3. Ordre de lecture du composant MachineStatus

**Ordre recommandé :** identité et localisation → état machine → alarmes et qualité des données → mesures critiques contextualisées → cycle et phase → télémétrie secondaire → informations de maintenance/production.

### 3.1 En-tête

- Identifiant stable, nom lisible et emplacement de l'équipement.
- Statut opérationnel en langue de l'interface : « En production », « En attente », « À l'arrêt », « En défaut », « En maintenance », « État inconnu ».
- Statut explicite de la liaison et fraîcheur des données, indépendamment du statut machine.
- Ne pas se contenter d'un petit badge `RUNNING` isolé.

### 3.2 Mesures principales

- Valeur + unité indissociables, précision et arrondis cohérents avec le capteur.
- Consigne, plage ou seuil lorsque connu ; signaler « Référence indisponible » plutôt qu'inventer une plage.
- Écart à la consigne et tendance uniquement s'ils sont calculables sur des données valides.
- Pour les mesures critiques, prévoir les états normal, avertissement, alarme, indisponible et périmé.

### 3.3 Progression du cycle

- Afficher phase courante, nombre de phases et libellé métier quand ils sont connus.
- Pourcentage calculé à partir d'une progression réelle ; ne pas déduire 67 % de « phase 4 sur 6 » sans règle métier.
- Temps écoulé, durée cible et temps restant seulement si les sources le permettent ; qualifier les estimations.
- Prévoir cycle non démarré, suspendu, interrompu, terminé et progression indéterminée.

### 3.4 Alarmes et diagnostic

- Zone persistante, même sans alarme : « Aucune alarme active » seulement si le système d'alarmes est disponible et ses données fiables.
- En présence d'alarmes : nombre, priorité maximale, résumé, accès au détail et timestamp.
- Ne pas utiliser un toast éphémère comme unique présentation d'une alarme critique.
- L'acquittement doit être une action autorisée et traçable ; il ne supprime pas la condition de défaut.

### 3.5 Fraîcheur et provenance

- Distinguer `observedAt` (mesure à la source), `receivedAt` (réception serveur) et `lastSuccessfulSyncAt` (dernier rafraîchissement réussi), si disponibles.
- Afficher « Dernière donnée reçue il y a X s » plutôt que « En direct » sans garantie de temps réel.
- Définir des seuils de fraîcheur par équipement et type de mesure ; **5 secondes de polling ne constituent pas une garantie de fraîcheur**.
- Un schéma Zod valide ne prouve ni la cohérence métier ni l'actualité de la mesure.

## 4. Architecture du design system

| Niveau | Contenu | Exemples |
|---|---|---|
| 01 — Fondations | Tokens, typographies, grilles, icônes, contrastes, densités | `color/text/primary`, `space/4`, `status/alarm/critical` |
| 02 — UI générique | Composants accessibles et indépendants du métier | `Button`, `Dialog`, `Tabs`, `DataTable`, `Tooltip` |
| 03 — Industriel | Composants métier composables | `MachineStatus`, `MachineStateBadge`, `AlarmSummary`, `CycleProgress`, `SensorReading`, `DataFreshness` |
| 04 — Templates | Vues selon tâches et rôles | Conduite, diagnostic, supervision multi-machines |

### 4.1 Responsabilités techniques

- **Présentation (`MachineStatus`)** : composant déterministe recevant un modèle normalisé ; pas d'URL API codée en dur ni de logique de polling obligatoire.
- **Modèle métier (`MachineStatusModel`)** : états explicites, unités, horodatages, qualité des données, alarmes et propriétés optionnelles.
- **Adaptateur (`MachineStatusAdapter`)** : transformation de données API, OPC UA via backend, flux ou simulateur en modèle métier commun.
- **Validation** : Zod valide la structure d'entrée ; une étape distincte applique les règles métier (bornes, chronologie, cohérence des phases et unités).
- **Orchestration** : rafraîchissement, annulation, reconnexion, erreurs et temporisations dans un conteneur ou service, pas dans la couche de présentation.
- **Tests** : le simulateur 404, l'inspection du JSON et les scénarios de panne appartiennent à un *playground* ou une page de démonstration, non au composant de production.

### 4.2 Contrat conceptuel des états

Ne pas figer les codes internes avant inventaire des automates et des besoins métier. Le modèle doit au minimum distinguer :

- `machineState` : `running | idle | stopped | fault | maintenance | unknown` (exemple extensible).
- `connectionState` : `connected | reconnecting | disconnected | unknown`.
- `dataQuality` : `valid | stale | invalid | unavailable`.
- `alarmSeverity` : `none | info | warning | critical` pour l'affichage ; les catégories réelles sont à mapper depuis le système d'alarmes.

Une machine peut être en production **et** avoir une alarme active ; une connexion peut être établie **et** transporter des données périmées. Ne pas réduire ces dimensions à un booléen `isHealthy`.

## 5. Tokens et sémantique visuelle

- Conserver l'identité portfolio (bleu profond et cyan technique), mais séparer les tokens **de marque** des tokens **d'état métier**.
- Exemples de tokens : `color/surface/base`, `color/surface/raised`, `color/text/muted`, `color/border/subtle`, `color/focus/ring`, `color/machine/running`, `color/alarm/critical`, `color/data/stale`.
- Définir les tokens sémantiques avant les valeurs hexadécimales ; thèmes clair et sombre distincts, sans inversion mécanique des couleurs.
- Les statuts doivent associer texte, icône et couleur ; ne pas faire du vert le signal universel de fonctionnement sûr.
- Prévoir une palette neutre dominante, des contrastes vérifiés et des couleurs d'alerte réservées.
- Typographie tabulaire pour les valeurs dynamiques (`font-variant-numeric: tabular-nums`) ; alignement des nombres, unités distinctes et jamais tronquées.
- Respecter WCAG 2.2 AA pour les éléments web applicables ; vérifier sur le matériel industriel et dans l'éclairage réel.

## 6. Responsive, tactile et densité

- **PC industriel** : synthèse et télémétrie côte à côte si la largeur et la distance de lecture le permettent.
- **Tablette** : priorité à l'état, aux alarmes et aux mesures critiques ; les informations secondaires passent sous la synthèse.
- **Règles de repli** : ne jamais cacher un défaut actif, une perte de liaison ou une valeur critique pour gagner de la place.
- **Cibles tactiles** : viser au moins 44 × 44 CSS px pour les actions fréquentes, davantage si port de gants ou vibrations ; valider physiquement sur le terminal.
- **Densité** : variantes `comfortable` et `compact` ; ne pas réduire arbitrairement les polices des valeurs et alarmes critiques.
- **Focus/clavier** : navigation complète au clavier, ordre logique, focus visible, et absence d'actions exclusivement accessibles au survol.
- **Mouvement** : limiter les animations ; aucun clignotement permanent pour décorer un état ; respecter les préférences de réduction du mouvement.

## 7. États à maquetter et tester

| Scénario | Attendu UX |
|---|---|
| Machine en production, données valides | État clair, mesures contextualisées, cycle lisible |
| Machine à l'arrêt ou en attente | Aucun faux signal de panne ; cycle présenté correctement |
| Alarme critique active | Priorité visuelle, source et accès au diagnostic |
| Alarme acquittée mais toujours active | Statut non ambigu ; ne pas afficher « résolu » |
| API 404 / réseau indisponible | État de liaison visible ; pas de valeurs présentées comme actuelles |
| JSON invalide / échec Zod | Message de données invalides, aucune substitution silencieuse |
| Données périmées avec réseau connecté | Distinction connexion / fraîcheur |
| Capteur absent ou unité inconnue | Valeur indisponible, pas de zéro inventé |
| Phase inconnue / cycle suspendu | Progression honnête, pas de pourcentage fabriqué |
| Tablette, zoom 200 %, textes longs | Aucun statut critique masqué ni commande inaccessible |

## 8. Figma : structure complémentaire

Conserver `Foundations`, `Components`, `Layouts`, `Pages`, `Prototype` et ajouter des sections ou pages dédiées :

- `Industrial / Semantics` : états, alarmes, qualité des données, terminologie.
- `Industrial / Components` : composants métier et variantes.
- `Industrial / Templates` : conduite, diagnostic, supervision.
- `Industrial / Scenarios` : normal, défaut, hors ligne, périmé, invalide.

Pour chaque composant documenter : objectif, utilisateurs, anatomie, propriétés, états, responsive, accessibilité, exemples de données, comportements d'erreur et anti-patterns. Nommer les composants `Industrial/MachineStatus`, `Industrial/AlarmSummary`, `Industrial/SensorReading`.

## 9. Critères d'acceptation de MachineStatus

- [ ] L'identité de la machine et son état sont identifiables sans parcourir les mesures secondaires.
- [ ] État machine, alarmes, connexion et qualité des données sont indépendants.
- [ ] Une mesure critique présente unité et référence lorsqu'elles sont connues.
- [ ] Une valeur absente, invalide ou périmée n'est jamais affichée comme nominale.
- [ ] Le pourcentage et les durées de cycle sont calculés ou qualifiés selon des règles explicites.
- [ ] Les alarmes actives restent visibles et accessibles au diagnostic.
- [ ] Les timestamps ont une signification explicite et un fuseau cohérent.
- [ ] Le composant de présentation fonctionne avec des données simulées sans dépendre de l'API.
- [ ] Les erreurs réseau et de validation sont testées séparément.
- [ ] Les variantes PC/tablette, clavier et contraste ont été vérifiées.
- [ ] Les outils de test sont séparés de l'interface métier.
- [ ] Toute commande de contrôle réelle est traitée hors du composant de synthèse, avec une architecture de sécurité appropriée.

## 10. Définition de succès de cette extension

Le démonstrateur est réussi lorsqu'un opérateur peut déterminer rapidement **quelle machine il regarde, dans quel état elle se trouve, si une anomalie exige une action, si les mesures sont interprétables et si les données sont fiables**. Le design system est réussi lorsque les mêmes règles et composants peuvent être réutilisés sur plusieurs types de machines, sans dissimuler les spécificités métier ni les contraintes de sécurité.
