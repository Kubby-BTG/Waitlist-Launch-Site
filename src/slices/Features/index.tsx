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
      className={"relative z-[1] overflow-y-visible bg-background py-16"}
    >
      <div className="container flex flex-col gap-6">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="font-display text-[2.625rem] font-extrabold uppercase leading-[3rem] text-primary md:text-[5rem] md:leading-[3.5rem]">
                {children}
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
                <p className={"text-sm text-black/80 md:col-span-3"}>
                  {children}
                </p>
              ),
            }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <>
            {slice.primary.items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-8 rounded-lg bg-background-secondary px-8 py-6 shadow-none transition-all duration-500 ease-kubby hover:bg-white/80 hover:shadow-expand md:gap-14"
              >
                <div className="flex size-10 items-center justify-center rounded bg-background-icon">
                  <PrismicNextImage field={item.icon} />
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-base font-bold">
                    <>{item.heading}</>
                  </h3>

                  <p className={"text-sm text-black/80"}>
                    <>{item.body}</>
                  </p>
                </div>
              </div>
            ))}
          </>
        </div>
      </div>
    </section>
  );
};

export default Features;
