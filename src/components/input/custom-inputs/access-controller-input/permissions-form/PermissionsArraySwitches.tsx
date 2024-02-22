import { Box, MultiSelect, Switch, SwitchGroup, TextInput } from '@mantine/core';
import { ChangeEvent, use, useEffect, useMemo } from 'react';
import { UseFormReturnType, useForm } from '@mantine/form';
import { useItemSlice } from '../../../../../redux/features/crud/selectedItemSlice';
import classes from './PermissionsByRole.module.css';
import {
  AccessControllerModel,
  Permission,
  PermissionInterface,
  permissionsDefaultValues,
  permissionsFormField,
} from '../../../../../types/models/access-controller-type';
import { Role, RoleModel, UserModel } from '../../../../../types/models/space-model';
import { useCrudSelectors } from '../../../../../redux/features/crud/crudSlice';
import { crudFormActions } from '../../../../drawer/crud-form-action';

type PermissionsByRoleSelectProps = {
  form: UseFormReturnType<Record<string, unknown>>;
};

export const PermissionsArraySwitches = (props: PermissionsByRoleSelectProps) => {
  const { crudDocument: currentRole } = useCrudSelectors<RoleModel>('roles');
  const { crudDocuments: accessControllers } = useCrudSelectors<
    AccessControllerModel & { role: { name: Role; _id: string } }
  >('accessControllers');
  const { crudDocument: selectedUser } = useCrudSelectors<UserModel>('users');
  const { get } = useItemSlice<{ space: string | null; role: RoleModel }>();

  const accessController = useMemo(() => {
    const _accessController = accessControllers.find(
      (aCtrl) => aCtrl.role._id === currentRole?._id && aCtrl.space
    );
    const defaultValue = permissionsFormField.reduce<
      Omit<AccessControllerModel, 'createdAt' | '_id' | 'updatedAt'>
    >(
      (acc, permission) => {
        return acc;
      },
      {
        user: selectedUser._id,
        role: currentRole?._id || '',
        space: get?.space || '',
        permissions: permissionsDefaultValues,
      }
    );

    return _accessController || defaultValue;
  }, [currentRole?._id, get?.space]);
  // const localForm = useForm({ initialValues: accessController });
  // useEffect(() => {
  //   form.setValues((prev) => ({ ...prev, accessController }));
  // }, [accessController]);
  useEffect(() => {
    crudFormActions.setValues((prev) => ({ ...prev, accessController }));
  }, [accessController]);
  const { form } = props;
  const { crudDocument: role } = useCrudSelectors<RoleModel>('roles');
  if (!form.values.accessController) return '...loading';
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

type SwitchForArrayProps = {
  form: UseFormReturnType<Record<string, any>>;
  permission: any;
  // localForm: any;
};

function SwitchForArray(props: SwitchForArrayProps) {
  const { form, permission } = props;

  const currentField = form.values.accessController?.permissions.find(
    (p: PermissionInterface) => p.name === permission.name
  );
  const handleChange = (value: boolean, permissionName: string) => {
    const { permissions } = form.values.accessController as AccessControllerModel;
    const updatedPermissions = permissions.map((p) => {
      const updatedPermission = structuredClone(p);
      if (p.name === permissionName) {
        updatedPermission.allowed = value;
      }
      return updatedPermission;
    });
    form.setFieldValue('accessController.permissions', updatedPermissions);
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
