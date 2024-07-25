import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `PartnershipForm`.
 */
export type PartnershipFormProps =
  SliceComponentProps<Content.PartnershipFormSlice>;

/**
 * Component for "PartnershipForm" Slices.
 */
const PartnershipForm = ({ slice }: PartnershipFormProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={
        "bg-primary pb-32 pt-10 md:flex md:min-h-[calc(90vh-124px)] md:items-center md:py-10"
      }
    >
      <div className="container flex grid-cols-2 flex-col gap-8 md:grid md:items-center md:gap-0">
        <div className="flex flex-col gap-4 md:gap-6">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h1 className="font-display text-[3.25rem] font-extrabold uppercase leading-[3.5rem] text-white md:text-[6rem] md:leading-[5.5rem]">
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
                <p className="text-base text-white">{children}</p>
              ),
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default PartnershipForm;
