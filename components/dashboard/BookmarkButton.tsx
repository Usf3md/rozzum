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
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <Button
      variant={"outline"}
      className="flex items-center"
      onClick={() => {
        if (!isBookmarked) {
          setIsBookmarked(true);
          // setPosts(
          //   [
          //     ...posts.filter((post) => post.id !== postData.id),
          //     {
          //       ...postData,
          //       isBookmarked: true,
          //     },
          //   ].sort((a, b) => a.id - b.id)
          // );
          fetch(`/api/bookmark/${postData.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }).catch(() => {
            setIsBookmarked(false);
            // setPosts(
            //   [
            //     ...posts.filter((post) => post.id !== postData.id),
            //     {
            //       ...postData,
            //       isBookmarked: false,
            //     },
            //   ].sort((a, b) => a.id - b.id)
            // );
          });
        } else {
          setIsBookmarked(false);
          fetch(`/api/bookmark/${postData.id}`, {
            method: "DELETE",
          }).catch(() => {
            setIsBookmarked(true);
          });
        }
      }}
    >
      <Bookmark
        className={cn(
          "h-5 w-5 fill-transparent transition-all ease-in-out",
          isBookmarked && "fill-amber-400"
        )}
      />
    </Button>
  );
};

export default BookmarkButton;
