import CuratedPosts from "@/components/blog-post/curated-posts";
import FilteredPosts from "@/components/blog-post/filtered-posts";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

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
      className={"bg-background py-16 md:py-32"}
    >
      <div className="container flex flex-col gap-10">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="font-display text-[4rem] font-extrabold uppercase leading-[3.5rem] text-primary md:text-[5rem] md:leading-[3.5rem]">
                {children}
              </h2>
            ),
            strong: ({ children }) => (
              <strong className="text-brand">{children}</strong>
            ),
          }}
        />

        <FilteredPosts />

        <CuratedPosts limit={6} />
      </div>
    </section>
  );
};

export default FilteredBlogCollections;
