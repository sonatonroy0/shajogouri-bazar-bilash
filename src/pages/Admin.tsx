
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
import { Package, Users, ShoppingCart, Settings, Plus, Edit, Trash2 } from 'lucide-react';
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

  // Redirect if not admin
  React.useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const content = {
    en: {
      title: 'Admin Dashboard',
      products: 'Products',
      orders: 'Orders',
      users: 'Users',
      settings: 'Settings',
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
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      totalProducts: 'Total Products',
      totalOrders: 'Total Orders',
      totalUsers: 'Total Users',
      revenue: 'Revenue',
      stats: {
        products: '24',
        orders: '156',
        users: '1,234',
        revenue: '৳2,45,000'
      }
    },
    bn: {
      title: 'অ্যাডমিন ড্যাশবোর্ড',
      products: 'পণ্যসমূহ',
      orders: 'অর্ডারসমূহ',
      users: 'ব্যবহারকারীগণ',
      settings: 'সেটিংস',
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
      inStock: 'স্টকে আছে',
      outOfStock: 'স্টকে নেই',
      totalProducts: 'মোট পণ্য',
      totalOrders: 'মোট অর্ডার',
      totalUsers: 'মোট ব্যবহারকারী',
      revenue: 'আয়',
      stats: {
        products: '২৪',
        orders: '১৫৬',
        users: '১,২৩৪',
        revenue: '৳২,৪৫,০০০'
      }
    }
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      // Update existing product
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
      // Add new product
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

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{content[language].title}</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{content[language].totalUsers}</p>
                  <p className="text-2xl font-bold text-gray-900">{content[language].stats.users}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Settings className="h-8 w-8 text-pink-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{content[language].revenue}</p>
                  <p className="text-2xl font-bold text-gray-900">{content[language].stats.revenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">{content[language].products}</TabsTrigger>
            <TabsTrigger value="orders">{content[language].orders}</TabsTrigger>
            <TabsTrigger value="users">{content[language].users}</TabsTrigger>
            <TabsTrigger value="settings">{content[language].settings}</TabsTrigger>
          </TabsList>

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
                <CardTitle>{content[language].orders}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Order management functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>{content[language].users}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">User management functionality coming soon...</p>
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
