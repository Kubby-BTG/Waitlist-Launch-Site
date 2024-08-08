"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, formatISO, parseISO } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Calendar from "./Calendar";

const monthsObj: Record<string, string> = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

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

  function handleDateChangeConvertToFormat(date: Date | undefined) {
    if (date) {
      const datePart = formatISO(date, { representation: "date" });
      handleDateChange(datePart);
    } else {
      handleDateChange("");
    }
    setOpen(false);
  }

  function parseDateView(date: string | undefined) {
    if (date && typeof date === "string") {
      const [yyyy, mm, dd] = date?.split("T")[0]?.split("-");
      return `${dd} ${monthsObj[mm]}, ${yyyy}`;
    }
    return "";
  }

  function handleDateChangeConvertToFormat__(date: Date | undefined) {
    if (date) {
      const dt = new Date(date);
      const datePart = [
        dt.getFullYear().toString().padStart(4, "0"),
        (dt.getMonth() + 1).toString().padStart(2, "0"),
        dt.getDate().toString().padStart(2, "0"),
        //
      ].join("-");
      // handleDateChange(d ? format(d, "yyyy-MM-dd") : "");
      handleDateChange(datePart);
    } else {
      handleDateChange("");
    }
    setOpen(false);
  }

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
          {date ? parseDateView(date) : <span>{placeholder || "Pick a date"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-white p-0" align="start">
        <Calendar
          mode="single"
          selected={date ? parseISO(date) : new Date()}
          onSelect={(d) => handleDateChangeConvertToFormat(d)}
          initialFocus={false}
        />
      </PopoverContent>
    </Popover>
  );
}
