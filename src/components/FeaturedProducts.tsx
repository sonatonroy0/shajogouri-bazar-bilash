
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface FeaturedProductsProps {
  language: 'en' | 'bn';
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ language }) => {
  const { addItem } = useCart();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('in_stock', true)
        .limit(8);
      
      if (error) throw error;
      return data || [];
    },
  });

  const content = {
    en: {
      title: 'Featured Products',
      subtitle: 'Discover our most popular handcrafted pieces',
      addToCart: 'Add to Cart',
      viewAll: 'View All Products',
      new: 'New',
      sale: 'Sale'
    },
    bn: {
      title: 'বিশেষ পণ্য',
      subtitle: 'আমাদের সবচেয়ে জনপ্রিয় হস্তনির্মিত পণ্যগুলি আবিষ্কার করুন',
      addToCart: 'কার্টে যোগ করুন',
      viewAll: 'সব পণ্য দেখুন',
      new: 'নতুন',
      sale: 'অফার'
    }
  };

  const formatPrice = (price: number) => {
    return language === 'en' ? `৳${price.toLocaleString()}` : `৳${price.toLocaleString('bn-BD')}`;
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      namebn: product.namebn,
      price: product.price,
      image: product.image
    });
    
    toast({
      title: language === 'en' ? 'Added to Cart!' : 'কার্টে যোগ করা হয়েছে!',
      description: language === 'en' 
        ? `${product.name} added to your cart`
        : `${product.namebn} আপনার কার্টে যোগ করা হয়েছে`,
    });
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              {content[language].title}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 aspect-square rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            {content[language].title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.is_new && (
                        <Badge className="absolute top-2 left-2 bg-green-500">
                          {content[language].new}
                        </Badge>
                      )}
                      {product.is_sale && (
                        <Badge className="absolute top-2 right-2 bg-red-500">
                          {content[language].sale}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 hover:text-pink-600 transition-colors">
                          {language === 'en' ? product.name : product.namebn}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center mb-2">
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
                        <span className="text-sm text-gray-500 ml-2">
                          ({product.reviews || 0})
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">
                            {formatPrice(product.price)}
                          </span>
                          {product.original_price && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.original_price)}
                            </span>
                          )}
                        </div>
                        
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="bg-pink-600 hover:bg-pink-700"
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link to="/shop">
                <Button size="lg" variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50">
                  {content[language].viewAll}
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {language === 'en' ? 'No products available.' : 'কোনো পণ্য উপলব্ধ নেই।'}
            </p>
            <p className="text-gray-400 mt-2">
              {language === 'en' ? 'Please check back later or contact admin.' : 'অনুগ্রহ করে পরে চেক করুন বা অ্যাডমিনের সাথে যোগাযোগ করুন।'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
