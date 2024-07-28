import DoubleSlideUpText from "@/components/animated-ui/double-slide-up-text";
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
      <div className="container mx-auto flex flex-col gap-8 md:gap-10">
        <div className="mx-auto flex max-w-[36rem] flex-col gap-4 md:items-center md:gap-6 md:text-center">
          <h1 className={"heading-2 text-primary"}>
            <DoubleSlideUpText>{slice.primary.heading}</DoubleSlideUpText>
          </h1>
          <p className="body-2 text-primary">{slice.primary.body}</p>
        </div>

        <div className={"mx-auto w-full max-w-[29rem]"}>
          <ContactUsForm />
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
