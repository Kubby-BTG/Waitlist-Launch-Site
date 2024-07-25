import CuratedPosts from "@/components/blog-post/curated-posts";
import Arrow from "@/components/ui/arrow";
import { Button } from "@/components/ui/button";
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
      className={"bg-background py-16 md:py-[9.5rem]"}
    >
      <div className="container flex flex-col gap-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <span className={"text-xs uppercase leading-5 text-primary"}>
              {slice.primary.subheading}
            </span>
            <h2
              className={
                "font-display text-[3.25rem] font-extrabold uppercase leading-[3.5rem] text-primary"
              }
            >
              {slice.primary.heading}
            </h2>
          </div>

          <div>
            <Button variant={"outline"} className={"flex items-center gap-1"}>
              <span>{slice.primary.button_text}</span>
              <Arrow className={"flex-none"} />
            </Button>
          </div>
        </div>

        <CuratedPosts />
      </div>
    </section>
  );
};

export default FeaturedBlogPosts;
