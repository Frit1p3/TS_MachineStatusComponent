import type { Machine } from '../schemas/machine.schema'
import type { RawMachineApi } from '../schemas/machine-api.schema'

interface MachineStatusCardProps {
  machine: Machine
  rawApiData?: RawMachineApi | null
}

const STATUS_DETAILS: Record<
  Machine['status'],
  { label: string; className: string; ariaLabel: string; icon: string }
> = {
  running: {
    label: 'En production',
    className: 'status-badge status-running',
    ariaLabel: 'Machine en production',
    icon: '●',
  },
  stopped: {
    label: "À l'arrêt",
    className: 'status-badge status-stopped',
    ariaLabel: "Machine à l'arrêt",
    icon: '■',
  },
  maintenance: {
    label: 'En maintenance',
    className: 'status-badge status-maintenance',
    ariaLabel: 'Machine en maintenance',
    icon: '▲',
  },
  error: {
    label: 'En défaut',
    className: 'status-badge status-error',
    ariaLabel: 'Machine en défaut',
    icon: '✕',
  },
}

function getFreshness(updatedAt: string) {
  const ageSeconds = Math.max(0, Math.floor((Date.now() - Date.parse(updatedAt)) / 1000))
  if (ageSeconds <= 10) return { label: 'Donnée fraîche', className: 'freshness--fresh' }
  if (ageSeconds <= 30) return { label: `Donnée vieillissante (${ageSeconds} s)`, className: 'freshness--aging' }
  return { label: `Donnée périmée (${ageSeconds} s)`, className: 'freshness--stale' }
}

export function MachineStatusCard({ machine, rawApiData }: MachineStatusCardProps) {
  const statusInfo = STATUS_DETAILS[machine.status]
  const phasePercentage = Math.min(
    100,
    Math.round((machine.currentPhase / machine.totalPhases) * 100),
  )
  const formattedDate = new Date(machine.updatedAt).toLocaleString('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  })
  const freshness = getFreshness(machine.updatedAt)

  const temperature = rawApiData?.sensors.temperature
  const warningThreshold = temperature?.threshold?.warning
  const criticalThreshold = temperature?.threshold?.critical
  const temperatureUnit = temperature?.unit ?? '°C'
  const isCriticalTemperature =
    criticalThreshold !== undefined && machine.temperatureC >= criticalThreshold
  const isWarningTemperature =
    warningThreshold !== undefined &&
    machine.temperatureC >= warningThreshold &&
    !isCriticalTemperature

  const activeAlarms = rawApiData?.alarms.filter((alarm) => !alarm.acknowledged) ?? []
  const hasOperationalFault = machine.status === 'error'
  const hasActiveAlarm = activeAlarms.length > 0 || hasOperationalFault
  const alarmMessage = activeAlarms.length > 0
    ? `${activeAlarms.length} alarme${activeAlarms.length > 1 ? 's' : ''} active${activeAlarms.length > 1 ? 's' : ''} : ${activeAlarms[0].message}`
    : hasOperationalFault
      ? 'Défaut de fonctionnement détecté sur la machine'
      : rawApiData
        ? "Aucune alarme active sur l'équipement"
        : "État des alarmes indisponible dans ce scénario"

  return (
    <article className="machine-card" aria-label={`Supervision de l'équipement ${machine.name}`}>
      <header className="machine-card__header">
        <div className="machine-card__identity">
          <span className="machine-card__id">Équipement #{machine.id}</span>
          <h3 className="machine-card__title">{machine.name}</h3>
        </div>
        <div className={statusInfo.className} aria-label={statusInfo.ariaLabel}>
          <span className="status-badge__dot" aria-hidden="true">{statusInfo.icon}</span>
          <span className="status-badge__text">{statusInfo.label}</span>
        </div>
      </header>

      <div
        className={`machine-card__alarm-status ${hasActiveAlarm ? 'alarm-active' : 'alarm-nominal'}`}
        role="status"
      >
        <span className="alarm-indicator-icon" aria-hidden="true">
          {hasActiveAlarm ? '⚠️' : rawApiData ? '✓' : 'ℹ️'}
        </span>
        <span className="alarm-indicator-text">{alarmMessage}</span>
      </div>

      <div className="machine-card__body">
        <div className={`metric-box ${isCriticalTemperature ? 'metric-box--critical' : isWarningTemperature ? 'metric-box--warning' : ''}`}>
          <div className="metric-box__header">
            <span className="metric-label">Température mesurée</span>
            <span className="metric-context">
              {warningThreshold !== undefined && criticalThreshold !== undefined
                ? `Seuils : alerte ${warningThreshold} ${temperatureUnit}, critique ${criticalThreshold} ${temperatureUnit}`
                : 'Seuils non fournis'}
            </span>
          </div>
          <div className="metric-box__main">
            <span className="metric-value">
              {machine.temperatureC} <span className="metric-unit">{temperatureUnit}</span>
            </span>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-box__header">
            <span className="metric-label">Temps de cycle écoulé</span>
            <span className="metric-context">Phase en cours</span>
          </div>
          <div className="metric-box__main">
            <span className="metric-value">
              {machine.elapsedMinutes} <span className="metric-unit">min</span>
            </span>
          </div>
        </div>

        <div className="metric-box metric-box--full">
          <div className="metric-header">
            <span className="metric-label">Progression du cycle opératoire</span>
            <span className="metric-subvalue">
              Phase {machine.currentPhase} / {machine.totalPhases} ({phasePercentage} %)
            </span>
          </div>
          <div
            className="progress-bar-track"
            role="progressbar"
            aria-valuenow={phasePercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progression du cycle : ${phasePercentage}%`}
          >
            <div className="progress-bar-fill" style={{ width: `${phasePercentage}%` }} />
          </div>
        </div>
      </div>

      <footer className="machine-card__footer">
        <span className="timestamp-label">Horodatage de la mesure :</span>
        <time dateTime={machine.updatedAt}>{formattedDate}</time>
        <span className={`freshness-indicator ${freshness.className}`}>{freshness.label}</span>
      </footer>
    </article>
  )
}
