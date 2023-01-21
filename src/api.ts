import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://points-api.illinoiswcs.org',
  baseURL: 'http://127.0.0.1:3000/', // TODO
  withCredentials: true
});

instance.interceptors.response.use(undefined, async (err) => {
  if (err.response.status === 401) {
    window.location.href = `${String(instance.defaults.baseURL)}/auth/login`;
  }

  return await Promise.reject(err);
});

export default instance;
