import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  HelpCircle,
  Building2
} from 'lucide-react';
import { FAQS_DATA } from '../../data/initialData';

export const ContactTab: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Presupuesto de Proyecto',
    message: '',
    acceptTerms: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Office Location selector
  const [activeCity, setActiveCity] = useState<'madrid' | 'cdmx' | 'bsas'>('madrid');

  // FAQ open index state
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const offices = {
    madrid: {
      city: 'Madrid, España',
      address: 'Paseo de la Castellana 140, Planta 8, 28046',
      phone: '+34 910 234 567',
      hours: '09:00 - 18:30 CET',
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&q=80'
    },
    cdmx: {
      city: 'Ciudad de México, México',
      address: 'Paseo de la Reforma 222, Cuauhtémoc, 06600',
      phone: '+52 55 8421 9000',
      hours: '08:30 - 17:30 CST',
      image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=600&q=80'
    },
    bsas: {
      city: 'Buenos Aires, Argentina',
      address: 'Av. Corrientes 327, San Nicolás, C1043',
      phone: '+54 11 5219 4400',
      hours: '09:00 - 18:00 ART',
      image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=600&q=80'
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTicketId('TK-' + Math.floor(10000 + Math.random() * 90000));
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Presupuesto de Proyecto',
        message: '',
        acceptTerms: true
      });
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Header */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold">
          <Mail className="w-3.5 h-3.5 text-amber-600" />
          <span>Pestaña de Contacto y Soporte</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Ponte en Contacto con Nosotros
        </h1>
        <p className="text-sm text-stone-600 max-w-2xl">
          ¿Tienes una pregunta, una propuesta de colaboración o deseas solicitar una cotización formal? Escríbenos y te responderemos en menos de 24 horas.
        </p>
      </div>

      {/* Main Form & Contact Info Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Form (Left 7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">Envíanos un mensaje</h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Completa el siguiente formulario para asignarte al especialista adecuado.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-emerald-950">¡Mensaje Enviado con Éxito!</h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-sm mx-auto">
                Hemos recibido tu solicitud y se ha creado el ticket de seguimiento:
              </p>
              <div className="bg-white py-2 px-4 rounded-xl border border-emerald-300 font-mono font-bold text-emerald-900 text-base inline-block">
                {ticketId}
              </div>
              <p className="text-xs text-emerald-700 pt-2">
                Te hemos enviado una confirmación a tu correo electrónico. Un asesor se comunicará contigo a la brevedad.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-bold text-stone-700">
                    Nombre completo *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-stone-400 bg-stone-50/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-bold text-stone-700">
                    Correo electrónico *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="juan@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-stone-400 bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-phone" className="text-xs font-bold text-stone-700">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="+34 600 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-stone-400 bg-stone-50/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-bold text-stone-700">
                    Motivo de consulta *
                  </label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-stone-400 bg-stone-50/50 cursor-pointer"
                  >
                    <option value="Presupuesto de Proyecto">Presupuesto de Proyecto</option>
                    <option value="Duda sobre Productos">Duda sobre Productos o Pedidos</option>
                    <option value="Soporte Técnico">Soporte Técnico o Mantenimiento</option>
                    <option value="Alianzas & Colaboración">Alianzas & Colaboración</option>
                    <option value="Otro">Otro asunto</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-bold text-stone-700">
                  Mensaje detallado *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Cuéntanos brevemente sobre tu proyecto, requerimientos, fechas clave o dudas..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-stone-400 bg-stone-50/50"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  id="contact-terms"
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="w-4 h-4 rounded text-stone-900 accent-stone-900 cursor-pointer"
                />
                <label htmlFor="contact-terms" className="text-xs text-stone-600 cursor-pointer">
                  Acepto la política de privacidad y el tratamiento de mis datos de contacto.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-stone-900 hover:bg-stone-800 active:scale-[0.99] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enviando información...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Enviar Mensaje Directo</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Cards (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-md">
            <h3 className="text-lg font-bold">Canales de Atención Inmediata</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 block font-medium">Línea Telefónica Directa</span>
                  <span className="font-bold text-white text-sm">+34 910 234 567</span>
                  <p className="text-[11px] text-stone-400 mt-0.5">Lunes a Viernes de 9:00 a 18:30</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 block font-medium">Correo Electrónico</span>
                  <span className="font-bold text-white text-sm">contacto@nexus-digital.com</span>
                  <p className="text-[11px] text-stone-400 mt-0.5">Tiempo medio de respuesta: &lt; 2 horas</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 block font-medium">Soporte Crítico 24/7</span>
                  <span className="font-bold text-white text-sm">incidencias@nexus-digital.com</span>
                  <p className="text-[11px] text-stone-400 mt-0.5">Para clientes con planes profesionales y cloud</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Office Selector with direct imagery */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Nuestras Sedes Físicas</span>
              </span>
            </div>

            {/* City Tabs */}
            <div className="grid grid-cols-3 gap-1.5 bg-stone-100 p-1 rounded-xl">
              {(['madrid', 'cdmx', 'bsas'] as const).map((cityKey) => (
                <button
                  key={cityKey}
                  onClick={() => setActiveCity(cityKey)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                    activeCity === cityKey ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cityKey === 'madrid' ? 'Madrid' : cityKey === 'cdmx' ? 'CDMX' : 'Bs. As.'}
                </button>
              ))}
            </div>

            {/* Active office card */}
            <div className="space-y-3 pt-1">
              <div className="aspect-16/9 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={offices[activeCity].image}
                  alt={offices[activeCity].city}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-stone-900 text-sm">{offices[activeCity].city}</h4>
                <p className="text-stone-600">{offices[activeCity].address}</p>
                <div className="flex items-center justify-between pt-1 text-stone-500 font-medium">
                  <span>Horario: {offices[activeCity].hours}</span>
                  <span>{offices[activeCity].phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable FAQ Accordion */}
      <section className="space-y-6 pt-6 border-t border-stone-200">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center justify-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Resolución Rápida de Dudas</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Preguntas Frecuentes
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Respuestas a las dudas más habituales sobre nuestra plataforma, plazos y condiciones.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS_DATA.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-hidden hover:bg-stone-50/70 transition-colors"
                >
                  <span className="text-sm font-bold text-stone-900">{faq.question}</span>
                  <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
