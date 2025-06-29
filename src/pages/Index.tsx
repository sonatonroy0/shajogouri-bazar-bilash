
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import LiveChat from '@/components/LiveChat';

interface IndexProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Index: React.FC<IndexProps> = ({ language, toggleLanguage }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header language={language} toggleLanguage={toggleLanguage} />
      <Hero language={language} />
      <FeaturedProducts language={language} />
      <Footer language={language} />
      <LiveChat language={language} />
    </div>
  );
};

export default Index;
