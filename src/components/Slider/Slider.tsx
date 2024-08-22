import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/swiper-bundle.css';

type Slide = {
  image: string;
};

type Props = {
  slides: Slide[];
};

export const Slider: React.FC<Props> = ({ slides }) => {
  return (
    <Swiper
      modules={[Scrollbar, A11y]}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      spaceBetween={50}
      slidesPerView={4}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={swiper => console.log(swiper)}
    >
      {/* <SwiperSlide>
        <p>slide1</p>
        <img src="../../slider/slide-1.jpg" alt="slide1" />
      </SwiperSlide>
      <SwiperSlide>
        <p>slide2</p>
        <video controls src="../../slider/slide-2.mp4"></video>
      </SwiperSlide>
      <SwiperSlide>
        <p>slide2</p>
        <video controls src="../../slider/slide-3.mp4"></video>
      </SwiperSlide>
      <SwiperSlide>
        <p>slide2</p>
        <video controls src="../../slider/slide-4.mp4"></video>
      </SwiperSlide>
      <SwiperSlide>
        <p>slide2</p>
        <video controls src="../../slider/slide-5.mp4"></video>
      </SwiperSlide> */}
      <SwiperSlide>
        <p>slide1</p>
        <img src="../../slider/slide-1.jpg" alt="slide1" />
      </SwiperSlide>
      {slides.map(slide => (
        <SwiperSlide key={slide.image}>
          <video controls src={slide.image}></video>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
