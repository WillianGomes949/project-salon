import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Função utilitária para merge de classes Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatação de preço
export function formatPrice(price: number, currency = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(price)
}

// Formatação de telefone
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
  }
  
  return phone
}

// Formatação de CEP
export function formatCEP(cep: string): string {
  const cleaned = cep.replace(/\D/g, '')
  
  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`
  }
  
  return cep
}

// Gera slug a partir de string
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

// Trunca texto
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Gera ID único
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Delay para simulação de API
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Verifica se é mobile
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

// Scroll suave para elemento
export function scrollToElement(elementId: string, offset = 80): void {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}
