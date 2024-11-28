"use client";

import React, { use, useContext, useEffect, useState } from "react";
import { TooltipProvider } from "../ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { Post, Tag } from "@/app/types";
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

interface DashboardProps {
  posts: Post[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize?: number;
}

type Filters = {
  primaryTags: number[];
  secondaryTags: number[];
  bookmarks: boolean;
};

const Dashboard = ({ defaultLayout = [16, 52, 32] }: DashboardProps) => {
  const [primaryTags, setPrimaryTags] = useState<Tag[]>([]);
  const [secondaryTags, setSecondaryTags] = useState<Tag[]>([]);
  const { user } = useUser();
  const [filters, setFilters] = useState<Filters>({
    primaryTags: user?.teamId ? [user.teamId] : [],
    secondaryTags: [],
    bookmarks: false,
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
          <div className="flex h-[52px] justify-center items-center p-4">
            <Logo size={24} />
          </div>
          <Separator />
          <ScrollArea style={{ height: "calc(100vh - 52px)" }}>
            <FilterGroup
              label="Primary Tags"
              options={options}
              defaultSelectedOptions={user?.teamId ? [user.teamId] : []}
              handleChange={(ids) =>
                setFilters({
                  ...filters,
                  primaryTags: ids,
                })
              }
            ></FilterGroup>
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
                  secondaryTags: ids,
                })
              }
            ></FilterGroup>
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
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={24}>
          <div className="flex justify-end gap-4 items-center px-4 py-2">
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
          <div>Ranking and stats</div>
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
