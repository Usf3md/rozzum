"use client";

import React from "react";
import { TooltipProvider } from "../ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { Post } from "@/app/types";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import FilterGroup from "./FilterGroup";
import {
  Inbox,
  Send,
  File,
  ArchiveX,
  Trash2,
  Archive,
  Search,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import PostsList from "./PostsList";
import Logo from "../Logo";
import { ModeToggle } from "../ModeToggle";
import { ScrollArea } from "../ui/scroll-area";

interface DashboardProps {
  posts: Post[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize?: number;
}

const options = [
  {
    id: 0,
    title: "Inbox",
    icon: Inbox,
  },
  {
    id: 1,
    title: "Drafts",
    icon: File,
  },
  {
    id: 2,
    title: "Sent",
    icon: Send,
  },
  {
    id: 3,
    title: "Junk",
    icon: ArchiveX,
  },
  {
    id: 4,
    title: "Trash",
    icon: Trash2,
  },
  {
    id: 5,
    title: "Archive",
    icon: Archive,
  },
];

const posts: Post[] = [
  {
    id: 0,
    title: "What is this?",
    author: "Youssef Emad",
    imageURL: "",
    postBody:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi veritatis saepe iure eius aliquam cupiditate iste officia debitis, vel, ut atque harum, nesciunt voluptatem? Libero cumque molestias velit expedita inventore. Ad ea dolore expedita ullam vel consectetur error consequuntur soluta, odit alias quam voluptatibus neque facere maxime optio. Molestias dolorem cupiditate aliquam ducimus iure fugiat non, necessitatibus officiis sit est. Suscipit rerum molestiae adipisci dicta aliquam neque molestias laborum ipsam saepe fugit animi odio porro magnam tempore facilis, ad perspiciatis. Accusantium excepturi harum ea optio quod. Harum ad provident nam? Eum repellat, suscipit velit ullam repellendus numquam officiis debitis quia culpa commodi consequuntur exercitationem ipsam error aut asperiores illum odio tempora veniam nihil voluptate eos in. Itaque impedit recusandae hic! Ab vel ducimus tenetur tempora neque culpa, quae aspernatur nesciunt corporis? Dolorem repellendus a, veritatis et cumque obcaecati consectetur. Provident error voluptatum sunt ratione neque eos consequuntur, hic quidem quasi. Maiores deleniti laudantium consequatur nemo eligendi? Accusamus numquam asperiores amet sint praesentium ea distinctio assumenda magni, consequatur facilis quidem, quisquam labore nam modi eum impedit a. Libero quam temporibus ad! Sint rerum assumenda reiciendis officia quos excepturi adipisci, dolorem accusantium maiores vel odio, nesciunt similique harum non maxime. Maxime qui eos a vel facilis minima tenetur expedita laboriosam, magnam ipsa! Fugiat iure nisi itaque explicabo, vero incidunt beatae? Aut consequuntur debitis cupiditate facilis aperiam placeat ipsum numquam enim fugit perferendis, suscipit quo. Ullam facere ipsum perspiciatis ipsam quas labore fugit. Quisquam rerum fugit, dolor corrupti officiis aliquam quam dolore, suscipit obcaecati dolorum autem repellendus quos odit! Obcaecati pariatur, delectus nam eligendi ab, atque neque consequatur, consectetur nulla possimus at officia? Dolore repellat possimus id vel esse quasi numquam aliquid reprehenderit nihil quod explicabo eligendi soluta iste qui asperiores, unde placeat. Soluta excepturi unde, laborum maiores iusto ipsum nam debitis ad?",
    tags: ["Hello", "World", "Hello", "World"],
    Likes: 50,
    liked: true,
    read: true,
    date: new Date(),
  },
  {
    id: 1,
    title: "What is this?",
    author: "Youssef Emad",
    imageURL: "",
    postBody:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi veritatis saepe iure eius aliquam cupiditate iste officia debitis, vel, ut atque harum, nesciunt voluptatem? Libero cumque molestias velit expedita inventore. Ad ea dolore expedita ullam vel consectetur error consequuntur soluta, odit alias quam voluptatibus neque facere maxime optio. Molestias dolorem cupiditate aliquam ducimus iure fugiat non, necessitatibus officiis sit est. Suscipit rerum molestiae adipisci dicta aliquam neque molestias laborum ipsam saepe fugit animi odio porro magnam tempore facilis, ad perspiciatis. Accusantium excepturi harum ea optio quod. Harum ad provident nam? Eum repellat, suscipit velit ullam repellendus numquam officiis debitis quia culpa commodi consequuntur exercitationem ipsam error aut asperiores illum odio tempora veniam nihil voluptate eos in. Itaque impedit recusandae hic! Ab vel ducimus tenetur tempora neque culpa, quae aspernatur nesciunt corporis? Dolorem repellendus a, veritatis et cumque obcaecati consectetur. Provident error voluptatum sunt ratione neque eos consequuntur, hic quidem quasi. Maiores deleniti laudantium consequatur nemo eligendi? Accusamus numquam asperiores amet sint praesentium ea distinctio assumenda magni, consequatur facilis quidem, quisquam labore nam modi eum impedit a. Libero quam temporibus ad! Sint rerum assumenda reiciendis officia quos excepturi adipisci, dolorem accusantium maiores vel odio, nesciunt similique harum non maxime. Maxime qui eos a vel facilis minima tenetur expedita laboriosam, magnam ipsa! Fugiat iure nisi itaque explicabo, vero incidunt beatae? Aut consequuntur debitis cupiditate facilis aperiam placeat ipsum numquam enim fugit perferendis, suscipit quo. Ullam facere ipsum perspiciatis ipsam quas labore fugit. Quisquam rerum fugit, dolor corrupti officiis aliquam quam dolore, suscipit obcaecati dolorum autem repellendus quos odit! Obcaecati pariatur, delectus nam eligendi ab, atque neque consequatur, consectetur nulla possimus at officia? Dolore repellat possimus id vel esse quasi numquam aliquid reprehenderit nihil quod explicabo eligendi soluta iste qui asperiores, unde placeat. Soluta excepturi unde, laborum maiores iusto ipsum nam debitis ad?",
    tags: ["Hello", "World"],
    Likes: 50,
    liked: false,
    read: false,
    date: new Date(),
  },
  {
    id: 2,
    title: "What is this?",
    author: "Youssef Emad",
    imageURL: "",
    postBody:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi veritatis saepe iure eius aliquam cupiditate iste officia debitis, vel, ut atque harum, nesciunt voluptatem? Libero cumque molestias velit expedita inventore. Ad ea dolore expedita ullam vel consectetur error consequuntur soluta, odit alias quam voluptatibus neque facere maxime optio. Molestias dolorem cupiditate aliquam ducimus iure fugiat non, necessitatibus officiis sit est. Suscipit rerum molestiae adipisci dicta aliquam neque molestias laborum ipsam saepe fugit animi odio porro magnam tempore facilis, ad perspiciatis. Accusantium excepturi harum ea optio quod. Harum ad provident nam? Eum repellat, suscipit velit ullam repellendus numquam officiis debitis quia culpa commodi consequuntur exercitationem ipsam error aut asperiores illum odio tempora veniam nihil voluptate eos in. Itaque impedit recusandae hic! Ab vel ducimus tenetur tempora neque culpa, quae aspernatur nesciunt corporis? Dolorem repellendus a, veritatis et cumque obcaecati consectetur. Provident error voluptatum sunt ratione neque eos consequuntur, hic quidem quasi. Maiores deleniti laudantium consequatur nemo eligendi? Accusamus numquam asperiores amet sint praesentium ea distinctio assumenda magni, consequatur facilis quidem, quisquam labore nam modi eum impedit a. Libero quam temporibus ad! Sint rerum assumenda reiciendis officia quos excepturi adipisci, dolorem accusantium maiores vel odio, nesciunt similique harum non maxime. Maxime qui eos a vel facilis minima tenetur expedita laboriosam, magnam ipsa! Fugiat iure nisi itaque explicabo, vero incidunt beatae? Aut consequuntur debitis cupiditate facilis aperiam placeat ipsum numquam enim fugit perferendis, suscipit quo. Ullam facere ipsum perspiciatis ipsam quas labore fugit. Quisquam rerum fugit, dolor corrupti officiis aliquam quam dolore, suscipit obcaecati dolorum autem repellendus quos odit! Obcaecati pariatur, delectus nam eligendi ab, atque neque consequatur, consectetur nulla possimus at officia? Dolore repellat possimus id vel esse quasi numquam aliquid reprehenderit nihil quod explicabo eligendi soluta iste qui asperiores, unde placeat. Soluta excepturi unde, laborum maiores iusto ipsum nam debitis ad?",
    tags: ["Hello", "World"],
    Likes: 50,
    liked: false,
    read: true,
    date: new Date(),
  },
  {
    id: 3,
    title: "What is this?",
    author: "Youssef Emad",
    imageURL: "",
    postBody:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi veritatis saepe iure eius aliquam cupiditate iste officia debitis, vel, ut atque harum, nesciunt voluptatem? Libero cumque molestias velit expedita inventore. Ad ea dolore expedita ullam vel consectetur error consequuntur soluta, odit alias quam voluptatibus neque facere maxime optio. Molestias dolorem cupiditate aliquam ducimus iure fugiat non, necessitatibus officiis sit est. Suscipit rerum molestiae adipisci dicta aliquam neque molestias laborum ipsam saepe fugit animi odio porro magnam tempore facilis, ad perspiciatis. Accusantium excepturi harum ea optio quod. Harum ad provident nam? Eum repellat, suscipit velit ullam repellendus numquam officiis debitis quia culpa commodi consequuntur exercitationem ipsam error aut asperiores illum odio tempora veniam nihil voluptate eos in. Itaque impedit recusandae hic! Ab vel ducimus tenetur tempora neque culpa, quae aspernatur nesciunt corporis? Dolorem repellendus a, veritatis et cumque obcaecati consectetur. Provident error voluptatum sunt ratione neque eos consequuntur, hic quidem quasi. Maiores deleniti laudantium consequatur nemo eligendi? Accusamus numquam asperiores amet sint praesentium ea distinctio assumenda magni, consequatur facilis quidem, quisquam labore nam modi eum impedit a. Libero quam temporibus ad! Sint rerum assumenda reiciendis officia quos excepturi adipisci, dolorem accusantium maiores vel odio, nesciunt similique harum non maxime. Maxime qui eos a vel facilis minima tenetur expedita laboriosam, magnam ipsa! Fugiat iure nisi itaque explicabo, vero incidunt beatae? Aut consequuntur debitis cupiditate facilis aperiam placeat ipsum numquam enim fugit perferendis, suscipit quo. Ullam facere ipsum perspiciatis ipsam quas labore fugit. Quisquam rerum fugit, dolor corrupti officiis aliquam quam dolore, suscipit obcaecati dolorum autem repellendus quos odit! Obcaecati pariatur, delectus nam eligendi ab, atque neque consequatur, consectetur nulla possimus at officia? Dolore repellat possimus id vel esse quasi numquam aliquid reprehenderit nihil quod explicabo eligendi soluta iste qui asperiores, unde placeat. Soluta excepturi unde, laborum maiores iusto ipsum nam debitis ad?",
    tags: ["Hello", "World"],
    Likes: 50,
    liked: false,
    read: false,
    date: new Date(),
  },
  {
    id: 4,
    title: "What is this?",
    author: "Youssef Emad",
    imageURL: "",
    postBody:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi veritatis saepe iure eius aliquam cupiditate iste officia debitis, vel, ut atque harum, nesciunt voluptatem? Libero cumque molestias velit expedita inventore. Ad ea dolore expedita ullam vel consectetur error consequuntur soluta, odit alias quam voluptatibus neque facere maxime optio. Molestias dolorem cupiditate aliquam ducimus iure fugiat non, necessitatibus officiis sit est. Suscipit rerum molestiae adipisci dicta aliquam neque molestias laborum ipsam saepe fugit animi odio porro magnam tempore facilis, ad perspiciatis. Accusantium excepturi harum ea optio quod. Harum ad provident nam? Eum repellat, suscipit velit ullam repellendus numquam officiis debitis quia culpa commodi consequuntur exercitationem ipsam error aut asperiores illum odio tempora veniam nihil voluptate eos in. Itaque impedit recusandae hic! Ab vel ducimus tenetur tempora neque culpa, quae aspernatur nesciunt corporis? Dolorem repellendus a, veritatis et cumque obcaecati consectetur. Provident error voluptatum sunt ratione neque eos consequuntur, hic quidem quasi. Maiores deleniti laudantium consequatur nemo eligendi? Accusamus numquam asperiores amet sint praesentium ea distinctio assumenda magni, consequatur facilis quidem, quisquam labore nam modi eum impedit a. Libero quam temporibus ad! Sint rerum assumenda reiciendis officia quos excepturi adipisci, dolorem accusantium maiores vel odio, nesciunt similique harum non maxime. Maxime qui eos a vel facilis minima tenetur expedita laboriosam, magnam ipsa! Fugiat iure nisi itaque explicabo, vero incidunt beatae? Aut consequuntur debitis cupiditate facilis aperiam placeat ipsum numquam enim fugit perferendis, suscipit quo. Ullam facere ipsum perspiciatis ipsam quas labore fugit. Quisquam rerum fugit, dolor corrupti officiis aliquam quam dolore, suscipit obcaecati dolorum autem repellendus quos odit! Obcaecati pariatur, delectus nam eligendi ab, atque neque consequatur, consectetur nulla possimus at officia? Dolore repellat possimus id vel esse quasi numquam aliquid reprehenderit nihil quod explicabo eligendi soluta iste qui asperiores, unde placeat. Soluta excepturi unde, laborum maiores iusto ipsum nam debitis ad?",
    tags: ["Hello", "World"],
    Likes: 50,
    liked: true,
    read: true,
    date: new Date(),
  },
  {
    id: 5,
    title: "What is this?",
    author: "Youssef Emad",
    imageURL: "",
    postBody:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi veritatis saepe iure eius aliquam cupiditate iste officia debitis, vel, ut atque harum, nesciunt voluptatem? Libero cumque molestias velit expedita inventore. Ad ea dolore expedita ullam vel consectetur error consequuntur soluta, odit alias quam voluptatibus neque facere maxime optio. Molestias dolorem cupiditate aliquam ducimus iure fugiat non, necessitatibus officiis sit est. Suscipit rerum molestiae adipisci dicta aliquam neque molestias laborum ipsam saepe fugit animi odio porro magnam tempore facilis, ad perspiciatis. Accusantium excepturi harum ea optio quod. Harum ad provident nam? Eum repellat, suscipit velit ullam repellendus numquam officiis debitis quia culpa commodi consequuntur exercitationem ipsam error aut asperiores illum odio tempora veniam nihil voluptate eos in. Itaque impedit recusandae hic! Ab vel ducimus tenetur tempora neque culpa, quae aspernatur nesciunt corporis? Dolorem repellendus a, veritatis et cumque obcaecati consectetur. Provident error voluptatum sunt ratione neque eos consequuntur, hic quidem quasi. Maiores deleniti laudantium consequatur nemo eligendi? Accusamus numquam asperiores amet sint praesentium ea distinctio assumenda magni, consequatur facilis quidem, quisquam labore nam modi eum impedit a. Libero quam temporibus ad! Sint rerum assumenda reiciendis officia quos excepturi adipisci, dolorem accusantium maiores vel odio, nesciunt similique harum non maxime. Maxime qui eos a vel facilis minima tenetur expedita laboriosam, magnam ipsa! Fugiat iure nisi itaque explicabo, vero incidunt beatae? Aut consequuntur debitis cupiditate facilis aperiam placeat ipsum numquam enim fugit perferendis, suscipit quo. Ullam facere ipsum perspiciatis ipsam quas labore fugit. Quisquam rerum fugit, dolor corrupti officiis aliquam quam dolore, suscipit obcaecati dolorum autem repellendus quos odit! Obcaecati pariatur, delectus nam eligendi ab, atque neque consequatur, consectetur nulla possimus at officia? Dolore repellat possimus id vel esse quasi numquam aliquid reprehenderit nihil quod explicabo eligendi soluta iste qui asperiores, unde placeat. Soluta excepturi unde, laborum maiores iusto ipsum nam debitis ad?",
    tags: ["Hello", "World"],
    Likes: 50,
    liked: false,
    read: false,
    date: new Date(),
  },
];

const Dashboard = ({ defaultLayout = [20, 32, 48] }: DashboardProps) => {
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
              defaultSelectedOptions={[]}
            ></FilterGroup>
            <Separator />
            <FilterGroup
              label="Secondary Tags"
              options={options}
              defaultSelectedOptions={[]}
            ></FilterGroup>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center px-4 py-2">
              <h1 className="text-xl font-bold">Posts</h1>
              <div className="flex gap-4">
                <TabsList>
                  <TabsTrigger
                    value="all"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    All posts
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    Unread
                  </TabsTrigger>
                </TabsList>
                <ModeToggle />
              </div>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <PostsList posts={posts} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <PostsList posts={posts.filter((post) => !post.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default Dashboard;
