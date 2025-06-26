
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Package, Users, ShoppingCart, Settings, Plus, Edit, Trash2, 
  BarChart3, Download, Upload, Image, Calendar, TrendingUp,
  Eye, FileText, Filter, Search
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { sampleProducts } from '@/data/products';
import { toast } from '@/hooks/use-toast';

interface AdminProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Admin: React.FC<AdminProps> = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState(sampleProducts);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    namebn: '',
    price: 0,
    category: 'jewelry',
    description: '',
    descriptionbn: '',
    image: '',
    stockCount: 0
  });

  const [bannerSettings, setBannerSettings] = useState({
    heroImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200',
    heroTitle: 'Handcrafted Elegance',
    heroTitleBn: 'হাতে তৈরি কারুকাজ',
    heroSubtitle: 'Discover our exclusive collection',
    heroSubtitleBn: 'আমাদের বিশেষ কালেকশন দেখুন'
  });

  // Redirect if not admin
  React.useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const content = {
    en: {
      title: 'Admin Dashboard',
      overview: 'Overview',
      products: 'Products',
      orders: 'Orders',
      users: 'Users',
      settings: 'Settings',
      homepage: 'Homepage',
      reports: 'Reports',
      addProduct: 'Add Product',
      editProduct: 'Edit Product',
      productName: 'Product Name',
      productNameBn: 'Product Name (Bangla)',
      price: 'Price',
      category: 'Category',
      description: 'Description',
      descriptionBn: 'Description (Bangla)',
      image: 'Image URL',
      stock: 'Stock Count',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      totalProducts: 'Total Products',
      totalOrders: 'Total Orders',
      totalUsers: 'Total Users',
      revenue: 'Revenue',
      uploadImage: 'Upload Image',
      heroSettings: 'Hero Banner Settings',
      heroImage: 'Hero Image',
      heroTitle: 'Hero Title',
      heroSubtitle: 'Hero Subtitle',
      updateBanner: 'Update Banner',
      orderManagement: 'Order Management',
      customerName: 'Customer',
      orderDate: 'Date',
      orderTotal: 'Total',
      orderStatus: 'Status',
      orderActions: 'Actions',
      downloadExcel: 'Download Excel',
      filterOrders: 'Filter Orders',
      searchOrders: 'Search orders...',
      todaySales: 'Today\'s Sales',
      thisMonth: 'This Month',
      topProducts: 'Top Products',
      recentOrders: 'Recent Orders',
      stats: {
        products: '24',
        orders: '156',
        users: '1,234',
        revenue: '৳2,45,000',
        todaySales: '৳15,000',
        monthSales: '৳1,80,000'
      }
    },
    bn: {
      title: 'অ্যাডমিন ড্যাশবোর্ড',
      overview: 'সারসংক্ষেপ',
      products: 'পণ্যসমূহ',
      orders: 'অর্ডারসমূহ',
      users: 'ব্যবহারকারীগণ',
      settings: 'সেটিংস',
      homepage: 'হোমপেজ',
      reports: 'রিপোর্ট',
      addProduct: 'পণ্য যোগ করুন',
      editProduct: 'পণ্য সম্পাদনা',
      productName: 'পণ্যের নাম',
      productNameBn: 'পণ্যের নাম (বাংলা)',
      price: 'দাম',
      category: 'ক্যাটেগরি',
      description: 'বিবরণ',
      descriptionBn: 'বিবরণ (বাংলা)',
      image: 'ছবির URL',
      stock: 'স্টক সংখ্যা',
      save: 'সেভ করুন',
      cancel: 'বাতিল',
      edit: 'সম্পাদনা',
      delete: 'মুছুন',
      view: 'দেখুন',
      inStock: 'স্টকে আছে',
      outOfStock: 'স্টকে নেই',
      totalProducts: 'মোট পণ্য',
      totalOrders: 'মোট অর্ডার',
      totalUsers: 'মোট ব্যবহারকারী',
      revenue: 'আয়',
      uploadImage: 'ছবি আপলোড',
      heroSettings: 'হিরো ব্যানার সেটিংস',
      heroImage: 'হিরো ইমেজ',
      heroTitle: 'হিরো শিরোনাম',
      heroSubtitle: 'হিরো সাবটাইটেল',
      updateBanner: 'ব্যানার আপডেট',
      orderManagement: 'অর্ডার ব্যবস্থাপনা',
      customerName: 'ক্রেতা',
      orderDate: 'তারিখ',
      orderTotal: 'মোট',
      orderStatus: 'অবস্থা',
      orderActions: 'অ্যাকশন',
      downloadExcel: 'এক্সেল ডাউনলোড',
      filterOrders: 'অর্ডার ফিল্টার',
      searchOrders: 'অর্ডার খুঁজুন...',
      todaySales: 'আজকের বিক্রয়',
      thisMonth: 'এই মাসে',
      topProducts: 'জনপ্রিয় পণ্য',
      recentOrders: 'সাম্প্রতিক অর্ডার',
      stats: {
        products: '২৤',
        orders: '১৫৬',
        users: '১,২৩৪',
        revenue: '৳২,৪৫,০০০',
        todaySales: '৳১৫,০০০',
        monthSales: '৳১,৮০,০০০'
      }
    }
  };

  // Mock orders data
  const mockOrders = [
    {
      id: 'SHJ-2024-001',
      customerName: 'Fatima Rahman',
      customerEmail: 'fatima@example.com',
      customerPhone: '+8801712345678',
      date: '2024-01-15',
      total: 4300,
      status: 'delivered',
      address: 'House 15, Road 7, Dhanmondi, Dhaka-1205',
      items: [
        { name: 'Pearl Necklace', namebn: 'মুক্তার হার', quantity: 1, price: 2500 },
        { name: 'Gold Earrings', namebn: 'সোনার কানের দুল', quantity: 1, price: 1800 }
      ]
    },
    {
      id: 'SHJ-2024-002',
      customerName: 'Rashida Khatun',
      customerEmail: 'rashida@example.com',
      customerPhone: '+8801987654321',
      date: '2024-01-20',
      total: 1200,
      status: 'shipped',
      address: 'Flat 3B, Gulshan-2, Dhaka-1212',
      items: [
        { name: 'Silk Scarf', namebn: 'রেশমি স্কার্ফ', quantity: 1, price: 1200 }
      ]
    }
  ];

  const handleSaveProduct = () => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...editingProduct, ...newProduct, id: editingProduct.id }
          : p
      ));
      toast({
        title: 'Product updated successfully!',
        description: 'The product has been updated.',
      });
    } else {
      const product = {
        ...newProduct,
        id: Date.now().toString(),
        images: [newProduct.image],
        rating: 4.5,
        reviews: 0,
        inStock: newProduct.stockCount > 0
      };
      setProducts(prev => [...prev, product]);
      toast({
        title: 'Product added successfully!',
        description: 'The new product has been added.',
      });
    }
    
    setShowAddProduct(false);
    setEditingProduct(null);
    setNewProduct({
      name: '',
      namebn: '',
      price: 0,
      category: 'jewelry',
      description: '',
      descriptionbn: '',
      image: '',
      stockCount: 0
    });
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      namebn: product.namebn,
      price: product.price,
      category: product.category,
      description: product.description,
      descriptionbn: product.descriptionbn,
      image: product.image,
      stockCount: product.stockCount
    });
    setShowAddProduct(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({
      title: 'Product deleted successfully!',
      description: 'The product has been removed.',
    });
  };

  const handleUpdateBanner = () => {
    toast({
      title: 'Banner updated successfully!',
      description: 'Homepage banner has been updated.',
    });
  };

  const handleDownloadExcel = () => {
    // In real app, generate and download Excel file
    toast({
      title: 'Excel file downloaded!',
      description: 'Orders have been exported to Excel.',
    });
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedOrderStatus === 'all' || order.status === selectedOrderStatus;
    return matchesSearch && matchesStatus;
  });

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{content[language].title}</h1>
          <p className="text-gray-600 mt-2">
            {language === 'en' ? 'Manage your store and monitor performance' : 'আপনার স্টোর পরিচালনা করুন এবং কর্মক্ষমতা মনিটর করুন'}
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">{content[language].overview}</TabsTrigger>
            <TabsTrigger value="products">{content[language].products}</TabsTrigger>
            <TabsTrigger value="orders">{content[language].orders}</TabsTrigger>
            <TabsTrigger value="homepage">{content[language].homepage}</TabsTrigger>
            <TabsTrigger value="reports">{content[language].reports}</TabsTrigger>
            <TabsTrigger value="settings">{content[language].settings}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Package className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{content[language].totalProducts}</p>
                      <p className="text-2xl font-bold text-gray-900">{content[language].stats.products}</p>
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
                      <p className="text-2xl font-bold text-gray-900">{content[language].stats.orders}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{content[language].todaySales}</p>
                      <p className="text-2xl font-bold text-gray-900">{content[language].stats.todaySales}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <BarChart3 className="h-8 w-8 text-pink-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{content[language].revenue}</p>
                      <p className="text-2xl font-bold text-gray-900">{content[language].stats.revenue}</p>
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
                  {mockOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">#{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">৳{order.total.toLocaleString()}</p>
                        <Badge variant="secondary">{order.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{content[language].products}</CardTitle>
                  <Button
                    onClick={() => setShowAddProduct(true)}
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {content[language].addProduct}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showAddProduct && (
                  <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">
                      {editingProduct ? content[language].editProduct : content[language].addProduct}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>{content[language].productName}</Label>
                        <Input
                          value={newProduct.name}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>{content[language].productNameBn}</Label>
                        <Input
                          value={newProduct.namebn}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, namebn: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>{content[language].price}</Label>
                        <Input
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <Label>{content[language].stock}</Label>
                        <Input
                          type="number"
                          value={newProduct.stockCount}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, stockCount: Number(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <Label>{content[language].image}</Label>
                        <Input
                          value={newProduct.image}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>{content[language].category}</Label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                        >
                          <option value="jewelry">Jewelry</option>
                          <option value="accessories">Accessories</option>
                          <option value="clothing">Clothing</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <Label>{content[language].description}</Label>
                        <Textarea
                          value={newProduct.description}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>{content[language].descriptionBn}</Label>
                        <Textarea
                          value={newProduct.descriptionbn}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, descriptionbn: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleSaveProduct} className="bg-pink-600 hover:bg-pink-700">
                        {content[language].save}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setShowAddProduct(false);
                          setEditingProduct(null);
                        }}
                      >
                        {content[language].cancel}
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-600">৳{product.price.toLocaleString()}</p>
                        <Badge variant={product.inStock ? "secondary" : "destructive"}>
                          {product.inStock ? content[language].inStock : content[language].outOfStock}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{content[language].orderManagement}</CardTitle>
                  <Button onClick={handleDownloadExcel} className="bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
                    {content[language].downloadExcel}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder={content[language].searchOrders}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedOrderStatus} onValueChange={setSelectedOrderStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder={content[language].filterOrders} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Orders Table */}
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">#{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <Badge variant="secondary">{order.status}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="font-medium">{content[language].customerName}</p>
                          <p className="text-sm text-gray-600">{order.customerName}</p>
                          <p className="text-sm text-gray-600">{order.customerEmail}</p>
                          <p className="text-sm text-gray-600">{order.customerPhone}</p>
                        </div>
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-sm text-gray-600">{order.address}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="font-medium mb-2">Items:</p>
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{language === 'en' ? item.name : item.namebn} x{item.quantity}</span>
                            <span>৳{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                          <span>Total:</span>
                          <span>৳{order.total.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          {content[language].view}
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Invoice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Homepage Tab */}
          <TabsContent value="homepage">
            <Card>
              <CardHeader>
                <CardTitle>{content[language].heroSettings}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label>{content[language].heroImage}</Label>
                    <div className="flex gap-4 items-center">
                      <Input
                        value={bannerSettings.heroImage}
                        onChange={(e) => setBannerSettings(prev => ({ ...prev, heroImage: e.target.value }))}
                        placeholder="Image URL"
                      />
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        {content[language].uploadImage}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{content[language].heroTitle} (English)</Label>
                      <Input
                        value={bannerSettings.heroTitle}
                        onChange={(e) => setBannerSettings(prev => ({ ...prev, heroTitle: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>{content[language].heroTitle} (Bangla)</Label>
                      <Input
                        value={bannerSettings.heroTitleBn}
                        onChange={(e) => setBannerSettings(prev => ({ ...prev, heroTitleBn: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{content[language].heroSubtitle} (English)</Label>
                      <Input
                        value={bannerSettings.heroSubtitle}
                        onChange={(e) => setBannerSettings(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>{content[language].heroSubtitle} (Bangla)</Label>
                      <Input
                        value={bannerSettings.heroSubtitleBn}
                        onChange={(e) => setBannerSettings(prev => ({ ...prev, heroSubtitleBn: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Button onClick={handleUpdateBanner} className="bg-pink-600 hover:bg-pink-700">
                    {content[language].updateBanner}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Today's Sales:</span>
                      <span className="font-bold">৳15,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Week:</span>
                      <span className="font-bold">৳85,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Month:</span>
                      <span className="font-bold">৳1,80,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{content[language].topProducts}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Pearl Necklace</span>
                      <span>45 sold</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gold Earrings</span>
                      <span>38 sold</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Silk Scarf</span>
                      <span>32 sold</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>{content[language].settings}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Settings functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
