import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { toast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';

interface ProductManagementProps {
  language: 'en' | 'bn';
}

const ProductManagement: React.FC<ProductManagementProps> = ({ language }) => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productImages, setProductImages] = useState<string[]>(['']);

  const [formData, setFormData] = useState({
    name: '',
    namebn: '',
    price: 0,
    original_price: 0,
    category: 'jewelry',
    description: '',
    descriptionbn: '',
    stock_count: 0,
    is_new: false,
    is_sale: false,
    rating: 4.5,
    reviews: 0
  });

  const content = {
    en: {
      title: 'Product Management',
      addProduct: 'Add New Product',
      editProduct: 'Edit Product',
      productName: 'Product Name (English)',
      productNameBn: 'Product Name (Bangla)',
      price: 'Price (৳)',
      originalPrice: 'Original Price (৳)',
      category: 'Category',
      description: 'Description (English)',
      descriptionBn: 'Description (Bangla)',
      images: 'Product Images',
      stock: 'Stock Count',
      isNew: 'Mark as New',
      isSale: 'On Sale',
      save: 'Save Product',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      addImage: 'Add Another Image',
      removeImage: 'Remove Image',
      jewelry: 'Jewelry',
      accessories: 'Accessories',
      clothing: 'Clothing'
    },
    bn: {
      title: 'পণ্য ব্যবস্থাপনা',
      addProduct: 'নতুন পণ্য যোগ করুন',
      editProduct: 'পণ্য সম্পাদনা',
      productName: 'পণ্যের নাম (ইংরেজি)',
      productNameBn: 'পণ্যের নাম (বাংলা)',
      price: 'দাম (৳)',
      originalPrice: 'আসল দাম (৳)',
      category: 'ক্যাটেগরি',
      description: 'বিবরণ (ইংরেজি)',
      descriptionBn: 'বিবরণ (বাংলা)',
      images: 'পণ্যের ছবি',
      stock: 'স্টক সংখ্যা',
      isNew: 'নতুন হিসেবে চিহ্নিত করুন',
      isSale: 'অফারে আছে',
      save: 'পণ্য সেভ করুন',
      cancel: 'বাতিল',
      edit: 'সম্পাদনা',
      delete: 'মুছুন',
      inStock: 'স্টকে আছে',
      outOfStock: 'স্টকে নেই',
      addImage: 'আরও ছবি যোগ করুন',
      removeImage: 'ছবি সরান',
      jewelry: 'গহনা',
      accessories: 'অ্যাক্সেসরিজ',
      clothing: 'পোশাক'
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      namebn: '',
      price: 0,
      original_price: 0,
      category: 'jewelry',
      description: '',
      descriptionbn: '',
      stock_count: 0,
      is_new: false,
      is_sale: false,
      rating: 4.5,
      reviews: 0
    });
    setProductImages(['']);
    setEditingProduct(null);
    setShowAddProduct(false);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      namebn: product.namebn,
      price: product.price,
      original_price: product.original_price || 0,
      category: product.category,
      description: product.description,
      descriptionbn: product.descriptionbn,
      stock_count: product.stock_count,
      is_new: product.is_new || false,
      is_sale: product.is_sale || false,
      rating: product.rating || 4.5,
      reviews: product.reviews || 0
    });
    setProductImages(product.images && product.images.length > 0 ? product.images : ['']);
    setShowAddProduct(true);
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.namebn || formData.price <= 0) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    const validImages = productImages.filter(img => img.trim() !== '');
    if (validImages.length === 0) {
      toast({
        title: 'Error',
        description: 'Please add at least one product image',
        variant: 'destructive'
      });
      return;
    }

    const productData = {
      ...formData,
      image: validImages[0],
      images: validImages,
      in_stock: formData.stock_count > 0
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast({
        title: 'Success!',
        description: 'Product updated successfully'
      });
    } else {
      addProduct(productData);
      toast({
        title: 'Success!',
        description: 'Product added successfully'
      });
    }

    resetForm();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast({
        title: 'Success!',
        description: 'Product deleted successfully'
      });
    }
  };

  const addImageSlot = () => {
    setProductImages([...productImages, '']);
  };

  const removeImageSlot = (index: number) => {
    setProductImages(productImages.filter((_, i) => i !== index));
  };

  const updateImageSlot = (index: number, url: string) => {
    const newImages = [...productImages];
    newImages[index] = url;
    setProductImages(newImages);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{content[language].title}</h2>
        <Button
          onClick={() => setShowAddProduct(true)}
          className="bg-pink-600 hover:bg-pink-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          {content[language].addProduct}
        </Button>
      </div>

      {/* Add/Edit Product Form */}
      {showAddProduct && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingProduct ? content[language].editProduct : content[language].addProduct}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{content[language].productName}</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter product name in English"
                />
              </div>
              <div>
                <Label>{content[language].productNameBn}</Label>
                <Input
                  value={formData.namebn}
                  onChange={(e) => setFormData(prev => ({ ...prev, namebn: e.target.value }))}
                  placeholder="পণ্যের নাম বাংলায় লিখুন"
                />
              </div>
              <div>
                <Label>{content[language].price}</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label>{content[language].originalPrice}</Label>
                <Input
                  type="number"
                  value={formData.original_price}
                  onChange={(e) => setFormData(prev => ({ ...prev, original_price: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label>{content[language].category}</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jewelry">{content[language].jewelry}</SelectItem>
                    <SelectItem value="accessories">{content[language].accessories}</SelectItem>
                    <SelectItem value="clothing">{content[language].clothing}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{content[language].stock}</Label>
                <Input
                  type="number"
                  value={formData.stock_count}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock_count: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
            </div>

            {/* Product Images */}
            <div>
              <Label className="text-lg font-medium">{content[language].images}</Label>
              <div className="space-y-4 mt-2">
                {productImages.map((image, index) => (
                  <div key={index} className="relative">
                    <ImageUpload
                      value={image}
                      onChange={(url) => updateImageSlot(index, url)}
                      label={`Image ${index + 1}`}
                    />
                    {productImages.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-0 right-0"
                        onClick={() => removeImageSlot(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addImageSlot}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {content[language].addImage}
                </Button>
              </div>
            </div>

            <div>
              <Label>{content[language].description}</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter product description in English"
              />
            </div>

            <div>
              <Label>{content[language].descriptionBn}</Label>
              <Textarea
                value={formData.descriptionbn}
                onChange={(e) => setFormData(prev => ({ ...prev, descriptionbn: e.target.value }))}
                placeholder="পণ্যের বিবরণ বাংলায় লিখুন"
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.is_new}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_new: e.target.checked }))}
                />
                <span>{content[language].isNew}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.is_sale}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_sale: e.target.checked }))}
                />
                <span>{content[language].isSale}</span>
              </label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveProduct} className="bg-pink-600 hover:bg-pink-700">
                {content[language].save}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                {content[language].cancel}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{language === 'en' ? product.name : product.namebn}</h4>
                  <p className="text-sm text-gray-600">৳{product.price.toLocaleString()}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant={product.in_stock ? "secondary" : "destructive"}>
                      {product.in_stock ? content[language].inStock : content[language].outOfStock}
                    </Badge>
                    {product.is_new && <Badge className="bg-green-500">{language === 'en' ? 'New' : 'নতুন'}</Badge>}
                    {product.is_sale && <Badge className="bg-red-500">{language === 'en' ? 'Sale' : 'অফার'}</Badge>}
                  </div>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
