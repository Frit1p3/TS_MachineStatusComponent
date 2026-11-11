# Convention Git — Machine Status

## Format des commits

```text
<type>(<scope>): <description>
```

Rédiger la description en anglais, à l'impératif, sans point final. Un commit = une modification logique. Éviter les messages génériques (`update`, `fix stuff`).

### Types

| Type | Usage |
| --- | --- |
| `feat` | Fonctionnalité |
| `fix` | Correction de bug |
| `refactor` | Réorganisation sans changement fonctionnel |
| `test` | Ajout ou modification de tests |
| `style` | Mise en forme sans changement de comportement |
| `docs` | Documentation |
| `chore` | Maintenance, dépendances, outillage |
| `ci` | Intégration continue |

### Scopes suggérés

`schema`, `api`, `types`, `state`, `ui`, `tests`, `build`, `docs`.

### Exemples

```text
feat(schema): validate machine status with zod
feat(api): fetch machine data with typed errors
feat(state): model loading success and error states
feat(ui): render responsive machine status card
fix(api): reject malformed machine payload
refactor(types): infer machine model from zod schema
test(schema): reject unknown machine statuses
docs(readme): explain local development setup
```

## Branches

```text
feat/machine-schema
feat/api-validation
feat/machine-status-card
fix/api-error-handling
```

## Workflow recommandé

```bash
git switch -c feat/machine-schemas
# Développer puis vérifier les changements
git add src/schemas.ts
git commit -m "feat(schema): validate machine status with zod"
git push -u origin feat/machine-schemas
# Ouvrir ensuite une Pull Request vers main.
```

Préférer une PR par étape cohérente de la roadmap. La checklist de PR doit être adaptée au périmètre : une PR purement documentaire n'exige pas une capture d'interface.
