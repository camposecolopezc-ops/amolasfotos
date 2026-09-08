import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  MessageSquare, 
  Share2, 
  ArrowRight, 
  X, 
  Send, 
  CheckCircle2,
  Bookmark,
  Calendar
} from 'lucide-react';
import { BlogPost, BlogComment } from '../../types';

interface BlogTabProps {
  posts: BlogPost[];
  onAddComment: (postId: string, comment: BlogComment) => void;
  selectedPost: BlogPost | null;
  onSelectPost: (post: BlogPost | null) => void;
}

export const BlogTab: React.FC<BlogTabProps> = ({
  posts,
  onAddComment,
  selectedPost,
  onSelectPost
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Comment form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const categories = ['Todos', 'Desarrollo Web', 'Diseño UX/UI', 'Ingeniería'];

  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !newAuthor.trim() || !newCommentText.trim()) return;

    const newComment: BlogComment = {
      id: 'comm-' + Date.now(),
      author: newAuthor.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      date: 'Hace un momento',
      content: newCommentText.trim()
    };

    onAddComment(selectedPost.id, newComment);
    setNewAuthor('');
    setNewCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          <span>Pestaña de Blog, Noticias y Artículos</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Publicaciones y Artículos Técnicos
        </h1>
        <p className="text-sm text-stone-600 max-w-2xl">
          Análisis profundos sobre tecnología moderna, diseño de interfaces, escalabilidad y experiencias digitales, con sistema de comentarios interactivo.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por tema o etiqueta..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-stone-400"
          />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-3xl border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
            onClick={() => onSelectPost(post)}
          >
            {/* Cover Image */}
            <div className="aspect-16/10 overflow-hidden bg-stone-100 relative">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                {post.category}
              </span>
            </div>

            {/* Post Content preview */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-stone-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Author & Footer */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block leading-tight">
                      {post.author.name}
                    </span>
                    <span className="text-[10px] text-stone-400">{post.author.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold group-hover:text-amber-700">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Reader & Interactive Comments Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex justify-center items-start">
          <div 
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity" 
            onClick={() => onSelectPost(null)}
          />

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 border border-stone-200 my-8">
            {/* Modal close */}
            <button
              onClick={() => onSelectPost(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 shadow-md transition-colors"
              title="Cerrar artículo"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero Image */}
            <div className="aspect-21/9 overflow-hidden bg-stone-100 relative">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 to-transparent flex items-end p-6 sm:p-8">
                <span className="px-3 py-1 bg-amber-500 text-stone-950 text-xs font-black rounded-full uppercase tracking-wider">
                  {selectedPost.category}
                </span>
              </div>
            </div>

            {/* Article Body */}
            <div className="p-6 sm:p-8 space-y-8">
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
                  {selectedPost.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-stone-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedPost.author.avatar}
                      alt={selectedPost.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-stone-200"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">{selectedPost.author.name}</span>
                      <span className="text-[11px] text-stone-500">{selectedPost.author.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-stone-400">
                    <span>{selectedPost.date}</span>
                    <span>•</span>
                    <span>{selectedPost.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                {selectedPost.content}
              </div>

              {/* Tags */}
              <div className="pt-4 flex flex-wrap items-center gap-2 border-t border-stone-100">
                <span className="text-xs font-bold text-stone-400 mr-1">Etiquetas:</span>
                {selectedPost.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Interactive Comments Section */}
              <section className="pt-8 border-t border-stone-200 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-amber-600" />
                    <span>Comentarios de la Comunidad ({selectedPost.comments.length})</span>
                  </h3>
                </div>

                {/* Existing comments */}
                <div className="space-y-3">
                  {selectedPost.comments.length === 0 ? (
                    <p className="text-xs text-stone-500 italic">Sé el primero en dejar un comentario en este artículo.</p>
                  ) : (
                    selectedPost.comments.map((c) => (
                      <div key={c.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={c.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                              alt={c.author}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-xs font-bold text-stone-900">{c.author}</span>
                          </div>
                          <span className="text-[10px] text-stone-400">{c.date}</span>
                        </div>
                        <p className="text-xs text-stone-700 leading-relaxed pl-8">
                          {c.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handleCommentSubmit} className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Deja tu comentario
                  </h4>

                  {commentSuccess && (
                    <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>¡Tu comentario ha sido publicado en tiempo real!</span>
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre completo..."
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-stone-400"
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      rows={3}
                      placeholder="Escribe tu opinión, pregunta o feedback sobre el artículo..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-stone-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    <span>Publicar Comentario</span>
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
