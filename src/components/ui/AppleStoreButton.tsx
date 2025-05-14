"use client";

import { Button } from "./button";
import { cn } from "../../lib/utils";
import WaitlistForm from "../modals/waitlist-form";
import AppleStoreIcon from "./AppleStoreIcon";

export function AppleStoreButton({ className, variant }: { className?: string; variant?: "primary" | "secondary" | "accent" }) {
  return (
    <WaitlistForm>
      <Button type="button" variant={"ghost"} className={cn([className, `m-0 p-0`])}>
        {/* <img src="/images/apple-store.png" /> */}
        <AppleStoreIcon variant={variant || "accent"} width={160} />
      </Button>
    </WaitlistForm>
  );
}

{
  /* <div className="flex flex-row gap-2">
        <div className="flex items-center justify-center">
          <AppleStoreIcon className="inline-block h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <div className="text-xs">Download on the</div>
          <div className="text-base font-bold">Apple Store</div>
        </div>
      </div> */
}
