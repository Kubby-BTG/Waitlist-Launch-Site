import PartnerWithUsForm from "@/components/partnership/partner-with-us-form";
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
        "_md:min-h-[calc(90vh-124px)] bg-primary pb-32 pt-10 md:flex md:items-center md:py-28"
      }
    >
      <div className="container flex grid-cols-2 flex-col gap-8 md:grid md:items-center md:gap-0">
        <div className="flex flex-col gap-4 md:gap-6">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h1 className="heading-2 text-white">{children}</h1>
              ),
              strong: ({ children }) => (
                <strong className="text-secondary">{children}</strong>
              ),
            }}
          />
          <div>
            <PrismicRichText
              field={slice.primary.body}
              components={{
                paragraph: ({ children }) => (
                  <p className="body-1 _text-balance max-w-[50rem] text-cream opacity-70 md:pr-12 xl:pr-16">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
        </div>

        <div className={"md:flex md:justify-end"}>
          <PartnerWithUsForm />
        </div>
      </div>
    </section>
  );
};

export default PartnershipForm;
