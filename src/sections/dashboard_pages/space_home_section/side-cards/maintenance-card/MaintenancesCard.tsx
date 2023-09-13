import React, { Fragment } from 'react';
import CardWithTitle from '../../../../../components/profile/side/CardWithTitle';
import { Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import maintenances from '../../../../../pages/dashboard/maintenances';
import { dashboardStyle } from '../../../../../styles/global-useStyles';
import { useCrudSelectors } from '../../../../../redux/features/crud/crudSlice';
import { PATH_CLIENT } from '../../../../../path/path-frontend';
import { MaintenanceModel } from '../../../../../types/models/maintenance-model';
import TextWithIcon from '../../../../../components/text/TextWithIcon';
import { intlDateFormat } from '../../../../../utils/helpers/date-formatters';
import { TEXT_SIZE } from '../../../../../components/text/text-size';

const LIST_LIMIT = 5;

export const MaintenanceListCard = () => {
  const { classes: classes1, cx } = dashboardStyle();
  const { crudDocuments: maintenances } = useCrudSelectors<MaintenanceModel>('maintenances');

  const count = maintenances.length;
  const showMore = count > LIST_LIMIT;
  const _maintenances = maintenances.slice(0, LIST_LIMIT);

  const totalMaintenances = showMore ? `5/${count}` : `${count}/${count}`;
  return (
    <CardWithTitle title={`Maintenances ${totalMaintenances}`}>
      {_maintenances.map((maintenance) => (
        <Fragment key={maintenance._id}>
          <Link
            className={classes1.navList}
            href={`${PATH_CLIENT.maintenances}/${maintenance._id}`}
            key={maintenance._id}
          >
            <Stack spacing={0}>
              <Text fw={800} size={TEXT_SIZE.cardTile}>
                {maintenance.title.toUpperCase()}
              </Text>
              <Text fw="lighter" size={TEXT_SIZE.cardTile}>
                {intlDateFormat(maintenance.createdAt)}
              </Text>
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
