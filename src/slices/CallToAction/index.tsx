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
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={"bg-background-secondary"}>
      <div className="flex w-full flex-col md:flex-row md:justify-between">
        <div className={"container flex flex-col justify-center gap-6 pb-[150px] md:pb-3"}>
          <div>
            <h1 className={"heading-2 text-[#003928] pt-6 md:pt-0 [font-size:_clamp(2rem,6.548vw,4.875rem)]"}>{slice.primary.text}</h1>
          </div>

          <div>
            <p className={"w-full text-lg font-regular leading-6 text-[#003928] pt-4 md:pt-2"}>
              Shop, track, & manage your orders in one place. Get discounts, stop delivery issues, and get unique insights to make
              better purchases and shop the way you live.
            </p>
          </div>

          <div>
            <AppleStoreButton variant="primary" />
          </div>
        </div>
        <div className={"bg-primary md:w-[150px]"}>
          <img src="/images/phone-hand-03.gif" className="-mt-[200px] md: ml-[150px] md:-mt-0" width={180} height={200} />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
