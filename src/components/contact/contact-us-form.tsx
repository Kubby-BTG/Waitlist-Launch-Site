"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";
import { Textarea } from "../ui/textarea";
import { IContact } from "../../airtable/types";
import useAppFormPost from "../../hooks/useAppFormPost";
import { getContactSchema } from "../../airtable/models";
import { ZodValidationHelper } from "../../utils/zod-validation-helper";
import useAppAlertDialog from "../../hooks/useAppAlertDialog";
import AppAlertDialog from "../ui/AppAlertDialog";

const initialValue: Partial<IContact> = {
  email: "",
  comment: "",
  name: "",
  phone: "",
};

export default function ContactUsForm() {
  const [formData, setFormData] = useState<Partial<IContact>>({ ...initialValue });
  const { postData, isBusy } = useAppFormPost();
  const { alertMessages, isAlertOpen, closeAlertDialog, openAlertDialog } = useAppAlertDialog();

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  async function handleSubmit() {
    try {
      const schema = getContactSchema();

      const validationResult = ZodValidationHelper.validate({ schema, input: formData });

      if (validationResult.firstError) {
        openAlertDialog.warning({ title: validationResult.firstError });
        return;
      }

      const apiData = await postData({
        url: "/api/contact",
        formData: validationResult.validatedData,
      });

      setFormData({ ...initialValue });
    } catch (error) {
      openAlertDialog.error({ title: "Not saved. Error occured" });
    }
  }

  const handleFormDataChange = ({ fieldName, val }: { fieldName: keyof IContact; val: any }) => {
    setFormData((prev) => ({ ...prev, [fieldName]: val }));
  };

  return (
    <>
      <form className="flex w-full flex-col gap-4 rounded-lg bg-white p-6 md:p-8">
        <div className={"flex w-full flex-col gap-1"}>
          <label htmlFor="name" className={"text-sm text-black"}>
            Name
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => handleFormDataChange({ fieldName: "name", val: e.target.value })}
            id={"name"}
            required
            placeholder={"Name"}
          />
        </div>

        <div className={"flex w-full flex-col gap-1"}>
          <label htmlFor="email" className={"text-sm text-black"}>
            Email
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleFormDataChange({ fieldName: "email", val: e.target.value })}
            id={"email"}
            required
            placeholder={"Email"}
          />
        </div>
        <div className={"flex w-full flex-col gap-1"}>
          <label htmlFor="phone" className={"text-sm text-black"}>
            Phone
          </label>

          <div>
            <PhoneInput
              id={"phone"}
              value={formData.phone}
              onChange={(e) => handleFormDataChange({ fieldName: "phone", val: e })}
              defaultCountry={"US"}
              placeholder={"Phone number"}
            />
          </div>
        </div>
        <div className={"flex w-full flex-col gap-1"}>
          <label htmlFor="comments" className={"text-sm text-black"}>
            Comments
          </label>
          <Textarea
            id={"comments"}
            value={formData.comment}
            onChange={(e) => handleFormDataChange({ fieldName: "comment", val: e.target.value })}
            placeholder={"What do you want to say"}
            rows={6}
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
          {isBusy ? "Sending Message..." : "Send Message"}
        </Button>
      </form>

      <AppAlertDialog handleCancel={() => closeAlertDialog()} open={isAlertOpen} config={alertMessages} />
    </>
  );
}
