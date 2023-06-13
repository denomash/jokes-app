import { QueryClient } from "@tanstack/query-core";
import { cache } from "react";

/**
 * Get query client
 */
const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
