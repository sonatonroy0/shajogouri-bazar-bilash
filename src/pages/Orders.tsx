
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';

interface OrdersProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Orders: React.FC<OrdersProps> = ({ language, toggleLanguage }) => {
  const { user } = useAuth();
  const { orders, loading } = useOrders();

  const content = {
    en: {
      title: 'My Orders',
      noOrders: 'No orders found',
      orderNumber: 'Order #',
      date: 'Date',
      status: 'Status',
      total: 'Total',
      items: 'Items',
      shippingAddress: 'Shipping Address',
      paymentMethod: 'Payment Method',
      courierService: 'Courier Service'
    },
    bn: {
      title: 'আমার অর্ডার',
      noOrders: 'কোনো অর্ডার পাওয়া যায়নি',
      orderNumber: 'অর্ডার #',
      date: 'তারিখ',
      status: 'অবস্থা',
      total: 'মোট',
      items: 'পণ্য',
      shippingAddress: 'ডেলিভারি ঠিকানা',
      paymentMethod: 'পেমেন্ট পদ্ধতি',
      courierService: 'কুরিয়ার সার্ভিস'
    }
  };

  const userOrders = user ? orders.filter(order => order.user_id === user.id) : [];

  const formatPrice = (price: number) => {
    return language === 'en' ? `৳${price.toLocaleString()}` : `৳${price.toLocaleString('bn-BD')}`;
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'shipped': return 'secondary';
      case 'processing': return 'outline';
      case 'confirmed': return 'secondary';
      case 'pending': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header language={language} toggleLanguage={toggleLanguage} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">Loading...</div>
        </div>
        <Footer language={language} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{content[language].title}</h1>
        
        {userOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12">
              <div className="text-center">
                <p className="text-gray-500 text-lg">{content[language].noOrders}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {content[language].orderNumber}{order.id}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        {content[language].date}: {new Date(order.order_date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">{content[language].items}:</h4>
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 mb-2">
                          <img 
                            src={item.image} 
                            alt={item.product_name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {language === 'en' ? item.product_name : item.product_name_bn}
                            </p>
                            <p className="text-xs text-gray-600">
                              Qty: {item.quantity} × {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">{content[language].shippingAddress}:</span>
                          <p>{order.customer_address}, {order.city}</p>
                        </div>
                        <div>
                          <span className="font-medium">{content[language].courierService}:</span>
                          <p>{order.courier_service}</p>
                        </div>
                        <div>
                          <span className="font-medium">{content[language].paymentMethod}:</span>
                          <p>{order.payment_method}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{content[language].total}:</span>
                      <span className="text-xl font-bold">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer language={language} />
    </div>
  );
};

export default Orders;
