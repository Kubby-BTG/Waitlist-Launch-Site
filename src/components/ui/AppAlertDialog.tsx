"use client";

import { useState, forwardRef } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialogOverlay = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn([
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    ])}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogOverlay className="bg-black/50" />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn([
        "border-brand-200 shadow-lg dark:border-brand-800 dark:bg-brand-950 fixed left-[50%] top-[50%]",
        "z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6",
        "duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95",
        "data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2",
        "data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2",
        "data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      ])}
      {...props}
    />
  </AlertDialogPrimitive.Portal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(["flex flex-col space-y-2 text-center sm:text-left", className])} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(["flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className])} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(["text-brand-500 dark:text-brand-400 text-sm", className])}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

type IConfig = {
  description?: string;
  title: string;
  type?: "warning" | "error" | "info" | "success";
};

export default function AppAlertDialog({
  config,
  open,
  handleCancel,
}: {
  config: IConfig;
  open: boolean;
  handleCancel: () => void;
}) {
  if (!open) {
    return null;
  }

  const { title, description } = config;

  return (
    <AlertDialogPrimitive.Root open={open}>
      <AlertDialogContent>
        {/*  */}
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? <AlertDialogDescription>{description}</AlertDialogDescription> : null}
        </AlertDialogHeader>

        {typeof handleCancel === "function" && (
          <AlertDialogFooter>
            {/* <AlertDialogCancel onClick={() => handleCancel()}>Okay</AlertDialogCancel> */}
            <AlertDialogAction onClick={() => handleCancel()}>Okay</AlertDialogAction>
          </AlertDialogFooter>
        )}

        {/*  */}
      </AlertDialogContent>
    </AlertDialogPrimitive.Root>
  );
}

const initialParams: IConfig = { title: "", description: "" };

export function useAppAlertDialog() {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState<IConfig>({ ...initialParams });

  function closeAlertDialog() {
    setAlertOptions({ ...initialParams });
    setAlertOpen(false);
  }

  function openAlertDialog(confg: IConfig) {
    setAlertOptions(confg);
    setAlertOpen(true);
  }

  return {
    openAlertDialog: {
      warning: (props: IConfig) => openAlertDialog({ ...props, type: "warning" }),
      info: (props: IConfig) => openAlertDialog({ ...props, type: "info" }),
      success: (props: IConfig) => openAlertDialog({ ...props, type: "success" }),
      error: (props: IConfig) => openAlertDialog({ ...props, type: "error" }),
    },
    closeAlertDialog,
    alertOptions: alertOptions,
    isAlertOpen: alertOptions?.title ? isAlertOpen : false,
  };
}
