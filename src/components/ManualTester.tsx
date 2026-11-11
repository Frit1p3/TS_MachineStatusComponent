import { useState, useMemo } from 'react'
import { machineSchema } from '../schemas/machine.schema'
import { MachineStatusCard } from './MachineStatusCard'

const PRESETS = [
  {
    id: 'nominal',
    label: '✅ Nominal (Valide)',
    description: 'Données valides complètes dans l\'état running',
    payload: {
      id: 10,
      name: 'Presse composite A-12',
      status: 'running',
      temperatureC: 82.4,
      currentPhase: 3,
      totalPhases: 5,
      elapsedMinutes: 45,
      updatedAt: '2026-10-20T12:30:00Z',
    },
  },
  {
    id: 'cross-error',
    label: '⚠️ Erreur Croisée (Phase > Total)',
    description: 'currentPhase (7) supérieure à totalPhases (5)',
    payload: {
      id: 10,
      name: 'Presse composite A-12',
      status: 'running',
      temperatureC: 82.4,
      currentPhase: 7,
      totalPhases: 5,
      elapsedMinutes: 45,
      updatedAt: '2026-10-20T12:30:00Z',
    },
  },
  {
    id: 'invalid-status',
    label: '❌ Statut Hors Énumération',
    description: 'status "idle" non autorisé par le schéma',
    payload: {
      id: 10,
      name: 'Presse composite A-12',
      status: 'idle',
      temperatureC: 82.4,
      currentPhase: 2,
      totalPhases: 4,
      elapsedMinutes: 15,
      updatedAt: '2026-10-20T12:30:00Z',
    },
  },
  {
    id: 'empty-name',
    label: '❌ Nom Vide (Trim)',
    description: 'name constitué uniquement d\'espaces',
    payload: {
      id: 10,
      name: '   ',
      status: 'running',
      temperatureC: 82.4,
      currentPhase: 1,
      totalPhases: 3,
      elapsedMinutes: 0,
      updatedAt: '2026-10-20T12:30:00Z',
    },
  },
  {
    id: 'invalid-date',
    label: '❌ Format Date Non-ISO',
    description: 'updatedAt sans heure ni composante timezone',
    payload: {
      id: 10,
      name: 'Presse composite A-12',
      status: 'maintenance',
      temperatureC: 45.0,
      currentPhase: 1,
      totalPhases: 2,
      elapsedMinutes: 10,
      updatedAt: '2026-10-20',
    },
  },
  {
    id: 'negative-elapsed',
    label: '❌ Temps Négatif',
    description: 'elapsedMinutes < 0',
    payload: {
      id: 10,
      name: 'Robot Usinage R-04',
      status: 'error',
      temperatureC: 98.7,
      currentPhase: 1,
      totalPhases: 4,
      elapsedMinutes: -12,
      updatedAt: '2026-10-20T12:30:00Z',
    },
  },
  {
    id: 'api-real',
    label: '🏭 Données API Réelles',
    description: 'Mappage extrait de public/api/machine.json',
    payload: {
      id: 12,
      name: 'Presse composite A-12',
      status: 'running',
      temperatureC: 178,
      currentPhase: 4,
      totalPhases: 6,
      elapsedMinutes: 82,
      updatedAt: '2026-10-20T12:30:00Z',
    },
  },
]

type Preset = (typeof PRESETS)[number]

