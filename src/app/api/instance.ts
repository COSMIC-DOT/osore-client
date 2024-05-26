import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
});

export default instance;
