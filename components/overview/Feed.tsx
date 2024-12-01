import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import FeedItem from "./FeedItem";
import Image from "next/image";
import Filler from "@/public/filler.jpg";
import Raisa from "@/public/raisa.png";
import model from "@/public/Picture1.png";
import Link from "next/link";
import { Separator } from "../ui/separator";

const Feed = () => {
  return (
    <ScrollArea style={{ height: "calc(100vh - 52px)" }}>
      <div className="flex flex-col gap-4 px-4 py-2">
        <div className="flex justify-center">
          <Image src={Raisa} alt="hello" width={200} />
        </div>
        <div>
          <p className="font-bold">About Us</p>
          <p>
            Founded in 2014, Raisa is a Denver-based company with a key
            technology hub in Cairo. We have established a differentiated
            investment platform for the energy sector, managing over $2 billion
            in investments.
          </p>
        </div>
        <div>
          <p className="font-bold">Mission</p>
          <p>
            Our mission is to set the standard for energy investments by
            accurately assessing and valuing risk in real-time. To achieve this,
            we are constantly enhancing our technology platform, which
            integrates automation, AI, and Big Data. This platform serves as an
            exoskeleton for our energy subject matter experts, empowering them
            to make informed decisions. Our work thrives at the intersection of
            Oil & Gas (O&G), Finance, and Technology.
          </p>
        </div>
        <div className="m-10">
          <Separator />
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <p className="font-bold">Our Systems</p>
            <p>
              <Link
                className="underline underline-offset-2 text-blue-600"
                href="http://apps.raisa.com/jarvis/home/"
              >
                Asset Management System
              </Link>
            </p>
            <p>
              <Link
                className="underline underline-offset-2 text-blue-600"
                href="http://apps.raisa.com/trailhead/"
              >
                Evaluation & Forecasting System
              </Link>
            </p>
            <p>
              :
              <Link
                className="underline underline-offset-2 text-blue-600"
                href="https://app.powerbi.com/groups/83cb3c6e-fe5e-471c-9b1a-66383b8c3d6f/list?ctid=d5ae53bd-dc2c-491a-ab98-4dd769498190&experience=power-bi"
              >
                Power PI Dashboard
              </Link>
            </p>
            <p>
              <Link
                className="underline underline-offset-2 text-blue-600"
                href="https://zq14569.east-us-2.azure.snowflakecomputing.com/"
              >
                Snowflake
              </Link>
            </p>
          </div>
          <div>
            <p className="font-bold">Tech Stack</p>
            <ul>
              <li>Dev: Asp.net C#, SQL server, React JS, C#, EF core</li>
              <li>DE: Python, SQL, Snowflake, dbt, PowerBI</li>
              <li>
                DS: Python, SQL, Matplotlib, seaborn or plotly for
                visualization, TensorFlow or Pytorch for deep learning, Power BI
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Image src={model} alt=""></Image>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Feed;
