"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      className={"relative"}
    >
      {children}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 bg-background-secondary"
        variants={{
          hidden: { x: 0 },
          enter: { x: "100%" },
        }}
        transition={{ ease: [0.22, 1, 0.36, 1], duration: 1.5 }}
      ></motion.div>
    </motion.div>
  );
};

export default PageWrapper;