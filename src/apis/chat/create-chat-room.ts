import getInstance from '@/apis/instance';

async function createChatRoom(noteId: string) {
  const instance = await getInstance();
  const { data } = await instance.post(
    `/api/chat-room`,
    JSON.stringify({
      noteId: +noteId,
    }),
  );

  const chatRoomList = data.result.data;

  return chatRoomList;
}

export default createChatRoom;
