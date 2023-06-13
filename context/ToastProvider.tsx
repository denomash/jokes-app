"use client"

import React, { createContext, useContext } from "react";

// TOASTIFY
import { ToastContainer } from "react-toastify";

// Alerts
import { alertSuccess } from "@utils/alerts";

const ToastContext = createContext({
    alertSuccess: (msg: string) => {}
});

export const useToastContext = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastContext.Provider value={ { alertSuccess } }>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
