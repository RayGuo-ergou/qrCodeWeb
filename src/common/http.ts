import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({
  // FIXME: This is a temporary solution. We should use a proxy server to avoid CORS issues.
  baseURL: 'http://localhost:4000',
  // baseURL: 'https://qrcodebackend1.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default http;
