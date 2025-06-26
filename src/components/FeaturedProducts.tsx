
import React from 'react';
import ProductCard from './ProductCard';
import { sampleProducts } from '@/data/products';

interface FeaturedProductsProps {
  language: 'en' | 'bn';
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ language }) => {
  const content = {
    en: {
      title: 'Featured Products',
      subtitle: 'Handpicked items just for you',
      viewAll: 'View All Products'
    },
    bn: {
      title: 'বিশেষ পণ্য',
      subtitle: 'আপনার জন্য বিশেষভাবে নির্বাচিত আইটেম',
      viewAll: 'সব পণ্য দেখুন'
    }
  };

  // Show first 4 products as featured
  const featuredProducts = sampleProducts.slice(0, 4);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            {content[language].title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
