import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { 
  Search, 
  Calendar, 
  User, 
  Tag,
  ArrowRight,
  BookOpen,
  Clock
} from 'lucide-react';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const { data: posts, isLoading } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: () => apiRequest('/api/blog'),
  });

  const filteredPosts = posts?.filter((post: any) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
    return matchesSearch && matchesTag && post.isPublished;
  }) || [];

  const allTags = [...new Set(posts?.flatMap((post: any) => post.tags || []) || [])];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

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
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog de SoftwarePar
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Artículos sobre desarrollo de software, tecnología y tendencias del sector
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              data-testid="input-search-posts"
            />
          </div>
          
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            data-testid="select-tag"
          >
            <option value="">Todas las categorías</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Artículo Destacado
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-24 h-24 text-white opacity-50" />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(filteredPosts[0].publishedAt || filteredPosts[0].createdAt)}
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {getReadingTime(filteredPosts[0].content)} min lectura
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <User className="w-4 h-4 mr-1" />
                    SoftwarePar Team
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {filteredPosts[0].title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
                  {filteredPosts[0].excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {filteredPosts[0].tags?.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Button data-testid={`button-read-post-${filteredPosts[0].slug}`}>
                    <Link href={`/blog/${filteredPosts[0].slug}`} className="flex items-center">
                      Leer Artículo
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post: any) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white opacity-50" />
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(post.publishedAt || post.createdAt)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {getReadingTime(post.content)} min
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags?.slice(0, 2).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  data-testid={`button-read-post-${post.slug}`}
                >
                  <Link href={`/blog/${post.slug}`} className="flex items-center justify-center w-full">
                    Leer Más
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* No posts found */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No se encontraron artículos
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {posts && posts.length === 0 
                ? 'Aún no hay artículos publicados. ¡Vuelve pronto para ver nuevo contenido!'
                : 'Intenta ajustar los filtros o el término de búsqueda'
              }
            </p>
            {searchTerm || selectedTag ? (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('');
                }}
                data-testid="button-clear-filters"
              >
                Limpiar Filtros
              </Button>
            ) : null}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-blue-600 dark:bg-blue-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            ¿Te gusta nuestro contenido?
          </h2>
          <p className="text-blue-100 mb-6">
            Suscríbete a nuestro newsletter y recibe los últimos artículos directamente en tu email
          </p>
          
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              data-testid="input-newsletter-email"
            />
            <Button 
              variant="secondary"
              data-testid="button-subscribe-newsletter"
            >
              Suscribirse
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}