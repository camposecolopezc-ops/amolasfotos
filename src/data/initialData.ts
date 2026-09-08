import { TabItem, Product, ServiceItem, GalleryImage, BlogPost, TeamMember, FAQItem } from '../types';

export const INITIAL_TABS: TabItem[] = [
  { id: 'inicio', label: 'Inicio', iconName: 'Home', description: 'Visión general, novedades y destacados' },
  { id: 'productos', label: 'Productos', iconName: 'ShoppingBag', badge: 'Nuevo', description: 'Catálogo comercial con carrito integrado' },
  { id: 'servicios', label: 'Servicios', iconName: 'Briefcase', description: 'Soluciones profesionales y cotizador en vivo' },
  { id: 'galeria', label: 'Galería', iconName: 'Camera', description: 'Fotografías y proyectos en alta resolución' },
  { id: 'blog', label: 'Blog', iconName: 'BookOpen', description: 'Artículos, guías y comentarios en directo' },
  { id: 'nosotros', label: 'Nosotros', iconName: 'Users', description: 'Nuestra misión, trayectoria y equipo' },
  { id: 'contacto', label: 'Contacto', iconName: 'Mail', description: 'Formulario dinámico, mapa y preguntas frecuentes' },
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-1',
    name: 'Auriculares Inalámbricos Studio Pro',
    category: 'Tecnología',
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cancelación activa de ruido híbrida de última generación con transductores de neodimio de 40mm y hasta 45 horas de reproducción continua.',
    features: ['Cancelación activa ANC', 'Autonomía 45 horas', 'Carga ultrarrápida USB-C', 'Audio espacial Hi-Res'],
    inStock: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'prod-2',
    name: 'Reloj Inteligente Horizon Titanium',
    category: 'Tecnología',
    price: 279.00,
    originalPrice: 320.00,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cuerpo de titanio aeroespacial y cristal de zafiro. Monitorización de frecuencia cardíaca ECG, oxígeno en sangre SpO2 y GPS satelital dual.',
    features: ['Caja de titanio aeroespacial', 'Resistencia al agua 50m', 'Pantalla AMOLED Always-On', 'Sensor ECG y SpO2'],
    inStock: true,
    isFeatured: true,
  },
  {
    id: 'prod-3',
    name: 'Lámpara de Diseño Minimalista Órbit',
    category: 'Hogar',
    price: 115.50,
    rating: 4.7,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    description: 'Lámpara de sobremesa regulable con selector de temperatura de color (2700K - 6500K) y base con cargador inalámbrico Qi integrado.',
    features: ['Atenuación táctil continua', 'Cargador Qi en base', 'Aluminio cepillado', 'Eficiencia energética A+++'],
    inStock: true,
    isFeatured: false,
  },
  {
    id: 'prod-4',
    name: 'Mochila Urbana Impermeable Nordic',
    category: 'Accesorios',
    price: 84.99,
    originalPrice: 109.99,
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description: 'Diseño ergonómico con tejido Cordura repelente al agua, compartimento acolchado para portátiles de hasta 16 pulgadas y bolsillos antirrobo ocultos.',
    features: ['Tejido impermeable Cordura', 'Compartimento laptop 16"', 'Puerto de paso de cables', 'Capacidad 24 Litros'],
    inStock: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'prod-5',
    name: 'Cámara Fotográfica Compacta Vintage 4K',
    category: 'Tecnología',
    price: 649.00,
    originalPrice: 720.00,
    rating: 4.9,
    reviewsCount: 81,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    description: 'Sensor APS-C de 26.1 megapíxeles con simulación de película clásica, visor óptico/híbrido y grabación de vídeo 4K a 60fps.',
    features: ['Sensor APS-C 26.1 MP', 'Estabilización en el cuerpo', 'Enfoque automático con IA', 'Grabación 4K HDR'],
    inStock: true,
    isFeatured: true,
  },
  {
    id: 'prod-6',
    name: 'Silla Ergonómica Pro Flow',
    category: 'Hogar',
    price: 349.99,
    originalPrice: 420.00,
    rating: 4.8,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1580481077195-c266a2b85ecb?auto=format&fit=crop&w=800&q=80',
    description: 'Malla transpirable de alto rendimiento con soporte lumbar autorregulable en 4 dimensiones y reposabrazos 3D multidireccionales.',
    features: ['Soporte lumbar dinámico', 'Malla transpirable térmica', 'Inclinación sincronizada 135°', 'Garantía 10 años'],
    inStock: true,
    isFeatured: false,
  },
  {
    id: 'prod-7',
    name: 'Botella Térmica de Vacío Titanium 750ml',
    category: 'Deportes',
    price: 38.00,
    rating: 4.7,
    reviewsCount: 53,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    description: 'Acero inoxidable 18/8 de grado alimentario con aislamiento al vacío de triple pared. Mantiene bebidas frías 24h o calientes 12h.',
    features: ['Triple pared aislante', 'Sin BPA ni tóxicos', 'Tapa antigoteo con mosquetón', 'Acabado antiarañazos'],
    inStock: true,
    isFeatured: false,
  },
  {
    id: 'prod-8',
    name: 'Zapatillas de Running Ultra Aero',
    category: 'Deportes',
    price: 139.99,
    originalPrice: 165.00,
    rating: 4.8,
    reviewsCount: 177,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    description: 'Suela con placa de fibra de carbono reactiva y espuma ultraligera para máxima propulsión en entrenamientos y competiciones.',
    features: ['Placa de fibra de carbono', 'Espuma reactiva supercrítica', 'Malla de ingeniería ultratranspirable', 'Drop 6mm'],
    inStock: true,
    isFeatured: true,
    isNew: true,
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'serv-1',
    title: 'Desarrollo Web & Plataformas a Medida',
    category: 'Tecnología',
    description: 'Arquitecturas web escalables, ultrarrápidas y optimizadas para conversión con las tecnologías más modernas.',
    icon: 'Code2',
    basePrice: 850,
    deliveryTime: '2-3 semanas',
    features: ['Diseño responsive adaptable a todos los dispositivos', 'Optimización SEO y rendimiento Core Web Vitals', 'Panel de administración dinámico', 'Integración de pasarelas de pago y APIs'],
    included: true,
  },
  {
    id: 'serv-2',
    title: 'Diseño de Identidad de Marca y UI/UX',
    category: 'Diseño',
    description: 'Sistemas visuales completos, manual de marca, prototipado interactivo en alta fidelidad e investigación de usuarios.',
    icon: 'Palette',
    basePrice: 620,
    deliveryTime: '1-2 semanas',
    features: ['Auditoría visual y benchmarking competitivo', 'Diseño de logotipo y paleta de colores', 'Sistema de diseño modular (Design System)', 'Prototipos testeados con usuarios reales'],
    included: true,
  },
  {
    id: 'serv-3',
    title: 'Estrategia Digital & Posicionamiento SEO',
    category: 'Marketing',
    description: 'Atracción de tráfico cualificado mediante optimización en motores de búsqueda, analítica de datos y campañas de contenido.',
    icon: 'TrendingUp',
    basePrice: 480,
    deliveryTime: 'Continuo / Mensual',
    features: ['Auditoría técnica SEO completa', 'Estrategia de palabras clave de alta intención', 'Optimización semántica on-page', 'Informes ejecutivos mensuales con métricas de KPI'],
    included: false,
  },
  {
    id: 'serv-4',
    title: 'Mantenimiento & Seguridad Cloud 24/7',
    category: 'Infraestructura',
    description: 'Copias de seguridad automatizadas, monitorización continua del servidor, parches de seguridad y soporte técnico prioritario.',
    icon: 'ShieldCheck',
    basePrice: 290,
    deliveryTime: 'Mensual',
    features: ['Monitoreo de tiempo de actividad 99.9%', 'Copias de seguridad diarias en la nube', 'Certificados SSL y cortafuegos WAF', 'Respuesta en menos de 2 horas garantizada'],
    included: false,
  }
];

