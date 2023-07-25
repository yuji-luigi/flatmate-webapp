export const ROOT = '/';

export const AUTH = {
  LOGIN: '/login',
  SIGNUP: '/sign-up',
};

export const PATH_AFTER_LOGIN = '/dashboard/posts';

// export const PATH_ROOT {}

export enum PATH_CLIENT {
  // root = '/dashboard',
  /** the initial page after login is root */
  root = '/dashboard/home',
  posts = '/dashboard/posts',
  maintenances = '/dashboard/maintenances',
  dashboard = '/dashboard/home',
  chooseRootSpace = '/choose-root-space',
  chooseOrganization = '/choose-organization',
  rootSpaceSelected = '/dashboard/enter-space',
  // organizationCookie = '/dashboard/select-organization',
  logout = '/logout',
  login = '/login',
  signup = '/sign-up',
  maintainers = '/dashboard/maintainers',
  maintainersDetail = '/dashboard/maintainers/detail',
  maintainersSearch = '/dashboard/maintainers/search',
  childrenSpace = '/dashboard/spaces',
  spaceSettings = '/dashboard/space-settings',
  uploadSuccess = '/upload-success',
}
export enum CARD_LINK_PATH {
  posts = PATH_CLIENT.posts,
  maintenances = PATH_CLIENT.maintenances,
  rootSpaceSelected = PATH_CLIENT.rootSpaceSelected,
  // organizationCookie = PATH_CLIENT.organizationCookie,
}
