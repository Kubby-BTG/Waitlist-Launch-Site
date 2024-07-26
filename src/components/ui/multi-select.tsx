"use client";

import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useMeasure } from "react-use";

interface ISelectProps {
  values: {
    key: string;
    value: string;
  }[];
  label: string;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultiSelect = ({
  values,
  label,
  selectedItems,
  setSelectedItems,
}: ISelectProps) => {
  const [ref, { width }] = useMeasure<HTMLButtonElement>();

  const handleSelectChange = (value: string) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems((prev) => [...prev, value]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== value));
    }
  };

  const isOptionSelected = (value: string): boolean => {
    return selectedItems.includes(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"w-full"} asChild>
        <button
          ref={ref}
          className="relative flex min-h-12 w-full flex-col items-start rounded-md border border-primary/30 px-4 py-2 text-primary"
        >
          <span className={cn("text-xs font-semibold leading-3")}>{label}</span>
          <span className={"-mb-1 w-full truncate text-start"}>
            {selectedItems.length > 0 &&
            !(selectedItems.length === values.length)
              ? selectedItems.join(", ")
              : "All"}
          </span>

          <span className="absolute inset-y-0 right-2 flex flex-col justify-center text-primary">
            <ChevronDown />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="inset-x-0 max-h-[50vh] w-full space-y-3 overflow-y-auto"
        onCloseAutoFocus={(e) => e.preventDefault()}
        sideOffset={6}
        align={"start"}
        style={{
          width: `${width + 34}px`,
        }}
      >
        <DropdownMenuCheckboxItem
          onSelect={(e) => e.preventDefault()}
          checked={selectedItems.length === values.length}
          onCheckedChange={(checked) =>
            setSelectedItems(checked ? values.map((v) => v.key) : [])
          }
        >
          All
        </DropdownMenuCheckboxItem>
        {values.map((value, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            onSelect={(e) => e.preventDefault()}
            checked={isOptionSelected(value.key)}
            onCheckedChange={() => handleSelectChange(value.key)}
          >
            {value.value}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelect;
