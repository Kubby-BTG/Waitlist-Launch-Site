"use client";

import DoubleSlideUpText from "@/components/animated-ui/double-slide-up-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from "@/components/ui/select";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Fragment, useEffect, useState } from "react";
import useAppFormPost from "../../hooks/useAppFormPost";
import { IDeliveryIssue } from "../../airtable/types";
import { ZodValidationHelper } from "../../utils/zod-validation-helper";
import { getDeliveryIssueSchema } from "../../airtable/models";
import { deliveryCompaniesWithLogo } from "../../utils/selection-data";
import { deliveryIssues } from "@/utils/constants";
import AppDatePicker from "@/components/ui/AppDatePicker";
import AppAlertDialog, { useAppAlertDialog } from "../../components/ui/AppAlertDialog";
import useAppDebounceValue from "../../hooks/useAppDebounceValue";
import { GoogleMapService } from "../../utils/google-map-service";

function FormRequiredTag() {
  return <span className="select-none pl-1 text-danger">*</span>;
}

/**
 * Props for `ReportForm`.
 */
export type ReportFormProps = SliceComponentProps<Content.ReportFormSlice>;

type IDeliveryIssueExtra = IDeliveryIssue & { cities: string[] };

const initialValue: Partial<IDeliveryIssueExtra> = {
  email: "",
  issue: "",
  purchase_store_name: "",
  shipping_carrier: "",
  zipcode: "",
  delivery_date: "",
  zipcode_latitude: 0,
  zipcode_longitude: 0,
  city: "",
  state: "",
  cities: [],
};

