import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { AppleStoreButton } from "../../components/ui/AppleStoreButton";

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
      className={"hidden bg-background-secondary md:block"}
    >
      <div className="flex w-full flex-row justify-between">
        <div className={"flex flex-col justify-center gap-6 pl-36"}>
          <div>
            <h1 className={"heading-2 text-primary [font-size:_clamp(2rem,6.548vw,4.875rem)]"}>{slice.primary.text}</h1>
          </div>
          <div>
            <AppleStoreButton variant="primary" />
          </div>
        </div>
        <div className={"w-[220px] bg-primary"}>
          <img src="/images/phone-hand-03.gif" className="-ml-[100px]" height={200} />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
