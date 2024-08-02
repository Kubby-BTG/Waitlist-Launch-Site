"use client";

import React, { useContext, useRef, PropsWithChildren } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function AnimatedLayout({ children }: PropsWithChildren<{}>) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div key={pathname}>
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}

function FrozenRouter({ children }: PropsWithChildren<{}>) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}
