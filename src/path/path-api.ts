import { link } from "fs";
import { Role } from "../types/models/space-model";
import { FrontendEntity } from "../types/redux/CrudSliceInterfaces";
import { inhabitant } from "../json/section-config/sectionBaseConfigs";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export type GetPathFunc = (path: string) => string;
/**
 *  define auth string for api
 * tried to avoid repetition but was not necessary?
 */
export const ROOT_AUTH = "auth";
const getAuthPath: GetPathFunc = (path) => `${ROOT_AUTH}/${path}`;
export const ROOT_ORGANIZATION_AUTH = "auth";
export const ROOT_SPACE_AUTH = "auth";

type TAuthPath = {
  // [key: string]: string;
  login: string;
  register: string;
  logout: string;
  me: string;
};

export const PATH_AUTH: TAuthPath = {
  login: getAuthPath("login"), // deprecate this to apiEndpoint
  register: getAuthPath("register"),
  logout: getAuthPath("logout"),
  me: getAuthPath("me"),
};

export enum apiEndpointRootsEnum {
  /**
   * creation: /linkedChildren/${entity}/...
   * update: /linkedChildren/${entity}/${}
   * */
  auth = "auth",
  accessPermissions = "accessPermissions",
  linkedChildren = "linkedChildren",
  uploads = "upload-files",
  importExcel = "import-excel",
  uploadsMaintenance = "upload-files/maintenance-file",
  spaces = "spaces",
  getSpaceSelections = "auth/space-selections",
  organization = "organizations",
  maintainers = "maintainer",
  invitations = "invitations",
  maintainersSlug = "maintainers/slug",
  maintainersSpace = "maintainers/spaces",
  maintenanceFileUpload = "auth-tokens/maintenances/file-upload",
  maintenanceAuthFileUpload = "auth-tokens/maintenances/file-upload",
  organizationAll = "organizations/all",
  organizationCookie = "organizations/cookie",
  checks = "checks",
  getOrganizationsAndSpaces = "organizations/spaces",
  getOrganizationsForAdmin = "organizations/selections/super-admin",
  authTokens = "auth-tokens",
  users = "users",
  onBoarding = "on-boarding",
  threads = "threads",
  maintenances = "maintenances",
  statistics = "statistics",
  inhabitant = "inhabitant",
  units = "units",
}

const all = (entity: string) => `${entity}`;
const byId = (entity: string, _id: string) => `${entity}/${_id}`;
const getExcelEndpoint = (excelRoute: string, entity: string) => `${excelRoute}/${entity}`;
// const getQrCodeEndpoint = ({qrCodeRoute, entity}) => `${qrCodeRoute}/${entity}`;

