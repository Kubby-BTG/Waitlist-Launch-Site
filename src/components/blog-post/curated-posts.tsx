import PostCard from "./post-card";
import { cn } from "@/lib/utils";
import { getLatestBlogPosts } from "@/prismic/blog-post";

export default async function CuratedPosts({
  className,
  limit = 3,
}: {
  className?: string;
  limit?: number;
}) {
  const latestPosts = await getLatestBlogPosts(limit);

  return (
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
      {latestPosts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
}
