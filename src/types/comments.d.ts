export type CommentType = {
  length: number;
  id: number;
  author: string;
  content: string;
  likes: number;
  dislikes: number;
  time: string;
  replayTo?:string;
  subComments?: CommentType[] | undefined;
};
