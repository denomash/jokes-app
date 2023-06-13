// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import classNames from "classnames";
import { TableHeaderProps } from "./TableHeaderProps";

/**
 * TableHeader component.
 * @param props All Properties.
 * @param props.children Table Header children.
 * @param props.noWrap Don't allow content to wrap.
 * @param props.className TableCell classname.
 * @param props.textAlign Align the cell.
 * @returns The node to render.
 */
const TableHeader = ({
  noWrap,
  className,
  textAlign,
  children,
  ...props
}: TableHeaderProps) => (
  <th
    {...props}
    className={classNames(
      {
        // eslint-disable-next-line camelcase
        th__nowrap: noWrap,
        // eslint-disable-next-line camelcase
        th__center: textAlign === "center",
        // eslint-disable-next-line camelcase
        th__right: textAlign === "right",
      },
      `px-6 py-3 ${className}`
    )}
    scope="col"
  >
    {children}
  </th>
);

export default TableHeader;
