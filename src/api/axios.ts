import axios from 'axios';

export const gallery = axios.create({
  baseURL: 'https://vinogradova8.github.io/boxing/api',
});
