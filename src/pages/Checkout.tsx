
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import { courierServices } from '@/utils/courierServices';
import { toast } from '@/hooks/use-toast';

interface CheckoutProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [courierService, setCourierService] = useState('pathao');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    area: '',
    notes: ''
  });

  const content = {
    en: {
      title: 'Checkout',
      shippingInfo: 'Shipping Information',
      paymentMethod: 'Payment Method',
      courierService: 'Courier Service',
      orderSummary: 'Order Summary',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Street Address',
      city: 'City',
      area: 'Area/District',
      notes: 'Order Notes (Optional)',
      cod: 'Cash on Delivery',
      bkash: 'bKash',
      nagad: 'Nagad',
      card: 'Credit/Debit Card',
      placeOrder: 'Place Order',
      subtotal: 'Subtotal',
      delivery: 'Delivery',
      total: 'Total',
      orderSuccess: 'Order placed successfully!',
      orderSuccessDesc: 'We will contact you soon to confirm your order.',
    },
    bn: {
      title: 'চেকআউট',
      shippingInfo: 'ডেলিভারির তথ্য',
      paymentMethod: 'পেমেন্ট পদ্ধতি',
      courierService: 'কুরিয়ার সার্ভিস',
      orderSummary: 'অর্ডার সারাংশ',
      name: 'পূর্ণ নাম',
      email: 'ইমেইল ঠিকানা',
      phone: 'ফোন নম্বর',
      address: 'রাস্তার ঠিকানা',
      city: 'শহর',
      area: 'এলাকা/জেলা',
      notes: 'অর্ডার নোট (ঐচ্ছিক)',
      cod: 'ক্যাশ অন ডেলিভারি',
      bkash: 'বিকাশ',
      nagad: 'নগদ',
      card: 'ক্রেডিট/ডেবিট কার্ড',
      placeOrder: 'অর্ডার করুন',
      subtotal: 'সাবটোটাল',
      delivery: 'ডেলিভারি',
      total: 'মোট',
      orderSuccess: 'অর্ডার সফলভাবে সম্পন্ন হয়েছে!',
      orderSuccessDesc: 'আমরা শীঘ্রই আপনার অর্ডার নিশ্চিত করতে যোগাযোগ করব।',
    }
  };

  const selectedCourier = courierServices.find(c => c.id === courierService);
  const deliveryCharge = selectedCourier?.cost || 0;

  const formatPrice = (price: number) => {
    return language === 'en' ? `৳${price.toLocaleString()}` : `৳${price.toLocaleString('bn-BD')}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      // Create order
      const orderData = {
        userId: user?.id,
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        customerAddress: formData.address,
        city: formData.city,
        area: formData.area,
        courierService: selectedCourier?.name || 'Pathao Courier',
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 
                      paymentMethod === 'bkash' ? 'bKash' : 
                      paymentMethod === 'nagad' ? 'Nagad' : 'Card',
        items: state.items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          productNameBn: item.product.namebn,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image
        })),
        subtotal: state.total,
        total: state.total + deliveryCharge,
        notes: formData.notes
      };

      addOrder(orderData);
      
      toast({
        title: content[language].orderSuccess,
        description: content[language].orderSuccessDesc,
      });
      
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{content[language].title}</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle>{content[language].shippingInfo}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{content[language].name} *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{content[language].phone} *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{content[language].email}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">{content[language].address} *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">{content[language].city} *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="area">{content[language].area}</Label>
                      <Input
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">{content[language].notes}</Label>
                    <Input
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Courier Service */}
              <Card>
                <CardHeader>
                  <CardTitle>{content[language].courierService}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={courierService} onValueChange={setCourierService}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {courierServices.map(courier => (
                        <SelectItem key={courier.id} value={courier.id}>
                          {language === 'en' ? courier.name : courier.nameBn} - ৳{courier.cost}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>{content[language].paymentMethod}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">{content[language].cod}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bkash" id="bkash" />
                      <Label htmlFor="bkash">{content[language].bkash}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nagad" id="nagad" />
                      <Label htmlFor="nagad">{content[language].nagad}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">{content[language].card}</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{content[language].orderSummary}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="font-medium">
                            {language === 'en' ? item.product.name : item.product.namebn}
                          </p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                    
                    <hr />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{content[language].subtotal}</span>
                        <span>{formatPrice(state.total)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{content[language].delivery}</span>
                        <span>{formatPrice(deliveryCharge)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>{content[language].total}</span>
                        <span>{formatPrice(state.total + deliveryCharge)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-pink-600 hover:bg-pink-700"
                    >
                      {loading ? '...' : content[language].placeOrder}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
      
      <Footer language={language} />
    </div>
  );
};

export default Checkout;
