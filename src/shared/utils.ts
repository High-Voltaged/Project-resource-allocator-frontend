import { LSKey, TScalar } from "~/shared/types";
import { IUser } from "./types/user";

export const showToastMessage = (message: string) => {
  // const summary = level ? level.charAt(0).toUpperCase() + level.slice(1) : "info";
  // ref.current?.show({
  //   severity: level,
  //   summary,
  //   detail: message,
  //   life: 3000,
  // });
};

export const getLSValue = (key: LSKey, initialValue: TScalar = ""): TScalar => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : initialValue;
};

export const setLSValue = (key: LSKey, newValue: TScalar) => {
  localStorage.setItem(key, JSON.stringify(newValue));
};

export const getUserNameLabel = (user: IUser) =>
  user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
