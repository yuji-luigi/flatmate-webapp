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

export const propertyManagerSectionConfigs: Record<string, SectionConfig> = {
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
    rowActions: [
      { label: "Modify", type: "modify" },
      { label: "QR-Code", type: "qr_code" },
      { label: "Remove user from unit", type: "remove_unit_user" },
    ],
  },
  maintainer,
  property_manager,
  checks,
  maintenances,
};
