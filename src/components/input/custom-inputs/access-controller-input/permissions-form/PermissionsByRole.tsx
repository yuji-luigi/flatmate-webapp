import { Box, Switch, SwitchGroup, TextInput } from '@mantine/core';
import { ChangeEvent } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { useItemSlice } from '../../../../../redux/features/crud/selectedItemSlice';
import classes from './PermissionsByRole.module.css';

type PermissionsByRoleProps = {
  role: string;
  form: UseFormReturnType<Record<string, unknown>>;
};

export const PermissionsByRole = (props: PermissionsByRoleProps) => {
  const { form, role } = props;
  const { get } = useItemSlice<{ space: string }>();
  const value = get?.space || '';
  if (!form) return null;
  console.log({ role });
  return (
    <Box className={classes.container}>
      <div className={classes.pl}>{props.role.toUpperCase()}</div>
      <fieldset className={classes.fieldset}>
        <Box className={classes.inputs}>
          <Switch
            label="Create Post"
            name="canCreatePost"
            {...form.getInputProps(`${role}.canCreatePost`)}
          />
          <Switch
            label="Create Maintenance"
            name="canCreateMaintenance"
            {...form.getInputProps(`${role}.canCreateMaintenance`)}
          />
          <Switch
            label="Notify Maintainer"
            name="canNotifyMaintainer"
            {...form.getInputProps(`${role}.canNotifyMaintainer`)}
          />
        </Box>
        <Box className={classes.inputs}>
          <Switch
            label="Delete Post"
            name="canDeletePost"
            {...form.getInputProps(`${role}.canDeletePost`)}
          />
          <Switch
            label="Delete Maintenance"
            name="canDeleteMaintenance"
            {...form.getInputProps(`${role}.canDeleteMaintenance`)}
          />
          <Switch
            label="Delete Comment"
            name="canDeleteComment"
            {...form.getInputProps(`${role}.canDeleteComment`)}
          />
        </Box>
      </fieldset>
    </Box>
  );
};
