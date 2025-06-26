
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

interface OrderTrackingProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ language, toggleLanguage }) => {
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const content = {
    en: {
      title: 'Track Your Order',
      subtitle: 'Enter your order details to track your shipment',
      orderId: 'Order ID',
      phone: 'Phone Number',
      track: 'Track Order',
      orderDetails: 'Order Details',
      status: 'Status',
      estimatedDelivery: 'Estimated Delivery',
      items: 'Items',
      shippingAddress: 'Shipping Address',
      statuses: {
        confirmed: 'Order Confirmed',
        processing: 'Processing',
        shipped: 'Shipped',
        delivered: 'Delivered'
      },
      timeline: {
        confirmed: 'Your order has been confirmed',
        processing: 'Your order is being prepared',
        shipped: 'Your order has been shipped',
        delivered: 'Your order has been delivered'
      }
    },
    bn: {
      title: 'আপনার অর্ডার ট্র্যাক করুন',
      subtitle: 'আপনার শিপমেন্ট ট্র্যাক করতে অর্ডারের বিবরণ লিখুন',
      orderId: 'অর্ডার আইডি',
      phone: 'ফোন নম্বর',
      track: 'অর্ডার ট্র্যাক করুন',
      orderDetails: 'অর্ডারের বিবরণ',
      status: 'অবস্থা',
      estimatedDelivery: 'আনুমানিক ডেলিভারি',
      items: 'পণ্যসমূহ',
      shippingAddress: 'ডেলিভারির ঠিকানা',
      statuses: {
        confirmed: 'অর্ডার নিশ্চিত',
        processing: 'প্রসেসিং',
        shipped: 'শিপ করা হয়েছে',
        delivered: 'ডেলিভার করা হয়েছে'
      },
      timeline: {
        confirmed: 'আপনার অর্ডার নিশ্চিত করা হয়েছে',
        processing: 'আপনার অর্ডার প্রস্তুত করা হচ্ছে',
        shipped: 'আপনার অর্ডার শিপ করা হয়েছে',
        delivered: 'আপনার অর্ডার ডেলিভার করা হয়েছে'
      }
    }
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate order tracking
    setTimeout(() => {
      // Mock order data
      const mockOrder = {
        id: orderId,
        status: 'shipped',
        estimatedDelivery: '2024-01-25',
        items: [
          { name: 'Pearl Necklace', namebn: 'মুক্তার হার', quantity: 1, price: 2500 },
          { name: 'Gold Earrings', namebn: 'সোনালী কানের দুল', quantity: 1, price: 1800 }
        ],
        address: 'Dhanmondi, Dhaka-1205',
        timeline: [
          { status: 'confirmed', date: '2024-01-20', completed: true },
          { status: 'processing', date: '2024-01-21', completed: true },
          { status: 'shipped', date: '2024-01-22', completed: true },
          { status: 'delivered', date: '2024-01-25', completed: false }
        ]
      };
      
      setOrderData(mockOrder);
      setLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    
    switch (status) {
      case 'confirmed':
        return <Package className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 to-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            {content[language].title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tracking Form */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <form onSubmit={handleTrack} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orderId">{content[language].orderId}</Label>
                    <Input
                      id="orderId"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="SHJ-2024-001"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{content[language].phone}</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+8801753840087"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-pink-600 hover:bg-pink-700"
                >
                  {loading ? '...' : content[language].track}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Details */}
          {orderData && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{content[language].orderDetails}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">{content[language].status}</h4>
                      <Badge variant="secondary" className="text-sm">
                        {content[language].statuses[orderData.status as keyof typeof content[typeof language].statuses]}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{content[language].estimatedDelivery}</h4>
                      <p className="text-gray-600">{orderData.estimatedDelivery}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {orderData.timeline.map((step: any, index: number) => (
                      <div key={index} className="flex items-center gap-4">
                        {getStatusIcon(step.status, step.completed)}
                        <div className="flex-1">
                          <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {content[language].statuses[step.status as keyof typeof content[typeof language].statuses]}
                          </p>
                          <p className="text-sm text-gray-500">
                            {content[language].timeline[step.status as keyof typeof content[typeof language].timeline]}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">{step.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Items */}
              <Card>
                <CardHeader>
                  <CardTitle>{content[language].items}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderData.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            {language === 'en' ? item.name : item.namebn}
                          </p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">৳{item.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>{content[language].shippingAddress}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{orderData.address}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default OrderTracking;
