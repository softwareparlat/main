import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target,
  ArrowRight,
  Info
} from 'lucide-react';
import { Link } from 'wouter';

export default function CalculatorPage() {
  const [salesPerMonth, setSalesPerMonth] = useState(5);
  const [averageProject, setAverageProject] = useState(2500);
  const [commissionRate, setCommissionRate] = useState(15);
  const [months, setMonths] = useState(12);

  const monthlySales = salesPerMonth * averageProject;
  const monthlyCommission = monthlySales * (commissionRate / 100);
  const yearlyCommission = monthlyCommission * months;
  const totalRevenue = monthlySales * months;

  const scenarios = [
    { 
      sales: 2, 
      avg: 1500, 
      rate: 15, 
      label: 'Conservador',
      description: 'Para comenzar con ventas mínimas'
    },
    { 
      sales: 5, 
      avg: 2500, 
      rate: 15, 
      label: 'Moderado',
      description: 'Meta realista para partners activos'
    },
    { 
      sales: 10, 
      avg: 3500, 
      rate: 20, 
      label: 'Ambicioso',
      description: 'Para partners experimentados'
    },
  ];

  const handleScenario = (scenario: any) => {
    setSalesPerMonth(scenario.sales);
    setAverageProject(scenario.avg);
    setCommissionRate(scenario.rate);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Calculator className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Calculadora de Ganancias Partner
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubre cuánto puedes ganar como partner revendiendo licencias de software
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Personaliza tu Proyección
            </h2>

            <div className="space-y-6">
              {/* Sales Per Month */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ventas por mes
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={salesPerMonth}
                  onChange={(e) => setSalesPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  data-testid="input-sales-per-month"
                />
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>1</span>
                  <span className="font-bold text-blue-600">{salesPerMonth} ventas</span>
                  <span>20</span>
                </div>
              </div>

              {/* Average Project Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Valor promedio por proyecto (USD)
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={averageProject}
                  onChange={(e) => setAverageProject(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  data-testid="input-average-project"
                />
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>$1,000</span>
                  <span className="font-bold text-green-600">${averageProject.toLocaleString()}</span>
                  <span>$10,000</span>
                </div>
              </div>

              {/* Commission Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tasa de comisión (%)
                </label>
                <input
                  type="range"
                  min="10"
                  max="25"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  data-testid="input-commission-rate"
                />
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>10%</span>
                  <span className="font-bold text-purple-600">{commissionRate}%</span>
                  <span>25%</span>
                </div>
              </div>

              {/* Time Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Período de proyección (meses)
                </label>
                <select
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  data-testid="select-months"
                >
                  <option value={3}>3 meses</option>
                  <option value={6}>6 meses</option>
                  <option value={12}>12 meses</option>
                  <option value={24}>24 meses</option>
                </select>
              </div>
            </div>

            {/* Quick Scenarios */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Escenarios Rápidos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.label}
                    onClick={() => handleScenario(scenario)}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 transition-colors text-left"
                    data-testid={`scenario-${scenario.label.toLowerCase()}`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      {scenario.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {scenario.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Monthly Results */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Proyección Mensual
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${monthlySales.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Ventas Totales
                  </div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${monthlyCommission.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Tu Comisión
                  </div>
                </div>
              </div>
            </div>

            {/* Yearly Results */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Proyección de {months} meses
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Ingresos Totales Generados:</span>
                  <span className="text-2xl font-bold">
                    ${totalRevenue.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Tus Comisiones Totales:</span>
                  <span className="text-3xl font-bold">
                    ${yearlyCommission.toLocaleString()}
                  </span>
                </div>
                
                <div className="border-t border-blue-300 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span>Promedio mensual:</span>
                    <span className="text-xl font-bold">
                      ${(yearlyCommission / months).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Beneficios del Partnership
              </h3>
              
              <div className="space-y-3">
                {[
                  'Comisiones recurrentes por cada venta',
                  'Dashboard para seguir tus ganancias',
                  'Enlaces de referido únicos',
                  'Material de marketing incluido',
                  'Soporte técnico especializado',
                  'Capacitación en ventas',
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  ¿Listo para comenzar?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Únete a nuestro programa de partners y comienza a generar ingresos
                </p>
                <Button 
                  size="lg" 
                  className="w-full"
                  data-testid="button-become-partner"
                >
                  <Link href="/register">Convertirse en Partner</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                Importante
              </h4>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                Las proyecciones mostradas son estimaciones basadas en tus parámetros. 
                Los resultados reales pueden variar dependiendo de factores como el esfuerzo 
                de ventas, condiciones del mercado y demanda de productos. 
                SoftwarePar no garantiza ingresos específicos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}