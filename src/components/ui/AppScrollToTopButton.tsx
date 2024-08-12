"use client";

import useAppScrollToTop from "../../hooks/useAppScrollToTop";
import { ArrowUp } from "lucide-react";
import { cn } from "../../lib/utils";

export function AppScrollToTopButton() {
  const { scrollToTop, isVisible } = useAppScrollToTop();

  return (
    <button
      type="button"
      className={cn([
        `fixed bottom-0 right-0 z-50 mb-[50px] mr-6`,
        `flex items-center gap-2 rounded-s-full bg-brand-300 px-4 py-2 text-xs text-brand-950`,
        "cursor-pointer",
        "font-bold",
      ])}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
      onClick={() => scrollToTop()}
    >
      BACK TO TOP
      <ArrowUp className="inline-block h-4 w-4" />
    </button>
  );
}
