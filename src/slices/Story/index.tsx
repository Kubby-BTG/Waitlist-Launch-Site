import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Story`.
 */
export type StoryProps = SliceComponentProps<Content.StorySlice>;

/**
 * Component for "Story" Slices.
 */
const Story = ({ slice }: StoryProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for story (variation: {slice.variation}) Slices
    </section>
  );
};

export default Story;
