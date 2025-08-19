import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { sendSubscriptionToServer } from '@/shared/api/server/push/sendSubscriptionToServer';

export const usePushSubscription = () => {
  return useMutation({
    mutationFn: sendSubscriptionToServer,

    onSuccess: () => {
      toast.success('알림 구독이 완료되었습니다!');
    },

    onError: (error) => {
      toast.error('알림 구독에 실패했습니다. 잠시 후 다시 시도해주세요.');
      console.error('❌ 푸시 구독 정보 서버 전송 실패:', error);
    },
  });
};
