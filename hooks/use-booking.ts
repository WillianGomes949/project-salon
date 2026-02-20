'use client'

import { useState, useCallback } from 'react'
import { BookingFormData, Booking } from '@/types/booking'
import { Service } from '@/types/service'
import { createBooking } from '@/data/mock-db'

interface UseBookingReturn {
  booking: Booking | null
  isLoading: boolean
  error: string | null
  createNewBooking: (data: BookingFormData & { 
    establishmentId: string
    service: Service 
  }) => Promise<void>
  reset: () => void
}

export function useBooking(): UseBookingReturn {
  const [booking, setBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createNewBooking = useCallback(async ({
    establishmentId,
    service,
    professionalId,
    date,
    time,
    clientName,
    clientEmail,
    clientPhone,
    notes,
  }: BookingFormData & { 
    establishmentId: string
    service: Service 
  }) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Calcula horário de término
      const [hours, minutes] = time.split(':').map(Number)
      const endDate = new Date(date)
      endDate.setHours(hours, minutes + service.durationMinutes)
      const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`

      const newBooking = createBooking({
        establishmentId,
        professionalId,
        serviceId: service.id,
        clientName,
        clientEmail,
        clientPhone,
        date: date.toISOString().split('T')[0],
        startTime: time,
        endTime,
        serviceName: service.name,
        servicePrice: service.price,
        durationMinutes: service.durationMinutes,
        status: 'confirmed',
        notes: notes || '',
      })

      setBooking(newBooking)
    } catch (err) {
      setError('Erro ao criar agendamento. Tente novamente.')
      console.error('Booking error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setBooking(null)
    setError(null)
    setIsLoading(false)
  }, [])

  return {
    booking,
    isLoading,
    error,
    createNewBooking,
    reset,
  }
}
