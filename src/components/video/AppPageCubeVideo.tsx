"use client";
import { cn } from "../../lib/utils";

function AppPageCubeVideo({ className }: { className?: string }) {
  return (
    <video
      muted={true}
      loop={true}
      autoPlay={true}
      playsInline={true}
      className={cn(["pointer-events-none", className])}
    >
      <source src="/animations_02/chip_cube.webm" type="video/webm" />
      <source src="/animations_02/chip_cube.mp4" type="video/mp4" />
      Your browser does not support the video tag or format.
    </video>
  );
}

export default AppPageCubeVideo;
