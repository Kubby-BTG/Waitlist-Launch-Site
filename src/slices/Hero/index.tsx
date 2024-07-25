import HeroVideo from "@/components/animated-ui/hero-video";
import WaitlistForm from "@/components/modals/waitlist-form";
import Arrow from "@/components/ui/arrow";
import { Button } from "@/components/ui/button";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

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
      className={
        "bg-primary py-6 md:flex md:min-h-[calc(90vh-124px)] md:items-center md:py-10"
      }
    >
      <div className="container flex grid-cols-2 flex-col gap-8 md:grid md:items-center md:gap-0">
        <div className="flex flex-col gap-6 md:pr-10">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h1 className="font-display text-[4rem] font-extrabold uppercase leading-none text-white md:text-[6rem] md:leading-[5rem]">
                  {children}
                </h1>
              ),
              strong: ({ children }) => (
                <strong className="text-secondary">{children}</strong>
              ),
            }}
          />
          <PrismicRichText
            field={slice.primary.body}
            components={{
              paragraph: ({ children }) => (
                <p className="text-sm text-white md:text-base">{children}</p>
              ),
            }}
          />

          <div>
            <WaitlistForm>
              <Button variant={"accent"} className={"flex items-center gap-1"}>
                <span>{slice.primary.button_text}</span>
                <Arrow className={"flex-none"} />
              </Button>
            </WaitlistForm>
          </div>
        </div>

        {/* Hero Video */}
        <HeroVideo />
        {/* <PrismicNextImage field={slice.primary.image} /> */}
      </div>
    </section>
  );
};

export default Hero;
