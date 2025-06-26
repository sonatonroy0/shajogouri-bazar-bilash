
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Search, Eye, Download, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface OrdersProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Orders: React.FC<OrdersProps> = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const content = {
    en: {
      title: 'My Orders',
      subtitle: 'Track and manage your orders',
      search: 'Search orders...',
      filterBy: 'Filter by Status',
      orderNumber: 'Order #',
      orderDate: 'Date',
      items: 'Items',
      total: 'Total',
      status: 'Status',
      actions: 'Actions',
      viewDetails: 'View Details',
      downloadInvoice: 'Download Invoice',
      noOrders: 'No orders found',
      noOrdersDesc: 'You haven\'t placed any orders yet',
      shopNow: 'Shop Now',
      all: 'All Orders',
      pending: 'Pending',
      confirmed: 'Confirmed',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      returned: 'Returned'
    },
    bn: {
      title: 'আমার অর্ডার',
      subtitle: 'আপনার অর্ডার ট্র্যাক এবং পরিচালনা করুন',
      search: 'অর্ডার খুঁজুন...',
      filterBy: 'স্ট্যাটাস অনুযায়ী ফিল্টার',
      orderNumber: 'অর্ডার #',
      orderDate: 'তারিখ',
      items: 'পণ্য',
      total: 'মোট',
      status: 'অবস্থা',
      actions: 'অ্যাকশন',
      viewDetails: 'বিস্তারিত দেখুন',
      downloadInvoice: 'ইনভয়েস ডাউনলোড',
      noOrders: 'কোনো অর্ডার পাওয়া যায়নি',
      noOrdersDesc: 'আপনি এখনো কোনো অর্ডার করেননি',
      shopNow: 'এখনই কিনুন',
      all: 'সব অর্ডার',
      pending: 'অপেক্ষমান',
      confirmed: 'নিশ্চিত',
      processing: 'প্রক্রিয়াকরণ',
      shipped: 'পাঠানো হয়েছে',
      delivered: 'ডেলিভার',
      cancelled: 'বাতিল',
      returned: 'ফেরত'
    }
  };

  // Mock orders data - replace with real API call
  const mockOrders = [
    {
      id: 'SHJ-2024-001',
      date: '2024-01-15',
      items: 2,
      total: 4300,
      status: 'delivered',
      products: [
        { name: 'Pearl Necklace', namebn: 'মুক্তার হার', quantity: 1, price: 2500 },
        { name: 'Gold Earrings', namebn: 'সোনার কানের দুল', quantity: 1, price: 1800 }
      ]
    },
    {
      id: 'SHJ-2024-002',
      date: '2024-01-20',
      items: 1,
      total: 1200,
      status: 'shipped',
      products: [
        { name: 'Silk Scarf', namebn: 'রেশমি স্কার্ফ', quantity: 1, price: 1200 }
      ]
    },
    {
      id: 'SHJ-2024-003',
      date: '2024-01-25',
      items: 3,
      total: 5500,
      status: 'processing',
      products: [
        { name: 'Designer Handbag', namebn: 'ডিজাইনার ব্যাগ', quantity: 1, price: 3500 },
        { name: 'Crystal Bracelet', namebn: 'ক্রিস্টাল ব্রেসলেট', quantity: 2, price: 1000 }
      ]
    }
  ];

  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'shipped': return 'secondary';
      case 'processing': return 'outline';
      case 'confirmed': return 'secondary';
      case 'pending': return 'outline';
      case 'cancelled': return 'destructive';
      case 'returned': return 'destructive';
      default: return 'outline';
    }
  };

  const formatPrice = (price: number) => {
    return language === 'en' ? `৳${price.toLocaleString()}` : `৳${price.toLocaleString('bn-BD')}`;
  };

  const handleViewDetails = (orderId: string) => {
    navigate(`/track-order?id=${orderId}`);
  };

  const handleDownloadInvoice = (orderId: string) => {
    // In a real app, this would generate and download the invoice
    console.log('Downloading invoice for order:', orderId);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{content[language].title}</h1>
          <p className="text-gray-600 mt-2">{content[language].subtitle}</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={content[language].search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={content[language].filterBy} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{content[language].all}</SelectItem>
                    <SelectItem value="pending">{content[language].pending}</SelectItem>
                    <SelectItem value="confirmed">{content[language].confirmed}</SelectItem>
                    <SelectItem value="processing">{content[language].processing}</SelectItem>
                    <SelectItem value="shipped">{content[language].shipped}</SelectItem>
                    <SelectItem value="delivered">{content[language].delivered}</SelectItem>
                    <SelectItem value="cancelled">{content[language].cancelled}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-semibold text-lg">#{order.id}</h3>
                        <Badge variant={getStatusBadgeVariant(order.status)}>
                          {content[language][order.status as keyof typeof content[typeof language]]}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">{content[language].orderDate}:</span>
                          <br />
                          {order.date}
                        </div>
                        <div>
                          <span className="font-medium">{content[language].items}:</span>
                          <br />
                          {order.items} {language === 'en' ? 'item(s)' : 'টি পণ্য'}
                        </div>
                        <div>
                          <span className="font-medium">{content[language].total}:</span>
                          <br />
                          <span className="text-lg font-bold text-gray-900">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(order.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {content[language].viewDetails}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadInvoice(order.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {content[language].downloadInvoice}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12">
              <div className="text-center">
                <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {content[language].noOrders}
                </h3>
                <p className="text-gray-600 mb-6">{content[language].noOrdersDesc}</p>
                <Button onClick={() => navigate('/shop')} className="bg-pink-600 hover:bg-pink-700">
                  {content[language].shopNow}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer language={language} />
    </div>
  );
};

export default Orders;
