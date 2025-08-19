import { useQuery } from '@tanstack/react-query';

import { fetchNotificationList } from '@/shared/api/server/notification/fetchNotificationList';

export const useNotificationList = (isModalOpen: boolean) => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotificationList,
    enabled: isModalOpen,
  });
};
