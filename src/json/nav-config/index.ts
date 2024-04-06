import { SectionsJson } from "../../types/data/json/sections-json";
import { Role } from "../../types/models/space-model";
import { Entity } from "../../types/redux/CrudSliceInterfaces";
import { inhabitantNavConfig } from "./inhabitant";
import { maintainerNavConfig } from "./maintainer";
import { systemAdminNavConfig } from "./systemAdmin";
import { propertyManagerNavConfig } from "./propertyManager";

// TODO: I want to render this from DB dynamically.
export const navConfigs: Record<Role, SectionsJson[]> = {
  system_admin: systemAdminNavConfig,
  maintainer: maintainerNavConfig,
  property_manager: propertyManagerNavConfig,
  inhabitant: inhabitantNavConfig,
};

export const getFlattenNavConfig = (loggedAs: Role) =>
  navConfigs[loggedAs].flatMap((_sectionData) => _sectionData.contents);

export function getNavConfig({ loggedAs, entity }: { loggedAs: Role; entity?: Entity }) {
  const [data] = navConfigs[loggedAs].flatMap((json) =>
    json.contents.find((section) => section.sectionKey === entity)
  );
  return data!;
}

export type SectionData = typeof navConfigs;

export type FlattenSectionData = any;
