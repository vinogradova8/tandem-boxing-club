import { SlideImage } from '../types/SlideImage';
import { SlideVideo } from '../types/SlideVideo';

export const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

// type Pharagraf = {
//   title: string;
//   info: string;
// };

// type Slide = {
//   media: string;
// };

// const BASE_URL = 'http://localhost:1337/api';
const BASE_URL = 'https://vinogradova8.github.io/boxing/api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function get<T>(url: string): Promise<T> {
  const fullURL = BASE_URL + url + '.json';

  return wait(1000)
    .then(() => fetch(fullURL))
    .then(response => response.json());
}

// export const getPharagrafs = () => get<Pharagraf[]>('/main-page-pharagraf');
export const getSlidesVideo = () => get<SlideVideo[]>('/slides-video');
export const getSlidesImage = () => get<SlideImage[]>('/slides-image');
