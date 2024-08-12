import { Content } from "@prismicio/client";
import Arrow from "../ui/arrow";
import { Badge } from "../ui/badge";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { formatDate } from "@/lib/utils";
import KubbyLogo from "../ui/kubby-logo";

export default function PostCard({ post }: { post: Content.BlogPostDocument }) {
  return (
    <PrismicNextLink
      document={post}
      className={
        "group flex w-full flex-col gap-6 rounded-2xl bg-background-secondary p-4 pb-6 shadow-none transition-all duration-500 ease-kubby hover:bg-white/80 hover:shadow-expand"
      }
    >
      <div className="relative flex aspect-[5/3] w-full items-center justify-center overflow-hidden rounded-lg bg-input">
        <PrismicNextImage field={post.data.featured_image} className={"absolute inset-0 h-full w-full object-cover"} alt="" />
      </div>

      <div className="flex flex-grow flex-col gap-5 justify-self-stretch px-3.5 text-primary sm:px-4 lg:px-6">
        <div className="flex items-center justify-between">
          <p className={"flex items-center gap-2.5 text-xs font-medium uppercase leading-6 text-primary"}>
            <span>Blog</span> <KubbyLogo iconOnly className={"size-2.5 text-primary"} />
            {post.data.category}
          </p>

          <div className="flex size-8 items-center justify-center rounded-full border border-input text-black transition-all duration-500 ease-kubby group-hover:border-transparent group-hover:bg-primary group-hover:text-white">
            <Arrow className={"size-4"} />
          </div>
        </div>

        <div className="flex flex-grow flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <PrismicRichText
              field={post.data.title}
              components={{
                heading1: ({ children }) => {
                  return <h1 className={"text-lg font-bold leading-6 lg:text-xl"}>{children}</h1>;
                },
              }}
            />
            <PrismicRichText
              field={post.data.description}
              components={{
                paragraph: ({ children }) => <p className={"text-base md:pr-2 md:text-lg"}>{children}</p>,
              }}
            />
          </div>

          <span className="flex gap-1 text-sm leading-5 text-primary">
            <span>{post.data.author}</span>|
            <span>{post.data.publication_date ? formatDate(post.data.publication_date) : ""}</span>
          </span>

          <div className="flex flex-grow items-end gap-4">
            {post.data.tags.map((tag, i) => (
              <Badge key={i}>{tag.label}</Badge>
            ))}
          </div>
        </div>
      </div>
    </PrismicNextLink>
  );
}
