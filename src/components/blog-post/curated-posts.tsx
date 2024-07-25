import { createClient } from "@/prismicio";
import PostCard from "./post-card";

export default async function CuratedPosts() {
  const latestPosts = await getLatestBlogPosts();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {latestPosts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
}

async function getLatestBlogPosts() {
  const client = createClient();
  const posts = await client.getAllByType("blog_post", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
    limit: 3,
  });
  return posts;
}
