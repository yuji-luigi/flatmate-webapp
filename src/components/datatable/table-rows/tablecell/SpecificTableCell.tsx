import { Group, Text } from '@mantine/core';
import Link from 'next/link';
import { FormFieldTypes } from '../../../../types/general/data/data-table/formField-types';

export function SpecificTableCell({
  rowData,
  cellData,
  cellConfig,
}: {
  cellData: string;
  cellConfig: FormFieldTypes;
  rowData: any;
}) {
  if ('linkRoot' in cellConfig && cellConfig.cellType === 'link-children') {
    const href = `${cellConfig.linkRoot || ''}/${rowData[cellConfig.linkKey!] || ''}`;
    return (
      <>
        {cellConfig.cellType === 'link-children' && (
          <Group spacing="sm">
            <Link href={href || ''}>
              <Text size="sm" weight={500}>
                {cellData}
              </Text>
            </Link>
          </Group>
        )}
      </>
    );
  }
  throw new Error(`Cell type not found. cellConfig.cellType: ${cellConfig.cellType}`);
}
