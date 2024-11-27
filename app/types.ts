import { StaticImageData } from "next/image";

export type Post = {
  id: number;
  title: string;
  author: string;
  imageURL: string;
  postBody: string;
  tags: string[];
  likes: number;
  liked: boolean;
  read: boolean;
  date: Date;
};

export type PrimaryTag = {
  id: number;
  tagName: string;
  useCount: number;
};
