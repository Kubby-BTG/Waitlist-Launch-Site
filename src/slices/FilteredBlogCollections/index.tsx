"use client";

import DoubleSlideUpText from "@/components/animated-ui/double-slide-up-text";
import CuratedPosts from "@/components/blog-post/curated-posts";
import FilteredPosts from "@/components/blog-post/filtered-posts";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import CuratedPostsList from "../../components/blog-post/curated-post-list";
import { BlogPostDocument } from "../../../prismicio-types";
import { getLatestBlogPosts } from "../../prismic/blog-post";

/**
 * Props for `FilteredBlogCollections`.
 */
export type FilteredBlogCollectionsProps = SliceComponentProps<Content.FilteredBlogCollectionsSlice>;

/**
 * Component for "FilteredBlogCollections" Slices.
 */
const FilteredBlogCollections = ({ slice }: FilteredBlogCollectionsProps): JSX.Element => {
  const [categories, setCategories] = useState<string[]>([]);
  const [latestPosts, setLatestPosts] = useState<BlogPostDocument<string>[]>([]);

  useEffect(() => {
    getLatestPosts().catch(() => {});
  }, [categories]);

  async function getLatestPosts() {
    try {
      const posts01 = await getLatestBlogPosts({
        limit: 50,
        categories,
      });

      setLatestPosts(posts01);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={"bg-background py-16"}>
      <div className="container flex flex-col gap-10">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="font-display text-[4rem] font-extrabold uppercase leading-[3.5rem] text-primary md:text-[5rem] md:leading-[3.5rem]">
                <DoubleSlideUpText>{children}</DoubleSlideUpText>
              </h2>
            ),
            strong: ({ children }) => <strong className="text-brand-500">{children}</strong>,
          }}
        />

        <FilteredPosts handleRunFilter={(f) => setCategories(f.categories)} />
        <CuratedPostsList latestPosts={latestPosts} />
      </div>
    </section>
  );
};

export default FilteredBlogCollections;
