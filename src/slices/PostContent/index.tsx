import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Content`.
 */
export type PostContentProps = SliceComponentProps<Content.ContentSlice>;

/**
 * Component for "Content" Slices.
 */
const PostContent = ({ slice }: PostContentProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for content (variation: {slice.variation}) Slices
    </section>
  );
};

export default PostContent;
