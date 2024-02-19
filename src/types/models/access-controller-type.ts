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
    defaultValue: true,
  },
  {
    name: 'canCreateMaintenance',
    label: 'Create Maintenance',
    defaultValue: true,
  },
  {
    name: 'canNotifyMaintainer',
    label: 'Notify Maintainer',
    defaultValue: false,
  },
  {
    name: 'canDeletePost',
    label: 'Delete Post',
    defaultValue: false,
  },
  {
    name: 'canDeleteMaintenance',
    label: 'Delete Maintenance',
    defaultValue: false,
  },
  {
    name: 'canDeleteComment',
    label: 'Delete Comment',
    defaultValue: false,
  },
] as const;

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
  role: RoleModel;
  permissions: PermissionInterface[];
}
