import { Group, ActionIcon } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';
import { PATH_CLIENT } from '../../../../path/path-frontend';
import { SpaceModel } from '../../../../types/models/space-model';
import { useCustomMQuery } from '../../../../../hooks/useCustomMQuery';

export const SettingButtonSpaceHome = () => {
  // since we set document of redux store space as page space we have current space in redux store
  const { isMobile } = useCustomMQuery();
  const { crudDocument } = useCrudSelectors<SpaceModel>('spaces');
  if (!crudDocument) return null;
  const size = isMobile ? 'xs' : 'md';
  return (
    <Link href={`${PATH_CLIENT.spaceSettings}/${crudDocument.slug}`}>
      <ActionIcon variant="subtle" color="gray" radius="md" size={size}>
        <IconSettings style={{ textAlign: 'left' }} />
      </ActionIcon>
    </Link>
  );
};
