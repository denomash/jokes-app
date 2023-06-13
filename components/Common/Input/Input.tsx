// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { KeyboardEvent } from "react";

import { InputProps } from "./InputProps";
import Label from "../Label/Label";
import classNames from "classnames";

/**
 * Input Component.
 * @param props All properties.
 * @param props.restrict Restrictions on the input character set.
 * @param props.onChange OnChange.
 * @param props.onKeyDown OnKeyDown.
 * @param props.value Input value.
 * @param props.error Input has error.
 * @returns The node to render.
 */
const Input = ({
  restrict,
  label,
  error,
  onChange,
  onKeyDown,
  ...props
}: InputProps) => {
  /**
   * Handle the key down event.
   * @param evt The event.
   */
  const handleKeyDown = (evt: KeyboardEvent): void => {
    const keyCode = evt.keyCode || evt.which;
    const isNavigation = keyCode >= 8 && keyCode <= 46;
    const isModified = evt.ctrlKey || evt.metaKey;

    if (!isNavigation && !isModified) {
      if (restrict === "integer") {
        const keyValue = String.fromCodePoint(keyCode);
        const isDigit = /\d/.test(keyValue);
        if (!isDigit) {
          evt.preventDefault();
        }
      } else if (restrict === "float") {
        const keyValue = String.fromCodePoint(keyCode);
        const isDigit = /\d/.test(keyValue);

        if (keyCode === 190 || keyCode === 110) {
          const val = props.value as string;
          if (val.includes(".")) {
            evt.preventDefault();
          }
        } else if (!isDigit) {
          evt.preventDefault();
        }
      }
    }
  };

  if (!props.type) {
    props.type = "text";
  }

  return (
    <div className="mb-4">
      <Label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white font-semibold">
        {label}
      </Label>
      <input
        type="text"
        className={classNames(
          "mb-2 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-200 sm:text-md focus:outline-none focus:bg-white",
          {
            "!border-rose-500 !bg-red-100": error,
          }
        )}
        {...props}
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
        }}
        onKeyDown={(e) => {
          handleKeyDown(e);
          if (onKeyDown) {
            onKeyDown(e);
          }
        }}
      />

      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default Input;
