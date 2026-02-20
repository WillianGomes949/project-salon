import { validationRegex } from '@/lib/constants'

// Valida email
export function isValidEmail(email: string): boolean {
  return validationRegex.email.test(email)
}

// Valida telefone brasileiro
export function isValidPhone(phone: string): boolean {
  return validationRegex.phone.test(phone.replace(/\D/g, ''))
}

// Valida CEP
export function isValidCEP(cep: string): boolean {
  return validationRegex.cep.test(cep)
}

// Valida CPF
export function isValidCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, '')
  
  if (cleaned.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cleaned)) return false
  
  // Validação dos dígitos verificadores
  let sum = 0
  let remainder
  
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i)
  }
  
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.substring(9, 10))) return false
  
  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i)
  }
  
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.substring(10, 11))) return false
  
  return true
}

// Valida CNPJ
export function isValidCNPJ(cnpj: string): boolean {
  const cleaned = cnpj.replace(/\D/g, '')
  
  if (cleaned.length !== 14) return false
  if (/^(\d)\1{13}$/.test(cleaned)) return false
  
  // Validação dos dígitos verificadores
  let size = cleaned.length - 2
  let numbers = cleaned.substring(0, size)
  const digits = cleaned.substring(size)
  let sum = 0
  let pos = size - 7
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--
    if (pos < 2) pos = 9
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(0))) return false
  
  size = size + 1
  numbers = cleaned.substring(0, size)
  sum = 0
  pos = size - 7
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--
    if (pos < 2) pos = 9
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(1))) return false
  
  return true
}

// Valida se string não está vazia
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0
}

// Valida tamanho mínimo
export function minLength(value: string, min: number): boolean {
  return value.length >= min
}

// Valida tamanho máximo
export function maxLength(value: string, max: number): boolean {
  return value.length <= max
}

// Valida se é número
export function isNumber(value: string): boolean {
  return !isNaN(Number(value)) && value.trim() !== ''
}

// Valida se é número positivo
export function isPositiveNumber(value: string): boolean {
  const num = Number(value)
  return !isNaN(num) && num > 0
}

// Valida data futura
export function isFutureDate(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date >= today
}

// Valida horário de funcionamento
export function isValidBusinessHour(
  time: string,
  openTime: string,
  closeTime: string
): boolean {
  const [hour, minute] = time.split(':').map(Number)
  const [openHour, openMinute] = openTime.split(':').map(Number)
  const [closeHour, closeMinute] = closeTime.split(':').map(Number)
  
  const timeMinutes = hour * 60 + minute
  const openMinutes = openHour * 60 + openMinute
  const closeMinutes = closeHour * 60 + closeMinute
  
  return timeMinutes >= openMinutes && timeMinutes < closeMinutes
}

// Interface para erros de validação
export interface ValidationErrors {
  [key: string]: string
}

// Valida formulário de agendamento
export function validateBookingForm(data: {
  clientName: string
  clientEmail: string
  clientPhone: string
  serviceId: string
  date: Date | null
  time: string
}): ValidationErrors {
  const errors: ValidationErrors = {}
  
  if (!isNotEmpty(data.clientName)) {
    errors.clientName = 'Nome é obrigatório'
  } else if (!minLength(data.clientName, 3)) {
    errors.clientName = 'Nome deve ter pelo menos 3 caracteres'
  }
  
  if (!isNotEmpty(data.clientEmail)) {
    errors.clientEmail = 'Email é obrigatório'
  } else if (!isValidEmail(data.clientEmail)) {
    errors.clientEmail = 'Email inválido'
  }
  
  if (!isNotEmpty(data.clientPhone)) {
    errors.clientPhone = 'Telefone é obrigatório'
  } else if (!isValidPhone(data.clientPhone)) {
    errors.clientPhone = 'Telefone inválido'
  }
  
  if (!data.serviceId) {
    errors.serviceId = 'Selecione um serviço'
  }
  
  if (!data.date) {
    errors.date = 'Selecione uma data'
  } else if (!isFutureDate(data.date)) {
    errors.date = 'Data deve ser futura'
  }
  
  if (!data.time) {
    errors.time = 'Selecione um horário'
  }
  
  return errors
}
