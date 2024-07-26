import { createClient } from "@/prismicio";
import { cn } from "@/lib/utils";
import * as prismic from "@prismicio/client";
import SinglePostCard from "./single-post-card";

export default async function SingleFeaturedBlogPost({
  className,
}: {
  className?: string;
}) {
  const featuredPost = await getFeaturedBlogPosts();

  return (
    <div className={cn("grid", className)}>
      {featuredPost && <SinglePostCard post={featuredPost} />}
    </div>
  );
}

async function getFeaturedBlogPosts() {
  const client = createClient();

  const posts = await client.getByType("blog_post", {
    filters: [prismic.filter.at("my.blog_post.featured_post", true)],
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
  });

  return posts.results.length > 0 ? posts.results[0] : null;
}
