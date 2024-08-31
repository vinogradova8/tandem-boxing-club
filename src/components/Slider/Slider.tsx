import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y, Pagination } from 'swiper/modules';
import './Slider.scss';
import 'swiper/css';
import { SlideVideo } from '../../types/SlideVideo';
import { SlideImage } from '../../types/SlideImage';
import { VideoElement } from '../VideoElement';
// import { useClickOutside } from '../../hooks/useClickOutside.js';
// import 'swiper/swiper-bundle.css';

type Props = {
  slidesVideo: SlideVideo[];
  slidesImage: SlideImage[];
};

export const Slider: React.FC<Props> = ({ slidesVideo, slidesImage }) => {
  // const video = document.querySelector('.video');

  // const videoRef = useRef<HTMLVideoElement>(null);

  // useClickOutside(videoRef, () => {
  //   if (videoRef.current) {
  //     videoRef.current.pause();
  //   }
  // });
  // const videoRef = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Swiper
      modules={[Scrollbar, A11y, Pagination]}
      effect={'coverflow'}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      spaceBetween={50}
      touchRatio={3}
      grabCursor={true}
      slideToClickedSlide={true}
      height={100}
      breakpoints={{
        240: {
          slidesPerView: 1.5,
        },

        640: {
          slidesPerView: 3,
        },

        1200: {
          slidesPerView: 5,
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
