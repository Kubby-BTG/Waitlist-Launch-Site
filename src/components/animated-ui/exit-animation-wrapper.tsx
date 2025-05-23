"use client";

// import { AnimatePresence } from "framer-motion";
import ExitPageAnimation from "./exit-page-animation";
import { useExitAnimation } from "./use-exit-animation";

const ExitAnimationWrapper = () => {
  const { isVisible } = useExitAnimation((state) => state);

  // TODO Animation
  return <>{isVisible && <ExitPageAnimation />}</>;
};

export default ExitAnimationWrapper;
