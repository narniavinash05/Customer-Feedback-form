import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your API base URL.
});

axiosInstance.interceptors.request.use((config) => {
  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }

  return config;
});

export default axiosInstance;
