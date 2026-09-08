export type TabId = 
  | 'inicio'
  | 'productos'
  | 'servicios'
  | 'galeria'
  | 'blog'
  | 'nosotros'
  | 'contacto'
  | string;

export interface TabItem {
  id: TabId;
  label: string;
  iconName: string;
  badge?: string | number;
  description?: string;
  isCustom?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'Tecnología' | 'Moda' | 'Hogar' | 'Deportes' | 'Accesorios';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages?: string[];
  description: string;
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  basePrice: number;
  deliveryTime: string;
  features: string[];
  included: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'Arquitectura' | 'Naturaleza' | 'Diseño' | 'Tecnología' | 'Urbano';
  imageUrl: string;
  photographer: string;
  photographerUrl?: string;
  location: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  comments: BlogComment[];
}

export interface BlogComment {
  id: string;
  author: string;
  avatar?: string;
  date: string;
  content: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CustomTabContent {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  imageUrl?: string;
  tags: string[];
}
