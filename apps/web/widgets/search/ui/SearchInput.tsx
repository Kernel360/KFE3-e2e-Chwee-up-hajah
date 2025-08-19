'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { searchInputStyles } from '../styles/searchInput.styles';

interface Props {
  setCategory: Dispatch<SetStateAction<string>>;
}

export const SearchInput = ({ setCategory }: Props) => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/auction/auction-list?search=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <>
      <form className={searchInputStyles.form} onSubmit={handleSearch}>
        <div className={searchInputStyles.inputWrapper}>
          <Input
            type="text"
            placeholder="검색어를 입력하세요..."
            aria-label="검색어를 입력하세요"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            size="sm"
            variants="ghost"
            type="button"
            className={`${searchInputStyles.button.base}`}
            onClick={() => {
              setValue('');
              setCategory('all');
              router.push('/auction/auction-list');
            }}
          >
            <X size={20} className={searchInputStyles.icon} />
          </Button>
        </div>
      </form>
    </>
  );
};
