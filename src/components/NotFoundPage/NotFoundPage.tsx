/* eslint-disable max-len */
import React from 'react';
import './NotFoundPage.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  message: string;
};

export const NotFoundPage: React.FC<Props> = ({ message }) => {
  const { t } = useTranslation();

  return (
    <main className="not-found-page">
      <div className="not-found-page__container">
        <p className="not-found-page__main-text small-title">{t('oops')}</p>
        <p className="not-found-page__text">{message}</p>

        <img
          className="not-found-page__stars"
          src="https://vinogradova8.github.io/boxing/images/loader/stars.gif"
          alt="Stars"
        />

        <img
          className="not-found-page__nock-out"
          src="https://vinogradova8.github.io/boxing/images/decor/decor-nock-out.png"
          alt="Stars"
        />

        {/* <div className="not-found-page-decor">
          <img
            src="https://vinogradova8.github.io/boxing/images/loader/stars.gif"
            // src="https://vinogradova8.github.io/boxing/images/decor/decor-nock-out.png"
            alt="Stars"
          />
        </div> */}
      </div>
    </main>
  );
};
