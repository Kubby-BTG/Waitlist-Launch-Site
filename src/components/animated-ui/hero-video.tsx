"use client";
import { useState, useRef } from "react";

export default function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={"relative"}>
      <video ref={videoRef} muted loop autoPlay playsInline>
        <source src="/animations/waitlist.mp4" type="video/mp4" />
      </video>
      <button
        className={
          "absolute bottom-0 right-0 flex size-10 items-center justify-center rounded-full bg-background text-background-icon md:size-12 md:translate-y-full"
        }
        onClick={togglePlayPause}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}

const PauseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.16663 3.33333C4.16663 2.8731 4.53972 2.5 4.99996 2.5H8.33329C8.79353 2.5 9.16663 2.8731 9.16663 3.33333V16.6667C9.16663 17.1269 8.79353 17.5 8.33329 17.5H4.99996C4.53972 17.5 4.16663 17.1269 4.16663 16.6667V3.33333ZM5.83329 4.16667V15.8333H7.49996V4.16667H5.83329Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.8334 3.33333C10.8334 2.8731 11.2065 2.5 11.6667 2.5H15C15.4603 2.5 15.8334 2.8731 15.8334 3.33333V16.6667C15.8334 17.1269 15.4603 17.5 15 17.5H11.6667C11.2065 17.5 10.8334 17.1269 10.8334 16.6667V3.33333ZM12.5 4.16667V15.8333H14.1667V4.16667H12.5Z"
      fill="currentColor"
    />
  </svg>
);

const PlayIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.76738 1.76859C6.03495 1.62252 6.36091 1.63419 6.61734 1.79904L18.284 9.29904C18.5225 9.45237 18.6667 9.71647 18.6667 10C18.6667 10.2836 18.5225 10.5477 18.284 10.701L6.61734 18.201C6.36091 18.3658 6.03495 18.3775 5.76738 18.2314C5.49982 18.0854 5.33337 17.8049 5.33337 17.5V2.50002C5.33337 2.19518 5.49982 1.91467 5.76738 1.76859Z"
      fill="currentColor"
    />
  </svg>
);
