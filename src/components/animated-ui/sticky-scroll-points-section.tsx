"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { useScroll, motion, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "../../lib/utils";
// import AppPageShoppingVideo from "../video/AppPageShoppingVideo";
// import AppPageCubeVideo from "../video/AppPageCubeVideo";
import dynamic from "next/dynamic";
const AppPageCubeVideo = dynamic(() => import("../video/AppPageCubeVideo"), { ssr: false });
const AppPageShoppingVideo = dynamic(() => import("../video/AppPageShoppingVideo"), { ssr: false });

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
          <div className="sticky top-20 overflow-hidden border-none">
            <>
              {!isScrollEnd ? (
                <>
                  {/* <motion.video
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={"scale-[1.02]"}
                    key={"sticky-vh-01-pg-001"}
                  >
                    <motion.source src="/animations_02/shopping_ui.webm" type="video/webm" />
                    <motion.source src="/animations_02/shopping_ui.mp4" type="video/mp4" />
                  </motion.video> */}

                  <AppPageShoppingVideo />
                </>
              ) : (
                <>
                  {/* <motion.video
                    key={"ticky-vs-01-pg-002"}
                    src={"/animations/" + slice.primary.second_animation_file}
                    autoPlay
                    muted
                    loop
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={"scale-[1.02]"}
                  /> */}

                  {/* <motion.video
                    key={"ticky-vs-01-pg-002"}
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={"scale-[1.02]"}
                  >
                    <motion.source src="/animations_02/chip_cube.webm" type="video/webm" />
                    <motion.source src="/animations_02/chip_cube.mp4" type="video/mp4" />
                  </motion.video> */}

                  <AppPageCubeVideo />
                </>
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
                strong: ({ children }) => <strong className="text-brand-500">{children}</strong>,
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
                strong: ({ children }) => <strong className="text-brand-500">{children}</strong>,
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
