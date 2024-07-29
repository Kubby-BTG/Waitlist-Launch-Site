import DoubleSlideUpText from "@/components/animated-ui/double-slide-up-text";
import SingleFeaturedBlogPost from "@/components/blog-post/single-featured-blog-post";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BlogHero`.
 */
export type BlogHeroProps = SliceComponentProps<Content.BlogHeroSlice>;

/**
 * Component for "BlogHero" Slices.
 */
const BlogHero = ({ slice }: BlogHeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"bg-background py-12 pt-14"}
    >
      <div className="container flex flex-col gap-16 md:gap-20 2xl:gap-24">
        <div className="flex flex-col gap-4 md:gap-6">
          <h1
            className={
              "heading-2 text-primary [font-size:_clamp(4rem,6.548vw,6.875rem)]"
            }
          >
            <DoubleSlideUpText>{slice.primary.heading}</DoubleSlideUpText>
          </h1>
          <p className="body-2 max-w-prose text-primary">
            {slice.primary.body}
          </p>
        </div>

        {/* Featured Blog Post */}
        <SingleFeaturedBlogPost />
      </div>
    </section>
  );
};

export default BlogHero;
