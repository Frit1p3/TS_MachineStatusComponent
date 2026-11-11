import { useState, useEffect, useCallback, useRef } from 'react'
import {
  fetchMachineStatus,
  type FetchMachineResult,
  type MachineApiError,
} from '../services/machineApi'
import type { Machine } from '../schemas/machine.schema'
import type { RawMachineApi } from '../schemas/machine-api.schema'

export interface UseMachineStatusOptions {
  endpoint?: string
  autoFetch?: boolean
  pollingInterval?: number
  defaultPolling?: boolean
  onSuccess?: (result: FetchMachineResult) => void
  onError?: (error: MachineApiError) => void
}

export interface UseMachineStatusReturn {
  data: Machine | null
  rawApiData: RawMachineApi | null
  isLoading: boolean
  isRefetching: boolean
  error: MachineApiError | null
  lastFetchedAt: Date | null
  refetch: () => Promise<void>
  isPolling: boolean
  setIsPolling: (isPolling: boolean | ((prev: boolean) => boolean)) => void
}

export function useMachineStatus(
  options: UseMachineStatusOptions = {}
): UseMachineStatusReturn {
  const {
    endpoint = '/api/machine.json',
    autoFetch = true,
    pollingInterval = 5000,
    defaultPolling = false,
    onSuccess,
    onError,
  } = options

  const [data, setData] = useState<Machine | null>(null)
  const [rawApiData, setRawApiData] = useState<RawMachineApi | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(autoFetch)
  const [isRefetching, setIsRefetching] = useState<boolean>(false)
  const [error, setError] = useState<MachineApiError | null>(null)
  const [lastFetchedAt, setLastFetchedAt] = useState<Date | null>(null)
  const [isPolling, setIsPolling] = useState<boolean>(defaultPolling)

  const abortControllerRef = useRef<AbortController | null>(null)
  const isMountedRef = useRef<boolean>(true)
  const requestIdRef = useRef(0)
  const hasDataRef = useRef(false)

  // Callbacks refs to avoid re-triggering effects
  const onSuccessRef = useRef(onSuccess)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    onSuccessRef.current = onSuccess
    onErrorRef.current = onError
  }, [onError, onSuccess])

  const performFetch = useCallback(
    async (isManualRefetch = false) => {
      // Annuler la requête précédente si elle est encore active
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      const controller = new AbortController()
      abortControllerRef.current = controller
      const requestId = ++requestIdRef.current

      if (isManualRefetch) {
        setIsRefetching(true)
      } else if (!hasDataRef.current) {
        setIsLoading(true)
      }

      try {
        const result = await fetchMachineStatus({
          endpoint,
          signal: controller.signal,
        })

        if (!isMountedRef.current || requestId !== requestIdRef.current) return

        setData(result.data)
        hasDataRef.current = true
        setRawApiData(result.raw)
        setError(null)
        setLastFetchedAt(new Date())

        onSuccessRef.current?.(result)
      } catch (err: unknown) {
        if (!isMountedRef.current || requestId !== requestIdRef.current) return

        const apiError = err as MachineApiError
        // Ne pas écraser l'état si l'erreur est juste une annulation normale
        if (apiError.type !== 'ABORTED') {
          setError(apiError)
          onErrorRef.current?.(apiError)
        }
      } finally {
        if (isMountedRef.current && requestId === requestIdRef.current) {
          setIsLoading(false)
          setIsRefetching(false)
          abortControllerRef.current = null
        }
      }
    },
    [endpoint]
  )

  const refetch = useCallback(async () => {
    await performFetch(true)
  }, [performFetch])

  // Cycle de vie global : invalide toutes les réponses après démontage.
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      requestIdRef.current += 1
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  // Chargement initial ou changement d'endpoint.
  useEffect(() => {
    if (autoFetch) {
      // Le chargement est asynchrone ; performFetch gère les mises à jour après la réponse.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      performFetch(false)
    }
  }, [autoFetch, performFetch])

  // Gestion du polling périodique
  useEffect(() => {
    if (!isPolling || pollingInterval <= 0) return

    const intervalId = setInterval(() => {
      performFetch(false)
    }, pollingInterval)

    return () => {
      clearInterval(intervalId)
    }
  }, [isPolling, pollingInterval, performFetch])

  return {
    data,
    rawApiData,
    isLoading,
    isRefetching,
    error,
    lastFetchedAt,
    refetch,
    isPolling,
    setIsPolling,
  }
}
