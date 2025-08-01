'use client';

import { useEffect, useState } from 'react';

import { getTimeLeftString } from '@repo/ui/utils/getTimeLeftString';
import { useParams } from 'next/navigation';

import {
  AuctionDescriptionCard,
  AuctionDetailCard,
  AuctionSellerProfile,
} from '@/widgets/auction-detail-card';
import { ImageBanner } from '@/widgets/image-banner';

import { useAuctionBidState } from '@/features/auction-detail/model/useAuctionBidState';
import { AuctionOverlay } from '@/features/auction/ui/AuctionOverlay';

import { isAuctionStarted } from '@/shared/lib/utils/isAuctionStarted';
import { useAuthStore } from '@/shared/stores/auth';

const Page = () => {
  const params = useParams();
  const auctionId = params?.auctionId as string;
  const userId = useAuthStore().userId;
  const {
    data,
    isLoading,
    error,
    displayBids,
    displayCurrentPrice,
    bidCost,
    minusBidCost,
    plusBidCost,
    sendBid,
    minBidCostNumber,
  } = useAuctionBidState(auctionId);

  const [displayRemainingTime, setDisplayRemainingTime] = useState('');

  useEffect(() => {
    if (data) {
      const interval = setInterval(() => {
        setDisplayRemainingTime(
          getTimeLeftString({ endDate: data.end_time, startDate: data.start_time })
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  const { product, seller } = data;
  const imageFiles = data.images || [];
  const auctionName = product.name;
  const startBidCost = data.start_price;
  const bidUnit = data.bid_unit_price;
  const auctionStarted = isAuctionStarted(data.start_time);

  return (
    <main className="relative flex w-full flex-col items-center justify-center gap-2" role="main">
      <ImageBanner images={imageFiles} height={400} />
      <h1 className="text-neutral-70 mr-auto font-[var(--font-semibold)]">{auctionName}</h1>
      <AuctionDetailCard
        currentBidCost={displayCurrentPrice}
        startBidCost={startBidCost}
        remainingTime={displayRemainingTime}
        minBidCost={minBidCostNumber}
        bidUnit={bidUnit}
        bidCost={bidCost}
        status={data.status}
        auctionId={auctionId}
        sellerId={data.seller_id}
        isAuctionStarted={auctionStarted}
        onMinus={minusBidCost}
        onPlus={plusBidCost}
        onClick={sendBid}
      />
      <AuctionSellerProfile user={seller} />
      <AuctionDescriptionCard bids={displayBids} description={product.description} />
      {data.status === 'closed' &&
        (displayBids.length === 0 && data.seller_id === userId ? (
          <AuctionOverlay
            overlayText={`아쉽지만 유찰되었습니다.\n 경매 수정 후 다시 등록해보세요.`}
            isFailed={true}
            isCanClose={true}
            auctionId={auctionId}
          />
        ) : (
          <AuctionOverlay overlayText="경매가 종료되었습니다." isCanClose={true} />
        ))}
    </main>
  );
};
export default Page;
