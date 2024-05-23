import { NavConfig } from "../../types/data/json/sections-json";
import { spaces } from "../section-config/sectionBaseConfigs";

export const propertyManagerNavConfig: NavConfig[] = [
  {
    key: "dashboard",
    contents: [
      {
        title: "Dashboard",
        link: "/dashboard?tab=dashboard",
        icon: "home",
      },
    ],
  },
  {
    key: "setups",
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
    key: "admin",
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

export const flatPropertyManagerNavConfig = propertyManagerNavConfig.flatMap(
  (item) => item.contents
);
