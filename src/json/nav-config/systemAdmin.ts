import { _PATH_FRONTEND } from "../../path/path-frontend";
import { NavConfig } from "../../types/data/json/sections-json";

export const systemAdminNavConfig: NavConfig[] = [
  {
    name: "Condominium Setting",
    hide: false,
    contents: [
      {
        sectionKey: "Administrator",
        navbarTitle: "Administrator",
        link: "/dashboard/home",
        icon: "Dashboard",
        // hide: true,
      },
      {
        sectionKey: "Maintainer",
        navbarTitle: "Maintainer",
        link: "/dashboard",
        icon: "posts",
        // hide: true,
      },
      {
        sectionKey: "Inhabitant",
        navbarTitle: "Inhabitant",
        link: _PATH_FRONTEND.systemAdmin.dashboard.,
        // hide: true,
        icon: "posts",
      },
    ],
  },
];
