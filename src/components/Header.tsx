import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, Heart, User, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigation = {
    en: [
      { name: 'Home', href: '/' },
      { name: 'Shop', href: '/shop' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
    ],
    bn: [
      { name: 'হোম', href: '/' },
      { name: 'শপ', href: '/shop' },
      { name: 'আমাদের সম্পর্কে', href: '/about' },
      { name: 'যোগাযোগ', href: '/contact' },
      { name: 'প্রশ্ন উত্তর', href: '/faq' },
    ]
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setSearchOpen(false);
      setSearchTerm('');
    }
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-pink-100 sticky top-0 z-50">
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
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
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
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className="text-gray-700 hover:text-pink-600 transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </button>
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
            <Button variant="ghost" size="sm" onClick={() => navigate('/wishlist')}>
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative" onClick={() => navigate('/cart')}>
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            {/* Account */}
            {user ? (
              <div className="relative group">
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-medium text-sm">{user.name || user.email}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => navigate('/account')}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      {language === 'en' ? 'My Account' : 'আমার অ্যাকাউন্ট'}
                    </button>
                    <button
                      onClick={() => navigate('/orders')}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      {language === 'en' ? 'My Orders' : 'আমার অর্ডার'}
                    </button>
                    {user.isAdmin && (
                      <button
                        onClick={() => navigate('/admin')}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-purple-600"
                      >
                        {language === 'en' ? 'Admin Dashboard' : 'অ্যাডমিন ড্যাশবোর্ড'}
                      </button>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-red-600 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Logout' : 'লগআউট'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                <User className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-pink-100 py-4">
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <Input
                type="search"
                placeholder={language === 'en' ? 'Search products...' : 'পণ্য খুঁজুন...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                autoFocus
              />
            </form>
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
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="flex w-full text-left text-gray-700 hover:text-pink-600 transition-colors duration-200 py-2"
                >
                  <span>{item.name}</span>
                </button>
              ))}
              {!user && (
                <button
                  onClick={() => handleNavigation('/auth')}
                  className="flex w-full text-left text-gray-700 hover:text-pink-600 transition-colors duration-200 py-2"
                >
                  {language === 'en' ? 'Login / Register' : 'লগইন / রেজিস্টার'}
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
