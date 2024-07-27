"use client";

import { ReactNode } from "react";
import { motion, MotionConfig } from "framer-motion";

export default function DoubleSlideUpText({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span className={"relative flex overflow-hidden py-0.5"}>
      {/* Main text */}
      <motion.span
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
          delay: 0.25,
        }}
        className={"relative z-[1]"}
      >
        {children}
      </motion.span>
      {/* Doubling text */}
      <motion.span
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
