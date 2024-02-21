import { MongooseBaseModel } from './mongoose-base-model';
import { Role, RoleModel, SpaceModel, UserModel } from './space-model';

export const permissions = [
  'canCreatePost',
  'canCreateMaintenance',
  'canNotifyMaintainer',
  'canDeletePost',
  'canDeleteMaintenance',
  'canDeleteComment',
] as const;

export const permissionsFormField = [
  {
    name: 'canCreatePost',
    label: 'Create Post',
    allowed: true,
  },
  {
    name: 'canCreateMaintenance',
    label: 'Create Maintenance',
    allowed: true,
  },
  {
    name: 'canNotifyMaintainer',
    label: 'Notify Maintainer',
    allowed: false,
  },
  {
    name: 'canDeletePost',
    label: 'Delete Post',
    allowed: false,
  },
  {
    name: 'canDeleteMaintenance',
    label: 'Delete Maintenance',
    allowed: false,
  },
  {
    name: 'canDeleteComment',
    label: 'Delete Comment',
    allowed: false,
  },
] as const;

export const permissionsDefaultValues = permissionsFormField.map((permission) => ({
  name: permission.name,
  allowed: permission.allowed,
}));

export type Permission = (typeof permissionsFormField)[number]['name'];

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

export interface AccessControllerModel extends MongooseBaseModel {
  user: string | UserModel;
  space: string | SpaceModel;
  role: RoleModel | string;
  permissions: PermissionInterface[];
}
