import { curryConcatString } from "../../lib/contcatString";
import { NavConfig } from "../../types/data/json/sections-json";
import { spaces } from "../section-config/sectionBaseConfigs";

const concatPMRootPath = curryConcatString(`/property-manager`);

export const propertyManagerNavConfig: NavConfig[] = [
  {
    name: "Dashboard",
    key: "dashboard",
    contents: [
      {
        title: "Dashboard",
        link: concatPMRootPath("/dashboard?tab=dashboard"),
        icon: "home",
      },
      {
        title: "Maintenance",
        link: concatPMRootPath("/dashboard?tab=maintenances"),
        icon: "home",
      },
    ],
  },

  {
    key: "admin",
    name: "Manage Property",
    hide: false,
    contents: [
      {
        title: "Building",
        link: concatPMRootPath("/dashboard/spaces"),
        icon: "buildings",
        hide: false,
      },
      // {
      //   title: "Inhabitants",
      //   link: concatPMRootPath("/dashboard/inhabitant"),
      //   icon: "user",
      //   hide: false,
      // },
      {
        title: "Units/Inhabitants",
        link: concatPMRootPath("/dashboard/units"),
        icon: "Door",
        hide: false,
      },
      // {
      //   title: "Maintainers",
      //   link: concatPMRootPath("/dashboard/maintainer"),
      //   icon: "maintenance",
      //   hide: false,
      // },
    ],
  },
];

export const flatPropertyManagerNavConfig = propertyManagerNavConfig.flatMap(
  (item) => item.contents
);
