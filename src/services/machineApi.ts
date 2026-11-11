import { z } from 'zod'
import {
  parseAndTransformMachineApi,
  type RawMachineApi,
} from '../schemas/machine-api.schema'
import type { Machine } from '../schemas/machine.schema'

export interface MachineApiError {
  type: 'NETWORK' | 'HTTP' | 'VALIDATION' | 'ABORTED'
  message: string
  status?: number
  issues?: z.ZodIssue[]
  stage?: 'api_schema' | 'domain_schema'
}

function isAbortError(error: unknown): boolean {
  return (
    error instanceof Error && error.name === 'AbortError'
  ) || (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    error.name === 'AbortError'
  )
}

export interface FetchMachineResult {
  data: Machine
  raw: RawMachineApi
}

export interface FetchMachineOptions {
  signal?: AbortSignal
  endpoint?: string
}

export async function fetchMachineStatus(
  options: FetchMachineOptions = {}
): Promise<FetchMachineResult> {
  const { signal, endpoint = '/api/machine.json' } = options

  let response: Response
  try {
    response = await fetch(endpoint, {
      signal,
      headers: {
        Accept: 'application/json',
      },
    })
  } catch (err: unknown) {
    if (isAbortError(err)) {
      const abortError: MachineApiError = {
        type: 'ABORTED',
        message: 'La requête a été annulée.',
      }
      throw abortError
    }

    const networkError: MachineApiError = {
      type: 'NETWORK',
      message:
        err instanceof Error
          ? `Erreur réseau : ${err.message}`
          : 'Impossible de joindre le serveur API.',
    }
    throw networkError
  }

  if (!response.ok) {
    const httpError: MachineApiError = {
      type: 'HTTP',
      status: response.status,
      message: `Erreur HTTP ${response.status} : ${response.statusText || 'Échec de la requête'}`,
    }
    throw httpError
  }

  let rawJson: unknown
  try {
    rawJson = await response.json()
  } catch {
    const parseError: MachineApiError = {
      type: 'VALIDATION',
      message: 'Le corps de la réponse n\'est pas un JSON valide.',
    }
    throw parseError
  }

  const validation = parseAndTransformMachineApi(rawJson)
  if (!validation.success) {
    const validationError: MachineApiError = {
      type: 'VALIDATION',
      message:
        validation.stage === 'api_schema'
          ? 'Le contrat de données de l\'API est invalide ou incomplet.'
          : 'Les données reçues violent les règles métier du composant.',
      issues: validation.error.issues,
      stage: validation.stage,
    }
    throw validationError
  }

  return {
    data: validation.data,
    raw: validation.raw,
  }
}
