import DoubleSlideUpText from "@/components/animated-ui/double-slide-up-text";
import CuratedPosts from "@/components/blog-post/curated-posts";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

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
      className={"bg-background py-16"}
    >
      <div className="container flex flex-col gap-10">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="heading-2 text-primary">
                <DoubleSlideUpText>{children}</DoubleSlideUpText>
              </h2>
            ),
            strong: ({ children }) => (
              <strong className="text-brand">{children}</strong>
            ),
          }}
        />

        <CuratedPosts limit={6} />
      </div>
    </section>
  );
};

export default BlogCollections;
