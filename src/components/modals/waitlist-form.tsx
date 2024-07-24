"use client";

import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";
import { X } from "lucide-react";
import { FormEvent, Fragment, ReactNode, useState } from "react";
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

export default function WaitlistForm({ children }: { children: ReactNode }) {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSent(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className={"flex px-6 py-8 md:px-8"}>
        {/* Filling state */}
        {!isSent ? (
          <>
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className={"flex w-full flex-col gap-4"}
            >
              <div className="flex w-full items-center gap-8">
                <h1
                  className={
                    "w-full font-display text-[2rem] uppercase leading-[2.5rem] text-primary"
                  }
                >
                  Join Our Waitlist
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
                <label htmlFor="email" className={"text-sm text-black"}>
                  Email
                </label>
                <Input
                  type="email"
                  id={"email"}
                  required
                  placeholder={"Your email"}
                />
              </div>

              <div className={"flex w-full flex-col gap-1"}>
                <label htmlFor="reason" className={"text-sm text-black"}>
                  Reason For Joining
                </label>
                <Select required>
                  <SelectTrigger className="w-full" id={"reason"}>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {reasonsForJoining.map((issue, i) => (
                      <Fragment key={i}>
                        {i > 0 && <SelectSeparator />}
                        <SelectItem value={issue}>{issue}</SelectItem>
                      </Fragment>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button>Join Waitlist</Button>
            </form>

            {/* Animation */}
            <div className={"hidden w-60 flex-none md:flex md:items-end"}>
              <video
                src="/animations/kube-on-red.webm"
                autoPlay
                loop
                muted
              ></video>
            </div>
          </>
        ) : (
          <div className={"grid gap-8 md:grid-cols-2"}>
            {/* Animation */}
            <div className={"flex items-end"}>
              <video
                src="/animations/kube-on-green.webm"
                autoPlay
                loop
                muted
              ></video>
            </div>

            <div className="flex flex-col justify-end gap-2">
              <h1
                className={
                  "w-full font-display text-[2rem] uppercase leading-[2.5rem] text-primary max-md:text-center"
                }
              >
                You&apos;re In
              </h1>

              <p className={"text-sm text-black max-md:text-center"}>
                You should receive an email from us shortly
              </p>

              <DialogClose asChild onClick={() => setIsSent(false)}>
                <Button>Okay</Button>
              </DialogClose>
            </div>
          </div>
        )}

        {/* Sent state */}
      </DialogContent>
    </Dialog>
  );
}

const reasonsForJoining = [
  "Package Theft/Lost Packages",
  "Missed/Late Delivery",
  "Seamless Shopping",
  "Sustainable Delivery",
  "New Delivery Experience",
];
