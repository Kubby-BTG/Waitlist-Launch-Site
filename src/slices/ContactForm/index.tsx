import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

        <form className="flex w-full flex-col gap-4 rounded-lg bg-white p-6 md:p-8">
          <div className={"flex w-full flex-col gap-1"}>
            <label htmlFor="first-name" className={"text-sm text-black"}>
              First name
            </label>
            <Input
              type="text"
              id={"first-name"}
              required
              placeholder={"First name"}
            />
          </div>
          <div className={"flex w-full flex-col gap-1"}>
            <label htmlFor="last-name" className={"text-sm text-black"}>
              Last name
            </label>
            <Input
              type="text"
              id={"last-name"}
              required
              placeholder={"Last name"}
            />
          </div>
          <div className={"flex w-full flex-col gap-1"}>
            <label htmlFor="email" className={"text-sm text-black"}>
              Work Email
            </label>
            <Input
              type="email"
              id={"email"}
              required
              placeholder={"Work email"}
            />
          </div>
          <div className={"flex w-full flex-col gap-1"}>
            <label htmlFor="phone" className={"text-sm text-black"}>
              Phone
            </label>
            <Input
              type="number"
              id={"phone"}
              required
              placeholder={"Phone number"}
            />
          </div>
          <div className={"flex w-full flex-col gap-1"}>
            <label htmlFor="message" className={"text-sm text-black"}>
              Message
            </label>
            <Textarea placeholder={"What do you want to say"} rows={6} />
          </div>

          <Button>Send Message</Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
