import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Post as PostType } from "@/app/types";
import Post from "./Post";

type Props = {
  posts: PostType[];
};

const PostsList = ({ posts }: Props) => {
  return (
    <ScrollArea style={{ height: "calc(100vh - 68px - 1px - 52px)" }}>
      <div className="flex flex-col gap-2 p-4 pt-0">
        {posts.map((post) => (
          <Post key={post.id} postData={post} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default PostsList;
