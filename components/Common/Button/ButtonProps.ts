// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

/**
 * The properties for the Button component.
 */
export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    /**
     * How to display the button.
     */
    display?: "primary" | "secondary";

    /**
     * Display the small version of the button.
     */
    compact?: boolean;
}
