import { Icons } from "../data/icons/icons";
import { toTitleCase } from "../lib/toTitleCase";
import { SectionConfig } from "../types/data/json/sections-json";
import {
  Entity,
  FrontendEntity,
  entities,
  frontendEntities,
  pseudoEntities,
  singleEntities,
} from "../types/redux/CrudSliceInterfaces";

const _sections = {
  dataTable: frontendEntities.reduce(
    (acc, entity) => {
      acc[entity] = {
        // key: entity,
        title: toTitleCase(entity),
        subtitle: "",
        createButton: `New ${toTitleCase(singleEntities[entity])}`,
      };
      return acc;
    },
    {} as Record<FrontendEntity, SectionConfig>
  ),
};
// here mutate the object and set custom values
_sections.dataTable.property_managers.title = "Property Managers";
_sections.dataTable.users.importButton = "Import Users";

export const sectionsJson = _sections;
