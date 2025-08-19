import { useQuery } from '@tanstack/react-query';

import { fetchChatRoomHeader } from '@/shared/api/server/chat/fetchChatRoomHeader';

export const useChatRoomHeader = (userId: string) => {
  return useQuery({
    queryKey: ['chatrooms', userId],
    queryFn: () => fetchChatRoomHeader(userId),
    staleTime: 1000 * 60 * 1,
  });
};
