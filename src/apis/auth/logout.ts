import getInstance from '@/apis/instance';

async function logout() {
  const instance = await getInstance();
  await instance.get('/api/auth/sign-out');
}

export default logout;
