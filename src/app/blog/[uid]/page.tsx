import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { formatDate } from "@/lib/utils";
import { PrismicNextImage } from "@prismicio/next";
import CuratedPosts from "@/components/blog-post/curated-posts";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  return (
    <div className="flex flex-col gap-10 py-16 md:flex-row md:gap-20 md:pb-14 md:pt-12">
      <div className="flex w-full flex-grow flex-col gap-10">
        {/* Above section */}
        <div className={"flex flex-col gap-4 md:mt-16 md:gap-10"}>
          <PrismicRichText
            field={page.data.title}
            components={{
              heading1: ({ children }) => (
                <h1
                  className={
                    "text-[2rem] font-bold leading-[2rem] text-primary"
                  }
                >
                  {children}
                </h1>
              ),
            }}
          />
          <span className="flex gap-1 text-[11px] leading-5 text-gray md:text-sm md:leading-5">
            <span>{page.data.author}</span>|
            <span>
              {page.data.publication_date
                ? formatDate(page.data.publication_date)
                : ""}
            </span>
          </span>
        </div>
        <div className="relative aspect-video max-w-[44rem] overflow-hidden rounded-[5px] md:rounded-lg">
          <PrismicNextImage
            field={page.data.featured_image}
            className={"absolute inset-0 object-cover"}
          />
        </div>
        <SliceZone slices={page.data.slices} components={components} />
      </div>

      <div className={"flex flex-col gap-4 md:max-w-[17rem]"}>
        <p
          className={
            "font-display text-[2.625rem] uppercase leading-[3rem] text-primary-darker"
          }
        >
          More <span className={"text-brand"}>Stories</span>
        </p>
        <CuratedPosts className={"md:grid-cols-1"} />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
