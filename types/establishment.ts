import { ServiceType } from './service'

export interface Establishment {
  id: string
  slug: string
  name: string
  type: ServiceType
  
  // Branding
  logoUrl?: string
  primaryColor?: string
  secondaryColor?: string
  
  // Descrição
  description: string
  shortDescription: string
  
  // Contato
  phone: string
  whatsapp?: string
  email: string
  website?: string
  
  // Endereço
  address: Address
  
  // Redes sociais
  socialMedia?: SocialMedia
  
  // Configurações de agendamento
  bookingSettings: BookingSettings
  
  // Imagens
  images: EstablishmentImages
  
  // Status
  isActive: boolean
  isVerified: boolean
  
  // Metadados
  createdAt: string
  updatedAt: string
  
  // Estatísticas
  rating: number
  reviewCount: number
  totalBookings: number
}

export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
  latitude?: number
  longitude?: number
}

export interface SocialMedia {
  instagram?: string
  facebook?: string
  twitter?: string
  youtube?: string
  tiktok?: string
}

export interface BookingSettings {
  advanceBookingDays: number // Quantos dias no futuro pode agendar
  minHoursBeforeBooking: number // Mínimo de horas antes para agendar
  slotDuration: number // Duração padrão dos slots em minutos
  allowSameDayBooking: boolean
  autoConfirm: boolean
  cancellationPolicy: string
  businessHours: BusinessHours[]
}

export interface BusinessHours {
  dayOfWeek: number // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  isOpen: boolean
  openTime: string // HH:mm
  closeTime: string // HH:mm
  breakStart?: string // HH:mm (opcional)
  breakEnd?: string // HH:mm (opcional)
}

export interface EstablishmentImages {
  hero?: string
  gallery: string[]
  cover?: string
}
