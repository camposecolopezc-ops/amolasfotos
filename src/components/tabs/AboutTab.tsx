import React, { useState } from 'react';
import { 
  Users, 
  Target, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Linkedin, 
  Twitter, 
  Github, 
  CheckCircle2,
  Calendar,
  Globe2
} from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/initialData';
import { TabId } from '../../types';

interface AboutTabProps {
  onSelectTab: (tabId: TabId) => void;
}

export const AboutTab: React.FC<AboutTabProps> = ({ onSelectTab }) => {
  const [activeTimelineYear, setActiveTimelineYear] = useState<string>('2024');

  const timelineMilestones = [
    {
      year: '2020',
      title: 'Fundación & Primeros Pasos',
      desc: 'Nace NEXUS como estudio boutique de arquitectura digital y diseño web con un equipo inicial de 4 ingenieros.'
    },
    {
      year: '2021',
      title: 'Expansión a Servicios Cloud',
      desc: 'Lanzamiento de la división de infraestructura en la nube y optimización de rendimiento web de alta concurrencia.'
    },
    {
      year: '2022',
      title: 'Reconocimiento Internacional',
      desc: 'Galardonados como Mejor Plataforma Web Interactiva por la Asociación Iberoamericana de Diseño Digital.'
    },
    {
      year: '2023',
      title: 'Apertura de Sedes en LatAm',
      desc: 'Inauguración de oficinas en Ciudad de México y Buenos Aires para dar soporte horario continuo a más de 12 países.'
    },
    {
      year: '2024',
      title: 'Nueva Generación Modular',
      desc: 'Consolidación de nuestro ecosistema modular con herramientas dinámicas en tiempo real y soporte 24/7.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Header */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold">
          <Users className="w-3.5 h-3.5 text-amber-600" />
          <span>Pestaña de Nosotros y Equipo</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Nuestra Historia, Valores y Equipo
        </h1>
        <p className="text-sm text-stone-600 max-w-2xl">
          Conoce a las personas y los principios detrás de cada proyecto, nuestra trayectoria evolutiva y nuestro compromiso con la excelencia tecnológica.
        </p>
      </div>

      {/* Hero Mission Statement */}
      <section className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Nuestro Propósito
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug">
            "Construir experiencias web donde el diseño de vanguardia y la robustez técnica convivan en perfecta armonía."
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Creemos firmemente en interfaces limpias, tiempos de carga inmediatos y accesibilidad para todos los usuarios. No nos conformamos con soluciones genéricas: cada detalle es pulido con artesanía digital.
          </p>
        </div>
      </section>

      {/* Values 4-Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Pilares Fundamentales</span>
          <h3 className="text-2xl font-extrabold text-stone-900">Nuestros Valores</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Target className="w-6 h-6 text-amber-600" />,
              title: 'Precisión & Calidad',
              desc: 'Cuidamos cada píxel, cada línea de código y cada interacción para ofrecer productos de máxima fiabilidad.'
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
              title: 'Transparencia Total',
              desc: 'Precios claros, plazos honestos y comunicación constante en cada etapa del desarrollo.'
            },
            {
              icon: <Sparkles className="w-6 h-6 text-amber-600" />,
              title: 'Innovación Continua',
              desc: 'Adoptamos las tecnologías más avanzadas para mantener tu plataforma a la vanguardia de la industria.'
            },
            {
              icon: <Heart className="w-6 h-6 text-amber-600" />,
              title: 'Enfoque Humano',
              desc: 'Diseñamos pensando en las personas que utilizarán el sistema, priorizando la facilidad de uso y la empatía.'
            }
          ].map((val, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                {val.icon}
              </div>
              <h4 className="text-base font-bold text-stone-900">{val.title}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="bg-stone-50 p-8 sm:p-10 rounded-3xl border border-stone-200 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Evolución en el Tiempo
            </span>
            <h3 className="text-2xl font-extrabold text-stone-900">Hitos y Trayectoria</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {timelineMilestones.map((item) => (
              <button
                key={item.year}
                onClick={() => setActiveTimelineYear(item.year)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTimelineYear === item.year
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>

        {/* Active milestone showcase */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {(() => {
            const current = timelineMilestones.find(m => m.year === activeTimelineYear) || timelineMilestones[0];
            return (
              <>
                <div className="text-4xl sm:text-5xl font-black text-amber-600 font-mono tracking-tight shrink-0">
                  {current.year}
                </div>
                <div className="space-y-1.5 border-l-2 border-amber-500 pl-4 sm:pl-6">
                  <h4 className="text-lg font-bold text-stone-900">{current.title}</h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{current.desc}</p>
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* Team Members Grid with direct Unsplash images */}
      <section className="space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Equipo Profesional</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">Liderazgo y Talento</h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
            Un equipo multidisciplinar de desarrolladores, diseñadores e ingenieros dedicados a crear soluciones digitales extraordinarias.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square overflow-hidden bg-stone-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                </div>

                <div className="p-5 space-y-2.5">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">{member.name}</h4>
                    <p className="text-xs text-amber-700 font-semibold">{member.role}</p>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {member.skills.map((s, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between text-stone-400">
                <span className="text-[11px]">Conectar:</span>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:text-stone-900 transition-colors" title="LinkedIn">
                    <Linkedin className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1 hover:text-stone-900 transition-colors" title="Twitter">
                    <Twitter className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ready to Talk CTA */}
      <div className="bg-stone-100 p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-stone-200">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-lg font-bold text-stone-900">¿Tienes un proyecto en mente?</h4>
          <p className="text-xs text-stone-600">Nuestro equipo puede asesorarte sin ningún compromiso técnico ni económico.</p>
        </div>
        <button
          onClick={() => onSelectTab('contacto')}
          className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0"
        >
          Ir a Contacto
        </button>
      </div>

    </div>
  );
};
