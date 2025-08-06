// apps/web/app/api/auth/verify-otp/route.ts

import { createApiClient } from '@/app/server';
import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, token, type } = await request.json();

  if (!email || !token || !type) {
    return NextResponse.json({ error: '이메일, 토큰, 타입은 필수 항목입니다.' }, { status: 400 });
  }

  const response = new NextResponse();
  const supabase = createApiClient(request, response);

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: type as EmailOtpType,
  });

  if (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  // 성공적으로 검증되면, Supabase는 사용자의 `email_confirmed_at`을 업데이트하고
  // `response` 객체에 세션 쿠키를 설정합니다.
  // 이 쿠키가 포함된 헤더를 사용하여 최종 응답을 반환해야 합니다.
  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}
