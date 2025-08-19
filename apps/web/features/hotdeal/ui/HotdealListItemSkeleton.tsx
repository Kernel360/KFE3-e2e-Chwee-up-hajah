import { Skeleton } from '@repo/ui/design-system/base-components/Skeleton/index';

import { AuctionListItemStyles } from '@/features/auction/ui/styles/AuctionListItem.styles';

export const HotdealListItemSkeleton = () => {
  return (
    <div className={AuctionListItemStyles.itemContainerStyle}>
      <div className={AuctionListItemStyles.itemImageContainerStyle}>
        <Skeleton variant="thumbnail" />
      </div>
      <div className={AuctionListItemStyles.itemContentsContainerStyle}>
        <Skeleton variant="title" />
        <Skeleton variant="text" />
        <div className={AuctionListItemStyles.itemSmallTextContainerStyle}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      </div>
    </div>
  );
};
