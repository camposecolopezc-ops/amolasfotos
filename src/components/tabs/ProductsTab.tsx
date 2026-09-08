import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Star, 
  Check, 
  ArrowUpDown, 
  X, 
  CheckCircle2, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface ProductsTabProps {
  products: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  currency: string;
  selectedProductModal: Product | null;
  onOpenQuickView: (product: Product) => void;
  onCloseQuickView: () => void;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({
  products,
  onAddToCart,
  currency,
  selectedProductModal,
  onOpenQuickView,
  onCloseQuickView
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Quick view internal modal state
  const [quickViewQuantity, setQuickViewQuantity] = useState(1);
  const [activeModalImageIndex, setActiveModalImageIndex] = useState(0);

  const categories = ['Todos', 'Tecnología', 'Hogar', 'Accesorios', 'Deportes'];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = item.price <= maxPrice;
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // relevance
      });
  }, [products, selectedCategory, searchQuery, sortBy, maxPrice]);

  const handleAddToCartWithToast = (product: Product, qty: number = 1) => {
    onAddToCart(product, qty);
    setAddedToast(`¡"${product.name}" añadido al carrito!`);
    setTimeout(() => {
      setAddedToast(null);
    }, 2800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-150">
          <div className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
            <Check className="w-3.5 h-3.5 stroke-3" />
          </div>
          <span className="text-xs sm:text-sm font-semibold">{addedToast}</span>
        </div>
      )}

      {/* Header & Title */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold">
          <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
          <span>Pestaña de Productos y Tienda</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Catálogo Comercial Dinámico
        </h1>
        <p className="text-sm text-stone-600 max-w-2xl">
          Explora nuestra selección de artículos con especificaciones completas, filtros en tiempo real y carrito de compras integrado.
        </p>
      </div>

      {/* Filters and Controls Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-hidden focus:border-stone-400 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Ordenar por:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold py-2 px-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 cursor-pointer focus:outline-hidden focus:border-stone-400"
            >
              <option value="relevance">Destacados / Relevancia</option>
              <option value="price-asc">Precio: de menor a mayor</option>
              <option value="price-desc">Precio: de mayor a menor</option>
              <option value="rating">Mejor valorados</option>
            </select>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-stone-400 mr-1 hidden sm:inline">Categoría:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Max price filter */}
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span>Precio máx:</span>
            <input
              type="range"
              min="30"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 sm:w-32 accent-stone-900 cursor-pointer"
            />
            <span className="font-bold text-stone-900 w-16 text-right">
              {formatCurrency(maxPrice, currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
          <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">No hay productos que coincidan</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Prueba a restablecer los filtros de búsqueda o el rango de precio para ver más resultados.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Todos');
              setSearchQuery('');
              setMaxPrice(1000);
            }}
            className="mt-2 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors"
          >
            Restablecer todos los filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const hasDiscount = product.originalPrice && product.originalPrice > product.price;
            const discountPercentage = hasDiscount 
              ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-200 flex flex-col group"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';
                    }}
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                      <span className="bg-stone-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                        NUEVO
                      </span>
                    )}
                    {hasDiscount && (
                      <span className="bg-amber-500 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                        -{discountPercentage}%
                      </span>
                    )}
                  </div>

                  {/* Overlay Quick View Button */}
                  <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-2xs">
                    <button
                      onClick={() => onOpenQuickView(product)}
                      className="px-4 py-2 bg-white text-stone-900 text-xs font-bold rounded-xl shadow-md hover:bg-stone-100 transition-colors"
                    >
                      Vista Rápida
                    </button>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-400 font-medium uppercase tracking-wider text-[10px]">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating}</span>
                        <span className="text-stone-400 text-[10px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 
                      onClick={() => onOpenQuickView(product)}
                      className="text-sm font-bold text-stone-900 hover:text-amber-700 cursor-pointer line-clamp-1 transition-colors"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-extrabold text-stone-900">
                        {formatCurrency(product.price, currency)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-stone-400 line-through">
                          {formatCurrency(product.originalPrice, currency)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCartWithToast(product)}
                      className="py-2 px-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-transform active:scale-95 shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Comprar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick View Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex justify-center items-center">
          <div 
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity" 
            onClick={onCloseQuickView}
          />

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 border border-stone-200">
            {/* Close modal */}
            <button
              onClick={onCloseQuickView}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 rounded-full shadow-xs transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image & Gallery */}
              <div className="p-6 bg-stone-50 flex flex-col justify-between space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-xs">
                  <img
                    src={selectedProductModal.galleryImages?.[activeModalImageIndex] || selectedProductModal.image}
                    alt={selectedProductModal.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnails if available */}
                {selectedProductModal.galleryImages && selectedProductModal.galleryImages.length > 1 && (
                  <div className="flex gap-2">
                    {selectedProductModal.galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveModalImageIndex(idx)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                          activeModalImageIndex === idx ? 'border-amber-600 scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details & Action */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      {selectedProductModal.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{selectedProductModal.rating}</span>
                      <span className="text-stone-400">({selectedProductModal.reviewsCount} opiniones)</span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                    {selectedProductModal.name}
                  </h2>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-stone-900">
                      {formatCurrency(selectedProductModal.price, currency)}
                    </span>
                    {selectedProductModal.originalPrice && (
                      <span className="text-sm text-stone-400 line-through">
                        {formatCurrency(selectedProductModal.originalPrice, currency)}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {selectedProductModal.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs font-bold text-stone-800 block">Características principales:</span>
                    <ul className="space-y-1">
                      {selectedProductModal.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-stone-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="pt-4 border-t border-stone-200 space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-stone-700">Cantidad:</span>
                    <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50">
                      <button
                        onClick={() => setQuickViewQuantity(Math.max(1, quickViewQuantity - 1))}
                        className="px-3 py-1.5 hover:bg-stone-200 text-stone-700 font-bold rounded-l-xl transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 text-xs font-bold text-stone-900">{quickViewQuantity}</span>
                      <button
                        onClick={() => setQuickViewQuantity(quickViewQuantity + 1)}
                        className="px-3 py-1.5 hover:bg-stone-200 text-stone-700 font-bold rounded-r-xl transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleAddToCartWithToast(selectedProductModal, quickViewQuantity);
                      onCloseQuickView();
                    }}
                    className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Añadir al Carrito ({formatCurrency(selectedProductModal.price * quickViewQuantity, currency)})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
