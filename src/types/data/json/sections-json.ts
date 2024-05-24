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
  createButton?: string;
  createButtonType?: string; // TODO: enum
  importButton?: string;
  hide?: boolean;
};

export type SectionActionData = {
  key: string;
  label: string;
  type: SectionAction;
  color?: MantineColor;
  variant?: ButtonVariant;
} & ButtonProps;

type SectionAction = "import" | "custom" | "default" | "invite" | "create";
