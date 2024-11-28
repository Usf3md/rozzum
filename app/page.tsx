"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import { useUser } from "./context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
        <Dashboard posts={[]} defaultLayout={undefined}></Dashboard>
      </div>
    )
  );
}
