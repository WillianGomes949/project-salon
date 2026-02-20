export type ServiceType = 
  | 'barbearia' 
  | 'salao-cabelo' 
  | 'salao-unhas' 
  | 'dentista' 
  | 'clinica-estetica' 
  | 'spa'

export interface Service {
  id: string
  name: string
  description: string
  price: number
  durationMinutes: number
  category: ServiceCategory
  imageUrl?: string
  isActive: boolean
  establishmentId: string
}

export interface ServiceCategory {
  id: string
  name: string
  description?: string
  icon?: string
  order: number
}

export interface ServicePackage {
  id: string
  name: string
  description: string
  services: Service[]
  totalPrice: number
  discountPercentage: number
  establishmentId: string
}
