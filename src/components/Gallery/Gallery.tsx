import React from 'react';
import './Gallery.scss';
import { Slider } from '../Slider/Slider';
import slides from '../../api/slides.json';

export const Gallery: React.FC = ({}) => {
  return (
    <>
      <h2>Gallery</h2>
      <Slider slides={slides}></Slider>
    </>
  );
};
