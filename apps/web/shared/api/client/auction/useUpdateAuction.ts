import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { updateAuction } from '@/shared/api/server/auction/updateAuction';

export const useUpdateAuction = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateAuction,

    onSuccess: (variables) => {
      //관련된 데이터를 다시 불러와 화면을 갱신하기 위해 관련 쿼리들을 '무효화(invalidate)' 시킵니다.

      // 1. 이 경매의 상세 정보 쿼리를 무효화합니다.
      queryClient.invalidateQueries({ queryKey: ['auctionDetail', variables.auction_id] });

      // 2. 전체 경매 목록 쿼리도 무효화합니다.
      queryClient.invalidateQueries({ queryKey: ['auction-list'] });

      // 3. '내가 등록한 경매 목록' 쿼리도 무효화합니다.
      queryClient.invalidateQueries({
        queryKey: [variables.seller_id, 'auctions', 'my-listings'],
      });
      router.replace(`/auction/${variables.auction_id}/auction-detail`);
    },

    onError: (error) => {
      console.log('업데이트 중 오류 발생:', error);
      toast.error(`업데이트 실패: ${error.message}`);
    },
  });
};
