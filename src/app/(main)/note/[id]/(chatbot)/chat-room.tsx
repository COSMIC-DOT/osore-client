'use client';

import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';

import TypingEffect from '@/app/(main)/note/[id]/(chatbot)/typing-effect';
import getUserName from '@/apis/auth/get-user-name';
import getChatRoomList from '@/apis/chat/get-chat-room-list';
import sendChat from '@/apis/chat/send-chat';
import SendIcon from '@/icons/send-icon';
import ChatRoomType from '@/types/chat-room-type';
import OsoreDarkIcon from '@/icons/osore-dark-icon';

function ChatRoom({ selectedChatRoomId }: { selectedChatRoomId: number }) {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { data: username } = useQuery({ queryKey: ['username'], queryFn: getUserName });
  const { id }: { id: string } = useParams();
  const { data: chatRoomList } = useQuery({ queryKey: ['chatRoomList', id], queryFn: () => getChatRoomList(id) });
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoomType | null>(null);
  const [isChatTyping, setIsChatTyping] = useState(false);

  useEffect(() => {
    const room = chatRoomList.find((chatRoom: ChatRoomType) => chatRoom.chatRoomId === selectedChatRoomId);
    setSelectedChatRoom(room);
  }, [chatRoomList, selectedChatRoomId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedChatRoom, isChatTyping]);

  const date = new Date();
  const today = date.toISOString().split('T')[0];

  const { mutate: handleSendChat } = useMutation({
    mutationFn: (chatContent: string) => {
      if (inputRef.current) {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        setIsChatTyping(true);
        // 서버 응답 오기 전에 UI에 먼저 렌더링
        const updatedChatRoom = { ...selectedChatRoom };
        if (updatedChatRoom.chats?.some((chat) => chat.date === today)) {
          updatedChatRoom.chats = updatedChatRoom.chats?.map((chat) => {
            if (chat.date === today) {
              return {
                ...chat,
                chatsByDate: [
                  ...chat.chatsByDate,
                  { sender: 'USER', message: chatContent },
                  {
                    sender: 'SORE',
                    message: '',
                  },
                ],
              };
            }
            return chat;
          });
        } else {
          updatedChatRoom.chats = updatedChatRoom.chats
            ? [
                ...updatedChatRoom.chats,
                {
                  date: today,
                  chatsByDate: [
                    { sender: 'USER', message: chatContent },
                    { sender: 'SORE', message: '' },
                  ],
                },
              ]
            : [
                {
                  date: today,
                  chatsByDate: [
                    { sender: 'USER', message: chatContent },
                    { sender: 'SORE', message: '' },
                  ],
                },
              ];
        }
        setSelectedChatRoom(updatedChatRoom as ChatRoomType);

        return sendChat(id, selectedChatRoomId.toString(), chatContent);
      }
      return Promise.reject(new Error('Input reference is null'));
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['chatRoomList', id], data);
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
    <div className="relative h-[632px] overflow-hidden">
      <div className="absolute bottom-[1px] left-[1px] flex h-[628px] flex-col justify-between gap-[12px]">
        {selectedChatRoom?.chats.length !== 0 ? (
          <div ref={chatContainerRef} className="flex w-[440px] flex-col overflow-y-scroll scrollbar-hide">
            {/* eslint-disable react/no-array-index-key */}
            {selectedChatRoom?.chats.map((chat, index1) => (
              <div key={index1}>
                <div className="mb-[12px] flex h-[18px] items-center gap-[10px]">
                  <div className="h-[1px] w-[150px] border border-gray3" />
                  <div className="text-body3 w-[116px] text-center text-gray3">
                    {chat.date.split('-')[0]}년 {chat.date.split('-')[1]}월 {chat.date.split('-')[2]}일
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
                          <div>소리</div>
                        </div>
                        <div
                          key={index2}
                          className="mb-[8px] inline-block max-w-[416px] whitespace-normal break-words rounded-[16px] bg-gray1 px-[12px] py-[6px]"
                        >
                          {isChatTyping &&
                          index1 === selectedChatRoom.chats.length - 1 &&
                          index2 === chat.chatsByDate.length - 1 &&
                          chatByDate.message !== '' ? (
                            <TypingEffect
                              text={chatByDate.message}
                              setIsChatTyping={setIsChatTyping}
                              chatContainerRef={chatContainerRef}
                            />
                          ) : (
                            chatByDate.message
                          )}
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
                {username}님, <br /> 소리에게 궁금한 것들을 <br /> 물어보세요!
              </div>
              <div className="text-body3 flex flex-col gap-[12px]">
                <div>1. 이 저장소는 어떤 프로그래밍 언어로 작성되었나요?</div>
                <div>2. 코드의 구조나 디렉토리 구조는 어떻게 되어 있나요?</div>
                <div>3. 이 저장소는 어떤 프레임워크나 라이브러리를 사용하나요?</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex w-[440px] items-end gap-[12px]">
          <textarea
            ref={inputRef}
            className="placeholder:text-button flex max-h-[160px] w-[388px] resize-none items-center rounded-[16px] bg-gray1 px-[20px] py-[12px] focus:outline-primary"
            placeholder="소리에게 물어보기"
            rows={1}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                if (!isChatTyping && inputRef.current?.value.trim() !== '') {
                  const chatContent = inputRef.current?.value as string;
                  setTimeout(() => {
                    (inputRef.current as HTMLTextAreaElement).value = '';
                  }, 0);
                  (inputRef.current as HTMLTextAreaElement).style.height = '45px';
                  handleSendChat(chatContent);
                }
              }
            }}
            onInput={() => {
              if (inputRef.current) {
                inputRef.current.style.height = 'auto';
                inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
                if (chatContainerRef.current) {
                  chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }
              }
            }}
          />
          {isChatTyping ? (
            <div className="flex h-[44px] w-[45px] items-center justify-center">
              <Image src="/images/loading-small.gif" alt="로딩" width={35} height={35} />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (!isChatTyping && inputRef.current?.value.trim() !== '') {
                  const chatContent = inputRef.current?.value as string;
                  (inputRef.current as HTMLTextAreaElement).value = '';
                  (inputRef.current as HTMLTextAreaElement).style.height = '45px';
                  handleSendChat(chatContent);
                }
              }}
            >
              <SendIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
