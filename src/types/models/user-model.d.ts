import { UserRoles } from '../../lib/enums';
import { MongooseBaseModel } from './mongoose-base-model';
import { UploadModel } from './upload-model';

export interface UserModel extends MongooseBaseModel {
  surname: string;
  name: string;
  email: string;
  active: boolean;
  role: UserRoles;
  roleNew: RoleModel | string;
  rootSpaces: Array<string>;
  password: string;
  phone?: string;
  avatar?: UploadModel;
  organization: string;
}

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

export type Role = 'administrator' | 'maintainer' | 'inhabitant';
export interface RoleModel extends MongooseBaseModel {
  administrator: belongsToFields & BillingProfileModel;
  maintainer: belongsToFields & BillingProfileModel;
  inhabitant: belongsToFields;
}
