export const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

type Pharagraf = {
  title: string;
  info: string;
};

const BASE_URL = 'http://localhost:1337/api';

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

export const getPharagrafs = () => get<Pharagraf[]>('/main-page-pharagraf');
