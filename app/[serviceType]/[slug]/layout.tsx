import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidServiceType, getServiceTypeConfig } from '@/config/service-types'
import { getEstablishmentBySlug } from '@/data/mock-db'

// 1. Atualizamos a tipagem para indicar que params é uma Promise (Next.js 15)
interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    serviceType: string
    slug: string
  }>
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  // 2. Resolvemos a Promise antes de pegar os valores
  const resolvedParams = await params
  const { serviceType, slug } = resolvedParams
  
  if (!isValidServiceType(serviceType)) {
    return {
      title: 'Página não encontrada',
    }
  }

  const establishment = getEstablishmentBySlug(slug)
  
  if (!establishment) {
    return {
      title: 'Estabelecimento não encontrado',
    }
  }

  const serviceConfig = getServiceTypeConfig(serviceType)

  return {
    title: `${establishment.name} - ${serviceConfig?.label} | BookingApp`,
    description: establishment.description,
    openGraph: {
      title: establishment.name,
      description: establishment.shortDescription,
      images: establishment.images.cover || establishment.images.hero,
    },
  }
}

// 3. Transformamos o componente em async
export default async function ServiceLayout({ children, params }: LayoutProps) {
  // 4. Resolvemos a Promise aqui também
  const resolvedParams = await params
  const { serviceType, slug } = resolvedParams

  if (!isValidServiceType(serviceType)) {
    notFound()
  }

  const establishment = getEstablishmentBySlug(slug)
  
  if (!establishment) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}