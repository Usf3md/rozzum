import React, { useState } from "react";
import { Post as PostType } from "@/app/types";
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
type Props = {
  postData: PostType;
};

const Post = ({ postData }: Props) => {
  return (
    <Card
      key={postData.id}
      className="hover:bg-accent transition-all ease-in-out"
    >
      <CardHeader className="p-4">
        <CardTitle>
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={postData.imageURL} alt="User Image" />
                  <AvatarFallback>
                    {postData.author.substring(0, 2).toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium">{postData.author}</div>
              </div>
              <div className={"text-xs text-muted-foreground"}>
                {postData.date.toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-semibold  hover:cursor-pointer hover:underline underline-offset-2">
                {postData.title}
              </div>
              {!postData.read && (
                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {postData.postBody}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <div className="flex justify-between">
            {postData.tags.length ? (
              postData.tags.length > 3 ? (
                <div className="flex items-center gap-2">
                  <Badge variant="default">{postData.tags[0]}</Badge>
                  <Badge variant="default">{postData.tags[1]}</Badge>
                  <Badge variant="default">{postData.tags[2]}</Badge>
                  <Button variant={"secondary"} className="h-5 w-5">
                    {<Plus />}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {postData.tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )
            ) : null}
          </div>
          <LikeButton postData={postData} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
