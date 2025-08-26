import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  Settings,
  Home,
  Briefcase,
  Calculator,
  MessageSquare,
  BookOpen,
  Phone
} from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    return location === path;
  };

  const navItems = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/projects', label: 'Proyectos', icon: Briefcase },
    { href: '/calculator', label: 'Calculadora', icon: Calculator },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/contact', label: 'Contacto', icon: Phone },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-sm">SP</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  SoftwarePar
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}>
                  <span
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                      isActive(href)
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                    data-testid={`nav-link-${label.toLowerCase()}`}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {user ? (
              <>
                {/* User menu */}
                <div className="relative group">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center"
                    data-testid="button-user-menu"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {user.firstName}
                  </Button>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link href="/dashboard">
                      <span className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Home className="w-4 h-4 mr-2" />
                        Dashboard
                      </span>
                    </Link>
                    
                    {user.role === 'partner' && (
                      <Link href="/partner-dashboard">
                        <span className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <Calculator className="w-4 h-4 mr-2" />
                          Panel Partner
                        </span>
                      </Link>
                    )}
                    
                    {user.role === 'admin' && (
                      <Link href="/admin-dashboard">
                        <span className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <Settings className="w-4 h-4 mr-2" />
                          Admin Panel
                        </span>
                      </Link>
                    )}
                    
                    <Link href="/support">
                      <span className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Soporte
                      </span>
                    </Link>
                    
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      data-testid="button-logout"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" data-testid="button-login">
                  <Link href="/login">Iniciar Sesión</Link>
                </Button>
                <Button data-testid="button-register">
                  <Link href="/register">Registrarse</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-gray-700">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <span
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center ${
                    isActive(href)
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </span>
              </Link>
            ))}
            
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              {user ? (
                <>
                  <div className="flex items-center px-3 py-2">
                    <User className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  
                  <Link href="/dashboard">
                    <span className="block px-3 py-2 text-gray-700 dark:text-gray-300">
                      Dashboard
                    </span>
                  </Link>
                  
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-red-600"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link href="/login">
                    <span
                      className="block px-3 py-2 text-gray-700 dark:text-gray-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Iniciar Sesión
                    </span>
                  </Link>
                  <Link href="/register">
                    <span
                      className="block px-3 py-2 text-gray-700 dark:text-gray-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Registrarse
                    </span>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile theme toggle */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <button
                onClick={toggleTheme}
                className="flex items-center w-full px-3 py-2 text-gray-700 dark:text-gray-300"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}