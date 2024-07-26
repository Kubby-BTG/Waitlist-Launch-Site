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
      className={"bg-background py-10"}
    >
      <div className="container flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col gap-4 md:gap-6">
          <h1
            className={
              "font-display text-[4rem] font-extrabold uppercase leading-[5rem] text-primary md:text-[6rem] md:leading-[5rem]"
            }
          >
            {slice.primary.heading}
          </h1>
          <p className="max-w-[35rem] text-sm leading-6 text-black">
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
