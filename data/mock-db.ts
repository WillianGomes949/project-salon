import { Establishment } from '@/types/establishment'
import { Service, ServiceCategory, ServiceType } from '@/types/service'
import { Booking, BookingStatus, TimeSlot } from '@/types/booking'
import { Professional } from '@/types/professional'

// Importa os dados
import { barbearias } from './establishments/barbearias'
import { saloesCabelo } from './establishments/saloes-cabelo'
import { saloesUnhas } from './establishments/saloes-unhas'
import { dentistas } from './establishments/dentistas'
import { clinicasEstetica } from './establishments/clinicas-estetica'
import { spas } from './establishments/spas'

import { barbeariaServices } from './services/barbearia-services'
import { salaoCabeloServices } from './services/salao-cabelo-services'
import { salaoUnhasServices } from './services/salao-unhas-services'
import { dentistaServices } from './services/dentista-services'
import { clinicaEsteticaServices } from './services/clinica-estetica-services'
import { spaServices } from './services/spa-services'

// ==================== ESTABELECIMENTOS ====================

const allEstablishments: Establishment[] = [
  ...barbearias,
  ...saloesCabelo,
  ...saloesUnhas,
  ...dentistas,
  ...clinicasEstetica,
  ...spas,
]

// Busca todos os estabelecimentos
export function getAllEstablishments(): Establishment[] {
  return allEstablishments.filter(e => e.isActive)
}

// Busca estabelecimento por slug
export function getEstablishmentBySlug(slug: string): Establishment | undefined {
  return allEstablishments.find(e => e.slug === slug && e.isActive)
}

// Busca estabelecimentos por tipo
export function getEstablishmentsByType(type: ServiceType): Establishment[] {
  return allEstablishments.filter(e => e.type === type && e.isActive)
}

// Busca estabelecimento por ID
export function getEstablishmentById(id: string): Establishment | undefined {
  return allEstablishments.find(e => e.id === id && e.isActive)
}

// ==================== SERVIÇOS ====================

const allServices: Service[] = [
  ...barbeariaServices,
  ...salaoCabeloServices,
  ...salaoUnhasServices,
  ...dentistaServices,
  ...clinicaEsteticaServices,
  ...spaServices,
]

// Busca todos os serviços
export function getAllServices(): Service[] {
  return allServices.filter(s => s.isActive)
}

// Busca serviços por estabelecimento
export function getServicesByEstablishment(establishmentId: string): Service[] {
  return allServices.filter(s => s.establishmentId === establishmentId && s.isActive)
}

// Busca serviço por ID
export function getServiceById(id: string): Service | undefined {
  return allServices.find(s => s.id === id && s.isActive)
}

// Busca serviços por categoria
export function getServicesByCategory(establishmentId: string, categoryId: string): Service[] {
  return allServices.filter(
    s => s.establishmentId === establishmentId && 
         s.category.id === categoryId && 
         s.isActive
  )
}

// ==================== PROFISSIONAIS (Mock) ====================

const mockProfessionals: Professional[] = [
  {
    id: 'prof-001',
    establishmentId: 'barb-001',
    name: 'Carlos Silva',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    bio: 'Especialista em cortes clássicos e barba tradicional. 10 anos de experiência.',
    specialties: ['Cortes Clássicos', 'Barba', 'Degradê'],
    services: ['barb-svc-001', 'barb-svc-004', 'barb-svc-005', 'barb-svc-006'],
    schedule: {
      worksOnWeekends: true,
      worksOnHolidays: false,
      customHours: [
        { dayOfWeek: 1, isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 2, isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 3, isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 4, isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 5, isAvailable: true, startTime: '09:00', endTime: '19:00' },
        { dayOfWeek: 6, isAvailable: true, startTime: '09:00', endTime: '17:00' },
      ],
      timeOff: [],
    },
    isActive: true,
    rating: 4.9,
    reviewCount: 89,
    totalBookings: 567,
    joinedAt: '2020-01-15T10:00:00Z',
  },
  {
    id: 'prof-002',
    establishmentId: 'barb-001',
    name: 'André Santos',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    bio: 'Especialista em cortes modernos e degradê. Atualizado nas últimas tendências.',
    specialties: ['Degradê', 'Navalhado', 'Cortes Modernos'],
    services: ['barb-svc-002', 'barb-svc-003', 'barb-svc-007'],
    schedule: {
      worksOnWeekends: true,
      worksOnHolidays: false,
      customHours: [
        { dayOfWeek: 1, isAvailable: true, startTime: '10:00', endTime: '19:00' },
        { dayOfWeek: 2, isAvailable: true, startTime: '10:00', endTime: '19:00' },
        { dayOfWeek: 3, isAvailable: true, startTime: '10:00', endTime: '19:00' },
        { dayOfWeek: 4, isAvailable: true, startTime: '10:00', endTime: '19:00' },
        { dayOfWeek: 5, isAvailable: true, startTime: '10:00', endTime: '20:00' },
        { dayOfWeek: 6, isAvailable: true, startTime: '10:00', endTime: '18:00' },
      ],
      timeOff: [],
    },
    isActive: true,
    rating: 4.8,
    reviewCount: 67,
    totalBookings: 432,
    joinedAt: '2021-03-10T14:00:00Z',
  },
]

