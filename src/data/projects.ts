export type Designer = {
  id: string
  name: string
  role: string
  bio: string
  approach: string
  specialties: string[]
  portrait: string
  featured: boolean
}

export type Project = {
  id: string
  title: string
  category: string
  categorySlug: string
  designerId: string
  coverImage: string
  gallery: string[]
  description: string
  location?: string
  year?: number
  area?: string
  style?: string
  materials?: string[]
  featured: boolean
}

export const designers: Designer[] = [
  {
    id: 'zhantsannurov',
    name: 'Жанцанноров',
    role: 'Interior Designer',
    bio: 'Жанцанноров is a visionary interior architect whose work is defined by the precise balance of light, material, and spatial rhythm. With an innate ability to read a space, he transforms ordinary environments into deeply personal sanctuaries. His designs speak with restraint and confidence.',
    approach: 'I believe every space has a latent identity — my work is about uncovering it. I use natural materials, considered proportions, and carefully orchestrated light to create interiors that feel both timeless and deeply alive.',
    specialties: ['Residential', 'Hospitality', 'Commercial', 'Office Design'],
    portrait: '/static/portraits/zhantsannurov.jpg',
    featured: true,
  },
  {
    id: 'togoldor',
    name: 'Төгөлдөр',
    role: 'Interior Designer',
    bio: 'Төгөлдөр brings a refined sensibility shaped by years of studying architectural form and material culture. His interiors are calm, curated, and richly textured — spaces where every object earns its place. He is drawn to quiet details that create lasting emotional impressions.',
    approach: 'Design is a conversation between material and memory. I work with tactile surfaces, earthy tones, and spatial clarity to build environments that ground the people who inhabit them. Every project is an act of precision and restraint.',
    specialties: ['Residential', 'Bedroom Design', 'Wellness Spaces', 'Retail'],
    portrait: '/static/portraits/togoldor.jpg',
    featured: true,
  },
  {
    id: 'ankhbayar',
    name: 'Анхбаяр',
    role: 'Interior Designer',
    bio: 'Анхбаяр is a creative force whose portfolio spans intimate domestic spaces to ambitious commercial environments. Her design language is fluid, emotionally warm, and deeply contemporary. She has a rare gift for making a space feel both curated and effortlessly livable.',
    approach: 'I design spaces that breathe. My process begins with understanding the life that will unfold inside a space — and from that understanding, I craft interiors that feel inevitable. I am guided by warmth, texture, and a deep respect for how people actually live.',
    specialties: ['Residential', 'Kids Rooms', 'Cafés & Coffee Shops', 'Dental Clinics'],
    portrait: '/static/portraits/ankhbayar.jpg',
    featured: true,
  },
]

export const categories = [
  { slug: 'kitchen', label: 'Kitchen', labelMn: 'Гал тогоо' },
  { slug: 'living-room', label: 'Living Room', labelMn: 'Зочны өрөө' },
  { slug: 'kids-room', label: 'Kids Room', labelMn: 'Хүүхдийн өрөө' },
  { slug: 'work-room', label: 'Work Room', labelMn: 'Ажлын өрөө' },
  { slug: 'office', label: 'Office', labelMn: 'Оффис' },
  { slug: 'bathroom', label: 'Bathroom', labelMn: 'Угаалгын өрөө' },
  { slug: 'master-bedroom', label: 'Master Bedroom', labelMn: 'Унтлагын өрөө' },
  { slug: 'auto-mall', label: 'Auto Mall', labelMn: 'Авто молл' },
  { slug: 'esport-center', label: 'E-sport Center', labelMn: 'Е-спорт төв' },
  { slug: 'dental-clinic', label: 'Dental Clinic', labelMn: 'Шүдний клиник' },
  { slug: 'coffee-shop', label: 'Coffee Shop', labelMn: 'Кофе шоп' },
]

