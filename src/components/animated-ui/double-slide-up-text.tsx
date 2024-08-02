"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DoubleSlideUpText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("relative flex overflow-hidden py-0.5", className)}>
      {/* Main text */}
      <motion.span
        key={"double-slide-pf-001-001"}
        viewport={{ once: true }}
        initial={{ y: "100%" }}
        whileInView={{ y: "0" }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40,
          delay: 0.25,
        }}
        className={"relative z-[1]"}
      >
        {children}
      </motion.span>
      {/* Doubling text */}
      <motion.span
        key={"double-slide-pl-009-003"}
        viewport={{ once: true }}
        initial={{
          y: "100%",
        }}
        whileInView={{
          y: "0",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40,
          delay: 0.1,
        }}
        aria-hidden
        className={
          "absolute inset-0 translate-x-4 py-0.5 !text-secondary [&>*]:!text-secondary"
        }
      >
        {children}
      </motion.span>
    </span>
  );
}
