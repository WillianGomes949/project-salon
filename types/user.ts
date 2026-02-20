export type UserRole = 'client' | 'professional' | 'admin' | 'superadmin'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatarUrl?: string
  role: UserRole
  
  // Preferências
  preferences: UserPreferences
  
  // Metadados
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
  
  // Verificação
  isEmailVerified: boolean
  isPhoneVerified: boolean
}

export interface UserPreferences {
  notifications: NotificationPreferences
  language: string
  timezone: string
  currency: string
}

export interface NotificationPreferences {
  email: boolean
  sms: boolean
  whatsapp: boolean
  push: boolean
  reminderHours: number // Horas antes para enviar lembrete
}

export interface Client extends User {
  role: 'client'
  favoriteEstablishments: string[]
  bookingHistory: string[] // IDs dos agendamentos
}
