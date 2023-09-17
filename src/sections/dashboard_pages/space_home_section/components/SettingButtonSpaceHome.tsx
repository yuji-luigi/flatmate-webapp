import { Group, ActionIcon } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';
import { PATH_CLIENT } from '../../../../path/path-frontend';
import { SpaceModel } from '../../../../types/models/space-model';

export const SettingButtonSpaceHome = () => {
  // since we set document of redux store space as page space we have current space in redux store
  const { crudDocument } = useCrudSelectors<SpaceModel>('spaces');
  if (!crudDocument) return null;
  return (
    <Group position="right" mb={8}>
      <Link href={`${PATH_CLIENT.spaceSettings}/${crudDocument.slug}`}>
        <ActionIcon variant="subtle" color="gray" radius="md" size="md">
          <IconSettings style={{ textAlign: 'left' }} />
        </ActionIcon>
      </Link>
    </Group>
  );
};
