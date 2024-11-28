import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tag } from "@/app/types";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import RichTextEditor from "../text-editor";

type Props = {
  primaryTags: Tag[];
  secondaryTags: Tag[];
};

type Form = {
  title: string;
  body: string;
  primaryTags: number[];
  secondaryTags: string[];
};

const CreatePostDialog = ({ primaryTags, secondaryTags }: Props) => {
  const [tempTag, setTempTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<Form>({
    title: "",
    body: "",
    primaryTags: [],
    secondaryTags: [],
  });
  console.log(form);
  async function handleSubmit() {
    setIsSubmitting(true);
    fetch("/api/postsadd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).finally(() => {
      window.location.reload();
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle /> New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[40rem]">
        <DialogHeader>
          <DialogTitle>New Post</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Title</Label>
            <Input
              id="title"
              placeholder="Your title here..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Body</Label>
            <RichTextEditor
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Primary tags</Label>
            <Select
              value={""}
              onValueChange={(e) => {
                const num = Number(e);
                if (form.primaryTags.find((id) => num === id)) return;
                setForm({
                  ...form,
                  primaryTags: [...form.primaryTags, num],
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select primary tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tags</SelectLabel>
                  {primaryTags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id.toString()}>
                      {tag.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex gap-1">
              {form.primaryTags
                .map((tag) => primaryTags.find((t) => t.id === tag))
                .map((tag) => (
                  <Badge
                    className="cursor-pointer"
                    variant={"secondary"}
                    onClick={() => {
                      setForm({
                        ...form,
                        primaryTags: form.primaryTags.filter(
                          (id) => id !== tag?.id
                        ),
                      });
                    }}
                    key={tag?.id}
                  >
                    {tag?.name}
                  </Badge>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Secondary tags</Label>
            <div className="flex gap-2">
              <Input
                id="secondaryTags"
                placeholder="Your secondary tag here..."
                value={tempTag}
                onChange={(e) => setTempTag(e.target.value)}
              />
              <Button
                variant={"secondary"}
                onClick={() => {
                  if (
                    form.secondaryTags.find(
                      (tag) => tempTag.toLowerCase() === tag.toLowerCase()
                    ) === undefined
                  )
                    setForm({
                      ...form,
                      secondaryTags: [
                        ...form.secondaryTags,
                        tempTag.toUpperCase(),
                      ],
                    });

                  setTempTag("");
                }}
              >
                Add
              </Button>
            </div>
            <div className="flex gap-1">
              {form.secondaryTags.map((tag) => (
                <Badge
                  className="cursor-pointer"
                  variant={"secondary"}
                  onClick={() => {
                    setForm({
                      ...form,
                      secondaryTags: form.secondaryTags.filter(
                        (t) => t.toLowerCase() !== tag.toLowerCase()
                      ),
                    });
                  }}
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
