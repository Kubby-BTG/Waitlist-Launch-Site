import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FeaturedBlogPosts`.
 */
export type FeaturedBlogPostsProps =
  SliceComponentProps<Content.FeaturedBlogPostsSlice>;

/**
 * Component for "FeaturedBlogPosts" Slices.
 */
const FeaturedBlogPosts = ({ slice }: FeaturedBlogPostsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for featured_blog_posts (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default FeaturedBlogPosts;
