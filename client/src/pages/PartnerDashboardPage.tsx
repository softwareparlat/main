import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  DollarSign,
  Users,
  TrendingUp,
  Copy,
  Eye,
  Calendar,
  Target,
  Award,
  Share2,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PartnerDashboardPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: partnerData } = useQuery({
    queryKey: ['/api/partners/dashboard'],
    queryFn: () => apiRequest('/api/partners/dashboard'),
    enabled: !!user && user.role === 'partner',
  });

  const copyReferralLink = () => {
    if (partnerData?.referralCode) {
      const referralLink = `${window.location.origin}/ref/${partnerData.referralCode}`;
      navigator.clipboard.writeText(referralLink);
      toast({
        title: 'Enlace copiado',
        description: 'El enlace de referido ha sido copiado al portapapeles',
      });
    }
  };

  const shareReferralLink = async () => {
    if (partnerData?.referralCode) {
      const referralLink = `${window.location.origin}/ref/${partnerData.referralCode}`;
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'SoftwarePar - Desarrollo de Software Profesional',
            text: '¡Descubre proyectos de software de alta calidad con mi enlace de referido!',
            url: referralLink,
          });
        } catch (error) {
          // User cancelled sharing or share failed
          copyReferralLink();
        }
      } else {
        copyReferralLink();
      }
    }
  };

  if (!user || user.role !== 'partner') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Acceso Restringido
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Necesitas ser partner para acceder a este panel
          </p>
          <Button>
            <Link href="/calculator">Convertirse en Partner</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Panel de Partner
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gestiona tus ventas, comisiones y crecimiento como partner
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ganancias Totales
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${partnerData?.totalEarnings?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12% este mes
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ventas Realizadas
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {partnerData?.totalSales || 0}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              <Target className="w-4 h-4 mr-1" />
              Meta: 10/mes
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tasa de Comisión
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {partnerData?.commissionRate || 15}%
                </p>
              </div>
            </div>
            <div className="mt-4 text-sm text-purple-600">
              Promedio industria: 10%
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Eye className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Visitas del Mes
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  247
                </p>
              </div>
            </div>
            <div className="mt-4 text-sm text-orange-600">
              Conversión: 3.2%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Referral Link */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm mb-8">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Tu Enlace de Referido
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
                    {partnerData?.referralCode ? 
                      `${window.location.origin}/ref/${partnerData.referralCode}` :
                      'Cargando...'
                    }
                  </div>
                  <Button
                    variant="outline"
                    onClick={copyReferralLink}
                    data-testid="button-copy-referral"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={shareReferralLink}
                    data-testid="button-share-referral"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Comparte este enlace para que tus referidos accedan a los proyectos con tu código de partner
                </p>
              </div>
            </div>

            {/* Sales Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Rendimiento de Ventas
                </h2>
              </div>
              <div className="p-6">
                {/* Mock Chart Area */}
                <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Gráfico de rendimiento
                    </p>
                    <p className="text-sm text-gray-400">
                      Próximamente: visualización detallada
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">+23%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">vs. mes anterior</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">ventas este mes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">$2,840</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">comisión mensual</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Acciones Rápidas
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <Button className="w-full justify-start" data-testid="button-view-projects">
                    <Eye className="w-4 h-4 mr-2" />
                    <Link href="/projects">Ver Proyectos</Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" data-testid="button-earnings-calculator">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    <Link href="/calculator">Calculadora de Ganancias</Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" data-testid="button-marketing-materials">
                    <Share2 className="w-4 h-4 mr-2" />
                    Material de Marketing
                  </Button>
                </div>
              </div>
            </div>

            {/* Recent Sales */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Ventas Recientes
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {/* Mock recent sales */}
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        Sistema E-commerce
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        hace 2 días
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+$420</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        App Móvil React Native
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        hace 5 días
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+$750</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        Dashboard Analytics
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        hace 1 semana
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+$300</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Level */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 mr-2" />
                <h3 className="text-lg font-bold">Partner Plata</h3>
              </div>
              <p className="text-blue-100 text-sm mb-4">
                Has vendido ${partnerData?.totalEarnings?.toLocaleString() || '0'} este año
              </p>
              <div className="w-full bg-blue-300 rounded-full h-2 mb-2">
                <div 
                  className="bg-white h-2 rounded-full" 
                  style={{ width: '65%' }}
                ></div>
              </div>
              <div className="text-xs text-blue-100">
                $2,500 más para Partner Oro
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}