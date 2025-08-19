'use client';

import { useState } from 'react';

import { Category } from '@repo/ui/design-system/base-components/Category/index';
import { useInView } from 'react-intersection-observer';

import { AuctionListings } from '@/widgets/auction-listings/ui/AuctionListings';
import { SearchInput } from '@/widgets/search';

import { AuctionListItemSkeleton } from '@/features/auction/ui/AuctionListItemSkeleton';

import { useAuctionList } from '@/shared/api/client/auction/useAuctionList';
import { mapAuctionItem } from '@/shared/lib/utils/mapAuctionItem';
import { categories } from '@/shared/mock/auction';

const Page = () => {
  const {
    data: auctionPages,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAuctionList();
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedBadge, setSelectedBadge] = useState<string>('all');
  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const allAuctions = auctionPages?.pages.flatMap((page) => page.data) || [];
  const mappedList = allAuctions.map(mapAuctionItem);

  // 기본적으로 종료된 경매(status === 'end')는 필터링하여 제외
  let filteredList = mappedList.filter((item) => item.status !== 'closed');

  if (!(selectedCategory === '전체')) {
    filteredList = filteredList.filter((item) => item.category === selectedCategory);
  }
  if (selectedBadge !== 'all') {
    filteredList = filteredList.filter((item) => item.badgeVariant === selectedBadge);
  }
  if (isError) {
    return <div className="my-8 text-red-500">경매 목록을 불러오지 못했습니다.</div>;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <SearchInput setCategory={setSelectedCategory} />
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={(cat) => setSelectedCategory(cat === '전체' ? '전체' : cat)}
      />
      <select
        name="listFilter"
        id="actionListFilter"
        className="text-neutral-70 my-2 ml-auto w-1/2 rounded-sm"
        value={selectedBadge}
        onChange={(e) => {
          setSelectedBadge(e.target.value);
        }}
      >
        <option value="all">전체 보기</option>
        <option value="best">인기</option>
        <option value="urgent">마감 임박</option>
      </select>
      <AuctionListings listData={filteredList} isLoading={isLoading} />
      <div ref={ref} style={{ height: '1px' }} />
      {isFetchingNextPage && <AuctionListItemSkeleton />}
    </main>
  );
};

export default Page;
