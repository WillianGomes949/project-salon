'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, Clock, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Service {
  id: string
  name: string
  price: number
  durationMinutes: number
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  establishmentId: string
  services: Service[]
  preSelectedServiceId?: string | null
}

export function BookingModal({ 
  isOpen, 
  onClose, 
  establishmentId, 
  services,
  preSelectedServiceId 
}: BookingModalProps) {
  const [selectedService, setSelectedService] = useState<string>(preSelectedServiceId || '')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  
  const [isLoadingTimes, setIsLoadingTimes] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Busca os horários livres quando a data e o serviço mudam
  useEffect(() => {
    if (!selectedDate || !selectedService) return

    const fetchAvailability = async () => {
      setIsLoadingTimes(true)
      try {
        // Chama a sua rota de API
        const response = await fetch(
          `/api/availability?establishmentId=${establishmentId}&date=${selectedDate}&serviceId=${selectedService}`
        )
        if (response.ok) {
          const data = await response.json()
          // Supondo que a sua API retorna { availableTimes: ['09:00', '09:30', ...] }
          setAvailableTimes(data.availableTimes || [])
        }
      } catch (error) {
        console.error("Erro ao buscar horários", error)
      } finally {
        setIsLoadingTimes(false)
      }
    }

    fetchAvailability()
  }, [selectedDate, selectedService, establishmentId])

  const handleBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return

    setIsSubmitting(true)
    try {
      // Envia os dados para a sua rota de criação de agendamento
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          establishmentId,
          serviceId: selectedService,
          date: selectedDate,
          time: selectedTime,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setTimeout(() => {
          onClose()
          setIsSuccess(false)
          // Resetar formulário
          setSelectedDate('')
          setSelectedTime('')
        }, 3000)
      } else {
        alert("Erro ao realizar agendamento. Tente novamente.")
      }
    } catch (error) {
      console.error("Erro ao agendar", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative">
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Novo Agendamento</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Agendamento Confirmado!</h3>
              <p className="text-gray-600">Seu horário foi reservado com sucesso.</p>
            </div>
          ) : (
            <>
              {/* Seleção de Serviço */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Selecione o Serviço</label>
                <select 
                  className="w-full p-2.5 border rounded-lg bg-gray-50"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="">Escolha um serviço...</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.name} - R$ {s.price}</option>
                  ))}
                </select>
              </div>

              {/* Seleção de Data */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  Data
                </label>
                <input 
                  type="date" 
                  className="w-full p-2.5 border rounded-lg bg-gray-50"
                  min={new Date().toISOString().split('T')[0]} // Impede datas passadas
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value)
                    setSelectedTime('') // Reseta o horário ao mudar a data
                  }}
                />
              </div>

              {/* Seleção de Horário */}
              {selectedDate && selectedService && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    Horários Disponíveis
                  </label>
                  
                  {isLoadingTimes ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                    </div>
                  ) : availableTimes.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {availableTimes.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-3 text-sm rounded-lg border transition-all ${
                            selectedTime === time 
                              ? 'bg-blue-600 text-white border-blue-600' 
                              : 'bg-white text-gray-700 hover:border-blue-500'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-red-500 mt-2">Nenhum horário disponível nesta data.</p>
                  )}
                </div>
              )}

              {/* Botão de Confirmar */}
              <Button 
                className="w-full mt-4" 
                onClick={handleBooking}
                disabled={!selectedTime || isSubmitting}
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                {isSubmitting ? 'Confirmando...' : 'Confirmar Agendamento'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}