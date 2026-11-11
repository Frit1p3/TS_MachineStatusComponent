import { z } from 'zod'
import { machineSchema, type Machine } from './machine.schema'

const nonEmptyString = z.string().trim().min(1)
const finiteNumber = z.number().finite()
const isoDateTime = z.string().datetime({ offset: true })

export const sensorThresholdSchema = z.object({
  warning: finiteNumber,
  critical: finiteNumber,
})

export const sensorReadingSchema = z.object({
  value: finiteNumber,
  unit: nonEmptyString,
  threshold: sensorThresholdSchema.optional(),
  status: z.enum(['normal', 'warning', 'critical']).optional(),
})

export const alarmSchema = z.object({
  id: nonEmptyString,
  code: nonEmptyString,
  severity: z.enum(['info', 'warning', 'critical']),
  message: nonEmptyString,
  timestamp: isoDateTime,
  acknowledged: z.boolean(),
})

const productionPeriodSchema = z.object({
  partsProduced: z.number().int().min(0),
  target: z.number().int().positive(),
})

export const productionSchema = z.object({
  today: productionPeriodSchema.extend({
    efficiency: finiteNumber.min(0),
    scrapCount: z.number().int().min(0),
    scrapRate: finiteNumber.min(0),
  }),
  shift: productionPeriodSchema.extend({
    currentShift: nonEmptyString,
    startTime: isoDateTime,
  }),
})

export const maintenanceSchema = z.object({
  nextScheduled: isoDateTime,
  lastPerformed: isoDateTime,
  type: nonEmptyString,
  hoursSinceLastMaintenance: finiteNumber.min(0),
  recommendedIntervalHours: finiteNumber.positive(),
})

export const rawMachineApiSchema = z.object({
  id: z.number().int().positive(),
  name: nonEmptyString,
  type: nonEmptyString.optional(),
  manufacturer: nonEmptyString.optional(),
  model: nonEmptyString.optional(),
  serialNumber: nonEmptyString.optional(),
  location: z
    .object({
      facility: nonEmptyString.optional(),
      building: nonEmptyString.optional(),
      line: nonEmptyString.optional(),
      position: nonEmptyString.optional(),
    })
    .optional(),
  status: z.enum(['running', 'stopped', 'maintenance', 'error']),
  statusDetails: z.object({
    currentPhase: z.number().int().positive(),
    totalPhases: z.number().int().positive(),
    elapsedMinutes: finiteNumber.min(0),
    currentMode: nonEmptyString.optional(),
    loadPercentage: finiteNumber.min(0).max(100).optional(),
    uptime: nonEmptyString.optional(),
    uptimeSeconds: finiteNumber.min(0).optional(),
    lastStateChange: isoDateTime.optional(),
  }),
  sensors: z.object({
    temperature: sensorReadingSchema,
    vibration: sensorReadingSchema.optional(),
    pressure: sensorReadingSchema.optional(),
    hydraulicPressure: sensorReadingSchema.optional(),
  }),
  alarms: z.array(alarmSchema).default([]),
  production: productionSchema.optional(),
  maintenance: maintenanceSchema.optional(),
  lastUpdated: isoDateTime,
})

export type RawMachineApi = z.infer<typeof rawMachineApiSchema>
export type MachineAlarm = z.infer<typeof alarmSchema>

function mapApiToMachine(raw: RawMachineApi): Machine {
  return {
    id: raw.id,
    name: raw.name,
    status: raw.status,
    temperatureC: raw.sensors.temperature.value,
    currentPhase: raw.statusDetails.currentPhase,
    totalPhases: raw.statusDetails.totalPhases,
    elapsedMinutes: raw.statusDetails.elapsedMinutes,
    updatedAt: raw.lastUpdated,
  }
}

export function transformApiToMachine(raw: RawMachineApi): Machine {
  return machineSchema.parse(mapApiToMachine(raw))
}

export type MachineApiParseResult =
  | { success: true; data: Machine; raw: RawMachineApi }
  | {
      success: false
      error: z.ZodError
      stage: 'api_schema' | 'domain_schema'
    }

export function parseAndTransformMachineApi(input: unknown): MachineApiParseResult {
  const apiParseResult = rawMachineApiSchema.safeParse(input)
  if (!apiParseResult.success) {
    return {
      success: false,
      error: apiParseResult.error,
      stage: 'api_schema',
    }
  }

  const domainParseResult = machineSchema.safeParse(
    mapApiToMachine(apiParseResult.data),
  )
  if (!domainParseResult.success) {
    return {
      success: false,
      error: domainParseResult.error,
      stage: 'domain_schema',
    }
  }

  return {
    success: true,
    data: domainParseResult.data,
    raw: apiParseResult.data,
  }
}
