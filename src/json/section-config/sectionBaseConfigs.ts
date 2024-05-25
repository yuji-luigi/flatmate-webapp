import { title } from "process";
import { SectionConfig } from "../../types/data/json/sections-json";
import { FrontendEntity } from "../../types/redux/CrudSliceInterfaces";
const sectionConfigBases: Record<FrontendEntity, SectionConfig> = {
  spaces: {
    title: "Spaces",
    createButton: "New Space",
  },
  inhabitant: {
    title: "Inhabitants",
    createButton: "New Inhabitant",
  },
  maintainer: {
    title: "Maintainers",
    createButton: "New Maintainer",
  },
  checks: {
    title: "Checks",
    createButton: "New Check",
  },
  maintenances: {
    title: "Maintenances",
    createButton: "New Maintenance",
  },
  users: {
    title: "Users",
    createButton: "",
  },
  comments: {
    title: "Comments",
    createButton: "",
  },
  bookmarks: {
    title: "Bookmarks",
    createButton: "",
  },
  tags: {
    title: "Tags",
    createButton: "",
  },
  threads: {
    title: "Threads(Posts)",
    createButton: "",
  },
  userSettings: {
    title: "UserSettings",
    createButton: "",
  },
  uploads: {
    title: "Uploads(Files)",
    createButton: "",
  },
  wallets: {
    title: "Wallets",
    createButton: "",
  },
  events: {
    title: "Events",
    createButton: "",
  },
  roles: {
    title: "Roles", // TODO: CHANGE IT TO USERTYPES AND ADD ROLE AS A SCHEMA OF ACCESS_PERMISSIONS.PERMISSIONS
    createButton: "",
  },
  accessPermissions: {
    title: "Access Permissions",
    createButton: "",
  },
  invitations: {
    title: "Invitations",
    createButton: "",
  },
  statistics: {
    title: "Statistics",
    createButton: "",
  },
  posts: {
    title: "(Threads)Posts",
    createButton: "",
  },
  home: {
    title: "HOME",
    createButton: "",
  },
  property_manager: {
    title: "Property Managers",
    createButton: "",
  },
  units: {
    title: "Units",
    createButton: "",
  },
  system_admin: {
    title: "",
    subtitle: undefined,
    sectionActions: undefined,
    createButton: undefined,
    createButtonType: undefined,
    importButton: undefined,
    hide: undefined,
  },
  super_admin: {
    title: "",
    subtitle: undefined,
    sectionActions: undefined,
    createButton: undefined,
    createButtonType: undefined,
    importButton: undefined,
    hide: undefined,
  },
  placeholder: {
    title: "",
    subtitle: undefined,
    sectionActions: undefined,
    createButton: undefined,
    createButtonType: undefined,
    importButton: undefined,
    hide: undefined,
  },
};

export const {
  spaces,
  inhabitant,
  maintainer,
  checks,
  maintenances,
  users,
  comments,
  bookmarks,
  tags,
  threads,
  userSettings,
  uploads,
  wallets,
  events,
  roles,
  accessPermissions,
  invitations,
  statistics,
  posts,
  home,
  property_manager,
  units,
} = sectionConfigBases;
