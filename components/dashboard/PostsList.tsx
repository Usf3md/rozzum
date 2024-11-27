import React from "react";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Post } from "@/app/types";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Select } from "../ui/select";
import { Input } from "../ui/input";

type Props = {
  posts: Post[];
};

const PostsList = ({ posts }: Props) => {
  return (
    <ScrollArea style={{ height: "calc(100vh - 68px - 1px - 52px)" }}>
      <div className="flex flex-col gap-2 p-4 pt-0">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="hover:bg-accent transition-all ease-in-out hover:cursor-pointer"
          >
            <CardHeader className="p-4">
              <CardTitle>
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{post.title}</div>
                      {!post.read && (
                        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <div className={"text-xs text-muted-foreground"}>
                      {post.date.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-xs font-medium">{post.author}</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {post.postBody}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              {post.tags.length ? (
                post.tags.length > 3 ? (
                  <div className="flex items-center gap-2">
                    <Badge variant="default">{post.tags[0]}</Badge>
                    <Badge variant="default">{post.tags[1]}</Badge>
                    <Badge variant="default">{post.tags[2]}</Badge>
                    <Button variant={"secondary"} className="h-5 w-5">
                      {<Plus />}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )
              ) : null}
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default PostsList;
