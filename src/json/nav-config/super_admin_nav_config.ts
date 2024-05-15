import { ROOT } from "../../path/path-frontend";
import { NavConfig } from "../../types/data/json/sections-json";
import { POSTS, TABLE } from "./nav-path";

export const super_admin_nav_configs: NavConfig[] = [
  {
    name: "Board",
    hide: false,
    contents: [
      {
        title: "Settings",
        link: "/dashboard/settings",
        icon: "settings",
        hide: false,
      },
      {
        title: "Threads",
        link: POSTS("threads"),
        icon: "posts",
        hide: false,
      },
      {
        title: "maintenances",
        link: TABLE("maintenances"),
        hide: false,
        icon: "hammer",
      },
    ],
  },
];
