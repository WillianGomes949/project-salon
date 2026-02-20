import { ServiceType } from '@/types/service'

export interface ServiceTypeConfig {
  type: ServiceType
  label: string
  description: string
  icon: string
  primaryColor: string
  secondaryColor: string
  heroImage: string
  features: string[]
}

export const serviceTypesConfig: ServiceTypeConfig[] = [
  {
    type: 'barbearia',
    label: 'Barbearia',
    description: 'Cortes masculinos, barba e cuidados especiais para homens',
    icon: 'scissors',
    primaryColor: '#8B4513',
    secondaryColor: '#D2691E',
    heroImage: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&q=80',
    features: [
      'Cortes tradicionais e modernos',
      'Barba e bigode',
      'Hidratação capilar',
      'Ambiente descontraído',
    ],
  },
  {
    type: 'salao-cabelo',
    label: 'Salão de Cabelo',
    description: 'Cortes, coloração, tratamentos e penteados para todos os estilos',
    icon: 'sparkles',
    primaryColor: '#E91E63',
    secondaryColor: '#F48FB1',
    heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80',
    features: [
      'Cortes femininos e masculinos',
      'Coloração e mechas',
      'Hidratação e reconstrução',
      'Escovas e penteados',
    ],
  },
  {
    type: 'salao-unhas',
    label: 'Salão de Unhas',
    description: 'Manicure, pedicure, alongamento e nail art',
    icon: 'hand',
    primaryColor: '#FF69B4',
    secondaryColor: '#FFB6C1',
    heroImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&q=80',
    features: [
      'Manicure e pedicure',
      'Alongamento em gel e fibra',
      'Nail art e decoração',
      'Esmaltação em gel',
    ],
  },
  {
    type: 'dentista',
    label: 'Consultório Odontológico',
    description: 'Cuidados completos com a saúde bucal',
    icon: 'smile',
    primaryColor: '#00BCD4',
    secondaryColor: '#B2EBF2',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80',
    features: [
      'Consultas e check-ups',
      'Limpeza e prevenção',
      'Restaurações',
      'Estética dental',
    ],
  },
  {
    type: 'clinica-estetica',
    label: 'Clínica de Estética',
    description: 'Tratamentos faciais, corporais e depilação a laser',
    icon: 'heart',
    primaryColor: '#9C27B0',
    secondaryColor: '#E1BEE7',
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80',
    features: [
      'Limpeza de pele',
      'Tratamentos corporais',
      'Depilação a laser',
      'Massagens terapêuticas',
    ],
  },
  {
    type: 'spa',
    label: 'Spa',
    description: 'Massagens, tratamentos de relaxamento e bem-estar',
    icon: 'flower-2',
    primaryColor: '#4CAF50',
    secondaryColor: '#C8E6C9',
    heroImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80',
    features: [
      'Massagens variadas',
      'Tratamentos corporais',
      'Rituais de spa',
      'Banhos terapêuticos',
    ],
  },
]

// Função auxiliar para obter configuração por tipo
export function getServiceTypeConfig(type: ServiceType): ServiceTypeConfig | undefined {
  return serviceTypesConfig.find(config => config.type === type)
}

// Função auxiliar para obter todos os tipos
export function getAllServiceTypes(): ServiceTypeConfig[] {
  return serviceTypesConfig
}

// Lista de tipos válidos para validação
export const validServiceTypes: ServiceType[] = serviceTypesConfig.map(c => c.type)

// Verifica se um tipo é válido
export function isValidServiceType(type: string): type is ServiceType {
  return validServiceTypes.includes(type as ServiceType)
}
