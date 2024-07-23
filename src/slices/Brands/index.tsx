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
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"bg-background py-16"}
    >
      <div className="container flex grid-cols-8 flex-col gap-10 md:grid md:gap-4">
        <p
          className={
            "text-center text-sm text-black/80 md:col-span-2 md:text-start md:text-base"
          }
        >
          {slice.primary.text}
        </p>

        <div className="grid grid-cols-3 gap-8 px-1 py-8 md:col-span-3 md:col-start-6 md:gap-16 md:py-4">
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
