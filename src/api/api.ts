import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
    ? import.meta.env.VITE_BASE_URL
<<<<<<< HEAD:src/api.ts
  //  : 'http://127.0.0.1:3000',
  : 'https://points-api.illinoiswcs.org',
=======
    : 'http://127.0.0.1:3000',
  //  'https://points-api.illinoiswcs.org',
>>>>>>> 5df46494b8ea761576c1d52b7f3bd02b26e31919:src/api/api.ts
  withCredentials: true
});

instance.interceptors.response.use(undefined, async (err) => {
  return await Promise.reject(err);
});

export default instance;
