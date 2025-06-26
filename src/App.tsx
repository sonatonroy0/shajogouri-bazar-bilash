
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import OrderTracking from "./pages/OrderTracking";
import Wishlist from "./pages/Wishlist";
import OrderConfirmation from "./pages/OrderConfirmation";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SettingsProvider>
          <ProductProvider>
            <AuthProvider>
              <CartProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/shop" element={<Shop language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/product/:id" element={<ProductDetail language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/auth" element={<Auth language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/cart" element={<Cart language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/checkout" element={<Checkout language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/about" element={<About language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/contact" element={<Contact language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/faq" element={<FAQ language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/terms" element={<Terms language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/track-order" element={<OrderTracking language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/wishlist" element={<Wishlist language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/account" element={<Account language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/orders" element={<Orders language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="/admin" element={<Admin language={language} toggleLanguage={toggleLanguage} />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </CartProvider>
            </AuthProvider>
          </ProductProvider>
        </SettingsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
