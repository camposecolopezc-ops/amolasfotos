/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabId, TabItem, Product, CartItem, BlogPost, BlogComment } from './types';
import { INITIAL_TABS, PRODUCTS_DATA, SERVICES_DATA, BLOG_POSTS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { TabManagerModal } from './components/TabManagerModal';
import { FloatingSupportChat } from './components/FloatingSupportChat';

// Tab Views
import { HomeTab } from './components/tabs/HomeTab';
import { ProductsTab } from './components/tabs/ProductsTab';
import { ServicesTab } from './components/tabs/ServicesTab';
import { GalleryTab } from './components/tabs/GalleryTab';
import { BlogTab } from './components/tabs/BlogTab';
import { AboutTab } from './components/tabs/AboutTab';
import { ContactTab } from './components/tabs/ContactTab';
import { CustomTab } from './components/tabs/CustomTab';

export default function App() {
  // Navigation tabs state
  const [tabs, setTabs] = useState<TabItem[]>(INITIAL_TABS);
  const [activeTab, setActiveTab] = useState<TabId>('inicio');

  // Currency state
  const [currency, setCurrency] = useState<string>('EUR');

  // Shopping Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Search Modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Tab Manager Modal state
  const [isTabManagerOpen, setIsTabManagerOpen] = useState(false);

  // Products state & quick view
  const [products] = useState<Product[]>(PRODUCTS_DATA);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Blog posts & reader state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Blog comment addition
  const handleAddBlogComment = (postId: string, comment: BlogComment) => {
    setBlogPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [comment, ...post.comments]
          };
        }
        return post;
      })
    );

    // Also update selected post if open
    if (selectedBlogPost && selectedBlogPost.id === postId) {
      setSelectedBlogPost(prev => prev ? {
        ...prev,
        comments: [comment, ...prev.comments]
      } : null);
    }
  };

  // Custom Tab handlers
  const handleAddCustomTab = (newTab: TabItem) => {
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTab.id);
  };

  const handleRemoveCustomTab = (tabId: TabId) => {
    setTabs(prev => prev.filter(t => t.id !== tabId));
    if (activeTab === tabId) {
      setActiveTab('inicio');
    }
  };

  const totalCartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Render content based on activeTab
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <HomeTab
            onSelectTab={setActiveTab}
            featuredProducts={products}
            onAddToCart={handleAddToCart}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            currency={currency}
            tabs={tabs}
          />
        );
      case 'productos':
        return (
          <ProductsTab
            products={products}
            onAddToCart={handleAddToCart}
            currency={currency}
            selectedProductModal={quickViewProduct}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onCloseQuickView={() => setQuickViewProduct(null)}
          />
        );
      case 'servicios':
        return (
          <ServicesTab
            onSelectTab={setActiveTab}
            currency={currency}
          />
        );
      case 'galeria':
        return <GalleryTab />;
      case 'blog':
        return (
          <BlogTab
            posts={blogPosts}
            onAddComment={handleAddBlogComment}
            selectedPost={selectedBlogPost}
            onSelectPost={setSelectedBlogPost}
          />
        );
      case 'nosotros':
        return <AboutTab onSelectTab={setActiveTab} />;
      case 'contacto':
        return <ContactTab />;
      default: {
        const customTab = tabs.find(t => t.id === activeTab);
        if (customTab) {
          return <CustomTab tab={customTab} />;
        }
        return (
          <div className="py-24 text-center space-y-4">
            <h2 className="text-2xl font-bold text-stone-800">Pestaña no encontrada</h2>
            <button
              onClick={() => setActiveTab('inicio')}
              className="px-5 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl"
            >
              Volver al Inicio
            </button>
          </div>
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-amber-200 selection:text-stone-950">
      
      {/* Top Main Navigation Bar with Tabs */}
      <Navbar
        tabs={tabs}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        cartCount={totalCartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTabManager={() => setIsTabManagerOpen(true)}
        currency={currency}
        onChangeCurrency={setCurrency}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 w-full">
        {renderActiveTabContent()}
      </main>

      {/* Global Interactive Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        currency={currency}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        blogPosts={blogPosts}
        services={SERVICES_DATA}
        onSelectTab={setActiveTab}
        onSelectProduct={(p) => {
          setActiveTab('productos');
          setQuickViewProduct(p);
        }}
        onSelectBlogPost={(b) => {
          setActiveTab('blog');
          setSelectedBlogPost(b);
        }}
        currency={currency}
      />

      {/* Tab Manager & Custom Tabs Modal */}
      <TabManagerModal
        isOpen={isTabManagerOpen}
        onClose={() => setIsTabManagerOpen(false)}
        tabs={tabs}
        onAddCustomTab={handleAddCustomTab}
        onRemoveCustomTab={handleRemoveCustomTab}
        onSelectTab={setActiveTab}
      />

      {/* Live Support Chat Floating Widget */}
      <FloatingSupportChat />

      {/* Complete Footer with direct links to every tab */}
      <Footer
        tabs={tabs}
        onSelectTab={setActiveTab}
      />

    </div>
  );
}
