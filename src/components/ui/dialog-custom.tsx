import React from "react";
import { X } from "lucide-react";
import { IPropsWithChildren } from "@/types";
import { cn } from "@/lib/utils";
import MountModalPortal from "../helpers/MountModalPortal";

type IProps = IPropsWithChildren & {
  className?: string;
  isOpen: boolean;
};

type IPropChild = IPropsWithChildren & {
  className?: string;
};

const AppModalDialog = ({ className, isOpen, children }: IProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <MountModalPortal>
      <div
        className={cn([
          "fixed inset-0 z-50 flex items-center justify-center",
          "overflow-y-auto overflow-x-hidden outline-none focus:outline-none",
        ])}
      >
        <div className={cn(["relative mx-auto my-6 w-auto max-w-3xl", className])}>{children}</div>
      </div>
      <div className={cn(["fixed inset-0 z-40 bg-black/50"])}></div>
    </MountModalPortal>
  );
};

AppModalDialog.Content = ({ className, children }: IPropChild) => {
  return (
    <div
      className={cn([
        //
        "shadow-lg fixed left-[50%] top-[50%] z-50 grid w-[calc(100vw-3rem)] max-w-md",
        "translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg",
        "border border-minimal bg-white p-6 duration-200",
        "md:w-full md:max-w-[43.5rem]",
        className,
      ])}
    >
      {children}
    </div>
  );
};

AppModalDialog.Header = ({ className, children }: IPropChild) => {
  return <div className={cn(["flex flex-col space-y-1.5 text-center sm:text-left", className])}>{children}</div>;
};

AppModalDialog.HeaderTitle = ({ className, children }: IPropChild) => {
  return <div className={cn(["text-lg font-semibold leading-none tracking-tight", className])}>{children}</div>;
};

AppModalDialog.HeaderSubTitle = ({ className, children }: IPropChild) => {
  return <div className={cn(["text-sm leading-none tracking-tight", className])}>{children}</div>;
};

AppModalDialog.CloseButton = ({ className, handleClick }: { className?: string; handleClick: () => void }) => {
  return (
    <button
      onClick={() => handleClick()}
      type={"button"}
      className={cn([
        "flex size-8 flex-none items-center justify-center rounded-full",
        "bg-input-secondary text-black",
        className,
      ])}
    >
      <span className="sr-only">Close</span>
      <X className={"size-4"} />
    </button>
  );
};

AppModalDialog.Body = ({ className, children }: IPropChild) => {
  return <div className={cn(["relative flex-auto p-6", className])}>{children}</div>;
};

AppModalDialog.Footer = ({ className, children }: IPropChild) => {
  return (
    <div
      className={cn([
        //
        "flex flex-col-reverse",
        "sm:flex-row sm:justify-end sm:space-x-2",
        className,
      ])}
    >
      {children}
    </div>
  );
};

export default AppModalDialog;
