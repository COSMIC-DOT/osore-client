import getInstance from '@/apis/instance';

async function getChatRoomList(noteId: string) {
  const instance = await getInstance();
  const { data } = await instance.get(`/api/chat-rooms?noteId=${noteId}`);
  const chatRoomList = data.result.data;

  return chatRoomList;
}

export default getChatRoomList;
