import KubbyLogo from "@/components/ui/kubby-logo";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Link from "next/link";

/**
 * Props for `Content`.
 */
export type PostContentProps = SliceComponentProps<Content.ContentSlice>;

/**
 * Component for "Content" Slices.
 */
const PostContent = ({ slice }: PostContentProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"flex flex-col gap-6 text-black"}
    >
      <PrismicRichText
        field={slice.primary.rich_text}
        components={{
          heading2: ({ children }) => (
            <h2 className="mt-[clamp(3.5rem,4.7619vw,5rem)] font-bold -tracking-[0.03em] [font-size:_clamp(1.5rem,2.381vw,2.5rem)]">
              {children}
            </h2>
          ),

          heading3: ({ children }) => (
            <h3 className="mt-[clamp(2.5rem,3.75vw,3.75rem)] font-bold -tracking-[0.03em] [font-size:_clamp(1.25rem,2.143vw,2.25rem)]">
              {children}
            </h3>
          ),

          heading4: ({ children }) => (
            <h4 className="mt-[clamp(1.5rem,2.381vw,2.5rem)] font-bold -tracking-[0.03em] [font-size:_clamp(1rem,1.428vw,1.5rem)]">
              {children}
            </h4>
          ),

          paragraph: ({ children }) => <p className="text-lg">{children}</p>,

          hyperlink: ({ children, node }) => (
            <Link
              className="font-bold text-background-icon underline underline-offset-1"
              href={node.data.url as string}
              target={node.data.link_type === "Web" ? "_blank" : "_self"}
            >
              {children}
            </Link>
          ),

          list: ({ children }) => (
            <ul className="mt-4 flex flex-col gap-8">{children}</ul>
          ),

          oList: ({ children }) => (
            <ul className="mt-4 flex flex-col gap-8">{children}</ul>
          ),

          listItem: ({ children }) => (
            <li className="flex items-center gap-4 text-lg">
              <KubbyLogo iconOnly className={"size-3 text-brand"} /> {children}
            </li>
          ),

          oListItem: ({ children }) => (
            <li className="list-inside list-decimal text-lg">{children}</li>
          ),
        }}
      />
    </section>
  );
};

export default PostContent;
