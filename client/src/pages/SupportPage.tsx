import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  Link as LinkIcon
} from 'lucide-react';
import { Link } from 'wouter';

export default function SupportPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    projectId: '',
  });

  const { data: tickets, isLoading, refetch } = useQuery({
    queryKey: ['/api/tickets'],
    queryFn: () => apiRequest('/api/tickets'),
    enabled: !!user,
  });

  const { data: userProjects } = useQuery({
    queryKey: ['/api/projects', { user: user?.id }],
    queryFn: () => apiRequest(`/api/projects?user=${user?.id}`),
    enabled: !!user,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await apiRequest('/api/tickets', {
        method: 'POST',
        body: JSON.stringify(newTicket),
      });

      toast({
        title: 'Ticket creado',
        description: 'Tu solicitud de soporte ha sido creada exitosamente',
      });

      setNewTicket({
        title: '',
        description: '',
        priority: 'medium',
        projectId: '',
      });
      setIsCreating(false);
      refetch();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo crear el ticket. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    }
  };

  const priorityColors = {
    low: 'text-green-600 bg-green-100 dark:bg-green-900',
    medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900',
    high: 'text-orange-600 bg-orange-100 dark:bg-orange-900',
    urgent: 'text-red-600 bg-red-100 dark:bg-red-900',
  };

  const statusColors = {
    open: 'text-blue-600 bg-blue-100 dark:bg-blue-900',
    in_progress: 'text-purple-600 bg-purple-100 dark:bg-purple-900',
    resolved: 'text-green-600 bg-green-100 dark:bg-green-900',
    closed: 'text-gray-600 bg-gray-100 dark:bg-gray-900',
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Inicia Sesión para Acceder al Soporte
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Necesitas una cuenta para crear tickets de soporte
          </p>
          <Button>
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Centro de Soporte
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Gestiona tus solicitudes de soporte técnico
            </p>
          </div>
          <Button
            onClick={() => setIsCreating(true)}
            data-testid="button-create-ticket"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Ticket
          </Button>
        </div>

        {/* Create Ticket Modal/Form */}
        {isCreating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Crear Nuevo Ticket
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Título del Ticket *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTicket.title}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Describe brevemente el problema"
                    data-testid="input-ticket-title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={newTicket.description}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                    placeholder="Proporciona detalles sobre el problema, pasos para reproducirlo, capturas de pantalla, etc."
                    data-testid="textarea-ticket-description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prioridad
                    </label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket(prev => ({ ...prev, priority: e.target.value as any }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      data-testid="select-ticket-priority"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Proyecto Relacionado
                    </label>
                    <select
                      value={newTicket.projectId}
                      onChange={(e) => setNewTicket(prev => ({ ...prev, projectId: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      data-testid="select-ticket-project"
                    >
                      <option value="">Seleccionar proyecto (opcional)</option>
                      {userProjects?.map((project: any) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreating(false)}
                    data-testid="button-cancel-ticket"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    data-testid="button-submit-ticket"
                  >
                    Crear Ticket
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tickets List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Mis Tickets
              </h2>
              
              {/* Search and Filter */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar tickets..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    data-testid="input-search-tickets"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Cargando tickets...</p>
              </div>
            ) : tickets && tickets.length > 0 ? (
              tickets.map((ticket: any) => (
                <div key={ticket.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {ticket.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[ticket.priority]}`}>
                          {ticket.priority === 'low' ? 'Baja' : 
                           ticket.priority === 'medium' ? 'Media' : 
                           ticket.priority === 'high' ? 'Alta' : 'Urgente'}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[ticket.status]}`}>
                          {ticket.status === 'open' ? 'Abierto' :
                           ticket.status === 'in_progress' ? 'En Progreso' :
                           ticket.status === 'resolved' ? 'Resuelto' : 'Cerrado'}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {ticket.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </div>
                        {ticket.project && (
                          <div className="flex items-center">
                            <LinkIcon className="w-4 h-4 mr-1" />
                            {ticket.project.name}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-testid={`button-view-ticket-${ticket.id}`}
                    >
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No tienes tickets de soporte
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Crea tu primer ticket si necesitas ayuda técnica
                </p>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Primer Ticket
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Help Resources */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
                Chat en Vivo
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Habla directamente con nuestro equipo de soporte
            </p>
            <Button variant="outline" className="w-full">
              Iniciar Chat
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
                Base de Conocimientos
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Encuentra respuestas a preguntas frecuentes
            </p>
            <Button variant="outline" className="w-full">
              <Link href="/help">Ver Artículos</Link>
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <AlertCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
                Estado del Sistema
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Verifica si hay incidencias conocidas
            </p>
            <Button variant="outline" className="w-full">
              <Link href="/status">Ver Estado</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}