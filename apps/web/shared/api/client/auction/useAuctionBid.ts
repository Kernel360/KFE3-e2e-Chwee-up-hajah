import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { postAuctionBid } from '@/shared/api/server/auction/postAuctionBid';
import { AuctionBidParams, AuctionBidResponse } from '@/shared/types/auction';

export function useAuctionBid() {
  const queryClient = useQueryClient();
  return useMutation<AuctionBidResponse, Error, AuctionBidParams>({
    mutationFn: postAuctionBid,
    onSuccess: (data, variables) => {
      // 1. 경매 상세 정보 쿼리를 무효화합니다.
      queryClient.invalidateQueries({
        queryKey: ['auctionDetail', variables.auctionId],
      });
      // 2. 내가 참여한 경매 목록 쿼리를 무효화합니다.
      queryClient.invalidateQueries({
        queryKey: [variables.bidderId, 'auctions', 'my-participated'],
      });

      toast.success('입찰이 완료되었습니다.');
    },
    onError: (error) => {
      toast.error('입찰 실패: ' + error.message);
    },
  });
}
