import { ActionIcon } from '@mantine/core';
import React from 'react';
import { Icons } from '../../../../../data/icons/icons';

const AddRoleButton = () => {
  return (
    <ActionIcon variant="gradient">
      <Icons.plus />
    </ActionIcon>
  );
};

export default AddRoleButton;
