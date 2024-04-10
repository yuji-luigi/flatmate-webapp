import { Icons } from "../data/icons/icons";
import { toTitleCase } from "../lib/toTitleCase";
import { SectionConfig } from "../types/data/json/sections-json";
import { Entity, entities, singleEntities } from "../types/redux/CrudSliceInterfaces";

const _sections = {
  dataTable: entities.reduce(
    (acc, entity) => {
      acc[entity] = {
        // key: entity,
        title: toTitleCase(entity),
        subtitle: "",
        createButton: `New ${toTitleCase(singleEntities[entity])}`,
      };
      return acc;
    },
    {} as Record<Entity, SectionConfig>
  ),
};

_sections.dataTable.users.importButton = "Import Users";

export const sectionsJson = _sections;
