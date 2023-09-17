import { Sections } from '../types/general/data/sections-type';
import { AuthTokenModel, HiddenAuthTokenInterface } from '../types/models/auth-token-model';

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
  login: getAuthPath('login'),
  register: getAuthPath('register'),
  logout: getAuthPath('logout'),
  me: getAuthPath('me'),
};

export enum PATH_API {
  /**
   * creation: /linkedChildren/${entity}/...
   * update: /linkedChildren/${entity}/${}
   * */
  linkedChildren = 'linkedChildren',
  uploads = 'upload-files',
  importExcel = 'import-excel',
  uploadsMaintenance = 'upload-files/maintenance-file',
  spaces = 'spaces',
  spaceCookie = `auth/space-selected`,
  // spaceCookie = 'spaces/cookie',
  getSpaceSelections = `auth/space-selections`,
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
  checksShowFile = 'checks/show-file',
  getOrganizationsAndSpaces = 'organizations/spaces',
  getOrganizationsForAdmin = 'organizations/selections/super-admin',
  authTokens = 'auth-tokens',
  users = 'users',
  onBoarding = 'on-boarding',
}

const all = (entity: string) => `${entity}`;
const byId = (entity: string, _id: string) => `${entity}/${_id}`;
const getExcelEndpoint = (excelRoute: string, entity: string) => `${excelRoute}/${entity}`;
// const getQrCodeEndpoint = ({qrCodeRoute, entity}) => `${qrCodeRoute}/${entity}`;

export const _PATH_API = {
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
    sendEmail: ({}) => all(PATH_API.authTokens),
    verifyPin: ({ linkId, _id, entity }: { linkId?: string; _id?: string; entity: string }) =>
      `${PATH_API.authTokens}/verify-pin/${linkId}/${_id}/${entity}`,
    getById: (_id: string) => byId(PATH_API.authTokens, _id),
    verifUser: (_id: string) => byId(PATH_API.authTokens, _id),
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
} as const;

export const PATH_API_DATA_TABLE_ROOT = 'with-pagination';

export const PATH_API_DATA_TABLE = {
  linkedChildren: `${PATH_API_DATA_TABLE_ROOT}/linkedChildren`,
  uploads: `${PATH_API_DATA_TABLE_ROOT}/upload-files`,
  spaceCookie: `${PATH_API_DATA_TABLE_ROOT}/spaces/get-cookie`,
  spaces: `${PATH_API_DATA_TABLE_ROOT}/spaces`,
  getSpaceSelections: `${PATH_API_DATA_TABLE_ROOT}/spaces/selections`,
} as const;