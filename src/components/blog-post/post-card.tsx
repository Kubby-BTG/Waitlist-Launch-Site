import { Content } from "@prismicio/client";
import Arrow from "../ui/arrow";
import { Badge } from "../ui/badge";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

export default function PostCard({ post }: { post: Content.BlogPostDocument }) {
  return (
    <PrismicNextLink
      document={post}
      className={
        "hover:shadow-expand ease-kubby group flex w-full flex-col gap-4 rounded-lg bg-background-secondary p-4 pb-6 shadow-none transition-all duration-500 hover:bg-white/80"
      }
    >
      <div className="relative flex h-[12.5rem] items-center justify-center overflow-hidden rounded-[5px] bg-input">
        <PrismicNextImage
          field={post.data.featured_image}
          className={"absolute inset-0 object-cover"}
        />
      </div>

      <div className="flex flex-grow flex-col gap-6 justify-self-stretch text-black/80">
        <div className="flex items-center justify-between">
          <p className={"text-xs uppercase leading-6"}>{post.data.category}</p>

          <div className="ease-kubby flex size-8 items-center justify-center rounded-full border border-input text-black transition-all duration-500 group-hover:border-transparent group-hover:bg-primary group-hover:text-white">
            <Arrow className={"size-4"} />
          </div>
        </div>

        <div className="flex flex-grow flex-col gap-4">
          <PrismicRichText
            field={post.data.title}
            components={{
              heading1: ({ children }) => (
                <h3 className={"text-lg font-bold leading-6"}>{children}</h3>
              ),
            }}
          />

          <PrismicRichText
            field={post.data.description}
            components={{
              paragraph: ({ children }) => (
                <p className={"text-xs leading-5"}>{children}</p>
              ),
            }}
          />

          <span className="text-gray flex gap-1 text-[11px] leading-5">
            <span>{post.data.author}</span>|
            <span>{post.data.publication_date}</span>
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
