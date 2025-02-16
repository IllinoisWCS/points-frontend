import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
    ? import.meta.env.VITE_BASE_URL
    // : 'http://127.0.0.1:3000',
   :  'https://points-api.illinoiswcs.org',
  withCredentials: true
});

instance.interceptors.response.use(undefined, async (err) => {
  return await Promise.reject(err);
});

export default instance;
