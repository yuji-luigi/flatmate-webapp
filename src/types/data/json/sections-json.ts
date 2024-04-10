import { Entity } from "../../redux/CrudSliceInterfaces";

export type NavConfig = {
  name: string;
  hide?: boolean;
  contents: {
    sectionKey: Entity | string;
    // title: string;
    // subtitle: string;
    navbarTitle: string;
    link: string;
    // importButton: string
    // createButton: string;
    icon: string;
    hide?: boolean;
  }[];
};

export type SectionConfig = {
  /** used to index the correct config object by find method */
  // key: string;
  title: string;
  subtitle: string;
  createButton: string;
  importButton?: string;
  hide?: boolean;
};
