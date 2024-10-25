import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import getChatRoomList from '@/apis/chat/get-chat-room-list';
import ChatRoomType from '@/types/chat-room-type';

function ChatRoomList({
  selectedChatRoomId,
  setIsChatRoom,
  setSelectedChatRoomId,
}: {
  selectedChatRoomId: number;
  setIsChatRoom: (isChatRoom: boolean) => void;
  setSelectedChatRoomId: (selectedChatRoomId: number) => void;
}) {
  const { id }: { id: string } = useParams();
  const { data: chatRoomList } = useQuery({ queryKey: ['chatRoomList', id], queryFn: () => getChatRoomList(id) });

  const changeChatRoom = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    const roomId: number = parseInt(event.currentTarget.getAttribute('data-key') || '0', 10);
    setIsChatRoom(true);
    setSelectedChatRoomId(roomId);
  };

  return (
    <div className="w-[618px] overflow-y-scroll pt-[18px]">
      {chatRoomList?.map((chatRoom: ChatRoomType) => (
        <div
          key={chatRoom.chatRoomId}
          data-key={chatRoom.chatRoomId}
          className={`text-subtitle1 w-[440px] cursor-pointer p-[12px] ${selectedChatRoomId === chatRoom.chatRoomId ? 'bg-gray1' : ''} rounded-[12px]`}
          onClick={changeChatRoom}
          onKeyDown={changeChatRoom}
          tabIndex={0}
          role="button"
        >
          {chatRoom.title}
        </div>
      ))}
    </div>
  );
}

export default ChatRoomList;
