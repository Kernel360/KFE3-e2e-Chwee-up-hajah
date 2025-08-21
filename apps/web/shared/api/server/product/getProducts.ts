import { Product } from '@/widgets/product-section/types';

import { formatToYMD, getTimeRemainingUTC } from '@/shared/lib/utils/time';
import { RawProduct } from '@/shared/types/product';

import { fetchProductList, SortOption } from './fetchProductList';

export async function getProducts(sort: SortOption, limit?: number): Promise<Product[]> {
  const raw: RawProduct[] = await fetchProductList(sort, limit);
  return raw.map((item) => ({
    id: item.auction_id,
    title: item.product_name,
    category: item.category_name,
    bidCount: item.bid_count,
    endTime: formatToYMD(item.end_time),
    price: item.current_price,
    image: item.thumbnail,
    timeLeft:
      getTimeRemainingUTC(item.end_time)?.total > 0
        ? `${getTimeRemainingUTC(item.end_time).hours} : ${
            getTimeRemainingUTC(item.end_time).minutes
          }`
        : '경매 종료',
  }));
}
