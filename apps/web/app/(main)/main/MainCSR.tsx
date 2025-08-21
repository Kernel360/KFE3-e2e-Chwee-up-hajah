'use client';

import { useMemo, useState } from 'react';

import { Category } from '@repo/ui/design-system/base-components/Category/index';
import dynamic from 'next/dynamic';

import { LoadingSpinner } from '@/widgets/loading-spiner';
import { ProductSection } from '@/widgets/product-section';
import { SectionHeader } from '@/widgets/product-section-header';
import { Product } from '@/widgets/product-section/types';

import { categories } from '@/shared/mock/auction';

// Dynamic Imports - 성능 최적화
const EventPopup = dynamic(
  () => import('@/widgets/events/eventPopup').then((mod) => mod.EventPopup),
  { ssr: false, loading: () => null }
);

const DynamicProductSection = dynamic(
  () => import('@/widgets/product-section').then((mod) => mod.ProductSection),
  { loading: () => <LoadingSpinner /> }
);

// Types
interface ProductCategoryFilterProps {
  initialPopularProducts: Product[];
  initialLatestProducts: Product[];
}

// Main Component
export const MainCSR = ({
  initialPopularProducts,
  initialLatestProducts,
}: ProductCategoryFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  // 카테고리별 상품 필터링
  const filteredProducts = useMemo(() => {
    const filterByCategory = (products: Product[]) =>
      selectedCategory === '전체'
        ? products
        : (products?.filter((product) => product.category === selectedCategory) ?? []);

    return {
      popular: filterByCategory(initialPopularProducts),
      latest: filterByCategory(initialLatestProducts),
    };
  }, [selectedCategory, initialPopularProducts, initialLatestProducts]);

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      {/* 이벤트 팝업 */}
      <EventPopup />

      {/* 카테고리 필터 */}
      <Category
        categories={categories}
        className="mt-4"
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />

      {/* 인기 상품 섹션*/}
      <section>
        <SectionHeader
          title="현재 입찰자 많은 경매 TOP10🔥"
          subTitle="입찰자가 많은 순으로 확인해보세요!"
          className="mt-8"
        />
        <ProductSection products={filteredProducts.popular} isLoading={false} />
      </section>

      {/* 마감 임박 섹션*/}
      {filteredProducts.latest?.length > 0 && (
        <section>
          <SectionHeader title="마감이 임박한 경매 TOP10⏰" className="mt-8" />
          <DynamicProductSection products={filteredProducts.latest} isLoading={false} />
        </section>
      )}
    </>
  );
};
