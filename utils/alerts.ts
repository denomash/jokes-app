import { toast } from "react-toastify";

/**
 * Success toast.
 * @param message message to show on toast.
 */
const alertSuccess = (message: string) => {
  toast.success(message || `Success alert`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

/**
 * Error toast.
 * @param message message to show on toast.
 */
const alertError = (message: string) => {
  toast.error(message || `Success alert`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export { alertSuccess, alertError };
