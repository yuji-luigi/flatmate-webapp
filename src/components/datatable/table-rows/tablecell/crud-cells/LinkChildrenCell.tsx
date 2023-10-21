import { Group, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { LinkChildrenFormFieldType } from '../../../../../types/general/data/data-table/formField-types';

const LinkChildrenCell = ({
  cellConfig,
  rowData,
  cellValue,
}: {
  cellConfig: LinkChildrenFormFieldType;
  rowData: any;
  cellValue: string;
}) => {
  const href = `${cellConfig.linkRoot || ''}/${rowData[cellConfig.linkKey] || ''}`;
  return (
    <Group gap="sm">
      <Link href={href}>
        <Text size="sm" weight={500}>
          {cellValue}
        </Text>
      </Link>
    </Group>
  );
};

export default LinkChildrenCell;
