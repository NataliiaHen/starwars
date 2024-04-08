import axios from 'axios';

const API_URL = 'https://sw-api.starnavi.io/';

axios.defaults.baseURL = API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;
