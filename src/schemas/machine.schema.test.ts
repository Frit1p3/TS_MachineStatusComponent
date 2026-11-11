import { describe, it, expect } from 'vitest'
import { machineSchema } from './machine.schema'

describe('machineSchema', () => {
  const validMachine = {
    id: 1,
    name: 'Presse composite A-12',
    status: 'running' as const,
    temperatureC: 75.5,
    currentPhase: 2,
    totalPhases: 5,
    elapsedMinutes: 45.2,
    updatedAt: '2026-10-20T12:30:00Z',
  }

  describe('valid cases', () => {
    it('should validate a complete valid machine object', () => {
      const result = machineSchema.safeParse(validMachine)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validMachine)
      }
    })

    it('should accept all valid statuses', () => {
      const statuses = ['running', 'stopped', 'maintenance', 'error'] as const
      for (const status of statuses) {
        const result = machineSchema.safeParse({ ...validMachine, status })
        expect(result.success).toBe(true)
      }
    })

    it('should allow currentPhase equal to totalPhases', () => {
      const result = machineSchema.safeParse({
        ...validMachine,
        currentPhase: 5,
        totalPhases: 5,
      })
      expect(result.success).toBe(true)
    })

    it('should allow elapsedMinutes to be exactly 0', () => {
      const result = machineSchema.safeParse({
        ...validMachine,
        elapsedMinutes: 0,
      })
      expect(result.success).toBe(true)
    })

    it('should allow negative or zero finite temperatures', () => {
      const negativeTemp = machineSchema.safeParse({
        ...validMachine,
        temperatureC: -15.8,
      })
      expect(negativeTemp.success).toBe(true)

      const zeroTemp = machineSchema.safeParse({
        ...validMachine,
        temperatureC: 0,
      })
      expect(zeroTemp.success).toBe(true)
    })

    it('should trim whitespace around name', () => {
      const result = machineSchema.safeParse({
        ...validMachine,
        name: '  Machine Alpha  ',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('Machine Alpha')
      }
    })

    it('should accept valid ISO datetime with millisecond precision and timezone offsets', () => {
      const resultMs = machineSchema.safeParse({
        ...validMachine,
        updatedAt: '2026-10-20T12:30:00.000Z',
      })
      expect(resultMs.success).toBe(true)

      const resultOffset = machineSchema.safeParse({
        ...validMachine,
        updatedAt: '2026-10-20T14:30:00+02:00',
      })
      expect(resultOffset.success).toBe(true)
    })
  })

  describe('id validation', () => {
    it('should reject non-number id', () => {
      const result = machineSchema.safeParse({ ...validMachine, id: '1' })
      expect(result.success).toBe(false)
    })

    it('should reject non-integer id', () => {
      const result = machineSchema.safeParse({ ...validMachine, id: 1.5 })
      expect(result.success).toBe(false)
    })

    it('should reject id <= 0', () => {
      const zeroResult = machineSchema.safeParse({ ...validMachine, id: 0 })
      expect(zeroResult.success).toBe(false)

      const negativeResult = machineSchema.safeParse({ ...validMachine, id: -1 })
      expect(negativeResult.success).toBe(false)
    })
  })

  describe('name validation', () => {
    it('should reject non-string name', () => {
      const result = machineSchema.safeParse({ ...validMachine, name: 123 })
      expect(result.success).toBe(false)
    })

    it('should reject empty name', () => {
      const result = machineSchema.safeParse({ ...validMachine, name: '' })
      expect(result.success).toBe(false)
    })

    it('should reject whitespace-only name', () => {
      const result = machineSchema.safeParse({ ...validMachine, name: '   ' })
      expect(result.success).toBe(false)
    })
  })

  describe('status validation', () => {
    it('should reject invalid status value', () => {
      const result = machineSchema.safeParse({ ...validMachine, status: 'paused' })
      expect(result.success).toBe(false)
    })

    it('should reject uppercase or malformed status', () => {
      const result = machineSchema.safeParse({ ...validMachine, status: 'RUNNING' })
      expect(result.success).toBe(false)
    })
  })

  describe('temperatureC validation', () => {
    it('should reject non-number temperature', () => {
      const result = machineSchema.safeParse({ ...validMachine, temperatureC: '75' })
      expect(result.success).toBe(false)
    })

    it('should reject non-finite numbers (Infinity, -Infinity, NaN)', () => {
      const infResult = machineSchema.safeParse({ ...validMachine, temperatureC: Infinity })
      expect(infResult.success).toBe(false)

      const negInfResult = machineSchema.safeParse({ ...validMachine, temperatureC: -Infinity })
      expect(negInfResult.success).toBe(false)

      const nanResult = machineSchema.safeParse({ ...validMachine, temperatureC: NaN })
      expect(nanResult.success).toBe(false)
    })
  })

  describe('currentPhase & totalPhases validation', () => {
    it('should reject non-integer currentPhase or totalPhases', () => {
      const invalidCurrent = machineSchema.safeParse({ ...validMachine, currentPhase: 1.5 })
      expect(invalidCurrent.success).toBe(false)

      const invalidTotal = machineSchema.safeParse({ ...validMachine, totalPhases: 5.5 })
      expect(invalidTotal.success).toBe(false)
    })

    it('should reject non-positive currentPhase or totalPhases', () => {
      const zeroCurrent = machineSchema.safeParse({ ...validMachine, currentPhase: 0 })
      expect(zeroCurrent.success).toBe(false)

      const negCurrent = machineSchema.safeParse({ ...validMachine, currentPhase: -1 })
      expect(negCurrent.success).toBe(false)

      const zeroTotal = machineSchema.safeParse({ ...validMachine, totalPhases: 0 })
      expect(zeroTotal.success).toBe(false)

      const negTotal = machineSchema.safeParse({ ...validMachine, totalPhases: -1 })
      expect(negTotal.success).toBe(false)
    })

    it('should reject when currentPhase is greater than totalPhases', () => {
      const result = machineSchema.safeParse({
        ...validMachine,
        currentPhase: 6,
        totalPhases: 5,
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const hasPhaseIssue = result.error.issues.some((issue) =>
          issue.path.includes('currentPhase'),
        )
        expect(hasPhaseIssue).toBe(true)
      }
    })
  })

  describe('elapsedMinutes validation', () => {
    it('should reject negative elapsedMinutes', () => {
      const result = machineSchema.safeParse({ ...validMachine, elapsedMinutes: -0.1 })
      expect(result.success).toBe(false)
    })

    it('should reject non-finite elapsedMinutes', () => {
      const infResult = machineSchema.safeParse({ ...validMachine, elapsedMinutes: Infinity })
      expect(infResult.success).toBe(false)

      const nanResult = machineSchema.safeParse({ ...validMachine, elapsedMinutes: NaN })
      expect(nanResult.success).toBe(false)
    })
  })

  describe('updatedAt validation', () => {
    it('should reject non-ISO date strings', () => {
      const invalidDates = [
        '2026-10-20',
        '20-10-2026',
        'invalid-date',
        '2026/10/20 12:30:00',
        '',
      ]
      for (const date of invalidDates) {
        const result = machineSchema.safeParse({ ...validMachine, updatedAt: date })
        expect(result.success).toBe(false)
      }
    })

    it('should reject non-string updatedAt', () => {
      const result = machineSchema.safeParse({ ...validMachine, updatedAt: 123456789 })
      expect(result.success).toBe(false)
    })
  })

  describe('general validation', () => {
    it('should reject empty objects', () => {
      const result = machineSchema.safeParse({})
      expect(result.success).toBe(false)
    })

    it('should reject null or undefined input', () => {
      expect(machineSchema.safeParse(null).success).toBe(false)
      expect(machineSchema.safeParse(undefined).success).toBe(false)
    })
  })
})
