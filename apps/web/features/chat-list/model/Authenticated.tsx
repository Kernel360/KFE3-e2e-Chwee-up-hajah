'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/shared/stores/auth';

interface Props {
  children: (userId: string) => React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string; // redirect 경로 지정
}

export const Authenticated = ({ children, fallback, redirectTo }: Props) => {
  const userId = useAuthStore((state) => state.userId);
  const router = useRouter();

  useEffect(() => {
    if (!userId && redirectTo) {
      router.replace(redirectTo); // 로그인 페이지로 이동
    }
  }, [userId, redirectTo, router]);

  if (!userId) {
    return fallback ?? <div>Loading...</div>;
  }

  return <>{children(userId)}</>;
};
