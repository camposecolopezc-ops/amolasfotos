import React, { useState } from 'react';
import { Layers, Sparkles, Plus, Check, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { TabItem } from '../../types';

interface CustomTabProps {
  tab: TabItem;
}

export const CustomTab: React.FC<CustomTabProps> = ({ tab }) => {
  const [contentTitle, setContentTitle] = useState(tab.label);
  const [description, setDescription] = useState(tab.description || 'Pestaña modular personalizada por el usuario.');
  const [notes, setNotes] = useState<string[]>([
    'Esta pestaña ha sido incorporada dinámicamente al sistema de navegación.',
    'Conserva la misma estética tipográfica y diseño responsive que el resto de pestañas.',
    'Puedes agregar notas interactivas o elementos dinámicos en tiempo real.'
  ]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Pestaña Personalizada: {tab.label}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          {contentTitle}
        </h1>
        <p className="text-sm text-stone-600 max-w-2xl">
          {description}
        </p>
      </div>

      {/* Dynamic Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 md:col-span-2">
          <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Elementos de la Pestaña</span>
          </h3>

          <ul className="space-y-2.5">
            {notes.map((item, idx) => (
              <li key={idx} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 text-xs sm:text-sm text-stone-700 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <form onSubmit={handleAddNote} className="pt-3 flex gap-2">
            <input
              type="text"
              placeholder="Escribe una nueva nota o dato dinámico para esta pestaña..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="flex-1 text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-stone-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir</span>
            </button>
          </form>
        </div>

        {/* Visual Showcase Card */}
        <div className="bg-stone-900 text-white p-6 rounded-3xl space-y-4 flex flex-col justify-between shadow-md">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold">Arquitectura Dinámica</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              El sistema de pestañas soporta adición de módulos ilimitados. Toda la navegación se actualiza instantáneamente en el Navbar y en el pie de página.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-800 text-[11px] text-stone-500">
            Identificador interno: <code className="text-amber-400 font-mono">{tab.id}</code>
          </div>
        </div>
      </div>

    </div>
  );
};
