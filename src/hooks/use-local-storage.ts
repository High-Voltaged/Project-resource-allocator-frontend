import { useState } from "react";
import { LSKey, TScalar } from "~/shared/types";

const useLocalStorage = (key: LSKey, initialValue: TScalar = "") => {
  const [value, setStoredValue] = useState<TScalar>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  const setLSValue = (newValue: TScalar) => {
    setStoredValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return { value, setLSValue };
};

export default useLocalStorage;
