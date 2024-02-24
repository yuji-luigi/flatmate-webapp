import { Box, Switch } from '@mantine/core';
import { ChangeEvent } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { useItemSlice } from '../../../../../redux/features/crud/selectedItemSlice';
import classes from './PermissionsByRole.module.css';
import {
  AccessControllerModel,
  PermissionInterface,
  permissionsFormField,
} from '../../../../../types/models/access-controller-type';
import { RoleModel } from '../../../../../types/models/space-model';
import { useCrudSelectors } from '../../../../../redux/features/crud/crudSlice';

type PermissionsByRoleSelectProps = {
  form: UseFormReturnType<Record<string, unknown>>;
  actrl: Omit<AccessControllerModel, '_id'>;
};

export const PermissionsArraySwitches = (props: PermissionsByRoleSelectProps) => {
  const { crudDocument: currentRole, crudDocuments: roles } = useCrudSelectors<RoleModel>('roles');
  const { get } = useItemSlice<{ space: string | null; role: RoleModel }>();

  const { form, actrl } = props;
  const role = get?.role;
  if (!(form.values.accessControllers as AccessControllerModel[]).length) return '...loading';
  return (
    <Box className={classes.container}>
      {role?.name && (
        <div className={classes.pl}>{roles?.find((_role) => actrl.role === _role._id)?.name}</div>
      )}{' '}
      <fieldset className={classes.fieldset}>
        <Box className={classes.inputs}>
          {permissionsFormField.map((permission) => (
            <div key={permission.name} className={classes.input}>
              <SwitchForArray permission={permission} form={form} actrl={actrl} />
            </div>
          ))}
        </Box>
      </fieldset>
    </Box>
  );
};

type SwitchForArrayProps = {
  form: UseFormReturnType<Record<string, any>>;
  permission: any;
  actrl: Omit<AccessControllerModel, '_id'>;
  // localForm: any;
};

function SwitchForArray(props: SwitchForArrayProps) {
  const { form, permission, actrl } = props;

  const currentField = form.values.accessControllers?.find(
    (formActrl: AccessControllerModel) => formActrl.role === actrl.role
  );

  const handleChange = (value: boolean, permissionName: string) => {
    const { permissions } = currentField;
    const updatedPermissions = permissions.map((p) => {
      const updatedPermission = structuredClone(p);
      if (p.name === permissionName) {
        updatedPermission.allowed = value;
      }
      return updatedPermission;
    });

    const prevAccessControllers = form.values.accessControllers as AccessControllerModel[];
    const updatedAccessControllers = prevAccessControllers.map((prevActrl) => {
      if (prevActrl.role === actrl.role && prevActrl.space === actrl.space) {
        return { ...prevActrl, permissions: updatedPermissions };
      }
      return prevActrl;
    });

    form.setFieldValue('accessControllers', updatedAccessControllers);
  };
  return (
    <Switch
      label={permission.label}
      checked={currentField?.allowed as boolean}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        handleChange(event.currentTarget.checked, permission.name)
      }
    />
  );
}
