import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `PartnershipForm`.
 */
export type PartnershipFormProps =
  SliceComponentProps<Content.PartnershipFormSlice>;

/**
 * Component for "PartnershipForm" Slices.
 */
const PartnershipForm = ({ slice }: PartnershipFormProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for partnership_form (variation: {slice.variation})
      Slices
    </section>
  );
};

export default PartnershipForm;
