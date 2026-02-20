import { ServiceType } from '@/types/service'
import { serviceTypeLabels, serviceTypeColors, serviceTypeIcons } from '@/data/mock-db'

// Obtém label do tipo de serviço
export function getServiceTypeLabel(type: ServiceType): string {
  return serviceTypeLabels[type] || type
}

// Obtém cores do tipo de serviço
export function getServiceTypeColors(type: ServiceType): { primary: string; secondary: string } {
  return serviceTypeColors[type] || { primary: '#666', secondary: '#999' }
}

// Obtém ícone do tipo de serviço
export function getServiceTypeIcon(type: ServiceType): string {
  return serviceTypeIcons[type] || 'circle'
}

// Gera URL amigável
export function generateServiceUrl(type: ServiceType, slug: string): string {
  return `/${type}/${slug}`
}

// Parse de URL para obter tipo e slug
export function parseServiceUrl(url: string): { type: ServiceType | null; slug: string | null } {
  const parts = url.split('/').filter(Boolean)
  
  if (parts.length >= 2) {
    const type = parts[0] as ServiceType
    const slug = parts[1]
    return { type, slug }
  }
  
  return { type: null, slug: null }
}

// Agrupa serviços por categoria
export function groupServicesByCategory<T extends { category: { id: string; name: string; order: number } }>(
  services: T[]
): Record<string, T[]> {
  return services.reduce((acc, service) => {
    const categoryId = service.category.id
    if (!acc[categoryId]) {
      acc[categoryId] = []
    }
    acc[categoryId].push(service)
    return acc
  }, {} as Record<string, T[]>)
}

// Ordena categorias
export function sortCategories<T extends { order: number }>(categories: T[]): T[] {
  return [...categories].sort((a, b) => a.order - b.order)
}

// Calcula tempo total de serviços
export function calculateTotalDuration(services: { durationMinutes: number }[]): number {
  return services.reduce((total, service) => total + service.durationMinutes, 0)
}

// Calcula preço total de serviços
export function calculateTotalPrice(services: { price: number }[]): number {
  return services.reduce((total, service) => total + service.price, 0)
}

// Formata duração em minutos para exibição
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) {
    return hours === 1 ? '1 hora' : `${hours} horas`
  }
  
  return `${hours}h ${remainingMinutes}min`
}

// Obtém serviços populares (mock)
export function getPopularServices(services: { totalBookings?: number }[]): typeof services {
  return [...services]
    .sort((a, b) => (b.totalBookings || 0) - (a.totalBookings || 0))
    .slice(0, 5)
}

// Filtra serviços ativos
export function filterActiveServices<T extends { isActive: boolean }>(services: T[]): T[] {
  return services.filter(s => s.isActive)
}

// Busca serviços por termo
export function searchServices<T extends { name: string; description?: string }>(
  services: T[],
  searchTerm: string
): T[] {
  const term = searchTerm.toLowerCase().trim()
  
  if (!term) return services
  
  return services.filter(
    service =>
      service.name.toLowerCase().includes(term) ||
      service.description?.toLowerCase().includes(term)
  )
}
