import Arrow from "@/components/ui/arrow";
import { Button } from "@/components/ui/button";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"bg-background py-16"}
    >
      <div className="container">
        <div
          className={
            "flex flex-col overflow-hidden rounded-2xl bg-primary md:h-24 md:flex-row md:rounded-3xl"
          }
        >
          <PrismicNextImage
            field={slice.primary.image}
            className={"h-36 w-full object-cover md:w-60"}
          />
          <div className="flex w-full flex-col gap-2 p-6 md:flex-row md:items-center md:p-8">
            <p
              className={
                "w-full text-sm font-bold leading-6 text-white md:text-xl md:leading-6"
              }
            >
              {slice.primary.text}
            </p>
            <div>
              <Button variant={"accent"} className={"flex items-center gap-1"}>
                <span>{slice.primary.button_text}</span>
                <Arrow className={"flex-none"} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
