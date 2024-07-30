"use client";

import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function RegisteredPartnership({
  setIsSent,
  isSent,
}: {
  setIsSent: Dispatch<SetStateAction<boolean>>;
  isSent: boolean;
}) {
  return (
    <Dialog onOpenChange={setIsSent} open={isSent}>
      {/* <DialogTrigger asChild>{children}</DialogTrigger> */}

      <DialogContent
        className={cn("flex px-6 py-8 md:max-w-[32.875rem] md:px-8")}
        forceMount={true}
      >
        <div className={"grid gap-8 md:grid-cols-2"}>
          {/* Animation */}
          <div className={"flex items-end"}>
            {/* <video
              src="/animations/kube-on-green.webm"
              autoPlay
              loop
              muted
              className={"pointer-events-none h-full object-cover"}
            ></video> */}
          </div>

          <div className="flex flex-col justify-end gap-2 md:pt-8">
            <h1
              className={
                "w-full font-display text-[2rem] uppercase leading-[2.5rem] text-primary max-md:text-center md:text-[3.25rem] md:leading-[3.5rem]"
              }
            >
              INterest Register
            </h1>

            <p className={"text-sm text-black max-md:text-center"}>
              You should receive an email confirmation shortly. We will be in
              touch.
            </p>

            <DialogClose asChild onClick={() => setIsSent(false)}>
              <Button>Okay</Button>
            </DialogClose>
          </div>
        </div>

        {/* Sent state */}
      </DialogContent>
    </Dialog>
  );
}
