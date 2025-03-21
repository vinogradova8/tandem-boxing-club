import React from 'react';
import './HomePage.scss';
import '../../i18n';
import { Trans, useTranslation } from 'react-i18next';
import { ContactButton } from '../ContactButton';

export const HomePage: React.FC = ({}) => {
  const { t } = useTranslation();

  return (
    <>
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
                className="homepage__contact-button contact-button 
					homepage__contact-button--first"
              >
                <a target="_blanc" href="https://wa.me/380509987274">
                  {t('Contact us')}
                </a>
              </button>
            </div>
          </div>
        </section>

        <div className="homepage__info">
          <section className="homepage__info-item info-item">
            <div className="info-item__container">
              <div className="info-item__content info-item__content--1">
                <h2 className="homepage__small-title small-title">
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
                <h2 className="homepage__small-title small-title">
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
                <h2 className="homepage__small-title small-title">
                  {t('Section-3 title')}
                </h2>

                <p className="homepage__text">{t('Section-3 text')}</p>
              </div>
            </div>
          </section>

          <section className="homepage__info-item info-item">
            <div className="info-item__container">
              <div className="info-item__content info-item__content--4">
                <h2 className="homepage__small-title small-title">
                  {t('Section-4 title')}
                </h2>

                <div className="homepage__text">
                  <Trans i18nKey="Section-4 text" />
                </div>
              </div>
              <div className="decor decor--3"></div>
            </div>
          </section>
        </div>

        <ContactButton />
      </main>
    </>
  );
};
