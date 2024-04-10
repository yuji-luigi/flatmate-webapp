import { NavConfig } from "../../types/data/json/sections-json";
import { Role } from "../../types/models/space-model";
import { inhabitantNavConfig } from "./inhabitant";
import { maintainerNavConfig } from "./maintainer";
import { systemAdminNavConfig } from "./systemAdmin";
import { propertyManagerNavConfig } from "./propertyManager";

// TODO: I want to render this from DB dynamically.
export const navConfigs: Record<Role, NavConfig[]> = {
  system_admin: systemAdminNavConfig,
  maintainer: maintainerNavConfig,
  property_manager: propertyManagerNavConfig,
  inhabitant: inhabitantNavConfig,
};

export const getFlattenNavConfig = (loggedAs: Role) =>
  navConfigs[loggedAs].flatMap((_sectionData) => _sectionData.contents);

export type RootNavConfig = typeof navConfigs;

export type FlattenSectionData = any;
