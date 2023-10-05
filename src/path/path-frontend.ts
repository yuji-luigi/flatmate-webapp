import { Sections } from '../types/general/data/sections-type';
import { HiddenAuthTokenInterface } from '../types/models/auth-token-model';

export const ROOT = '/';

export const AUTH = {
  LOGIN: '/login',
  SIGNUP: '/sign-up',
};

export const FRONTEND_ROOT = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const PATH_AFTER_LOGIN = '/dashboard/home';

// export const PATH_ROOT {}

export enum PATH_CLIENT {
  // root = '/dashboard',
  /** the initial page after login is root */
  root = '/dashboard/home',
  posts = '/dashboard/posts',
  authTokens = '/dashboard/auth-tokens',
  maintenances = '/dashboard/maintenances',
  dashboard = '/dashboard/home',
  chooseRootSpace = '/choose-root-space',
  chooseOrganization = '/choose-organization',
  rootSpaceSelected = '/dashboard/enter-space',
  checks = '/dashboard/checks',
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

export const _PATH_FRONTEND = {
  authTokens: {
    dashboard: PATH_CLIENT.authTokens,
    qrCode: ({ entity, authToken }: { entity: Sections; authToken: HiddenAuthTokenInterface }) =>
      `${FRONTEND_ROOT}/auth-tokens/${entity}/${authToken.linkId}/${authToken._id}`,
  },
  maintenances: {
    root: PATH_CLIENT.maintenances,
    checksPage: (maintenanceId: string) => `${PATH_CLIENT.checks}/maintenances/${maintenanceId}`,
    byId: (maintenanceId: string) => `${PATH_CLIENT.maintenances}/${maintenanceId}`,
  },
};
