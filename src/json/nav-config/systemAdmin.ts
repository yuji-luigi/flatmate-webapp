import { _PATH_FRONTEND } from "../../path/path-frontend";
import { NavConfig } from "../../types/data/json/sections-json";

export const systemAdminNavConfig: NavConfig[] = [
  {
    name: "Condominium Setting",
    hide: false,
    contents: [
      {
        title: "Property Manager",
        link: _PATH_FRONTEND.systemAdmin.dataTable.property_managers.root,
        icon: "security",
        // hide: true,
      },
      {
        title: "Maintainer",
        link: _PATH_FRONTEND.systemAdmin.dataTable.maintainers.root,
        icon: "maintenances",
        // hide: true,
      },
      {
        title: "Inhabitant",
        link: _PATH_FRONTEND.systemAdmin.dataTable.inhabitants.root,
        // hide: true,
        icon: "users",
      },
    ],
  },
];
