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
              {...form.getInputProps(`${field.name}`, { type: 'checkbox' })}
            />
          ))}
        </Box>
      </fieldset>
    </Box>
  );
};
