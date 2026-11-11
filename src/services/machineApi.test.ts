import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchMachineStatus } from './machineApi'

describe('machineApi service', () => {
  const originalFetch = globalThis.fetch

  const validApiPayload = {
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

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('doit récupérer et valider avec succès des données conformes (200 OK)', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => validApiPayload,
    } as unknown as Response)

    const result = await fetchMachineStatus()
    expect(result.data.name).toBe('Presse composite A-12')
    expect(result.data.temperatureC).toBe(178)
    expect(result.raw.id).toBe(12)
  })

  it('doit lever une erreur HTTP 404', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as unknown as Response)

    await expect(fetchMachineStatus({ endpoint: '/api/unknown.json' })).rejects.toMatchObject({
      type: 'HTTP',
      status: 404,
      message: expect.stringContaining('404'),
    })
  })

  it('doit lever une erreur HTTP 500', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as Response)

    await expect(fetchMachineStatus()).rejects.toMatchObject({
      type: 'HTTP',
      status: 500,
      message: expect.stringContaining('500'),
    })
  })

  it('doit gérer les erreurs de connexion réseau', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch'))

    await expect(fetchMachineStatus()).rejects.toMatchObject({
      type: 'NETWORK',
      message: expect.stringContaining('Failed to fetch'),
    })
  })

  it('doit gérer les annulations de requêtes (AbortError)', async () => {
    const abortError = new DOMException('The user aborted a request.', 'AbortError')
    globalThis.fetch = vi.fn().mockRejectedValue(abortError)

    await expect(fetchMachineStatus()).rejects.toMatchObject({
      type: 'ABORTED',
      message: 'La requête a été annulée.',
    })
  })

  it('doit lever une erreur de validation si le corps n\'est pas un JSON valide', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => {
        throw new SyntaxError('Unexpected token < in JSON')
      },
    } as unknown as Response)

    await expect(fetchMachineStatus()).rejects.toMatchObject({
      type: 'VALIDATION',
      message: expect.stringContaining('JSON valide'),
    })
  })

  it('doit lever une erreur de validation si la structure API est incomplète', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        id: 12,
        name: 'Presse composite A-12',
        // sensors manquant
      }),
    } as Response)

    await expect(fetchMachineStatus()).rejects.toMatchObject({
      type: 'VALIDATION',
      stage: 'api_schema',
      issues: expect.any(Array),
    })
  })

  it('doit lever une erreur de validation si une règle de domaine est enfreinte', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        ...validApiPayload,
        statusDetails: {
          ...validApiPayload.statusDetails,
          currentPhase: 9,
          totalPhases: 5,
        },
      }),
    } as Response)

    await expect(fetchMachineStatus()).rejects.toMatchObject({
      type: 'VALIDATION',
      stage: 'domain_schema',
      issues: expect.any(Array),
    })
  })
})
