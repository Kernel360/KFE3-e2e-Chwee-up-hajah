import { ProductCardSkeleton } from '@/features/product-list/ui/ProductCardSkeleton';
import { ProductList } from '@/features/product-list/ui/ProductList';

import type { Product } from '../types';

interface ProductSectionProps {
  products?: Product[];
  isLoading: boolean;
}

export const ProductSection = ({ products, isLoading }: ProductSectionProps) => {
  if (isLoading || !products) {
    return <ProductCardSkeleton />;
  }

  return <ProductList items={products} />;
};
