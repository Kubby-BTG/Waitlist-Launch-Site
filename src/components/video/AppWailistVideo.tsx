"use client";

import { cn } from "../../lib/utils";

function AppWailistVideo({ className }: { className?: string }) {
  return (
    <video muted={true} loop={true} autoPlay={true} playsInline={true} className={cn(["pointer-events-none", className])}>
      <source src="/animations_02/waitlist.webm" type="video/webm" />
      <source src="/animations_02/waitlist.mp4" type="video/mp4" />
      Your browser does not support the video tag or format.
    </video>
  );
}

export default AppWailistVideo;
