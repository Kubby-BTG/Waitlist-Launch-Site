"use client";

import { ReactNode, useState } from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "../ui/select";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import AppModalDialog from "../ui/dialog-custom";
import { Video } from "lucide-react";
import { IWaitList } from "../../airtable/types";
import { ZodValidationHelper } from "../../utils/zod-validation-helper";
import { getWaitlistSchema } from "../../airtable/models";
import useAppFormPost from "../../hooks/useAppFormPost";
import { reasonsForJoining } from "../../utils/constants";
import AppAlertDialog, { useAppAlertDialog } from "../ui/AppAlertDialog";

const initialValue: Partial<IWaitList> = {
  email: "",
  reasonForJoining: "",
  referralCode: "",
};

function FormRequiredTag() {
  return <span className="select-none pl-[2px] font-bold text-danger">*</span>;
}

export default function WaitlistForm({ children }: { children: ReactNode }) {
  const [isSent, setIsSent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<IWaitList>>({ ...initialValue });
  const { postData, isBusy } = useAppFormPost();
  const { alertOptions, isAlertOpen, closeAlertDialog, openAlertDialog } = useAppAlertDialog();

  async function handleSubmit() {
    try {
      const schema = getWaitlistSchema();

      const validationResult = ZodValidationHelper.validate({
        schema,
        input: {
          ...formData,
          referralCode: formData.referralCode || undefined,
        },
      });

      if (validationResult.firstError) {
        openAlertDialog.warning({ title: validationResult.firstError });
        return;
      }

      const data01: any = {};

      Object.entries(validationResult.validatedData || {}).forEach(([key, value]) => {
        if (key && value) {
          data01[key] = value;
        }
      });

      const apiData = await postData({
        url: "/api/waitlist",
        formData: data01,
      });

      setFormData({ ...initialValue });
      setIsSent(true);
    } catch (error) {
      openAlertDialog.error({ title: "Not saved. Error occured" });
    }
  }

  const handleFormDataChange = ({ fieldName, val }: { fieldName: keyof IWaitList; val: any }) => {
    setFormData((prev) => ({ ...prev, [fieldName]: val }));
  };

  return (
    <>
      <AppAlertDialog handleCancel={() => closeAlertDialog()} open={isAlertOpen} config={alertOptions} />
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="cursor-pointer bg-transparent"
        role="button"
      >
        <div className="pointer-events-none cursor-none">{children}</div>
      </div>
      <AppModalDialog isOpen={isOpen}>
        <AppModalDialog.Content
          className={cn([
            "flex px-6 py-8 md:px-8",
            {
              "_max-w-[17.5rem] _max-md:w-[calc(100vw-6.5rem)] md:max-w-[32.875rem]": isSent,
            },
          ])}
        >
          {/* Filling state */}
          {!isSent ? (
            <>
              {/* Form */}
              <form className={"flex w-full flex-col gap-4"} autoComplete={"off"}>
                <div className="flex w-full items-center gap-8">
                  <h1 className={cn(["w-full font-display text-[2rem] uppercase leading-[2.5rem] text-primary"])}>
                    Join Today
                  </h1>

                  <AppModalDialog.CloseButton handleClick={() => setIsOpen(false)} />
                </div>

                {/* Fix for IOS */}
                <input type="hidden" aria-hidden="true" />

                <div className={"flex w-full flex-col gap-1"}>
                  <label htmlFor="email" className={"text-sm text-black"}>
                    Email <FormRequiredTag />
                  </label>
                  <Input
                    type="email"
                    id={"email"}
                    value={formData.email}
                    onChange={(e) => handleFormDataChange({ fieldName: "email", val: e.target.value })}
                    required
                    placeholder={"Your email"}
                  />
                </div>

                <div className={"flex w-full flex-col gap-1"}>
                  <label htmlFor="reason" className={"text-sm text-black"}>
                    Reason For Joining <FormRequiredTag />
                  </label>
                  <Select
                    required
                    value={formData.reasonForJoining}
                    onValueChange={(val) => handleFormDataChange({ fieldName: "reasonForJoining", val: val })}
                  >
                    <SelectTrigger className="w-full" id={"reason"}>
                      <SelectValue placeholder="Select..."></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {reasonsForJoining.map((issue, i) => (
                        <div key={i}>
                          {i > 0 && <SelectSeparator />}
                          <SelectItem value={issue.value}>{issue.text}</SelectItem>
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className={"flex w-full flex-col gap-1"}>
                  <label htmlFor="referralCode" className={"text-sm text-black"}>
                    Referral Code (optional)
                  </label>
                  <Input
                    type="text"
                    id={"referralCode"}
                    value={formData.referralCode}
                    onChange={(e) => handleFormDataChange({ fieldName: "referralCode", val: e.target.value })}
                    placeholder={"Enter referral code"}
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
                  {isBusy ? "Requesting Early Access..." : "Sign Up Today"}
                </Button>
              </form>

              {/* Animation */}
              <div className={"hidden w-[17rem] flex-none md:flex md:items-end"}>
                <img src={"/gifs/kube_on_red.gif"} alt="" className={"pointer-events-none h-full object-cover"} />
              </div>
            </>
          ) : (
            <div className={"flex flex-col-reverse gap-8 md:flex-row"}>
              {/* "flex flex-col justify-start gap-2 max-md:row-start-2 md:pb-8" */}
              <div className="flex flex-col justify-center gap-2 md:pb-8">
                <h1 className={"w-full font-display text-[3.25rem] uppercase leading-[3.5rem] text-primary max-md:text-center"}>
                  You&apos;re In
                </h1>

                <p className={"text-sm text-black max-md:text-center"}>You will receive an email from us soon</p>

                <Button
                  onClick={() => {
                    setIsSent(false);
                    setIsOpen(false);
                  }}
                >
                  Okay
                </Button>
              </div>

              {/* Animation */}
              {/* "flex items-end max-md:row-start-1" */}
              <div className={"flex items-center md:flex-row"}>
                <img src={"/gifs/kube_on_green.gif"} alt="" className={"pointer-events-none h-full object-cover"} />
              </div>
            </div>
          )}
          {/* Sent state */}
        </AppModalDialog.Content>
      </AppModalDialog>
    </>
  );
}
