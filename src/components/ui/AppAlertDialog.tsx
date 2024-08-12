"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AppModalDialog from "./dialog-custom";

// const AlertDialogOverlay = forwardRef<
//   React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
//   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
// >(({ className, ...props }, ref) => (
//   <AlertDialogPrimitive.Overlay
//     className={cn([
//       "fixed inset-0 z-50 bg-black/80",
//       "data-[state=open]:animate-in data-[state=closed]:animate-out",
//       "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
//       className,
//     ])}
//     {...props}
//     ref={ref}
//   />
// ));
// AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

// const AlertDialogContent = forwardRef<
//   React.ElementRef<typeof AlertDialogPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
// >(({ className, ...props }, ref) => (
//   <AlertDialogPrimitive.Portal>
//     <AlertDialogOverlay className="bg-black/50" />
//     <AlertDialogPrimitive.Content
//       ref={ref}
//       className={cn([
//         "shadow-lg fixed left-[50%] top-[50%] border-brand-200 dark:border-brand-800 dark:bg-brand-950",
//         "z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 sm:rounded-lg",
//         "",
//         "w-[calc(100%-15px)] max-w-lg md:ml-0 md:mr-0 md:w-full",
//         //
//         "duration-200",
//         "data-[state=open]:animate-in data-[state=closed]:animate-out",
//         "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95",
//         "data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2",
//         "data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2",
//         "data-[state=open]:slide-in-from-top-[48%]",
//         className,
//       ])}
//       {...props}
//     />
//   </AlertDialogPrimitive.Portal>
// ));
// AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

// const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div className={cn(["flex flex-col space-y-2 text-center sm:text-left", className])} {...props} />
// );
// AlertDialogHeader.displayName = "AlertDialogHeader";

// const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div className={cn(["flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className])} {...props} />
// );
// AlertDialogFooter.displayName = "AlertDialogFooter";

// const AlertDialogTitle = forwardRef<
//   React.ElementRef<typeof AlertDialogPrimitive.Title>,
//   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
// >(({ className, ...props }, ref) => (
//   <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
// ));
// AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

// const AlertDialogDescription = forwardRef<
//   React.ElementRef<typeof AlertDialogPrimitive.Description>,
//   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
// >(({ className, ...props }, ref) => (
//   <AlertDialogPrimitive.Description
//     ref={ref}
//     className={cn(["text-sm text-brand-500 dark:text-brand-400", className])}
//     {...props}
//   />
// ));
// AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

// const AlertDialogAction = forwardRef<
//   React.ElementRef<typeof AlertDialogPrimitive.Action>,
//   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
// >(({ className, ...props }, ref) => (
//   <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
// ));
// AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

// const AlertDialogCancel = forwardRef<
//   React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
//   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
// >(({ className, ...props }, ref) => (
//   <AlertDialogPrimitive.Cancel
//     ref={ref}
//     className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
//     {...props}
//   />
// ));
// AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

// export function AppAlertDialog___({ config, open, handleCancel }: { config: IConfig; open: boolean; handleCancel: () => void }) {
//   if (!open) {
//     return null;
//   }

//   const { title, description } = config;

//   return (
//     <MountModalPortal>
//       <AlertDialogPrimitive.Root open={open}>
//         <AlertDialogContent>
//           {/*  */}
//           <AlertDialogHeader>
//             <AlertDialogTitle>{title}</AlertDialogTitle>
//             {description ? <AlertDialogDescription>{description}</AlertDialogDescription> : null}
//           </AlertDialogHeader>

//           {typeof handleCancel === "function" && (
//             <AlertDialogFooter>
//               {/* <AlertDialogCancel onClick={() => handleCancel()}>Okay</AlertDialogCancel> */}
//               <AlertDialogAction onClick={() => handleCancel()}>Okay</AlertDialogAction>
//             </AlertDialogFooter>
//           )}

//           {/*  */}
//         </AlertDialogContent>
//       </AlertDialogPrimitive.Root>
//     </MountModalPortal>
//   );
// }

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
    <AppModalDialog isOpen={open} isChildDialogExtend className="max-w-[500px]">
      <AppModalDialog.Content>
        {/*  */}
        <AppModalDialog.Header>
          <AppModalDialog.HeaderTitle>{title}</AppModalDialog.HeaderTitle>
          {description ? <AppModalDialog.HeaderSubTitle>{description}</AppModalDialog.HeaderSubTitle> : null}
        </AppModalDialog.Header>
        {/*  */}
        {typeof handleCancel === "function" && (
          <AppModalDialog.Footer>
            <Button onClick={() => handleCancel()}>Okay</Button>
          </AppModalDialog.Footer>
        )}
        {/*  */}
      </AppModalDialog.Content>
    </AppModalDialog>
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
