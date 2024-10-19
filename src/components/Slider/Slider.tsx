import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y, Pagination } from 'swiper/modules';
import './Slider.scss';
import 'swiper/css';
import { SlideVideo } from '../../types/SlideVideo';
import { SlideImage } from '../../types/SlideImage';
import { VideoElement } from '../VideoElement';

type Props = {
  slidesVideo: SlideVideo[];
  slidesImage: SlideImage[];
};

export const Slider: React.FC<Props> = ({ slidesVideo, slidesImage }) => {
  return (
    <Swiper
      modules={[Scrollbar, A11y, Pagination]}
      effect={'coverflow'}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      touchRatio={3}
      grabCursor={true}
      slideToClickedSlide={true}
      height={100}
      breakpoints={{
        240: {
          spaceBetween: 20,
          slidesPerView: 1.5,
        },

        450: {
          slidesPerView: 2.5,
        },

        640: {
          spaceBetween: 55,
          slidesPerView: 4,
        },

        800: {
          spaceBetween: 55,
          slidesPerView: 5,
        },

        1200: {
          spaceBetween: 55,
          slidesPerView: 6.5,
        },
      }}
    >
      {slidesImage.map(slide => (
        <SwiperSlide className="slide" key={slide.id}>
          <div className="image image--shadow">
            <img
              className="image__item"
              src={slide.media}
              alt={`image-${slide.id}`}
            />
          </div>
        </SwiperSlide>
      ))}

      {slidesVideo.map(slide => (
        <SwiperSlide className="slide" key={slide.id}>
          <VideoElement poster={slide.poster} media={slide.media} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
