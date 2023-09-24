import React, { Fragment, memo } from 'react';
import { Indicator, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { Icons } from '../../../../../data/icons/icons';
import TextWithIcon from '../../../../../components/text/TextWithIcon';
import { MaintainerModel } from '../../../../../types/models/maintainer-model';
import { PATH_CLIENT } from '../../../../../path/path-frontend';
import { dashboardStyle } from '../../../../../styles/global-useStyles';
import CardWithTitle from '../../../../../components/profile/side/CardWithTitle';

export const NotificationCardTop = memo(() => {
  const { classes: classes1 } = dashboardStyle();

  return (
    <CardWithTitle indicator="9" title="Notifications">
      <Stack spacing={16}>
        <Stack spacing={0}>
          <TextWithIcon icon={<></>} sx={{ marginBottom: 10 }} text="notification" />
          <TextWithIcon icon={<></>} sx={{ marginBottom: 10 }} text="notification" />
          <TextWithIcon icon={<></>} sx={{ marginBottom: 10 }} text="notification" />
          <TextWithIcon icon={<></>} sx={{ marginBottom: 10 }} text="notification" />
          <TextWithIcon icon={<></>} sx={{ marginBottom: 10 }} text="notification" />
          <TextWithIcon icon={<></>} sx={{ marginBottom: 10 }} text="notification" />
          <TextWithIcon icon={<></>} sx={{ marginBottom: 10 }} text="notification" />
          <TextWithIcon icon={<></>} sx={{ marginBottom: 10 }} text="notification" />
        </Stack>
      </Stack>
    </CardWithTitle>
  );
});
