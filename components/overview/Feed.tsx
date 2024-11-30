import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import FeedItem from "./FeedItem";

const Feed = () => {
  return (
    <ScrollArea style={{ height: "calc(100vh - 52px)" }}>
      <div className="flex flex-col gap-2 px-4 py-2">
        <FeedItem title="Hello world" tags={["One", "Two", "Three"]}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          sequi labore doloribus, modi accusamus possimus dolor perspiciatis
          quisquam rerum. Porro excepturi quisquam sed at similique eaque rem
          facilis nulla quis? Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Aliquam sequi labore doloribus, modi accusamus
          possimus dolor perspiciatis quisquam rerum. Porro excepturi quisquam
          sed at similique eaque rem facilis nulla quis? Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Aliquam sequi labore doloribus,
          modi accusamus possimus dolor perspiciatis quisquam rerum. Porro
          excepturi quisquam sed at similique eaque rem facilis nulla quis?
        </FeedItem>
        <FeedItem title="Hello world" tags={["One", "Two", "Three"]}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          sequi labore doloribus, modi accusamus possimus dolor perspiciatis
          quisquam rerum. Porro excepturi quisquam sed at similique eaque rem
          facilis nulla quis? Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Aliquam sequi labore doloribus, modi accusamus
          possimus dolor perspiciatis quisquam rerum. Porro excepturi quisquam
          sed at similique eaque rem facilis nulla quis? Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Aliquam sequi labore doloribus,
          modi accusamus possimus dolor perspiciatis quisquam rerum. Porro
          excepturi quisquam sed at similique eaque rem facilis nulla quis?
        </FeedItem>
      </div>
    </ScrollArea>
  );
};

export default Feed;
