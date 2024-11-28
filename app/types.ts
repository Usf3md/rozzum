export type Tag = {
  id: number;
  name: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  authorFullName: string;
  likesNumber: number;
  primaryTags: Tag[];
  secondaryTags: Tag[];
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
