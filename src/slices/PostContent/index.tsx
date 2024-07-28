import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

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
      className={"text-black/80"}
    >
      <PrismicRichText
        field={slice.primary.rich_text}
        components={{
          paragraph: ({ children }) => <p className="text-lg">{children}</p>,
        }}
      />
    </section>
  );
};

export default PostContent;
