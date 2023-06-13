"use client";

import { useEffect, useState } from "react";

const getItem = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.getItem("token");

    if (item !== null) {
      return JSON.parse(item);
    }
    return null;
  }
  return null;
};

/**
 * Auth hook
 */
export const useAuthHook = <T>(): [
  string | null,
  (val: string | null) => void
] => {
  const [token, setToken] = useState<string | null>(getItem());

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return [token, setToken];
};
