'use client';

import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import getUserName from '@/apis/auth/get-user-name';
import getChatRoomList from '@/apis/chat/get-chat-room-list';
import sendChat from '@/apis/chat/send-chat';
import SendIcon from '@/icons/send-icon';
import ChatRoomType from '@/types/chat-room-type';
import OsoreDarkIcon from '@/icons/osore-dark-icon';

function ChatRoom({ selectedChatRoomId }: { selectedChatRoomId: number }) {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { data: username } = useQuery({ queryKey: ['username'], queryFn: getUserName });
  const { id }: { id: string } = useParams();
  const { data: chatRoomList } = useQuery({ queryKey: ['chatRoomList', id], queryFn: () => getChatRoomList(id) });
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoomType | null>(null);

  useEffect(() => {
    const room = chatRoomList.find((chatRoom: ChatRoomType) => chatRoom.chatRoomId === selectedChatRoomId);
    setSelectedChatRoom(room);
  }, [chatRoomList, selectedChatRoomId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedChatRoom]);

  const { mutate: handleSendChat } = useMutation({
    mutationFn: () => {
      if (inputRef.current) {
        return sendChat(id, selectedChatRoomId.toString(), inputRef.current.value);
      }
      return Promise.reject(new Error('Input reference is null'));
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['chatRoomList', id], data);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Error: ', error);
    },
  });

  return (
    <div className="flex flex-col gap-[12px]">
      {selectedChatRoom?.chats.length !== 0 ? (
        <div ref={chatContainerRef} className="flex h-[564px] w-[440px] overflow-y-scroll scrollbar-hide">
          {/* eslint-disable react/no-array-index-key */}
          {selectedChatRoom?.chats.map((chat, index1) => (
            <div key={index1}>
              <div className="flex h-[18px] items-center gap-[12px]">
                <div className="h-[1px] w-[150px] border border-gray3" />
                <div className="text-body3 w-[116px] text-center text-gray3">
                  {chat.date.split('-')[0]}년 {chat.date.split('-')[1]}월 {chat.date.split('-')[1]}일
                </div>
                <div className="h-[1px] w-[150px] border border-gray3" />
              </div>
              <div className="flex flex-col items-end">
                {chat.chatsByDate.map((chatByDate, index2: number) =>
                  chatByDate.sender === 'USER' ? (
                    <div
                      key={index2}
                      className="mb-[8px] inline-block max-w-[416px] whitespace-normal break-words rounded-[16px] bg-gray2 px-[12px] py-[6px]"
                    >
                      {chatByDate.message}
                    </div>
                  ) : (
                    <div className="w-[440px]">
                      <div className="mb-[8px] flex items-center gap-[7px]">
                        <OsoreDarkIcon />
                        <div>Sore</div>
                      </div>
                      <div
                        key={index2}
                        className="mb-[8px] inline-block max-w-[416px] whitespace-normal break-words rounded-[16px] bg-gray1 px-[12px] py-[6px]"
                      >
                        {chatByDate.message}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-[564px] w-[440px] items-center justify-center">
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

      <form
        className="flex h-[52px] w-[440px] items-center gap-[12px]"
        onSubmit={(event) => {
          event.preventDefault();
          handleSendChat();
        }}
      >
        <input
          ref={inputRef}
          className="placeholder:text-button flex h-[45px] w-[388px] items-center rounded-[16px] bg-gray1 px-[20px] py-[12px] focus:outline-primary"
          placeholder="소리에게 물어보기"
        />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
