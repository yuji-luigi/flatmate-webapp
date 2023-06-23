import { Group, Stack, Text, createStyles } from '@mantine/core';
import { IconPhoneCall } from '@tabler/icons-react';
import React from 'react';
import { Icons } from '../../../../data/icons';
const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export const MaintainerCardLeftSection = ({ maintainer }: { maintainer: MaintainerModel }) => {
  const { classes } = useStyles();
  const { name, company, tel, email, address } = maintainer;
  return (
    <Stack justify="flex-start" spacing={2}>
      <Text fz="lg" fw={500} className={classes.name}>
        {name || 'N/A'}
      </Text>

      <Group noWrap spacing={10} mt={3}>
        <Icons.buildings stroke={1.5} size="1rem" className={classes.icon} />
        <Text fz="md" tt="uppercase" fw={700} c="dimmed">
          {company || 'N/A'}
        </Text>
      </Group>
      <Group noWrap spacing={10} mt={3}>
        <Icons.mail stroke={1.5} size="1rem" className={classes.icon} />
        <Text fz="md" c="dimmed">
          {email || 'N/A'}
        </Text>
      </Group>
      <Group noWrap spacing={10} mt={3}>
        <Icons.mapPin stroke={1.5} size="1rem" className={classes.icon} />
        <Text fz="md" c="dimmed">
          {address || 'N/A'}
        </Text>
      </Group>

      <Group noWrap spacing={10} mt={5}>
        <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
        <Text fz="md" c="dimmed">
          {tel || 'N/A'}
        </Text>
      </Group>
    </Stack>
  );
};
