import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShoppingBag, 
  Briefcase, 
  Camera, 
  BookOpen, 
  ShieldCheck, 
  Star, 
  Check, 
  Zap, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { Product, TabId, TabItem } from '../../types';
import { TESTIMONIALS_DATA } from '../../data/initialData';
import { formatCurrency } from '../../utils/formatters';

interface HomeTabProps {
  onSelectTab: (tabId: TabId) => void;
  featuredProducts: Product[];
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
  currency: string;
  tabs: TabItem[];
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onSelectTab,
  featuredProducts,
  onAddToCart,
  onOpenQuickView,
  currency,
  tabs
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:py-20 lg:py-24 bg-stone-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 lg:px-16 shadow-2xl">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-radial from-amber-600/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800/90 border border-stone-700/80 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plataforma Web Dinámica y Modular</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Experiencia Digital Completa con <span className="text-amber-400">Pestañas Interactivas</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Explora un entorno dinámico y totalmente funcional: catálogo comercial con carrito de compras, cotizador de servicios en vivo, galería fotográfica en alta resolución, blog con comentarios y contacto validado.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              id="hero-explore-catalog-btn"
              onClick={() => onSelectTab('productos')}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explorar Catálogo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-quote-service-btn"
              onClick={() => onSelectTab('servicios')}
              className="px-6 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 active:scale-95 text-white font-semibold text-sm border border-stone-700 transition-all flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-stone-400" />
              <span>Cotizar Servicios</span>
            </button>

            <button
              id="hero-view-gallery-btn"
              onClick={() => onSelectTab('galeria')}
              className="px-6 py-3.5 rounded-xl bg-transparent hover:bg-stone-800/60 active:scale-95 text-stone-300 hover:text-white font-medium text-sm transition-all flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-stone-400" />
              <span>Ver Galería</span>
            </button>
          </div>

          {/* Quick trust metrics */}
          <div className="pt-8 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div>
              <div className="text-2xl font-black text-white">+12,500</div>
              <div className="text-xs text-stone-400">Usuarios activos</div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-400">100%</div>
              <div className="text-xs text-stone-400">Funcionalidad dinámica</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">4.9 / 5</div>
              <div className="text-xs text-stone-400">Valoración media</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400">24 / 7</div>
              <div className="text-xs text-stone-400">Soporte técnico</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Pestañas Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Mapa de Navegación
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Pestañas y Módulos de la Plataforma
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            Cada sección ha sido programada con funcionalidades completas e interactivas. Haz clic en cualquier pestaña para explorarla.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-md cursor-pointer transition-all group flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-amber-100 text-stone-800 group-hover:text-amber-700 flex items-center justify-center transition-colors">
                    <Layers className="w-5 h-5" />
                  </div>
                  {tab.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                  {tab.label}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2">
                  {tab.description || 'Sección interactiva con navegación dinámica.'}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-amber-800">
                <span>Entrar a la pestaña</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Catálogo Destacado
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Productos Populares con Carrito
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('productos')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-amber-700"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all flex flex-col"
            >
              {/* Image Container with direct Unsplash URL */}
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100 group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                {product.isNew && (
                  <span className="absolute top-2.5 left-2.5 bg-stone-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                    NUEVO
                  </span>
                )}
                <button
                  onClick={() => onOpenQuickView(product)}
                  className="absolute inset-0 bg-stone-950/40 text-white font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs"
                >
                  Vista Rápida
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>{product.category}</span>
                    <div className="flex items-center gap-1 text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <h3 
                    onClick={() => onOpenQuickView(product)}
                    className="font-bold text-sm text-stone-900 line-clamp-1 hover:text-amber-700 cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-base font-bold text-stone-900">
                      {formatCurrency(product.price, currency)}
                    </div>
                    {product.originalPrice && (
                      <div className="text-[11px] text-stone-400 line-through">
                        {formatCurrency(product.originalPrice, currency)}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Añadir</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Customer Testimonials */}
      <section className="bg-stone-100/70 border-y border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Opiniones Verificadas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Experiencias reales de empresas y usuarios que utilizan nuestra plataforma diariamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{t.author}</h4>
                    <p className="text-[11px] text-stone-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Direct Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-stone-950 to-stone-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              ¿Listo para empezar?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Cotiza tu proyecto o consulta con nuestro equipo hoy mismo
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              Estamos a tu disposición para ayudarte a materializar tu plataforma web con las mejores tecnologías y soporte continuo.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onSelectTab('contacto')}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              Contactar Ahora
            </button>
            <button
              onClick={() => onSelectTab('servicios')}
              className="px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs sm:text-sm border border-stone-700 transition-colors"
            >
              Calculadora de Costes
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
