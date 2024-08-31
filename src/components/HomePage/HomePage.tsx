import React, { useContext, useEffect, useState } from 'react';
import './HomePage.scss';
import '../../i18n';
// import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { Loader } from '../Loader';
import { ModalWindow } from '../ModalWindow';
import { ItemsContext } from '../../ItemsContext';

export const HomePage: React.FC = ({}) => {
  const { t } = useTranslation();

  const [loader, setLoader] = useState(false);

  const { isModalWindowOpen, setIsModalWindowOpen } = useContext(ItemsContext);

  useEffect(() => {
    setLoader(true);

    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  const app = document.querySelector('.app');

  return (
    <>
      {isModalWindowOpen && <ModalWindow />}

      {loader ? (
        <Loader></Loader>
      ) : (
        <main className="homepage">
          <section className="homepage__main-section main-section">
            <div className="main-section__container">
              <div className="homepage__title-box">
                <h1 className="homepage__title title">Tandem</h1>
              </div>

              <div className="homepage__main-info">
                <p className="homepage__main-text">
                  <span>{t('Main text-1')}</span>
                  <br />
                  <span>{t('Main text-2')}</span>
                  <br />
                  <span>{t('Main text-3')}</span>
                </p>

                <button
                  onClick={() => {
                    setIsModalWindowOpen(true);
                    app?.classList.add('fixed');
                  }}
                  className="homepage__contact-button contact-button 
					homepage__contact-button--first"
                >
                  {t('Contact us')}
                </button>
              </div>
            </div>
          </section>

          <div className="homepage__info">
            <section className="homepage__info-item info-item">
              <div className="info-item__container">
                <div className="info-item__content info-item__content--1">
                  <h2 className="homepage__small-title">
                    {t('Section-1 title')}
                  </h2>

                  <p className="homepage__text">{t('Section-1 text')}</p>
                </div>

                <div className="decor decor--1"></div>
              </div>
            </section>

            <section className="homepage__info-item info-item">
              <div className="info-item__container">
                <div className="info-item__content info-item__content--2">
                  <h2 className="homepage__small-title">
                    {t('Section-2 title')}
                  </h2>

                  <p className="homepage__text">{t('Section-2 text')}</p>
                </div>
                <div className="decor decor--2"></div>
              </div>
            </section>

            <section className="homepage__info-item info-item">
              <div className="info-item__container">
                <div className="info-item__content info-item__content--3">
                  <h2 className="homepage__small-title">
                    {t('Section-3 title')}
                  </h2>

                  <p className="homepage__text">{t('Section-3 text')}</p>
                </div>
              </div>
            </section>

            <section className="homepage__info-item info-item">
              <div className="info-item__container">
                <div className="info-item__content info-item__content--4">
                  <h2 className="homepage__small-title">
                    {t('Section-4 title')}
                  </h2>

                  <p className="homepage__text">
                    <ul>
                      <li>{t('Section-4 text-1')}</li>
                      <li>{t('Section-4 text-2')}</li>
                      <li>{t('Section-4 text-3')}</li>
                      <li>{t('Section-4 text-4')}</li>
                      <li>{t('Section-4 text-5')}</li>
                      <li>{t('Section-4 text-6')}</li>
                      <li>{t('Section-4 text-7')}</li>
                      <li>{t('Section-4 text-8')}</li>
                      <li>{t('Section-4 text-9')}</li>
                      <li>{t('Section-4 text-10')}</li>
                    </ul>
                  </p>
                </div>
                <div className="decor decor--4"></div>
              </div>
            </section>
          </div>

          <div className="homepage__contact-us contact-us">
            <div className="contact-us__container">
              <button
                className="homepage__contact-button 
					contact-button homepage__contact-button--second"
              >
                {t('Contact us')}
              </button>
            </div>
          </div>
        </main>
      )}
    </>
  );
};
