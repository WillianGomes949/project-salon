import { ServiceType } from '@/types/service'

// Dias da semana
export const weekDays = [
  { value: 0, label: 'Domingo', shortLabel: 'Dom' },
  { value: 1, label: 'Segunda-feira', shortLabel: 'Seg' },
  { value: 2, label: 'Terça-feira', shortLabel: 'Ter' },
  { value: 3, label: 'Quarta-feira', shortLabel: 'Qua' },
  { value: 4, label: 'Quinta-feira', shortLabel: 'Qui' },
  { value: 5, label: 'Sexta-feira', shortLabel: 'Sex' },
  { value: 6, label: 'Sábado', shortLabel: 'Sáb' },
]

// Meses do ano
export const months = [
  { value: 0, label: 'Janeiro', shortLabel: 'Jan' },
  { value: 1, label: 'Fevereiro', shortLabel: 'Fev' },
  { value: 2, label: 'Março', shortLabel: 'Mar' },
  { value: 3, label: 'Abril', shortLabel: 'Abr' },
  { value: 4, label: 'Maio', shortLabel: 'Mai' },
  { value: 5, label: 'Junho', shortLabel: 'Jun' },
  { value: 6, label: 'Julho', shortLabel: 'Jul' },
  { value: 7, label: 'Agosto', shortLabel: 'Ago' },
  { value: 8, label: 'Setembro', shortLabel: 'Set' },
  { value: 9, label: 'Outubro', shortLabel: 'Out' },
  { value: 10, label: 'Novembro', shortLabel: 'Nov' },
  { value: 11, label: 'Dezembro', shortLabel: 'Dez' },
]

// Status de agendamento
export const bookingStatusLabels = {
  pending: { label: 'Pendente', color: 'yellow' },
  confirmed: { label: 'Confirmado', color: 'green' },
  completed: { label: 'Concluído', color: 'blue' },
  cancelled: { label: 'Cancelado', color: 'red' },
  'no-show': { label: 'Não compareceu', color: 'gray' },
}

// Estados brasileiros
export const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

// Durações padrão de serviço (em minutos)
export const defaultServiceDurations = [15, 30, 45, 60, 75, 90, 120, 150, 180, 240]

// Horários de funcionamento padrão
export const defaultTimeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00',
]

// Regex para validação
export const validationRegex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/,
  cep: /^[0-9]{5}-?[0-9]{3}$/,
  cpf: /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/,
  cnpj: /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}$/,
}

// Configurações de paginação
export const paginationConfig = {
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
}

// Configurações de cache
export const cacheConfig = {
  establishmentCacheTime: 5 * 60 * 1000, // 5 minutos
  servicesCacheTime: 5 * 60 * 1000, // 5 minutos
  availabilityCacheTime: 60 * 1000, // 1 minuto
}