export const GALLERY_DATA: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'Vértice de Cristal y Acero',
    category: 'Arquitectura',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    photographer: 'Sean Pollock',
    location: 'Distrito Financiero, Singapur',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-2',
    title: 'Amanecer en las Altas Cumbres',
    category: 'Naturaleza',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    photographer: 'Bailey Zindel',
    location: 'Parque Nacional Yosemite, California',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-3',
    title: 'Estación de Trabajo Minimalista',
    category: 'Diseño',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
    photographer: 'Samson Katt',
    location: 'Estudio Creativo, Estocolmo',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-4',
    title: 'Luces de Neón en la Noche',
    category: 'Urbano',
    imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=85',
    photographer: 'Aleksandar Pasaric',
    location: 'Shinjuku, Tokio',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-5',
    title: 'Circuitos y Óptica Cuántica',
    category: 'Tecnología',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
    photographer: 'Alexandre Debiève',
    location: 'Laboratorio de Nanotecnología, Zúrich',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-6',
    title: 'Estructuras Paramétricas de Hormigón',
    category: 'Arquitectura',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    photographer: 'Simone Hutsch',
    location: 'Pabellón Internacional, Londres',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-7',
    title: 'Reflejos en Lago Glaciar',
    category: 'Naturaleza',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=85',
    photographer: 'Luca Bravo',
    location: 'Lagos de Braies, Dolomitas',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-8',
    title: 'Composición Geométrica Bauhaus',
    category: 'Diseño',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85',
    photographer: 'David Pisnoy',
    location: 'Galería de Arte Moderno, Berlín',
    aspectRatio: 'landscape'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'El Futuro del Desarrollo Web: Tendencias que Dominarán este Año',
    excerpt: 'Descubre cómo la inteligencia artificial generativa, el renderizado en el borde y los componentes reactivos están transformando la web moderna.',
    content: `El desarrollo web está viviendo una de sus transformaciones más profundas en la última década. La combinación de frameworks reactivos de alto rendimiento, compilación sin sobrecarga en tiempo de ejecución y arquitecturas distribuidas permite a los desarrolladores crear aplicaciones que cargan instantáneamente en cualquier parte del mundo.

En este artículo exploramos cómo las herramientas modernas permiten un flujo de trabajo sin fricciones, integrando pruebas automatizadas, sistemas de diseño modulares y una experiencia de usuario orientada al rendimiento. Además, abordamos la accesibilidad universal como pilar indispensable en cualquier proyecto digital contemporáneo.`,
    category: 'Desarrollo Web',
    author: {
      name: 'Elena Ramos',
      role: 'Lead Architect',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    date: '14 de Octubre, 2024',
    readTime: '5 min de lectura',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80',
    tags: ['Frontend', 'JavaScript', 'Rendimiento', 'Arquitectura'],
    comments: [
      {
        id: 'c-1',
        author: 'Carlos Mendoza',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        date: 'Hace 2 días',
        content: '¡Excelente artículo! La explicación sobre el renderizado híbrido me aclaró muchas dudas para migrar nuestro proyecto.'
      },
      {
        id: 'c-2',
        author: 'Lucía Fernández',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        date: 'Ayer',
        content: 'Totalmente de acuerdo en la importancia del rendimiento web y la accesibilidad. Muy bien estructurado.'
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Diseño Centrado en la Persona: De la Teoría a la Experiencia Digital',
    excerpt: 'Estrategias prácticas para construir interfaces intuitivas, reduciendo la carga cognitiva y deleitando a los usuarios en cada interacción.',
    content: `Diseñar no consiste únicamente en elegir colores atractivos o tipografías de moda. El verdadero diseño de producto consiste en comprender profundamente los modelos mentales de las personas que interactuarán con nuestra creación.

Cuando alineamos la jerarquía visual, la retroalimentación táctil y el contraste cromático con las necesidades del usuario, la interfaz se vuelve invisible: la persona logra su objetivo sin esfuerzo ni frustración. Analizamos ejemplos reales de simplificación de flujos en comercio electrónico y paneles de gestión.`,
    category: 'Diseño UX/UI',
    author: {
      name: 'Martín Soler',
      role: 'Director de Diseño',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    date: '8 de Octubre, 2024',
    readTime: '7 min de lectura',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80',
    tags: ['UI/UX', 'Investigación', 'Ergonomía', 'Interactividad'],
    comments: [
      {
        id: 'c-3',
        author: 'Adrián Vega',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        date: 'Hace 3 días',
        content: 'La sección sobre la reducción de la fricción cognitiva es oro puro. Aplicaremos varias de estas técnicas en nuestra app.'
      }
    ]
  },
  {
    id: 'post-3',
    title: 'Estrategias de Escalabilidad y Resiliencia en Aplicaciones Modernas',
    excerpt: 'Aprende a estructurar bases de código modulares preparadas para crecer con millones de usuarios sin comprometer la velocidad ni la estabilidad.',
    content: `A medida que un producto digital crece, la complejidad del código y del despliegue puede multiplicar exponencialmente el tiempo de mantenimiento. En esta guía desglosamos patrones de diseño modulares, gestión de estado predecible y optimizaciones de caché que garantizan una experiencia continua y robusta.`,
    category: 'Ingeniería',
    author: {
      name: 'Valeria Castro',
      role: 'DevOps & Cloud Lead',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    },
    date: '28 de Septiembre, 2024',
    readTime: '6 min de lectura',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    tags: ['Cloud', 'Escalabilidad', 'Infraestructura', 'Sistemas'],
    comments: []
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Sofía Navarro',
    role: 'Directora Ejecutiva & Fundadora',
    bio: 'Más de 14 años de experiencia liderando proyectos de transformación digital y desarrollo tecnológico internacional.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    skills: ['Estrategia Digital', 'Liderazgo', 'Innovación'],
    social: { linkedin: '#', twitter: '#' }
  },
  {
    id: 'tm-2',
    name: 'Mateo González',
    role: 'Director Técnico (CTO)',
    bio: 'Especialista en arquitecturas frontend de alto rendimiento, microservicios y sistemas distribuidos en la nube.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    skills: ['TypeScript', 'Cloud Architecture', 'Rendimiento Web'],
    social: { linkedin: '#', github: '#' }
  },
  {
    id: 'tm-3',
    name: 'Camila Rojas',
    role: 'Jefa de Diseño de Producto & UX',
    bio: 'Apasionada por la creación de experiencias visuales limpias, accesibles y con una profunda orientación al usuario.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    skills: ['Diseño de Sistemas', 'Investigación UX', 'Figma'],
    social: { linkedin: '#', twitter: '#' }
  },
  {
    id: 'tm-4',
    name: 'Javier Morales',
    role: 'Líder de Soporte y Éxito de Clientes',
    bio: 'Comprometido en garantizar que cada cliente y usuario final obtenga el máximo valor con soporte cercano y ágil.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    skills: ['Gestión de Clientes', 'Soporte 24/7', 'Procesos Ágiles'],
    social: { linkedin: '#' }
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: '¿Cómo funciona la navegación dinámica por pestañas?',
    answer: 'Nuestra plataforma utiliza un sistema de enrutamiento y estado dinámico en tiempo real que permite alternar instantáneamente entre todas las pestañas sin recargar la página, conservando tus filtros, búsquedas y carrito de compras.'
  },
  {
    id: 'faq-2',
    category: 'Productos',
    question: '¿Cuáles son los métodos de pago y tiempos de entrega?',
    answer: 'Aceptamos tarjetas de crédito/débito principales, transferencias y pasarelas digitales seguras. Los envíos de productos físicos toman entre 24 y 72 horas con seguimiento en vivo.'
  },
  {
    id: 'faq-3',
    category: 'Servicios',
    question: '¿Puedo personalizar una cotización según mi proyecto?',
    answer: '¡Por supuesto! En la pestaña "Servicios" dispones de un cotizador interactivo en tiempo real donde puedes seleccionar los módulos requeridos y obtener una estimación presupuestaria inmediata.'
  },
  {
    id: 'faq-4',
    category: 'Soporte',
    question: '¿Qué garantía y soporte post-entrega ofrecen?',
    answer: 'Todos nuestros productos y desarrollos cuentan con soporte técnico continuo, actualizaciones de seguridad y un canal de contacto directo disponible los 7 días de la semana.'
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 't-1',
    author: 'Dra. Patricia Vidal',
    role: 'Directora de Innovación en HealthCorp',
    content: 'La facilidad de navegación, la fluidez entre secciones y la atención al detalle superaron con creces nuestras expectativas. La plataforma es intuitiva y sumamente rápida.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5
  },
  {
    id: 't-2',
    author: 'Ing. Fernando Ortiz',
    role: 'Fundador de Soluciones Nexus',
    content: 'Tener catálogo con carrito, cotizador de servicios en tiempo real y galería en un solo sitio integrado dinamizó nuestras conversiones desde la primera semana.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    rating: 5
  },
  {
    id: 't-3',
    author: 'Gabriela Méndez',
    role: 'Gerente Comercial en Studio Creativo',
    content: 'El diseño visual es pulcro, moderno y la experiencia de usuario es inmejorable tanto en móvil como en escritorio. Totalmente recomendados.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5
  }
];
