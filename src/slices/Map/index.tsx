import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type MapProps = SliceComponentProps<Content.MapSlice>;

const Map = ({ slice }: MapProps): JSX.Element => {
  return <span></span>;
};

export default Map;
