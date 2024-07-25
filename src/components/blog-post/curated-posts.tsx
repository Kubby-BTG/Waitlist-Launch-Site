import { createClient } from "@/prismicio";
import PostCard from "./post-card";
import { cn } from "@/lib/utils";

export default async function CuratedPosts({
  className,
}: {
  className?: string;
}) {
  const latestPosts = await getLatestBlogPosts();

  return (
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
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
