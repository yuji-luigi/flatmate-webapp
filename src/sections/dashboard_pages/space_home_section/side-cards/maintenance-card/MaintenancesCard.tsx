import React, { Fragment } from 'react';
import CardWithTitle from '../../../../../components/profile/side/CardWithTitle';
import { Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import maintenances from '../../../../../pages/dashboard/maintenances';
import { dashboardStyle } from '../../../../../styles/global-useStyles';
import { useCrudSelectors } from '../../../../../redux/features/crud/crudSlice';
import { PATH_DASHBOARD } from '../../../../../path/page-paths';

const LIST_LIMIT = 5;

export const MaintenanceListCard = () => {
  const { classes: classes1, cx } = dashboardStyle();
  const { crudDocuments: maintenances } = useCrudSelectors<MaintenanceModel>('maintenances');

  const count = maintenances.length;
  const showMore = count > LIST_LIMIT;
  const _maintenances = maintenances.slice(0, LIST_LIMIT);

  const totalMaintenances = showMore ? `5/${count}` : `${count}/${count}`;
  return (
    <CardWithTitle titleSx={{ fontSize: 24 }} title={`Maintenances ${totalMaintenances}`}>
      {_maintenances.map((maintenance) => (
        <Fragment key={maintenance._id}>
          <Link
            className={classes1.navList}
            href={`${PATH_DASHBOARD.maintenances}/${maintenance._id}`}
            key={maintenance._id}
          >
            <Stack spacing={0}>
              <Text fw={800} size="lg">
                {maintenance.title.toUpperCase()}
              </Text>
              <Text fw="lighter">{maintenance._createdAt}</Text>
            </Stack>
          </Link>
        </Fragment>
      ))}
      {showMore && (
        <Link className={cx(classes1.navList)} href="/dashboard/maintenances">
          <Text sx={{ width: '100%', textAlign: 'right' }} size="lg">
            ...See more
          </Text>
        </Link>
      )}
    </CardWithTitle>
  );
};
