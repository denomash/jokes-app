// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { InputRestrict } from "./InputRestrict";

/**
 * The properties for the Input component.
 */
export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  /**
   * Restrictions on the input character set.
   */
  restrict?: InputRestrict;

  /**
   * Input label
   */
  label?: string;

  /**
   * Has error
   */
  error?: string;
}
