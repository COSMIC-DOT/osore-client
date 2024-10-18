import getInstance from '@/apis/instance';

async function getUserName() {
  const instance = await getInstance();
  const { data } = await instance.get('/api/member');

  const { name: username } = data.result.data;

  return username;
}

export default getUserName;
