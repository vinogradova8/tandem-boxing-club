import React from 'react';
import './HomePage.scss';
import '../../i18n';
// import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = ({}) => {
  const { t } = useTranslation();

  return (
    <>
      <main className="homepage">
        <div className="homepage__container">
          <div className="homepage__title-box">
            <h1 className="homepage__title title">Tandem</h1>
          </div>

          <div className="homepage__main-info">
            <p className="homepage__main-text">
              {t('Main text')}
              {/* We are coaches who have trained <span>boxing</span> champions of
              Austria, boxing champions of Ukraine, <span>winners</span> and
              prize-winners of international tournaments and European
              championships. */}
            </p>

            <button
              className="homepage__contact-button contact-button 
					homepage__contact-button--first"
            >
              Contact us
            </button>
          </div>

          <div className="homepage__info">
            <section className="homepage__info-item">
              <h2 className="homepage__small-title">{t('Section-1 title')}</h2>

              <p className="homepage__text">{t('Section-1 text')}</p>
            </section>

            <section className="homepage__info-item">
              <h2 className="homepage__small-title">{t('Section-2 title')}</h2>

              <p className="homepage__text">
                <ul>
                  <li>{t('Section-2 text-1')}</li>
                  <li>{t('Section-2 text-2')}</li>
                  <li>{t('Section-2 text-3')}</li>
                  <li>{t('Section-2 text-4')}</li>
                  <li>{t('Section-2 text-5')}</li>
                  <li>{t('Section-2 text-6')}</li>
                  <li>{t('Section-2 text-7')}</li>
                  <li>{t('Section-2 text-8')}</li>
                  <li>{t('Section-2 text-9')}</li>
                  <li>{t('Section-2 text-10')}</li>
                </ul>
              </p>
            </section>

            <section className="homepage__info-item">
              <h2 className="homepage__small-title">{t('Section-3 title')}</h2>

              <p className="homepage__text">{t('Section-3 text')}</p>
            </section>

            <section className="homepage__info-item">
              <h2 className="homepage__small-title">{t('Section-4 title')}</h2>

              <p className="homepage__text">{t('Section-4 text')}</p>
            </section>
          </div>

          <button
            className="homepage__contact-button 
					contact-button homepage__contact-button--second"
          >
            Contact us
          </button>
        </div>
      </main>

      {/* <button className="contact-button">Contact us</button> */}
    </>
  );
};
