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
        <div className="flex flex-col gap-6 md:gap-10">
          <span className={"text-xs uppercase leading-5 text-primary"}>
            {slice.primary.subheading}
          </span>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="heading-2 text-primary">
              <DoubleSlideUpText>{slice.primary.heading}</DoubleSlideUpText>
            </h2>
            <div className={"flex justify-start"}>
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
        </div>

        <CuratedPosts />
      </div>
    </section>
  );
};

export default FeaturedBlogPosts;
