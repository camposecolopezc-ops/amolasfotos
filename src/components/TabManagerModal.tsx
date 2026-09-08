import React, { useState } from 'react';
import { X, Plus, Trash2, Check, Sparkles, Layers } from 'lucide-react';
import { TabItem, TabId } from '../types';

interface TabManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  tabs: TabItem[];
  onAddCustomTab: (tab: TabItem) => void;
  onRemoveCustomTab: (tabId: TabId) => void;
  onSelectTab: (tabId: TabId) => void;
}

export const TabManagerModal: React.FC<TabManagerModalProps> = ({
  isOpen,
  onClose,
  tabs,
  onAddCustomTab,
  onRemoveCustomTab,
  onSelectTab
}) => {
  const [newTabLabel, setNewTabLabel] = useState('');
  const [newTabDesc, setNewTabDesc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleCreateTab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTabLabel.trim()) {
      setErrorMsg('Por favor escribe un nombre para la nueva pestaña');
      return;
    }

    const id = newTabLabel.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (tabs.some(t => t.id === id)) {
      setErrorMsg('Ya existe una pestaña con este nombre o identificador');
      return;
    }

    const newTab: TabItem = {
      id,
      label: newTabLabel.trim(),
      iconName: 'Layers',
      description: newTabDesc.trim() || 'Pestaña personalizada dinámica',
      badge: 'Extra',
      isCustom: true
    };

    onAddCustomTab(newTab);
    setNewTabLabel('');
    setNewTabDesc('');
    setErrorMsg('');
    onSelectTab(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex justify-center items-center">
      <div 
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="text-base font-bold text-stone-900">Gestor de Pestañas del Sitio</h3>
              <p className="text-xs text-stone-500">Todas las secciones y pestañas activas del sistema</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Active Tabs List */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
              Pestañas Actualmente Activas ({tabs.length})
            </span>
            <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl max-h-56 overflow-y-auto">
              {tabs.map((tab) => (
                <div key={tab.id} className="p-3 flex items-center justify-between hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 text-xs font-bold">
                      {tab.label.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-stone-900">{tab.label}</span>
                        {tab.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                            {tab.badge}
                          </span>
                        )}
                        {tab.isCustom && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                            Personalizada
                          </span>
                        )}
                      </div>
                      {tab.description && (
                        <p className="text-xs text-stone-500">{tab.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        onSelectTab(tab.id);
                        onClose();
                      }}
                      className="px-2.5 py-1 text-xs font-semibold bg-stone-100 hover:bg-stone-900 hover:text-white rounded-lg transition-colors"
                    >
                      Ir
                    </button>
                    {tab.isCustom && (
                      <button
                        onClick={() => onRemoveCustomTab(tab.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg transition-colors"
                        title="Eliminar pestaña"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Custom Tab Form */}
          <form onSubmit={handleCreateTab} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>¿Quieres agregar otra pestaña específica?</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="Nombre de la pestaña (ej: Preguntas Frecuentes, Ofertas...)"
                value={newTabLabel}
                onChange={(e) => setNewTabLabel(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-stone-400"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Descripción breve (opcional)"
                value={newTabDesc}
                onChange={(e) => setNewTabDesc(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-stone-400"
              />
            </div>
            {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
            <button
              type="submit"
              className="w-full py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Pestaña al Menú</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
