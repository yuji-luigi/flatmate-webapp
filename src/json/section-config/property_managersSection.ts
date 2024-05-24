import { SectionConfig } from "../../types/data/json/sections-json";
import { FrontendEntity } from "../../types/redux/CrudSliceInterfaces";
import { checks, inhabitant, maintainer, maintenances, spaces } from "./sectionBaseConfigs";

const dataTableSections: FrontendEntity[] = [
  "spaces",
  "inhabitant",
  "maintainer",
  "checks",
  "maintenances",
];
const cardListSections: FrontendEntity[] = [
  "spaces",
  "inhabitant",
  "maintainer",
  "checks",
  "maintenances",
];
export const propertyManagerSectionConfigs: Record<string, SectionConfig> = {
  spaces,
  inhabitant: {
    ...inhabitant,
    createButtonType: "invite",
    sectionActions: [
      {
        key: "create",
        label: "Add Inhabitants",
        icon: "plus",
        type: "create",
        color: "blue",
      },
      {
        key: "import",
        label: "Import Inhabitants",
        icon: "plus",
        type: "import",
        color: "cyan",
      },
    ],
  },
  maintainer,
  checks,
  maintenances,
};
