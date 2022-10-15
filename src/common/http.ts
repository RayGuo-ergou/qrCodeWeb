import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({
  // FIXME: This is a temporary solution. We should use a proxy server to avoid CORS issues.
  baseURL: 'https://qrcodebackend1.azurewebsites.net/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;
