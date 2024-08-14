import PostCard from "./post-card";
import { cn } from "@/lib/utils";
import { getLatestBlogPosts } from "@/prismic/blog-post";
import CuratedPostsList from "./curated-post-list";

export default async function CuratedPosts({
  className,
  limit = 3,
  categories,
}: {
  className?: string;
  limit?: number;
  categories?: string[];
}) {
  const latestPosts = await getLatestBlogPosts({ limit, categories });
  return <CuratedPostsList latestPosts={latestPosts} className={className} />;
}
