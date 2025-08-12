// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Next.js 미들웨어 함수
 * - 요청마다 Supabase 세션 정보를 확인하여 인증/비인증 경로를 제어
 */
export async function middleware(request: NextRequest) {
  // 응답 객체 초기화
  const supabaseResponse = NextResponse.next();

  // Supabase 서버 클라이언트 생성(SSR 대응 + 쿠키 직접 제어)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // 요청의 모든 쿠키를 가져오는 함수
        getAll: () => request.cookies.getAll(),

        // 응답에 쿠키를 설정하는 함수
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  try {
    // 현재 세션 정보 가져오기
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    // 인증 관련 에러가 발생하면 토큰 삭제
    if (error) {
      console.warn('Middleware auth error:', error);
      supabaseResponse.cookies.delete('sb-access-token');
      supabaseResponse.cookies.delete('sb-refresh-token');
    }

    // 로그인, 회원가입 등 인증 페이지 경로 판별
    const isAuthRoute =
      request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/signup');

    // 대시보드, 프로필 등 보호된 페이지 경로 판별
    const isProtectedRoute =
      request.nextUrl.pathname.startsWith('/signup/complete') ||
      request.nextUrl.pathname.startsWith('/profile') ||
      request.nextUrl.pathname.startsWith('/admin') ||
      request.nextUrl.pathname.startsWith('/chat') ||
      request.nextUrl.pathname.startsWith('/auction/auction-add') ||
      request.nextUrl.pathname.endsWith('/auction-edit');

    // 보호된 페이지에 접근하려는데 로그인되어 있지 않으면 로그인 페이지로 리디렉션
    if (isProtectedRoute && !session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 로그인/회원가입 페이지에 접근하려는데 이미 로그인된 경우 대시보드로 리디렉션
    // 단, /signup/complete 페이지는 예외로 둠
    if (isAuthRoute && session && request.nextUrl.pathname !== '/signup/complete') {
      return NextResponse.redirect(new URL('/main', request.url));
    }

    // 관리자 페이지 접근 시 할 경우
    if (request.nextUrl.pathname.startsWith('/admin')) {
      // 세션이 있고, 이메일이 관리자가 아닌 경우
      if (session && session.user.email !== 'admin@admin.com') {
        // 메인 페이지로 리디렉션
        return NextResponse.redirect(new URL('/main', request.url));
      }
    }
  } catch (error) {
    // 예외 발생 시 (예: 네트워크, Supabase 오류 등)
    console.warn('Middleware session check failed:', error);

    // 보호된 페이지 요청이라면 로그인 페이지로 리디렉션
    if (request.nextUrl.pathname.startsWith('/main')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 기본 응답 반환 (인증 상태에 따라 처리 완료된 경우)
  return supabaseResponse;
}

/**
 * 미들웨어가 동작할 경로를 지정하는 설정
 * - 정적 파일, API, 이미지 등의 경로는 제외
 */
export const config = {
  matcher: ['/((?!api|_next/|favicon.ico).*)'],
};
