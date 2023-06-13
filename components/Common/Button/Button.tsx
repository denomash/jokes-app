"use client"

// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import classNames from "classnames";
import { ButtonProps } from "./ButtonProps";

/**
 * Component which displays a button.
 * @param props Button Properties.
 * @param props.className Button classname.
 * @param props.type Button type.
 * @param props.display Button display.
 * @param props.compact Button compact.
 * @param props.children Button children.
 * @returns The node to render.
 */
const Button = ({
  className,
  type,
  display = "primary",
  compact,
  children,
  disabled,
  ...props
}: ButtonProps) => (
  <button
    type={type ?? "button"}
    {...props}
    className={classNames("", className, {
      black_btn: display === "primary",
      outline_btn: display === "secondary",
      "disabled:!opacity-50": disabled,
    })}
  >
    {children}
  </button>
);

export default Button;
