'use client';

import { useRouter } from 'next/navigation';

function SignupCompletePage() {
  const router = useRouter();

  setTimeout(() => {
    router.push('/login');
  }, 1000);

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center', padding: '40px 0' }}>
      <h2>환영합니다!</h2>
      <p className="mb-12 mt-4">가입 절차가 완료되었습니다.</p>
      <p>잠시 후 로그인 페이지로 이동합니다...</p>
    </div>
  );
}

export default SignupCompletePage;
