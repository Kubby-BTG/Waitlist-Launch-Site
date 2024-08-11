"use client";

import { cn } from "../../lib/utils";

function AppPageShoppingVideo({ className }: { className?: string }) {
  return (
    <video muted={true} loop={true} autoPlay={true} playsInline={true} className={cn(["pointer-events-none", className])}>
      <source src="/animations_02/shopping_ui.webm" type="video/webm" />
      <source src="/animations_02/shopping_ui.mp4" type="video/mp4" />
      Your browser does not support the video tag or format.
    </video>
  );
}

export default AppPageShoppingVideo;
