"use client";

import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import PinIcon from "../map/pin-icon";

export default function ShowDeliveryNearYouForm({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  const [zipcode, setZipcode] = useState("");

  const submitDelivery = () => {
    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent
        className={cn("flex px-6 py-8 md:max-w-[26rem] md:px-8", isOpen ? "_max-w-[17.5rem] _max-md:w-[calc(100vw-6.5rem)]" : "")}
      >
        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className={"flex w-full flex-col gap-4"}>
          <div className="flex w-full items-center gap-8">
            <h1 className={"flex w-full items-center gap-2 text-base font-bold"}>
              <PinIcon className={"size-5"} /> Show delivery near you with
            </h1>
            <DialogClose
              className={"flex size-8 flex-none items-center justify-center rounded-full bg-input-secondary text-black"}
            >
              <span className="sr-only">Close</span>
              <X className={"size-4"} />
            </DialogClose>
          </div>

          <div className={"flex w-full flex-col gap-1"}>
            <label htmlFor="zipcode" className={"text-sm text-black"}>
              Zipcode
            </label>
            <Input
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              id={"city"}
              required
              placeholder={"Zipcode"}
            />
          </div>

          <Button
            type={"button"}
            onClick={(e) => {
              e.preventDefault();
              submitDelivery();
            }}
          >
            Show Issues
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
