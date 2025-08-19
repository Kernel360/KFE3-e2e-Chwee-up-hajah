import { useQuery } from '@tanstack/react-query';

import { AuctionItem } from '@/shared/types/auction';

export const useMyWonAuctions = (userId: string) => {
  return useQuery<AuctionItem[]>({
    queryKey: [userId, 'auctions', 'my-won'],
    queryFn: async () => {
      const res = await fetch(`/api/auction/my-won-auctions?userId=${userId}`);
      if (!res.ok) throw new Error('낙찰 내역을 불러오지 못했습니다.');
      return res.json();
    },
    enabled: !!userId,
  });
};