// Busca profissionais por estabelecimento
export function getProfessionalsByEstablishment(establishmentId: string): Professional[] {
  return mockProfessionals.filter(p => p.establishmentId === establishmentId && p.isActive)
}

// Busca profissional por ID
export function getProfessionalById(id: string): Professional | undefined {
  return mockProfessionals.find(p => p.id === id && p.isActive)
}

// ==================== AGENDAMENTOS (Mock) ====================

let mockBookings: Booking[] = []

// Gera horários disponíveis mock
export function getAvailableTimeSlots(
  establishmentId: string,
  professionalId: string,
  date: string,
  durationMinutes: number
): TimeSlot[] {
  const establishment = getEstablishmentById(establishmentId)
  if (!establishment) return []

  const dayOfWeek = new Date(date).getDay()
  const businessHours = establishment.bookingSettings.businessHours.find(b => b.dayOfWeek === dayOfWeek)
  
  if (!businessHours || !businessHours.isOpen) return []

  const slots: TimeSlot[] = []
  const startHour = parseInt(businessHours.openTime.split(':')[0])
  const startMinute = parseInt(businessHours.openTime.split(':')[1])
  const endHour = parseInt(businessHours.closeTime.split(':')[0])
  const endMinute = parseInt(businessHours.closeTime.split(':')[1])
  
  const slotDuration = establishment.bookingSettings.slotDuration

  for (let hour = startHour; hour < endHour || (hour === endHour && startMinute < endMinute); hour++) {
    for (let minute = hour === startHour ? startMinute : 0; minute < 60; minute += slotDuration) {
      if (hour === endHour && minute >= endMinute) break
      
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      
      // Simula alguns horários indisponíveis
      const isAvailable = Math.random() > 0.3
      
      slots.push({
        time: timeString,
        available: isAvailable,
        professionalId,
      })
    }
  }

  return slots
}

// Cria um novo agendamento
export function createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'confirmationCode'>): Booking {
  const newBooking: Booking = {
    ...bookingData,
    id: `booking-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    confirmationCode: generateConfirmationCode(),
  }
  
  mockBookings.push(newBooking)
  return newBooking
}

// Busca agendamento por ID
export function getBookingById(id: string): Booking | undefined {
  return mockBookings.find(b => b.id === id)
}

// Busca agendamentos por email
export function getBookingsByEmail(email: string): Booking[] {
  return mockBookings.filter(b => b.clientEmail === email)
}

// Gera código de confirmação
function generateConfirmationCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

// ==================== HELPERS ====================

// Mapeia tipos de serviço para labels
export const serviceTypeLabels: Record<ServiceType, string> = {
  'barbearia': 'Barbearia',
  'salao-cabelo': 'Salão de Cabelo',
  'salao-unhas': 'Salão de Unhas',
  'dentista': 'Dentista',
  'clinica-estetica': 'Clínica de Estética',
  'spa': 'Spa',
}

// Mapeia tipos de serviço para cores
export const serviceTypeColors: Record<ServiceType, { primary: string; secondary: string }> = {
  'barbearia': { primary: '#8B4513', secondary: '#D2691E' },
  'salao-cabelo': { primary: '#E91E63', secondary: '#F48FB1' },
  'salao-unhas': { primary: '#FF69B4', secondary: '#FFB6C1' },
  'dentista': { primary: '#00BCD4', secondary: '#B2EBF2' },
  'clinica-estetica': { primary: '#9C27B0', secondary: '#E1BEE7' },
  'spa': { primary: '#4CAF50', secondary: '#C8E6C9' },
}

// Mapeia tipos de serviço para ícones (Lucide)
export const serviceTypeIcons: Record<ServiceType, string> = {
  'barbearia': 'scissors',
  'salao-cabelo': 'sparkles',
  'salao-unhas': 'hand',
  'dentista': 'smile',
  'clinica-estetica': 'heart',
  'spa': 'flower-2',
}
