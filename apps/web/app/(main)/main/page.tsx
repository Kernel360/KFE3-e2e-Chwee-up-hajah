import { BannerBackground } from '@/widgets/banner-bg/ui/BannerBackGround';
import { EventBanner } from '@/widgets/image-banner';

import { getProducts } from '@/shared/api/server/product/getProducts';

import { MainCSR } from './MainCSR';

const MainHome = async () => {
  // 서버에서 데이터 페칭
  const [popularProducts, latestProducts] = await Promise.all([
    getProducts('popular', 10),
    getProducts('endingSoon'),
  ]);

  return (
    <div>
      <BannerBackground />

      <EventBanner title="지금 주목 해볼 핫딜!" height={318} autoplay={true} />

      {/* 모든 클라이언트 로직을 하나의 컴포넌트로 통합 */}
      <MainCSR initialPopularProducts={popularProducts} initialLatestProducts={latestProducts} />
    </div>
  );
};

export default MainHome;
