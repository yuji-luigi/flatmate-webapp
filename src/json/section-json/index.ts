import { SectionsJson } from "../../types/data/json/sections-json";
import { Role } from "../../types/models/space-model";
import { Entity } from "../../types/redux/CrudSliceInterfaces";
import { inhabitantSectionsJson } from "./inhabitantSections";
import { maintainerSectionsJson } from "./maintainerSections";
import { propertyManagerSectionsJson } from "./propertyManagerSections";

export const sectionData: Record<Role, SectionsJson[]> = {
  system_admin: maintainerSectionsJson,
  maintainer: maintainerSectionsJson,
  property_manager: propertyManagerSectionsJson,
  inhabitant: inhabitantSectionsJson,
};

export const getFlattenSectionJson = (loggedAs: Role) =>
  sectionData[loggedAs].flatMap((_sectionData) => _sectionData.contents);

export function getSectionData({ loggedAs, entity }: { loggedAs: Role; entity?: Entity }) {
  const [data] = sectionData[loggedAs].flatMap((json) =>
    json.contents.find((section) => section.entity === entity)
  );
  return data!;
}
// set programmatically the roles for every sections

export type SectionData = typeof sectionData;

export type FlattenSectionData = any;
