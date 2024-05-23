import { NavConfig, NavConfigContent, SectionConfig } from "../../types/data/json/sections-json";
import { Role } from "../../types/models/space-model";
import { inhabitantNavConfig } from "./inhabitantNavConfig";
import { maintainerNavConfig } from "./maintainerNavConfig";
import { systemAdminNavConfig } from "./systemAdmin";
import { flatPropertyManagerNavConfig, propertyManagerNavConfig } from "./propertyManagerNavConfig";
import { super_admin_nav_configs } from "./super_admin_nav_config";

// TODO: I want to render this from DB dynamically.
export const navConfigs: Record<Role, NavConfig[]> = {
  system_admin: systemAdminNavConfig,
  maintainer: maintainerNavConfig,
  property_manager: propertyManagerNavConfig,
  inhabitant: inhabitantNavConfig,
  super_admin: super_admin_nav_configs,
};
/** @description returns only contents array in the navConfig complex array. */
export const flatNavConfigs: Record<Role, (NavConfigContent & SectionConfig)[]> = {
  system_admin: flatPropertyManagerNavConfig,
  maintainer: maintainerNavConfig,
  property_manager: flatPropertyManagerNavConfig,
  inhabitant: inhabitantNavConfig,
  super_admin: super_admin_nav_configs,
};

export const getFlattenNavConfig = (loggedAs: Role) =>
  navConfigs[loggedAs].flatMap((_sectionData) => _sectionData.contents);

export type RootNavConfig = typeof navConfigs;

export type FlattenSectionData = any;
