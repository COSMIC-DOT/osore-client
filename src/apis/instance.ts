import axios, { AxiosInstance } from 'axios';

async function getInstance(): Promise<AxiosInstance> {
  const instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
}

export default getInstance;
