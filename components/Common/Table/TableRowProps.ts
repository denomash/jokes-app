// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { DetailedHTMLProps, TableHTMLAttributes } from "react";

/**
 * The properties for the table component.
 */
export interface TableRowProps
  extends DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  /**
   * High the row.
   */
  highlight?: boolean;

  /**
   * Vertical alignment for rows.
   */
  valign?: "top" | "middle" | "bottom";
}
