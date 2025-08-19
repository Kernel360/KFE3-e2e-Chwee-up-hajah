import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { sendUnsubscriptionToServer } from '@/shared/api/server/push/sendUnsubscriptionToServer';

export const usePushUnsubscription = () => {
  return useMutation({
    mutationFn: sendUnsubscriptionToServer,

    onSuccess: () => {
      toast.success('알림이 해제되었습니다');
      console.log('📬 푸시 구독 해제 서버 전송 성공');
    },

    onError: (error) => {
      toast.error('알림 해제에 실패했습니다. 잠시 후 다시 시도해주세요.');
      console.error('❌ 푸시 구독 해제 서버 전송 실패:', error);
    },
  });
};
