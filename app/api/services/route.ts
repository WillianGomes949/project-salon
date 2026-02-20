import { NextRequest, NextResponse } from 'next/server'
import { 
  getServicesByEstablishment, 
  getServiceById,
  getAllServices 
} from '@/data/mock-db'

// GET /api/services?establishmentId=xxx ou /api/services?id=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const establishmentId = searchParams.get('establishmentId')
    const id = searchParams.get('id')

    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 200))

    if (id) {
      const service = getServiceById(id)
      if (!service) {
        return NextResponse.json(
          { error: 'Serviço não encontrado' },
          { status: 404 }
        )
      }
      return NextResponse.json({ data: service })
    }

    if (establishmentId) {
      const services = getServicesByEstablishment(establishmentId)
      return NextResponse.json({ data: services })
    }

    // Retorna todos os serviços
    const services = getAllServices()
    return NextResponse.json({ data: services })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar serviços' },
      { status: 500 }
    )
  }
}
