"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import {
  useScroll,
  motion,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";

export default function StickyScrollPointsSection({
  slice,
}: {
  slice: Content.TextWithImageSlice;
}) {
  const [isScrollEnd, setIsScrollEnd] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,

    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.9) {
      setIsScrollEnd(true);
    } else {
      setIsScrollEnd(false);
    }
  });

  return (
    <motion.div
      className={"hidden py-16 md:block"}
      animate={{
        backgroundColor: isScrollEnd ? "#99ddc7" : "#f9f3e8",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40,
      }}
      ref={ref}
    >
      <div className="container relative grid-cols-12 flex-col-reverse gap-10 md:grid md:gap-0">
        {/* <PrismicNextImage
          field={slice.primary.image}
          className={"md:col-span-4"}
        /> */}
        <div className="md:col-span-6">
          <div className="sticky top-20">
            <AnimatePresence>
              {!isScrollEnd ? (
                <motion.video
                  src={"/animations/" + slice.primary.first_animation_file_name}
                  autoPlay
                  muted
                  loop
                ></motion.video>
              ) : (
                <motion.video
                  src={"/animations/" + slice.primary.second_animation_file}
                  autoPlay
                  muted
                  loop
                ></motion.video>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex w-full flex-col md:col-span-4 md:col-start-8 md:mb-72 md:gap-52">
          <motion.div
            className="flex flex-col gap-4 md:col-start-6 md:justify-center"
            animate={{
              opacity: isScrollEnd ? 0.5 : 1,
            }}
          >
            <PrismicRichText
              field={slice.primary.first_heading}
              components={{
                heading2: ({ children }) => (
                  <h2 className="font-display font-extrabold uppercase leading-[0.85] text-primary [font-size:_clamp(3rem,4.76vw,5rem)]">
                    {children}
                  </h2>
                ),
                strong: ({ children }) => (
                  <strong className="text-brand">{children}</strong>
                ),
              }}
            />
            <PrismicRichText
              field={slice.primary.first_body}
              components={{
                paragraph: ({ children }) => (
                  <p
                    className={
                      "text-base leading-[1.44] text-black/80 md:text-lg md:leading-[1.44] lg:text-xl lg:leading-[1.44] xl:text-[1.375rem] xl:leading-[1.44]"
                    }
                  >
                    {children}
                  </p>
                ),
              }}
            />
          </motion.div>
          <motion.div
            className="flex flex-col gap-4 md:col-span-3 md:col-start-6 md:justify-center"
            animate={{
              opacity: isScrollEnd ? 1 : 0.5,
            }}
          >
            <PrismicRichText
              field={slice.primary.second_heading}
              components={{
                heading2: ({ children }) => (
                  <h2 className="font-display font-extrabold uppercase leading-[0.85] text-primary [font-size:_clamp(3rem,4.76vw,5rem)]">
                    {children}
                  </h2>
                ),
                strong: ({ children }) => (
                  <strong className="text-brand">{children}</strong>
                ),
              }}
            />
            <PrismicRichText
              field={slice.primary.second_body}
              components={{
                paragraph: ({ children }) => (
                  <p
                    className={
                      "text-base leading-[1.44] text-black/80 md:text-lg md:leading-[1.44] lg:text-xl lg:leading-[1.44] xl:text-[1.375rem] xl:leading-[1.44]"
                    }
                  >
                    {children}
                  </p>
                ),
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
