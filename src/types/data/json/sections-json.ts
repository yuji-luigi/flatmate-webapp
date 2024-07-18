import { ButtonProps, ButtonVariant, MantineColor } from "@mantine/core";
import { Icons } from "../../../data/icons/icons";
import { Entity } from "../../redux/CrudSliceInterfaces";

export type NavConfigContent = {
  title: string;
  link: string;
  icon: keyof typeof Icons;
  hide?: boolean;
};

export type NavConfig = {
  key: string;
  name?: string;
  hide?: boolean;
  contents: NavConfigContent[];
};

export type SectionConfig = {
  /** used to index the correct config object by find method */
  // key: string;
  title: string;
  subtitle?: string;
  sectionActions?: SectionActionData[];
  rowActions?: RowAction[];
  createButton?: string;
  createButtonType?: string; // TODO: enum
  importButton?: string;
  hide?: boolean;
};

export type SectionActionData = {
  label?: string;
  type: SectionAction | CustomSectionAction;
  color?: MantineColor;
  variant?: ButtonVariant;
} & ButtonProps;

export type SectionAction =
  | "import"
  | "custom"
  | "invite"
  | "create"
  | "print-qr-unit"
  | "import-inhabitant-unit";

type CustomSectionAction = "import-inhabitant-unit";
export type RowAction = {
  label?: string;
  color?: MantineColor;
  type: RowActionType;
};
export type RowActionType = "modify" | "delete" | "qr_code" | "remove_unit_user";
