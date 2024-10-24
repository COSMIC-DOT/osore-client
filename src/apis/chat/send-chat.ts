import getInstance from '@/apis/instance';

async function sendChat(noteId: string, roomId: string, chat: string) {
  const instance = await getInstance();
  const { data } = await instance.post(
    `/api/chat`,
    JSON.stringify({
      noteId: +noteId,
      roomId: +roomId,
      chat,
    }),
  );

  const chatRoomList = data.result.data;

  return chatRoomList;
}

export default sendChat;
