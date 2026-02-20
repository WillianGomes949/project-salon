export const siteConfig = {
  name: 'BookingApp',
  description: 'Agende seus serviços de beleza, saúde e bem-estar de forma fácil e rápida',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  links: {
    instagram: 'https://instagram.com/bookingapp',
    facebook: 'https://facebook.com/bookingapp',
    twitter: 'https://twitter.com/bookingapp',
  },
  contact: {
    email: 'contato@bookingapp.com',
    phone: '(11) 3000-0000',
  },
  features: {
    enableReviews: true,
    enablePayments: false, // Futuro: integração com pagamentos
    enableNotifications: true,
    enableWhatsAppIntegration: true,
  },
}

export const bookingConfig = {
  // Configurações padrão de agendamento
  defaultSettings: {
    advanceBookingDays: 30,
    minHoursBeforeBooking: 2,
    slotDuration: 30,
    allowSameDayBooking: true,
    autoConfirm: true,
  },
  
  // Horários de funcionamento padrão
  defaultBusinessHours: [
    { dayOfWeek: 0, isOpen: false, openTime: '', closeTime: '' }, // Domingo
    { dayOfWeek: 1, isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { dayOfWeek: 2, isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { dayOfWeek: 3, isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { dayOfWeek: 4, isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { dayOfWeek: 5, isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { dayOfWeek: 6, isOpen: true, openTime: '09:00', closeTime: '14:00' },
  ],
  
  // Formatos de data/hora
  dateFormat: 'dd/MM/yyyy',
  timeFormat: 'HH:mm',
  dateTimeFormat: 'dd/MM/yyyy HH:mm',
}

export const unsplashConfig = {
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '',
  defaultQueries: {
    barbearia: 'barbershop haircut',
    'salao-cabelo': 'hair salon',
    'salao-unhas': 'nail salon manicure',
    dentista: 'dental clinic',
    'clinica-estetica': 'beauty clinic spa',
    spa: 'spa massage wellness',
  },
}
