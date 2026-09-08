import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, CheckCheck } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const FloatingSupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: '¡Hola! Bienvenido a nuestra plataforma. ¿En qué podemos ayudarte hoy? Puedes preguntarme sobre productos, servicios, cotizaciones o envíos.',
      timestamp: 'Ahora'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const quickQuestions = [
    '¿Cómo comprar en la tienda?',
    '¿Cómo cotizar un servicio?',
    '¿Qué métodos de pago aceptan?',
    '¿Tienen garantía los productos?'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text,
      timestamp: 'Ahora'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    // Dynamic intelligent reply simulation
    setTimeout(() => {
      let reply = 'Gracias por escribirnos. Uno de nuestros asesores revisará tu solicitud de inmediato.';
      const lower = text.toLowerCase();

      if (lower.includes('comprar') || lower.includes('producto') || lower.includes('carrito')) {
        reply = 'Para comprar, dirígete a la pestaña "Productos", elige el artículo que te guste y haz clic en "Añadir al Carrito". Luego podrás revisar tu pedido y aplicar el cupón OFERTA10.';
      } else if (lower.includes('servicio') || lower.includes('cotiz') || lower.includes('precio')) {
        reply = 'En la pestaña "Servicios" dispones de una calculadora de presupuesto en vivo. Puedes seleccionar los módulos requeridos y calcular el coste estimado al instante.';
      } else if (lower.includes('pago') || lower.includes('tarjeta')) {
        reply = 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), transferencias bancarias y pasarelas seguras con cifrado SSL de 256 bits.';
      } else if (lower.includes('garantía') || lower.includes('devolu')) {
        reply = 'Todos nuestros productos cuentan con garantía oficial de 2 años y política de devolución sin compromiso durante los primeros 30 días.';
      } else if (lower.includes('contacto') || lower.includes('teléfono') || lower.includes('correo')) {
        reply = 'Puedes comunicarte con nosotros desde la pestaña "Contacto", donde encontrarás nuestro formulario directo, mapa de sedes y números telefónicos de atención.';
      }

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: reply,
        timestamp: 'Ahora'
      };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          id="open-support-chat-btn"
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2.5 px-4 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all group"
          aria-label="Abrir asistente de soporte"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-amber-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="text-xs font-bold tracking-wide">¿Ayuda en vivo?</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[460px] animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center border border-stone-700 text-amber-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold flex items-center gap-1.5">
                  <span>Asistente NEXUS</span>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                </h4>
                <p className="text-[10px] text-stone-300">En línea • Soporte dinámico 24/7</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-stone-400 hover:text-white rounded-lg transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-2xs ${
                    m.sender === 'user'
                      ? 'bg-stone-900 text-white rounded-tr-xs'
                      : 'bg-white text-stone-800 border border-stone-200 rounded-tl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <div className={`mt-1 text-[9px] flex items-center gap-1 ${
                    m.sender === 'user' ? 'text-stone-300 justify-end' : 'text-stone-400'
                  }`}>
                    <span>{m.timestamp}</span>
                    {m.sender === 'user' && <CheckCheck className="w-2.5 h-2.5 text-amber-400" />}
                  </div>
                </div>
              </div>
            ))}

            {/* Quick suggested chips */}
            {messages.length < 3 && (
              <div className="pt-2 space-y-1.5">
                <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">
                  Preguntas frecuentes rápidas:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(q)}
                      className="text-[11px] text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full text-left transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Escribe tu duda aquí..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 text-xs px-3 py-2 bg-stone-100 border-0 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-400 text-stone-800"
            />
            <button
              type="submit"
              className="p-2 bg-stone-900 hover:bg-stone-800 text-amber-400 rounded-xl transition-colors disabled:opacity-50"
              disabled={!inputVal.trim()}
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
