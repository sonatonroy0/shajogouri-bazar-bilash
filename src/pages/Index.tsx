
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'bn'>('en');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} toggleLanguage={toggleLanguage} />
      <Hero language={language} />
      <Categories language={language} />
      <FeaturedProducts language={language} />
      <Testimonials language={language} />
      <Newsletter language={language} />
      <Footer language={language} />
    </div>
  );
};

export default Index;
