import React, { useEffect, useState } from 'react';
import './Gallery.scss';
import { Slider } from '../Slider/Slider';
// import slides from '../../api/slides.json';
import { Loader } from '../Loader';
import '../../i18n';
import { useTranslation } from 'react-i18next';
import { getSlides } from '../../api/fetchClient';
import { Slide } from '../../types/Slide';

export const Gallery: React.FC = ({}) => {
  const [loader, setLoader] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setLoader(true);

    getSlides()
      .then(setSlides)
      .catch(error => {
        setErrorMessage(true);
        throw error;
      })
      .finally(() => setLoader(false));

    setTimeout(() => {
      setLoader(false);
    }, 1000);
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
              <Slider slides={slides}></Slider>
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
