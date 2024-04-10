import { NavConfig } from "../../types/data/json/sections-json";

export const commonSections: NavConfig[] = [
  {
    name: "Board",
    hide: true,
    contents: [
      {
        //TODO: SECTION KEY TO CHECK OUT AND CHANGE NAME OR ELIMINATE
        // sectionKey: "home",
        title: "",
        link: "/dashboard/home",
        icon: "Dashboard",
        hide: true,
      },
      // {
      //   sectionKey: "threads",
      //   title: "Posts",
      //   subtitle: "subtitle",
      //   title: "posts",
      //   link: "/dashboard",
      //   importButton: "",
      //   createButton: "",
      //   icon: "posts",
      //   hide: true,
      // },
      {
        title: "maintenances",
        link: "/dashboard/maintenances",
        hide: true,
        icon: "posts",
      },
    ],
  },
];
