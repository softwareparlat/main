import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { 
  Code, 
  Users, 
  DollarSign, 
  ArrowRight, 
  CheckCircle, 
  Star,
  MessageCircle,
  Shield,
  Zap
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Desarrollo de Software
            <span className="text-blue-600 dark:text-blue-400 block">
              a Medida para tu Negocio
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Transformamos tus ideas en aplicaciones profesionales. 
            Elige entre compra completa o únete como partner y genera ingresos recurrentes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" data-testid="button-view-projects">
              <Link href="/projects">Ver Proyectos</Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8"
              data-testid="button-become-partner"
            >
              <Link href="/calculator">Calcular Ganancias</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ¿Por qué elegir SoftwarePar?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Somos especialistas en desarrollo de software con un modelo de negocio único
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border bg-white dark:bg-gray-800 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Desarrollo Profesional</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Creamos aplicaciones robustas usando las últimas tecnologías y mejores prácticas
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border bg-white dark:bg-gray-800 shadow-sm">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Sistema de Partnership</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Conviértete en partner y genera ingresos recurrentes revendiendo licencias
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border bg-white dark:bg-gray-800 shadow-sm">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Soporte 24/7</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nuestro equipo está disponible para ayudarte en todo momento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Models Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Dos Modalidades de Trabajo
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Elige la opción que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Complete Purchase */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Compra Completa
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Ideal para empresas que quieren propiedad total
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Código fuente completo</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Propiedad intelectual</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Customización ilimitada</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Soporte 6 meses incluido</span>
                </div>
              </div>

              <Button className="w-full" data-testid="button-complete-purchase">
                Solicitar Cotización
              </Button>
            </div>

            {/* Partnership */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 text-white relative">
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">
                  Partnership
                </h3>
                <p className="opacity-90">
                  Genera ingresos recurrentes revendiendo licencias
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3" />
                  <span>Precio reducido inicial</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3" />
                  <span>Comisiones por ventas</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3" />
                  <span>Dashboard de ganancias</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3" />
                  <span>Enlaces de referido únicos</span>
                </div>
              </div>

              <Button 
                variant="secondary" 
                className="w-full bg-white text-blue-600 hover:bg-gray-100"
                data-testid="button-become-partner"
              >
                Convertirse en Partner
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((testimonial) => (
              <div key={testimonial} className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "Excelente servicio y calidad de desarrollo. El sistema de partnership nos permitió generar ingresos adicionales."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Cliente #{testimonial}</p>
                    <p className="text-sm text-gray-500">Empresa de Tecnología</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para comenzar tu proyecto?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contáctanos hoy y descubre cómo podemos ayudarte a digitalizar tu negocio
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8"
              data-testid="button-contact-us"
            >
              <Link href="/contact">Contactar Ahora</Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600"
              data-testid="button-view-blog"
            >
              <Link href="/blog">Ver Blog</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}