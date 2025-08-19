'use client';

import { useFindId } from '@/shared/hooks/useFindId';
import { FindIdComponent } from '@/widgets/authentication/FindIdComponent';

export default function FindIdPage() {
  const findIdProps = useFindId();

  return (
    <div className="bg-background-light flex min-h-screen w-full flex-col items-center pt-20">
      <FindIdComponent {...findIdProps} />
    </div>
  );
}
