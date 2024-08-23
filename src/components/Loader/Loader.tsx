/* eslint-disable max-len */
import React from 'react';
import './Loader.scss';
// import cn from 'classnames';

export const Loader: React.FC = () => {
  return (
    <div className="loaders">
      <img
        className="loaders__image"
        src="https://vinogradova8.github.io/boxing/images/loader/spinner-transparent.gif"
        // src="../images/loader/spinner-transparent.gif"
        alt="Loading"
      />
    </div>
  );
};
