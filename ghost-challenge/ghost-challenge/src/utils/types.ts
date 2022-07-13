export type Comment = {
  id: number;
  author: string;
  text: string;
  timestamp: number;
  upvotes: number;
  children?: Comment[];
}
