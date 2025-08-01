'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import Link from 'next/link';
import { Autoplay } from 'swiper/modules';

const HeroSec = () => {
  return (
    <section className="w-full">
      {/* Image Slider */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        className="w-full h-[600px]"
      >
        <SwiperSlide>
          <img
            src='e1_banner.jpeg'
            alt="Slider 1"
            className="w-full h-[600px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='e2_banner.jpeg'
            alt="Slider 2"
            className="w-full h-[600px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='e3_banner.jpeg'
            alt="Slider 3"
            className="w-full h-[600px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='e4_banner.jpeg'
            alt="Slider 4"
            className="w-full h-[600px] object-cover"
          />
        </SwiperSlide>
      </Swiper>

      {/* Hero Content */}
      <div className="bg-yellow-grad text-off-white text-center py-12 px-4">
        <h2 className="text-4xl md:text-5xl font-head mb-4 text-deep-plum">
           Style Smart , Shop Smart
        </h2>
        <p className="text-lg md:text-xl mb-6 text-black">
          Discover trendy pre-loved fashion at amazing prices!
        </p>
        <Link href="/shop" className="inline-block">
        <button className="btn-primary">Shop Now</button>
        </Link>
        <div className="mt-4">
          <span className="badge">New Arrivals</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSec;
