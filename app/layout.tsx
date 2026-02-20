import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'BookingApp - Agende seus serviços online',
  description: 'Agende serviços de beleza, saúde e bem-estar de forma fácil e rápida. Barbearias, salões, dentistas, clínicas de estética e spas.',
  keywords: ['agendamento', 'barbearia', 'salão', 'dentista', 'estética', 'spa'],
  authors: [{ name: 'BookingApp' }],
  openGraph: {
    title: 'BookingApp - Agende seus serviços online',
    description: 'Agende serviços de beleza, saúde e bem-estar de forma fácil e rápida.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={`${inter.className} min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
