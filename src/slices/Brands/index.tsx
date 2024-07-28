import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `SocialProofs`.
 */
export type Brands = SliceComponentProps<Content.SocialProofsSlice>;

/**
 * Component for "SocialProofs" Slices.
 */
const Brands = ({ slice }: Brands): JSX.Element => {
  return (
    <section
      id={"brands"}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"scroll-mt-[64px] bg-background py-16 md:scroll-mt-[64px]"}
    >
      <div className="container flex grid-cols-12 flex-col gap-10 md:grid md:gap-4">
        <p
          className={
            "max-w-[20.625rem] text-center text-base font-medium text-black/80 md:col-span-2 md:text-start"
          }
        >
          {slice.primary.text}
        </p>

        <div className="grid grid-cols-3 gap-8 px-1 py-8 md:col-span-3 md:col-start-8 md:gap-16 md:py-4">
          <>
            {slice.primary.brands.map((item, i) => (
              <PrismicNextImage key={i} field={item.brand_logo} />
            ))}
          </>
        </div>
      </div>
    </section>
  );
};

export default Brands;
