import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FilteredBlogCollections`.
 */
export type FilteredBlogCollectionsProps =
  SliceComponentProps<Content.FilteredBlogCollectionsSlice>;

/**
 * Component for "FilteredBlogCollections" Slices.
 */
const FilteredBlogCollections = ({
  slice,
}: FilteredBlogCollectionsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for filtered_blog_collections (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default FilteredBlogCollections;
