import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BlogCollections`.
 */
export type BlogCollectionsProps =
  SliceComponentProps<Content.BlogCollectionsSlice>;

/**
 * Component for "BlogCollections" Slices.
 */
const BlogCollections = ({ slice }: BlogCollectionsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for blog_collections (variation: {slice.variation})
      Slices
    </section>
  );
};

export default BlogCollections;
