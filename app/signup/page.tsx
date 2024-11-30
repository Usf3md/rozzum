"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SignupForm } from "./components/SignupForm";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import Logo from "@/components/Logo";
import gif from "@/public/rozzum.gif";

export default function AuthenticationPage() {
  const router = useRouter();
  const { setUser } = useUser();
  useEffect(() => {
    fetch("/api/me", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .then(() => router.push("/"));
  }, []);
  return (
    <div className="h-screen flex items-center w-full">
      <div
        className="h-full flex-col bg-muted p-10 lg:flex w-1/2"
        style={{
          backgroundImage: `url('${gif.src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 0 ",
        }}
      ></div>
      <div className="p-8 w-1/2 relative h-screen flex items-center justify-center">
        <div className="absolute left-8 top-8 flex h-[52px] items-center p-4 gap-2">
          <Logo size={28} />
          <h1 className="text-xl font-bold">Rozzum</h1>
        </div>
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-8 top-8"
          )}
        >
          Log in
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create a new account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your info below to sign up
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
