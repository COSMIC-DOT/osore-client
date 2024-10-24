export default interface ChatRoomType {
  chatRoomId: number;
  title: string;
  chats: ChatType[];
}

interface ChatType {
  date: string;
  chatsByDate: { message: string; sender: string }[];
}
