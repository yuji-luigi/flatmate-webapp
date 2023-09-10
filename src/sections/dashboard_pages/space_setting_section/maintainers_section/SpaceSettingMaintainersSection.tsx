import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import React from 'react';
import { UserInfoIcons } from '../../../../components/card/UserInfoIcons';
import { SpaceSettingMaintainerCard } from './SpaceSettingMaintainerCard';
import { PaperWithTitle } from '../../../../components/paper/PaperWithTitle';
import { MaintainerModel } from '../../../../types/models/maintainer-model';
import { MAINTAINER_TYPES } from '../../../../lib/enums';
import { NoMaintainerCard } from './NoMaintainerCard';
import { Icons } from '../../../../data/icons/icons';
import Link from 'next/link';
import { PATH_CLIENT } from '../../../../path/page-paths';

export const SpaceSettingMaintainersSection = ({
  maintainers,
}: {
  maintainers: MaintainerModel[];
}) => {
  // create array of array of maintainers by type
  const maintainersByType = maintainers.reduce((acc, maintainer) => {
    if (acc[maintainer.type]) {
      acc[maintainer.type].push(maintainer);
    } else {
      acc[maintainer.type] = [maintainer];
    }
    return acc;
  }, {} as { [key: string]: MaintainerModel[] });

  const list = Object.keys(MAINTAINER_TYPES).map((type) => {
    return (
      <Box>
        <Group>
          <Text component="h1">{type}</Text>
          <ActionIcon
            component="a"
            href={`/dashboard/maintainers/?type=${type}`}
            // href={`${PATH_CLIENT.maintainers}?type=${type}`}
            variant="light"
            color="blue"
          >
            <Icons.plus />
          </ActionIcon>
        </Group>
        <Stack sx={{ gap: 12 }}>
          {maintainersByType[type]?.map((maintainer) => (
            <SpaceSettingMaintainerCard maintainer={maintainer} />
          )) || <NoMaintainerCard type={type} />}
        </Stack>
      </Box>
    );
  });
  return (
    <PaperWithTitle title="Maintainers of the building/space" sx={{ marginBottom: 20 }}>
      <Stack sx={{ gap: 32 }}>{list}</Stack>
    </PaperWithTitle>
  );
};
