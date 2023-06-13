// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { TableHeadProps } from "./TableHeadProps";

/**
 * TableHead component.
 * @param props All Properties.
 * @param props.children Table children.
 * @returns The node to render.
 */
const TableHead = ({ children, ...props }: TableHeadProps) => (
  <thead {...props}>{children}</thead>
);

export default TableHead;
