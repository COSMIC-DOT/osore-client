import { cookies } from 'next/headers';
import axios, { AxiosInstance } from 'axios';

async function getInstance(): Promise<AxiosInstance> {
  const cookie = cookies().get('JSESSIONID')?.value;
  const instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Cookie: `JSESSIONID=${cookie}`,
    },
  });

  return instance;
}

export default getInstance;
