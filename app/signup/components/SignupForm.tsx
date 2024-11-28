"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spline, TagIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Tag } from "@/app/types";
import { iconsMap } from "@/app/common";

type Form = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  image_file: string;
  team_id: number;
};

export function SignupForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const [primaryTags, setPrimaryTags] = useState<Tag[]>([]);
  React.useEffect(() => {
    fetch("/api/primaryTags")
      .then((res) => res.json())
      .then((data) => setPrimaryTags(data));
  }, []);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<Form>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    image_file: "",
    team_id: 0,
  });
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) router.push("/login");
      })
      .finally(() => setIsLoading(false));
  }
  const options = primaryTags.map((tag) => ({
    ...tag,
    icon:
      iconsMap.find(
        (item) => item.tagName.toLowerCase() === tag.name.toLowerCase()
      )?.tagIcon ?? TagIcon,
  }));
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  id="firstname"
                  placeholder="First name"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="given-name"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={form.first_name}
                  onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                  }
                />
                <Input
                  id="lastname"
                  placeholder="Last name"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="given-name"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={form.last_name}
                  onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                <Select
                  onValueChange={(e) =>
                    setForm({ ...form, team_id: Number(e) })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Department</SelectLabel>
                      {options.map((option) => (
                        <SelectItem
                          key={option.id}
                          value={option.id.toString()}
                        >
                          <div className="flex gap-2 items-center">
                            <option.icon className="h-4 w-4" />
                            {option.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Image</Label>
                  <Input
                    id="picture"
                    type="file"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        image_file: e.target.files
                          ? e.target.files[0].name
                          : "",
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Spline className="mr-2 h-4 w-4 animate-spin" />}
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}
