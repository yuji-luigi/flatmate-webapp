import { notFound } from "next/navigation";
import { HiddenAuthTokenInterface } from "../types/models/auth-token-model";
import { Entity, entities, pseudoEntities } from "../types/redux/CrudSliceInterfaces";

export const ROOT = "/";

export const AUTH = {
  LOGIN: "/login",
  SIGNUP: "/sign-up",
  SIGNUP_INVITATION: "/sign-up/invitation",
};

export const FRONTEND_ROOT = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const PATH_AFTER_LOGIN = "/dashboard?tab=dashboard";

// export const PATH_ROOT {}

export enum PATH_CLIENT {
  // root = '/dashboard',
  /** the initial page after login is root */
  posts = "/dashboard/posts",
  threads = "/dashboard/posts",
  authTokens = "/dashboard/auth-tokens",
  maintenances = "/dashboard/maintenances",
  dashboard = "/dashboard/home",
  property_manager = "/property_manager",
  maintainer = "/maintainer",
  chooseRootSpace = "/choose-root-space",
  chooseOrganization = "/choose-organization",
  rootSpaceSelected = "/dashboard/enter-space",
  checks = "/dashboard/checks",
  // organizationCookie = '/dashboard/select-organization',
  logout = "/logout",
  login = "/login",
  signup = "/sign-up",
  maintainers = "/dashboard/maintainers",
  maintainersDetail = "/dashboard/maintainers/detail",
  maintainersSearch = "/dashboard/maintainers/search",
  childrenSpace = "/dashboard/spaces",
  spaceSettings = "/dashboard/space-settings",
  uploadSuccess = "/upload-success",
}
export enum CARD_LINK_PATH {
  posts = PATH_CLIENT.posts,
  maintenances = PATH_CLIENT.maintenances,
  rootSpaceSelected = PATH_CLIENT.rootSpaceSelected,
  // organizationCookie = PATH_CLIENT.organizationCookie,
}
const CHOOSE_ORGANIZATION = "/choose-organization";
const CHOOSE_ROOT_SPACE = "/choose-root-space";

type RegularPath = { root: string; byId: (id: string) => string };
type EntityPath = Record<Entity | (typeof pseudoEntities)[number], RegularPath>;

const SYSTEM_ADMIN = "/system";
const entityPath = (path: string) =>
  [...entities, ...pseudoEntities].reduce((acc, entity) => {
    acc[entity] = {
      root: `${SYSTEM_ADMIN}/${path}/${entity}`,
      byId: (id: string) => `${SYSTEM_ADMIN}/${entity}/${id}`,
    };
    return acc;
  }, {} as EntityPath);

export const _PATH_FRONTEND = {
  pathAfterLogin: PATH_AFTER_LOGIN,
  error: {
    notFound: "/404",
    unauthorized: "/401",
  },
  systemAdmin: {
    root: SYSTEM_ADMIN,
    dataTable: entityPath("dataTable"),
    "card-list": entityPath("card-list"),
  },
  superAdmin: {
    root: "super-admin",
    dataTable: entityPath("dataTable"),
    "card-list": entityPath("card-list"),
  },
  dashboard: {
    root: "/dashboard",
    home: PATH_AFTER_LOGIN,
  },
  pathAfterLoginInhabitant: CHOOSE_ROOT_SPACE,
  homepage: {
    root: "/",
  },
  auth: {
    login: PATH_CLIENT.login,
    guardToLogin: `${PATH_CLIENT.login}?redirect=no`,
    logout: PATH_CLIENT.logout,
    signup: PATH_CLIENT.signup,
    chooseOrganization: CHOOSE_ORGANIZATION,
    chooseRootSpace: CHOOSE_ROOT_SPACE,
    invitationLogin: "/auth/invitation/login",
    invitationRegister: "/auth/invitation/register",
    invitationAcceptSuccess: (linkId: string) => `/auth/invitation/${linkId}/accept-success`,
    invitationNonValid: "/auth/invitation/non-valid",
  },
  authTokens: {
    dashboard: PATH_CLIENT.authTokens,
    qrCode: ({ entity, authToken }: { entity: Entity; authToken: HiddenAuthTokenInterface }) =>
      `${FRONTEND_ROOT}/auth-tokens/${entity}/${authToken.linkId}/${authToken._id}`,
  },
  maintenances: {
    root: PATH_CLIENT.maintenances,
    checksPage: (maintenanceId: string) => `${PATH_CLIENT.checks}/by-maintenance/${maintenanceId}`,
    byId: (maintenanceId: string) => `${PATH_CLIENT.maintenances}/${maintenanceId}`,
  },
  threads: {
    root: PATH_CLIENT.posts,
    byId: (threadId: string) => `${PATH_CLIENT.posts}/${threadId}`,
  },
} as const;
