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
import FilterGroup from "./FilterGroup";
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
import PostsList from "./PostsList";
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
import CreatePostDialog from "./CreatePostDialog";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import Notificaiton from "./Notification";

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

const Dashboard = ({ defaultLayout = [16, 64, 20] }: DashboardProps) => {
  const [primaryTags, setPrimaryTags] = useState<Tag[]>([]);
  const [secondaryTags, setSecondaryTags] = useState<Tag[]>([]);
  const [popularTags, setPopularTags] = useState<PopularTag[]>([]);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const filteredNotifications = notifications.filter(
    (notification) => !notification.isSeen
  );
  const { user } = useUser();
  const [filters, setFilters] = useState<Filters>({
    primaryTagIds: user?.teamId ? [user.teamId] : [],
    secondaryTagIds: [],
    bookmarked: false,
  });
  useEffect(() => {
    fetch("/api/primaryTags")
      .then((res) => res.json())
      .then((data) => setPrimaryTags(data));
  }, []);
  useEffect(() => {
    fetch("/api/secondaryTags")
      .then((res) => res.json())
      .then((data) => setSecondaryTags(data));
  }, []);
  useEffect(() => {
    fetch("/api/popularTags")
      .then((res) => res.json())
      .then((data) => setPopularTags(data));
  }, []);
  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, []);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const options = primaryTags.map((tag) => ({
    ...tag,
    icon:
      iconsMap.find(
        (item) => item.tagName.toLowerCase() === tag.name.toLowerCase()
      )?.tagIcon ?? TagIcon,
  }));
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
          <ScrollArea style={{ height: "calc(100vh - 52px)" }}>
            <div className="mt-4 flex justify-between px-2 items-center">
              <h2 className="text-md font-semibold">Bookmarks</h2>
              <Button
                variant={filters.bookmarked ? "secondary" : "outline"}
                onClick={() =>
                  setFilters({ ...filters, bookmarked: !filters.bookmarked })
                }
              >
                <Bookmark
                  className={cn(
                    "h-5 w-5 fill-transparent transition-all ease-in-out",
                    filters.bookmarked && "fill-amber-400"
                  )}
                />
              </Button>
            </div>
            <Separator className="my-2 " />
            <FilterGroup
              label="Primary Tags"
              options={options}
              defaultSelectedOptions={user?.teamId ? [user.teamId] : []}
              handleChange={(ids) =>
                setFilters({
                  ...filters,
                  primaryTagIds: ids,
                })
              }
            />
            <Separator className="my-2 " />
            <FilterGroup
              label="Secondary Tags"
              options={secondaryTags.map((tag) => ({
                ...tag,
                icon: TagIcon,
              }))}
              defaultSelectedOptions={[]}
              handleChange={(ids) =>
                setFilters({
                  ...filters,
                  secondaryTagIds: ids,
                })
              }
            />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className=" h-[52px] flex justify-between items-center px-4 py-2">
            <h1 className="text-xl font-bold">Posts</h1>
            <CreatePostDialog
              primaryTags={primaryTags}
              secondaryTags={secondaryTags}
            />
          </div>
          <Separator />
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
          <PostsProvider>
            <PostsShell searchQuery={searchQuery} filters={filters} />
          </PostsProvider>
        </ResizablePanel>
        <ResizableHandle withHandle />
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
          <div className="flex gap-1 flex-wrap p-4">
            {popularTags.map((tag) => (
              <Badge key={tag.id}>
                <div className="flex gap-2">
                  <span>{tag.name}</span>
                  <span>{tag.totalLikes}</span>
                </div>
              </Badge>
            ))}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

const PostsShell = ({
  searchQuery,
  filters,
}: {
  searchQuery: string;
  filters: Filters;
}) => {
  const { posts, setPosts } = usePosts();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .finally(() => setIsLoading(false));
  }, [filters]);

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  return (
    <PostsList
      posts={posts
        .filter(
          (post) =>
            `${post.authorFullName} ${post.title} ${
              post.body
            } ${post.secondaryTags.join(" ")}`
              .toLowerCase()
              .indexOf(searchQuery.toLowerCase()) !== -1
        )
        .reverse()}
    />
  );
};

export default Dashboard;
