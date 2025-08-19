import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import {
  AuctionListQueryKey,
  fetchAuctionList,
} from '@/shared/api/server/auction/fetchAuctionList';

export const useAuctionList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  const queryKey: AuctionListQueryKey = ['auction-list', search];

  return useInfiniteQuery({
    queryKey,
    queryFn: fetchAuctionList,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
};
