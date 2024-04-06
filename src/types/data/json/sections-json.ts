import { Entity } from "../../redux/CrudSliceInterfaces";

export type SectionsJson = {
  name: string;
  hide?: boolean;
  contents: {
    sectionKey: Entity | string;
    // title: string;
    // subtitle: string;
    navbarTitle: string;
    link: string;
    // importButton: string;
    // createButton: string;
    icon: string;
    hide?: boolean;
  }[];
};
