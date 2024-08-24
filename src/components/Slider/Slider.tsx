import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y, Pagination } from 'swiper/modules';
import './Slider.scss';
import 'swiper/css';
import { Slide } from '../../types/Slide';
// import 'swiper/swiper-bundle.css';

// type Slide = {
//   image: string;
// };

type Props = {
  slides: Slide[];
};

export const Slider: React.FC<Props> = ({ slides }) => {
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
      // navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      spaceBetween={50}
      // slidesPerView={numberOfSlidersPerPage}
      touchRatio={3}
      grabCursor={true}
      slideToClickedSlide={true}
      height={100}
      breakpoints={{
        // when window width is >= 640px
        240: {
          slidesPerView: 1.5,
        },

        640: {
          slidesPerView: 3,
        },
        // when window width is >= 768px
        1200: {
          slidesPerView: 5,
        },
      }}

      // autoHeight={true}

      // onSlideChange={() => console.log('slide change')}
      // onSwiper={swiper => console.log(swiper)}
    >
      <SwiperSlide>
        <img src="../../slider/slide-1.jpg" alt="slide1" />
      </SwiperSlide>
      <SwiperSlide className="slide">
        <div className="video video--shadow">
          <video
            // ref={videoRef}
            // onFocus={() => {
            //   if (isPlaying && videoRef) {
            //     videoRef?.current.pause();
            //     setIsPlaying(false);
            //   } else {
            //     videoRef?.current.play();
            //     setIsPlaying(true);
            //   }
            // }}
            // onClick={e => {
            //   e.target.classList.toggle('video--shadow');
            // }}
            className="video__item"
            poster="../../slider/slide-1.jpg"
            controls
            src="../../slider/slide-2.mp4"
          ></video>
        </div>
      </SwiperSlide>
      {slides.map(slide => (
        <SwiperSlide className="slide" key={slide.media}>
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
