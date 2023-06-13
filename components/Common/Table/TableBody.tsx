// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { TableBodyProps } from "./TableBodyProps";

/**
 * TableBody component.
 * @param props All Properties.
 * @param props.children Table children.
 * @returns The node to render.
 */
const TableBody = ({ children, ...props }: TableBodyProps) => <tbody {...props}>{children}</tbody>;

export default TableBody;
