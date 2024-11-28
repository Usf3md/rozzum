import React, { useState } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { Post } from "@/app/types";
import { usePosts } from "@/app/context/PostsContext";
import { cn } from "@/lib/utils";

type Props = {
  postData: Post;
};

const LikeButton = ({ postData }: Props) => {
  const { posts, setPosts } = usePosts();
  const [liked, setLiked] = useState(false);
  return (
    <Button
      variant={"outline"}
      className="flex items-center"
      onClick={() => {
        if (liked) return;

        setLiked(true);
        setPosts(
          [
            ...posts.filter((post) => post.id !== postData.id),
            {
              ...postData,
              likesNumber: postData.likesNumber + 1,
            },
          ].sort((a, b) => a.id - b.id)
        );
        fetch(`/api/likes/post/${postData.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }).catch(() => {
          setLiked(false);
          setPosts(
            [
              ...posts.filter((post) => post.id !== postData.id),
              {
                ...postData,
                likesNumber: postData.likesNumber - 1,
              },
            ].sort((a, b) => a.id - b.id)
          );
        });
      }}
    >
      <Heart
        className={cn(
          "h-5 w-5 fill-transparent transition-all ease-in-out",
          liked && "fill-rose-400"
        )}
      />
      <span>{postData.likesNumber}</span>
    </Button>
  );
};

export default LikeButton;
