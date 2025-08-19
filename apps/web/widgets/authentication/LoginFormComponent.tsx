// LoginFormComponent.tsx

'use client';

import { LoginFormComponentProps } from '@/shared/types/auth/login/index';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import Link from 'next/link';
import React from 'react';

export const LoginFormComponent: React.FC<LoginFormComponentProps> = ({
  email,
  password,
  error,
  isPending,
  onSubmit,
  onChangeEmail,
  onChangePassword,
}) => {
  return (
    <div className="w-full max-w-sm">
      <h2 className="mb-8 text-center text-xl font-bold text-gray-800">이메일/아이디 로그인</h2>

      <form onSubmit={onSubmit} noValidate>
        <div className="mb-6">
          {' '}
          {/* 간격 조정 */}
          <Input
            label="이메일/아이디"
            type="email"
            value={email}
            onChange={onChangeEmail}
            required
            disabled={isPending}
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="mb-8">
          <Input
            label="비밀번호"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
            disabled={isPending}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        {error && <p className="mb-4 text-center text-sm text-red-600">{error}</p>}

        <div className="mb-8 flex justify-center space-x-4 text-sm text-gray-500">
          {' '}
          {/* 폰트 크기 조정 */}
          <Link href="/find-id" className="hover:text-primary-900 transition-colors">
            계정 찾기
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/password-reset" className="hover:text-primary-900 transition-colors">
            비밀번호 찾기
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/signup" className="hover:text-primary-900 transition-colors">
            회원가입
          </Link>
        </div>

        <Button
          type="submit"
          className="bg-primary-500 hover:bg-primary-600 focus:ring-primary-500 w-full rounded-lg font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          size="lg"
          variants="primary"
          disabled={!email || !password || isPending}
        >
          {isPending ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </div>
  );
};
