import React from 'react';
import './Support.scss';
import { Trans, useTranslation } from 'react-i18next';
import { ContactButton } from '../ContactButton';

export const Support: React.FC = ({}) => {
  const { t } = useTranslation();

  return (
    <main className="support">
      <div className="support__main">
        <div className="support__main-container">
          <h2 className="support__title big-title">{t('Support Us')}</h2>
        </div>
      </div>

      <div className="support__info">
        <section className="support__info-item info-item">
          <div className="info-item__container">
            <div className="info-item__content info-item__content--1">
              <h2 className="support__small-title small-title">
                {t('Support-Section-1 title')}
              </h2>

              <div className="support__text">
                <Trans i18nKey="Support-Section-1 text" />
              </div>
            </div>

            <div className="decor decor--4"></div>
          </div>
        </section>

        <section className="support__info-item info-item">
          <div className="info-item__container">
            <div className="info-item__content info-item__content--2">
              <h2 className="support__small-title small-title">
                {t('Support-Section-2 title')}
              </h2>

              <div className="support__text">
                <Trans i18nKey="Support-Section-2 text" />
              </div>
            </div>

            <div className="decor decor--5"></div>
          </div>
        </section>

        <section className="support__info-item info-item">
          <div className="info-item__container">
            <div className="info-item__content info-item__content--3">
              <h2 className="support__small-title small-title">
                {t('Support-Section-3 title')}
              </h2>

              <div className="support__text">
                <Trans i18nKey="Support-Section-3 text" />
              </div>
            </div>

            <div className="decor decor--6"></div>
          </div>
        </section>
      </div>

      <ContactButton />

      {/* <div className="support__contact-us-bottom contact-us-bottom">
        <button
          className="support__contact-button 
					contact-button"
        >
          {t('Contact us')}
        </button>
      </div> */}
    </main>
  );
};
