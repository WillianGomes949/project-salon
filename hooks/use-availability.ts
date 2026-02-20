'use client'

import { useState, useEffect, useCallback } from 'react'
import { TimeSlot, AvailabilityDay } from '@/types/booking'
import { getAvailableTimeSlots } from '@/data/mock-db'

interface UseAvailabilityReturn {
  timeSlots: TimeSlot[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useAvailability(
  establishmentId: string | null,
  professionalId: string | null,
  date: Date | null,
  durationMinutes: number
): UseAvailabilityReturn {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAvailability = useCallback(async () => {
    if (!establishmentId || !professionalId || !date) {
      setTimeSlots([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 500))

      const dateString = date.toISOString().split('T')[0]
      const slots = getAvailableTimeSlots(
        establishmentId,
        professionalId,
        dateString,
        durationMinutes
      )

      setTimeSlots(slots)
    } catch (err) {
      setError('Erro ao buscar horários disponíveis.')
      console.error('Availability error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [establishmentId, professionalId, date, durationMinutes])

  useEffect(() => {
    fetchAvailability()
  }, [fetchAvailability])

  return {
    timeSlots,
    isLoading,
    error,
    refetch: fetchAvailability,
  }
}
