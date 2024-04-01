import { SectionsJson } from "../../types/data/json/sections-json";

export const maintainerSectionsJson: SectionsJson[] = [
  {
    name: "main",
    hide: false,
    contents: [
      {
        entity: "statistics",
        title: "Statistics",
        subtitle: "subtitle",
        navbarTitle: "Statistics",
        link: "/dashboard/statistics",
        importButton: "",
        createButton: "",
        hide: false,
        icon: "Statistic",
      },

      {
        entity: "bookmarks",
        title: "Bookmarks",
        subtitle: "subtitle",
        navbarTitle: "Bookmark",
        link: "/dashboard/bookmarks",
        importButton: "",
        createButton: "New Bookmark",
        hide: false,
        icon: "Dashboard",
      },
    ],
  },
];
