'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import getUserName from '@/apis/auth/get-user-name';
import getChatRoomList from '@/apis/chat/get-chat-room-list';
import SendIcon from '@/icons/send-icon';
import ChatRoomType from '@/types/chat-room-type';

function ChatRoom({ selectedChatRoomId }: { selectedChatRoomId: number }) {
  const { data: username } = useQuery({ queryKey: ['username'], queryFn: getUserName });
  const { id }: { id: string } = useParams();
  const { data: chatRoomList } = useQuery({ queryKey: ['chatRoomList', id], queryFn: () => getChatRoomList(id) });
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoomType | null>(null);

  useEffect(() => {
    const room = chatRoomList.find((chatRoom: ChatRoomType) => chatRoom.chatRoomId === selectedChatRoomId);
    setSelectedChatRoom(room);
  }, [selectedChatRoomId]);

  return (
    <div className="flex flex-col gap-[12px]">
      {selectedChatRoom?.chats.length !== 0 ? (
        <div>채팅 리스트 불러오기</div>
      ) : (
        <div className="flex h-[564px] items-center justify-center">
          <div className="text-subtitle1 flex h-[221px] w-[440px] flex-col gap-[22px] rounded-[32px] bg-gray1 p-[20px]">
            <div>
              {username}님, <br /> Sore에게 궁금한 것들을 <br /> 물어보세요!
            </div>
            <div className="text-body3 flex flex-col gap-[12px]">
              <div>1. 이 저장소는 어떤 프로그래밍 언어로 작성되었나요?</div>
              <div>2. 코드의 구조나 디렉토리 구조는 어떻게 되어 있나요?</div>
              <div>3. 이 저장소는 어떤 프레임워크나 라이브러리를 사용하나요?{selectedChatRoom.chatRoomId}</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-[52px] w-[440px] items-center gap-[12px]">
        <input
          className="placeholder:text-button flex h-[45px] w-[388px] items-center rounded-[16px] bg-gray1 px-[20px] py-[12px] focus:outline-primary"
          placeholder="소리에게 물어보기"
        />
        <SendIcon />
      </div>
    </div>
  );
}

export default ChatRoom;
