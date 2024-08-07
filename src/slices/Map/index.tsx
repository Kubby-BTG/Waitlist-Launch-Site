import DeliveryIssuesMap from "@/components/map/delivery-issues-map";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import LoadGoogleMapProvider from "../../components/map/load-google-map";
import LoadGoogleMapGeocoding from "../../components/map/load-googlemap-geocoding";

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
      className={"relative overflow-hidden bg-background md:py-16"}
    >
      <div className="absolute inset-0 translate-y-1/2 bg-primary"></div>
      <div className="container relative max-md:px-0">
        <LoadGoogleMapProvider>
          <DeliveryIssuesMap />
          <LoadGoogleMapGeocoding />
        </LoadGoogleMapProvider>
      </div>
    </section>
  );
};

export default Map;
