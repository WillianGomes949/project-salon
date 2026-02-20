'use client'

import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isInitialized, setIsInitialized] = useState(false)

  // Inicializa o valor do localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
    }
    setIsInitialized(true)
  }, [key])

  // Retorna uma versão wrapped do setter do useState que persiste no localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Permite que o valor seja uma função
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // Salva no estado
      setStoredValue(valueToStore)
      
      // Salva no localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}

// Hook específico para persistir dados de agendamento
export function useBookingStorage() {
  const [clientInfo, setClientInfo] = useLocalStorage<{
    name: string
    email: string
    phone: string
  } | null>('booking-client-info', null)

  const [recentBookings, setRecentBookings] = useLocalStorage<string[]>('recent-bookings', [])

  const addRecentBooking = useCallback((bookingId: string) => {
    setRecentBookings(prev => {
      const newBookings = [bookingId, ...prev.filter(id => id !== bookingId)].slice(0, 10)
      return newBookings
    })
  }, [setRecentBookings])

  return {
    clientInfo,
    setClientInfo,
    recentBookings,
    addRecentBooking,
  }
}
