import HeroVideo from "@/components/animated-ui/hero-video";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { AppleStoreButton } from "../../components/ui/AppleStoreButton";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"_md:min-h-[calc(90vh-124px)] bg-primary py-6 md:flex md:items-center md:py-28"}
    >
      <div className="container flex grid-cols-2 flex-col gap-8 md:grid md:items-center md:gap-0">
        <div className="flex flex-col gap-6 md:pr-6">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => <h1 className="heading-1 text-white">{children}</h1>,
              strong: ({ children }) => <strong className="text-secondary">{children}</strong>,
            }}
          />
          <div>
            <PrismicRichText
              field={slice.primary.body}
              components={{
                paragraph: ({ children }) => (
                  <p className="body-1 text-cream opacity-70 max-md:inline md:max-w-[31.25rem] md:text-balance">{children}</p>
                ),
              }}
            />
          </div>

          <div className={"mt-4"}>
            <AppleStoreButton />
          </div>
        </div>

        {/* Hero Video */}
        <HeroVideo />
        {/* <PrismicNextImage field={slice.primary.image}  alt="" /> */}
      </div>
    </section>
  );
};

export default Hero;
