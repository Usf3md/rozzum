"use client";
import { UserProvider } from "@/app/context/UserContext";

const UserProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default UserProviderWrapper;
