
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProductManagement from '@/components/admin/ProductManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Package, ShoppingCart, Users, TrendingUp, Download, 
  Upload, Image, Settings as SettingsIcon
} from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { useProducts } from '@/contexts/ProductContext';
import { useOrders } from '@/contexts/OrderContext';
import { toast } from '@/hooks/use-toast';
import ImageUpload from '@/components/admin/ImageUpload';

interface AdminProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Admin: React.FC<AdminProps> = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { settings, updateSettings } = useSettings();
  const { products } = useProducts();
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not admin
  React.useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const content = {
    en: {
      title: 'Admin Dashboard',
      totalProducts: 'Total Products',
      totalOrders: 'Total Orders',
      totalUsers: 'Total Users',
      todaySales: 'Today\'s Sales',
      recentOrders: 'Recent Orders',
      bannerSettings: 'Banner Settings',
      heroImage: 'Hero Image URL',
      heroTitle: 'Hero Title',
      heroSubtitle: 'Hero Subtitle',
      updateBanner: 'Update Banner',
      siteSettings: 'Site Settings',
      siteName: 'Site Name',
      phone: 'Phone Number',
      email: 'Email Address',
      address: 'Address',
      whatsappNumber: 'WhatsApp Number',
      facebookPageId: 'Facebook Page ID',
      liveChatEnabled: 'Enable Live Chat',
      couponSystemEnabled: 'Enable Coupon System',
      newsletterEnabled: 'Enable Newsletter',
      paymentMethods: 'Payment Methods',
      saveSettings: 'Save Settings'
    },
    bn: {
      title: 'অ্যাডমিন ড্যাশবোর্ড',
      totalProducts: 'মোট পণ্য',
      totalOrders: 'মোট অর্ডার',
      totalUsers: 'মোট ব্যবহারকারী',
      todaySales: 'আজকের বিক্রয়',
      recentOrders: 'সাম্প্রতিক অর্ডার',
      bannerSettings: 'ব্যানার সেটিংস',
      heroImage: 'হিরো ইমেজ',
      heroTitle: 'হিরো শিরোনাম',
      heroSubtitle: 'হিরো সাবটাইটেল',
      updateBanner: 'ব্যানার আপডেট করুন',
      siteSettings: 'সাইট সেটিংস',
      siteName: 'সাইটের নাম',
      phone: 'ফোন নম্বর',
      email: 'ইমেইল ঠিকানা',
      address: 'ঠিকানা',
      whatsappNumber: 'WhatsApp নম্বর',
      facebookPageId: 'Facebook পেইজ ID',
      liveChatEnabled: 'লাইভ চ্যাট চালু করুন',
      couponSystemEnabled: 'কুপন সিস্টেম চালু করুন',
      newsletterEnabled: 'নিউজলেটার চালু করুন',
      paymentMethods: 'পেমেন্ট পদ্ধতি',
      saveSettings: 'সেটিংস সেভ করুন'
    }
  };

  const todaySales = orders
    .filter(order => new Date(order.orderDate).toDateString() === new Date().toDateString())
    .reduce((sum, order) => sum + order.total, 0);

  const handleSaveSettings = () => {
    toast({
      title: 'Success!',
      description: 'Settings updated successfully'
    });
  };

  if (!user?.isAdmin) {
    return null;
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{content[language].title}</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{content[language].totalProducts}</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{content[language].totalOrders}</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{content[language].totalUsers}</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-pink-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{content[language].todaySales}</p>
                <p className="text-2xl font-bold text-gray-900">৳{todaySales.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>{content[language].recentOrders}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">#{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customerName} - {order.items.length} items</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">৳{order.total.toLocaleString()}</p>
                  <Badge variant="secondary">{order.status}</Badge>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-gray-500 text-center py-4">No orders yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBanners = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{content[language].bannerSettings}</h2>
      
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <Label>{content[language].heroImage}</Label>
            <ImageUpload
              value={settings.heroImage}
              onChange={(url) => updateSettings({ heroImage: url })}
              label="Hero Banner Image"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{content[language].heroTitle} (English)</Label>
              <Input
                value={settings.heroTitle}
                onChange={(e) => updateSettings({ heroTitle: e.target.value })}
              />
            </div>
            <div>
              <Label>{content[language].heroTitle} (Bangla)</Label>
              <Input
                value={settings.heroTitleBn}
                onChange={(e) => updateSettings({ heroTitleBn: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{content[language].heroSubtitle} (English)</Label>
              <Textarea
                value={settings.heroSubtitle}
                onChange={(e) => updateSettings({ heroSubtitle: e.target.value })}
              />
            </div>
            <div>
              <Label>{content[language].heroSubtitle} (Bangla)</Label>
              <Textarea
                value={settings.heroSubtitleBn}
                onChange={(e) => updateSettings({ heroSubtitleBn: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={handleSaveSettings} className="bg-pink-600 hover:bg-pink-700">
            {content[language].updateBanner}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{content[language].siteSettings}</h2>
      
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Basic Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{content[language].siteName} (English)</Label>
              <Input
                value={settings.siteName}
                onChange={(e) => updateSettings({ siteName: e.target.value })}
              />
            </div>
            <div>
              <Label>{content[language].siteName} (Bangla)</Label>
              <Input
                value={settings.siteNameBn}
                onChange={(e) => updateSettings({ siteNameBn: e.target.value })}
              />
            </div>
            <div>
              <Label>{content[language].phone}</Label>
              <Input
                value={settings.phone}
                onChange={(e) => updateSettings({ phone: e.target.value })}
              />
            </div>
            <div>
              <Label>{content[language].email}</Label>
              <Input
                value={settings.email}
                onChange={(e) => updateSettings({ email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{content[language].address} (English)</Label>
              <Textarea
                value={settings.address}
                onChange={(e) => updateSettings({ address: e.target.value })}
              />
            </div>
            <div>
              <Label>{content[language].address} (Bangla)</Label>
              <Textarea
                value={settings.addressBn}
                onChange={(e) => updateSettings({ addressBn: e.target.value })}
              />
            </div>
          </div>

          {/* Social & Chat Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{content[language].whatsappNumber}</Label>
              <Input
                value={settings.whatsappNumber}
                onChange={(e) => updateSettings({ whatsappNumber: e.target.value })}
                placeholder="8801712345678"
              />
            </div>
            <div>
              <Label>{content[language].facebookPageId}</Label>
              <Input
                value={settings.facebookPageId}
                onChange={(e) => updateSettings({ facebookPageId: e.target.value })}
                placeholder="shajogouri"
              />
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>{content[language].liveChatEnabled}</Label>
              <Switch
                checked={settings.liveChatEnabled}
                onCheckedChange={(checked) => updateSettings({ liveChatEnabled: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>{content[language].couponSystemEnabled}</Label>
              <Switch
                checked={settings.couponSystemEnabled}
                onCheckedChange={(checked) => updateSettings({ couponSystemEnabled: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>{content[language].newsletterEnabled}</Label>
              <Switch
                checked={settings.newsletterEnabled}
                onCheckedChange={(checked) => updateSettings({ newsletterEnabled: checked })}
              />
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <Label className="text-lg font-medium">{content[language].paymentMethods}</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center justify-between">
                <Label>bKash</Label>
                <Switch
                  checked={settings.paymentMethods.bkash}
                  onCheckedChange={(checked) => updateSettings({ 
                    paymentMethods: { ...settings.paymentMethods, bkash: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Nagad</Label>
                <Switch
                  checked={settings.paymentMethods.nagad}
                  onCheckedChange={(checked) => updateSettings({ 
                    paymentMethods: { ...settings.paymentMethods, nagad: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Rocket</Label>
                <Switch
                  checked={settings.paymentMethods.rocket}
                  onCheckedChange={(checked) => updateSettings({ 
                    paymentMethods: { ...settings.paymentMethods, rocket: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Cash on Delivery</Label>
                <Switch
                  checked={settings.paymentMethods.cashOnDelivery}
                  onCheckedChange={(checked) => updateSettings({ 
                    paymentMethods: { ...settings.paymentMethods, cashOnDelivery: checked }
                  })}
                />
              </div>
            </div>
          </div>

          <Button onClick={handleSaveSettings} className="bg-pink-600 hover:bg-pink-700">
            {content[language].saveSettings}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'products': return <ProductManagement language={language} />;
      case 'orders': return <OrderManagement language={language} />;
      case 'banners': return renderBanners();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        language={language} 
      />
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;
