// apps/web/shared/hooks/useFindId.ts

'use client';

import { AuthService } from '@/shared/api/server/authentication/authService';
import { useCallback, useState } from 'react';
import { z } from 'zod'; // Import zod for client-side validation

type CheckStatus = '' | 'checking' | 'success' | 'error';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return '알 수 없는 오류가 발생했습니다.';
};

// Zod schema for email format validation
const emailSchema = z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' });

export const useFindId = () => {
  const [email, setEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [status, setStatus] = useState<CheckStatus>('');
  const [message, setMessage] = useState('');

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setStatus('');
    setMessage('');
  }, []);

  const onCheckEmail = useCallback(async () => {
    // 1. Client-side email format validation
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      setMessage(validation.error.errors[0]!.message.toString());
      setStatus('error');
      return;
    }

    setIsChecking(true);
    setStatus('checking');
    setMessage('');

    try {
      await AuthService.checkEmailDuplicate(email);
      setStatus('error');
      setMessage('가입되지 않은 이메일입니다.');
    } catch (error: any) {
      setStatus('success');
      setMessage('가입된 이메일입니다.');
    } finally {
      setIsChecking(false);
    }
  }, [email]);

  return {
    email,
    isChecking,
    status,
    message,
    onChangeEmail,
    onCheckEmail,
  };
};
