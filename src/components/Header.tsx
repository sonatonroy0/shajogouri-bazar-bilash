
import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, Heart, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, toggleLanguage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigation = {
    en: [
      { name: 'Home', href: '/' },
      { name: 'Jewelry', href: '/shop?category=jewelry' },
      { name: 'Accessories', href: '/shop?category=accessories' },
      { name: 'Clothing', href: '/shop?category=clothing', badge: 'Coming Soon' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    bn: [
      { name: 'হোম', href: '/' },
      { name: 'গহনা', href: '/shop?category=jewelry' },
      { name: 'অ্যাক্সেসরিজ', href: '/shop?category=accessories' },
      { name: 'পোশাক', href: '/shop?category=clothing', badge: 'শীঘ্রই আসছে' },
      { name: 'আমাদের সম্পর্কে', href: '/about' },
      { name: 'যোগাযোগ', href: '/contact' },
    ]
  };

  return (
    <header className="bg-white shadow-sm border-b border-pink-100">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 text-center py-2 px-4">
        <p className="text-sm text-rose-800">
          {language === 'en' 
            ? '✨ Free shipping on orders over ৳2000 | Use code: WELCOME10' 
            : '✨ ২০০০ টাকার উপরে অর্ডারে ফ্রি ডেলিভারি | কোড: WELCOME10'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm" 
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
              Shajogouri
            </h1>
            <p className="text-xs text-gray-500 -mt-1">
              {language === 'en' ? 'Handcrafted Elegance' : 'হাতে তৈরি কারুকাজ'}
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation[language].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-gray-700 hover:text-pink-600 transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
                {item.badge && (
                  <span className="absolute -top-2 -right-6 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-sm font-medium text-gray-700 hover:text-pink-600"
            >
              {language === 'en' ? 'বাং' : 'ENG'}
            </Button>

            {/* Search */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>

            {/* Account */}
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-pink-100 py-4">
            <div className="max-w-md mx-auto">
              <Input
                type="search"
                placeholder={language === 'en' ? 'Search products...' : 'পণ্য খুঁজুন...'}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-pink-100">
              <h2 className="text-lg font-serif font-bold text-pink-600">Shajogouri</h2>
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="px-4 py-6 space-y-4">
              {navigation[language].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between text-gray-700 hover:text-pink-600 transition-colors duration-200 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
