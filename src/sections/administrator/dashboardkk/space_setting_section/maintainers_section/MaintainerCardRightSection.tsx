import { Badge, Box, Group, Stack, Text } from '@mantine/core';
import { IconPhoneCall } from '@tabler/icons-react';
import React from 'react';
import { Icons } from '../../../../../data/icons/icons';
import TextWithIcon from '../../../../../components/text/TextWithIcon';
import { MaintainerModel } from '../../../../../types/models/maintainer-model';
import classes from './MaintainerCardRightSection.module.css';

export const MaintainerCardRightSection = ({ maintainer }: { maintainer: MaintainerModel }) => {
  return (
    <Stack justify="flex-start" gap={5}>
      <Box>
        <Text fz="md" tt="uppercase" fw={700} c="dimmed">
          - Works At -
        </Text>

        {maintainer.spaces.map((space) => (
          <Badge key={space._id} fz="sm" className={classes.name}>
            {space.name}
          </Badge>
        ))}
      </Box>
      <Box>
        <Text fz="md" tt="uppercase" fw={700} c="dimmed">
          - Works Summary -
        </Text>

        {maintainer.spaces.map((space) => (
          <Badge key={space._id} fz="sm" className={classes.name}>
            {space.name}
          </Badge>
        ))}
      </Box>
    </Stack>
  );
};
