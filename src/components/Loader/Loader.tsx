/* eslint-disable max-len */
import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className="loaders">
      <img
        className="loaders__image"
        src="https://vinogradova8.github.io/boxing/images/loader/stars.gif"
        alt="Loading"
      />
    </div>
  );
};
