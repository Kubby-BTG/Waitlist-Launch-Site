import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextWithImage`.
 */
export type TextWithImageProps =
  SliceComponentProps<Content.TextWithImageSlice>;

/**
 * Component for "TextWithImage" Slices.
 */
const TextWithImage = ({ slice }: TextWithImageProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"bg-background py-16"}
    >
      <div className="container flex grid-cols-8 flex-col-reverse gap-10 md:grid md:gap-0">
        <PrismicNextImage
          field={slice.primary.image}
          className={"md:col-span-4"}
        />

        <div className="flex flex-col gap-4 md:col-span-3 md:col-start-6 md:justify-center">
          <PrismicRichText
            field={slice.primary.heading}
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
            field={slice.primary.body}
            components={{
              paragraph: ({ children }) => (
                <p className={"text-sm text-black/80"}> {children}</p>
              ),
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TextWithImage;
