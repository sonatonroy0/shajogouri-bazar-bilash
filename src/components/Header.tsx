
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, User, Menu, X, Globe, LogOut, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

interface HeaderProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const content = {
    en: {
      home: 'Home',
      shop: 'Shop',
      cart: 'Cart',
      orders: 'My Orders',
      login: 'Login',
      admin: 'Admin',
      logout: 'Logout'
    },
    bn: {
      home: 'হোম',
      shop: 'শপ',
      cart: 'কার্ট',
      orders: 'আমার অর্ডার',
      login: 'লগইন',
      admin: 'অ্যাডমিন',
      logout: 'লগআউট'
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const totalItems = getTotalItems();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-serif font-bold text-gray-900">
              Shajogouri
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors">
              {content[language].home}
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-pink-600 transition-colors">
              {content[language].shop}
            </Link>
            {user && (
              <Link to="/orders" className="text-gray-700 hover:text-pink-600 transition-colors">
                {content[language].orders}
              </Link>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language === 'en' ? 'বাং' : 'EN'}
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-pink-600">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Actions */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="hidden sm:block text-sm text-gray-700">
                  {user.name || user.email}
                </span>
                {user.is_admin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm">
                      <Package className="h-4 w-4 mr-1" />
                      {content[language].admin}
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="hidden sm:block">{content[language].logout}</span>
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-1" />
                  {content[language].login}
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-pink-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {content[language].home}
              </Link>
              <Link
                to="/shop"
                className="text-gray-700 hover:text-pink-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {content[language].shop}
              </Link>
              {user && (
                <Link
                  to="/orders"
                  className="text-gray-700 hover:text-pink-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {content[language].orders}
                </Link>
              )}
              <Button
                variant="ghost"
                onClick={toggleLanguage}
                className="justify-start px-0"
              >
                <Globe className="h-4 w-4 mr-2" />
                {language === 'en' ? 'বাংলা' : 'English'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
