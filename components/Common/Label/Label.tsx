// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { LabelProps } from "./LabelProps";

/**
 * Label Component.
 * @param props All properties.
 * @param props.children Label children.
 * @returns The node to render.
 */
const Label = ({ children, ...props }: LabelProps) => <label {...props}>{children}</label>;

export default Label;
