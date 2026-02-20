'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, Clock, Loader2, CheckCircle2, User, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Service {
  id: string
  name: string
  price: number
  durationMinutes: number
}

interface Professional {
  id: string
  name: string
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  establishmentId: string
  services: Service[]
  professionals: Professional[] // Adicionado
  preSelectedServiceId?: string | null
}

export function BookingModal({ 
  isOpen, 
  onClose, 
  establishmentId, 
  services,
  professionals,
  preSelectedServiceId 
}: BookingModalProps) {
  // Estados de Seleção
  const [selectedService, setSelectedService] = useState<string>(preSelectedServiceId || '')
  const [selectedProfessional, setSelectedProfessional] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  
  // Estados do Cliente
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')

  // Estados de UI
  const [isLoadingTimes, setIsLoadingTimes] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Busca os horários livres quando a data, serviço ou profissional mudam
  useEffect(() => {
    if (!selectedDate || !selectedService || !selectedProfessional) {
      setAvailableTimes([])
      return
    }

    const fetchAvailability = async () => {
      setIsLoadingTimes(true)
      try {
        // Envia o professionalId para a rota (como exigido no mock-db)
        const response = await fetch(
          `/api/availability?establishmentId=${establishmentId}&date=${selectedDate}&serviceId=${selectedService}&professionalId=${selectedProfessional}`
        )
        if (response.ok) {
          const data = await response.json()
          setAvailableTimes(data.availableTimes || [])
        } else {
          setAvailableTimes([])
        }
      } catch (error) {
        console.error("Erro ao buscar horários", error)
        setAvailableTimes([])
      } finally {
        setIsLoadingTimes(false)
      }
    }

    fetchAvailability()
  }, [selectedDate, selectedService, selectedProfessional, establishmentId])

  const handleBooking = async () => {
    if (!selectedService || !selectedProfessional || !selectedDate || !selectedTime || !clientName || !clientEmail || !clientPhone) {
      alert("Por favor, preencha todos os campos.")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          establishmentId,
          serviceId: selectedService,
          professionalId: selectedProfessional,
          date: selectedDate,
          time: selectedTime,
          clientName,
          clientEmail,
          clientPhone
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
          setClientName('')
          setClientEmail('')
          setClientPhone('')
        }, 3000)
      } else {
        const errorData = await response.json()
        alert(`Erro: ${errorData.error || "Tente novamente."}`)
      }
    } catch (error) {
      console.error("Erro ao agendar", error)
      alert("Erro de conexão. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  // Validação para habilitar o botão
  const isFormValid = selectedService && selectedProfessional && selectedDate && selectedTime && clientName && clientEmail && clientPhone

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        {/* Cabeçalho do Modal */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b">
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
              {/* Seleção de Serviço e Profissional */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Serviço</label>
                  <select 
                    className="w-full p-2.5 border rounded-lg bg-gray-50"
                    value={selectedService}
                    onChange={(e) => {
                      setSelectedService(e.target.value)
                      setSelectedTime('')
                    }}
                  >
                    <option value="">Escolha um serviço...</option>
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.name} - R$ {s.price}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Profissional</label>
                  <select 
                    className="w-full p-2.5 border rounded-lg bg-gray-50"
                    value={selectedProfessional}
                    onChange={(e) => {
                      setSelectedProfessional(e.target.value)
                      setSelectedTime('')
                    }}
                  >
                    <option value="">Escolha um profissional...</option>
                    {professionals.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dados do Cliente */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-semibold text-gray-900">Seus Dados</h3>
                
                <div className="space-y-2">
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Seu nome completo"
                      className="w-full p-2.5 pl-9 border rounded-lg bg-gray-50 text-sm"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="email" 
                      placeholder="Seu e-mail"
                      className="w-full p-2.5 pl-9 border rounded-lg bg-gray-50 text-sm"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="tel" 
                      placeholder="Seu WhatsApp/Telefone"
                      className="w-full p-2.5 pl-9 border rounded-lg bg-gray-50 text-sm"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Seleção de Data e Hora */}
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    Data do Agendamento
                  </label>
                  <input 
                    type="date" 
                    className="w-full p-2.5 border rounded-lg bg-gray-50"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value)
                      setSelectedTime('')
                    }}
                  />
                </div>

                {selectedDate && selectedService && selectedProfessional && (
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
                      <p className="text-sm text-red-500 mt-2">Nenhum horário disponível nesta data para este profissional.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Botão de Confirmar */}
              <Button 
                className="w-full mt-6" 
                onClick={handleBooking}
                disabled={!isFormValid || isSubmitting}
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