import { describe, it, expect } from 'vitest'
import {
  rawMachineApiSchema,
  transformApiToMachine,
  parseAndTransformMachineApi,
} from './machine-api.schema'
import fs from 'node:fs'
import path from 'node:path'

describe('machine-api.schema', () => {
  const validApiData = {
    id: 12,
    name: 'Presse composite A-12',
    status: 'running',
    statusDetails: {
      currentMode: 'auto',
      currentPhase: 4,
      totalPhases: 6,
      loadPercentage: 78,
      elapsedMinutes: 82,
    },
    sensors: {
      temperature: {
        value: 178,
        unit: '°C',
      },
    },
    lastUpdated: '2026-10-20T12:30:00Z',
  }

  describe('Validation du mock réel public/api/machine.json', () => {
    it('doit valider avec succès le fichier mock public/api/machine.json', () => {
      const mockPath = path.resolve(__dirname, '../../public/api/machine.json')
      const fileContent = fs.readFileSync(mockPath, 'utf-8')
      const json = JSON.parse(fileContent)

      const result = parseAndTransformMachineApi(json)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual({
          id: 12,
          name: 'Presse composite A-12',
          status: 'running',
          temperatureC: 178,
          currentPhase: 4,
          totalPhases: 6,
          elapsedMinutes: 82,
          updatedAt: '2026-10-20T12:30:00Z',
        })
      }
    })
  })

  describe('rawMachineApiSchema', () => {
    it('doit valider un payload nominal valide', () => {
      const result = rawMachineApiSchema.safeParse(validApiData)
      expect(result.success).toBe(true)
    })

    it('doit rejeter un payload sans capteur de température', () => {
      const invalid = {
        ...validApiData,
        sensors: {},
      }
      const result = rawMachineApiSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })

    it('doit rejeter un payload avec température non numérique ou non finie', () => {
      const invalid = {
        ...validApiData,
        sensors: {
          temperature: { value: '180' },
        },
      }
      const result = rawMachineApiSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })

    it('doit rejeter un payload avec statusDetails incomplet', () => {
      const invalid = {
        ...validApiData,
        statusDetails: {
          currentPhase: 4,
          // totalPhases manquant
          elapsedMinutes: 82,
        },
      }
      const result = rawMachineApiSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })

    it('doit rejeter un payload avec statut invalide', () => {
      const invalid = {
        ...validApiData,
        status: 'unknown_status',
      }
      const result = rawMachineApiSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })

    it('doit rejeter une date lastUpdated invalide', () => {
      const invalid = {
        ...validApiData,
        lastUpdated: 'not-a-date',
      }
      const result = rawMachineApiSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })

    it('doit rejeter un capteur secondaire mal formé', () => {
      const invalid = {
        ...validApiData,
        sensors: {
          ...validApiData.sensors,
          vibration: { value: 'forte', unit: 'mm/s' },
        },
      }
      expect(rawMachineApiSchema.safeParse(invalid).success).toBe(false)
    })

    it('doit rejeter une alarme ou une maintenance mal formée', () => {
      const invalidAlarm = {
        ...validApiData,
        alarms: [{ id: 'A-1', severity: 'urgent' }],
      }
      const invalidMaintenance = {
        ...validApiData,
        maintenance: { nextScheduled: 'demain' },
      }
      expect(rawMachineApiSchema.safeParse(invalidAlarm).success).toBe(false)
      expect(rawMachineApiSchema.safeParse(invalidMaintenance).success).toBe(false)
    })
  })

  describe('transformApiToMachine', () => {
    it('doit correctement transformer le payload API en modèle Machine', () => {
      const machine = transformApiToMachine(rawMachineApiSchema.parse(validApiData))
      expect(machine).toEqual({
        id: 12,
        name: 'Presse composite A-12',
        status: 'running',
        temperatureC: 178,
        currentPhase: 4,
        totalPhases: 6,
        elapsedMinutes: 82,
        updatedAt: '2026-10-20T12:30:00Z',
      })
    })

    it('doit lever une exception si les règles croisées du domaine sont violées', () => {
      const invalidCrossData = {
        ...validApiData,
        statusDetails: {
          ...validApiData.statusDetails,
          currentPhase: 7,
          totalPhases: 6,
        },
      }

      expect(() => transformApiToMachine(rawMachineApiSchema.parse(invalidCrossData))).toThrow()
    })
  })

  describe('parseAndTransformMachineApi', () => {
    it('doit identifier les erreurs au niveau de la structure API (stage: api_schema)', () => {
      const invalid = { id: 'invalid-id' }
      const res = parseAndTransformMachineApi(invalid)
      expect(res.success).toBe(false)
      if (!res.success) {
        expect(res.stage).toBe('api_schema')
      }
    })

    it('doit identifier les erreurs au niveau des contraintes de domaine (stage: domain_schema)', () => {
      const invalidDomain = {
        ...validApiData,
        statusDetails: {
          ...validApiData.statusDetails,
          currentPhase: 10,
          totalPhases: 5,
        },
      }
      const res = parseAndTransformMachineApi(invalidDomain)
      expect(res.success).toBe(false)
      if (!res.success) {
        expect(res.stage).toBe('domain_schema')
        expect(res.error.issues[0].message).toContain('currentPhase cannot be greater than totalPhases')
      }
    })
  })
})
