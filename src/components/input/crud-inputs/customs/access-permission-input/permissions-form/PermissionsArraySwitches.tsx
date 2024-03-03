import { Box, Switch } from '@mantine/core';
import { ChangeEvent } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { useItemSlice } from '../../../../../../redux/features/crud/selectedItemSlice';
import classes from './PermissionsByRole.module.css';

import {
  AccessPermissionModel,
  RoleModel,
  permissionsFormField,
} from '../../../../../../types/models/space-model';
import { useCrudSelectors } from '../../../../../../redux/features/crud/crudSlice';

type PermissionsByRoleSelectProps = {
  form: UseFormReturnType<Record<string, unknown>>;
  actrl: Omit<AccessPermissionModel, '_id'>;
};

export const PermissionsArraySwitches = (props: PermissionsByRoleSelectProps) => {
  const { crudDocument: currentRole, crudDocuments: roles } = useCrudSelectors<RoleModel>('roles');
  const { get } = useItemSlice<{ space: string | null; role: RoleModel }>();

  const { form, actrl } = props;
  const role = get?.role;
  if (!(form.values.accessPermissions as AccessPermissionModel[]).length) return '...loading';
  return (
    <Box className={classes.container}>
      {role?.name && (
        <div className={classes.pl}>{roles?.find((_role) => actrl.role === _role._id)?.name}</div>
      )}{' '}
      <fieldset className={classes.fieldset}>
        <Box className={classes.inputs}>
          {permissionsFormField.map((permission) => (
            <div key={permission.name} className="crud-input">
              <SwitchForArray switchFormField={permission} form={form} actrl={actrl} />
            </div>
          ))}
        </Box>
      </fieldset>
    </Box>
  );
};

type SwitchForArrayProps = {
  form: UseFormReturnType<Record<string, any>>;
  switchFormField: any;
  actrl: Omit<AccessPermissionModel, '_id'>;
  // localForm: any;
};

function SwitchForArray(props: SwitchForArrayProps) {
  const { form, switchFormField, actrl } = props;

  const currentActrl = (form.values.accessPermissions as AccessPermissionModel[])?.find(
    (formActrl: AccessPermissionModel) => formActrl.role === actrl.role
  );
  const permission =
    currentActrl?.permissions.find(
      (currentPermission) => currentPermission.name === switchFormField.name
    ) || undefined;
  const handleChange = (value: boolean, permissionName: string) => {
    const { permissions } = currentActrl || { permissions: [] };
    const updatedPermissions = permissions.map((p) => {
      const updatedPermission = structuredClone(p);
      if (p.name === permissionName) {
        updatedPermission.allowed = value;
      }
      return updatedPermission;
    });

    const prevAccessPermissions = form.values.accessPermissions as AccessPermissionModel[];
    const updatedAccessPermissions = prevAccessPermissions.map((prevActrl) => {
      if (prevActrl.role === actrl.role && prevActrl.space === actrl.space) {
        return { ...prevActrl, permissions: updatedPermissions };
      }
      return prevActrl;
    });

    form.setFieldValue('accessPermissions', updatedAccessPermissions);
  };
  return (
    <Switch
      label={switchFormField.label}
      checked={permission?.allowed as boolean}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        handleChange(event.currentTarget.checked, switchFormField?.name)
      }
    />
  );
}
