// callback/page.tsx
'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { supabase } from '@/shared/lib/supabase/supabase';

const AuthCallbackPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // 현재 세션 확인
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('세션 조회 실패:', sessionError.message);
          setError('인증에 실패했습니다.');
          setTimeout(() => router.replace('/login'), 2000);
          return;
        }

        if (session?.user) {
          console.log('인증 성공:', session);

          // 이메일 인증 후 프로필 생성이 필요한지 확인
          const { data: profile } = await supabase
            .from('user')
            .select('id')
            .eq('id', session.user.id)
            .single();

          if (!profile) {
            // 프로필이 없으면 회원가입 완료 페이지로
            router.replace('/signup/complete');
          } else {
            // 프로필이 있으면 대시보드로
            router.replace('/main');
          }
        } else {
          // 세션이 없으면 로그인 페이지로
          router.replace('/login');
        }
      } catch (err) {
        console.error('예상치 못한 오류:', err);
        setError('예상치 못한 오류가 발생했습니다.');
        setTimeout(() => router.replace('/login'), 2000);
      } finally {
        setLoading(false);
      }
    };

    // Auth state change 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);

      if (event === 'SIGNED_IN' && session) {
        // 프로필 확인 후 적절한 페이지로 리다이렉션
        const { data: profile } = await supabase
          .from('user')
          .select('id')
          .eq('id', session.user.id)
          .single();

        if (!profile) {
          router.replace('/signup/complete');
        } else {
          router.replace('/main');
        }
      } else if (event === 'SIGNED_OUT') {
        router.replace('/login');
      }
    });

    handleAuthCallback();

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[var(--color-primary-600)]"></div>
          <div>로그인 인증 중입니다...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-2 text-[var(--color-error-500)]">{error}</div>
          <div className="text-sm text-[var(--color-neutral-500)]">
            잠시 후 로그인 페이지로 이동합니다...
          </div>
        </div>
      </div>
    );
  }

  return null;
};
