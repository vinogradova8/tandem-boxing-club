/* eslint-disable max-len */
import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className="loaders">
      <img
        className="loaders__image"
        // src="../images/loader/stars.gif"
        src="https://vinogradova8.github.io/boxing/images/loader/stars.gif"
        // src="https://vinogradova8.github.io/boxing/images/loader/spinner-transparent.gif"
        alt="Loading"
      />
    </div>
  );
};
