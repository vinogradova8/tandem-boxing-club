import React, { useEffect, useState } from 'react';
import './Gallery.scss';
import { Slider } from '../Slider/Slider';
// import slides from '../../api/slides.json';
import { Loader } from '../Loader';
import '../../i18n';
import { useTranslation } from 'react-i18next';
// import { getSlidesImage, getSlidesVideo } from '../../api/fetchClient';
import { SlideVideo } from '../../types/SlideVideo';
import { SlideImage } from '../../types/SlideImage';
import { gallery } from '../../api/axios';
import { ContactButton } from '../ContactButton';
import { NotFoundPage } from '../NotFoundPage';

export const Gallery: React.FC = ({}) => {
  const [loader, setLoader] = useState(false);
  const [slidesVideo, setSlidesVideo] = useState<SlideVideo[]>([]);
  const [slidesImage, setSlidesImage] = useState<SlideImage[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const { t } = useTranslation();

  const getVideo = async () => {
    try {
      const response = await gallery.get('/slides-video.json', {
        timeout: 5000,
      });

      setSlidesVideo(response.data);
    } catch {
      setErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  const getImages = async () => {
    try {
      const response = await gallery.get('/slides-image.json');

      setSlidesImage(response.data);
    } catch {
      setErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    getVideo();
    getImages();
  }, []);

  return (
    <>
      {loader && !errorMessage && <Loader></Loader>}
      {errorMessage && <NotFoundPage message={t('Something went wrong')} />}

      {!loader && !errorMessage && (
        <main className="gallery">
          <h2 className="gallery__title big-title">{t('Our Training')}</h2>

          <div className="slider">
            <div className="slider__container">
              <Slider
                slidesVideo={slidesVideo}
                slidesImage={slidesImage}
              ></Slider>
            </div>
          </div>

          <ContactButton />
        </main>
      )}
    </>
  );
};