const ReportFormBase = ({ slice }: { slice: ReportFormProps["slice"] }): JSX.Element => {
  const [formData, setFormData] = useState<Partial<IDeliveryIssueExtra>>({ ...initialValue });
  const { postData, isBusy } = useAppFormPost();
  const { alertOptions, isAlertOpen, closeAlertDialog, openAlertDialog } = useAppAlertDialog();

  const zipcode01 = useAppDebounceValue({ delay: 1600, value: formData.zipcode });

  useEffect(() => {
    console.log({ zipcode01 });

    if (zipcode01) {
      getLocationByZipCode(zipcode01).catch((e) => {
        console.error(e);
      });
    } else {
      resetLocation();
    }
  }, [zipcode01]);

  async function getLocationByZipCode(zipcode: string) {
    const result01 = await GoogleMapService.getLocationInfoByZipcode(zipcode);
    console.log({ result01 });
    if (result01?.length) {
      const data = result01[0];

      setFormData((prev) => {
        return {
          ...prev,
          city: data.city,
          state: data.state,
          zipcode_latitude: data.locationCoordinates.lat,
          zipcode_longitude: data.locationCoordinates.lng,
          cities: data.postcodeLocalities,
        };
      });
    } else {
      resetLocation();
    }
  }

  function resetLocation() {
    setFormData((prev) => {
      return {
        ...prev,
        city: "",
        state: "",
        zipcode_latitude: 0,
        zipcode_longitude: 0,
        cities: [],
      };
    });
  }

  async function handleSubmit() {
    try {
      const schema = getDeliveryIssueSchema();

      const validationResult = ZodValidationHelper.validate({ schema, input: formData });

      if (validationResult.firstError) {
        openAlertDialog.warning({ title: validationResult.firstError });
        return;
      }

      const apiData = await postData({
        url: "/api/delivery-issue",
        formData: validationResult.validatedData,
      });

      setFormData({ ...initialValue });
    } catch (error) {
      openAlertDialog.error({ title: "Not saved. Error occured" });
    }
  }

  const handleFormDataChange = ({ fieldName, val }: { fieldName: keyof IDeliveryIssue; val: any }) => {
    setFormData((prev) => ({ ...prev, [fieldName]: val }));
  };

  return (
    <>
      <AppAlertDialog handleCancel={() => closeAlertDialog()} open={isAlertOpen} config={alertOptions} />

      <div className="relative flex w-full flex-col gap-6 md:gap-10">
        <div className={"mx-auto flex max-w-[32rem] flex-col gap-1"}>
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }) => (
                <h2 className="heading-3 flex flex-col items-center text-center text-white">
                  <DoubleSlideUpText>{children}</DoubleSlideUpText>
                </h2>
              ),
              strong: ({ children }) => <strong className="block text-secondary">{children}</strong>,
            }}
          />

          <div className={"flex flex-col"}>
            <PrismicRichText
              field={slice.primary.body}
              components={{
                paragraph: ({ children }) => <p className={"text-center text-sm text-white"}>{children}</p>,
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
        <form className="mx-auto flex w-full max-w-[26rem] flex-col gap-4 rounded-lg bg-white p-8">
          <h3 className={"font-display text-[2rem] font-extrabold uppercase leading-[2.5rem] text-background-icon"}>
            <>{slice.primary.form_title}</>
          </h3>

          <div className={"flex w-full flex-col gap-1"}>
            <label htmlFor="email" className={"text-sm text-black"}>
              Email
              <FormRequiredTag />
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleFormDataChange({ fieldName: "email", val: e.target.value })}
              id={"email"}
              required
              placeholder={"Your email"}
            />
          </div>

          <div className={"flex w-full flex-col gap-1"}>
            <label htmlFor="zipcode" className={"text-sm text-black"}>
              Zipcode
              <FormRequiredTag />
            </label>
            <Input
              type="number"
              value={formData.zipcode}
              onChange={(e) => handleFormDataChange({ fieldName: "zipcode", val: e.target.value })}
              id={"zipcode"}
              required
              placeholder={"Your zipcode"}
              onBlur={() => {
                console.log({ onBlur: true });
              }}
            />
          </div>

          {formData.state && (
            <div className={"flex w-full flex-col gap-1"}>
              <label htmlFor="city" className={"text-sm text-black"}>
                State
              </label>
              <Input
                type="text"
                readOnly
                value={formData.state}
                onChange={(e) => {}}
                id={"state"}
                required
                placeholder={"State"}
              />
            </div>
          )}

          {formData.cities?.length ? (
            <div className={"flex w-full flex-col gap-1"}>
              <label htmlFor="city" className={"text-sm text-black"}>
                City
              </label>
              <Select value={formData.city} onValueChange={(val) => handleFormDataChange({ fieldName: "city", val })}>
                <SelectTrigger className="w-full" id={"city"}>
                  <SelectValue placeholder="Select city..." />
                </SelectTrigger>
                <SelectContent>
                  {formData.cities.map((city, i) => (
                    <div key={`cities_0_${i}${city}`}>
                      {i > 0 && <SelectSeparator />}
                      <SelectItem value={city}>{city}</SelectItem>
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}

          <div className={"flex w-full flex-col gap-1"}>
            <label htmlFor="delivery-issue" className={"text-sm text-black"}>
              Delivery Issue
              <FormRequiredTag />
            </label>
            <Select value={formData.issue} onValueChange={(val) => handleFormDataChange({ fieldName: "issue", val })}>
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
            <label htmlFor="shipping-carrier" className={"text-sm text-black"}>
              Shipping Carrier
              <FormRequiredTag />
            </label>
            <Select
              value={formData.shipping_carrier}
              onValueChange={(val) => handleFormDataChange({ fieldName: "shipping_carrier", val })}
            >
              <SelectTrigger className="w-full" id={"shipping-carrier"}>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {deliveryCompaniesWithLogo.map((company, i) => (
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
              Purchase store
              <FormRequiredTag />
            </label>
            <Input
              type="text"
              value={formData.purchase_store_name}
              onChange={(e) => handleFormDataChange({ fieldName: "purchase_store_name", val: e.target.value })}
              id={"purchase-store"}
              required
              placeholder={"Name of store"}
            />
          </div>

          <div className={"flex w-full flex-col gap-1"}>
            <label htmlFor="delivery-date" className={"text-sm text-black"}>
              Delivery Date
              <FormRequiredTag />
            </label>
            <AppDatePicker
              date={formData.delivery_date}
              handleDateChange={(val) => handleFormDataChange({ fieldName: "delivery_date", val })}
              placeholder={"pick delivery date"}
            />
          </div>

          <Button
            type={"button"}
            disabled={isBusy}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit().catch(() => {});
            }}
          >
            {isBusy ? "Submiting Report Delivery..." : "Report Delivery"}
          </Button>
        </form>
      </div>
    </>
  );
};

/**
 * Component for "ReportForm" Slices.
 */
const ReportForm = ({ slice }: ReportFormProps): JSX.Element => {
  return (
    <section
      id={"report-form"}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"relative bg-background pt-12 md:py-32"}
    >
      <div
        className={
          "relative mx-auto w-full max-w-[44rem] bg-primary px-8 pb-[8.5rem] pt-[4.5rem] md:overflow-visible md:rounded-3xl md:pb-[14rem] md:pt-20"
        }
      >
        {/* Decorations */}

        {/* <video
          autoPlay
          loop
          muted
          className={"pointer-events-none absolute bottom-0 right-0 h-[140px] md:-bottom-1.5 md:hidden md:h-[204px]"}
          playsInline
        >
          <source src="/animations/kube_on_pen.mp4" type="video/mp4" />
        </video> */}

        <img
          src={"/gifs/kube_on_pen_greenhair.gif"}
          alt=""
          className={"pointer-events-none absolute bottom-0 right-0 h-[140px] md:-bottom-1.5 md:hidden md:h-[204px]"}
        />

        <div className="absolute inset-0 py-20">
          <img src="/decorations/scribble.svg" alt="" className="h-full object-cover" loading={"lazy"} decoding={"async"} />
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 pt-32 md:pt-24">
          <img src="/decorations/box-pattern.svg" alt="" loading={"lazy"} decoding={"async"} />
        </div>

        <div className="absolute left-0 top-1/2 hidden -translate-y-full md:block">
          <img src="/decorations/ku-sticker.svg" alt="" className={"-translate-x-1/2"} loading={"lazy"} decoding={"async"} />
        </div>

        <div className="absolute bottom-14 left-1 block md:hidden">
          <img src="/decorations/ku-sticker.svg" alt="" className={""} loading={"lazy"} decoding={"async"} />
        </div>

        <div className="absolute -right-24 bottom-1/2 block hidden -translate-y-40 md:block">
          <img src="/decorations/star.svg" alt="" className={""} loading={"lazy"} decoding={"async"} />
        </div>

        {/* Content */}
        <ReportFormBase slice={slice} />

        {/* <video
          src="/animations/kube-on-pen.webm"
          loop
          autoPlay
          muted
          className={"pointer-events-none absolute bottom-0 right-0 h-[140px] max-md:hidden md:-bottom-1.5 md:h-[204px]"}
        /> */}

        <img
          src={"/gifs/kube_on_pen_whitehair.gif"}
          alt=""
          className={"pointer-events-none absolute bottom-0 right-0 h-[140px] max-md:hidden md:-bottom-1.5 md:h-[204px]"}
        />
      </div>
    </section>
  );
};

export default ReportForm;
