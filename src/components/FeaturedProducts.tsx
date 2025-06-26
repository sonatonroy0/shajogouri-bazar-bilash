
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  language: 'en' | 'bn';
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ language }) => {
  // Sample products data
  const products = [
    {
      id: '1',
      name: language === 'en' ? 'Golden Rose Necklace' : 'স্বর্ণালী গোলাপ নেকলেস',
      price: 2500,
      originalPrice: 3000,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: 4.8,
      reviews: 124,
      isNew: true,
      isSale: true,
      category: 'jewelry'
    },
    {
      id: '2',
      name: language === 'en' ? 'Pearl Drop Earrings' : 'মুক্তার ঝুমকা',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: 4.9,
      reviews: 89,
      isNew: true,
      category: 'jewelry'
    },
    {
      id: '3',
      name: language === 'en' ? 'Silk Embroidered Scarf' : 'সিল্কের সূচিকর্মের স্কার্ফ',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: 4.7,
      reviews: 156,
      category: 'accessories'
    },
    {
      id: '4',
      name: language === 'en' ? 'Handwoven Bracelet Set' : 'হাতে বোনা ব্রেসলেট সেট',
      price: 950,
      originalPrice: 1200,
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: 4.6,
      reviews: 73,
      isSale: true,
      category: 'jewelry'
    },
    {
      id: '5',
      name: language === 'en' ? 'Vintage Hair Clips' : 'ভিন্টেজ চুলের ক্লিপ',
      price: 750,
      image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: 4.5,
      reviews: 92,
      category: 'accessories'
    },
    {
      id: '6',
      name: language === 'en' ? 'Crystal Ring Collection' : 'ক্রিস্টাল রিং কালেকশন',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: 4.9,
      reviews: 187,
      isNew: true,
      category: 'jewelry'
    }
  ];

  const content = {
    en: {
      title: 'Featured Products',
      subtitle: 'Handpicked pieces that celebrate your unique style',
      viewAll: 'View All Products'
    },
    bn: {
      title: 'বিশেষ পণ্যসমূহ',
      subtitle: 'আপনার অনন্য স্টাইল উদযাপনের জন্য বিশেষভাবে নির্বাচিত',
      viewAll: 'সব পণ্য দেখুন'
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            {content[language].title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              language={language}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            className="border-pink-200 text-pink-700 hover:bg-pink-50 px-8 py-4"
          >
            {content[language].viewAll}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
