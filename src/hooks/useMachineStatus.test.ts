import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useMachineStatus } from './useMachineStatus'

describe('useMachineStatus hook', () => {
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

  it('doit charger automatiquement les données au montage', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => validApiPayload,
    } as Response)

    const { result } = renderHook(() =>
      useMachineStatus({
        endpoint: '/api/machine.json',
        autoFetch: true,
      })
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data?.name).toBe('Presse composite A-12')
    expect(result.current.data?.temperatureC).toBe(178)
    expect(result.current.error).toBeNull()
    expect(result.current.lastFetchedAt).not.toBeNull()
  })

  it('doit positionner un état d\'erreur lors d\'une défaillance HTTP 500', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Server Error',
    } as Response)

    const { result } = renderHook(() =>
      useMachineStatus({
        endpoint: '/api/machine.json',
        autoFetch: true,
      })
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).not.toBeNull()
    expect(result.current.error?.type).toBe('HTTP')
    expect(result.current.error?.status).toBe(500)
    expect(result.current.data).toBeNull()
  })

  it('doit permettre de rafraîchir manuellement les données via refetch', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => validApiPayload,
    } as Response)

    const { result } = renderHook(() =>
      useMachineStatus({
        endpoint: '/api/machine.json',
        autoFetch: true,
      })
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    const initialFetchCount = vi.mocked(globalThis.fetch).mock.calls.length
    expect(initialFetchCount).toBeGreaterThanOrEqual(1)

    // Déclencher un refetch
    await act(async () => {
      await result.current.refetch()
    })

    expect(vi.mocked(globalThis.fetch).mock.calls.length).toBe(initialFetchCount + 1)
  })

  it('doit exécuter le polling périodique quand isPolling est activé', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => validApiPayload,
    } as Response)

    const { result } = renderHook(() =>
      useMachineStatus({
        endpoint: '/api/machine.json',
        autoFetch: true,
        pollingInterval: 100,
        defaultPolling: false,
      })
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(globalThis.fetch).toHaveBeenCalledTimes(1)

    // Activer le polling
    act(() => {
      result.current.setIsPolling(true)
    })

    // Attendre que le polling effectue un nouvel appel
    await waitFor(
      () => {
        expect(vi.mocked(globalThis.fetch).mock.calls.length).toBeGreaterThanOrEqual(2)
      },
      { timeout: 1000 }
    )
  })

  it('doit ignorer une réponse obsolète après un changement d endpoint', async () => {
    let resolveFirst: ((value: Response) => void) | undefined
    let resolveSecond: ((value: Response) => void) | undefined
    const firstResponse = new Promise<Response>((resolve) => { resolveFirst = resolve })
    const secondResponse = new Promise<Response>((resolve) => { resolveSecond = resolve })

    globalThis.fetch = vi
      .fn()
      .mockReturnValueOnce(firstResponse)
      .mockReturnValueOnce(secondResponse)

    const { result, rerender } = renderHook(
      ({ endpoint }) => useMachineStatus({ endpoint }),
      { initialProps: { endpoint: '/api/first.json' } },
    )

    rerender({ endpoint: '/api/second.json' })

    resolveSecond?.({
      ok: true,
      status: 200,
      json: async () => ({ ...validApiPayload, id: 2, name: 'Machine récente' }),
    } as Response)

    await waitFor(() => expect(result.current.data?.name).toBe('Machine récente'))

    resolveFirst?.({
      ok: true,
      status: 200,
      json: async () => ({ ...validApiPayload, id: 1, name: 'Machine obsolète' }),
    } as Response)

    await act(async () => { await firstResponse })
    expect(result.current.data?.name).toBe('Machine récente')
    expect(result.current.isLoading).toBe(false)
  })
})
