export const FONT_SIZES = {
  menuItems: 16,
  menuItemsS: 14,
};

export const UPLOAD_FOLDERS = {
  threads: 'threads',
};

export const MAINTAINER_TYPES = {
  Plumber: 'Plumber',
  Carpenter: 'Carpenter',
  Electrician: 'Electrician',
};

export const USER_ROLES = ['admin', 'user', 'maintainer', 'super_admin'] as const;

export type UserRoles = (typeof USER_ROLES)[number];
