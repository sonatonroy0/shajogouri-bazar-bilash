
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/products';

interface CategoriesProps {
  language: 'en' | 'bn';
}

const Categories: React.FC<CategoriesProps> = ({ language }) => {
  const navigate = useNavigate();

  const content = {
    en: {
      title: 'Shop by Category',
      subtitle: 'Explore our curated collections',
      shopNow: 'Shop Now',
      comingSoon: 'Coming Soon'
    },
    bn: {
      title: 'ক্যাটেগরি অনুযায়ী কিনুন',
      subtitle: 'আমাদের সংগৃহীত কালেকশন এক্সপ্লোর করুন',
      shopNow: 'এখনই কিনুন',
      comingSoon: 'শীঘ্রই আসছে'
    }
  };

  const categoryImages = {
    jewelry: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    accessories: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    clothing: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400'
  };

  const handleCategoryClick = (categoryId: string, comingSoon?: boolean) => {
    if (!comingSoon) {
      navigate(`/shop?category=${categoryId}`);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            {content[language].title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleCategoryClick(category.id, category.comingSoon)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={categoryImages[category.id as keyof typeof categoryImages]}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-xl font-serif font-bold">
                    {language === 'en' ? category.name : category.namebn}
                  </h3>
                  {category.comingSoon && (
                    <Badge variant="secondary" className="bg-orange-500 text-white">
                      {content[language].comingSoon}
                    </Badge>
                  )}
                </div>
                
                {!category.comingSoon && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-fit bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(category.id);
                    }}
                  >
                    {content[language].shopNow}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
