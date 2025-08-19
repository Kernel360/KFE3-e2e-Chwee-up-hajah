import { useMemo } from 'react';

import { HotdealCountdownStatus } from '@/shared/types/auction';

interface CountdownParams {
  status: HotdealCountdownStatus;
  targetTime: Date;
}

export function useCountdown({ status, targetTime }: CountdownParams) {
  const message = useMemo(() => {
    switch (status) {
      case 'UPCOMING':
        return '핫딜 시작까지';
      case 'ACTIVE':
        return '핫딜 종료까지';
      case 'FINISHED':
        return '핫딜이 종료되었습니다.';
      default:
        return '';
    }
  }, [status]);

  return {
    status,
    targetTime,
    message,
  };
}
