import axios from 'axios';

// export default axios.create({
//   baseURL: 'http://localhost:8088',
// });

export default axios.create({
  baseURL: 'http://ec2-54-162-241-210.compute-1.amazonaws.com/',
});

export const gallery = axios.create({
  baseURL: 'https://vinogradova8.github.io/boxing/api',
});
