import { createClient } from "@/prismicio";
import Navbar from "./navbar";
import StickyHeaderWrapper from "../animated-ui/sticky-header-wrapper";
import PostCard from "../blog-post/post-card";
import { TransitionLink } from "../animated-ui/transition-link";
import { asLink } from "@prismicio/client";

export default async function Header() {
  const client = createClient();

  const settings = await client.getSingle("settings");
  // const latestPosts = await getLatestBlogPost();

  return (
    <StickyHeaderWrapper>
      <header>
        <div className="flex items-center justify-center gap-2 bg-background-invert py-3 text-white">
          <p className="text-sm">Issue with your delivery {">"}</p>
          <TransitionLink
            href={asLink(settings.data.report_link) as string}
            className={"text-sm font-medium text-secondary underline"}
          >
            Report it here
          </TransitionLink>
        </div>
        {/* Navbar */}
        <Navbar
          navigation={settings.data.navigation}
          reportLink={settings.data.report_link}
          // post={<PostCard postItem={latestPosts?.[0]} />}
        />
      </header>
    </StickyHeaderWrapper>
  );
}

async function getLatestBlogPost() {
  const client = createClient();
  const posts = await client.getAllByType("blog_post", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
    limit: 1,
  });
  return posts;
}
