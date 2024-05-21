import { toTitleCase } from "../../lib/toTitleCase";
import { SectionConfig } from "../../types/data/json/sections-json";
import {
  FrontendEntity,
  frontendEntities,
  singleEntities,
} from "../../types/redux/CrudSliceInterfaces";
import { OptionalRecord } from "../../types/utils/OptionalRecord";
import { property_managersSection } from "./property_managersSection";

const customSection: OptionalRecord<FrontendEntity, Partial<SectionConfig>> = {
  property_manager: property_managersSection,
};

const reducer = (acc: Record<FrontendEntity, SectionConfig>, entity: FrontendEntity) => {
  acc[entity] = {
    title: toTitleCase(entity),
    subtitle: "",
    createButton: `New ${toTitleCase(singleEntities[entity])}`,
    ...(customSection[entity] && customSection[entity]),
  };
  return acc;
};

const _sections = {
  dataTable: frontendEntities.reduce(reducer, {} as Record<FrontendEntity, SectionConfig>),
  "card-list": frontendEntities.reduce(reducer, {} as Record<FrontendEntity, SectionConfig>),
};
// here mutate the object and set custom values
// _sections.dataTable.property_manager.title = "Property Managers";
// _sections.dataTable.property_manager.createButton = "Invite Property Manager";

_sections.dataTable.users.importButton = "Import Users";
_sections.dataTable.inhabitant.importButton = "Import inhabitants";

export const sectionsJson = _sections;
