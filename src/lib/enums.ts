export const FONT_SIZES = {
  menuItems: 16,
  menuItemsS: 14,
};

export const UPLOAD_FOLDERS = {
  threads: 'threads',
};

export const MAINTAINER_TYPES_ARRAY = [
  'Electrician',
  'Plumber',
  'Carpenter',
  'Painter',
  'Gardener',
  'Cleaner',
  'Other',
] as const;

export const MAINTAINER_TYPES = Object.keys(MAINTAINER_TYPES_ARRAY).reduce((acc, key) => {
  acc[MAINTAINER_TYPES_ARRAY[+key]] = MAINTAINER_TYPES_ARRAY[+key];
  return acc;
}, {} as Record<string, string>);

export const USER_ROLES = ['admin', 'user', 'maintainer', 'super_admin'] as const;

export type UserRoles = (typeof USER_ROLES)[number];
