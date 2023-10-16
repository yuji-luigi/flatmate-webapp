import { Group, Stack, Text, createStyles } from '@mantine/core';
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

export const MaintainerCardLeftSection = ({ maintainer }: { maintainer: MaintainerModel }) => {
  const { classes } = useStyles();
  const { name, company, tel, email, address } = maintainer;
  return (
    <Stack justify="flex-start" spacing={2}>
      <Text fz="lg" fw={500} className={classes.name}>
        {name || 'N/A'}
      </Text>

      <TextWithIcon
        textLg
        icon={<Icons.buildings stroke={1.5} size="1rem" className={classes.icon} />}
        text={company || 'N/A'}
      />
      <TextWithIcon
        textLg
        icon={<Icons.mail stroke={1.5} size="1rem" className={classes.icon} />}
        text={email || 'N/A'}
      />
      <TextWithIcon
        textLg
        icon={<Icons.mapPin stroke={1.5} size="1rem" className={classes.icon} />}
        text={address || 'N/A'}
      />
      <TextWithIcon
        textLg
        icon={<Icons.phoneCall stroke={1.5} size="1rem" className={classes.icon} />}
        text={tel || 'N/A'}
      />
    </Stack>
  );
};
