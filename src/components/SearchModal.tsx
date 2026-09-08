import React, { useState, useMemo } from 'react';
import { Search, X, ShoppingBag, BookOpen, Briefcase, ArrowRight } from 'lucide-react';
import { Product, BlogPost, ServiceItem, TabId } from '../types';
import { formatCurrency } from '../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  blogPosts: BlogPost[];
  services: ServiceItem[];
  onSelectTab: (tabId: TabId) => void;
  onSelectProduct?: (product: Product) => void;
  onSelectBlogPost?: (post: BlogPost) => void;
  currency: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  blogPosts,
  services,
  onSelectTab,
  onSelectProduct,
  onSelectBlogPost,
  currency
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return { products: [], blogs: [], services: [] };
    const q = query.toLowerCase().trim();

    return {
      products: products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      ),
      blogs: blogPosts.filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.excerpt.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      ),
      services: services.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q)
      )
    };
  }, [query, products, blogPosts, services]);

  if (!isOpen) return null;

  const totalResultsCount = results.products.length + results.blogs.length + results.services.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start">
      <div 
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            placeholder="Buscar productos, artículos del blog o servicios..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-base bg-transparent border-0 focus:outline-hidden text-stone-900 placeholder:text-stone-400"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 py-1.5 px-2.5 rounded-lg font-medium transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="py-8 text-center text-stone-500 text-sm">
              <p className="mb-2">Escribe cualquier palabra clave para buscar en tiempo real.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="text-xs text-stone-400">Sugerencias:</span>
                {['Auriculares', 'Desarrollo Web', 'Escalabilidad', 'Reloj', 'UX/UI'].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setQuery(sug)}
                    className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-800 px-2.5 py-1 rounded-full font-medium transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResultsCount === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <p className="text-sm">No encontramos resultados para "{query}".</p>
              <p className="text-xs text-stone-400 mt-1">Intenta con otros términos como tecnología, diseño o audio.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Products Results */}
              {results.products.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Productos ({results.products.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.products.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          onClose();
                          if (onSelectProduct) onSelectProduct(prod);
                          onSelectTab('productos');
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50 cursor-pointer border border-transparent hover:border-stone-200 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-lg border border-stone-200" />
                          <div>
                            <h4 className="text-sm font-semibold text-stone-900">{prod.name}</h4>
                            <span className="text-xs text-stone-500">{prod.category}</span>
                          </div>
                        </div>
                        <div className="text-sm font-bold text-stone-900">
                          {formatCurrency(prod.price, currency)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Results */}
              {results.services.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Servicios ({results.services.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.services.map((serv) => (
                      <div
                        key={serv.id}
                        onClick={() => {
                          onClose();
                          onSelectTab('servicios');
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50 cursor-pointer border border-transparent hover:border-stone-200 transition-colors"
                      >
                        <div>
                          <h4 className="text-sm font-semibold text-stone-900">{serv.title}</h4>
                          <span className="text-xs text-stone-500 line-clamp-1">{serv.description}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Results */}
              {results.blogs.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Artículos del Blog ({results.blogs.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.blogs.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => {
                          onClose();
                          if (onSelectBlogPost) onSelectBlogPost(post);
                          onSelectTab('blog');
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50 cursor-pointer border border-transparent hover:border-stone-200 transition-colors"
                      >
                        <div>
                          <h4 className="text-sm font-semibold text-stone-900">{post.title}</h4>
                          <span className="text-xs text-stone-500">{post.category} • {post.readTime}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
