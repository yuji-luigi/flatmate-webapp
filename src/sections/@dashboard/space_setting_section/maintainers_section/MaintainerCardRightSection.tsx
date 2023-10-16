import { Badge, Box, Group, Stack, Text, createStyles } from '@mantine/core';
import { IconPhoneCall } from '@tabler/icons-react';
import React from 'react';
import { Icons } from '../../../../data/icons/icons';
import TextWithIcon from '../../../../components/text/TextWithIcon';
import { MaintainerModel } from '../../../../types/models/maintainer-model';
const useStyles = createStyles((theme) => ({
  icon: {
    color: light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-5)),
  },

  name: {
    font-family: Greycliff CF, var(--mantine-font-family),
  },
}));

export const MaintainerCardRightSection = ({ maintainer }: { maintainer: MaintainerModel }) => {
  const { classes } = useStyles();
  return (
    <Stack justify="flex-start" spacing={5}>
      <Box>
        <Text fz="md" tt="uppercase" fw={700} c="dimmed">
          - Works At -
        </Text>

        {maintainer.spaces.map((space) => (
          <Badge fz="sm" className={classes.name}>
            {space.name}
          </Badge>
        ))}
      </Box>
      <Box>
        <Text fz="md" tt="uppercase" fw={700} c="dimmed">
          - Works Summary -
        </Text>

        {maintainer.spaces.map((space) => (
          <Badge fz="sm" className={classes.name}>
            {space.name}
          </Badge>
        ))}
      </Box>
    </Stack>
  );
};
