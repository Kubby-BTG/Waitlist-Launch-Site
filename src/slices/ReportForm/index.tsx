import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Fragment } from "react";

/**
 * Props for `ReportForm`.
 */
export type ReportFormProps = SliceComponentProps<Content.ReportFormSlice>;

/**
 * Component for "ReportForm" Slices.
 */
const ReportForm = ({ slice }: ReportFormProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"relative bg-background py-12 md:py-32"}
    >
      <div
        className={
          "relative mx-auto w-full max-w-[44rem] bg-primary px-8 pb-[7.5rem] pt-[4.5rem] md:overflow-visible md:rounded-3xl md:pb-[14rem] md:pt-20"
        }
      >
        {/* Decorations */}
        <div className="absolute inset-0 py-20">
          <img
            src="/decorations/scribble.svg"
            alt=""
            className="h-full object-cover"
          />
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 pt-32 md:pt-24">
          <img src="/decorations/box-pattern.svg" alt="" />
        </div>

        <div className="absolute left-0 top-1/2 hidden -translate-y-full md:block">
          <img
            src="/decorations/ku-sticker.svg"
            alt=""
            className={"-translate-x-1/2"}
          />
        </div>

        <div className="absolute bottom-14 left-1 block md:hidden">
          <img src="/decorations/ku-sticker.svg" alt="" className={""} />
        </div>

        <div className="absolute -right-24 bottom-1/2 block hidden -translate-y-40 md:block">
          <img src="/decorations/star.svg" alt="" className={""} />
        </div>

        {/* Content */}
        <div className="relative mx-auto flex w-full max-w-[26rem] flex-col gap-6 md:gap-2.5">
          <div className={"flex flex-col gap-1"}>
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading2: ({ children }) => (
                  <h2 className="text-center font-display text-[2.625rem] font-extrabold uppercase leading-[3rem] text-white md:text-[4rem] md:leading-[4rem]">
                    {children}
                  </h2>
                ),
                strong: ({ children }) => (
                  <strong className="text-secondary">{children}</strong>
                ),
              }}
            />

            <div className={"flex flex-col"}>
              <PrismicRichText
                field={slice.primary.body}
                components={{
                  paragraph: ({ children }) => (
                    <p className={"text-center text-sm text-white"}>
                      {children}
                    </p>
                  ),
                }}
              />
              <a
                href="#"
                className="w-full text-center text-[0.625rem] font-bold uppercase leading-[1.25rem] text-secondary underline"
              >
                <>{slice.primary.disclaimer_text}</>
              </a>
            </div>
          </div>
          <form className="flex flex-col gap-4 rounded-lg bg-white p-8">
            <h3
              className={
                "font-display text-[2rem] font-extrabold leading-[2.5rem] text-primary"
              }
            >
              <>{slice.primary.form_title}</>
            </h3>

            <div className={"flex w-full flex-col gap-1"}>
              <label htmlFor="email" className={"text-sm text-black"}>
                Email*
              </label>
              <Input
                type="email"
                id={"email"}
                required
                placeholder={"Your email"}
              />
            </div>
            <div className={"flex w-full flex-col gap-1"}>
              <label htmlFor="zipcode" className={"text-sm text-black"}>
                Zipcode*
              </label>
              <Input
                type="text"
                id={"zipcode"}
                required
                placeholder={"Your zipcode"}
              />
            </div>
            <div className={"flex w-full flex-col gap-1"}>
              <label htmlFor="delivery-issue" className={"text-sm text-black"}>
                Delivery Issue*
              </label>
              <Select>
                <SelectTrigger className="w-full" id={"delivery-issue"}>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {deliveryIssues.map((issue, i) => (
                    <Fragment key={i}>
                      {i > 0 && <SelectSeparator />}
                      <SelectItem value={issue}>{issue}</SelectItem>
                    </Fragment>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className={"flex w-full flex-col gap-1"}>
              <label
                htmlFor="shipping-carrier"
                className={"text-sm text-black"}
              >
                Shipping Carrier*
              </label>
              <Select>
                <SelectTrigger className="w-full" id={"shipping-carrier"}>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {deliveryCompanies.map((company, i) => (
                    <Fragment key={i}>
                      {i > 0 && <SelectSeparator />}
                      <SelectItem key={i} value={company.value}>
                        {company.element}
                      </SelectItem>
                    </Fragment>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className={"flex w-full flex-col gap-1"}>
              <label htmlFor="purchase-store" className={"text-sm text-black"}>
                Purchase store*
              </label>
              <Input
                type="text"
                id={"purchase-store"}
                required
                placeholder={"Name of store"}
              />
            </div>
            <div className={"flex w-full flex-col gap-1"}>
              <label htmlFor="delivery-date" className={"text-sm text-black"}>
                Delivery Date*
              </label>
              <Input
                type="date"
                id={"delivery-date"}
                required
                placeholder={"dd/mm/yyyy"}
              />
            </div>

            <Button>Send Package</Button>
          </form>
        </div>
        <video
          src="/animations/kube-on-pen.webm"
          loop
          autoPlay
          muted
          className={
            "absolute bottom-0 right-0 h-[140px] md:bottom-9 md:h-[204px]"
          }
        ></video>
      </div>
    </section>
  );
};

const deliveryIssues = [
  "Stolen/Lost Package",
  "Missed Delivery",
  "Damaged Item",
  "Incorrect Address/Wrong Address",
];

const deliveryCompanies = [
  {
    name: "Amazon",
    logo: "/carriers/amazon.svg",
  },
  {
    name: "UPS",
    logo: "/carriers/UPS.svg",
  },
  {
    name: "Fedex",
    logo: "/carriers/FedEx.svg",
  },
  {
    name: "DHL",
    logo: "/carriers/DHL.svg",
  },
  {
    name: "USPS",
    logo: "/carriers/USPS.svg",
  },
].map((company) => ({
  value: company.name.toLowerCase(),
  element: (
    <span key={company.name} className="flex items-center gap-x-2">
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className="h-6 w-6 object-contain"
        loading="lazy"
        decoding={"async"}
      />
      <span>{company.name}</span>
    </span>
  ),
}));

export default ReportForm;
