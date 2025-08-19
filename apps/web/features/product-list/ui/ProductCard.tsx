import {
  BookText,
  Briefcase,
  Calendar,
  CookingPot,
  Dumbbell,
  LayoutGrid,
  MoreHorizontal,
  Shirt,
  Sparkles,
  Stamp,
  Tv,
  Watch,
  type LucideProps,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/widgets/product-section/types';

import { Styles } from './styles/product-card.styles';

// Category.tsx에서 사용했던 것과 동일한 아이콘 맵을 정의합니다.
const categoryIconMap: { [key: string]: React.ComponentType<LucideProps> } = {
  전체: LayoutGrid,
  '가전/전자': Tv,
  '도서/티켓': BookText,
  뷰티: Sparkles,
  '사무/잡화': Briefcase,
  스포츠용품: Dumbbell,
  악세서리: Watch,
  의류: Shirt,
  '생활/주방': CookingPot,
  기타: MoreHorizontal,
};

interface ProductCardProps {
  item: Product;
}

export const ProductCard = ({ item }: ProductCardProps) => {
  // item.category에 해당하는 아이콘 컴포넌트를 찾습니다. 없으면 '기타' 아이콘을 사용합니다.
  const IconComponent = categoryIconMap[item.category] || MoreHorizontal;
  return (
    <Link href={`/auction/${item.id}/auction-detail`}>
      <div className={Styles.container}>
        {/* 이미지 */}
        <div className={`${Styles.imageContainer} relative`}>
          {item.image && (
            <Image
              src={item.image}
              alt={item.title}
              width={234}
              height={120}
              className={Styles.image}
            />
          )}
          {/* 마감 남은 시간 */}
          <div className="absolute right-2 top-2 z-10 flex h-[22px] w-[50px] items-center justify-center rounded-[var(--radius-lg)] bg-[rgba(255,255,255,0.7)] text-xs text-[#656565]">
            {item.timeLeft}
          </div>
        </div>

        {/* 텍스트 정보 */}
        <div className={Styles.contentContainer}>
          {/* 제목 */}
          <p className={Styles.title}>{item.title}</p>
          {/* 현재가 */}
          <div>
            <span className={Styles.priceLabel}>현재가</span>
            <span className={Styles.price}>{item.price.toLocaleString()}원</span>
          </div>
          {/* endTIme, category, bid */}
          <div className="flex flex-col space-y-[3px] text-sm text-[#656565]">
            <div className="flex items-center">
              <Calendar size={12} className="mr-1" />
              {item.endTime}
            </div>

            <div className="flex items-center">
              <IconComponent size={12} className="mr-1" />
              {item.category}
            </div>

            <div className="flex items-center">
              <Stamp size={12} className="mr-1" />
              입찰{item.bidCount}회
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
