
import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '@/contexts/ProductContext';
import { adaptProductForLegacyComponents } from '@/utils/productAdapter';

interface FeaturedProductsProps {
  language: 'en' | 'bn';
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ language }) => {
  const { featuredProducts } = useProducts();

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

  if (featuredProducts.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              {content[language].title}
            </h2>
            <p className="text-lg text-gray-600">
              {language === 'en' ? 'No products available at the moment.' : 'এই মুহূর্তে কোনো পণ্য উপলব্ধ নেই।'}
            </p>
          </div>
        </div>
      </section>
    );
  }

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
            <ProductCard 
              key={product.id} 
              product={adaptProductForLegacyComponents(product)} 
              language={language} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
