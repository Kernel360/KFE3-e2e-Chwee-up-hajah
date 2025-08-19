import { useQuery } from '@tanstack/react-query';

import { fetchAuctionDetail } from '@/shared/api/server/auction/fetchAuctionDetail';
import { AuctionDetail } from '@/shared/types/db';

export function useAuctionDetail(auctionId: string | null) {
  return useQuery<AuctionDetail, Error>({
    queryKey: ['auctionDetail', auctionId],
    queryFn: () => fetchAuctionDetail(auctionId!), // auctionId가 null이 아님을 단언
    enabled: !!auctionId, // auctionId가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });
}
