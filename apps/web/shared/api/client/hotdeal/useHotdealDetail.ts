import { useQuery } from '@tanstack/react-query';

import { fetchHotdealDetail } from '@/shared/api/server/hotdeal/fetchHotdealDetail';
import { HotDeal } from '@/shared/types/db';

export function useHotdealDetailQuery(hotdealId: string) {
  return useQuery<HotDeal, Error>({
    queryKey: ['hotdealDetail', hotdealId],
    queryFn: () => fetchHotdealDetail(hotdealId),
    enabled: !!hotdealId,
    staleTime: 1000 * 60 * 5,
  });
}
