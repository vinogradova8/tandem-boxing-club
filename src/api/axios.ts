import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8088',
});

export const gallery = axios.create({
  baseURL: 'https://vinogradova8.github.io/boxing/api',
});
