import DoubleSlideUpText from "@/components/animated-ui/double-slide-up-text";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Story`.
 */
export type StoryProps = SliceComponentProps<Content.StorySlice>;

/**
 * Component for "Story" Slices.
 */
const Story = ({ slice }: StoryProps): JSX.Element => {
  return (
    <section
      id={"story"}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={
        "scroll-mt-[50px] bg-primary py-14 md:scroll-mt-[48px] md:py-[9.5rem]"
      }
    >
      <div className="container flex grid-cols-2 flex-col gap-4 md:grid md:items-center">
        <div className="flex flex-col gap-4 text-white md:gap-6">
          <span className={"text-base font-bold uppercase"}>
            {slice.primary.subheading}
          </span>
          <h2
            className={
              "font-display text-5xl font-extrabold uppercase leading-[2.625rem] text-light md:text-[3.5rem] md:leading-[3.25rem]"
            }
          >
            <DoubleSlideUpText>{slice.primary.heading}</DoubleSlideUpText>
          </h2>
          <PrismicRichText
            field={slice.primary.body}
            components={{
              paragraph: ({ children }) => (
                <p className={"text-sm leading-6 text-white"}> {children}</p>
              ),
            }}
          />
        </div>
        <PrismicNextImage
          field={slice.primary.image}
          className={"h-[384px] rounded-2xl"}
        />
      </div>
    </section>
  );
};

export default Story;
