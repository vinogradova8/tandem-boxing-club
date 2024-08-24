import React, { useEffect, useState } from 'react';
import './Gallery.scss';
import { Slider } from '../Slider/Slider';
// import slides from '../../api/slides.json';
import { Loader } from '../Loader';
import '../../i18n';
import { useTranslation } from 'react-i18next';
import { getSlidesImage, getSlidesVideo } from '../../api/fetchClient';
import { SlideVideo } from '../../types/SlideVideo';
import { SlideImage } from '../../types/SlideImage';

export const Gallery: React.FC = ({}) => {
  const [loader, setLoader] = useState(false);
  const [slidesVideo, setSlidesVideo] = useState<SlideVideo[]>([]);
  const [slidesImage, setSlidesImage] = useState<SlideImage[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setLoader(true);

    getSlidesImage()
      .then(setSlidesImage)
      .catch(error => {
        setErrorMessage(true);
        throw error;
      });

    getSlidesVideo()
      .then(setSlidesVideo)
      .catch(error => {
        setErrorMessage(true);
        throw error;
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      {loader ? (
        <Loader></Loader>
      ) : (
        <section className="gallery">
          <h2 className="gallery__title">Our training</h2>

          <div className="slider">
            <div className="slider__container">
              <Slider
                slidesVideo={slidesVideo}
                slidesImage={slidesImage}
              ></Slider>
            </div>
          </div>

          <div className="gallery__container">
            <button className="gallery__contact-button contact-button">
              {t('Contact us')}
            </button>
          </div>
        </section>
      )}

      {!loader && errorMessage && <p>Something went wrong</p>}
    </>
  );
};
