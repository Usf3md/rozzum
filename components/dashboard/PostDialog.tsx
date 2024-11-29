import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { PostInfo, Tag } from "@/app/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import RichTextEditor from "../text-editor";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  loading: boolean;
  postInfo: PostInfo | undefined;
  addComment(body: string): void;
};

type Form = {
  title: string;
  body: string;
  primaryTags: number[];
  secondaryTags: string[];
};

const PostDialog = ({ children, postInfo, loading, addComment }: Props) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className={cn(
          "max-w-[40rem]",
          postInfo?.comments.length && "max-w-[80rem]"
        )}
      >
        {loading ? (
          <DialogTitle>
            <div className="w-full flex items-center justify-center">
              <Loader2 className="animate-spin w-8 h-8" />
            </div>
          </DialogTitle>
        ) : (
          <div className="flex gap-8 w-full">
            <div className="w-full flex flex-col h-full justify-between gap-8">
              <DialogHeader>
                <DialogTitle>Post #{postInfo?.id}</DialogTitle>
              </DialogHeader>

              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-lg">{postInfo?.title}</h2>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Avatar className="w-6 h-6">
                      <AvatarImage alt="User Image" />
                      <AvatarFallback className="text-xs">
                        {postInfo?.authorFullName
                          .split(" ")
                          .map((word) => word.substring(0, 1))
                          .join("")
                          .toLocaleUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-xs font-medium">
                      {postInfo?.authorFullName}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p
                    className="text-md text-foreground"
                    dangerouslySetInnerHTML={{ __html: postInfo?.body ?? "" }}
                  ></p>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
                <div>
                  <label>Add comment</label>
                  <RichTextEditor
                    onChange={(e) => {
                      setComment(e);
                    }}
                    value={comment}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    disabled={isSubmitting}
                    onClick={async () => {
                      setIsSubmitting(true);
                      const response = await fetch("/api/comment", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          body: comment,
                          postId: postInfo?.id,
                        }),
                      });
                      if (response.ok) {
                        addComment(comment);
                      }
                      setIsSubmitting(false);
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
            {postInfo?.comments.length ? (
              <>
                <div
                  data-orientation="horizontal"
                  role="none"
                  className="shrink-0 bg-border h-full w-[1px]"
                ></div>
                <DialogFooter className="flex sm:justify-start w-full">
                  <div className="w-full flex flex-col gap-2">
                    {postInfo?.comments.length ? (
                      <div className="flex flex-col gap-2">
                        <label>Comments</label>
                        <ScrollArea className="h-[30rem] w-full">
                          <div className="flex flex-col gap-4 p-4">
                            {[...postInfo?.comments]
                              .reverse()
                              .map((comment) => (
                                <div
                                  key={`${new Date(
                                    comment.time
                                  ).toISOString()}${comment.id}`}
                                  className="flex gap-2"
                                >
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage alt="User Image" />
                                    <AvatarFallback className="text-sm">
                                      {comment.authorFullName
                                        .split(" ")
                                        .map((word) => word.substring(0, 1))
                                        .join("")
                                        .toLocaleUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-col w-full">
                                    <div className="flex justify-between">
                                      <div className="text-xs font-medium">
                                        {comment.authorFullName}
                                      </div>
                                      <p className="text-xs font-medium">
                                        {new Date(comment.time).toDateString()}
                                      </p>
                                    </div>
                                    <p
                                      className="text-md text-foreground"
                                      dangerouslySetInnerHTML={{
                                        __html: comment.body,
                                      }}
                                    ></p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </ScrollArea>
                      </div>
                    ) : null}
                  </div>
                </DialogFooter>
              </>
            ) : null}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
