
import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';

interface ShopProps {
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Shop: React.FC<ShopProps> = ({ language, toggleLanguage }) => {
  const { products, categories } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const content = {
    en: {
      title: 'Shop Our Collection',
      subtitle: 'Discover handcrafted elegance for every occasion',
      searchPlaceholder: 'Search products...',
      categories: 'Categories',
      sortBy: 'Sort by',
      priceRange: 'Price Range',
      filters: 'Filters',
      noProducts: 'No products found matching your criteria.',
      showingResults: 'Showing {count} products',
      sortOptions: {
        name: 'Name',
        priceAsc: 'Price: Low to High',
        priceDesc: 'Price: High to Low',
        rating: 'Rating',
        newest: 'Newest First'
      }
    },
    bn: {
      title: 'আমাদের কালেকশন দেখুন',
      subtitle: 'প্রতিটি অনুষ্ঠানের জন্য হস্তনির্মিত কমনীয়তা আবিষ্কার করুন',
      searchPlaceholder: 'পণ্য খুঁজুন...',
      categories: 'ক্যাটেগরি',
      sortBy: 'সাজান',
      priceRange: 'দামের পরিসর',
      filters: 'ফিল্টার',
      noProducts: 'আপনার মানদণ্ড অনুযায়ী কোনো পণ্য পাওয়া যায়নি।',
      showingResults: '{count}টি পণ্য দেখানো হচ্ছে',
      sortOptions: {
        name: 'নাম',
        priceAsc: 'দাম: কম থেকে বেশি',
        priceDesc: 'দাম: বেশি থেকে কম',
        rating: 'রেটিং',
        newest: 'নতুন প্রথমে'
      }
    }
  };

  const categoryOptions = [
    { id: 'all', name: 'All Categories', namebn: 'সব ক্যাটেগরি' },
    { id: 'jewelry', name: '💍 Jewelry', namebn: '💍 গহনা' },
    { id: 'accessories', name: '👜 Accessories', namebn: '👜 অ্যাক্সেসরিজ' },
    { id: 'clothing', name: '👗 Clothing', namebn: '👗 পোশাক' }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.namebn.includes(searchTerm);
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} toggleLanguage={toggleLanguage} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 to-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            {content[language].title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder={content[language].searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={content[language].categories} />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {language === 'en' ? category.name : category.namebn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder={content[language].sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">{content[language].sortOptions.name}</SelectItem>
                  <SelectItem value="priceAsc">{content[language].sortOptions.priceAsc}</SelectItem>
                  <SelectItem value="priceDesc">{content[language].sortOptions.priceDesc}</SelectItem>
                  <SelectItem value="rating">{content[language].sortOptions.rating}</SelectItem>
                  <SelectItem value="newest">{content[language].sortOptions.newest}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory('all')}>
                {categoryOptions.find(c => c.id === selectedCategory)?.[language === 'en' ? 'name' : 'namebn']} ×
              </Badge>
            )}
            {searchTerm && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchTerm('')}>
                "{searchTerm}" ×
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              {content[language].showingResults.replace('{count}', filteredProducts.length.toString())}
            </p>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} language={language} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">{content[language].noProducts}</p>
            </div>
          )}
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default Shop;
