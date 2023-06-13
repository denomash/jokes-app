import { DateTime } from "luxon";

/**
 * Format the value with date and time.
 * @param value The date value.
 * @returns The formatted date time.
 */
export const formatShort = (value: number): string => {
  let date = DateTime.fromMillis(Number(value));

  if (!date.isValid) return "-"

  return date.toFormat("d LLL yyyy");
};
