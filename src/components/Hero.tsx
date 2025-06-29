
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  language: 'en' | 'bn';
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const content = {
    en: {
      title: 'Handcrafted Elegance',
      subtitle: 'for Every Occasion',
      description: 'Discover our exquisite collection of handmade jewelry and accessories, crafted with love and attention to detail.',
      shopNow: 'Shop Now',
      exploreCollection: 'Explore Collection'
    },
    bn: {
      title: 'হস্তনির্মিত কমনীয়তা',
      subtitle: 'প্রতিটি উপলক্ষের জন্য',
      description: 'আমাদের হস্তনির্মিত গহনা এবং অ্যাক্সেসরিজের চমৎকার সংগ্রহ আবিষ্কার করুন, যা ভালোবাসা এবং বিস্তারিত মনোযোগ দিয়ে তৈরি।',
      shopNow: 'এখনই কিনুন',
      exploreCollection: 'কালেকশন দেখুন'
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-pink-50 via-rose-50 to-orange-50 overflow-hidden">
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <Sparkles className="h-6 w-6 text-pink-600 mr-2" />
              <span className="text-pink-600 font-medium">Premium Quality</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
              {content[language].title}
              <br />
              <span className="text-pink-600">{content[language].subtitle}</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              {content[language].description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/shop">
                <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3">
                  {content[language].shopNow}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" size="lg" className="border-pink-600 text-pink-600 hover:bg-pink-50 px-8 py-3">
                  {content[language].exploreCollection}
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-full bg-gradient-to-br from-pink-200 to-rose-300 p-8">
              <div className="w-full h-full rounded-full bg-white/80 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="h-24 w-24 text-pink-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                    Shajogouri
                  </h3>
                  <p className="text-gray-600">Handcrafted with Love</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-rose-400 rounded-full animate-bounce delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
