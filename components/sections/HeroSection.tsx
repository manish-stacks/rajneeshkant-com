"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const banners = [
  {
    image: "/images/slider/slider-1.png",
  },
  {
    image: "/images/slider/slider-2.png",
  },
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
            <div className="relative w-full h-[200px] sm:h-[300px] md:h-[420px] lg:h-[520px] xl:h-[600px]">
              <Image
                src={banner.image}
                alt={`Banner ${index + 1}`}
                fill
                priority
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}