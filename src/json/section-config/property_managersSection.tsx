import { ReactNode } from "react";
import { Icons } from "../../data/icons/icons";
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
  spaces: {
    ...spaces,
    sectionActions: [
      {
        key: "create",
        label: "Add Spaces",
        type: "create",
        color: "blue",
        leftSection: <Icons.plus />,
      },
    ],
  },

  inhabitant: {
    ...inhabitant,
    sectionActions: [
      {
        key: "create",
        label: "Add Inhabitants",
        type: "create",
        color: "blue",
        leftSection: <Icons.plus />,
      },
      {
        key: "import",
        label: "Import Inhabitants",
        leftSection: <Icons.upload />,
        type: "import",
        color: "cyan",
      },
    ],
  },
  maintainer,
  checks,
  maintenances,
};
