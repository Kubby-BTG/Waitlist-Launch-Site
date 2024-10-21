import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import PageWrapper from "@/components/animated-ui/page-wrapper";
import { AppDescription, ApplicationSiteName } from "../utils/constants";
import Footer from "@/components/global/footer";
import Header from "@/components/global/header";

export const revalidate = 30;

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return (
    <>
      <Header />
      <PageWrapper>
        <SliceZone slices={page.data.slices} components={components} />
      </PageWrapper>
      <Footer />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return {
    title: page.data.title || ApplicationSiteName,
    description: page.data.meta_description || AppDescription,
  };
}
