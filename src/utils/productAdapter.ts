
import { Database } from '@/integrations/supabase/types';
import { Product as LegacyProduct } from '@/data/products';

type DatabaseProduct = Database['public']['Tables']['products']['Row'] & {
  images: string[];
};

export const adaptProductForLegacyComponents = (dbProduct: DatabaseProduct): LegacyProduct => {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    namebn: dbProduct.namebn,
    price: dbProduct.price,
    originalPrice: dbProduct.original_price || undefined,
    image: dbProduct.image,
    images: dbProduct.images || [dbProduct.image],
    rating: dbProduct.rating || 4.5,
    reviews: dbProduct.reviews || 0,
    isNew: dbProduct.is_new || false,
    isSale: dbProduct.is_sale || false,
    category: dbProduct.category,
    description: dbProduct.description || '',
    descriptionbn: dbProduct.descriptionbn || '',
    inStock: dbProduct.in_stock !== false,
    stockCount: dbProduct.stock_count || 0,
  };
};
