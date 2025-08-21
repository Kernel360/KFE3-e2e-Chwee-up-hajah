'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';

import { Styles } from './styles/image-banner.styles';

interface EventBannerProps {
  height?: number | string;
  autoplay?: boolean;
  title?: string;
}

export const EventBanner = ({ title, autoplay = false, height = 318 }: EventBannerProps) => {
  const events = [
    { id: 1, imageUrl: '/hotdealItem1.webp', redirectUrl: '/hotdeal' },
    { id: 2, imageUrl: '/hotdealItem2.webp', redirectUrl: '/hotdeal' },
  ];

  const plugins = autoplay ? [Autoplay({ delay: 3000, stopOnInteraction: false })] : [];

  const [emblaRef] = useEmblaCarousel({ loop: true }, plugins);

  return (
    <>
      {title && <div className={Styles.title}>{title}</div>}
      <div className={Styles.emblaViewport} ref={emblaRef} style={{ height }}>
        <div className={Styles.emblaContainer} style={{ height }}>
          {events.map((event, index) => (
            <div className={Styles.emblaSlide} key={event.id}>
              <Link href={event.redirectUrl}>
                <div className={Styles.slideContainer}>
                  <Image
                    src={event.imageUrl}
                    alt={`banner-${event.id}`}
                    width={343}
                    height={318}
                    className={Styles.image}
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
