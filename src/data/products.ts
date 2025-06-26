
export interface Product {
  id: string;
  name: string;
  namebn: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
  category: string;
  description: string;
  descriptionbn: string;
  inStock: boolean;
  stockCount: number;
}

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Elegant Pearl Necklace',
    namebn: 'মুক্তার মালা',
    price: 2500,
    originalPrice: 3000,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400'
    ],
    rating: 4.8,
    reviews: 24,
    isNew: true,
    isSale: true,
    category: 'jewelry',
    description: 'Beautiful handcrafted pearl necklace perfect for special occasions.',
    descriptionbn: 'বিশেষ অনুষ্ঠানের জন্য উপযুক্ত সুন্দর হস্তনির্মিত মুক্তার হার।',
    inStock: true,
    stockCount: 15
  },
  {
    id: '2',
    name: 'Gold Plated Earrings',
    namebn: 'সোনালী কানের দুল',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400'
    ],
    rating: 4.6,
    reviews: 18,
    isNew: false,
    category: 'jewelry',
    description: 'Elegant gold plated earrings with intricate design.',
    descriptionbn: 'জটিল নকশা সহ মার্জিত স্বর্ণ প্রলেপযুক্ত কানের দুল।',
    inStock: true,
    stockCount: 8
  },
  {
    id: '3',
    name: 'Handwoven Silk Scarf',
    namebn: 'হাতে বোনা রেশমি স্কার্ফ',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'
    ],
    rating: 4.9,
    reviews: 32,
    category: 'accessories',
    description: 'Luxurious handwoven silk scarf with traditional patterns.',
    descriptionbn: 'ঐতিহ্যবাহী নকশা সহ বিলাসবহুল হাতে বোনা রেশমি স্কার্ফ।',
    inStock: true,
    stockCount: 12
  },
  {
    id: '4',
    name: 'Designer Handbag',
    namebn: 'ডিজাইনার হ্যান্ডব্যাগ',
    price: 3500,
    originalPrice: 4200,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'
    ],
    rating: 4.7,
    reviews: 15,
    isSale: true,
    category: 'accessories',
    description: 'Premium quality designer handbag made from genuine leather.',
    descriptionbn: 'আসল চামড়া দিয়ে তৈরি প্রিমিয়াম মানের ডিজাইনার হ্যান্ডব্যাগ।',
    inStock: true,
    stockCount: 5
  },
  {
    id: '5',
    name: 'Crystal Bracelet',
    namebn: 'ক্রিস্টাল ব্রেসলেট',
    price: 950,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'
    ],
    rating: 4.5,
    reviews: 28,
    isNew: true,
    category: 'jewelry',
    description: 'Beautiful crystal bracelet with healing properties.',
    descriptionbn: 'নিরাময় বৈশিষ্ট্য সহ সুন্দর ক্রিস্টাল ব্রেসলেট।',
    inStock: true,
    stockCount: 20
  }
];

export const categories = [
  { id: 'jewelry', name: 'Jewelry', namebn: 'গহনা', icon: '💎' },
  { id: 'accessories', name: 'Accessories', namebn: 'অ্যাক্সেসরিজ', icon: '👜' },
  { id: 'clothing', name: 'Clothing', namebn: 'পোশাক', icon: '👗', comingSoon: true }
];
