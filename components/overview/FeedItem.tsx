"use client";
import React, { ReactNode, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import PostDialog from "../dashboard/PostDialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { StringToBoolean } from "class-variance-authority/types";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  children: ReactNode;
  tags: string[];
};

const FeedItem = ({ title, children, tags }: Props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  return (
    <Card className="hover:bg-accent h-auto transition-all ease-in-out flex flex-col">
      <div className="flex flex-col justify-between h-full">
        <div>
          <CardHeader className="p-4">
            <CardTitle>
              <div className="flex w-full flex-col gap-1">
                <div className="flex justify-between">
                  <h2
                    className="font-semibold text-xl  hover:cursor-pointer hover:underline underline-offset-2 select-none"
                    onClick={() => setIsFullScreen((prev) => !prev)}
                  >
                    {title}
                  </h2>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div
              className={cn("overflow-hidden h-[6rem] transition-all")}
              style={{
                height: isFullScreen ? "calc(100vh - 52px - 16px)" : "6rem",
              }}
            >
              {children}
            </div>
          </CardContent>
        </div>
        <CardFooter className="p-4 pt-0">
          <div className="flex justify-between w-full">
            <div className="flex justify-between">
              {
                <div className="flex items-center gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              }
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default FeedItem;
