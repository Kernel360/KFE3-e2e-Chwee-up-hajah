import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { createClient } from '@/app/client';

export const useHotdealRealtime = (hotdealId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`hotdeal_detail_${hotdealId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'hot_deals',
          filter: `id=eq.${hotdealId}`,
        },
        () => {
          // hotdealDetail 쿼리 무효화하여 최신 데이터 다시 가져오기
          queryClient.invalidateQueries({ queryKey: ['hotdealDetail', hotdealId] });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [hotdealId, queryClient]);
};
