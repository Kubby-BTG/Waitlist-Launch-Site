import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
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
      className={"bg-background py-16"}
    >
      {/* Desktop */}
      <div className="container hidden grid-cols-8 flex-col-reverse gap-10 md:grid md:gap-0">
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
          ></video>
        </div>
        <div className="flex flex-col md:gap-20">
          <div className="flex flex-col gap-4 md:col-span-3 md:col-start-6 md:justify-center">
            <PrismicRichText
              field={slice.primary.first_heading}
              components={{
                heading2: ({ children }) => (
                  <h2 className="font-display text-[2.625rem] font-extrabold uppercase leading-[3rem] text-primary md:text-[3.25rem] md:leading-[3.5rem]">
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
                  <p className={"text-sm text-black/80"}> {children}</p>
                ),
              }}
            />
          </div>
          <div className="flex flex-col gap-4 md:col-span-3 md:col-start-6 md:justify-center">
            <PrismicRichText
              field={slice.primary.second_heading}
              components={{
                heading2: ({ children }) => (
                  <h2 className="font-display text-[2.625rem] font-extrabold uppercase leading-[3rem] text-primary md:text-[3.25rem] md:leading-[3.5rem]">
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
                  <p className={"text-sm text-black/80"}> {children}</p>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextsWithAnimations;
