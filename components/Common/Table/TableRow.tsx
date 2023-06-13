// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import classNames from "classnames";
import { TableRowProps } from "./TableRowProps";

/**
 * Class TableRow.
 * @param props All Properties.
 * @param props.highlight High the row.
 * @param props.valign Vertical alignment for rows.
 * @param props.className TableRow classname.
 * @param props.children TableRow children.
 * @returns The node to render.
 */
const TableRow = ({
  highlight,
  valign,
  className,
  children,
  ...baseProps
}: TableRowProps) => (
  <tr
    {...baseProps}
    className={classNames(
      {
        tr__highlight: highlight,
        "align-top": valign === "top",
      },
      className
    )}
  >
    {children}
  </tr>
);

export default TableRow;
