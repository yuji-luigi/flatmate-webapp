import { ReactNode } from "react";
import { Icons } from "../../data/icons/icons";
import { SectionConfig } from "../../types/data/json/sections-json";
import { FrontendEntity } from "../../types/redux/CrudSliceInterfaces";
import { checks, inhabitant, maintainer, maintenances, spaces, units } from "./sectionBaseConfigs";

const dataTableSections: FrontendEntity[] = [
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
        label: "Add Spaces",
        type: "create",
      },
    ],
    rowActions: ["modify", "delete"],
  },
  inhabitant: {
    ...inhabitant,
    sectionActions: [
      {
        label: "Add Inhabitants",
        type: "create",
      },
      {
        type: "import-inhabitant-unit",
      },
      {
        label: "Invite Inhabitants",
        type: "invite",
      },
    ],
    rowActions: ["qr_code", "modify"],
  },
  units: {
    ...units,
    sectionActions: [
      {
        label: "Letters",
        type: "print-qr-unit",
      },
      {
        label: "import Units and Spaces",
        type: "import-inhabitant-unit",
      },
    ],
    rowActions: ["qr_code", "modify"],
  },
  maintainer,
  checks,
  maintenances,
};
