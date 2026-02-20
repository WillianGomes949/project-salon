'use client'
import Link from 'next/link'
import Image from 'next/image'

import { 
  Scissors, 
  Sparkles, 
  Hand, 
  Smile, 
  Heart, 
  Flower2,
  Calendar,
  Clock,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { getAllEstablishments } from '@/data'
import { Button } from '@/components/ui/button'
import { serviceTypesConfig } from '../config/service-types'
import { Card, CardContent } from '@/components/ui/card'


const iconMap: Record<string, React.ElementType> = {
  scissors: Scissors,
  sparkles: Sparkles,
  hand: Hand,
  smile: Smile,
  heart: Heart,
  'flower-2': Flower2,
}

export default function HomePage() {
  const featuredEstablishments = getAllEstablishments().slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
        
        <div className="relative container-custom py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Agende seus serviços de forma{' '}
              <span className="text-blue-200">simples e rápida</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
              Encontre os melhores profissionais de beleza, saúde e bem-estar. 
              Agende online 24 horas por dia, 7 dias por semana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Agora
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                Explorar Serviços
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative border-t border-white/10">
          <div className="container-custom py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">500+</div>
                <div className="text-blue-200 text-sm">Estabelecimentos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">10k+</div>
                <div className="text-blue-200 text-sm">Agendamentos/mês</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">4.8</div>
                <div className="text-blue-200 text-sm">Avaliação média</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">50k+</div>
                <div className="text-blue-200 text-sm">Clientes satisfeitos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Escolha o tipo de serviço
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temos diversas categorias de serviços para atender todas as suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceTypesConfig.map((serviceType) => {
              const Icon = iconMap[serviceType.icon] || Sparkles
              
              return (
                <Link 
                  key={serviceType.type}
                  href={`/${serviceType.type}`}
                >
                  <Card hover className="h-full">
                    <CardContent className="p-6">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${serviceType.primaryColor}15` }}
                      >
                        <Icon 
                          className="w-7 h-7" 
                          style={{ color: serviceType.primaryColor }}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {serviceType.label}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {serviceType.description}
                      </p>
                      <ul className="space-y-2">
                        {serviceType.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-500">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Establishments */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Estabelecimentos em destaque
              </h2>
              <p className="text-lg text-gray-600">
                Os mais bem avaliados da nossa plataforma
              </p>
            </div>
            <Link 
              href="/estabelecimentos"
              className="mt-4 md:mt-0 text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
            >
              Ver todos
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEstablishments.map((establishment) => (
              <Link 
                key={establishment.id}
                href={`/${establishment.type}/${establishment.slug}`}
              >
                <Card hover className="h-full">
                  <div className="relative h-48">
                    <Image
                      src={establishment.images.hero || establishment.images.cover || ''}
                      alt={establishment.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: establishment.primaryColor }}
                      >
                        {establishment.type.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{establishment.rating}</span>
                      <span className="text-gray-500 text-sm">
                        ({establishment.reviewCount} avaliações)
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {establishment.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {establishment.shortDescription}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {establishment.address.city}, {establishment.address.state}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Em poucos passos, você agenda seu serviço de forma prática
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Escolha o serviço',
                description: 'Navegue pelas categorias e encontre o serviço perfeito para você.',
                icon: Sparkles,
              },
              {
                step: '02',
                title: 'Selecione data e hora',
                description: 'Veja a disponibilidade em tempo real e escolha o melhor horário.',
                icon: Calendar,
              },
              {
                step: '03',
                title: 'Confirme seu agendamento',
                description: 'Receba a confirmação por email e SMS. É rápido e seguro!',
                icon: CheckCircle,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-blue-600 font-bold text-lg mb-2">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-blue-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para agendar seu serviço?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já simplificaram sua rotina de cuidados pessoais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Fazer Agendamento
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
            >
              Cadastrar Meu Negócio
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">BookingApp</h3>
              <p className="text-sm">
                A maneira mais fácil de agendar serviços de beleza, saúde e bem-estar.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/barbearia" className="hover:text-white">Barbearias</Link></li>
                <li><Link href="/salao-cabelo" className="hover:text-white">Salões de Cabelo</Link></li>
                <li><Link href="/salao-unhas" className="hover:text-white">Salões de Unhas</Link></li>
                <li><Link href="/dentista" className="hover:text-white">Dentistas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/sobre" className="hover:text-white">Sobre nós</Link></li>
                <li><Link href="/contato" className="hover:text-white">Contato</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/ajuda" className="hover:text-white">Central de Ajuda</Link></li>
                <li><Link href="/termos" className="hover:text-white">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="hover:text-white">Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} BookingApp. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
