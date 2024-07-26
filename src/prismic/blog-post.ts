import { createClient } from "@/prismicio";

export async function getLatestBlogPosts(limit = 3) {
  const client = createClient();
  const posts = await client.getAllByType("blog_post", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
    limit,
  });
  return posts;
}
