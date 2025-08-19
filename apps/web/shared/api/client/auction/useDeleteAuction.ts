import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { deleteAuction } from '@/shared/api/server/auction/deleteAuction';

export const useDeleteAuction = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (auctionId: string) => deleteAuction(auctionId),
    onSuccess: (variables) => {
      // 1. 이 경매의 상세 정보 쿼리를 무효화합니다.
      queryClient.invalidateQueries({ queryKey: ['auctionDetail', variables.auction_id] });

      // 2. 전체 경매 목록 쿼리도 무효화합니다.
      queryClient.invalidateQueries({ queryKey: ['auction-list'] });

      // 3. '내가 등록한 경매 목록' 쿼리도 무효화합니다.
      queryClient.invalidateQueries({
        queryKey: [variables.seller_id, 'auctions', 'my-listings'],
      });
      router.push('/main');
    },
    onError: (error) => {
      toast.error('삭제 실패' + error.message);
    },
  });
};
