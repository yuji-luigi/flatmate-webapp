import { Sections } from "../../general/data/sections-type";

export type SectionsJson = {
  name: string;
  hide: boolean;
  contents: {
    entity: Sections;
    title: string;
    subtitle: string;
    navbarTitle: string;
    link: string;
    importButton: string;
    createButton: string;
    icon: string;
    hide: boolean;
  }[];
};
