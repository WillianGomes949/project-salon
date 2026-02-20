import { ServiceType } from './service'

export interface Professional {
  id: string
  establishmentId: string
  
  // Informações pessoais
  name: string
  avatarUrl?: string
  bio?: string
  specialties: string[]
  
  // Documentos
  documentNumber?: string // CPF/CNPJ
  professionalLicense?: string // Número do conselho (CRM, CRO, etc)
  
  // Configurações
  services: string[] // IDs dos serviços que atende
  schedule: ProfessionalSchedule
  
  // Status
  isActive: boolean
  
  // Estatísticas
  rating: number
  reviewCount: number
  totalBookings: number
  
  // Metadados
  joinedAt: string
}

export interface ProfessionalSchedule {
  worksOnWeekends: boolean
  worksOnHolidays: boolean
  customHours: CustomHours[]
  timeOff: TimeOffPeriod[]
}

export interface CustomHours {
  dayOfWeek: number // 0-6
  isAvailable: boolean
  startTime: string // HH:mm
  endTime: string // HH:mm
}

export interface TimeOffPeriod {
  startDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
  reason?: string
}

export interface ProfessionalReview {
  id: string
  professionalId: string
  bookingId: string
  userId?: string
  clientName: string
  rating: number // 1-5
  comment?: string
  createdAt: string
  isVerified: boolean
}
