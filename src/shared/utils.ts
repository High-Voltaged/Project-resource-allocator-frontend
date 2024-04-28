import { Toast, ToastMessage } from "primereact/toast";
import { RefObject } from "react";

export const showToastMessage = (message: string, ref: RefObject<Toast>, level: ToastMessage["severity"]) => {
  const summary = level ? level.charAt(0).toUpperCase() + level.slice(1) : "info";

  ref.current?.show({
    severity: level,
    summary,
    detail: message,
    life: 3000,
  });
};
