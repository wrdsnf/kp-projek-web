import { UserRole } from "./types";

/**
 * Get the dashboard path based on user role
 */
export function getDashboardPath(role: UserRole | undefined): string {
  switch (role) {
    case "admin":
      return "/dashboard/admin";
    case "teller":
      return "/dashboard/teller";
    case "petugas_antrian":
      return "/dashboard/petugas";
    default:
      return "/";
  }
}

/**
 * Check if a user role has access to admin pages
 */
export function isAdminRole(role: UserRole | undefined): boolean {
  return role === "admin";
}

/**
 * Check if a user role has access to teller pages
 */
export function isTellerRole(role: UserRole | undefined): boolean {
  return role === "admin" || role === "teller";
}

/**
 * Check if a user role has access to petugas pages
 */
export function isPetugasRole(role: UserRole | undefined): boolean {
  return role === "admin" || role === "petugas_antrian";
}

/**
 * Get all valid roles
 */
export const VALID_ROLES: UserRole[] = ["admin", "teller", "petugas_antrian"];
