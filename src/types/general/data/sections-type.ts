/**
 * state.reduxdb[Section]
 * Sections are Entities in the DB. Also should match with the redux entity.
 * returns {
 *   entity: "Sections"
 * }
 */

export type Sections = (typeof sectionsArray)[number];

export const sectionsArray = [
  "home",
  "statistics",
  "notifications",
  "billing",
  "users",
  "buildings",
  "bookmarks",
  "comments",
  "funds",
  "areas",
  "floors",
  "fundRules",
  "instances",
  "notifications",
  "proposals",
  "tags",
  "threads",
  "maintainers",
  "userSettings",
  "wallets",
  "organizations",
  "events",
  "spaces",
  "uploads",
  "roles",
  "maintenances",
  "accessPermissions",
  "",
] as const;

export function isSection(section: string): section is Sections {
  return sectionsArray.includes(section as Sections);
}
