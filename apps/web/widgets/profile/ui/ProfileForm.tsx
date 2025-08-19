'use client';

import { useEffect, useState } from 'react';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { ZodFormattedError } from 'zod';

import { handleInputChange, handleSubmit } from '@/features/profile/model/handlers';
import { ProfileAvatarUpload } from '@/features/profile/ui/ProfileAvatarUpload';

import { useUpdateProfile } from '@/shared/api/client/profile/useUpdateProfile';
import { getCacheBustingUrl } from '@/shared/lib/utils/avatar';
import { ProfileFormType, UserProfileType } from '@/shared/types/profile';

export const ProfileForm = ({ user }: { user: UserProfileType }) => {
  // 1. 초기 상태는 user.avatar의 순수한 URL로 설정.
  // 이 값이 서버에서 렌더링되어 HTML에 포함.
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [enteredValues, setEnteredValues] = useState<ProfileFormType>({
    username: user.username,
    address: user.address,
    addressDetail: user['address_detail'],
  });

  const [fieldErrors, setFieldErrors] = useState<ZodFormattedError<ProfileFormType> | undefined>(
    undefined
  );

  // 2. useEffect를 사용하여 컴포넌트가 클라이언트에서 마운트(하이드레이션)된 후에
  // 캐시 버스터가 적용된 URL로 상태를 업데이트
  useEffect(() => {
    // selectedFile이 없고, user.avatar가 존재할 때만 캐시 버스팅을 적용
    // 이는 사용자가 새 파일을 선택하기 전의 기본 아바타에만 해당

    if (!selectedFile && user.avatar) {
      setAvatarPreviewUrl(getCacheBustingUrl(user.avatar));
    }

    // user.avatar가 변경될 때 (예: 프로필 업데이트 후 데이터 리프레시), 이 effect를 다시 실행
  }, [selectedFile, user.avatar]);

  const handleFileSelect = (file: File | undefined) => {
    setSelectedFile(file);

    if (file) {
      // 파일이 선택되면 미리보기 URL을 생성하고 ProfileForm의 상태를 업데이트합니다.
      setAvatarPreviewUrl(URL.createObjectURL(file));
    }
  };

  const updateProfileMutation = useUpdateProfile();

  return (
    <main className="text-neutral-70" role="main">
      <h1 className="mb-3 text-base font-semibold">내 정보 수정</h1>
      <ProfileAvatarUpload
        username={user.username}
        previewAvatarUrl={avatarPreviewUrl}
        onFileSelect={handleFileSelect}
        originalAvatarUrl={user.avatar}
      />
      <form
        onSubmit={(e) =>
          handleSubmit(e, user, enteredValues, selectedFile, setFieldErrors, updateProfileMutation)
        }
      >
        <section className="mt-4 flex w-full max-w-md flex-col gap-4">
          <div className="flex flex-col">
            <Input
              label="닉네임"
              placeholder={user.username}
              value={enteredValues.username}
              onChange={(event) =>
                handleInputChange('username', event.target.value, setEnteredValues)
              }
            />
            {fieldErrors?.username && (
              <div className="my-1 ml-1 text-xs text-red-500">
                {fieldErrors.username._errors[0]}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <Input label="이메일" value={user.email} disabled />
          </div>
          <div className="flex flex-col">
            <Input
              label="주소"
              value={enteredValues.address}
              onChange={(event) =>
                handleInputChange('address', event.target.value, setEnteredValues)
              }
            />
            {fieldErrors?.address && (
              <div className="my-1 ml-1 text-xs text-red-500">{fieldErrors.address._errors[0]}</div>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              label="상세주소"
              value={enteredValues.addressDetail}
              onChange={(event) =>
                handleInputChange('addressDetail', event.target.value, setEnteredValues)
              }
            />
          </div>
          <Button variants="primary" type="submit" disabled={updateProfileMutation.isPending}>
            {updateProfileMutation.isPending ? '제출 중...' : '정보 변경'}
          </Button>
        </section>
      </form>
    </main>
  );
};
