export type Post = {
  id: number;
  title: string;
  author: string;
  imageURL: string;
  postBody: string;
  tags: string[];
  Likes: number;
  liked: boolean;
  read: boolean;
  date: Date;
};

export type PrimaryTag = {
  id: number;
  tagName: string;
  useCount: number;
};
