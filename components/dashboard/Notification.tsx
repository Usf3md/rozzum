import React, { useState } from "react";
import {
  Comment,
  Notification as NotificationType,
  PostInfo,
  Post as PostType,
} from "@/app/types";
import PostDialog from "./PostDialog";
import { useUser } from "@/app/context/UserContext";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Label } from "../ui/label";
type Props = {
  notification: NotificationType;
};

const Notification = ({ notification }: Props) => {
  const [postInfo, setPostInfo] = useState<PostInfo>();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleCommentAddition = (body: string) => {
    if (postInfo)
      setPostInfo({
        ...postInfo,
        comments: [
          ...postInfo?.comments,
          {
            authorFullName: `${user?.first_name} ${user?.last_name}`,
            body,
            id: -1,
            numberOfLikes: 0,
            time: new Date(),
          },
        ],
      });
  };
  return (
    <div className="flex flex-col items-start gap-0 p-4 rounded-sm hover:bg-accent transition-all ease-in-out">
      <PostDialog
        loading={isLoading}
        postInfo={postInfo}
        addComment={handleCommentAddition}
      >
        <div>
          <Label
            className="text-sm font-semibold hover:cursor-pointer hover:underline underline-offset-2"
            onClick={async () => {
              setIsLoading(true);
              const response = await fetch(`/api/posts/${notification.postId}`);
              if (response.ok) {
                setPostInfo(await response.json());
                await fetch(`/api/notifications/see/${notification.id}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
              }
              setIsLoading(false);
            }}
          >
            {notification.title}
          </Label>
        </div>
      </PostDialog>
      <div>
        <p
          className="text-muted-foreground line-clamp-1 text-sm"
          dangerouslySetInnerHTML={{
            __html: notification.body,
          }}
        ></p>
      </div>
      <div className="flex justify-end w-full text-xs ">
        <p>{new Date(notification.createdAt).toDateString()}</p>
      </div>
    </div>
  );
};

export default Notification;