export function ManualTester() {
  const [jsonInput, setJsonInput] = useState(() =>
    JSON.stringify(PRESETS[0].payload, null, 2),
  )
  const [activePreset, setActivePreset] = useState<string | null>(PRESETS[0].id)

  const handleSelectPreset = (preset: Preset) => {
    setActivePreset(preset.id)
    setJsonInput(JSON.stringify(preset.payload, null, 2))
  }

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setJsonInput(JSON.stringify(parsed, null, 2))
    } catch {
      // JSON invalide, on ne peut pas formater
    }
  }

  const { isJsonValid, jsonError, validationResult } = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonInput)
      const result = machineSchema.safeParse(parsed)
      return {
        isJsonValid: true,
        jsonError: null,
        validationResult: result,
      }
    } catch (err: unknown) {
      return {
        isJsonValid: false,
        jsonError: err instanceof Error ? err.message : 'Erreur JSON inconnue',
        validationResult: null,
      }
    }
  }, [jsonInput])

  return (
    <div className="tester-container">
      <header className="tester-header">
        <h2>Bac à sable interactif — Validation Zod</h2>
        <p>
          Modifiez le payload JSON en direct ou appliquez des scénarios types pour observer
          instantanément la réaction du validateur et le rendu visuel.
        </p>
      </header>

      {/* Barre de scénarios types */}
      <section className="tester-presets">
        <span className="presets-label">Scénarios préconfigurés :</span>
        <div className="presets-buttons">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`preset-btn ${activePreset === preset.id ? 'preset-btn--active' : ''}`}
              onClick={() => handleSelectPreset(preset)}
              title={preset.description}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grille principale : Éditeur + Validation Visuelle */}
      <div className="tester-grid">
        {/* Colonne Gauche : Éditeur JSON */}
        <section className="tester-column">
          <div className="column-header">
            <h3>Payload JSON</h3>
            <div className="column-actions">
              <button
                type="button"
                className="action-btn"
                onClick={handleFormatJson}
                disabled={!isJsonValid}
              >
                Formater JSON
              </button>
            </div>
          </div>

          <textarea
            className={`json-editor ${!isJsonValid ? 'json-editor--error' : ''}`}
            rows={18}
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value)
              setActivePreset(null)
            }}
            placeholder="Saisissez ou collez votre payload JSON ici..."
            spellCheck={false}
          />

          {!isJsonValid && (
            <div className="syntax-error-alert" role="alert">
              <strong>Erreur de syntaxe JSON :</strong> {jsonError}
            </div>
          )}
        </section>

        {/* Colonne Droite : Visualisation & Diagnostic */}
        <section className="tester-column">
          <div className="column-header">
            <h3>Diagnostic & Rendu</h3>
            {isJsonValid && validationResult && (
              <span
                className={`validation-badge ${
                  validationResult.success
                    ? 'validation-badge--valid'
                    : 'validation-badge--invalid'
                }`}
              >
                {validationResult.success ? 'Conforme Zod' : 'Rejeté par Zod'}
              </span>
            )}
          </div>

          <div className="results-wrapper">
            {!isJsonValid ? (
              <div className="state-placeholder state-placeholder--syntax">
                <span className="state-icon">⚠️</span>
                <h4>JSON non interprétable</h4>
                <p>Corrigez la syntaxe JSON pour évaluer les règles de validation Zod.</p>
              </div>
            ) : validationResult?.success ? (
              <div className="valid-output">
                <div className="success-banner" role="status">
                  <span className="success-icon">✓</span>
                  <div>
                    <strong>Schéma validé avec succès</strong>
                    <p>Toutes les contraintes unitaires et croisées sont respectées.</p>
                  </div>
                </div>

                <div className="card-preview">
                  <h4>Rendu du composant UI :</h4>
                  <MachineStatusCard machine={validationResult.data} />
                </div>
              </div>
            ) : validationResult && !validationResult.success ? (
              <div className="invalid-output">
                <div className="error-banner" role="alert">
                  <span className="error-icon">✕</span>
                  <div>
                    <strong>Validation échouée ({validationResult.error.issues.length} anomalie{validationResult.error.issues.length > 1 ? 's' : ''})</strong>
                    <p>Le payload a été rejeté par le schéma pour les raisons suivantes :</p>
                  </div>
                </div>

                <ul className="issues-list">
                  {validationResult.error.issues.map((issue, index) => (
                    <li key={index} className="issue-item">
                      <span className="issue-path">
                        {issue.path.length > 0 ? issue.path.join('.') : 'Global'}
                      </span>
                      <span className="issue-message">{issue.message}</span>
                      <span className="issue-code">{issue.code}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  )
}
