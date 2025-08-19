'use client';

import { useEffect, useState } from 'react';

import { getTimeLeftString } from '@repo/ui/utils/getTimeLeftString';

interface AuctionTimerProps {
  startTime: string;
  endTime: string;
}

export const AuctionTimer = ({ startTime, endTime }: AuctionTimerProps) => {
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    setRemainingTime(getTimeLeftString({ endDate: endTime, startDate: startTime }));

    const interval = setInterval(() => {
      setRemainingTime(getTimeLeftString({ endDate: endTime, startDate: startTime }));
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, startTime]);

  return <>{remainingTime}</>;
};
