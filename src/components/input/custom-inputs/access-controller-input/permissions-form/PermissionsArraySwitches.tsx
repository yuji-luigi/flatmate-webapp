import { Box, MultiSelect, Switch, SwitchGroup, TextInput } from '@mantine/core';
import { ChangeEvent, useEffect } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { useItemSlice } from '../../../../../redux/features/crud/selectedItemSlice';
import classes from './PermissionsByRole.module.css';
import {
  Permission,
  permissionsFormField,
} from '../../../../../types/models/access-controller-type';

type PermissionsByRoleSelectProps = {
  role: string;
  form: UseFormReturnType<Record<string, unknown>>;
};

export const PermissionsArraySwitches = (props: PermissionsByRoleSelectProps) => {
  const { form, role } = props;

  if (!form) return null;

  return (
    <Box className={classes.container}>
      <div className={classes.pl}>{props.role.toUpperCase()}</div>
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
    const permissions = form.values?.permissions as any[];
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
