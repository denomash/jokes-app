import { ReactNode } from "react";

/**
 * Modal properties
 */
export interface IModal {
  /**
   * Modal message
   */
  message: string;

  /**
   * handle close modal
   */
  onClose: () => void;

  /**
   * Children
   */
  children: ReactNode;
}
