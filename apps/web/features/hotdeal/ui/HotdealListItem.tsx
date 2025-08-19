'use client';

import Image from 'next/image';
import Link from 'next/link';

import { AuctionListItemStyles } from '@/features/auction/ui/styles/AuctionListItem.styles';

import { getGradeIcon } from '@/shared/lib/points/getGradeIcon';
import { HotDeal } from '@/shared/types/db';

import { useHotdealCountdownLogic } from '../model/useHotdealCountdownLogic';

import { HotdealCountdownDisplay } from './HotdealCountdownDisplay';

interface HotdealListItemProps {
  hotdeal: HotDeal & {
    status: string;
  };
}

export const HotdealListItem = ({ hotdeal }: HotdealListItemProps) => {
  const { status, targetTime, message } = useHotdealCountdownLogic({ data: hotdeal });

  return (
    <Link
      href={`/hotdeal/${hotdeal.id}/detail`}
      className={AuctionListItemStyles.itemContainerStyle}
    >
      <div className={AuctionListItemStyles.itemImageContainerStyle}>
        <Image
          src={hotdeal.image_url}
          alt={hotdeal.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="96px"
        />
      </div>
      <div className={AuctionListItemStyles.itemContentsContainerStyle}>
        <p className={AuctionListItemStyles.itemTitleStyle}>{hotdeal.name}</p>
        <p className={AuctionListItemStyles.itemCurrentPriceStyle}>
          {hotdeal.current_price.toLocaleString()}원
        </p>
        <div className={AuctionListItemStyles.itemSmallTextContainerStyle}>
          <span>
            최소 등급: {hotdeal.min_user_grade}
            {getGradeIcon(hotdeal.min_user_grade)}
          </span>
        </div>
        <div className={AuctionListItemStyles.itemSmallTextContainerStyle}>
          <HotdealCountdownDisplay status={status} targetTime={targetTime} message={message} />
        </div>
      </div>
    </Link>
  );
};
