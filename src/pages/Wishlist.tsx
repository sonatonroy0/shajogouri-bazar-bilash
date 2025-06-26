
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { sampleProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface WishlistProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Wishlist: React.FC<WishlistProps> = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  // Mock wishlist data - in real app this would come from context/storage
  const wishlistItems = sampleProducts.slice(0, 3);

  const content = {
    en: {
      title: 'My Wishlist',
      empty: 'Your wishlist is empty',
      emptyDesc: 'Add some products to your wishlist to see them here',
      continueShopping: 'Continue Shopping',
      addToCart: 'Add to Cart',
      remove: 'Remove',
      addedToCart: 'Added to Cart!',
      addedMessage: 'Product added to your cart',
    },
    bn: {
      title: 'আমার পছন্দের তালিকা',
      empty: 'আপনার পছন্দের তালিকা খালি',
      emptyDesc: 'এখানে দেখতে আপনার পছন্দের তালিকায় কিছু পণ্য যোগ করুন',
      continueShopping: 'কেনাকাটা চালিয়ে যান',
      addToCart: 'কার্টে যোগ করুন',
      remove: 'সরান',
      addedToCart: 'কার্টে যোগ করা হয়েছে!',
      addedMessage: 'পণ্যটি আপনার কার্টে যোগ করা হয়েছে',
    }
  };

  const formatPrice = (price: number) => {
    return language === 'en' ? `৳${price.toLocaleString()}` : `৳${price.toLocaleString('bn-BD')}`;
  };

  const handleAddToCart = (product: any) => {
    addItem(product);
    toast({
      title: content[language].addedToCart,
      description: content[language].addedMessage,
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header language={language} toggleLanguage={toggleLanguage} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Heart className="mx-auto h-24 w-24 text-gray-300" />
            <h1 className="text-2xl font-bold text-gray-900 mt-4">{content[language].empty}</h1>
            <p className="text-gray-600 mt-2">{content[language].emptyDesc}</p>
            <Button 
              onClick={() => navigate('/shop')} 
              className="mt-6 bg-pink-600 hover:bg-pink-700"
            >
              {content[language].continueShopping}
            </Button>
          </div>
        </div>
        <Footer language={language} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{content[language].title}</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <Card key={product.id} className="relative group">
              <CardContent className="p-4">
                <button className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
                  <X className="h-4 w-4 text-gray-600" />
                </button>
                
                <div 
                  className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <h3 
                  className="font-medium text-gray-900 mb-2 cursor-pointer hover:text-pink-600"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {language === 'en' ? product.name : product.namebn}
                </h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  size="sm"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {content[language].addToCart}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer language={language} />
    </div>
  );
};

export default Wishlist;
