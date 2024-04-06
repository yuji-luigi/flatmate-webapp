import { SectionsJson } from "../../types/data/json/sections-json";

export const systemAdminNavConfig: SectionsJson[] = [
  {
    name: "Condominium Setting",
    hide: false,
    contents: [
      {
        sectionKey: "Administrator",
        title: "Administrator",
        subtitle: "",
        navbarTitle: "Administrator",
        link: "/dashboard/home",
        importButton: "",
        createButton: "",
        icon: "Dashboard",
        // hide: true,
      },
      {
        sectionKey: "Maintainer",
        title: "Maintainer",
        subtitle: "subtitle",
        navbarTitle: "Maintainer",
        link: "/dashboard",
        importButton: "",
        createButton: "",
        icon: "posts",
        // hide: true,
      },
      {
        sectionKey: "Inhabitant",
        title: "Inhabitant",
        subtitle: "subtitle",
        navbarTitle: "Inhabitant",
        link: "/dashboard/maintenances",
        importButton: "",
        createButton: "Assign Maintenance",
        // hide: true,
        icon: "posts",
      },
    ],
  },
];
