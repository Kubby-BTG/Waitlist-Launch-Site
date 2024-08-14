import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";

export async function getLatestBlogPosts({ limit, categories }: { limit?: number; categories?: string[] } = {}) {
  const client = createClient();

  const filters: string[] = [];

  if (categories?.length) {
    filters.push(prismic.filter.any("my.blog_post.category", categories));
  }

  const posts = await client.getAllByType("blog_post", {
    fetchOptions: {
      cache: "no-store",
      next: { tags: ["prismic", "blog_posts"] },
    },
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
    filters,
    limit: limit || 10,
  });
  return posts;
}
