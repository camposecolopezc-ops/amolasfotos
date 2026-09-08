import React, { useState } from 'react';
import { 
  Briefcase, 
  Code2, 
  Palette, 
  TrendingUp, 
  ShieldCheck, 
  Calculator, 
  Check, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  Zap,
  HelpCircle
} from 'lucide-react';
import { ServiceItem, TabId } from '../../types';
import { SERVICES_DATA } from '../../data/initialData';
import { formatCurrency } from '../../utils/formatters';

interface ServicesTabProps {
  onSelectTab: (tabId: TabId) => void;
  currency: string;
}

export const ServicesTab: React.FC<ServicesTabProps> = ({ onSelectTab, currency }) => {
  // Calculator state
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: boolean }>({
    web: true,
    design: true,
    seo: false,
    cloud: false,
    ecommerce: true,
    multilingual: false
  });
  const [urgencyMultiplier, setUrgencyMultiplier] = useState<number>(1); // 1 = estándar, 1.25 = exprés, 1.4 = máxima
  const [showQuoteSuccessModal, setShowQuoteSuccessModal] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const calculatorModules = [
    { id: 'web', name: 'Desarrollo Web & Arquitectura Frontend', price: 850, time: '14 días', desc: 'Plataforma completa, responsive y optimizada.' },
    { id: 'design', name: 'Diseño de Identidad Visual y UI/UX', price: 620, time: '10 días', desc: 'Guía de estilo, prototipos y componentes.' },
    { id: 'seo', name: 'Estrategia SEO & Indexación en Google', price: 480, time: '7 días', desc: 'Auditoría técnica, metadatos y sitemap.' },
    { id: 'cloud', name: 'Infraestructura Cloud & Certificado SSL', price: 290, time: '3 días', desc: 'Despliegue de alta disponibilidad y copias 24/7.' },
    { id: 'ecommerce', name: 'Módulo de Catálogo & Carrito de Compra', price: 350, time: '6 días', desc: 'Pasarela de cobro, inventario y checkout.' },
    { id: 'multilingual', name: 'Soporte Multilingüe y Divisas', price: 220, time: '4 días', desc: 'Internacionalización completa para mercados globales.' }
  ];

  // Calculate live price
  const baseCalculatedPrice = calculatorModules
    .filter(m => selectedServices[m.id])
    .reduce((acc, curr) => acc + curr.price, 0);

  const finalEstimatedPrice = Math.round(baseCalculatedPrice * urgencyMultiplier);

  const toggleModule = (id: string) => {
    setSelectedServices(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-6 h-6 text-amber-600" />;
      case 'Palette': return <Palette className="w-6 h-6 text-amber-600" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-amber-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-amber-600" />;
      default: return <Briefcase className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Header */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold">
          <Briefcase className="w-3.5 h-3.5 text-amber-600" />
          <span>Pestaña de Servicios Profesionales</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Soluciones Digitales a Medida
        </h1>
        <p className="text-sm text-stone-600 max-w-2xl">
          Transformamos ideas en productos de alto impacto. Explora nuestros servicios especializados y utiliza la calculadora interactiva para estimar tu inversión en tiempo real.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                  {getServiceIcon(service.icon)}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold bg-stone-100 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{service.deliveryTime}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-stone-900">{service.title}</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  Incluye:
                </span>
                <ul className="space-y-2">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-stone-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-400 block font-medium">Inversión base desde:</span>
                <span className="text-xl font-black text-stone-900">
                  {formatCurrency(service.basePrice, currency)}
                </span>
              </div>
              <button
                onClick={() => {
                  const targetElement = document.getElementById('interactive-calculator');
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                Incluir en Cotización
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Project Cost & Quote Calculator */}
      <section id="interactive-calculator" className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-800 pb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Herramienta Interactiva Dinámica</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Calculadora de Presupuesto en Tiempo Real
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
              Selecciona los requerimientos específicos de tu proyecto y ajusta la prioridad de entrega para obtener una estimación transparente al instante.
            </p>
          </div>

          {/* Quick summary pill */}
          <div className="bg-stone-800 border border-stone-700 p-4 rounded-2xl text-right shrink-0">
            <span className="text-xs text-stone-400 block">Estimación actual:</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400">
              {formatCurrency(finalEstimatedPrice, currency)}
            </span>
          </div>
        </div>

        {/* Modules selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculatorModules.map((module) => {
            const isChecked = !!selectedServices[module.id];
            return (
              <div
                key={module.id}
                onClick={() => toggleModule(module.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isChecked
                    ? 'bg-stone-800 border-amber-500 shadow-md ring-1 ring-amber-500'
                    : 'bg-stone-800/40 border-stone-800 hover:border-stone-700 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">{formatCurrency(module.price, currency)}</span>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-amber-500 text-stone-950' : 'border border-stone-600'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-3" />}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-tight">{module.name}</h4>
                  <p className="text-xs text-stone-400">{module.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-700/50 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Plazo aprox:</span>
                  <span className="text-stone-300 font-semibold">{module.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Urgency Slider */}
        <div className="bg-stone-800/60 p-5 rounded-2xl border border-stone-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-stone-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Prioridad y Plazo de Entrega:</span>
            </span>
            <span className="text-amber-400 font-semibold">
              {urgencyMultiplier === 1 ? 'Ritmo Estándar (Sin recargo)' : urgencyMultiplier === 1.25 ? 'Entrega Exprés (+25%)' : 'Prioridad Máxima 24/7 (+40%)'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { val: 1, label: 'Estándar', desc: 'Plazos regulares' },
              { val: 1.25, label: 'Exprés', desc: 'Entrega prioritaria' },
              { val: 1.4, label: 'Urgente VIP', desc: 'Dedicación exclusiva' }
            ].map((option) => (
              <button
                key={option.val}
                onClick={() => setUrgencyMultiplier(option.val)}
                className={`p-2.5 rounded-xl text-center border transition-all ${
                  urgencyMultiplier === option.val
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-sm'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700 text-xs'
                }`}
              >
                <div className="text-xs font-bold">{option.label}</div>
                <div className="text-[10px] opacity-80">{option.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom CTA for Quote */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-400">
            * El valor calculado es una estimación referencial sujeta a revisión final de especificaciones.
          </div>
          <button
            onClick={() => setShowQuoteSuccessModal(true)}
            disabled={finalEstimatedPrice === 0}
            className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Generar y Solicitar Propuesta</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Pricing Comparison Table (Suscripciones) */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Planes de Mantenimiento y Acompañamiento
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Elige el plan ideal para tu negocio
          </h2>
          
          {/* Billing Switcher */}
          <div className="inline-flex items-center bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                billingCycle === 'monthly' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              Facturación Mensual
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600'
              }`}
            >
              <span>Facturación Anual</span>
              <span className="bg-amber-400 text-stone-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Inicial',
              desc: 'Ideal para proyectos emergentes y profesionales independientes.',
              monthlyPrice: 49,
              annualPrice: 39,
              features: ['Alojamiento ultrarrápido', 'Certificado SSL automático', 'Copias de seguridad semanales', 'Soporte por email 48h'],
              isPopular: false
            },
            {
              name: 'Profesional',
              desc: 'La solución más elegida para empresas y tiendas en crecimiento.',
              monthlyPrice: 129,
              annualPrice: 99,
              features: ['Todo lo del plan Inicial', 'Copias diarias automáticas', 'Monitoreo de seguridad WAF', 'Optimización SEO continua', 'Soporte prioritario WhatsApp y chat'],
              isPopular: true
            },
            {
              name: 'Corporativo',
              desc: 'Para organizaciones de alta demanda que requieren atención dedicada.',
              monthlyPrice: 299,
              annualPrice: 239,
              features: ['Todo lo del plan Profesional', 'Arquitectura dedicada multi-servidor', 'SLA garantizado 99.99%', 'Auditorías mensuales de código', 'Gestor de cuenta exclusivo'],
              isPopular: false
            }
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-7 border transition-all flex flex-col justify-between space-y-6 ${
                plan.isPopular
                  ? 'border-amber-500 shadow-xl ring-2 ring-amber-500 relative'
                  : 'border-stone-200 hover:shadow-md'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-stone-950 text-[10px] font-black tracking-wider uppercase px-3 py-0.5 rounded-full shadow-xs">
                  MÁS POPULAR
                </span>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-stone-900">{plan.name}</h3>
                  <p className="text-xs text-stone-500">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-stone-900">
                    {formatCurrency(billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice, currency)}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">/ mes</span>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-stone-100">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2 text-xs text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-3" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  onSelectTab('contacto');
                }}
                className={`w-full py-3 rounded-xl text-xs font-bold transition-colors ${
                  plan.isPopular
                    ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                Seleccionar Plan {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Confirmation Modal */}
      {showQuoteSuccessModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex justify-center items-center">
          <div 
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs" 
            onClick={() => setShowQuoteSuccessModal(false)}
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 z-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Presupuesto Generado con Éxito</h3>
            <p className="text-xs text-stone-600">
              Hemos registrado los módulos seleccionados por un importe estimado de:
            </p>
            <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl font-black text-2xl text-stone-900">
              {formatCurrency(finalEstimatedPrice, currency)}
            </div>
            <p className="text-xs text-stone-500">
              ¿Deseas enviarnos tus datos de contacto para coordinar una reunión de arranque?
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowQuoteSuccessModal(false);
                  onSelectTab('contacto');
                }}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Continuar al Formulario de Contacto
              </button>
              <button
                onClick={() => setShowQuoteSuccessModal(false)}
                className="w-full py-2.5 text-stone-500 hover:text-stone-800 text-xs font-semibold"
              >
                Cerrar y seguir navegando
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
