import axios from 'axios';

export default axios.create({
  baseURL: '',
});

export const gallery = axios.create({
  baseURL: 'https://vinogradova8.github.io/boxing/api',
  timeout: 1000,
});

export const team = axios.create({
  baseURL: 'https://vinogradova8.github.io/boxing/api',
  timeout: 1000,
});
