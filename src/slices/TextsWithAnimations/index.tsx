import StickyScrollPointsSection from "@/components/animated-ui/sticky-scroll-points-section";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextWithImage`.
 */
export type TextsWithAnimationsProps =
  SliceComponentProps<Content.TextWithImageSlice>;

/**
 * Component for "TextWithImage" Slices.
 */
const TextsWithAnimations = ({
  slice,
}: TextsWithAnimationsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <StickyScrollPointsSection slice={slice} />
    </section>
  );
};

export default TextsWithAnimations;