export const projects: Project[] = [
  {
    id: 'stone-kitchen-ulaanbaatar',
    title: 'Stone & Warmth Kitchen',
    category: 'Kitchen',
    categorySlug: 'kitchen',
    designerId: 'zhantsannurov',
    coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
    ],
    description: 'A refined kitchen sculpted in natural stone and warm oak. Conceived as both a functional workspace and a place of daily ritual, this kitchen embodies quiet luxury through material honesty and spatial precision.',
    location: 'Ulaanbaatar',
    year: 2024,
    area: '28 m²',
    style: 'Contemporary Organic',
    materials: ['Marble', 'Smoked Oak', 'Brushed Bronze', 'Limestone'],
    featured: true,
  },
  {
    id: 'minimal-living-retreat',
    title: 'Minimal Living Retreat',
    category: 'Living Room',
    categorySlug: 'living-room',
    designerId: 'togoldor',
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    ],
    description: 'A living space conceived around stillness. Clean volumes, layered textures, and a palette drawn from the natural world combine to create a room that feels both spacious and deeply intimate.',
    location: 'Ulaanbaatar',
    year: 2024,
    area: '42 m²',
    style: 'Minimalist Warm',
    materials: ['Linen', 'Travertine', 'Natural Oak', 'Cotton Weave'],
    featured: true,
  },
  {
    id: 'wonder-kids-room',
    title: 'Wonder — A Room for Growing',
    category: 'Kids Room',
    categorySlug: 'kids-room',
    designerId: 'ankhbayar',
    coverImage: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&q=80',
    ],
    description: 'Designed for curiosity and calm, this children\'s bedroom balances imaginative play with restful sanctuary. Warm tones, gentle textures, and considered storage create a space that nurtures without overwhelming.',
    location: 'Ulaanbaatar',
    year: 2023,
    area: '18 m²',
    style: 'Soft Contemporary',
    materials: ['Birch Ply', 'Soft Cotton', 'Matte Paint', 'Natural Felt'],
    featured: true,
  },
  {
    id: 'focus-work-studio',
    title: 'Focus — Home Work Studio',
    category: 'Work Room',
    categorySlug: 'work-room',
    designerId: 'zhantsannurov',
    coverImage: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80',
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    ],
    description: 'A private work studio designed around concentration and creativity. The space uses vertical shelving, natural light orchestration, and a deeply considered material palette to support sustained focused work.',
    location: 'Ulaanbaatar',
    year: 2024,
    area: '16 m²',
    style: 'Architectural Minimal',
    materials: ['Walnut', 'Concrete', 'Brushed Steel', 'Wool'],
    featured: false,
  },
  {
    id: 'terrain-office',
    title: 'Terrain — Creative Office',
    category: 'Office',
    categorySlug: 'office',
    designerId: 'togoldor',
    coverImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
    ],
    description: 'An open-plan creative office that rejects sterile corporate neutrality. Warm material zones, acoustic comfort, and a spatial language inspired by contemporary gallery spaces create a work environment that elevates the creative process.',
    location: 'Ulaanbaatar',
    year: 2023,
    area: '120 m²',
    style: 'Contemporary Editorial',
    materials: ['Smoked Glass', 'Aged Oak', 'Plaster', 'Natural Stone'],
    featured: true,
  },
  {
    id: 'sanctuary-bathroom',
    title: 'Sanctuary — Master Bathroom',
    category: 'Bathroom',
    categorySlug: 'bathroom',
    designerId: 'ankhbayar',
    coverImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317702149?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    ],
    description: 'A bathroom conceived as a private ritual space. Book-matched stone, freestanding bath, and soft indirect lighting transform daily routines into moments of genuine restoration.',
    location: 'Ulaanbaatar',
    year: 2024,
    area: '22 m²',
    style: 'Spa Minimal',
    materials: ['Carrara Marble', 'Travertine', 'Brushed Brass', 'Matte Ceramic'],
    featured: true,
  },
  {
    id: 'nocturne-master-bedroom',
    title: 'Nocturne — Master Bedroom',
    category: 'Master Bedroom',
    categorySlug: 'master-bedroom',
    designerId: 'zhantsannurov',
    coverImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
    ],
    description: 'A master bedroom that retreats from the noise of contemporary life. Deep tones, layered textiles, and a furniture composition drawn from architectural principles create an environment of supreme rest.',
    location: 'Ulaanbaatar',
    year: 2024,
    area: '36 m²',
    style: 'Dark Editorial',
    materials: ['Velvet', 'Ebonized Oak', 'Stone', 'Natural Leather'],
    featured: true,
  },
  {
    id: 'velocity-auto-mall',
    title: 'Velocity — Auto Mall Showroom',
    category: 'Auto Mall',
    categorySlug: 'auto-mall',
    designerId: 'togoldor',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
      'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1200&q=80',
      'https://images.unsplash.com/photo-1567456206282-b0f94c87ad63?w=1200&q=80',
    ],
    description: 'A premium automotive showroom that places the vehicle at the center of an architectural narrative. Polished concrete floors, dramatic lighting, and minimal showcases create an environment that enhances every visitor experience.',
    location: 'Ulaanbaatar',
    year: 2023,
    area: '850 m²',
    style: 'Industrial Prestige',
    materials: ['Polished Concrete', 'Steel', 'Tempered Glass', 'LED Stone'],
    featured: false,
  },
  {
    id: 'arena-esport-center',
    title: 'Arena — E-sport Center',
    category: 'E-sport Center',
    categorySlug: 'esport-center',
    designerId: 'zhantsannurov',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
      'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=1200&q=80',
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1200&q=80',
    ],
    description: 'An e-sport center designed for performance and community. The spatial layout is engineered for optimal focus and ergonomic wellbeing, while the aesthetic language borrows from high-performance industrial design.',
    location: 'Ulaanbaatar',
    year: 2024,
    area: '320 m²',
    style: 'Performance Industrial',
    materials: ['Acoustic Panels', 'LED Systems', 'Modular Seating', 'Rubber Flooring'],
    featured: false,
  },
  {
    id: 'clarity-dental-clinic',
    title: 'Clarity — Dental Clinic',
    category: 'Dental Clinic',
    categorySlug: 'dental-clinic',
    designerId: 'ankhbayar',
    coverImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80',
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&q=80',
    ],
    description: 'A dental clinic designed to dissolve patient anxiety through spatial calm. Warm materials, soft natural light, and a residential quality to the waiting and treatment areas transform a clinical necessity into a welcoming environment.',
    location: 'Ulaanbaatar',
    year: 2024,
    area: '95 m²',
    style: 'Calming Contemporary',
    materials: ['Oak Veneer', 'Soft Stone', 'Frosted Glass', 'Warm LED'],
    featured: true,
  },
  {
    id: 'ritual-coffee-shop',
    title: 'Ritual — Coffee Shop',
    category: 'Coffee Shop',
    categorySlug: 'coffee-shop',
    designerId: 'ankhbayar',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&q=80',
    ],
    description: 'A coffee shop conceived as a sanctuary of small pleasures. The spatial narrative moves from the energy of the bar to the contemplative quiet of window seating, creating a series of experiences within a singular atmosphere.',
    location: 'Ulaanbaatar',
    year: 2023,
    area: '85 m²',
    style: 'Warm Industrial',
    materials: ['Reclaimed Timber', 'Raw Plaster', 'Aged Brass', 'Natural Stone'],
    featured: true,
  },
  {
    id: 'sage-kitchen-penthouse',
    title: 'Sage — Penthouse Kitchen',
    category: 'Kitchen',
    categorySlug: 'kitchen',
    designerId: 'togoldor',
    coverImage: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909190-ef66b44c24fa?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=80',
    ],
    description: 'A penthouse kitchen that fuses the precision of professional cooking environments with the warmth of a deeply personal living space. A material study in contrast — raw stone against warm brass, open shelving against closed cabinetry.',
    location: 'Ulaanbaatar',
    year: 2023,
    area: '34 m²',
    style: 'Refined Industrial',
    materials: ['Slate Stone', 'Warm Brass', 'Smoked Glass', 'Aged Oak'],
    featured: false,
  },
]

export function getProjectsByCategory(categorySlug: string): Project[] {
  return projects.filter((p) => p.categorySlug === categorySlug)
}

export function getProjectsByDesigner(designerId: string): Project[] {
  return projects.filter((p) => p.designerId === designerId)
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getDesignerById(id: string): Designer | undefined {
  return designers.find((d) => d.id === id)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
