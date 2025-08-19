import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { postAuctionAdd } from '@/shared/api/server/auction/postAuctionAdd';
import { CreateAuctionPayload } from '@/shared/types/auction';

export function useCreateAuction() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: CreateAuctionPayload) => postAuctionAdd(payload),
    onSuccess: async (res: Response, variables) => {
      if (!res.ok) {
        let errJson;
        try {
          errJson = await res.json();
        } catch {
          errJson = {};
        }
        toast.error('서버에서 오류가 발생했습니다.');
        console.log(errJson.error || '');

        return;
      }
      // 1. 전체 경매 목록 쿼리도 무효화합니다.
      queryClient.invalidateQueries({ queryKey: ['auction-list'] });

      // 2. '내가 등록한 경매 목록' 관련 쿼리를 모두 무효화합니다.
      if (variables.seller_id) {
        queryClient.invalidateQueries({
          queryKey: [variables.seller_id, 'auctions', 'my-listings'],
        });
      }
      // 성공 시 루트 페이지로 이동
      router.replace('/main');
    },
    onError: (error) => {
      toast.error('전송 실패' + error.message);
    },
  });
}
