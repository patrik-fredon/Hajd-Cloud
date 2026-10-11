import type { QuotaReservation } from "./middleware/quota.js";

/**
 * Shared Hono context variable types for the Hajd.Cloud server.
 */
export interface QuotaVariables {
  /** What the quota middleware granted the upload this request starts. */
  quotaReservation?: QuotaReservation;
}
