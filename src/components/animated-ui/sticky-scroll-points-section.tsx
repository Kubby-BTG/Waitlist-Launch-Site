"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { useScroll, motion, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

export default function StickyScrollPointsSection({ slice }: { slice: Content.TextWithImageSlice }) {
  const [isScrollEnd, setIsScrollEnd] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,

    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.8) {
      setIsScrollEnd(true);
    } else {
      setIsScrollEnd(false);
    }
  });

  return (
    <motion.div
      key={"ticky-02-page-001"}
      className={"hidden min-h-[80vh] py-16 md:block"}
      animate={
        {
          // backgroundColor: isScrollEnd ? "#99ddc780" : "#f9f3e8",
        }
      }
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
           alt=""
        /> */}
        <div className="md:col-span-6">
          <div className="sticky top-20 overflow-hidden">
            <>
              {!isScrollEnd ? (
                // <motion.video
                //   src={"/animations/" + slice.primary.first_animation_file_name}
                //   autoPlay
                //   muted
                //   loop
                //   initial={{ opacity: 0 }}
                //   animate={{ opacity: 1 }}
                //   exit={{ opacity: 0 }}
                //   className={"scale-[1.02]"}
                //   key={"sticky-vh-01-pg-001"}
                // />

                <motion.img
                  src="/gifs/shopping_ui.gif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={"scale-[1.02]"}
                  key={"sticky-vh-01-pg-001"}
                />
              ) : (
                // /gifs/kubby_chip.gif
                // <motion.video
                //   key={"ticky-vs-01-pg-002"}
                //   src={"/animations/" + slice.primary.second_animation_file}
                //   autoPlay
                //   muted
                //   loop
                //   initial={{ opacity: 0 }}
                //   animate={{ opacity: 1 }}
                //   exit={{ opacity: 0 }}
                //   className={"scale-[1.02]"}
                // />

                <motion.img
                  src="/gifs/kubby_chip.gif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={"scale-[1.02]"}
                  key={"ticky-vs-01-pg-002"}
                />
              )}
            </>
          </div>
        </div>
        <div className="flex w-full flex-col md:col-span-5 md:col-start-8 md:mb-96 md:gap-52">
          <motion.div
            key={"ticky-02-page1-002"}
            className="flex flex-col gap-4 md:col-start-6 md:justify-center md:gap-5"
            animate={{
              opacity: isScrollEnd ? 0.4 : 1,
            }}
          >
            <PrismicRichText
              field={slice.primary.first_heading}
              components={{
                heading2: ({ children }) => <h2 className="heading-3 text-primary">{children}</h2>,
                strong: ({ children }) => <strong className="text-brand">{children}</strong>,
              }}
            />
            <PrismicRichText
              field={slice.primary.first_body}
              components={{
                paragraph: ({ children }) => <p className={"body-3 text-primary opacity-70"}>{children}</p>,
              }}
            />
          </motion.div>
          <motion.div
            key={"ticky-02-page2-003"}
            className="flex flex-col gap-4 md:col-span-3 md:col-start-6 md:justify-center"
            animate={{
              opacity: isScrollEnd ? 1 : 0.4,
            }}
          >
            <PrismicRichText
              field={slice.primary.second_heading}
              components={{
                heading2: ({ children }) => <h2 className="heading-3 text-primary">{children}</h2>,
                strong: ({ children }) => <strong className="text-brand">{children}</strong>,
              }}
            />
            <PrismicRichText
              field={slice.primary.second_body}
              components={{
                paragraph: ({ children }) => <p className={"body-3 text-primary opacity-70"}>{children}</p>,
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
