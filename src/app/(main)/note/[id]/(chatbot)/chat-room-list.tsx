import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import getChatRoomList from '@/apis/chat/get-chat-room-list';
import ChatRoomType from '@/types/chat-room-type';

function ChatRoomList() {
  const { id }: { id: string } = useParams();
  const { data: chatRoomList } = useQuery({ queryKey: ['chatRoomList', id], queryFn: () => getChatRoomList(id) });
  return <div>{chatRoomList?.map((chatRoom: ChatRoomType) => <div key={chatRoom.id}>{chatRoom.title}</div>)}</div>;
}

export default ChatRoomList;
