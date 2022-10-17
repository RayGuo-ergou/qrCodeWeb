import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({
  // FIXME: This is a temporary solution. We should use a proxy server to avoid CORS issues.
  // if production, use the server url
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://qrcodebackend1.azurewebsites.net'
      : 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default http;
