import { SectionsJson } from "../../types/data/json/sections-json";

export const commonSections: SectionsJson[] = [
  {
    name: "Board",
    hide: true,
    contents: [
      {
        entity: "home",
        title: "",
        subtitle: "",
        navbarTitle: "TOP",
        link: "/dashboard/home",
        importButton: "",
        createButton: "",
        icon: "Dashboard",
        hide: true,
      },
      {
        entity: "threads",
        title: "Posts",
        subtitle: "subtitle",
        navbarTitle: "posts",
        link: "/dashboard",
        importButton: "",
        createButton: "",
        icon: "posts",
        hide: true,
      },
      {
        entity: "maintenances",
        title: "maintenances",
        subtitle: "subtitle",
        navbarTitle: "maintenances",
        link: "/dashboard/maintenances",
        importButton: "",
        createButton: "Assign Maintenance",
        hide: true,
        icon: "posts",
      },
    ],
  },
];
