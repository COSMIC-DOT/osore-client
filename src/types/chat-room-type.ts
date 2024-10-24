export default interface ChatRoomType {
  id: number;
  title: string;
  chats: ChatType[];
}

interface ChatType {
  date: string;
  chatsByDate: { message: string; sender: string }[];
}
