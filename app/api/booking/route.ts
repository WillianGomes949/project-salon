import { NextRequest, NextResponse } from 'next/server'
import { createBooking, getBookingById, getBookingsByEmail } from '@/data/mock-db'
import { BookingFormData } from '@/types/booking'

// POST /api/booking - Cria um novo agendamento
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validação básica
    const requiredFields = ['establishmentId', 'serviceId', 'professionalId', 'clientName', 'clientEmail', 'clientPhone', 'date', 'time']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Campo obrigatório: ${field}` },
          { status: 400 }
        )
      }
    }

    // Simula delay de processamento
    await new Promise(resolve => setTimeout(resolve, 500))

    const booking = createBooking({
      establishmentId: body.establishmentId,
      professionalId: body.professionalId,
      serviceId: body.serviceId,
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      clientPhone: body.clientPhone,
      date: body.date,
      startTime: body.time,
      endTime: body.endTime || body.time,
      serviceName: body.serviceName,
      servicePrice: body.servicePrice,
      durationMinutes: body.durationMinutes,
      status: 'confirmed',
      notes: body.notes || '',
    })

    return NextResponse.json(
      { 
        success: true, 
        data: booking,
        message: 'Agendamento criado com sucesso!'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Erro ao criar agendamento' },
      { status: 500 }
    )
  }
}

// GET /api/booking?id=xxx ou /api/booking?email=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const email = searchParams.get('email')

    if (id) {
      const booking = getBookingById(id)
      if (!booking) {
        return NextResponse.json(
          { error: 'Agendamento não encontrado' },
          { status: 404 }
        )
      }
      return NextResponse.json({ data: booking })
    }

    if (email) {
      const bookings = getBookingsByEmail(email)
      return NextResponse.json({ data: bookings })
    }

    return NextResponse.json(
      { error: 'Parâmetro id ou email é obrigatório' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar agendamento' },
      { status: 500 }
    )
  }
}
