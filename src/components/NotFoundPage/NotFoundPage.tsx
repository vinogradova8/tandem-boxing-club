import React from 'react';
import './NotFoundPage.scss';

type Props = {
  message: string;
};

export const NotFoundPage: React.FC<Props> = ({ message }) => {
  return (
    <main className="not-found-page">
      <div className="not-found-page__container">
        <p className="not-found-page__main-text small-title">OOPS</p>
        <p className="not-found-page__text">{message}</p>

        <img
          src="https://vinogradova8.github.io/boxing/images/loader/stars.gif"
          alt="Stars"
        />

        <div className="not-found-page-decor"></div>
      </div>
    </main>
  );
};
