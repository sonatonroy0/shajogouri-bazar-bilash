
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface CartProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Cart: React.FC<CartProps> = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();
  const { state, updateQuantity, removeItem } = useCart();

  const content = {
    en: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      emptyDesc: 'Add some products to get started',
      continueShopping: 'Continue Shopping',
      checkout: 'Proceed to Checkout',
      quantity: 'Quantity',
      remove: 'Remove',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      free: 'Free',
      total: 'Total',
    },
    bn: {
      title: 'শপিং কার্ট',
      empty: 'আপনার কার্ট খালি',
      emptyDesc: 'শুরু করতে কিছু পণ্য যোগ করুন',
      continueShopping: 'কেনাকাটা চালিয়ে যান',
      checkout: 'চেকআউট করুন',
      quantity: 'পরিমাণ',
      remove: 'সরান',
      subtotal: 'সাবটোটাল',
      shipping: 'ডেলিভারি',
      free: 'ফ্রি',
      total: 'মোট',
    }
  };

  const formatPrice = (price: number) => {
    return language === 'en' ? `৳${price.toLocaleString()}` : `৳${price.toLocaleString('bn-BD')}`;
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header language={language} toggleLanguage={toggleLanguage} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-300" />
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {state.items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {language === 'en' ? item.product.name : item.product.namebn}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {formatPrice(item.product.price)}
                        </p>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4 mr-1" />
                            {content[language].remove}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{content[language].subtotal}</span>
                    <span>{formatPrice(state.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{content[language].shipping}</span>
                    <span className="text-green-600">{content[language].free}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>{content[language].total}</span>
                    <span>{formatPrice(state.total)}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-6 bg-pink-600 hover:bg-pink-700"
                >
                  {content[language].checkout}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => navigate('/shop')}
                  className="w-full mt-2"
                >
                  {content[language].continueShopping}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer language={language} />
    </div>
  );
};

export default Cart;
