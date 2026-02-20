import Link from 'next/link'
import { Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-12 h-12 text-blue-600" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para home
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Explorar serviços
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
