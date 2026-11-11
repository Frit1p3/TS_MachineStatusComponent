# MachineStatus Component

Interface React/TypeScript de supervision d'une machine industrielle. Le projet valide un flux API avec Zod avant de l'adapter vers un modèle métier stable et de l'afficher.

## Fonctionnalités

- validation en deux étapes : contrat API puis règles métier ;
- affichage du statut, du cycle, des capteurs, alarmes, production et maintenance ;
- seuils de température provenant du flux API ;
- actualisation manuelle et polling toutes les cinq secondes ;
- conservation de la dernière valeur valide en cas d'échec du flux ;
- diagnostic détaillé des erreurs HTTP, réseau et Zod ;
- bac à sable permettant de tester manuellement des payloads métier ;
- interface responsive, thème sombre automatique et contrôles accessibles.

## Prérequis

- Node.js 22.13 ou plus récent ;
- npm 10 ou plus récent.

## Installation et exécution

```bash
npm ci
npm run dev
```

Le mock nominal est servi depuis `public/api/machine.json`.

## Commandes

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre Vite en développement |
| `npm run typecheck` | Vérifie les types TypeScript sans produire de fichiers |
| `npm run lint` | Analyse JavaScript, TypeScript et TSX |
| `npm test` | Exécute la suite Vitest |
| `npm run build` | Produit le bundle de production |
| `npm run check` | Lance typecheck, lint, tests et build |
| `npm run test:manual` | Exécute les scénarios console (Node affiche un avertissement expérimental) |

## Architecture du flux

```text
public/api/machine.json
  -> machineApi (HTTP et normalisation des erreurs)
  -> rawMachineApiSchema (validation du contrat externe)
  -> adaptateur API vers Machine
  -> machineSchema (règles métier)
  -> useMachineStatus (cycle de vie, annulation et polling)
  -> LiveMachineFeed / MachineStatusCard
```

Les réponses obsolètes sont ignorées grâce à un identifiant de requête. Une nouvelle récupération annule aussi la précédente lorsque le navigateur le permet.

## Contrat de données

Le schéma externe valide notamment :

- l'identité et l'emplacement de la machine ;
- l'état et la progression du cycle ;
- les mesures et leurs seuils ;
- les alarmes et leur acquittement ;
- la production et la maintenance ;
- les dates ISO avec fuseau horaire.

Le modèle métier plat reste volontairement limité aux informations nécessaires au composant principal. Les données complémentaires validées sont transmises séparément à la vue de télémétrie.

## Qualité

Avant une contribution, lancer :

```bash
npm run check
git diff --check
```

Les tests couvrent les schémas, l'adaptation, le service HTTP, le polling, les changements d'endpoint, les réponses obsolètes et les principaux états visuels de la carte.
