export default interface NoteType {
  id: number;
  title: string;
  avatar: string;
  repository: string;
  description: string;
  contributorsCount: string;
  starsCount: string;
  forksCount: string;
  viewedAt: { number: number; unit: string };
}
