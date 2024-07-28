import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import PageWrapper from "@/components/animated-ui/page-wrapper";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("blog_feed");

  return (
    <PageWrapper>
      <SliceZone slices={page.data.slices} components={components} />
    </PageWrapper>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("blog_feed");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
