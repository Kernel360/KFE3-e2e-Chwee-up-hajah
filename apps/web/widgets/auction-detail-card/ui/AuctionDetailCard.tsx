'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { formatPriceNumber } from '@repo/ui/utils/formatNumberWithComma';
import { Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { useDeleteAuction } from '@/shared/api/client/auction/useDeleteAuction';
import { useAuthStore } from '@/shared/stores/auth';
import { useModalStore } from '@/shared/stores/modal';

import { AuctionTimer } from './AuctionTimer';
import { auctionDetailCardStyle } from './styles/AuctionDetailCard.styles';

interface AuctionDetailCardProps {
  currentBidCost: number;
  startBidCost: number;
  startTime: string;
  endTime: string;
  minBidCost: number;
  bidUnit: number;
  bidCost: number;
  status?: 'ready' | 'in_progress' | 'closed';
  auctionId: string;
  sellerId: string;
  isAuctionStarted: boolean;
  onMinus: () => void;
  onPlus: () => void;
  onClick: () => void;
}

export const AuctionDetailCard = ({
  currentBidCost,
  startBidCost,
  startTime,
  endTime,
  minBidCost,
  bidUnit,
  bidCost,
  status,
  auctionId,
  sellerId,
  isAuctionStarted,
  onMinus,
  onPlus,
  onClick,
}: AuctionDetailCardProps) => {
  const userId = useAuthStore().userId;
  const { setOpenModal } = useModalStore();
  const { mutate } = useDeleteAuction();
  const statusText =
    status === 'in_progress'
      ? '경매 종료까지'
      : status === 'closed'
        ? '경매 종료'
        : '경매 시작까지';

  const handleDelete = () => {
    if (isAuctionStarted) {
      toast.error('경매가 시작되어 삭제가 불가능합니다.');
      return;
    }
    if (userId !== sellerId) {
      return toast.error('본인 경매만 삭제할 수 있습니다.');
    }
    setOpenModal('confirm', {
      title: '경매 삭제',
      description: '정말 경매를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
      confirmText: '삭제',
      cancelText: '취소',
      onConfirm: () => {
        // 사용자가 '삭제'를 눌렀을 때 실행될 로직
        mutate(auctionId); // 경매 삭제 뮤테이션 호출
      },
    });
  };

  return (
    <section className={auctionDetailCardStyle.auctionDetailCardContainerStyle}>
      <div className={auctionDetailCardStyle.auctionDetailCardHeaderStyle}>
        <div className={auctionDetailCardStyle.auctionDetailCardBidPriceContainerStyle}>
          <div>
            <p className={auctionDetailCardStyle.auctionDetailCardCurrentPriceLabelStyle}>
              현재 입찰가
            </p>
            <p className={auctionDetailCardStyle.auctionDetailCardCurrentPriceStyle}>
              {formatPriceNumber(currentBidCost)}원
            </p>
            <p className={auctionDetailCardStyle.auctionDetailCardStartPriceStyle}>
              시작가 {formatPriceNumber(startBidCost)}원
            </p>
          </div>
          <div className={auctionDetailCardStyle.auctionDetailCardBidPriceRightContainerStyle}>
            <p>{statusText}</p>
            <p className={auctionDetailCardStyle.auctionDetailCardRemainingTimeStyle}>
              <AuctionTimer startTime={startTime} endTime={endTime} />
            </p>
            <p className="text-sm">최소입찰가 : {formatPriceNumber(minBidCost)}원</p>
          </div>
        </div>
        <div className={auctionDetailCardStyle.auctionDetailCardBidUnitStyle}>
          <p>입찰 단위 : {formatPriceNumber(bidUnit)}원</p>
        </div>
      </div>
      <div className={auctionDetailCardStyle.auctionDetailCardBidSectionStyle}>
        <div>
          <p>입찰가</p>
        </div>
        <div className={auctionDetailCardStyle.auctionDetailCardBidControlStyle}>
          <Button variants="outline" onClick={onMinus} disabled={status !== 'in_progress'}>
            <Minus size={20} />
          </Button>
          {formatPriceNumber(bidCost)}원
          <Button variants="outline" onClick={onPlus} disabled={status !== 'in_progress'}>
            <Plus size={20} />
          </Button>
        </div>
      </div>
      {userId === sellerId && !isAuctionStarted ? (
        <div className={auctionDetailCardStyle.auctionDetailCardEditButtonContainerStyle}>
          <Link href={`/auction/${auctionId}/auction-edit`} className="w-full">
            <Button variants="primary" size="thinLg">
              수정하기
            </Button>
          </Link>
          <Button variants="secondary" size="thinLg" onClick={handleDelete}>
            삭제하기
          </Button>
        </div>
      ) : (
        <Button
          variants="primary"
          size="thinLg"
          className={auctionDetailCardStyle.auctionDetailCardBidButtonStyle}
          onClick={onClick}
          disabled={status !== 'in_progress'}
        >
          입찰하기
        </Button>
      )}
    </section>
  );
};
