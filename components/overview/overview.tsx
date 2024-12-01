"use client";

import React, { use, useContext, useEffect, useState } from "react";
import { TooltipProvider } from "../ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import {
  Notification as NotificationType,
  PopularTag,
  Post,
  Tag,
} from "@/app/types";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import FilterGroup from "../dashboard/FilterGroup";
import {
  Search,
  PaintRoller,
  Server,
  BrainCog,
  HandCoins,
  Building2,
  LucideIcon,
  TagIcon,
  Loader2,
  PlusCircle,
  Bookmark,
  Bell,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import PostsList from "../dashboard/PostsList";
import Logo from "../Logo";
import { ModeToggle } from "../ModeToggle";
import { ScrollArea } from "../ui/scroll-area";
import { PostsProvider, usePosts } from "@/app/context/PostsContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { iconsMap } from "@/app/common";
import CreatePostDialog from "../dashboard/CreatePostDialog";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import Notificaiton from "../dashboard/Notification";
import Link from "next/link";
import Feed from "./Feed";
import Image from "next/image";
import Raisa from "@/public/raisa-black.png";

interface DashboardProps {
  posts: Post[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize?: number;
}

type Filters = {
  primaryTagIds: number[];
  secondaryTagIds: number[];
  bookmarked: boolean;
};

const Overview = ({ defaultLayout = [16, 68, 16] }: DashboardProps) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const filteredNotifications = notifications.filter(
    (notification) => !notification.isSeen
  );
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, []);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          minSize={15}
          maxSize={20}
        >
          <div className="flex h-[52px] items-center p-4 gap-2">
            <Logo size={28} />
            <h1 className="text-xl font-bold">Rozzum</h1>
          </div>
          <Separator />
        </ResizablePanel>

        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className=" h-[52px] flex justify-end items-center px-4 py-2">
            <Button asChild>
              <Link href="/feed">Feed</Link>
            </Button>
          </div>
          <Separator />
          <Feed />
        </ResizablePanel>
        <ResizablePanel
          defaultSize={defaultLayout[2]}
          minSize={defaultLayout[2]}
        >
          <div className="flex justify-end gap-4 items-center px-4 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className={cn(
                    "relative",
                    filteredNotifications.length && "cursor-pointer"
                  )}
                >
                  <Bell className="w-5 h-5"></Bell>
                  {notifications.filter((notification) => !notification.isSeen)
                    .length ? (
                    <span className="absolute flex h-2 w-2 rounded-full bg-blue-600 top-0 right-0 " />
                  ) : null}
                </div>
              </DropdownMenuTrigger>

              {filteredNotifications.length ? (
                <DropdownMenuContent className="w-[24rem]">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {filteredNotifications.map((notification) => (
                      <Notificaiton
                        key={notification.id}
                        notification={notification}
                      />
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              ) : null}
            </DropdownMenu>
            <div className="flex gap-4">
              <ModeToggle />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 cursor-pointer">
                  <AvatarImage src={user?.image_file} alt="User Image" />
                  <AvatarFallback>
                    {`${user?.first_name
                      .substring(0, 1)
                      .toLocaleUpperCase()}${user?.last_name
                      .substring(0, 1)
                      .toLocaleUpperCase()}`}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    {`${user?.first_name} ${user?.last_name}`}
                  </DropdownMenuItem>
                  <DropdownMenuItem>{`${user?.email}`}</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      fetch("/api/logout", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }).then(() => router.push("/login"));
                    }}
                  >
                    Log out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Separator />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default Overview;
