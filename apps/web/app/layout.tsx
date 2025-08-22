import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';

import ThirdPartyWrappers from '@/shared/thirdparty/ThirdPartyWrappers';

import { Providers } from './providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Time Auction',
  description: '중고 경매 앱',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Time Auction',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = (await cookies()).get('theme')?.value ?? 'light';
  const isDark = theme === 'dark';

  return (
    <html lang="ko" className={`${isDark ? 'dark' : ''} bg-[#F5F5F5]`}>
      <body className={`mx-auto max-w-[375px]`}>
        <Providers>
          <ThirdPartyWrappers>{children}</ThirdPartyWrappers>
        </Providers>
      </body>
    </html>
  );
}
