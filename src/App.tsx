
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Orders from '@/pages/Orders';
import Admin from '@/pages/Admin';
import LiveChat from '@/components/LiveChat';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ProductProvider } from '@/contexts/ProductContext';
import { OrderProvider } from '@/contexts/OrderContext';
import { SettingsProvider } from '@/contexts/SettingsContext';

const queryClient = new QueryClient();

function App() {
  const [language, setLanguage] = useState<'en' | 'bn'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <SettingsProvider>
            <ProductProvider>
              <OrderProvider>
                <CartProvider>
                  <Router>
                    <div className="App">
                      <Routes>
                        <Route path="/" element={<Home language={language} toggleLanguage={toggleLanguage} />} />
                        <Route path="/shop" element={<Shop language={language} toggleLanguage={toggleLanguage} />} />
                        <Route path="/product/:id" element={<ProductDetail language={language} toggleLanguage={toggleLanguage} />} />
                        <Route path="/cart" element={<Cart language={language} toggleLanguage={toggleLanguage} />} />
                        <Route path="/checkout" element={<Checkout language={language} toggleLanguage={toggleLanguage} />} />
                        <Route path="/orders" element={<Orders language={language} toggleLanguage={toggleLanguage} />} />
                        <Route path="/admin" element={<Admin language={language} toggleLanguage={toggleLanguage} />} />
                      </Routes>
                      <LiveChat language={language} />
                      <Toaster />
                    </div>
                  </Router>
                </CartProvider>
              </OrderProvider>
            </ProductProvider>
          </SettingsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
