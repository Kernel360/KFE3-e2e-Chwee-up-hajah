'use client';

import { use } from 'react';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import toast from 'react-hot-toast';

import { HotdealInfoCard } from '@/widgets/hotdeal-info-card';
import { HotdealInfoCardSkeleton } from '@/widgets/hotdeal-info-card/ui/HotdealInfoCardSkeleton';

import { useHotdealCountdownLogic } from '@/features/hotdeal/model/useHotdealCountdownLogic';
import { useHotdealRealtime } from '@/features/hotdeal/model/useHotdealRealtime';

import { useHotdealDetailQuery } from '@/shared/api/client/hotdeal/useHotdealDetail';
import { usePurchaseHotdeal } from '@/shared/api/client/hotdeal/usePurchaseHotdeal';
import { useUserProfileDataQuery } from '@/shared/api/client/profile/useUserProfileDataQuery';
import { useAuthStore } from '@/shared/stores/auth';

const GRADE_ORDER = ['흙', '돌멩이', '에벌레', '씨앗', '새싹', '나무', '숲'];

export default function Page({ params }: { params: Promise<{ hotdealId: string }> }) {
  const { hotdealId } = use(params);
  const { data, isLoading, isError, error } = useHotdealDetailQuery(hotdealId);
  const userId = useAuthStore((state) => state.userId);
  const { data: user } = useUserProfileDataQuery(userId ?? '');

  const purchaseMutation = usePurchaseHotdeal(hotdealId);
  const { status, targetTime, message } = useHotdealCountdownLogic({ data });
  useHotdealRealtime(hotdealId);

  const handlePurchase = () => {
    if (!userId) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    if (data && user) {
      const userGrade = user.grade;
      const minGrade = data.min_user_grade;

      if (!userGrade) {
        toast.error('사용자 등급 정보를 가져올 수 없습니다.');
        return;
      }

      const userGradeIndex = GRADE_ORDER.indexOf(userGrade);
      const minGradeIndex = GRADE_ORDER.indexOf(minGrade);

      if (userGradeIndex < minGradeIndex) {
        toast.error(`핫딜에 참여하려면 ${minGrade} 등급 이상이어야 합니다.`);
        return;
      }

      purchaseMutation.mutate({ hotdealId, userId, purchasePrice: data.current_price });
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-2">
        <HotdealInfoCardSkeleton />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        <p>오류: {error?.message}</p>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>핫딜 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <HotdealInfoCard data={data} status={status} targetTime={targetTime} message={message} />

      <Button
        variants="primary"
        className="sticky bottom-0"
        size="thinLg"
        onClick={handlePurchase}
        disabled={status !== 'ACTIVE' || purchaseMutation.isPending}
      >
        {purchaseMutation.isPending
          ? '처리 중...'
          : status === 'ACTIVE'
            ? '지금 구매'
            : status === 'UPCOMING'
              ? '구매 불가 (시작 전)'
              : '구매 불가 (종료)'}
      </Button>
    </div>
  );
}
