import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { asText } from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { formatDate } from "@/lib/utils";
import { PrismicNextImage } from "@prismicio/next";
// import CuratedPosts from "@/components/blog-post/curated-posts";
import PageWrapper from "@/components/animated-ui/page-wrapper";
import { TransitionLink } from "@/components/animated-ui/transition-link";
import KubbyLogo from "@/components/ui/kubby-logo";
import { AppConfig } from "../../../utils/constants";
import AppSocialMediaShareButton from "../../../components/ui/AppSocialMediaShareButton";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client.getByUID("blog_post", params.uid).catch(() => notFound());

  function SocialMediaShareButtons() {
    if (!page.uid) return null;
    return <AppSocialMediaShareButton title={asText(page.data.title)} shareUrl={`${AppConfig().CURRENT_SITE_URL}${page.url}`} />;
  }

  return (
    <PageWrapper>
      <div className="container relative mx-auto grid py-16 lg:grid-cols-12 lg:pb-14 lg:pt-12">
        <div className="relative w-full gap-10 lg:col-span-8 lg:col-start-3">
          {/* Above section */}
          <div className={"mx-auto flex w-full flex-col lg:mt-16"}>
            <p
              className={
                "mb-[clamp(1.5rem,2.381vw,2.5rem)] flex items-center gap-3 text-sm font-medium uppercase leading-6 text-primary opacity-70"
              }
            >
              <TransitionLink href={"/blog"}>Blog</TransitionLink> <KubbyLogo iconOnly className={"size-3 text-primary"} />
              {page.data.category}
            </p>
            <PrismicRichText
              field={page.data.title}
              components={{
                heading1: ({ children }) => <h1 className={"heading-blog text-primary"}>{children}</h1>,
              }}
            />
            <span className="mt-6 flex gap-1 text-sm leading-5 text-primary">
              <span>{page.data.author}</span>|
              <span>{page.data.publication_date ? formatDate(page.data.publication_date) : ""}</span>
            </span>
          </div>

          <div className="relative mt-[clamp(1.5rem,2.381vw,2.5rem)] aspect-video w-full overflow-hidden rounded-[5px] lg:rounded-lg">
            <PrismicNextImage field={page.data.featured_image} className={"absolute inset-0 object-cover"} alt="" />
          </div>

          <div className="mt-7">
            <SocialMediaShareButtons />
          </div>

          <div className="relative mt-[clamp(2rem,3.571vw,3.75rem)] grid lg:pr-10">
            <SliceZone slices={page.data.slices} components={components} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("blog_post", params.uid).catch(() => notFound());

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
