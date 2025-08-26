import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowLeft, 
  Star, 
  Check, 
  Code, 
  Globe, 
  Smartphone, 
  Database,
  Shield,
  Support,
  Zap
} from 'lucide-react';
import { Link } from 'wouter';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: project, isLoading } = useQuery({
    queryKey: ['/api/projects', id],
    queryFn: () => apiRequest(`/api/projects/${id}`),
    enabled: !!id,
  });

  const features = [
    { icon: Code, title: 'Código Limpio', description: 'Código bien estructurado y documentado' },
    { icon: Shield, title: 'Seguridad', description: 'Implementación de mejores prácticas de seguridad' },
    { icon: Zap, title: 'Alto Rendimiento', description: 'Optimizado para máxima velocidad' },
    { icon: Support, title: 'Soporte Incluido', description: '6 meses de soporte técnico gratuito' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Proyecto no encontrado
          </h1>
          <Button>
            <Link href="/projects">Volver a Proyectos</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" data-testid="button-back">
            <Link href="/projects" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Proyectos
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Code className="w-24 h-24 text-white opacity-50" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium">
                    {project.category}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      5.0 (24 reseñas)
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {project.name}
                </h1>

                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Características Principales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex items-start">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Tecnologías Utilizadas
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies?.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Qué Incluye
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Código fuente completo',
                  'Documentación técnica',
                  'Manual de usuario',
                  'Base de datos configurada',
                  'Deployment automático',
                  '6 meses de soporte',
                  'Actualizaciones de seguridad',
                  'Capacitación inicial',
                ].map((item) => (
                  <div key={item} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Precios
              </h3>
              
              <div className="space-y-4">
                {/* Regular Price */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Compra Completa
                    </span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${project.price?.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Propiedad completa del código y la aplicación
                  </p>
                  <Button 
                    className="w-full"
                    data-testid="button-buy-complete"
                  >
                    Comprar Ahora
                  </Button>
                </div>

                {/* Partner Price */}
                {project.partnerPrice && (
                  <div className="border-2 border-blue-500 rounded-lg p-4 relative">
                    <div className="absolute -top-2 left-4 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Recomendado
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Modo Partner
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${project.partnerPrice?.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Precio reducido + comisiones por ventas
                    </p>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      data-testid="button-buy-partner"
                    >
                      Convertirse en Partner
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center text-green-600 mb-2">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Garantía de 30 días</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Support className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Soporte técnico incluido</span>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">¿Necesitas personalización?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Podemos adaptar este proyecto a tus necesidades específicas
              </p>
              <Button 
                variant="secondary" 
                className="w-full"
                data-testid="button-contact-custom"
              >
                <Link href="/contact">Contactar Ahora</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Estadísticas
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Descargas:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Calificación:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">5.0/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Última actualización:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}