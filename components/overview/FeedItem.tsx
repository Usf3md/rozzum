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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

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
        <div className="">
          <CardHeader className="p-4">
            <CardTitle>
              <div className="flex w-full flex-col gap-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex justify-between">
                      <h2
                        className="font-semibold text-xl  hover:cursor-pointer hover:underline underline-offset-2 select-none"
                        onClick={() => setIsFullScreen((prev) => !prev)}
                      >
                        {title}
                      </h2>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[60rem] clas">
                    <DialogHeader>
                      <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="overflow-hidden max-h-[75vh] px-2">
                      {children}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </CardTitle>
          </CardHeader>
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
