import { useMemo } from 'react';

import { HotdealCountdownStatus } from '@/shared/types/auction';
import { HotDeal } from '@/shared/types/db';

import { useCountdown } from './useCountdown';

interface UseHotdealCountdownLogicProps {
  data: HotDeal | undefined;
}

export const useHotdealCountdownLogic = ({ data }: UseHotdealCountdownLogicProps) => {
  const { status, targetTime } = useMemo(() => {
    if (!data) {
      return { status: 'FINISHED' as HotdealCountdownStatus, targetTime: new Date() };
    }

    const now = new Date();
    const startTime = new Date(data.start_time);
    const endTime = new Date(data.end_time);

    let currentStatus: HotdealCountdownStatus;
    let currentTargetTime: Date;

    if (now.getTime() < startTime.getTime()) {
      currentStatus = 'UPCOMING';
      currentTargetTime = startTime;
    } else if (now.getTime() >= startTime.getTime() && now.getTime() < endTime.getTime()) {
      currentStatus = 'ACTIVE';
      if (data.current_price > data.min_price) {
        const lastPriceDropBaseTime = data.last_price_drop_at
          ? new Date(data.last_price_drop_at)
          : startTime;

        let nextPriceDropTime = new Date(
          lastPriceDropBaseTime.getTime() + data.price_drop_interval_minutes * 60 * 1000
        );

        if (nextPriceDropTime.getTime() > endTime.getTime()) {
          nextPriceDropTime = endTime;
        }
        currentTargetTime = nextPriceDropTime;
      } else {
        currentTargetTime = endTime;
      }
    } else {
      currentStatus = 'FINISHED';
      currentTargetTime = endTime;
    }

    return { status: currentStatus, targetTime: currentTargetTime };
  }, [data]);
  const { message } = useCountdown({ status, targetTime });

  return { status, targetTime, message };
};
