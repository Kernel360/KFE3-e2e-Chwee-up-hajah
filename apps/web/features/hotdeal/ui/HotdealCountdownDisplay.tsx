'use client';

import { useEffect, useState } from 'react';

import { HotdealInfoCardStyles } from '@/widgets/hotdeal-info-card/ui/HotdealInfoCard.styles';

import { HotdealCountdownStatus } from '@/shared/types/auction';

interface HotdealCountdownDisplayProps {
  status: HotdealCountdownStatus;
  targetTime: Date;
  message: string;
}

export const HotdealCountdownDisplay = ({
  status,
  targetTime,
  message,
}: HotdealCountdownDisplayProps) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (status === 'FINISHED') {
      setRemainingTime(0);
      return;
    }

    const calculateRemainingTime = () => {
      const now = new Date().getTime();
      const distance = targetTime.getTime() - now;
      return Math.max(0, Math.floor(distance / 1000));
    };

    setRemainingTime(calculateRemainingTime());

    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [status, targetTime]);

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return (
    <div>
      <div>{message}</div>
      <div className={HotdealInfoCardStyles.countdownStyle}>
        {formattedHours !== '00'
          ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
          : `${formattedMinutes}:${formattedSeconds}`}
      </div>
    </div>
  );
};
