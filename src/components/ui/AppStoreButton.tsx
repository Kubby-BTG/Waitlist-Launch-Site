"use client";

import AppleStoreIcon from "./AppleStoreIcon";
import { Button } from "./button";
import { cn } from "../../lib/utils";

export function AppStoreButton({ className }: { className?: string }) {
  return (
    <Button type="button" variant={"accent"} className={cn([`pb-6 pt-6`, className])} onClick={() => {}}>
      <div className="flex flex-row gap-2">
        <div className="flex items-center justify-center">
          <AppleStoreIcon className="inline-block h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <div className="text-xs">Download on the</div>
          <div className="text-base font-bold">Apple Store</div>
        </div>
      </div>
    </Button>
  );
}
