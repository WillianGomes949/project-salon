export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'completed' 
  | 'cancelled' 
  | 'no-show'

export interface Booking {
  id: string
  establishmentId: string
  professionalId: string
  serviceId: string
  userId?: string
  
  // Informações do cliente
  clientName: string
  clientEmail: string
  clientPhone: string
  
  // Data e hora
  date: string // ISO date string (YYYY-MM-DD)
  startTime: string // HH:mm
  endTime: string // HH:mm calculado baseado na duração
  
  // Serviço
  serviceName: string
  servicePrice: number
  durationMinutes: number
  
  // Status
  status: BookingStatus
  notes?: string
  
  // Metadados
  createdAt: string
  updatedAt: string
  
  // Confirmação
  confirmationCode: string
}

export interface TimeSlot {
  time: string // HH:mm
  available: boolean
  professionalId: string
}

export interface AvailabilityDay {
  date: string // YYYY-MM-DD
  slots: TimeSlot[]
  isAvailable: boolean
}

export interface BookingFormData {
  serviceId: string
  professionalId: string
  date: Date
  time: string
  clientName: string
  clientEmail: string
  clientPhone: string
  notes?: string
}
