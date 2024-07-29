import DoubleSlideUpText from "@/components/animated-ui/double-slide-up-text";
import Marquee from "@/components/animated-ui/marquee";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;

/**
 * Component for "Features" Slices.
 */
const Features = ({ slice }: FeaturesProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"relative z-[1] overflow-x-hidden bg-background py-16"}
    >
      <div className="container flex flex-col gap-5">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="heading-2 text-primary">
                <DoubleSlideUpText>{children}</DoubleSlideUpText>
              </h2>
            ),
            strong: ({ children }) => (
              <strong className="text-brand">{children}</strong>
            ),
          }}
        />

        <div className={"md:grid md:grid-cols-8 md:gap-4"}>
          <PrismicRichText
            field={slice.primary.body}
            components={{
              paragraph: ({ children }) => (
                <p className={"body-2 text-primary md:col-span-3"}>
                  {children}
                </p>
              ),
            }}
          />
        </div>
      </div>
      <div className="mt-6 overflow-y-visible">
        <Marquee pauseOnHover className={"overflow-visible"}>
          <>
            {slice.primary.items.map((item, i) => (
              <div
                key={i}
                className="flex w-[350px] flex-col gap-12 rounded-2xl bg-background-secondary px-6 py-6 shadow-none transition-all duration-500 ease-kubby hover:bg-white/80 hover:shadow-expand sm:gap-14 md:w-[400px] md:gap-16 lg:gap-[2rem] xl:w-[500px] xl:gap-24"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-background-icon">
                  <PrismicNextImage field={item.icon} />
                </div>

                <div className="flex flex-col gap-5">
                  <h3 className="_body-2 text-lg font-bold text-primary">
                    <>{item.heading}</>
                  </h3>

                  <p className={"text-lg text-primary"}>
                    <>{item.body}</>
                  </p>
                </div>
              </div>
            ))}
          </>
        </Marquee>
      </div>
    </section>
  );
};

export default Features;
