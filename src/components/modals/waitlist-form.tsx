"use client";

import { ReactNode, useState } from "react";
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
import AppModalDialog from "../ui/dialog-custom";
import { Video } from "lucide-react";

export default function WaitlistForm({ children }: { children: ReactNode }) {
  const [isSent, setIsSent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    setIsSent(true);
  };

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="cursor-pointer bg-transparent"
        role="button"
      >
        <div className="pointer-events-none cursor-none">{children}</div>
      </div>
      <AppModalDialog isOpen={isOpen}>
        <AppModalDialog.Content
          className={cn([
            "flex px-6 py-8 md:px-8",
            {
              "_max-w-[17.5rem] _max-md:w-[calc(100vw-6.5rem)] md:max-w-[32.875rem]":
                isSent,
            },
          ])}
        >
          {/* Filling state */}
          {!isSent ? (
            <>
              {/* Form */}
              <form
                className={"flex w-full flex-col gap-4"}
                autoComplete={"off"}
              >
                <div className="flex w-full items-center gap-8">
                  <h1
                    className={cn([
                      "w-full font-display text-[2rem] uppercase leading-[2.5rem] text-primary",
                    ])}
                  >
                    Join Our Waitlist
                  </h1>

                  <AppModalDialog.CloseButton
                    handleClick={() => setIsOpen(false)}
                  />
                </div>

                {/* Fix for IOS */}
                <input type="hidden" aria-hidden="true" />

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
                        <div key={i}>
                          {i > 0 && <SelectSeparator />}
                          <SelectItem value={issue}>{issue}</SelectItem>
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type={"button"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  Join Waitlist
                </Button>
              </form>

              {/* Animation */}
              <div
                className={"hidden w-[17rem] flex-none md:flex md:items-end"}
              >
                <video
                  src="/animations/kube-on-red.webm"
                  autoPlay
                  loop
                  muted
                  className={"pointer-events-none h-full object-cover"}
                />
                <Video className={"size-44"} />
              </div>
            </>
          ) : (
            <div className={"grid gap-8 md:grid-cols-2"}>
              <div className="flex flex-col justify-start gap-2 max-md:row-start-2 md:pb-8">
                <h1
                  className={
                    "w-full font-display text-[3.25rem] uppercase leading-[3.5rem] text-primary max-md:text-center"
                  }
                >
                  You&apos;re In
                </h1>

                <p className={"text-sm text-black max-md:text-center"}>
                  You should receive an email from us shortly
                </p>

                <Button
                  onClick={() => {
                    setIsSent(false);
                    setIsOpen(false);
                  }}
                >
                  Okay
                </Button>
              </div>

              {/* Animation */}
              <div className={"flex items-end max-md:row-start-1"}>
                <video
                  src="/animations/kube-on-green.webm"
                  autoPlay
                  loop
                  muted
                  className={"pointer-events-none h-full object-cover"}
                />
                <Video className={"size-44"} />
              </div>
            </div>
          )}
          {/* Sent state */}
        </AppModalDialog.Content>
      </AppModalDialog>
    </>
  );
}

const reasonsForJoining = [
  "Package Theft/Lost Packages",
  "Missed/Late Delivery",
  "Seamless Shopping",
  "Sustainable Delivery",
  "New Delivery Experience",
  "Cool Reason",
];
