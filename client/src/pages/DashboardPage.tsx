import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { apiRequest } from '@/lib/queryClient';
import {
  User,
  Settings,
  CreditCard,
  FileText,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: notifications } = useQuery({
    queryKey: ['/api/notifications'],
    queryFn: () => apiRequest('/api/notifications'),
  });

  const { data: userProjects } = useQuery({
    queryKey: ['/api/projects', { user: user?.id }],
    queryFn: () => apiRequest(`/api/projects?user=${user?.id}`),
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bienvenido, {user.firstName}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Panel de control de tu cuenta
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Proyectos
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userProjects?.total || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Pagos
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  0
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tickets
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  0
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Estado
                </p>
                <p className="text-sm font-bold text-green-600">
                  Activo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Acciones Rápidas
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="w-full justify-start" data-testid="button-view-projects">
                    <FileText className="w-4 h-4 mr-2" />
                    <Link href="/projects">Ver Proyectos</Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" data-testid="button-create-ticket">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <Link href="/support">Crear Ticket</Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" data-testid="button-earnings-calculator">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <Link href="/calculator">Calcular Ganancias</Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" data-testid="button-account-settings">
                    <Settings className="w-4 h-4 mr-2" />
                    <Link href="/settings">Configuración</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm mt-6">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Actividad Reciente
                </h2>
              </div>
              <div className="p-6">
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No hay actividad reciente</p>
                  <p className="text-sm">Comienza explorando nuestros proyectos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Mi Perfil
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Rol:</span>
                    <span className="capitalize text-gray-900 dark:text-white">
                      {user.role}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Estado:</span>
                    <span className="text-green-600 font-medium">
                      {user.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Notificaciones
                </h2>
              </div>
              <div className="p-6">
                {notifications && notifications.length > 0 ? (
                  <div className="space-y-3">
                    {notifications.slice(0, 3).map((notification: any) => (
                      <div key={notification.id} className="border-l-4 border-blue-500 pl-4">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {notification.title}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No hay notificaciones</p>
                  </div>
                )}
              </div>
            </div>

            {/* Partnership CTA */}
            {user.role === 'client' && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-bold mb-2">
                  ¿Quieres ser Partner?
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                  Genera ingresos recurrentes revendiendo licencias de software
                </p>
                <Button variant="secondary" size="sm" className="w-full" data-testid="button-become-partner">
                  Más Información
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}