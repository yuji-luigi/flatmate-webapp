import { toTitleCase } from "../../lib/toTitleCase";

export const reducer = (acc: Record<FrontendEntity, SectionConfig>, entity: FrontendEntity) => {
  acc[entity] = {
    title: toTitleCase(entity),
    subtitle: "",
    createButton: `New ${toTitleCase(singleEntities[entity])}`,
    ...(customSection[entity] && customSection[entity]),
  };
  return acc;
};
π;
