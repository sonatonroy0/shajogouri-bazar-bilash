
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface CartProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Cart: React.FC<CartProps> = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();

  const content = {
    en: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      emptyDesc: 'Add some products to get started',
      continueShopping: 'Continue Shopping',
      checkout: 'Proceed to Checkout',
      remove: 'Remove',
      quantity: 'Quantity',
      subtotal: 'Subtotal',
      total: 'Total',
      clearCart: 'Clear Cart'
    },
    bn: {
      title: 'শপিং কার্ট',
      empty: 'আপনার কার্ট খালি',
      emptyDesc: 'শুরু করতে কিছু পণ্য যোগ করুন',
      continueShopping: 'কেনাকাটা চালিয়ে যান',
      checkout: 'চেকআউটে যান',
      remove: 'সরান',
      quantity: 'পরিমাণ',
      subtotal: 'উপমোট',
      total: 'মোট',
      clearCart: 'কার্ট সাফ করুন'
    }
  };

  const formatPrice = (price: number) => {
    return language === 'en' ? `৳${price.toLocaleString()}` : `৳${price.toLocaleString('bn-BD')}`;
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      toast({
        title: language === 'en' ? 'Item Removed' : 'পণ্য সরানো',
        description: language === 'en' ? 'Item removed from cart' : 'পণ্য কার্ট থেকে সরানো হয়েছে',
      });
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast({
      title: language === 'en' ? 'Item Removed' : 'পণ্য সরানো',
      description: language === 'en' ? 'Item removed from cart' : 'পণ্য কার্ট থেকে সরানো হয়েছে',
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: language === 'en' ? 'Cart Cleared' : 'কার্ট সাফ',
      description: language === 'en' ? 'All items removed from cart' : 'সব পণ্য কার্ট থেকে সরানো হয়েছে',
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header language={language} toggleLanguage={toggleLanguage} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{content[language].empty}</h1>
            <p className="text-gray-600 mb-8">{content[language].emptyDesc}</p>
            <Button onClick={() => navigate('/shop')} className="bg-pink-600 hover:bg-pink-700">
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{content[language].title}</h1>
          <Button variant="outline" onClick={handleClearCart}>
            {content[language].clearCart}
          </Button>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {language === 'en' ? item.name : item.namebn}
                    </h3>
                    <p className="text-gray-600">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-3 py-1 min-w-[40px] text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {content[language].remove}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>{content[language].total}:</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => navigate('/shop')}
                className="flex-1"
              >
                {content[language].continueShopping}
              </Button>
              <Button
                onClick={() => navigate('/checkout')}
                className="flex-1 bg-pink-600 hover:bg-pink-700"
              >
                {content[language].checkout}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer language={language} />
    </div>
  );
};

export default Cart;
