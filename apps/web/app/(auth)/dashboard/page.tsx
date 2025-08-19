'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/shared/stores/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || '로그아웃 실패');
        return;
      }

      const state = useAuthStore.getState();
      state.logout();

      router.replace('/'); // 로그아웃 후 메인 페이지
    } catch (err) {
      alert('로그아웃 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto mt-20 max-w-xl px-4">
      <h1 className="mb-4 text-2xl font-bold">대시보드</h1>
      <p className="mb-6">로그인된 사용자만 접근 가능한 페이지입니다.</p>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="rounded bg-[var(--color-error-500)] px-4 py-2 text-[var(--text-inverse)] hover:bg-[var(--color-error-600)] disabled:opacity-50"
      >
        {loading ? '로그아웃 중...' : '로그아웃'}
      </button>
    </main>
  );
}
