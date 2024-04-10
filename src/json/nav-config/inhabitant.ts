import { NavConfig } from "../../types/data/json/sections-json";
import { TABLE } from "./nav-path";

export const inhabitantNavConfig: NavConfig[] = [
  {
    name: "Board",
    hide: false,
    contents: [
      {
        sectionKey: "settings",
        title: "Settings",
        link: "/dashboard/settings",
        icon: "settings",
        hide: false,
      },
      {
        sectionKey: "threads",
        title: "posts",
        link: TABLE("threads"),
        icon: "posts",
        hide: false,
      },
      {
        sectionKey: "maintenances",
        title: "maintenances",
        link: TABLE("maintenances"),
        hide: false,
        icon: "posts",
      },
    ],
  },
];
