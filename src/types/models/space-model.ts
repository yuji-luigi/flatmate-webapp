import { MongooseBaseModel } from './mongoose-base-model';

import { UploadModel } from './upload-model';

export interface UserModel extends MongooseBaseModel {
  surname: string;
  name: string;
  email: string;
  active: boolean;
  role: RoleModel | 'objectId or model';
  rootSpaces: Array<string>;
  password: string;
  phone?: string;
  avatar?: UploadModel;
  isSuperAdmin: boolean;
  organization: string;
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
  _role: 'maintainer' | 'administrator';
}
export const ROLES = ['administrator', 'maintainer', 'inhabitant'] as const;

export type Role = (typeof ROLES)[number];
export interface RoleModel extends MongooseBaseModel {
  name: string;
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
  listViewType: 'default' | 'bigImage';
  articleType:
    | 'default'
    | 'blog'
    | 'news'
    | 'event'
    | 'announcement'
    | 'poll'
    | 'survey'
    | 'question'
    | 'discussion';
  /** root space */
  entity: 'threads';
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
