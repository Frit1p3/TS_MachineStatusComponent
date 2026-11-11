import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MachineStatusCard } from './MachineStatusCard'
import { machineSchema } from '../schemas/machine.schema'
import { rawMachineApiSchema } from '../schemas/machine-api.schema'

const machine = machineSchema.parse({
  id: 12,
  name: 'Presse composite A-12',
  status: 'running',
  temperatureC: 220,
  currentPhase: 4,
  totalPhases: 6,
  elapsedMinutes: 82,
  updatedAt: new Date().toISOString(),
})

const rawApiData = rawMachineApiSchema.parse({
  id: 12,
  name: 'Presse composite A-12',
  status: 'running',
  statusDetails: { currentPhase: 4, totalPhases: 6, elapsedMinutes: 82 },
  sensors: {
    temperature: {
      value: 220,
      unit: '°C',
      threshold: { warning: 200, critical: 250 },
      status: 'warning',
    },
  },
  alarms: [{
    id: 'ALM-1',
    code: 'TEMP_HIGH',
    severity: 'warning',
    message: 'Température élevée',
    timestamp: new Date().toISOString(),
    acknowledged: false,
  }],
  lastUpdated: new Date().toISOString(),
})

describe('MachineStatusCard', () => {
  it('affiche les alarmes actives indépendamment du statut opérationnel', () => {
    render(<MachineStatusCard machine={machine} rawApiData={rawApiData} />)
    expect(screen.getByText(/1 alarme active : Température élevée/)).not.toBeNull()
    expect(screen.getByText('En production')).not.toBeNull()
  })

  it('utilise les seuils de température fournis par le flux', () => {
    const { container } = render(<MachineStatusCard machine={machine} rawApiData={rawApiData} />)
    expect(screen.getByText(/alerte 200 °C, critique 250 °C/)).not.toBeNull()
    expect(container.querySelector('.metric-box--warning')).not.toBeNull()
  })
})
