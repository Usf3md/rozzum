"use client";
import { useUser } from "./context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Overview from "@/components/overview/overview";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useUser();
  useEffect(() => {
    fetch("/api/me", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .finally(() => setIsLoading(false));
  }, []);
  const router = useRouter();
  if (!isLoading && user === undefined) router.push("/login");

  return (
    !isLoading && (
      <div className="h-svh flex-col flex">
        <Overview posts={[]} defaultLayout={undefined}></Overview>
      </div>
    )
  );
}
