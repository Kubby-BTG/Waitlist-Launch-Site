"use client";

import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";
import { X } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  Fragment,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import FilterIcon from "../map/filter-icon";
import {
  deliveryCompanies,
  deliveryIssues,
  usStates,
} from "@/lib/selection-data";
import PinIcon from "../map/pin-icon";

export default function ShowDeliveryNearYouForm({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      {/* <DialogTrigger asChild>{children}</DialogTrigger> */}

      <DialogContent
        className={cn(
          "flex px-6 py-8 md:max-w-[26rem] md:px-8",
          isOpen ? "_max-w-[17.5rem] _max-md:w-[calc(100vw-6.5rem)]" : "",
        )}
      >
        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
          className={"flex w-full flex-col gap-4"}
        >
          <div className="flex w-full items-center gap-8">
            <h1
              className={"flex w-full items-center gap-2 text-base font-bold"}
            >
              <PinIcon className={"size-5"} /> Show delivery near you with
            </h1>
            <DialogClose
              className={
                "flex size-8 flex-none items-center justify-center rounded-full bg-input-secondary text-black"
              }
            >
              <span className="sr-only">Close</span>
              <X className={"size-4"} />
            </DialogClose>
          </div>

          <div className={"flex w-full flex-col gap-1"}>
            <label htmlFor="zipcode" className={"text-sm text-black"}>
              Zipcode
            </label>
            <Input type="text" id={"city"} required placeholder={"Zipcode"} />
          </div>

          <Button type={"submit"}>Show Issues</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}