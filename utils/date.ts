import { format, parse, isValid, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isPast, isFuture, addMonths, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Formata data para exibição
export function formatDate(date: Date | string, formatStr = 'dd/MM/yyyy'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (!isValid(d)) return ''
  return format(d, formatStr, { locale: ptBR })
}

// Formata hora
export function formatTime(time: string | Date): string {
  if (typeof time === 'string') {
    // Assume formato HH:mm
    return time
  }
  return format(time, 'HH:mm')
}

// Formata data e hora
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (!isValid(d)) return ''
  return format(d, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })
}

// Parse de string de data
export function parseDate(dateStr: string, formatStr = 'dd/MM/yyyy'): Date | null {
  const parsed = parse(dateStr, formatStr, new Date())
  return isValid(parsed) ? parsed : null
}

// Gera array de dias da semana
export function getWeekDays(date: Date = new Date()): Date[] {
  const start = startOfWeek(date, { locale: ptBR })
  const end = endOfWeek(date, { locale: ptBR })
  return eachDayOfInterval({ start, end })
}

// Gera array de dias do mês
export function getMonthDays(date: Date = new Date()): Date[] {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  return eachDayOfInterval({ start, end })
}

// Verifica se é o mesmo dia
export function isSameDate(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2)
}

// Verifica se é o mesmo mês
export function isSameMonthDate(date1: Date, date2: Date): boolean {
  return isSameMonth(date1, date2)
}

// Verifica se é hoje
export function isDateToday(date: Date): boolean {
  return isToday(date)
}

// Verifica se a data é passada
export function isDatePast(date: Date): boolean {
  return isPast(date) && !isToday(date)
}

// Verifica se a data é futura
export function isDateFuture(date: Date): boolean {
  return isFuture(date) || isToday(date)
}

// Adiciona dias
export function addDaysToDate(date: Date, days: number): Date {
  return addDays(date, days)
}

// Adiciona meses
export function addMonthsToDate(date: Date, months: number): Date {
  return addMonths(date, months)
}

// Subtrai meses
export function subMonthsFromDate(date: Date, months: number): Date {
  return subMonths(date, months)
}

// Nome do mês
export function getMonthName(date: Date): string {
  return format(date, 'MMMM', { locale: ptBR })
}

// Nome do dia da semana
export function getWeekDayName(date: Date, short = false): string {
  if (short) {
    return format(date, 'EEE', { locale: ptBR })
  }
  return format(date, 'EEEE', { locale: ptBR })
}

// Gera slots de horário
export function generateTimeSlots(
  startTime: string,
  endTime: string,
  intervalMinutes: number
): string[] {
  const slots: string[] = []
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)
  
  let currentHour = startHour
  let currentMinute = startMinute
  
  while (
    currentHour < endHour || 
    (currentHour === endHour && currentMinute < endMinute)
  ) {
    slots.push(
      `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`
    )
    
    currentMinute += intervalMinutes
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60)
      currentMinute = currentMinute % 60
    }
  }
  
  return slots
}

// Calcula duração entre dois horários
export function calculateDuration(startTime: string, endTime: string): number {
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)
  
  const startMinutes = startHour * 60 + startMinute
  const endMinutes = endHour * 60 + endMinute
  
  return endMinutes - startMinutes
}

// Adiciona minutos a um horário
export function addMinutesToTime(time: string, minutes: number): string {
  const [hour, minute] = time.split(':').map(Number)
  const totalMinutes = hour * 60 + minute + minutes
  
  const newHour = Math.floor(totalMinutes / 60) % 24
  const newMinute = totalMinutes % 60
  
  return `${newHour.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}`
}
