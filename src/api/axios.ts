import axios from 'axios';

export default axios.create({
  baseURL: 'https://d1g3i7mr74vp7j.cloudfront.net',
});

export const gallery = axios.create({
  baseURL: 'https://vinogradova8.github.io/boxing/api',
});
