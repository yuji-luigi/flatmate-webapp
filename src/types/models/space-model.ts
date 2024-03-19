import { MongooseBaseModel } from "./mongoose-base-model";

import { UploadModel } from "./upload-model";

export type IUser = UserModel;

export interface UserModel extends MongooseBaseModel {
  surname: string;
  name: string;
  email: string;
  active: boolean;
  rootSpaces: Array<string>;
  password: string;
  phone?: string;
  avatar?: UploadModel;
  isSuperAdmin: boolean;
}
export interface MeUser extends MongooseBaseModel {
  _id: string;
  name: string;
  surname: string;
  avatar: string;
  email: string;
  cover: string;
  isSuperAdmin: boolean;
  isSystemAdmin: boolean;
  loggedAs: Role;
  phone: string;
  active: boolean;
  accessController: MeAccessPermission;
}

export type UserWithRoleModel = UserModel & { role: RoleModel };

type belongsToFields = {
  hasAccess: boolean;
  rootSpaces: SpaceModel[] | string[];
  organizations: OrganizationModel[] | string[];
};

export interface BillingProfileModel extends MongooseBaseModel {
  name: string;
  surname: string;
  company: string;
  avatar?: string | UploadModel; // or string if you prefer
  cover?: string | UploadModel; // or string if you prefer
  homepage?: string;
  tel?: string;
  email: string;
  logo?: string | UploadModel; // or string if you prefer
  description?: string;
  address?: string;
}
export const ROLES = ["Administrator", "Maintainer", "Inhabitant", "System Admin"] as const;

export type Role = (typeof ROLES)[number];
export interface RoleModel extends MongooseBaseModel {
  name: Role;
}

export interface SpaceModel extends MongooseBaseModel {
  name: string;
  avatar?: UploadModel;
  cover?: UploadModel;
  organization: OrganizationModel;
  address?: string;
  floors?: string[];
  password: string;
  threads?: string[] | ThreadModel[] | undefined;
  fund: string[] | FundModel;
  slug: string;
  admins: string[] | UserModel[];
  // ! todo add virtuals in api
  _createdAt: string;
}

export interface OrganizationModel extends MongooseBaseModel {
  name: string;
  phone: string;
  email: string;
  address: string;
  homepage: string;
  logoBanner?: string;
  logoSquare?: string;
  admins: string[] | IUser[];
  /** decides if everyone in the world can see or only under the organization. */
  isPublic: boolean;
}

export interface ThreadModel extends MongooseBaseModel {
  title: string;
  images: UploadModel[] | [];
  description?: string;
  attachments?: UploadModel[] | [];
  tags?: string[];
  rating?: number;
  listViewType: "default" | "bigImage";
  articleType:
    | "default"
    | "blog"
    | "news"
    | "event"
    | "announcement"
    | "poll"
    | "survey"
    | "question"
    | "discussion";
  /** root space */
  entity: "threads";
  headSpace?: string | SpaceModel;
  createdBy: IUser;
  isImportant: boolean;
  organization: OrganizationModel | string;
  /** formatted in some way. from api schema level */
  _createdAt: string;
}

export interface FundModel extends MongooseBaseModel {
  amount?: number;
  // fundRules?: string[] | FundModelRuleMode[] | undefined;
  space?: string | SpaceModel;

  user?: string | UserModel | undefined;
}

export const permissions = [
  "canCreatePosts",
  "canCreateMaintenances",
  "canNotifyMaintainers",
  "canDeletePosts",
  "canDeleteMaintenances",
  "canDeleteComments",
] as const;

export const permissionsFormField = [
  {
    name: "canCreatePosts",
    label: "Create Post",
    allowed: true,
  },
  {
    name: "canCreateMaintenances",
    label: "Create Maintenance",
    allowed: true,
  },
  {
    name: "canNotifyMaintainers",
    label: "Notify Maintainer",
    allowed: false,
  },
  {
    name: "canDeletePosts",
    label: "Delete Post",
    allowed: false,
  },
  {
    name: "canDeleteMaintenances",
    label: "Delete Maintenance",
    allowed: false,
  },
  {
    name: "canDeleteComments",
    label: "Delete Comment",
    allowed: false,
  },
] as const;

export const permissionsDefaultValues = permissionsFormField.map((permission) => ({
  name: permission.name,
  allowed: permission.allowed,
}));

export type Permission = (typeof permissionsFormField)[number]["name"];

export interface PermissionInterface {
  name: Permission;
  allowed: boolean;
}

export type ACtrlDtoDashboard = {
  space: string;
  roleName: string;
  user: string;
} & {
  [key in Permission]: boolean;
};

export interface AccessPermissionModel extends MongooseBaseModel {
  user: string | UserModel;
  space: string | SpaceModel;
  role: RoleModel | string;
  permissions: PermissionInterface[];
}
export interface MeAccessPermission extends MongooseBaseModel {
  user: string | UserModel;
  space: string | SpaceModel;
  role: Role;
  permissions: PermissionInterface[];
}
