import { NavConfig } from "../../types/data/json/sections-json";

export const propertyManagerNavConfig: NavConfig[] = [
  {
    contents: [
      {
        title: "Dashboard",
        link: "/dashboard?tab=dashboard",
        icon: "home",
      },
    ],
  },
  {
    name: "setups",
    hide: false,
    contents: [
      {
        title: "Maintainers",
        link: "/dashboard/maintainer",
        icon: "maintenance",
        hide: false,
      },
    ],
  },
  {
    name: "admin",
    hide: false,
    contents: [
      {
        title: "Building",
        link: "/dashboard/spaces",
        icon: "buildings",
        hide: false,
      },
      {
        title: "Inhabitants",
        link: "/dashboard/inhabitant",
        icon: "user",
        hide: false,
      },
    ],
  },
];
