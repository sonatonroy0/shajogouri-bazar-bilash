
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Package, Heart, Settings, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface AccountProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Account: React.FC<AccountProps> = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    area: user?.area || ''
  });

  const content = {
    en: {
      title: 'My Account',
      profile: 'Profile',
      orders: 'My Orders',
      wishlist: 'Wishlist',
      settings: 'Settings',
      personalInfo: 'Personal Information',
      shippingInfo: 'Shipping Address',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      city: 'City',
      area: 'Area',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      orderHistory: 'Order History',
      orderDate: 'Order Date',
      orderTotal: 'Total',
      orderStatus: 'Status',
      viewOrder: 'View Details',
      noOrders: 'No orders found',
      recentOrders: 'Recent Orders',
      profileUpdated: 'Profile updated successfully!',
      pending: 'Pending',
      confirmed: 'Confirmed',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    },
    bn: {
      title: 'আমার অ্যাকাউন্ট',
      profile: 'প্রোফাইল',
      orders: 'আমার অর্ডার',
      wishlist: 'উইশলিস্ট',
      settings: 'সেটিংস',
      personalInfo: 'ব্যক্তিগত তথ্য',
      shippingInfo: 'ডেলিভারির ঠিকানা',
      name: 'পূর্ণ নাম',
      email: 'ইমেইল',
      phone: 'ফোন',
      address: 'ঠিকানা',
      city: 'শহর',
      area: 'এলাকা',
      edit: 'সম্পাদনা',
      save: 'সেভ',
      cancel: 'বাতিল',
      orderHistory: 'অর্ডার ইতিহাস',
      orderDate: 'অর্ডারের তারিখ',
      orderTotal: 'মোট',
      orderStatus: 'অবস্থা',
      viewOrder: 'বিস্তারিত দেখুন',
      noOrders: 'কোনো অর্ডার পাওয়া যায়নি',
      recentOrders: 'সাম্প্রতিক অর্ডার',
      profileUpdated: 'প্রোফাইল সফলভাবে আপডেট হয়েছে!',
      pending: 'অপেক্ষমান',
      confirmed: 'নিশ্চিত',
      shipped: 'পাঠানো হয়েছে',
      delivered: 'ডেলিভার হয়েছে',
      cancelled: 'বাতিল'
    }
  };

  // Mock order data - in real app, this would come from API
  const mockOrders = [
    {
      id: 'SHJ-2024-001',
      date: '2024-01-15',
      total: 4300,
      status: 'delivered',
      items: [
        { name: 'Pearl Necklace', namebn: 'মুক্তার হার', quantity: 1, price: 2500 },
        { name: 'Gold Earrings', namebn: 'সোনার কানের দুল', quantity: 1, price: 1800 }
      ]
    },
    {
      id: 'SHJ-2024-002',
      date: '2024-01-20',
      total: 1200,
      status: 'shipped',
      items: [
        { name: 'Silk Scarf', namebn: 'রেশমি স্কার্ফ', quantity: 1, price: 1200 }
      ]
    }
  ];

  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSave = async () => {
    try {
      await updateProfile(profile);
      setIsEditing(false);
      toast({
        title: content[language].profileUpdated,
        description: language === 'en' ? 'Your profile has been updated.' : 'আপনার প্রোফাইল আপডেট হয়েছে।',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile.',
        variant: 'destructive'
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'shipped': return 'secondary';
      case 'confirmed': return 'outline';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const formatPrice = (price: number) => {
    return language === 'en' ? `৳${price.toLocaleString()}` : `৳${price.toLocaleString('bn-BD')}`;
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{content[language].title}</h1>
          <p className="text-gray-600 mt-2">
            {language === 'en' ? 'Manage your account and view your orders' : 'আপনার অ্যাকাউন্ট পরিচালনা করুন এবং অর্ডার দেখুন'}
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {content[language].profile}
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              {content[language].orders}
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              {content[language].wishlist}
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {content[language].settings}
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{content[language].personalInfo}</CardTitle>
                    {!isEditing ? (
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        {content[language].edit}
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                          <X className="h-4 w-4 mr-2" />
                          {content[language].cancel}
                        </Button>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          {content[language].save}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>{content[language].name}</Label>
                    <Input
                      value={profile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label>{content[language].email}</Label>
                    <Input
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label>{content[language].phone}</Label>
                    <Input
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>{content[language].shippingInfo}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>{content[language].address}</Label>
                    <Input
                      value={profile.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{content[language].city}</Label>
                      <Input
                        value={profile.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label>{content[language].area}</Label>
                      <Input
                        value={profile.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>{content[language].recentOrders}</CardTitle>
              </CardHeader>
              <CardContent>
                {mockOrders.length > 0 ? (
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold">#{order.id}</p>
                            <p className="text-sm text-gray-600">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatPrice(order.total)}</p>
                            <Badge variant={getStatusBadgeVariant(order.status)}>
                              {content[language][order.status as keyof typeof content[typeof language]]}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{language === 'en' ? item.name : item.namebn} x{item.quantity}</span>
                              <span>{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" size="sm" onClick={() => navigate(`/track-order?id=${order.id}`)}>
                            {content[language].viewOrder}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">{content[language].noOrders}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>{content[language].wishlist}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {language === 'en' ? 'Your wishlist is empty' : 'আপনার উইশলিস্ট খালি'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>{content[language].settings}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {language === 'en' ? 'Language' : 'ভাষা'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {language === 'en' ? 'Choose your preferred language' : 'আপনার পছন্দের ভাষা নির্বাচন করুন'}
                      </p>
                    </div>
                    <Button variant="outline" onClick={toggleLanguage}>
                      {language === 'en' ? 'বাংলা' : 'English'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer language={language} />
    </div>
  );
};

export default Account;
