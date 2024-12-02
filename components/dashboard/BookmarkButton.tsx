import React, { useState } from "react";
import { Button } from "../ui/button";
import { Bookmark, Heart } from "lucide-react";
import { Post } from "@/app/types";
import { usePosts } from "@/app/context/PostsContext";
import { cn } from "@/lib/utils";

type Props = {
  postData: Post;
};

const BookmarkButton = ({ postData }: Props) => {
  const { posts, setPosts } = usePosts();
  return (
    <Button
      variant={"outline"}
      className="flex items-center"
      onClick={() => {
        const bookmarked = postData.isBookMarkPost;
        setPosts(
          [
            ...posts.filter((post) => post.id !== postData.id),
            {
              ...postData,
              isBookMarkPost: !postData.isBookMarkPost,
            },
          ].sort((a, b) => a.id - b.id)
        );
        if (!bookmarked) {
          fetch(`/api/bookmark/${postData.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }).then((res) => {
            if (!res.ok)
              setPosts(
                [
                  ...posts.filter((post) => post.id !== postData.id),
                  {
                    ...postData,
                    isBookmarked: false,
                  },
                ].sort((a, b) => a.id - b.id)
              );
          });
        } else {
          fetch(`/api/bookmark/${postData.id}`, {
            method: "DELETE",
          }).then((res) => {
            if (!res.ok)
              setPosts(
                [
                  ...posts.filter((post) => post.id !== postData.id),
                  {
                    ...postData,
                    isBookMarkPost: true,
                  },
                ].sort((a, b) => a.id - b.id)
              );
          });
        }
      }}
    >
      <Bookmark
        className={cn(
          "h-5 w-5 fill-transparent transition-all ease-in-out",
          postData.isBookMarkPost && "fill-amber-400"
        )}
      />
    </Button>
  );
};

export default BookmarkButton;
