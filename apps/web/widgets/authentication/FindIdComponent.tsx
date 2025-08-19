// apps/web/widgets/authentication/FindIdComponent.tsx

'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import React from 'react';
import { LoginLink } from './LoginLink';

interface FindIdComponentProps {
  email: string;
  isChecking: boolean;
  status: '' | 'checking' | 'success' | 'error';
  message: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckEmail: () => Promise<void>;
}

export const FindIdComponent: React.FC<FindIdComponentProps> = ({
  email,
  isChecking,
  status,
  message,
  onChangeEmail,
  onCheckEmail,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCheckEmail();
  };

  const getMessageColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'checking':
        return 'text-gray-500'; // 또는 다른 색상
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="w-full max-w-sm">
      <h2 className="mb-8 text-center text-xl font-bold text-gray-800">아이디 찾기</h2>
      <p className="mb-6 text-center text-sm text-gray-600">
        가입 시 사용한 이메일 주소를 입력하시면
        <br />
        가입 여부를 확인해 드립니다.
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <Input
            label="이메일"
            type="email"
            value={email}
            onChange={onChangeEmail}
            required
            disabled={isChecking}
            placeholder="이메일을 입력하세요"
          />
        </div>

        {message && <p className={`mb-4 text-center text-sm ${getMessageColor()}`}>{message}</p>}

        <Button
          type="submit"
          className="w-full font-bold"
          size="lg"
          variants="primary"
          disabled={!email || isChecking}
        >
          {isChecking ? '확인 중...' : '이메일로 아이디 찾기'}
        </Button>
      </form>
      <LoginLink />
    </div>
  );
};
