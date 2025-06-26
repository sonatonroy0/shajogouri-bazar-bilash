
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  language: 'en' | 'bn';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, language }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return language === 'en' ? `৳${price.toLocaleString()}` : `৳${price.toLocaleString('bn-BD')}`;
  };

  const content = {
    en: {
      addToCart: 'Add to Cart',
      quickView: 'Quick View',
      reviews: 'reviews',
      addedToCart: 'Added to Cart!',
      addedMessage: `${product.name} added to your cart`
    },
    bn: {
      addToCart: 'কার্টে যোগ করুন',
      quickView: 'দ্রুত দেখুন',
      reviews: 'রিভিউ',
      addedToCart: 'কার্টে যোগ করা হয়েছে!',
      addedMessage: `${product.namebn} আপনার কার্টে যোগ করা হয়েছে`
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast({
      title: content[language].addedToCart,
      description: content[language].addedMessage,
    });
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-50 hover:border-pink-200 cursor-pointer"
      onClick={handleProductClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-rose-100 animate-pulse" />
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1">
              {language === 'en' ? 'New' : 'নতুন'}
            </Badge>
          )}
          {product.isSale && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">
              {language === 'en' ? 'Sale' : 'অফার'}
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 ${
            isWishlisted ? 'text-red-500' : 'text-gray-600'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>

        {/* Hover Actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-white text-gray-900 hover:bg-gray-100 text-sm"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              {content[language].addToCart}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30"
              onClick={handleQuickView}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviews} {content[language].reviews})
          </span>
        </div>

        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
          {language === 'en' ? product.name : product.namebn}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <Badge variant="secondary" className="text-xs bg-pink-50 text-pink-700 hover:bg-pink-100">
          {language === 'en' ? 
            (product.category === 'jewelry' ? 'Jewelry' :
             product.category === 'accessories' ? 'Accessories' : 'Clothing') :
            (product.category === 'jewelry' ? 'গহনা' :
             product.category === 'accessories' ? 'অ্যাক্সেসরিজ' : 'পোশাক')
          }
        </Badge>
      </div>
    </div>
  );
};

export default ProductCard;
