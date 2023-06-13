// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
// import "./Table.scss";
import classNames from "classnames";
import { TableProps } from "./TableProps";

/**
 * Table component.
 * @param props All Properties.
 * @param props.children Table children.
 * @returns The node to render.
 */
const Table = ({ children, className, ...props }: TableProps) => (
  <table
    className={classNames(
      `w-full text-black-500 dark:text-black-400 ${className}`
    )}
    {...props}
  >
    {children}
  </table>
);

export default Table;
