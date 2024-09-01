import { _PATH_FRONTEND } from "../../path/path-frontend";
import { NavConfig } from "../../types/data/json/sections-json";

export const systemAdminNavConfig: NavConfig[] = [
  {
    key: "setting",
    name: "Condominium Setting",
    hide: false,
    contents: [
      {
        title: "Property Manager",
        link: _PATH_FRONTEND.systemAdmin.dataTable.property_manager.root,
        icon: "propertyManagerBuilding",
      },
      // {
      //   title: "Maintainer",
      //   link: _PATH_FRONTEND.systemAdmin["card-list"].maintainer.root,
      //   icon: "IconShovel",
      // },
      {
        title: "Inhabitant",
        link: _PATH_FRONTEND.systemAdmin.dataTable.inhabitant.root,
        icon: "IconUsers",
      },
    ],
  },
];
