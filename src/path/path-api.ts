import { Sections } from '../types/general/data/sections-type';
import { AuthTokenModel, HiddenAuthTokenInterface } from '../types/models/auth-token-model';
import { Role } from '../types/models/user-model';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export type GetPathFunc = (path: string) => string;
/**
 *  define auth string for api
 * tried to avoid repetition but was not necessary?
 */
export const ROOT_AUTH = 'auth';
const getAuthPath: GetPathFunc = (path) => `${ROOT_AUTH}/${path}`;
export const ROOT_ORGANIZATION_AUTH = 'auth';
export const ROOT_SPACE_AUTH = 'auth';

type TAuthPath = {
  // [key: string]: string;
  login: string;
  register: string;
  logout: string;
  me: string;
};

export const PATH_AUTH: TAuthPath = {
  login: getAuthPath('login'), // deprecate this to _PATH_API
  register: getAuthPath('register'),
  logout: getAuthPath('logout'),
  me: getAuthPath('me'),
};

export enum PATH_API {
  /**
   * creation: /linkedChildren/${entity}/...
   * update: /linkedChildren/${entity}/${}
   * */
  auth = 'auth',
  linkedChildren = 'linkedChildren',
  uploads = 'upload-files',
  importExcel = 'import-excel',
  uploadsMaintenance = 'upload-files/maintenance-file',
  spaces = 'spaces',
  spaceCookie = 'auth/space-selected',
  // spaceCookie = 'spaces/cookie',
  getSpaceSelections = 'auth/space-selections',
  // getSpaceSelections = 'spaces/selections',
  organization = 'organizations',
  maintainers = 'maintainers',
  maintainersSlug = 'maintainers/slug',
  maintainersSpace = 'maintainers/spaces',
  maintenanceFileUpload = 'auth-tokens/maintenances/file-upload',
  maintenanceAuthFileUpload = 'auth-tokens/maintenances/file-upload',
  organizationAll = 'organizations/all',
  organizationCookie = 'organizations/cookie',
  checks = 'checks',
  getOrganizationsAndSpaces = 'organizations/spaces',
  getOrganizationsForAdmin = 'organizations/selections/super-admin',
  authTokens = 'auth-tokens',
  users = 'users',
  onBoarding = 'on-boarding',
  threads = 'threads',
  maintenances = 'maintenances',
  statistics = 'statistics',
}

const all = (entity: string) => `${entity}`;
const byId = (entity: string, _id: string) => `${entity}/${_id}`;
const getExcelEndpoint = (excelRoute: string, entity: string) => `${excelRoute}/${entity}`;
// const getQrCodeEndpoint = ({qrCodeRoute, entity}) => `${qrCodeRoute}/${entity}`;

export const _PATH_API = {
  auth: {
    registerMaintainer: `${PATH_API.auth}/complete-register/maintainer`,
    login: (role: Role) => `${PATH_API.auth}/login/${role}`,
    register: (role: Role) => `${PATH_API.auth}/register/${role}`,
    checkRoles: `${PATH_API.auth}/check-roles`,
  },
  checks: {
    root: PATH_API.checks,
    home: `${PATH_API.checks}/home`,
    byId: (threadId: string) => `${PATH_API.checks}/${threadId}`,
    withNonce: (checkId: string) => `${PATH_API.checks}/${checkId}/with-nonce`,
    byMaintenanceId: (maintenanceId: string) =>
      `${PATH_API.checks}/by-maintenance/${maintenanceId}`,
    ocrMaintenance: `${PATH_API.checks}/ocr-maintenance`,
  },
  threads: {
    root: PATH_API.threads,
    home: `${PATH_API.threads}/home`,
    byId: (threadId: string) => `${PATH_API.threads}/${threadId}`,
  },
  maintenances: {
    root: PATH_API.maintenances,
    home: `${PATH_API.maintenances}/home`,
    byId: (threadId: string) => `${PATH_API.maintenances}/${threadId}`,
  },
  spaces: {
    root: PATH_API.spaces,
    home: `${PATH_API.spaces}/home`,
    settings: `${PATH_API.spaces}/settings`,
  },
  linkedChildren: {
    root: PATH_API.linkedChildren,
    get: (entity: string) => all(entity),
    create: (entity: string) => all(entity),
    updateById: (entity: string, _id: string) => byId(entity, _id),
    getById: (entity: string, _id: string) => byId(entity, _id),
  },
  uploads: {
    root: PATH_API.uploads,
    create: () => all(PATH_API.uploads),
    updateById: (_id: string) => byId(PATH_API.uploads, _id),
    getById: (_id: string) => byId(PATH_API.uploads, _id),
    all: `${PATH_API.uploads}/all`,
  },
  importExcel: {
    root: PATH_API.importExcel,
    users: getExcelEndpoint(PATH_API.importExcel, 'users'),
  },
  authTokens: {
    root: PATH_API.authTokens,
    sendEmail: () => all(PATH_API.authTokens),
    verifyPin: ({ linkId, _id, entity }: { linkId?: string; _id?: string; entity: string }) =>
      `${PATH_API.authTokens}/verify-pin/${linkId}/${_id}/${entity}`,
    getById: (_id: string) => byId(PATH_API.authTokens, _id),
    verifUser: (_id: string) => byId(PATH_API.authTokens, _id),
    checkMaintainerFromMaintenance: ({
      linkId,
      authTokenId,
    }: {
      linkId: string;
      authTokenId: string;
    }) => `${PATH_API.authTokens}/maintenances/check/maintainer/${linkId}/${authTokenId}`,
  },
  users: {
    root: PATH_API.users,
    sendTokenEmail: ({ _id }: { _id: string }) => `${PATH_API.users}/${_id}/send-token-email`,
    updateById: (_id: string) => byId(PATH_API.users, _id),
    onBoarding: (_id: string) => `${PATH_API.users}/${_id}/on-boarding`,
    getAuthToken: (_id: string) => `${PATH_API.users}/${_id}/${PATH_API.authTokens}`,
  },
  organizations: {
    selections: `${ROOT_ORGANIZATION_AUTH}/organization-selections`,
  },
  notifications: {
    root: 'notifications',
  },
  statistics: {
    root: PATH_API.statistics,
    byMonth: `${PATH_API.statistics}/by-month`,
  },
} as const;

export const PATH_API_DATA_TABLE_ROOT = 'with-pagination';

export const PATH_API_DATA_TABLE = {
  linkedChildren: `${PATH_API_DATA_TABLE_ROOT}/linkedChildren`,
  uploads: `${PATH_API_DATA_TABLE_ROOT}/upload-files`,
  spaceCookie: `${PATH_API_DATA_TABLE_ROOT}/spaces/get-cookie`,
  spaces: `${PATH_API_DATA_TABLE_ROOT}/spaces`,
  getSpaceSelections: `${PATH_API_DATA_TABLE_ROOT}/spaces/selections`,
} as const;
