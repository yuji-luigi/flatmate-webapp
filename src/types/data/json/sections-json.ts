import { Icons } from "../../../data/icons/icons";
import { Entity } from "../../redux/CrudSliceInterfaces";

export type NavConfigContent = {
  // sectionKey: Entity | string;
  // title: string;
  // subtitle: string;
  title: string;
  link: string;
  // importButton: string
  // createButton: string;
  icon: keyof typeof Icons;
  hide?: boolean;
};

export type NavConfig = {
  name: string;
  hide?: boolean;
  contents: NavConfigContent[];
};

export type SectionConfig = {
  /** used to index the correct config object by find method */
  // key: string;
  title: string;
  subtitle: string;
  createButton: string;
  createButtonType?: string;
  importButton?: string;
  hide?: boolean;
};
