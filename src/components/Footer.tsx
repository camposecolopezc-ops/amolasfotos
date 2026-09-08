import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Heart
} from 'lucide-react';
import { TabId, TabItem } from '../types';

interface FooterProps {
  tabs: TabItem[];
  onSelectTab: (tabId: TabId) => void;
}

export const Footer: React.FC<FooterProps> = ({ tabs, onSelectTab }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 transition-colors">
      {/* Top Value Propositions */}
      <div className="border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Garantía de Satisfacción</h4>
              <p className="text-xs text-stone-400">30 días de prueba sin compromiso en todos los pedidos.</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Atención Dinámica 24/7</h4>
              <p className="text-xs text-stone-400">Soporte multicanal continuo con respuesta prioritaria.</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Arquitectura Digital Moderna</h4>
              <p className="text-xs text-stone-400">Desarrollado con estándares web modernos y alto rendimiento.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-center text-amber-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                NEXUS<span className="text-amber-500">.</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Plataforma web integral de diseño contemporáneo, catálogo interactivo con carrito de compras, servicios profesionales con cotizador en tiempo real, galería multimedia y blog.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-stone-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Sistemas operativos 100%
              </span>
            </div>
          </div>

          {/* Direct Tab Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navegación</h4>
            <ul className="space-y-2 text-xs">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => {
                      onSelectTab(tab.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-stone-600 group-hover:text-amber-400 transition-colors" />
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contacto Directo</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Paseo de la Castellana 140, 28046 Madrid, España</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+34 910 234 567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>contacto@nexus-digital.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Boletín Informativo</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Recibe nuestras novedades, ofertas exclusivas y nuevos artículos técnicos.
            </p>
            {subscribed ? (
              <div className="p-3 bg-stone-900 border border-emerald-500/40 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>¡Gracias por suscribirte! Te hemos enviado un correo de bienvenida.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white placeholder:text-stone-500 focus:outline-hidden focus:border-amber-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Suscribirme</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} NEXUS Plataforma Digital. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-300 cursor-pointer">Política de Privacidad</span>
            <span>•</span>
            <span className="hover:text-stone-300 cursor-pointer">Términos de Servicio</span>
            <span>•</span>
            <span className="hover:text-stone-300 cursor-pointer">Aviso Legal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
