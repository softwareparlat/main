import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-300 dark:text-gray-600 mb-4">
            404
          </div>
          <div className="relative">
            <Search className="w-16 h-16 text-gray-400 mx-auto" />
            <div className="absolute -top-2 -right-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Página No Encontrada
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida. 
          Puede que hayas escrito mal la URL o que la página ya no esté disponible.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Button className="w-full sm:w-auto" data-testid="button-go-home">
            <Home className="w-4 h-4 mr-2" />
            <Link href="/">Ir al Inicio</Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={() => window.history.back()}
            data-testid="button-go-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver Atrás
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            ¿Necesitas ayuda? Prueba estos enlaces útiles:
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link 
              href="/projects" 
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Ver Proyectos
            </Link>
            <Link 
              href="/contact" 
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Contacto
            </Link>
            <Link 
              href="/blog" 
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Blog
            </Link>
            <Link 
              href="/support" 
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Soporte
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-xs text-gray-400 dark:text-gray-500">
          Error 404 - SoftwarePar
        </div>
      </div>
    </div>
  );
}