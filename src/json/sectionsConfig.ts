import { Icons } from "../data/icons/icons";
import { toTitleCase } from "../lib/toTitleCase";
import { Entity, entities, singleEntities } from "../types/redux/CrudSliceInterfaces";

const _sections = {
  dataTable: entities.reduce(
    (acc, entity) => {
      acc[entity] = {
        title: toTitleCase(entity),
        subtitle: "",
        createButton: `New ${toTitleCase(singleEntities[entity])}`,
      };
      return acc;
    },
    {} as Record<
      Entity,
      {
        title: string;
        subtitle: string;
        createButton: string;
        importButton?: string;
        hide?: boolean;
      }
    >
  ),
};

_sections.dataTable.users.importButton = "Import Users";

export const sectionsJson = _sections;
