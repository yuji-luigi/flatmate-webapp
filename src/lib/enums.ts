import { Icons } from "../data/icons/icons";

export const FONT_SIZES = {
  menuItems: 16,
  menuItemsS: 14,
};

export const UPLOAD_FOLDERS = {
  threads: "threads",
};

export const MAINTAINER_TYPES_ARRAY = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "Gardener",
  "Cleaner",
  "Other",
] as const;
export const MAINTAINER_TYPES_OPTIONS = [
  {
    value: "Electrician",
    label: "Electrician",
    // f
    color: "orange",
  },
  {
    value: "Plumber",
    label: "Plumber",
    // f
    color: "orange",
  },
  {
    value: "Carpenter",
    label: "Carpenter",
    // f
    color: "orange",
  },

  {
    value: "Painter",
    label: "Painter",
    // f
    color: "orange",
  },
  {
    value: "Gardener",
    label: "Gardener",
    // f
    color: "orange",
  },
  {
    value: "Other",
    label: "Other",
    // f
    color: "orange",
  },
] as const;

export const MAINTENANCE_STATUS_ARRAY = ["incomplete", "completed", "inProgress"] as const;

export const MAINTENANCE_STATUS_OPTIONS = [
  {
    value: "incomplete",
    label: "In attesa",
    icon: Icons.clockStop,
    color: "orange",
  },
  {
    value: "invoiced",
    label: "In fatturazione",
    icon: Icons.clockStop,
    color: "orange",
  },
  {
    value: "inProgress",
    label: "In corso",
    icon: Icons.progressCheck,
    color: "blue",
  },
  {
    value: "completed",
    label: "Completato",
    icon: Icons.check,
    color: "green",
  },
];
export const MAINTAINER_TYPES = Object.keys(MAINTAINER_TYPES_ARRAY).reduce(
  (acc, key) => {
    acc[MAINTAINER_TYPES_ARRAY[+key]] = MAINTAINER_TYPES_ARRAY[+key];
    return acc;
  },
  {} as Record<string, string>
);

export const USER_ROLES = ["Administrator", "Inhabitant", "Maintainer"] as const;

export type UserRoles = (typeof USER_ROLES)[number];

export const LOCAL_STORAGE_KEYS = {
  LOCALE: "i18nextLng",
} as const;
