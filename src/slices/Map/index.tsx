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
      <div className="container max-md:px-0">
        <div
          className={
            "relative h-[600px] w-full overflow-hidden md:h-[640px] md:rounded-2xl"
          }
        >
          <iframe
            // width="450"
            // height="250"
            className={"h-full w-full"}
            frameBorder="0"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCsMCSpSDnkL8mxz18R2XI_BU31cZTvjyc&q=Eiffel+Tower,Paris+France"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default Map;