export const apiEndpoint = {
  // pseudo entity spaceSelections
  spaceSelections: {
    root: `${apiEndpointRootsEnum.auth}/space-selections`,
    byId: (spaceId: string) => `${apiEndpointRootsEnum.auth}/space-selections/${spaceId}`,
  },
  auth: {
    registerMaintainer: `${apiEndpointRootsEnum.auth}/complete-register/maintainer`,
    login: (role?: Role) => `${apiEndpointRootsEnum.auth}/login/${role || ""}`,
    me: `${apiEndpointRootsEnum.auth}/me`,
    register: (role: Role) => `${apiEndpointRootsEnum.auth}/register/${role}`,
    checkRoles: `${apiEndpointRootsEnum.auth}/check-roles`,
    systemAdminCheck: (spaceId: string) =>
      `${apiEndpointRootsEnum.auth}/system-admin/check-by-space/${spaceId}`,
    systemAdminExit: `${apiEndpointRootsEnum.auth}/system-admin/exit`,
    toggleSuperAdmin: `${apiEndpointRootsEnum.auth}/super-admin/toggle`,
  },

  checks: {
    root: apiEndpointRootsEnum.checks,
    home: `${apiEndpointRootsEnum.checks}/home`,
    byId: (threadId: string) => `${apiEndpointRootsEnum.checks}/${threadId}`,
    withNonce: (checkId: string) => `${apiEndpointRootsEnum.checks}/${checkId}/with-nonce`,
    byMaintenanceId: (maintenanceId: string) =>
      `${apiEndpointRootsEnum.checks}/by-maintenance/${maintenanceId}`,
    ocrMaintenance: `${apiEndpointRootsEnum.checks}/ocr-maintenance`,
  },
  threads: {
    root: apiEndpointRootsEnum.threads,
    home: `${apiEndpointRootsEnum.threads}/home`,
    byId: (threadId: string) => `${apiEndpointRootsEnum.threads}/${threadId}`,
  },
  maintenances: {
    root: apiEndpointRootsEnum.maintenances,
    home: `${apiEndpointRootsEnum.maintenances}/home`,
    byId: (threadId: string) => `${apiEndpointRootsEnum.maintenances}/${threadId}`,
  },
  spaces: {
    root: apiEndpointRootsEnum.spaces,
    home: `${apiEndpointRootsEnum.spaces}/home`,
    settings: `${apiEndpointRootsEnum.spaces}/settings`,
    withQuery: (query?: string) => `${apiEndpointRootsEnum.spaces}/with-query${query}`,
  },
  linkedChildren: {
    root: apiEndpointRootsEnum.linkedChildren,
    get: (entity: string) => all(entity),
    create: (entity: string) => all(entity),
    updateById: (entity: string, _id: string) => byId(entity, _id),
    getById: (entity: string, _id: string) => byId(entity, _id),
  },
  uploads: {
    root: apiEndpointRootsEnum.uploads,
    create: () => all(apiEndpointRootsEnum.uploads),
    updateById: (_id: string) => byId(apiEndpointRootsEnum.uploads, _id),
    getById: (_id: string) => byId(apiEndpointRootsEnum.uploads, _id),
    all: `${apiEndpointRootsEnum.uploads}/all`,
  },
  importExcel: {
    root: apiEndpointRootsEnum.importExcel,
    users: getExcelEndpoint(apiEndpointRootsEnum.importExcel, "users"),
  },
  authTokens: {
    root: apiEndpointRootsEnum.authTokens,
    sendEmail: () => all(apiEndpointRootsEnum.authTokens),
    renew: `${apiEndpointRootsEnum.authTokens}/renew`,
    verifyPin: ({ linkId, _id, entity }: { linkId?: string; _id?: string; entity?: string }) => {
      if (_id && entity) {
        return `${apiEndpointRootsEnum.authTokens}/verify-pin/${linkId}/${_id}/${entity}`;
      }
      return `${apiEndpointRootsEnum.authTokens}/verify-pin/${linkId}`;
    },
    getById: (_id: string) => byId(apiEndpointRootsEnum.authTokens, _id),
    verifUser: (_id: string) => byId(apiEndpointRootsEnum.authTokens, _id),
    checkByCookie: byId(apiEndpointRootsEnum.authTokens, "check-by-cookie"),
    checkMaintainerFromMaintenance: ({
      linkId,
      authTokenId,
    }: {
      linkId: string;
      authTokenId: string;
    }) =>
      `${apiEndpointRootsEnum.authTokens}/maintenances/check/maintainer/${linkId}/${authTokenId}`,
  },
  users: {
    root: apiEndpointRootsEnum.users,
    sendTokenEmail: ({ _id }: { _id: string }) =>
      `${apiEndpointRootsEnum.users}/${_id}/send-token-email`,
    updateById: (_id: string) => byId(apiEndpointRootsEnum.users, _id),
    onBoarding: (_id: string) => `${apiEndpointRootsEnum.users}/${_id}/on-boarding`,
    getAuthToken: (_id: string) =>
      `${apiEndpointRootsEnum.users}/${_id}/${apiEndpointRootsEnum.authTokens}`,
    invite: (entity: FrontendEntity) => `${apiEndpointRootsEnum.users}/invite/${entity}`,
  },

  notifications: {
    root: "notifications",
  },
  statistics: {
    root: apiEndpointRootsEnum.statistics,
    byMonth: `${apiEndpointRootsEnum.statistics}/by-month`,
  },
  organizations: {
    root: apiEndpointRootsEnum.organization,
    selections: `${ROOT_ORGANIZATION_AUTH}/organization-selections`,
    getOrganizationsForAdmin: apiEndpointRootsEnum.getOrganizationsForAdmin,
    getOrganizationsAndSpaces: apiEndpointRootsEnum.getOrganizationsAndSpaces,
    all: apiEndpointRootsEnum.organizationAll,
    cookie: (orgId: string) => `${apiEndpointRootsEnum.organizationCookie}/${orgId}`,
  },
  accessPermissions: {
    root: `${apiEndpointRootsEnum.accessPermissions}`,
  },
  maintainers: {
    root: apiEndpointRootsEnum.maintainers,
    byId: (maintainerId: string) => `${apiEndpointRootsEnum.maintainers}/${maintainerId}`,
    bySlug: (slug: string) => `${apiEndpointRootsEnum.maintainersSlug}/${slug}`,
    spaces: (idMaintainer: string) => `${apiEndpointRootsEnum.maintainers}/${idMaintainer}/spaces`,
    space: (idMaintainer: string) => `${apiEndpointRootsEnum.maintainers}/${idMaintainer}/space`,
  },
  invitations: {
    root: apiEndpointRootsEnum.invitations,
    byLinkId: (linkId: string) => `${apiEndpointRootsEnum.invitations}/by-linkId/${linkId}`,
    acceptByLogin: (linkId: string) =>
      `${apiEndpointRootsEnum.invitations}/accept-by-login/${linkId}`,
    preRegisterWithEmailVerification: (linkId: string) =>
      `${apiEndpointRootsEnum.invitations}/pre-register-with-email-verification/${linkId}`,
    acceptByRegister: (linkId: string) => `${apiEndpointRootsEnum.invitations}/register/${linkId}`,
    acceptByLinkId: (linkId: string) => `${apiEndpointRootsEnum.invitations}/accept/${linkId}`,
    getAuthTokenByEntityRowId: ({ rowId, entity }: { rowId: string; entity: string }) =>
      `${apiEndpointRootsEnum.invitations}/${entity}/auth-token/${rowId}`,
  },
  inhabitant: {
    importExcel: `${apiEndpointRootsEnum.inhabitant}/${apiEndpointRootsEnum.importExcel}`,
  },
  units: {
    root: apiEndpointRootsEnum.units,
    byId: (id: string) => `${apiEndpointRootsEnum.units}/${id}`,
    withAuthTokenById: (idUnit: string) => `${apiEndpointRootsEnum.units}/${idUnit}/auth-tokens`,
    withAuthToken: `${apiEndpointRootsEnum.units}/auth-tokens`,
  },
} as const;

export const PATH_API_DATA_TABLE_ROOT = "with-pagination";

export const PATH_API_DATA_TABLE = {
  linkedChildren: `${PATH_API_DATA_TABLE_ROOT}/linkedChildren`,
  uploads: `${PATH_API_DATA_TABLE_ROOT}/upload-files`,
  spaceCookie: `${PATH_API_DATA_TABLE_ROOT}/spaces/get-cookie`,
  spaces: `${PATH_API_DATA_TABLE_ROOT}/spaces`,
  getSpaceSelections: `${PATH_API_DATA_TABLE_ROOT}/spaces/selections`,
} as const;
