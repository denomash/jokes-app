"use client";

import { useAuthHook } from "@hooks/useAuthHook";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect } from "react";

const AuthContext = createContext({
  token: undefined as undefined | string,
  login: () => {},
  logout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useAuthHook();

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [token]);

  const logout = () => {
    Cookies.remove("token");
    setToken(undefined);
  };

  const login = () =>
    setToken(Math.floor(Math.random() * Date.now()).toString(36));

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
