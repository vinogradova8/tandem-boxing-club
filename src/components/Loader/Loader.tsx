import React from 'react';
import './Loader.scss';
// import cn from 'classnames';

export const Loader: React.FC = () => {
  return (
    <div className="loaders">
      <img
        className="loaders__image"
        src="../images/loader/spinner-transparent.gif"
        alt="Loading"
      />
    </div>
  );
};
