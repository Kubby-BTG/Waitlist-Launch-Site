import StickyScrollPointsSection from "@/components/animated-ui/sticky-scroll-points-section";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { cn } from "../../lib/utils";
// import AppPageShoppingVideo from "../../components/video/AppPageShoppingVideo";
// import AppPageCubeVideo from "../../components/video/AppPageCubeVideo";

import dynamic from "next/dynamic";
const AppPageCubeVideo = dynamic(() => import("../../components/video/AppPageCubeVideo"), { ssr: false });
const AppPageShoppingVideo = dynamic(() => import("../../components/video/AppPageShoppingVideo"), { ssr: false });

/**
 * Props for `TextWithImage`.
 */
export type TextsWithAnimationsProps = SliceComponentProps<Content.TextWithImageSlice>;

/**
 * Component for "TextWithImage" Slices.
 */
const TextsWithAnimations = ({ slice }: TextsWithAnimationsProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={"bg-background"}>
      {/* Desktop */}
      <StickyScrollPointsSection slice={slice} />

      {/* Mobile */}

      <div className="md:hidden">
        <div className="bg-background py-12">
          <div className="container flex grid-cols-8 flex-col-reverse gap-10 md:grid md:gap-0">
            {/* <PrismicNextImage
          field={slice.primary.image}
          className={"md:col-span-4"}
           alt=""
        /> */}
            <div className="m-0 overflow-hidden bg-transparent p-0 md:col-span-4">
              {/* <video autoPlay muted loop className={"pointer-events-none scale-[1.02]"} playsInline>
                <source src={"/animations/" + slice.primary.first_animation_file_name} type="video/mp4" />
              </video> */}
              <div className="inline-block h-auto w-auto">
                {/* <img
                  src="/gifs/shopping_ui.gif"
                  alt=""
                  className={cn([
                    "scale-[1.02]",
                    "pointer-events-none m-[-2px] border-none object-cover p-0 outline-none",
                  ])}
                  loading={"lazy"}
                  decoding={"async"}
                /> */}

                {/* <video autoPlay={true} muted={true} loop={true} playsInline={true} className={"pointer-events-none scale-[1.02]"}>
                  <source src="/animations/shopping_ui.webm" type="video/webm" />
                  <source src="/animations/shopping_ui.mp4" type="video/mp4" />
                </video> */}

                <AppPageShoppingVideo />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:col-span-3 md:col-start-6 md:justify-center">
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
                  paragraph: ({ children }) => <p className={"body-3 text-primary opacity-70"}> {children}</p>,
                }}
              />
            </div>
          </div>
        </div>
        <div className="bg-background py-12">
          <div className="container flex grid-cols-8 flex-col-reverse gap-10 md:grid md:gap-0">
            {/* <PrismicNextImage
          field={slice.primary.image}
          className={"md:col-span-4"}
           alt=""
        /> */}
            <div className="overflow-hidden p-0 md:col-span-4">
              {/* <video autoPlay muted loop className={"pointer-events-none scale-[1.02]"} playsInline>
                <source src={"/animations/" + slice.primary.second_animation_file} type="video/mp4" />
              </video> */}

              {/* <img
                src="/gifs/kubby_chip.gif"
                alt=""
                className={cn([
                  // "scale-[1.02]",
                  "pointer-events-none m-[-2px] border-none object-cover p-0 outline-none",
                ])}
                loading={"lazy"}
                decoding={"async"}
              /> */}

              {/* <video autoPlay={true} muted={true} loop={true} className={"pointer-events-none scale-[1.02]"} playsInline>
                <source src="/animations/chip_cube.webm" type="video/webm" />
                <source src="/animations/chip_cube.mp4" type="video/mp4" />
              </video> */}

              <AppPageCubeVideo />
            </div>
            <div className="flex flex-col gap-4 md:col-span-3 md:col-start-6 md:justify-center">
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
                  paragraph: ({ children }) => <p className={"body-3 text-primary opacity-70"}> {children}</p>,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextsWithAnimations;
