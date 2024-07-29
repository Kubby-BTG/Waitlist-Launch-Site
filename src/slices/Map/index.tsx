import DeliveryIssuesMap from "@/components/map/delivery-issues-map";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Map`.
 */
export type MapProps = SliceComponentProps<Content.MapSlice>;

/**
 * Component for "Map" Slices.
 */
const Map = ({ slice }: MapProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"relative bg-background py-16"}
    >
      <div className="absolute inset-0 translate-y-1/2 bg-primary"></div>
      <div className="container relative max-md:px-0">
        <DeliveryIssuesMap />
      </div>
    </section>
  );
};

export default Map;
