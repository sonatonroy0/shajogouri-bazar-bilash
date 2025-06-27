
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';

interface HomeProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Home: React.FC<HomeProps> = ({ language, toggleLanguage }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header language={language} toggleLanguage={toggleLanguage} />
      <Hero language={language} />
      <FeaturedProducts language={language} />
      <Categories language={language} />
      <Testimonials language={language} />
      <Newsletter language={language} />
      <Footer language={language} />
    </div>
  );
};

export default Home;
