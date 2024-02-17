import { Box, Switch, SwitchGroup, TextInput } from '@mantine/core';
import { ChangeEvent } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { useItemSlice } from '../../../../../redux/features/crud/selectedItemSlice';
import classes from './PermissionsByRole.module.css';
import { permissionsFormField } from '../../../../../types/models/access-controller-type';

type PermissionsByRoleProps = {
  role: string;
  form: UseFormReturnType<Record<string, unknown>>;
};

export const PermissionsByRole = (props: PermissionsByRoleProps) => {
  const { form, role } = props;
  const { get } = useItemSlice<{ space: string }>();
  const value = get?.space || '';
  if (!form) return null;
  return (
    <Box className={classes.container}>
      <div className={classes.pl}>{props.role.toUpperCase()}</div>
      <fieldset className={classes.fieldset}>
        <Box className={classes.inputs}>
          {permissionsFormField.map((field) => (
            <Switch
              key={field.name}
              label={field.label}
              {...form.getInputProps(`${role}.${field.name}`, { type: 'checkbox' })}
            />
          ))}
          {/* <Switch
            label="Create Post"
            {...form.getInputProps(`${role}.canCreatePost`, { type: 'checkbox' })}
          />
          <Switch
            label="Create Maintenance"
            name="canCreateMaintenance"
            {...form.getInputProps(`${role}.canCreateMaintenance`, { type: 'checkbox' })}
          />
          <Switch
            label="Notify Maintainer"
            name="canNotifyMaintainer"
            {...form.getInputProps(`${role}.canNotifyMaintainer`, { type: 'checkbox' })}
          />
        </Box>
        <Box className={classes.inputs}>
          <Switch
            label="Delete Post"
            name="canDeletePost"
            {...form.getInputProps(`${role}.canDeletePost`, { type: 'checkbox' })}
          />
          <Switch
            label="Delete Maintenance"
            name="canDeleteMaintenance"
            {...form.getInputProps(`${role}.canDeleteMaintenance`, { type: 'checkbox' })}
          />
          <Switch
            label="Delete Comment"
            name="canDeleteComment"
            {...form.getInputProps(`${role}.canDeleteComment`, { type: 'checkbox' })}
          /> */}
        </Box>
      </fieldset>
    </Box>
  );
};
