// // your-dialog.jsx
// import React from "react";
// import * as DialogPrimitive from "@radix-ui/react-dialog";
// // import { Cross1Icon } from '@radix-ui/react-icons';

// export const DialogContent = React.forwardRef<
//   React.ElementRef<typeof DialogPrimitive.Overlay>,
//   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
// >(({ children, ...props }, forwardedRef) => (
//   <DialogPrimitive.Portal>
//     <DialogPrimitive.Overlay />
//     <DialogPrimitive.Content {...props} ref={forwardedRef}>
//       {children}
//       <DialogPrimitive.Close aria-label="Close">
//         <Cross1Icon />
//       </DialogPrimitive.Close>
//     </DialogPrimitive.Content>
//   </DialogPrimitive.Portal>
// ));

// DialogContent.displayName = "DialogContentName";

// export const Dialog = DialogPrimitive.Root;
// export const DialogTrigger = DialogPrimitive.Trigger;
