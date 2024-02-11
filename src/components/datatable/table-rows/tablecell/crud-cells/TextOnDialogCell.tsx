import { Group, Avatar, Tooltip, Box, Chip, Badge, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { useCustomModalContext } from '../../../../../context/modal-context/_ModalContext';
import classes from './TextOnDialogCell.module.css';
import { TextFormType } from '../../../../../types/general/data/data-table/form-field-type/formField-types';

export const TextOnDialogCell = ({
  cellValue,
  rowData,
  cellConfig,
}: {
  cellValue: string;
  rowData: Record<string, any>;
  cellConfig: TextFormType;
}) => {
  const text = cellValue.length > 9 ? `${cellValue.slice(0, 10)}...` : cellValue;
  const { colorScheme } = useMantineColorScheme();

  const { openConfirmModal } = useCustomModalContext();
  const handleOpenModal = () => {
    openConfirmModal({
      title: cellConfig.label,
      type: 'custom',
      children: cellValue,
    });
  };
  return (
    <Badge
      className={classes.badge}
      // variant={colorScheme === 'dark' ? 'light' : 'filled'}
      onClick={handleOpenModal}
    >
      <Box>{text}</Box>
    </Badge>
  );
};
