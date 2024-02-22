import { Box, MultiSelect, Switch, SwitchGroup, TextInput } from '@mantine/core';
import { ChangeEvent, useEffect } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { useItemSlice } from '../../../../../redux/features/crud/selectedItemSlice';
import classes from './PermissionsByRole.module.css';
import {
  AccessControllerModel,
  Permission,
  permissionsFormField,
} from '../../../../../types/models/access-controller-type';
import { RoleModel } from '../../../../../types/models/space-model';
import { useCrudSelectors } from '../../../../../redux/features/crud/crudSlice';

type PermissionsByRoleSelectProps = {
  form: UseFormReturnType<Record<string, unknown>>;
};

export const PermissionsArraySwitches = (props: PermissionsByRoleSelectProps) => {
  const { form } = props;
  const { crudDocument: role } = useCrudSelectors<RoleModel>('roles');
  if (!form) return null;
  return (
    <Box className={classes.container}>
      {role.name && <div className={classes.pl}>{role.name.toUpperCase()}</div>}{' '}
      <fieldset className={classes.fieldset}>
        <Box className={classes.inputs}>
          {permissionsFormField.map((permission) => (
            <div key={permission.name} className={classes.input}>
              <SwitchForArray permission={permission} form={form} />
            </div>
          ))}
        </Box>
      </fieldset>
    </Box>
  );
};

type SwitchForArrayProps = { form: UseFormReturnType<Record<string, unknown>>; permission: any };

function SwitchForArray(props: SwitchForArrayProps) {
  const { form, permission } = props;
  const handleChange = (value: boolean, permissionName: string) => {
    const { permissions } = form.values?.accessController as AccessControllerModel;
    const updatedPermissions = permissions.map((p) => {
      const updatedPermission = structuredClone(p);
      if (p.name === permissionName) {
        updatedPermission.allowed = value;
      }
      return updatedPermission;
    });
    form.setFieldValue('permissions', updatedPermissions);
  };
  return (
    <Switch
      label={permission.label}
      checked={form.values?.[permission.name] as boolean}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        handleChange(event.currentTarget.checked, permission.name)
      }
    />
  );
}
