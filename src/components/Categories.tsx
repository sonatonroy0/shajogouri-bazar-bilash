
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategoriesProps {
  language: 'en' | 'bn';
}

const Categories: React.FC<CategoriesProps> = ({ language }) => {
  const categories = [
    {
      id: 'jewelry',
      name: language === 'en' ? 'Handcrafted Jewelry' : 'হাতে তৈরি গহনা',
      description: language === 'en' 
        ? 'Exquisite necklaces, earrings, and rings' 
        : 'অসাধারণ নেকলেস, কানের দুল এবং আংটি',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      href: '/shop?category=jewelry',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'accessories',
      name: language === 'en' ? 'Stylish Accessories' : 'স্টাইলিশ অ্যাক্সেসরিজ',
      description: language === 'en' 
        ? 'Scarves, bags, and hair accessories' 
        : 'স্কার্ফ, ব্যাগ এবং চুলের অ্যাক্সেসরিজ',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      href: '/shop?category=accessories',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'clothing',
      name: language === 'en' ? 'Women\'s Clothing' : 'মহিলাদের পোশাক',
      description: language === 'en' 
        ? 'Beautiful dresses and ethnic wear' 
        : 'সুন্দর পোশাক এবং জাতীয় পোশাক',
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      href: '/shop?category=clothing',
      color: 'from-rose-500 to-orange-500',
      badge: language === 'en' ? 'Coming Soon' : 'শীঘ্রই আসছে'
    }
  ];

  const content = {
    en: {
      title: 'Shop by Category',
      subtitle: 'Discover our curated collections designed for the modern Bangladeshi woman'
    },
    bn: {
      title: 'ক্যাটেগরি অনুযায়ী কিনুন',
      subtitle: 'আধুনিক বাঙালি নারীর জন্য বিশেষভাবে তৈরি আমাদের কালেকশন আবিষ্কার করুন'
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            {content[language].title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <a
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Badge */}
              {category.badge && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  {category.badge}
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 bg-gradient-to-r ${category.color} text-white`}>
                  {language === 'en' ? 'Explore' : 'দেখুন'}
                </div>
                
                <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-pink-200 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-sm text-gray-200 mb-4 opacity-90">
                  {category.description}
                </p>

                <div className="flex items-center text-sm font-medium group-hover:text-pink-200 transition-colors">
                  <span>{language === 'en' ? 'Shop Now' : 'এখনই কিনুন'}</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
