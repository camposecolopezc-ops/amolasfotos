import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  MapPin, 
  User, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { GalleryImage } from '../../types';
import { GALLERY_DATA } from '../../data/initialData';

export const GalleryTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = ['Todas', 'Arquitectura', 'Naturaleza', 'Diseño', 'Tecnología', 'Urbano'];

  const filteredImages = GALLERY_DATA.filter((img) => {
    return selectedCategory === 'Todas' || img.category === selectedCategory;
  });

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, filteredImages]);

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex(prev => (prev! === 0 ? filteredImages.length - 1 : prev! - 1));
  };

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex(prev => (prev! === filteredImages.length - 1 ? 0 : prev! + 1));
  };

  const currentImage = activeImageIndex !== null ? filteredImages[activeImageIndex] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold">
          <Camera className="w-3.5 h-3.5 text-amber-600" />
          <span>Pestaña de Galería y Portafolio Visual</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Galería de Proyectos en Alta Resolución
        </h1>
        <p className="text-sm text-stone-600 max-w-2xl">
          Colección de capturas, arquitectura contemporánea e imágenes directas con visor dinámico (Lightbox) en pantalla completa.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-stone-900 text-white shadow-xs scale-105'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-xs text-stone-500 font-medium hidden sm:inline">
          Mostrando {filteredImages.length} {filteredImages.length === 1 ? 'fotografía' : 'fotografías'}
        </span>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => setActiveImageIndex(index)}
            className="group relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 cursor-pointer aspect-4/3 sm:aspect-square shadow-xs hover:shadow-xl transition-all duration-300"
          >
            {/* Direct Image Link */}
            <img
              src={image.imageUrl}
              alt={image.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
              }}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {image.category}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white leading-tight drop-shadow-xs">
                  {image.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-300">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">{image.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
                  <User className="w-3 h-3 text-stone-300 shrink-0" />
                  <span>Foto por {image.photographer}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {currentImage && activeImageIndex !== null && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-stone-950/95 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
          
          {/* Close Button */}
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-stone-800 text-stone-200 hover:text-white hover:bg-stone-700 transition-colors"
            title="Cerrar (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-6 z-20 p-3 rounded-full bg-stone-800/80 hover:bg-stone-700 text-white transition-colors"
            title="Anterior (Flecha izquierda)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-6 z-20 p-3 rounded-full bg-stone-800/80 hover:bg-stone-700 text-white transition-colors"
            title="Siguiente (Flecha derecha)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Display Container */}
          <div className="max-w-5xl w-full flex flex-col items-center justify-center space-y-4">
            <div className="relative max-h-[75vh] w-auto overflow-hidden rounded-2xl shadow-2xl border border-stone-800 bg-black flex items-center justify-center">
              <img
                src={currentImage.imageUrl}
                alt={currentImage.title}
                className="max-h-[75vh] w-auto object-contain select-none"
              />
            </div>

            {/* Image Metadata Bar */}
            <div className="w-full max-w-2xl bg-stone-900/90 border border-stone-800 rounded-2xl p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="space-y-0.5">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider">
                    {currentImage.category}
                  </span>
                  <span className="text-stone-500">•</span>
                  <span className="text-xs text-stone-400">
                    {activeImageIndex + 1} de {filteredImages.length}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{currentImage.title}</h4>
                <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-stone-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    {currentImage.location}
                  </span>
                  <span>•</span>
                  <span>Por {currentImage.photographer}</span>
                </div>
              </div>

              <a
                href={currentImage.imageUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
              >
                <span>Ver Original</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
