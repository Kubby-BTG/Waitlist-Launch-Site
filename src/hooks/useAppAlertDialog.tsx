import { useState } from "react";

type IProps = { title: string; description?: string };

export default function useAppAlertDialog() {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertMessages, setAlertMessages] = useState<{ title: string; description?: string }>({ title: "", description: "" });

  function closeAlertDialog() {
    setAlertMessages({ title: "", description: "" });
    setAlertOpen(false);
  }

  function openAlertDialog({ title, description }: IProps) {
    setAlertMessages({ title, description });
    setAlertOpen(true);
  }

  return {
    openAlertDialog: {
      warning: (props: IProps) => openAlertDialog(props),
      info: (props: IProps) => openAlertDialog(props),
      success: (props: IProps) => openAlertDialog(props),
      error: (props: IProps) => openAlertDialog(props),
    },
    closeAlertDialog,
    alertMessages,
    isAlertOpen: alertMessages?.title ? isAlertOpen : false,
  };
}
