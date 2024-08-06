"use client";

import { Dialog, DialogClose, DialogContent, DialogTitle } from "../ui/dialog";
import { X } from "lucide-react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import FilterIcon from "../map/filter-icon";
import { deliveryCompanies } from "@/lib/selection-data";
import { deliveryIssues, usStates } from "@/utils/constants";
import useAppAlertDialog from "../../hooks/useAppAlertDialog";
import AppAlertDialog from "../ui/AppAlertDialog";

export interface IFilterIssueParams {
  shipping_carrier: string;
  issue: string;
  state: string;
  zipcode: string;
}

const initialValue: Partial<IFilterIssueParams> = {
  shipping_carrier: "",
  issue: "",
  state: "",
  zipcode: "",
};

export default function FilterIssuesForm({
  setIsOpen,
  isOpen,
  isBusy,
  handleDone,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  isBusy?: boolean;
  handleDone: (params: Partial<IFilterIssueParams>) => void;
}) {
  const [formData, setFormData] = useState<Partial<IFilterIssueParams>>({ ...initialValue });
  const { alertOptions, isAlertOpen, closeAlertDialog, openAlertDialog } = useAppAlertDialog();

  useEffect(() => {
    console.log({ formData });
  }, [formData]);

  async function handleSubmit() {
    try {
      handleDone({ ...formData });
      setFormData({ ...initialValue });
    } catch (error) {
      openAlertDialog.error({ title: "Not saved. Error occured" });
    }
  }

  const handleFormDataChange = ({ fieldName, val }: { fieldName: keyof IFilterIssueParams; val: any }) => {
    setFormData((prev) => ({ ...prev, [fieldName]: val }));
  };

  return (
    <>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent
          className={cn([
            //
            "flex px-6 py-8 md:max-w-[26rem] md:px-8",
            isOpen && "_max-w-[17.5rem] _max-md:w-[calc(100vw-6.5rem)]",
          ])}
        >
          <DialogTitle className="sr-only">Delivery Issue</DialogTitle>
          {/* Form */}
          <form className={"flex w-full flex-col gap-4"}>
            <div className="flex w-full items-center gap-8">
              <h1 className={"flex w-full items-center gap-2 text-base font-bold"}>
                <FilterIcon className={"size-5"} /> Filter issues by
              </h1>
              <DialogClose
                className={cn([
                  //
                  "flex size-8 flex-none items-center justify-center",
                  "rounded-full bg-input-secondary text-black",
                ])}
              >
                <span className="sr-only">Close</span>
                <X className={"size-4"} />
              </DialogClose>
            </div>

            <div className={"flex w-full flex-col gap-1"}>
              <label htmlFor="shipping-carrier" className={"text-sm text-black"}>
                Carriers
              </label>
              <Select
                required={true}
                value={formData.shipping_carrier}
                onValueChange={(val) => handleFormDataChange({ fieldName: "shipping_carrier", val: val })}
              >
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
              <label htmlFor="issue-type" className={"text-sm text-black"}>
                Issue type
              </label>
              <Select
                required={true}
                value={formData.issue}
                onValueChange={(val) => handleFormDataChange({ fieldName: "issue", val: val })}
              >
                <SelectTrigger className="w-full" id={"issue-type"}>
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
              <label htmlFor="zipcode" className={"text-sm text-black"}>
                Zipcode
              </label>
              <Input
                type="text"
                value={formData.zipcode}
                onChange={(e) => handleFormDataChange({ fieldName: "zipcode", val: e.target.value })}
                id={"city"}
                required
                placeholder={"Zipcode"}
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
              Filter Issues On Map
            </Button>

            <Button
              type="button"
              variant={"ghost"}
              disabled={isBusy}
              onClick={() => {
                setFormData({ ...initialValue });
              }}
            >
              Clear Filter
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <AppAlertDialog handleCancel={() => closeAlertDialog()} open={isAlertOpen} config={alertOptions} />
    </>
  );
}

/*
          <div className={"flex w-full flex-col gap-1"}>
            <label htmlFor="state" className={"text-sm text-black"}>
              State
            </label>
            <Select
              required={true}
              value={formData.state}
              onValueChange={(val) => handleFormDataChange({ fieldName: "state", val: val })}
            >
              <SelectTrigger className="w-full" id={"state"}>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {usStates.map((state, i) => (
                  <Fragment key={i}>
                    {i > 0 && <SelectSeparator />}
                    <SelectItem key={i} value={state}>
                      {state}
                    </SelectItem>
                  </Fragment>
                ))}
              </SelectContent>
            </Select>
          </div>

*/
