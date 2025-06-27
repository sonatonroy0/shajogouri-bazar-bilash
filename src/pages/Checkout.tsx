import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
  const { items, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    customerPhone: '',
    customerEmail: user?.email || '',
    customerAddress: '',
    city: '',
    area: '',
    courierService: '',
    paymentMethod: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const content = {
    en: {
      title: 'Checkout',
      customerInfo: 'Customer Information',
      fullName: 'Full Name',
      phone: 'Phone Number',
      email: 'Email Address',
      address: 'Full Address',
      city: 'City',
      area: 'Area',
      deliveryInfo: 'Delivery Information',
      courierService: 'Courier Service',
      selectCourier: 'Select Courier Service',
      paymentInfo: 'Payment Information',
      paymentMethod: 'Payment Method',
      selectPayment: 'Select Payment Method',
      notes: 'Special Notes (Optional)',
      orderSummary: 'Order Summary',
      subtotal: 'Subtotal',
      deliveryCharge: 'Delivery Charge',
      total: 'Total',
      placeOrder: 'Place Order',
      processing: 'Processing...',
      required: 'This field is required'
    },
    bn: {
      title: 'চেকআউট',
      customerInfo: 'গ্রাহকের তথ্য',
      fullName: 'পূর্ণ নাম',
      phone: 'ফোন নম্বর',
      email: 'ইমেইল ঠিকানা',
      address: 'সম্পূর্ণ ঠিকানা',
      city: 'শহর',
      area: 'এলাকা',
      deliveryInfo: 'ডেলিভারি তথ্য',
      courierService: 'কুরিয়ার সার্ভিস',
      selectCourier: 'কুরিয়ার সার্ভিস নির্বাচন করুন',
      paymentInfo: 'পেমেন্ট তথ্য',
      paymentMethod: 'পেমেন্ট পদ্ধতি',
      selectPayment: 'পেমেন্ট পদ্ধতি নির্বাচন করুন',
      notes: 'বিশেষ নোট (ঐচ্ছিক)',
      orderSummary: 'অর্ডার সংক্ষেপ',
      subtotal: 'উপমোট',
      deliveryCharge: 'ডেলিভারি চার্জ',
      total: 'মোট',
      placeOrder: 'অর্ডার করুন',
      processing: 'প্রক্রিয়াকরণ...',
      required: 'এই ক্ষেত্রটি প্রয়োজনীয়'
    }
  };

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', nameBn: 'বিকাশ' },
    { id: 'nagad', name: 'Nagad', nameBn: 'নগদ' },
    { id: 'rocket', name: 'Rocket', nameBn: 'রকেট' },
    { id: 'cod', name: 'Cash on Delivery', nameBn: 'ক্যাশ অন ডেলিভারি' }
  ];

  const formatPrice = (price: number) => {
    return language === 'en' ? `৳${price.toLocaleString()}` : `৳${price.toLocaleString('bn-BD')}`;
  };

  const selectedCourier = courierServices.find(c => c.id === formData.courierService);
  const deliveryCharge = selectedCourier?.cost || 0;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryCharge;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = ['customerName', 'customerPhone', 'customerAddress', 'city', 'courierService', 'paymentMethod'];
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: 'Error',
          description: `${field} is required`,
          variant: 'destructive'
        });
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    if (items.length === 0) {
      toast({
        title: 'Error',
        description: 'Your cart is empty',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const orderItems = items.map(item => ({
        product_id: item.id,
        product_name: item.name,
        product_name_bn: item.namebn,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      }));

      const orderId = await addOrder({
        customer_name: formData.customerName,
        customer_phone: formData.customerPhone,
        customer_email: formData.customerEmail,
        customer_address: formData.customerAddress,
        city: formData.city,
        area: formData.area,
        courier_service: formData.courierService,
        payment_method: formData.paymentMethod,
        subtotal: subtotal,
        total: total,
        status: 'pending',
        notes: formData.notes,
        items: orderItems,
        user_id: user?.id || null
      });

      clearCart();
      toast({
        title: language === 'en' ? 'Order Placed!' : 'অর্ডার সম্পন্ন!',
        description: language === 'en' 
          ? `Your order #${orderId} has been placed successfully`
          : `আপনার অর্ডার #${orderId} সফলভাবে সম্পন্ন হয়েছে`,
      });
      
      navigate(`/order-confirmation?id=${orderId}`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header language={language} toggleLanguage={toggleLanguage} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
        <Footer language={language} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{content[language].title}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>{content[language].customerInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{content[language].fullName} *</Label>
                    <Input
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>{content[language].phone} *</Label>
                    <Input
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label>{content[language].email}</Label>
                  <Input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  />
                </div>
                <div>
                  <Label>{content[language].address} *</Label>
                  <Textarea
                    value={formData.customerAddress}
                    onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{content[language].city} *</Label>
                    <Input
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>{content[language].area}</Label>
                    <Input
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle>{content[language].deliveryInfo}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label>{content[language].courierService} *</Label>
                  <Select value={formData.courierService} onValueChange={(value) => handleInputChange('courierService', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={content[language].selectCourier} />
                    </SelectTrigger>
                    <SelectContent>
                      {courierServices.map(courier => (
                        <SelectItem key={courier.id} value={courier.id}>
                          {language === 'en' ? courier.name : courier.nameBn} - ৳{courier.cost}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>{content[language].paymentInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>{content[language].paymentMethod} *</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={content[language].selectPayment} />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map(method => (
                        <SelectItem key={method.id} value={method.id}>
                          {language === 'en' ? method.name : method.nameBn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{content[language].notes}</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any special instructions..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>{content[language].orderSummary}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{language === 'en' ? item.name : item.namebn}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>{content[language].subtotal}:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{content[language].deliveryCharge}:</span>
                    <span>{formatPrice(deliveryCharge)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>{content[language].total}:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                
                <Button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-pink-600 hover:bg-pink-700"
                >
                  {loading ? content[language].processing : content[language].placeOrder}
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

export default Checkout;
