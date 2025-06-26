
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

interface HeroProps {
  language: 'en' | 'bn';
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const content = {
    en: {
      badge: 'New Collection 2024',
      title: 'Handcrafted Elegance',
      subtitle: 'for Every Woman',
      description: 'Discover our exclusive collection of handmade jewelry and accessories, crafted with love in Bangladesh.',
      cta: 'Shop Now',
      stats: [
        { number: '1000+', label: 'Happy Customers' },
        { number: '500+', label: 'Unique Products' },
        { number: '4.9', label: 'Rating', icon: Star }
      ]
    },
    bn: {
      badge: 'নতুন কালেকশন ২০২৪',
      title: 'হাতে তৈরি কারুকাজ',
      subtitle: 'প্রতিটি নারীর জন্য',
      description: 'বাংলাদেশে ভালোবাসা দিয়ে তৈরি আমাদের এক্সক্লুসিভ গহনা ও অ্যাক্সেসরিজের কালেকশন আবিষ্কার করুন।',
      cta: 'কিনুন এখনই',
      stats: [
        { number: '১০০০+', label: 'সন্তুষ্ট ক্রেতা' },
        { number: '৫০০+', label: 'অনন্য পণ্য' },
        { number: '৪.৯', label: 'রেটিং', icon: Star }
      ]
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f8fafc' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
              {content[language].badge}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
              {content[language].title}
              <span className="block text-pink-600 mt-2">
                {content[language].subtitle}
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              {content[language].description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg">
                {content[language].cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-pink-200 text-pink-700 hover:bg-pink-50 px-8 py-4 text-lg">
                {language === 'en' ? 'View Collection' : 'কালেকশন দেখুন'}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 text-center">
              {content[language].stats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {stat.number}
                    </span>
                    {stat.icon && <stat.icon className="ml-1 h-5 w-5 text-yellow-500 fill-current" />}
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Jewelry Collection"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-full shadow-lg animate-bounce">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✨</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Star className="h-5 w-5 text-pink-600 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">4.9/5</p>
                  <p className="text-xs text-gray-500">
                    {language === 'en' ? '1k+ Reviews' : '১হাজার+ রিভিউ'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
