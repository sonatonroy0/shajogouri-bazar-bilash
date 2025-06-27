
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Truck, CheckCircle, MapPin } from 'lucide-react';

interface OrderTrackingProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ language, toggleLanguage }) => {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const content = {
    en: {
      title: 'Track Your Order',
      subtitle: 'Enter your order ID to track your package',
      orderIdLabel: 'Order ID',
      trackButton: 'Track Order',
      orderDetails: 'Order Details',
      timeline: 'Order Timeline',
      customerInfo: 'Customer Information',
      shippingAddress: 'Shipping Address',
      orderItems: 'Order Items',
      orderNotFound: 'Order not found',
      orderNotFoundDesc: 'Please check your order ID and try again',
      statuses: {
        pending: 'Order Placed',
        confirmed: 'Order Confirmed',
        processing: 'Processing',
        shipped: 'Shipped',
        delivered: 'Delivered',
        cancelled: 'Cancelled'
      }
    },
    bn: {
      title: 'আপনার অর্ডার ট্র্যাক করুন',
      subtitle: 'আপনার প্যাকেজ ট্র্যাক করতে অর্ডার আইডি লিখুন',
      orderIdLabel: 'অর্ডার আইডি',
      trackButton: 'অর্ডার ট্র্যাক করুন',
      orderDetails: 'অর্ডারের বিবরণ',
      timeline: 'অর্ডার টাইমলাইন',
      customerInfo: 'গ্রাহকের তথ্য',
      shippingAddress: 'ডেলিভারি ঠিকানা',
      orderItems: 'অর্ডার করা পণ্য',
      orderNotFound: 'অর্ডার পাওয়া যায়নি',
      orderNotFoundDesc: 'অনুগ্রহ করে আপনার অর্ডার আইডি চেক করুন এবং আবার চেষ্টা করুন',
      statuses: {
        pending: 'অর্ডার স্থাপিত',
        confirmed: 'অর্ডার নিশ্চিত',
        processing: 'প্রক্রিয়াকরণ',
        shipped: 'পাঠানো হয়েছে',
        delivered: 'ডেলিভার হয়েছে',
        cancelled: 'বাতিল'
      }
    }
  };

  // Mock order data - replace with real API call
  const mockOrderData = {
    'SHJ-2024-001': {
      id: 'SHJ-2024-001',
      status: 'shipped',
      customerName: 'Fatima Rahman',
      customerPhone: '+88 01712345678',
      customerEmail: 'fatima@example.com',
      shippingAddress: 'House 15, Road 7, Dhanmondi, Dhaka-1205',
      total: 4300,
      date: '2024-01-15',
      items: [
        { name: 'Pearl Necklace', namebn: 'মুক্তার হার', quantity: 1, price: 2500 },
        { name: 'Gold Earrings', namebn: 'সোনার কানের দুল', quantity: 1, price: 1800 }
      ],
      timeline: [
        { status: 'pending', date: '2024-01-15 10:00 AM', active: true },
        { status: 'confirmed', date: '2024-01-15 02:00 PM', active: true },
        { status: 'processing', date: '2024-01-16 09:00 AM', active: true },
        { status: 'shipped', date: '2024-01-17 11:00 AM', active: true },
        { status: 'delivered', date: '', active: false }
      ]
    }
  };

  const handleTrackOrder = () => {
    setLoading(true);
    setTimeout(() => {
      const foundOrder = mockOrderData[orderId as keyof typeof mockOrderData];
      setOrderData(foundOrder || null);
      setLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string, active: boolean) => {
    const className = `h-5 w-5 ${active ? 'text-pink-600' : 'text-gray-400'}`;
    switch (status) {
      case 'pending': return <Package className={className} />;
      case 'confirmed': return <CheckCircle className={className} />;
      case 'processing': return <Package className={className} />;
      case 'shipped': return <Truck className={className} />;
      case 'delivered': return <MapPin className={className} />;
      default: return <Package className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{content[language].title}</h1>
          <p className="text-gray-600 mt-2">{content[language].subtitle}</p>
        </div>

        {/* Track Order Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder={content[language].orderIdLabel}
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="text-lg"
                />
              </div>
              <Button 
                onClick={handleTrackOrder}
                disabled={!orderId || loading}
                className="bg-pink-600 hover:bg-pink-700"
              >
                <Search className="h-4 w-4 mr-2" />
                {loading ? 'Tracking...' : content[language].trackButton}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        {orderData ? (
          <div className="space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle>{content[language].orderDetails}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Order ID:</strong> {orderData.id}</p>
                    <p><strong>Date:</strong> {orderData.date}</p>
                    <p><strong>Total:</strong> ৳{orderData.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <Badge variant="secondary" className="text-sm">
                      {content[language].statuses[orderData.status as keyof typeof content[typeof language]['statuses']]}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>{content[language].timeline}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.timeline.map((step: any, index: number) => (
                    <div key={step.status} className="flex items-center gap-4">
                      {getStatusIcon(step.status, step.active)}
                      <div className="flex-1">
                        <p className={`font-medium ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>
                          {content[language].statuses[step.status as keyof typeof content[typeof language]['statuses']]}
                        </p>
                        {step.date && (
                          <p className="text-sm text-gray-500">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer & Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{content[language].customerInfo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {orderData.customerName}</p>
                    <p><strong>Phone:</strong> {orderData.customerPhone}</p>
                    <p><strong>Email:</strong> {orderData.customerEmail}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{content[language].shippingAddress}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{orderData.shippingAddress}</p>
                </CardContent>
              </Card>
            </div>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>{content[language].orderItems}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">
                          {language === 'en' ? item.name : item.namebn}
                        </p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">৳{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : orderId && !loading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {content[language].orderNotFound}
              </h3>
              <p className="text-gray-600">{content[language].orderNotFoundDesc}</p>
            </CardContent>
          </Card>
        ) : null}
      </div>

      <Footer language={language} />
    </div>
  );
};

export default OrderTracking;
