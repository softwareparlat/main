import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2,
  BookOpen,
  Tag
} from 'lucide-react';
import { Link } from 'wouter';

export default function BlogPostPage() {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ['/api/blog', slug],
    queryFn: () => apiRequest(`/api/blog/${slug}`),
    enabled: !!slug,
  });

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Artículo no encontrado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            El artículo que buscas no existe o ha sido movido
          </p>
          <Button>
            <Link href="/blog">Volver al Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" data-testid="button-back-to-blog">
            <Link href="/blog" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="h-64 lg:h-96 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <BookOpen className="w-24 h-24 text-white opacity-50" />
          </div>

          {/* Article Meta and Title */}
          <div className="p-6 lg:p-8">
            <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.publishedAt || post.createdAt)}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {getReadingTime(post.content)} min lectura
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                SoftwarePar Team
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Share Button */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-6 mb-8">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Comparte este artículo
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleShare}
                data-testid="button-share-post"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {/* Here you would typically parse markdown or HTML content */}
              <div 
                className="text-gray-700 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: post.content?.replace(/\n/g, '<br />') || '' 
                }}
              />
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  ¿Te gustó este artículo? ¡Compártelo!
                </div>
                <Button 
                  onClick={handleShare}
                  data-testid="button-share-post-footer"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles or CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            ¿Necesitas ayuda con tu proyecto?
          </h2>
          <p className="text-blue-100 mb-6">
            Nuestro equipo de expertos está listo para ayudarte a desarrollar tu próxima aplicación
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" data-testid="button-view-projects">
              <Link href="/projects">Ver Proyectos</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/contact">Contactar Ahora</Link>
            </Button>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-8 text-center">
          <Button variant="outline" data-testid="button-back-to-blog-bottom">
            <Link href="/blog" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ver Más Artículos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}