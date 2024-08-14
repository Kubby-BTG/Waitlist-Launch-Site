import PostCard from "./post-card";
import { cn } from "@/lib/utils";
import { BlogPostDocument } from "../../../prismicio-types";

export default function CuratedPostsList({
  className,
  latestPosts,
}: {
  className?: string;
  latestPosts: BlogPostDocument<string>[];
}) {
  if (!latestPosts?.length) {
    return null;
  }

  return (
    <div className={cn(["grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3", className])}>
      {latestPosts.map((item, index) => (
        <PostCard key={index} postItem={item} />
      ))}
    </div>
  );
}
