import { SectionsJson } from "../../types/data/json/sections-json";

export const inhabitantSectionsJson: SectionsJson[] = [
  {
    name: "Board",
    hide: false,
    contents: [
      {
        sectionKey: "settings",
        title: "Settings",
        subtitle: "",
        navbarTitle: "Settings",
        link: "/dashboard/settings",
        importButton: "",
        createButton: "",
        icon: "settings",
        hide: false,
      },
      {
        sectionKey: "threads",
        title: "Your threads",
        subtitle: "subtitle",
        navbarTitle: "posts",
        link: "/",
        importButton: "",
        createButton: "",
        icon: "posts",
        hide: false,
      },
      {
        sectionKey: "maintenances",
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
