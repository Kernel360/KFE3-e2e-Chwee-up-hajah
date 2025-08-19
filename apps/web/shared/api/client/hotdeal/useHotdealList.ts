import { useQuery } from '@tanstack/react-query';

import { fetchHotdealList } from '@/shared/api/server/hotdeal/fetchHotdealList';
import { HotDeal } from '@/shared/types/db';

export const useHotdealList = () => {
  return useQuery<(HotDeal & { status: string })[]>({
    queryKey: ['hotDeals'],
    queryFn: fetchHotdealList,
  });
};
