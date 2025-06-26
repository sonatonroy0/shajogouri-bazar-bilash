
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  featuredProducts: Product[];
  categories: string[];
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Load initial products
  useEffect(() => {
    const savedProducts = localStorage.getItem('shajogouri-products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Error loading products:', error);
        // Load default products if there's an error
        loadDefaultProducts();
      }
    } else {
      loadDefaultProducts();
    }
  }, []);

  const loadDefaultProducts = () => {
    const defaultProducts: Product[] = [
      {
        id: '1',
        name: 'Elegant Pearl Necklace',
        namebn: 'মুক্তার মালা',
        price: 2500,
        originalPrice: 3000,
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
        images: [
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
          'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400'
        ],
        rating: 4.8,
        reviews: 24,
        isNew: true,
        isSale: true,
        category: 'jewelry',
        description: 'Beautiful handcrafted pearl necklace perfect for special occasions.',
        descriptionbn: 'বিশেষ অনুষ্ঠানের জন্য উপযুক্ত সুন্দর হস্তনির্মিত মুক্তার হার।',
        inStock: true,
        stockCount: 15
      },
      {
        id: '2',
        name: 'Gold Plated Earrings',
        namebn: 'সোনালী কানের দুল',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
        images: [
          'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
          'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400'
        ],
        rating: 4.6,
        reviews: 18,
        category: 'jewelry',
        description: 'Elegant gold plated earrings with intricate design.',
        descriptionbn: 'জটিল নকশা সহ মার্জিত স্বর্ণ প্রলেপযুক্ত কানের দুল।',
        inStock: true,
        stockCount: 8
      },
      {
        id: '3',
        name: 'Designer Handbag',
        namebn: 'ডিজাইনার হ্যান্ডব্যাগ',
        price: 3500,
        originalPrice: 4200,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'
        ],
        rating: 4.7,
        reviews: 15,
        isSale: true,
        category: 'accessories',
        description: 'Premium quality designer handbag made from genuine leather.',
        descriptionbn: 'আসল চামড়া দিয়ে তৈরি প্রিমিয়াম মানের ডিজাইনার হ্যান্ডব্যাগ।',
        inStock: true,
        stockCount: 5
      }
    ];
    setProducts(defaultProducts);
    localStorage.setItem('shajogouri-products', JSON.stringify(defaultProducts));
  };

  // Save products to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('shajogouri-products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      rating: 4.5,
      reviews: 0,
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProduct = (id: string) => {
    return products.find(p => p.id === id);
  };

  const featuredProducts = products.slice(0, 4);
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
      featuredProducts,
      categories
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
