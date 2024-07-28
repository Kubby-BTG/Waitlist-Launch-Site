"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const ExitPageAnimation = () => {
  const controlsBack = useAnimation();

  const controlsFront = useAnimation();

  useEffect(() => {
    controlsBack.start({
      y: 0,
      transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6 },
    });
  }, [controlsBack]);

  useEffect(() => {
    controlsFront.start({
      y: 0,
      transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6, delay: 0.2 },
    });
  }, [controlsFront]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-secondary"
        initial={{ y: "100%" }}
        animate={controlsBack}
      ></motion.div>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background-secondary"
        initial={{ y: "100%" }}
        animate={controlsFront}
      ></motion.div>
    </>
  );
};

export default ExitPageAnimation;
