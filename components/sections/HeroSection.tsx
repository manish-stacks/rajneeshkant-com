"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const banners = [
  { image: "/images/slider/slider-1.png" },
  { image: "/images/slider/slider-2.png" },
];

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        slidesPerView={1}
        loop
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="w-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            {/* aspect-ratio approach — mobile pe 16:7, desktop pe wider */}
            <div className="relative w-full aspect-[16/5] sm:aspect-[16/6] md:aspect-[16/5] lg:aspect-[16/4.5]">
              <Image
                src={banner.image}
                alt={`Banner ${index + 1}`}
                fill
                priority={index === 0}   
                sizes="100vw"             
                className="object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}