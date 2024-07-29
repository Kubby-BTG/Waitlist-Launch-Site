import StickyScrollPointsSection from "@/components/animated-ui/sticky-scroll-points-section";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextWithImage`.
 */
export type TextsWithAnimationsProps =
  SliceComponentProps<Content.TextWithImageSlice>;

/**
 * Component for "TextWithImage" Slices.
 */
const TextsWithAnimations = ({
  slice,
}: TextsWithAnimationsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"bg-background"}
    >
      {/* Desktop */}
      <StickyScrollPointsSection slice={slice} />

      {/* Mobile */}

      <div className="md:hidden">
        <div className="bg-background py-12">
          <div className="container flex grid-cols-8 flex-col-reverse gap-10 md:grid md:gap-0">
            {/* <PrismicNextImage
          field={slice.primary.image}
          className={"md:col-span-4"}
        /> */}
            <div className="overflow-hidden md:col-span-4">
              <video
                src={"/animations/" + slice.primary.first_animation_file_name}
                // TODO: Remove the scaling later
                // className={"scale-[1.1]"}
                autoPlay
                muted
                loop
                className={"scale-[1.02]"}
                // @ts-ignore
                playsinline
              ></video>
            </div>
            <div className="flex flex-col gap-4 md:col-span-3 md:col-start-6 md:justify-center">
              <PrismicRichText
                field={slice.primary.first_heading}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="heading-3 text-primary">{children}</h2>
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
                    <p className={"body-3 text-primary opacity-70"}>
                      {" "}
                      {children}
                    </p>
                  ),
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
        /> */}
            <div className="overflow-hidden md:col-span-4">
              <video
                src={"/animations/" + slice.primary.second_animation_file}
                // TODO: Remove the scaling later
                // className={"scale-[1.1]"}
                autoPlay
                muted
                loop
                className={"scale-[1.02]"}
                // @ts-ignore
                playsinline
              ></video>
            </div>
            <div className="flex flex-col gap-4 md:col-span-3 md:col-start-6 md:justify-center">
              <PrismicRichText
                field={slice.primary.second_heading}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="heading-3 text-primary">{children}</h2>
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
                    <p className={"body-3 text-primary opacity-70"}>
                      {" "}
                      {children}
                    </p>
                  ),
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
