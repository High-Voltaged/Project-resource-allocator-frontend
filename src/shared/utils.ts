import { LSKey, TScalar } from "~/shared/types";
import { IUser } from "./types/user";

export const getLSValue = (key: LSKey, initialValue: TScalar = ""): TScalar => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : initialValue;
};

export const setLSValue = (key: LSKey, newValue: TScalar) => {
  localStorage.setItem(key, JSON.stringify(newValue));
};

export const getUserNameLabel = (user: IUser) =>
  user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();

export const getProjectLabel = (projectName: string) => projectName.charAt(0).toUpperCase();
