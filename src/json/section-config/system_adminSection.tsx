import { ReactNode } from "react";
import { Icons } from "../../data/icons/icons";
import { SectionConfig } from "../../types/data/json/sections-json";
import { FrontendEntity } from "../../types/redux/CrudSliceInterfaces";
import {
  checks,
  inhabitant,
  maintainer,
  maintenances,
  property_manager,
  spaces,
  units,
} from "./sectionBaseConfigs";

const dataTableSections: FrontendEntity[] = [
  "spaces",
  "inhabitant",
  "maintainer",
  "checks",
  "maintenances",
];

export const system_adminSectionConfigs: Record<string, SectionConfig> = {
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
  maintainer,
  property_manager: {
    ...property_manager,
    sectionActions: [
      {
        label: "Invite Property Manager",
        type: "invite",
      },
    ],
  },
  checks,
  maintenances,
};
