import { Content } from "@prismicio/client";
import Arrow from "../ui/arrow";
import { Badge } from "../ui/badge";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { formatDate } from "@/lib/utils";

export default function SinglePostCard({
  post,
}: {
  post: Content.BlogPostDocument;
}) {
  return (
    <PrismicNextLink
      document={post}
      className={
        "group flex w-full flex-col gap-6 rounded-lg bg-background-secondary p-4 pb-6 shadow-none transition-all duration-500 ease-kubby hover:bg-white/80 hover:shadow-expand md:grid md:grid-cols-2 md:gap-2 md:pb-4"
      }
    >
      <div className="relative flex min-h-[23.5rem] items-center justify-center overflow-hidden rounded-[5px] bg-input">
        <PrismicNextImage
          field={post.data.featured_image}
          className={"absolute inset-0 h-full w-full object-cover"}
        />
      </div>

      <div className="flex flex-grow flex-col gap-2 justify-self-stretch px-6 text-black/80 md:px-12 md:py-8">
        <div className="flex items-center justify-between">
          <p className={"text-sm uppercase leading-6"}>{post.data.category}</p>

          <div className="flex size-8 items-center justify-center rounded-full border border-input text-black transition-all duration-500 ease-kubby group-hover:border-transparent group-hover:bg-primary group-hover:text-white">
            <Arrow className={"size-4"} />
          </div>
        </div>

        <div className="flex flex-grow flex-col gap-4">
          <PrismicRichText
            field={post.data.title}
            components={{
              heading1: ({ children }) => (
                <h2
                  className={
                    "font-display text-[2.5rem] font-extrabold uppercase leading-[3.125rem] text-primary md:text-[4rem] md:leading-none"
                  }
                >
                  {children}
                </h2>
              ),
            }}
          />

          <PrismicRichText
            field={post.data.description}
            components={{
              paragraph: ({ children }) => (
                <p className={"text-sm leading-6"}>{children}</p>
              ),
            }}
          />

          {/* <span className="flex gap-1 text-[11px] leading-5 text-gray">
            <span>{post.data.author}</span>|
            <span>
              {post.data.publication_date
                ? formatDate(post.data.publication_date)
                : ""}
            </span>
          </span> */}

          <div className="hidden flex-grow items-start gap-4 md:flex">
            {post.data.tags.map((tag, i) => (
              <Badge key={i}>{tag.label}</Badge>
            ))}
          </div>
        </div>
      </div>
    </PrismicNextLink>
  );
}
