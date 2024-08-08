"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Calendar from "./Calendar";

export default function AppDatePicker({
  date,
  placeholder,
  handleDateChange,
}: {
  placeholder?: string;
  date?: string | null;
  handleDateChange: (date: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={() => setOpen((p) => !p)}>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn([
            "justify-start text-left font-normal",
            !date && "text-muted-foreground",
            "",
            "focus-visible:ring-ring flex h-10 w-full rounded-md border border-input bg-input-secondary px-3",
            "py-2.5 text-sm ring-offset-background-secondary file:border-0 file:bg-transparent file:text-sm",
            "file:font-medium placeholder:text-input-foreground focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          ])}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy-MM-dd") : <span>{placeholder || "Pick a date"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-white p-0" align="start">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : new Date()}
          onSelect={(d) => {
            handleDateChange(d ? format(d, "yyyy-MM-dd") : "");
            setOpen(false);
          }}
          initialFocus={true}
        />
      </PopoverContent>
    </Popover>
  );
}
