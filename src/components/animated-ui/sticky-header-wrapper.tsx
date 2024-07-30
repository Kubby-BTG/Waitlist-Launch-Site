"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ReactNode, useState } from "react";

export default function StickyHeaderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { scrollY } = useScroll();

  const [isScrolledDown, setIscrolledDown] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0 && !isScrolledDown) {
      setIscrolledDown(true);
    } else if (latest === 0 && isScrolledDown) {
      setIscrolledDown(false);
    }
  });
  return (
    <motion.div
      className={"z-10 max-md:bg-primary md:sticky md:top-0"}
      animate={{
        top: isScrolledDown ? -48 : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
