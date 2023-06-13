// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { DetailedHTMLProps, TdHTMLAttributes } from "react";

/**
 * The properties for the table component.
 */
export interface TableCellProps
    extends DetailedHTMLProps<TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
    /**
     * Don't allow content to wrap.
     */
    noWrap?: boolean;

    /**
     * Align the cell.
     */
    textAlign?: "left" | "right" | "center";
}
