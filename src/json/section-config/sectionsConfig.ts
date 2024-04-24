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
  property_managers: property_managersSection,
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
// _sections.dataTable.property_managers.title = "Property Managers";
// _sections.dataTable.property_managers.createButton = "Invite Property Manager";

_sections.dataTable.users.importButton = "Import Users";

export const sectionsJson = _sections;
