import { NavConfig } from "../../types/data/json/sections-json";

export const maintainerNavConfig: NavConfig[] = [
  {
    name: "main",
    hide: false,
    contents: [
      {
        sectionKey: "statistics",
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
        sectionKey: "bookmarks",
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
