import React, { useState } from 'react';
import { 
  Home, 
  ShoppingBag, 
  Briefcase, 
  Camera, 
  BookOpen, 
  Users, 
  Mail, 
  Search, 
  Menu, 
  X, 
  ShoppingCart, 
  Sparkles,
  Layers,
  PlusCircle,
  Tag
} from 'lucide-react';
import { TabId, TabItem } from '../types';

interface NavbarProps {
  tabs: TabItem[];
  activeTab: TabId;
  onSelectTab: (tabId: TabId) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenTabManager: () => void;
  currency: string;
  onChangeCurrency: (currency: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  tabs,
  activeTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenTabManager,
  currency,
  onChangeCurrency
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  // Map icon name to Lucide Component safely
  const getIcon = (iconName: string, className: string = 'w-4 h-4') => {
    switch (iconName) {
      case 'Home': return <Home className={className} />;
      case 'ShoppingBag': return <ShoppingBag className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Camera': return <Camera className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Mail': return <Mail className={className} />;
      default: return <Layers className={className} />;
    }
  };

  const handleTabClick = (tabId: TabId) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors shadow-xs">
      {/* Top Notification Announcement Banner */}
      {showPromoBanner && (
        <div className="bg-stone-900 text-stone-100 text-xs py-2 px-4 flex items-center justify-between">
          <div className="flex-1 flex items-center justify-center gap-2 text-center">
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>
              <strong>¡Promoción especial!</strong> Usa el cupón <code className="bg-stone-800 px-1.5 py-0.5 rounded text-amber-300 font-mono font-bold">OFERTA10</code> para un 10% de descuento en todos los productos.
            </span>
          </div>
          <button 
            id="close-promo-banner-btn"
            onClick={() => setShowPromoBanner(false)}
            className="text-stone-400 hover:text-white p-1 rounded transition-colors"
            title="Cerrar aviso"
            aria-label="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <button
              id="brand-home-logo-btn"
              onClick={() => handleTabClick('inicio')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-stone-900 to-stone-700 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-stone-900 block leading-tight font-sans">
                  NEXUS<span className="text-amber-600">.</span>
                </span>
                <span className="text-[10px] font-medium text-stone-500 uppercase tracking-widest block">
                  Plataforma Digital
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-1 bg-stone-100/80 p-1.5 rounded-2xl border border-stone-200/60" aria-label="Navegación de pestañas">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-stone-950 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/50'
                  }`}
                >
                  <span className={isActive ? 'text-amber-600' : 'text-stone-400'}>
                    {getIcon(tab.iconName)}
                  </span>
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Medium Desktop / Tablet Tabs Dropdown / Compact Navigation */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1 overflow-x-auto py-1 max-w-md" aria-label="Navegación compacta">
            {tabs.slice(0, 5).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                    isActive ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {getIcon(tab.iconName, 'w-3.5 h-3.5')}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Button */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="Buscar en el sitio (Cmd/Ctrl + K)"
              aria-label="Buscar en el sitio"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Currency Switcher */}
            <div className="hidden sm:block">
              <select
                id="currency-selector"
                value={currency}
                onChange={(e) => onChangeCurrency(e.target.value)}
                className="bg-stone-100 hover:bg-stone-200/70 text-stone-700 text-xs font-semibold py-1.5 px-2.5 rounded-xl border-0 cursor-pointer focus:ring-2 focus:ring-stone-400 focus:outline-hidden transition-colors"
                title="Cambiar divisa"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="MXN">MXN ($)</option>
              </select>
            </div>

            {/* Tab Studio / Customize button */}
            <button
              id="header-tab-manager-btn"
              onClick={onOpenTabManager}
              className="hidden sm:flex items-center gap-1.5 py-1.5 px-3 rounded-xl border border-stone-300 text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs font-semibold transition-colors"
              title="Administrar o agregar pestañas personalizadas"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Pestañas</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition-all flex items-center justify-center shadow-xs"
              title="Ver carrito de compras"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-950 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-stone-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
            Pestañas de navegación
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-amber-400' : 'text-stone-500'}>
                      {getIcon(tab.iconName)}
                    </span>
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-amber-400 text-stone-950' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTabManager();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold"
            >
              <PlusCircle className="w-4 h-4 text-amber-600" />
              <span>Gestionar Pestañas</span>
            </button>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-stone-500">Moneda:</span>
              <select
                value={currency}
                onChange={(e) => onChangeCurrency(e.target.value)}
                className="bg-stone-100 text-stone-800 text-xs font-semibold py-1.5 px-2 rounded-lg border-0 cursor-pointer"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="MXN">MXN ($)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
