'use client'

import { useState, useEffect } from 'react'
import { Service, ServiceCategory } from '@/types/service'
import { getServicesByEstablishment, getServiceById } from '@/data/mock-db'
import { 
  barbeariaServices, 
  barbeariaCategories,
  salaoCabeloServices,
  salaoCabeloCategories,
  salaoUnhasServices,
  salaoUnhasCategories,
  dentistaServices,
  dentistaCategories,
  clinicaEsteticaServices,
  clinicaEsteticaCategories,
  spaServices,
  spaCategories,
} from '@/data'
import { ServiceType } from '@/types/service'

interface UseServicesReturn {
  services: Service[]
  categories: ServiceCategory[]
  isLoading: boolean
  error: string | null
}

const servicesByType: Record<ServiceType, { services: Service[]; categories: ServiceCategory[] }> = {
  barbearia: { services: barbeariaServices, categories: barbeariaCategories },
  'salao-cabelo': { services: salaoCabeloServices, categories: salaoCabeloCategories },
  'salao-unhas': { services: salaoUnhasServices, categories: salaoUnhasCategories },
  dentista: { services: dentistaServices, categories: dentistaCategories },
  'clinica-estetica': { services: clinicaEsteticaServices, categories: clinicaEsteticaCategories },
  spa: { services: spaServices, categories: spaCategories },
}

export function useServices(establishmentId: string): UseServicesReturn {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      setIsLoading(true)
      setError(null)

      try {
        // Simula delay de API
        await new Promise(resolve => setTimeout(resolve, 300))

        const data = getServicesByEstablishment(establishmentId)
        setServices(data)

        // Extrai categorias únicas
        const uniqueCategories = Array.from(
          new Map(data.map(s => [s.category.id, s.category])).values()
        ).sort((a, b) => a.order - b.order)

        setCategories(uniqueCategories)
      } catch (err) {
        setError('Erro ao carregar serviços')
        console.error('Services error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (establishmentId) {
      fetchServices()
    }
  }, [establishmentId])

  return { services, categories, isLoading, error }
}

export function useService(serviceId: string) {
  const [service, setService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchService() {
      setIsLoading(true)
      setError(null)

      try {
        await new Promise(resolve => setTimeout(resolve, 200))
        const data = getServiceById(serviceId)
        
        if (data) {
          setService(data)
        } else {
          setError('Serviço não encontrado')
        }
      } catch (err) {
        setError('Erro ao carregar serviço')
        console.error('Service error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (serviceId) {
      fetchService()
    }
  }, [serviceId])

  return { service, isLoading, error }
}

export function useServicesByType(type: ServiceType): UseServicesReturn {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      setIsLoading(true)
      setError(null)

      try {
        await new Promise(resolve => setTimeout(resolve, 200))
        
        const data = servicesByType[type]
        if (data) {
          setServices(data.services)
          setCategories(data.categories)
        }
      } catch (err) {
        setError('Erro ao carregar serviços')
        console.error('Services error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [type])

  return { services, categories, isLoading, error }
}
