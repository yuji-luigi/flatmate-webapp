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
  spaceCookie = 'spaces/cookie',
  spaceSlug = 'spaces/slug',
  getSpaceSelections = 'spaces/selections',
  organization = 'organizations',
  maintainers = 'maintainers',
  maintainersSlug = 'maintainers/slug',
  maintainersSpace = 'maintainers/spaces',
  maintenanceFileUpload = 'maintenances/file-upload',
  maintenanceAuthFileUpload = 'maintenances/auth/file-upload',
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
const byId = (entity: string, id: string) => `${entity}/${id}`;
const getExcelEndpoint = (excelRoute: string, entity: string) => `${excelRoute}/${entity}`;
// const getQrCodeEndpoint = ({qrCodeRoute, entity}) => `${qrCodeRoute}/${entity}`;

export const _PATH_API = {
  linkedChildren: {
    root: PATH_API.linkedChildren,
    get: (entity: string) => all(entity),
    create: (entity: string) => all(entity),
    updateById: (entity: string, id: string) => byId(entity, id),
    getById: (entity: string, id: string) => byId(entity, id),
  },
  uploads: {
    root: PATH_API.uploads,
    create: () => all(PATH_API.uploads),
    updateById: (id: string) => byId(PATH_API.uploads, id),
    getById: (id: string) => byId(PATH_API.uploads, id),
  },
  importExcel: {
    root: PATH_API.importExcel,
    users: getExcelEndpoint(PATH_API.importExcel, 'users'),
  },
  authTokens: {
    root: PATH_API.authTokens,
    sendEmail: ({}) => all(PATH_API.authTokens),
    verifyPin: ({ linkId, id, entity }: { linkId?: string; id?: string; entity: string }) =>
      `${PATH_API.authTokens}/verify-pin/${linkId}/${id}/${entity}`,
    getById: (id: string) => byId(PATH_API.authTokens, id),
    verifUser: (id: string) => byId(PATH_API.authTokens, id),
  },
  users: {
    root: PATH_API.users,
    sendTokenEmail: ({ id }: { id: string }) => `${PATH_API.users}/send-token-email/${id}`,
    updateById: (id: string) => byId(PATH_API.users, id),
    onBoarding: (id: string) => `${PATH_API.users}/on-boarding/${id}`,
  },
};

export const PATH_API_DATA_TABLE_ROOT = 'with-pagination';

export const PATH_API_DATA_TABLE = {
  linkedChildren: `${PATH_API_DATA_TABLE_ROOT}/linkedChildren`,
  uploads: `${PATH_API_DATA_TABLE_ROOT}/upload-files`,
  spaceCookie: `${PATH_API_DATA_TABLE_ROOT}/spaces/get-cookie`,
  spaces: `${PATH_API_DATA_TABLE_ROOT}/spaces`,
  getSpaceSelections: `${PATH_API_DATA_TABLE_ROOT}/spaces/selections`,
} as const;
