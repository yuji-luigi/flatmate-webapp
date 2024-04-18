/**
 * state.reduxdb[Section]
 * Sections are Entities in the DB. Also should match with the redux entity.
 * returns {
 *   entity: "Sections"
 * }
 */

import { Entity, entities } from "../../redux/CrudSliceInterfaces";

export type Sections = Entity;

// export const sectionsArray = [
//   "home",
//   "statistics",
//   "notifications",
//   "billing",
//   "users",
//   "buildings",
//   "bookmarks",
//   "comments",
//   "funds",
//   "areas",
//   "floors",
//   "fundRules",
//   "instances",
//   "notifications",
//   "proposals",
//   "tags",
//   "threads",
//   "maintainers",
//   "userSettings",
//   "wallets",
//   "organizations",
//   "events",
//   "spaces",
//   "uploads",
//   "roles",
//   "maintenances",
//   "accessPermissions",
//   "",
// ] as const;

export function isSection(section?: string): section is Entity {
  if (!section) return false;
  return entities.includes(section as Sections);
}
