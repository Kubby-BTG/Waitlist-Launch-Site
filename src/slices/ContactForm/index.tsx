import ContactUsForm from "@/components/contact/contact-us-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm = ({ slice }: ContactFormProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"bg-background py-16 md:py-32"}
    >
      <div className="container mx-auto flex max-w-[29rem] flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4 md:items-center md:gap-6 md:text-center">
          <h1
            className={
              "font-display text-[4rem] font-extrabold uppercase leading-[5rem] text-primary md:text-[6rem] md:leading-[5rem]"
            }
          >
            {slice.primary.heading}
          </h1>
          <p className="text-sm leading-6 text-black">{slice.primary.body}</p>
        </div>

        <ContactUsForm />
      </div>
    </section>
  );
};

export default ContactForm;
