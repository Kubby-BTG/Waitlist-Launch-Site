import DoubleSlideUpText from "@/components/animated-ui/double-slide-up-text";
import CuratedPosts from "@/components/blog-post/curated-posts";
import Arrow from "@/components/ui/arrow";
import { Button } from "@/components/ui/button";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Link from "next/link";

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
      className={"bg-background py-16"}
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
              <DoubleSlideUpText>{slice.primary.heading}</DoubleSlideUpText>
            </h2>
          </div>

          <div>
            <Button
              variant={"outline"}
              className={"flex items-center gap-1"}
              asChild
            >
              <Link href={"/blog"}>
                <span>{slice.primary.button_text}</span>
                <Arrow className={"flex-none"} />
              </Link>
            </Button>
          </div>
        </div>

        <CuratedPosts />
      </div>
    </section>
  );
};

export default FeaturedBlogPosts;
