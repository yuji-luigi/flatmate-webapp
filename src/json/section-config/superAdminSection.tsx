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
  users,
} from "./sectionBaseConfigs";

const dataTableSections: FrontendEntity[] = [
  "spaces",
  "inhabitant",
  "maintainer",
  "checks",
  "maintenances",
];

export const superAdminSectionConfigs: Record<string, SectionConfig> = {
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
    rowActions: [
      { label: "Modify", type: "modify" },
      { label: "QR-Code", type: "qr_code" },
    ],
  },
  maintainer,
  users: {
    ...users,
    sectionActions: [
      {
        label: "Add Users",
        type: "create",
      },
    ],
  },
  spaces: {
    ...spaces,
    sectionActions: [
      {
        label: "Add Spaces",
        type: "create",
      },
    ],
    rowActions: [
      { label: "Modify", type: "modify" },
      { label: "Delete", type: "delete" },
    ],
  },
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
