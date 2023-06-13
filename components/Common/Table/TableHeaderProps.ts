// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { DetailedHTMLProps, ThHTMLAttributes } from "react";

/**
 * The properties for the table component.
 */
export interface TableHeaderProps
  extends DetailedHTMLProps<
    ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  > {
  /**
   * Don't allow content to wrap.
   */
  noWrap?: boolean;

  /**
   * Align the cell.
   */
  textAlign?: "left" | "right" | "center";
}
