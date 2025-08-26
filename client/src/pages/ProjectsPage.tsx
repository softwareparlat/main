import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { 
  Search, 
  Filter, 
  Code, 
  Globe, 
  Smartphone, 
  Database,
  Star,
  ArrowRight
} from 'lucide-react';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/projects'],
    queryFn: () => apiRequest('/api/projects'),
  });

  const categories = [
    { id: 'web', label: 'Aplicaciones Web', icon: Globe },
    { id: 'mobile', label: 'Apps Móviles', icon: Smartphone },
    { id: 'desktop', label: 'Software Desktop', icon: Code },
    { id: 'ecommerce', label: 'E-commerce', icon: Database },
  ];

  const filteredProjects = projects?.filter((project: any) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nuestros Proyectos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubre aplicaciones profesionales listas para implementar en tu negocio
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              data-testid="input-search-projects"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              data-testid="select-category"
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(selectedCategory === id ? '' : id)}
              className={`p-4 rounded-lg border transition-all ${
                selectedCategory === id
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 text-gray-700 dark:text-gray-300'
              }`}
              data-testid={`category-${id}`}
            >
              <Icon className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: any) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Code className="w-16 h-16 text-white opacity-50" />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-full font-medium">
                    {categories.find(c => c.id === project.category)?.label || project.category}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">4.8</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies?.slice(0, 3).map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                      +{project.technologies.length - 3} más
                    </span>
                  )}
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${project.price?.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      USD
                    </span>
                  </div>
                  {project.partnerPrice && (
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Partner:
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        ${project.partnerPrice?.toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    data-testid={`button-view-project-${project.id}`}
                  >
                    <Link href={`/projects/${project.id}`} className="flex items-center justify-center w-full">
                      Ver Detalles
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No projects found */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No se encontraron proyectos
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Intenta ajustar los filtros o el término de búsqueda
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              data-testid="button-clear-filters"
            >
              Limpiar Filtros
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 dark:bg-blue-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-blue-100 mb-6">
            Contáctanos para desarrollar una solución personalizada para tu negocio
          </p>
          <Button variant="secondary" data-testid="button-custom-project">
            <Link href="/contact">Solicitar Proyecto Personalizado</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}