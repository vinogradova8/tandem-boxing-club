import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y, Pagination } from 'swiper/modules';
import './Slider.scss';
import 'swiper/css';
import { SlideVideo } from '../../types/SlideVideo';
import { SlideImage } from '../../types/SlideImage';
// import 'swiper/swiper-bundle.css';

// type Slide = {
//   image: string;
// };

type Props = {
  slidesVideo: SlideVideo[];
  slidesImage: SlideImage[];
};

export const Slider: React.FC<Props> = ({ slidesVideo, slidesImage }) => {
  // const [numberOfSlidersPerPage, setNumberOfSlidersPerPage] = useState(3);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 640) {
  //       setNumberOfSlidersPerPage(1);
  //     }

  //     if (window.innerWidth < 1200) {
  //       setNumberOfSlidersPerPage(3.5);
  //     }

  //     // if (window.innerWidth > 640) {
  //     //   setNumberOfSlidersPerPage(3);
  //     // }

  //     // if (window.innerWidth > 1200) {
  //     //   setNumberOfSlidersPerPage(5);
  //     // }
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 640) {
  //       setNumberOfSlidersPerPage(1);
  //     }

  //     if (window.innerWidth < 1200) {
  //       setNumberOfSlidersPerPage(3);
  //     }

  //     if (window.innerWidth > 640) {
  //       setNumberOfSlidersPerPage(3);
  //     }

  //     if (window.innerWidth > 1200) {
  //       setNumberOfSlidersPerPage(5);
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [numberOfSlidersPerPage]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth > 640) {
  //       setIsBurgerMenuOpen(false);
  //       app?.classList.remove('fixed');
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [app?.classList, isBurgerMenuOpen]);

  const video = document.querySelector('.video');
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
      <SwiperSlide>
        <img src="../../slider/slide-1.jpg" alt="slide1" />
      </SwiperSlide>

      {slidesImage.map(slide => (
        <SwiperSlide className="slide" key={slide.id}>
          <img src={slide.media} alt={`image-${slide.id}`} />
        </SwiperSlide>
      ))}

      {slidesVideo.map(slide => (
        <SwiperSlide className="slide" key={slide.id}>
          <div className="video video--shadow">
            <video
              onClick={() => {
                if (video) {
                  video.classList.toggle('video--shadow');
                }
              }}
              className="video__item"
              poster={slide.poster}
              controls
              src={slide.media}
            ></video>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
