"use client";
import React, { useState } from "react";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DefaultClassGroupIds } from "tailwind-merge";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface Props {
  options: {
    id: number;
    title: string;
    icon: LucideIcon;
  }[];
  defaultSelectedOptions?: number[];
  label: string;
}

const FilterGroup = ({ options, defaultSelectedOptions, label }: Props) => {
  const [selectedOps, setSelectedOps] = useState<number[]>(
    defaultSelectedOptions ?? []
  );
  return (
    <div className="group flex flex-col gap-2 py-2 px-2">
      <h2 className="text-md font-semibold">{label}</h2>
      <nav className="grid gap-1">
        {options.map((option, index) => {
          return (
            <Button
              className=" justify-start"
              variant={
                selectedOps.findIndex((op) => op === option.id) === -1
                  ? "outline"
                  : "secondary"
              }
              key={option.id}
            >
              <div className="flex w-full justify-between">
                <div className="flex gap-2">
                  <option.icon className="h-4 w-4" />
                  {option.title}
                </div>
                <Checkbox
                  checked={
                    selectedOps.findIndex((op) => op === option.id) !== -1
                  }
                  onClick={() => {
                    const isChecked =
                      selectedOps.findIndex((op) => op === option.id) !== -1;
                    if (isChecked)
                      setSelectedOps(
                        selectedOps.filter((op) => op !== option.id)
                      );
                    else setSelectedOps([...selectedOps, option.id]);
                  }}
                />
              </div>
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default FilterGroup;