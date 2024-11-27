import React from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { Post } from "@/app/types";
import { usePosts } from "@/app/context/PostsContext";

type Props = {
  postData: Post;
};

const LikeButton = ({ postData }: Props) => {
  const { posts, setPosts } = usePosts();
  if (postData.liked)
    return (
      <Button
        variant={"outline"}
        className="flex items-center"
        onClick={() => {
          setPosts(
            [
              ...posts.filter((post) => post.id !== postData.id),
              {
                ...postData,
                liked: !postData.liked,
                likes: postData.likes - 1,
              },
            ].sort((a, b) => a.id - b.id)
          );
        }}
      >
        <Heart className="h-5 w-5 fill-rose-400" />
        <span>{postData.likes}</span>
      </Button>
    );
  return (
    <Button
      variant={"outline"}
      className="flex items-center"
      onClick={() => {
        setPosts(
          [
            ...posts.filter((post) => post.id !== postData.id),
            { ...postData, liked: !postData.liked, likes: postData.likes + 1 },
          ].sort((a, b) => a.id - b.id)
        );
      }}
    >
      <Heart className="h-5 w-5" />
      <span>{postData.likes}</span>
    </Button>
  );
};

export default LikeButton;
