import React, { useState } from "react";
import { Comment, PostInfo, Post as PostType } from "@/app/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart, Plus } from "lucide-react";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import PostDialog from "./PostDialog";
import { usePosts } from "@/app/context/PostsContext";
type Props = {
  postData: PostType;
};

const Post = ({ postData }: Props) => {
  const [postInfo, setPostInfo] = useState<PostInfo>();
  const [isLoading, setIsLoading] = useState(false);

  const handleCommentAddition = (body: string) => {
    if (postInfo)
      setPostInfo({
        ...postInfo,
        comments: [
          ...postInfo?.comments,
          {
            authorFullName: postInfo.authorFullName,
            body,
            id: -1,
            numberOfLikes: 0,
            time: new Date(),
          },
        ],
      });
  };
  return (
    <Card
      key={postData.id}
      className="hover:bg-accent transition-all ease-in-out"
    >
      <CardHeader className="p-4">
        <CardTitle>
          <div className="flex w-full flex-col gap-1">
            <div className="flex justify-between">
              <div className="flex items-center">
                <PostDialog
                  loading={isLoading}
                  postInfo={postInfo}
                  addComment={handleCommentAddition}
                >
                  <h2
                    className="font-semibold text-xl  hover:cursor-pointer hover:underline underline-offset-2"
                    onClick={async () => {
                      setIsLoading(true);
                      const response = await fetch(`/api/posts/${postData.id}`);
                      if (response.ok) {
                        setPostInfo(await response.json());
                      }
                      setIsLoading(false);
                    }}
                  >
                    {postData.title}
                  </h2>
                </PostDialog>
              </div>
              <div className={"text-xs text-muted-foreground"}>
                {new Date(postData.time).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Avatar className="w-6 h-6">
                  <AvatarImage alt="User Image" />
                  <AvatarFallback className="text-xs">
                    {postData.authorFullName
                      .split(" ")
                      .map((word) => word.substring(0, 1))
                      .join("")
                      .toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs font-medium">
                  {postData.authorFullName}
                </div>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p
          className="line-clamp-2 text-xs text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: postData.body }}
        ></p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex justify-between w-full">
          <div className="flex justify-between">
            {postData.secondaryTags.length ? (
              postData.secondaryTags.length > 3 ? (
                <div className="flex items-center gap-2">
                  <Badge variant="default">
                    {postData.secondaryTags[0].name}
                  </Badge>
                  <Badge variant="default">
                    {postData.secondaryTags[1].name}
                  </Badge>
                  <Badge variant="default">
                    {postData.secondaryTags[2].name}
                  </Badge>
                  <Button variant={"secondary"} className="h-5 w-5">
                    {<Plus />}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {postData.secondaryTags.map((tag) => (
                    <Badge key={tag.id} variant="default">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )
            ) : null}
          </div>
          <div className="flex gap-2">
            <LikeButton postData={postData} />
            <BookmarkButton postData={postData} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
