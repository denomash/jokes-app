// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import classNames from "classnames";
import { TableCellProps } from "./TableCellProps";

/**
 * Table Cell component.
 * @param props All Properties.
 * @param props.children Table children.
 * @param props.noWrap Don't allow content to wrap.
 * @param props.className TableCell classname.
 * @param props.textAlign Align the cell.
 * @returns The node to render.
 */
const TableCell = ({
  noWrap,
  className,
  textAlign,
  children,
  ...props
}: TableCellProps) => (
  <td
    {...props}
    className={classNames(
      {
        "text-center": textAlign === "center",
        "text-right": textAlign === "right",
      },
      `px-6 py-4 border-r last:border-0 border-black ${className}`
    )}
  >
    {children}
  </td>
);

export default TableCell;
