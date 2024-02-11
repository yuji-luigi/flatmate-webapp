import { Avatar, Box, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { FormFieldInterface } from '../../../../../types/general/data/data-table/form-field-type/formField-types';
import classes from './UserNameEmailCell.module.css';
import cellClasses from '../crud-cells/Cell.module.css';
import { _PATH_FRONTEND } from '../../../../../path/path-frontend';
import { UserModel } from '../../../../../types/models/space-model';

type UserNameEmailCellProps = {
  cellConfig: FormFieldInterface;
  rowData: UserModel;
};

export const UserNameEmailCell: React.FC<UserNameEmailCellProps> = (
  props: UserNameEmailCellProps
) => {
  const {
    rowData: { name, surname, email },
    cellConfig,
  } = props;
  return (
    <Box component={Link} href="#" className={classes.parentGrid}>
      <Avatar size={45} className={classes.avatar} />
      <Box className={classes.nameSection}>
        <Text>{name}</Text>
        <Text>{surname}</Text>
      </Box>
      <Text>{email}</Text>
      <Text>root spaces...</Text>
    </Box>
  );
};
