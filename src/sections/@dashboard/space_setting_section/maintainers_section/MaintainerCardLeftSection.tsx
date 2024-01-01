import { Stack, Text } from '@mantine/core';
import React from 'react';
import { Icons } from '../../../../data/icons/icons';
import TextWithIcon from '../../../../components/text/TextWithIcon';
import { MaintainerModel } from '../../../../types/models/maintainer-model';
import classes from './MaintainerCardRightSection.module.css';

export const MaintainerCardLeftSection = ({ maintainer }: { maintainer: MaintainerModel }) => {
  const { name, company, tel, email, address } = maintainer;
  return (
    <Stack justify="flex-start" gap={2}>
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
