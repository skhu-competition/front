import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://nowskhu.zapto.org',
  timeout: 5000,
});

export default instance;