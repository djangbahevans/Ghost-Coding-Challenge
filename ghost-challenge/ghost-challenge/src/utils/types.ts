export type Comment = {
  id: number;
  author: string;
  text: string;
  timestamp: number;
  upvotes: number;
  image: string;
  children?: Comment[];
}
