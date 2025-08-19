'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { cn } from '@repo/ui/utils/cn';
import { ArrowLeft, Bell, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useAuthStore } from '@/shared/stores/auth';
import { useHeaderStore } from '@/shared/stores/headerStore';
import { useModalStore } from '@/shared/stores/modal';

import { headerStyles as styles } from '../styles/header.styles';

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenModal } = useModalStore();
  const { headerTitle } = useHeaderStore();

  const { userId } = useAuthStore();

  const noBackButtonRoutes = ['/main'];

  const noSearchButtonRoutes =
    pathname.startsWith('/hotdeal') ||
    pathname.endsWith('/auction-add') ||
    pathname.endsWith('/auction-edit');

  const showBackButton = !noBackButtonRoutes.includes(pathname);

  // 2. 조건부 스타일 클래스를 정의합니다.
  const headerBgClass = 'bg-[#fdfdfd]';
  const mainPageTextClass = 'text-[#484848]';

  return (
    <header className={cn(styles.header, headerBgClass)}>
      <div className="flex w-1/4 items-center">
        {showBackButton ? (
          <Button
            variants="ghost"
            size="thinMd"
            onClick={() => router.back()}
            className={styles.buttonArea.button}
          >
            <ArrowLeft className={cn(styles.buttonArea.icon, mainPageTextClass)} />
          </Button>
        ) : (
          !showBackButton && (
            <Link href="/main" className="flex items-center gap-1">
              <img src="/TA.webp" alt="Logo" className="h-8 w-auto" />
              {/* 3. '타임옥션' 텍스트에 조건부 클래스를 적용합니다. */}
              <div className={cn('whitespace-nowrap text-lg font-bold', mainPageTextClass)}>
                타임옥션
              </div>
            </Link>
          )
        )}
      </div>

      {headerTitle && (
        <div className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">
          {headerTitle}
        </div>
      )}

      <div className={styles.buttonArea.container}>
        {!noSearchButtonRoutes && (
          <Link href="/auction/auction-list">
            <Button variants="ghost" size="thinMd" className={styles.buttonArea.button}>
              {/* 5. 검색 아이콘에 조건부 클래스를 적용합니다. */}
              <Search className={cn(styles.buttonArea.icon, mainPageTextClass)} />
            </Button>
          </Link>
        )}

        {userId ? (
          <Button
            variants="ghost"
            size="thinMd"
            onClick={() => setOpenModal('notification')}
            className={styles.buttonArea.button}
          >
            {/* 4. 알림 아이콘에 조건부 클래스를 적용합니다. */}
            <Bell className={cn(styles.buttonArea.icon, mainPageTextClass)} />
          </Button>
        ) : (
          <Button variants="ghost" size="thinMd" onClick={() => router.replace('/login')}>
            로그인
          </Button>
        )}
      </div>
    </header>
  );
};
