
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingBag, Star, Minus, Plus, ArrowLeft, Truck, Shield, RefreshCw } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductDetailProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ language, toggleLanguage }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = getProduct(id || '');

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header language={language} toggleLanguage={toggleLanguage} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Product not found' : 'পণ্য পাওয়া যায়নি'}
            </h1>
            <Button onClick={() => navigate('/shop')}>
              {language === 'en' ? 'Back to Shop' : 'শপে ফিরে যান'}
            </Button>
          </div>
        </div>
        <Footer language={language} />
      </div>
    );
  }

  const content = {
    en: {
      backToShop: 'Back to Shop',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      addToWishlist: 'Add to Wishlist',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      quantity: 'Quantity',
      description: 'Description',
      features: 'Features',
      shipping: 'Free Shipping',
      returns: '30-Day Returns',
      warranty: '1 Year Warranty',
      reviews: 'reviews',
      stockLeft: 'items left in stock',
    },
    bn: {
      backToShop: 'শপে ফিরে যান',
      addToCart: 'কার্টে যোগ করুন',
      buyNow: 'এখনই কিনুন',
      addToWishlist: 'পছন্দের তালিকায় যোগ করুন',
      inStock: 'স্টকে আছে',
      outOfStock: 'স্টকে নেই',
      quantity: 'পরিমাণ',
      description: 'বিবরণ',
      features: 'বৈশিষ্ট্য',
      shipping: 'ফ্রি ডেলিভারি',
      returns: '৩০ দিনের রিটার্ন',
      warranty: '১ বছরের ওয়ারেন্টি',
      reviews: 'রিভিউ',
      stockLeft: 'স্টকে বাকি আছে',
    }
  };

  const formatPrice = (price: number) => {
    return language === 'en' ? `৳${price.toLocaleString()}` : `৳${price.toLocaleString('bn-BD')}`;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast({
      title: language === 'en' ? 'Added to Cart!' : 'কার্টে যোগ করা হয়েছে!',
      description: language === 'en' 
        ? `${quantity} ${product.name} added to your cart`
        : `${quantity} ${product.namebn} আপনার কার্টে যোগ করা হয়েছে`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-6 -ml-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {content[language].backToShop}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {product.is_new && (
                <Badge className="bg-green-500 hover:bg-green-600">
                  {language === 'en' ? 'New' : 'নতুন'}
                </Badge>
              )}
              {product.is_sale && (
                <Badge className="bg-red-500 hover:bg-red-600">
                  {language === 'en' ? 'Sale' : 'অফার'}
                </Badge>
              )}
            </div>

            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                {language === 'en' ? product.name : product.namebn}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating || 4.5)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating || 4.5} ({product.reviews || 0} {content[language].reviews})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.original_price && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`font-medium ${product.in_stock ? 'text-green-700' : 'text-red-700'}`}>
                {product.in_stock ? content[language].inStock : content[language].outOfStock}
              </span>
              {product.in_stock && (product.stock_count || 0) <= 10 && (
                <span className="text-orange-600 text-sm">
                  ({product.stock_count || 0} {content[language].stockLeft})
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">{content[language].description}</h3>
              <p className="text-gray-600">
                {language === 'en' ? product.description : product.descriptionbn}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">{content[language].quantity}:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stock_count || 10, quantity + 1))}
                    disabled={quantity >= (product.stock_count || 10)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.in_stock}
                  className="flex-1 bg-pink-600 hover:bg-pink-700"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {content[language].addToCart}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={!product.in_stock}
                  variant="outline"
                  className="flex-1"
                >
                  {content[language].buyNow}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span className="text-sm">{content[language].shipping}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RefreshCw className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">{content[language].returns}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <span className="text-sm">{content[language].warranty}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
};

export default ProductDetail;
