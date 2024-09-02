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

export const Gallery: React.FC = ({}) => {
  const [loader, setLoader] = useState(false);
  const [slidesVideo, setSlidesVideo] = useState<SlideVideo[]>([]);
  const [slidesImage, setSlidesImage] = useState<SlideImage[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const { t } = useTranslation();

  const getVideo = async () => {
    try {
      const response = await gallery.get('/slides-video.json');

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

    // getSlidesImage()
    //   .then(setSlidesImage)
    //   .catch(error => {
    //     setErrorMessage(true);
    //     throw error;
    //   })
    //   .finally(() => setLoader(false));

    // gallery
    //   .get('/slides-video.json')
    //   .then(() => setSlidesVideo)
    //   .catch(error => {
    //     setErrorMessage(true);
    //     throw error;
    //   })
    //   .finally(() => setLoader(false));

    // getSlidesVideo()
    //   .then(setSlidesVideo)
    //   .catch(error => {
    //     setErrorMessage(true);
    //     throw error;
    //   })
    //   .finally(() => setLoader(false));
  }, []);

  return (
    <>
      {loader && !errorMessage && <Loader></Loader>}

      {!loader && !errorMessage && (
        <main className="gallery">
          <h2 className="gallery__title page-title">Our training</h2>

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
        </main>
      )}

      {errorMessage && <p>False</p>}
    </>
  );
};
