import { Badge, Box, Group, Stack, Text, createStyles } from '@mantine/core';
import { IconPhoneCall } from '@tabler/icons-react';
import React from 'react';
import { Icons } from '../../../../data/icons';
import TextWithIcon from '../../../../components/text/TextWithIcon';
import { MaintainerModel } from '../../../../types/models/maintainer-model';
const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
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
