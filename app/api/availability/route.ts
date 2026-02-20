import { NextRequest, NextResponse } from 'next/server'
import { getAvailableTimeSlots } from '@/data/mock-db'

// GET /api/availability?establishmentId=xxx&professionalId=xxx&date=xxx&duration=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const establishmentId = searchParams.get('establishmentId')
    const professionalId = searchParams.get('professionalId')
    const date = searchParams.get('date')
    const duration = searchParams.get('duration')

    // Validação
    if (!establishmentId || !professionalId || !date) {
      return NextResponse.json(
        { error: 'Parâmetros establishmentId, professionalId e date são obrigatórios' },
        { status: 400 }
      )
    }

    // Valida formato da data (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: 'Formato de data inválido. Use YYYY-MM-DD' },
        { status: 400 }
      )
    }

    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 300))

    const durationMinutes = duration ? parseInt(duration, 10) : 30

    const timeSlots = getAvailableTimeSlots(
      establishmentId,
      professionalId,
      date,
      durationMinutes
    )
    const availableTimesOnly = timeSlots
      .filter(s => s.available)
      .map(s => s.time)

    return NextResponse.json({
      availableTimes: availableTimesOnly,
      data: {
        date,
        establishmentId,
        professionalId,
        slots: timeSlots,
        totalSlots: timeSlots.length,
        availableSlots: timeSlots.filter(s => s.available).length,
      }
    })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar disponibilidade' },
      { status: 500 }
    )
  }
}
