import { Link } from 'wouter';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Github
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">SP</span>
              </div>
              <span className="text-xl font-bold">SoftwarePar</span>
            </div>
            <p className="text-gray-400 text-sm">
              Especialistas en desarrollo de software a medida con sistema de partnership único. 
              Transformamos ideas en aplicaciones profesionales.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/softwarepar" 
                className="text-gray-400 hover:text-blue-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/softwarepar" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/softwarepar" 
                className="text-gray-400 hover:text-pink-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/company/softwarepar" 
                className="text-gray-400 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/softwarepar" 
                className="text-gray-400 hover:text-gray-100 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-github"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
                  Desarrollo a Medida
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
                  Aplicaciones Web
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
                  Aplicaciones Móviles
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-gray-400 hover:text-white transition-colors">
                  Sistema de Partnership
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white transition-colors">
                  Soporte Técnico
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-gray-400 hover:text-white transition-colors">
                  Calculadora de Ganancias
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Términos de Servicio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <a 
                  href="mailto:info@softwarepar.lat" 
                  className="hover:text-white transition-colors"
                  data-testid="link-email"
                >
                  info@softwarepar.lat
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                <a 
                  href="tel:+5491123456789" 
                  className="hover:text-white transition-colors"
                  data-testid="link-phone"
                >
                  +54 9 11 2345-6789
                </a>
              </div>
              <div className="flex items-start text-gray-400">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                <span>
                  Buenos Aires, Argentina<br />
                  Disponible para todo LATAM
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-testid="input-newsletter"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md text-sm font-medium transition-colors"
                  data-testid="button-newsletter"
                >
                  Suscribirse
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} SoftwarePar. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">
                Desarrollo con ❤️ para la comunidad LATAM
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span>🚀 React.js</span>
            <span>⚡ Node.js</span>
            <span>🗄️ PostgreSQL</span>
            <span>💳 Mercado Pago</span>
            <span>🎨 Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}