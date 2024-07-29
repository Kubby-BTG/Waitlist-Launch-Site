import { Content } from "@prismicio/client";
import Arrow from "../ui/arrow";
import { Badge } from "../ui/badge";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { formatDate } from "@/lib/utils";
import KubbyLogo from "../ui/kubby-logo";

export default function SinglePostCard({
  post,
}: {
  post: Content.BlogPostDocument;
}) {
  return (
    <PrismicNextLink
      document={post}
      className={
        "group flex w-full flex-col gap-6 rounded-lg bg-background-secondary p-3 pb-8 shadow-none transition-all duration-500 ease-kubby hover:bg-white/80 hover:shadow-expand lg:grid lg:grid-cols-2 lg:gap-2 lg:pb-4"
      }
    >
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[5px] bg-input lg:aspect-auto lg:min-h-[23.5rem] xl:aspect-[12/8]">
        <PrismicNextImage
          field={post.data.featured_image}
          className={"absolute inset-0 h-full w-full object-cover"}
        />
      </div>

      <div className="_lg:px-12 flex flex-grow flex-col gap-2 justify-self-stretch px-3.5 text-primary lg:px-20 lg:py-8 xl:px-24">
        <div className="flex items-center justify-between lg:mb-4">
          <p
            className={
              "flex items-center gap-2.5 text-xs font-medium uppercase leading-6 text-primary"
            }
          >
            <span>Blog</span>{" "}
            <KubbyLogo iconOnly className={"size-2.5 text-primary"} />
            {post.data.category}
          </p>

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
                    "font-display text-[3rem] font-extrabold uppercase leading-[3.125rem] text-primary lg:leading-[0.85] lg:[font-size:_clamp(3rem,4.76vw,5rem)]"
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
                <p className={"text-balance pr-2 text-base md:text-lg"}>
                  {children}
                </p>
              ),
            }}
          />

          <span className="flex gap-1 text-sm leading-5 text-primary">
            <span>{post.data.author}</span>|
            <span>
              {post.data.publication_date
                ? formatDate(post.data.publication_date)
                : ""}
            </span>
          </span>

          <div className="flex flex-grow items-start gap-4">
            {post.data.tags.map((tag, i) => (
              <Badge key={i}>{tag.label}</Badge>
            ))}
          </div>

          {/* <span className="mt-auto hidden gap-1 text-[11px] leading-5 text-gray md:flex">
            <span>{post.data.author}</span>|
            <span>
              {post.data.publication_date
                ? formatDate(post.data.publication_date)
                : ""}
            </span>
          </span> */}
        </div>
      </div>
    </PrismicNextLink>
  );
}
