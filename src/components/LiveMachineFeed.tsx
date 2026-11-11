import { useState, type FormEvent } from 'react'
import { useMachineStatus } from '../hooks/useMachineStatus'
import { MachineStatusCard } from './MachineStatusCard'

const NOMINAL_ENDPOINT = '/api/machine.json'
const ERROR_ENDPOINT = '/api/error-404.json'

function isValidEndpoint(value: string): boolean {
  if (value.startsWith('/')) return true
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol)
  } catch {
    return false
  }
}

export function LiveMachineFeed() {
  const [activeEndpoint, setActiveEndpoint] = useState(NOMINAL_ENDPOINT)
  const [endpointDraft, setEndpointDraft] = useState('')
  const [endpointError, setEndpointError] = useState<string | null>(null)
  const [showRawJson, setShowRawJson] = useState(false)

  const {
    data,
    rawApiData,
    isLoading,
    isRefetching,
    error,
    lastFetchedAt,
    refetch,
    isPolling,
    setIsPolling,
  } = useMachineStatus({
    endpoint: activeEndpoint,
    autoFetch: true,
    pollingInterval: 5000,
  })

  const formattedLastFetch = lastFetchedAt
    ? lastFetchedAt.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : 'Jamais'

  const selectEndpoint = (endpoint: string) => {
    setEndpointDraft('')
    setEndpointError(null)
    setActiveEndpoint(endpoint)
  }

  const applyCustomEndpoint = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const endpoint = endpointDraft.trim()
    if (!endpoint || !isValidEndpoint(endpoint)) {
      setEndpointError('Saisissez un chemin absolu ou une URL HTTP(S) valide.')
      return
    }
    setEndpointError(null)
    setActiveEndpoint(endpoint)
  }

  return (
    <div className="live-feed-container" aria-busy={isLoading || isRefetching}>
      <div className="live-feed-toolbar">
        <div className="live-feed-toolbar__left" aria-live="polite">
          <div className="live-status-pill">
            <span
              className={`live-status-dot ${
                isLoading || isRefetching
                  ? 'live-status-dot--syncing'
                  : error
                    ? 'live-status-dot--error'
                    : 'live-status-dot--active'
              }`}
              aria-hidden="true"
            />
            <span className="live-status-text">
              {isLoading
                ? 'Connexion au flux...'
                : isRefetching
                  ? 'Actualisation...'
                  : error
                    ? 'Flux interrompu'
                    : 'Flux API direct'}
            </span>
          </div>
          <span className="live-timestamp">
            Dernière récupération : <strong>{formattedLastFetch}</strong>
          </span>
        </div>

        <div className="live-feed-toolbar__right">
          <label className="polling-toggle">
            <input
              type="checkbox"
              checked={isPolling}
              onChange={(event) => setIsPolling(event.target.checked)}
            />
            <span>Auto-rafraîchissement (5 s)</span>
          </label>
          <button
            type="button"
            className="action-btn action-btn--refresh"
            onClick={() => void refetch()}
            disabled={isLoading || isRefetching}
          >
            {isRefetching ? 'Chargement...' : '🔄 Rafraîchir'}
          </button>
        </div>
      </div>

      <div className="feed-source-selector">
        <span className="source-label">Source du flux :</span>
        <div className="source-buttons">
          <button
            type="button"
            className={`source-btn ${activeEndpoint === NOMINAL_ENDPOINT ? 'source-btn--active' : ''}`}
            onClick={() => selectEndpoint(NOMINAL_ENDPOINT)}
            aria-pressed={activeEndpoint === NOMINAL_ENDPOINT}
          >
            Nominal (/api/machine.json)
          </button>
          <button
            type="button"
            className={`source-btn ${activeEndpoint === ERROR_ENDPOINT ? 'source-btn--active' : ''}`}
            onClick={() => selectEndpoint(ERROR_ENDPOINT)}
            aria-pressed={activeEndpoint === ERROR_ENDPOINT}
          >
            Simuler 404
          </button>
        </div>
        <form className="custom-endpoint-form" onSubmit={applyCustomEndpoint} noValidate>
          <label htmlFor="custom-endpoint">Endpoint personnalisé</label>
          <input
            id="custom-endpoint"
            type="text"
            value={endpointDraft}
            onChange={(event) => setEndpointDraft(event.target.value)}
            placeholder="/api/machine.json"
            aria-invalid={Boolean(endpointError)}
            aria-describedby={endpointError ? 'custom-endpoint-error' : undefined}
          />
          <button type="submit" className="action-btn">Appliquer</button>
          {endpointError && <span id="custom-endpoint-error" role="alert">{endpointError}</span>}
        </form>
      </div>

      {isLoading && !data && (
        <div className="feed-skeleton-card" aria-live="polite">
          <div className="skeleton-line skeleton-line--title" />
          <div className="skeleton-grid">
            <div className="skeleton-box" />
            <div className="skeleton-box" />
          </div>
          <div className="skeleton-line skeleton-line--progress" />
          <p className="skeleton-caption">Récupération et validation des données API en cours...</p>
        </div>
      )}

      {error && (
        <div className="feed-error-banner" role="alert">
          <div className="feed-error-banner__header">
            <span className="feed-error-icon" aria-hidden="true">⚠️</span>
            <div>
              <h3 className="feed-error-title">
                {error.type === 'NETWORK' && 'Erreur de connexion réseau'}
                {error.type === 'HTTP' && `Erreur de réponse serveur (${error.status})`}
                {error.type === 'VALIDATION' && 'Échec de conformité des données (Zod)'}
              </h3>
              <p className="feed-error-message">{error.message}</p>
              {data && <p className="feed-error-message">La dernière donnée valide connue reste affichée.</p>}
            </div>
          </div>
          {error.issues && error.issues.length > 0 && (
            <div className="feed-error-details">
              <h4>Détail des violations détectées ({error.stage}) :</h4>
              <ul>
                {error.issues.map((issue) => (
                  <li key={`${issue.path.join('.')}-${issue.code}-${issue.message}`}>
                    <code>{issue.path.length > 0 ? issue.path.join('.') : 'root'}</code> :{' '}
                    <span>{issue.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="feed-error-actions">
            <button type="button" className="action-btn action-btn--retry" onClick={() => void refetch()}>
              Réessayer la connexion
            </button>
          </div>
        </div>
      )}

      {data && (
        <div className="live-feed-content">
          <div className="feed-grid">
            <div className="feed-grid__main">
              <MachineStatusCard machine={data} rawApiData={rawApiData} />
            </div>
            {rawApiData && (
              <div className="feed-grid__sidebar">
                <div className="telemetry-card">
                  <h4 className="telemetry-card__title">Télémétrie & Contexte Usine</h4>
                  {rawApiData.location && (
                    <div className="telemetry-section">
                      <span className="telemetry-section__label">Emplacement</span>
                      <p className="telemetry-section__value">
                        {[rawApiData.location.facility, rawApiData.location.building, rawApiData.location.line]
                          .filter(Boolean)
                          .join(' • ')}
                      </p>
                    </div>
                  )}
                  <div className="telemetry-section">
                    <span className="telemetry-section__label">Capteurs étendus</span>
                    <div className="sensors-mini-grid">
                      {rawApiData.sensors.vibration && <div className="sensor-item"><span>Vibration</span><strong>{rawApiData.sensors.vibration.value} {rawApiData.sensors.vibration.unit}</strong></div>}
                      {rawApiData.sensors.pressure && <div className="sensor-item"><span>Pression</span><strong>{rawApiData.sensors.pressure.value} {rawApiData.sensors.pressure.unit}</strong></div>}
                      {rawApiData.sensors.hydraulicPressure && <div className="sensor-item"><span>Hydraulique</span><strong>{rawApiData.sensors.hydraulicPressure.value} {rawApiData.sensors.hydraulicPressure.unit}</strong></div>}
                    </div>
                  </div>
                  {rawApiData.production && (
                    <div className="telemetry-section">
                      <span className="telemetry-section__label">Production du jour</span>
                      <p className="telemetry-section__value"><strong>{rawApiData.production.today.partsProduced}</strong> / {rawApiData.production.today.target} pièces ({rawApiData.production.today.efficiency} %)</p>
                    </div>
                  )}
                  {rawApiData.maintenance && (
                    <div className="telemetry-section">
                      <span className="telemetry-section__label">Maintenance</span>
                      <p className="telemetry-section__value">Prochaine : {new Date(rawApiData.maintenance.nextScheduled).toLocaleDateString('fr-FR')}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="raw-inspector-toggle">
            <button
              type="button"
              className="toggle-raw-btn"
              onClick={() => setShowRawJson((visible) => !visible)}
              aria-expanded={showRawJson}
              aria-controls="raw-api-json"
            >
              {showRawJson ? "Masquer le JSON brut de l'API ▲" : "Inspecter le JSON brut de l'API ▼"}
            </button>
            {showRawJson && <pre id="raw-api-json" className="raw-json-viewer">{JSON.stringify(rawApiData, null, 2)}</pre>}
          </div>
        </div>
      )}
    </div>
  )
}
