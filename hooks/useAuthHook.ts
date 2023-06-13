import Cookies from "js-cookie";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const getItem = () => {
  const token = Cookies.get("token");

  if (Boolean(token)) {
    return token;
  }

  return undefined;
};

/**
 * Auth hook
 */
export const useAuthHook = (): [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>
] => {
  const [token, setToken] = useState<string | undefined>(getItem());

  useEffect(() => {
    Cookies.set("token", token ?? "", { expires: 1 });
  }, [token]);

  return [token, setToken];
};
