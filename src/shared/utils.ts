import { Toast, ToastMessage } from "primereact/toast";
import { RefObject } from "react";

import { LSKey, TScalar } from "~/shared/types";

export const showToastMessage = (message: string, ref: RefObject<Toast>, level: ToastMessage["severity"]) => {
  const summary = level ? level.charAt(0).toUpperCase() + level.slice(1) : "info";

  ref.current?.show({
    severity: level,
    summary,
    detail: message,
    life: 3000,
  });
};

export const getLSValue = (key: LSKey, initialValue: TScalar = ""): TScalar => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : initialValue;
};

export const setLSValue = (key: LSKey, newValue: TScalar) => {
  localStorage.setItem(key, JSON.stringify(newValue));
};
