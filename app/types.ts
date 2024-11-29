export type Tag = {
  id: number;
  name: string;
};

export type PopularTag = {
  id: number;
  name: string;
  totalLikes: number;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  authorFullName: string;
  isBookMarkPost: boolean;
  likesNumber: number;
  primaryTags: Tag[];
  secondaryTags: Tag[];
  time: Date;
};

export type PostInfo = {
  id: number;
  title: string;
  body: string;
  authorFullName: string;
  likesNumber: number;
  comments: Comment[];
};

export type Comment = {
  id: number;
  body: string;
  numberOfLikes: number;
  authorFullName: string;
  time: Date;
};

export type PrimaryTag = {
  id: number;
  tagName: string;
  useCount: number;
};

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  image_file: string;
  teamId: number;
};
