'use client'

import { useState, useEffect, useCallback } from 'react'
import { Establishment } from '@/types/establishment'
import { ServiceType } from '@/types/service'
import { getEstablishmentBySlug, getEstablishmentsByType, getAllEstablishments } from '@/data/mock-db'

interface UseEstablishmentReturn {
  establishment: Establishment | null
  isLoading: boolean
  error: string | null
}

export function useEstablishment(slug: string): UseEstablishmentReturn {
  const [establishment, setEstablishment] = useState<Establishment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEstablishment() {
      setIsLoading(true)
      setError(null)

      try {
        // Simula delay de API
        await new Promise(resolve => setTimeout(resolve, 300))

        const data = getEstablishmentBySlug(slug)
        
        if (data) {
          setEstablishment(data)
        } else {
          setError('Estabelecimento não encontrado')
        }
      } catch (err) {
        setError('Erro ao carregar estabelecimento')
        console.error('Establishment error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchEstablishment()
    }
  }, [slug])

  return { establishment, isLoading, error }
}

interface UseEstablishmentsReturn {
  establishments: Establishment[]
  isLoading: boolean
  error: string | null
}

export function useEstablishments(type?: ServiceType): UseEstablishmentsReturn {
  const [establishments, setEstablishments] = useState<Establishment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEstablishments() {
      setIsLoading(true)
      setError(null)

      try {
        // Simula delay de API
        await new Promise(resolve => setTimeout(resolve, 300))

        const data = type 
          ? getEstablishmentsByType(type)
          : getAllEstablishments()

        setEstablishments(data)
      } catch (err) {
        setError('Erro ao carregar estabelecimentos')
        console.error('Establishments error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEstablishments()
  }, [type])

  return { establishments, isLoading, error }
}
