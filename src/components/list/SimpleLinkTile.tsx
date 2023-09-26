import { Group, Stack, Text, Tooltip } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { TEXT_SIZE } from '../text/text-size';
import { PATH_CLIENT } from '../../path/path-frontend';
import { intlDateFormat } from '../../utils/helpers/date-formatters';
import { MaintenanceModel } from '../../types/models/maintenance-model';
import { dashboardStyle } from '../../styles/global-useStyles';
import { ListText } from './ListText';

interface SimpleLinkTileProps {
  _id: string;
  title: string;
  createdAt?: Date | string;
  href: string;
}

export const SimpleLinkTile = (props: SimpleLinkTileProps) => {
  const { title, href, createdAt, _id } = props;
  const { classes: classes1 } = dashboardStyle();
  let _title = title.substring(0, 30);
  _title = title.length > 30 ? `${_title}...` : _title;
  return (
    <Tooltip label={title}>
      <Link className={classes1.navList} href={href || '/#'} key={_id} style={{ padding: 0 }}>
        <Group position="apart" style={{ width: '100%' }}>
          <ListText title={_title} />
          <Text fw={800} size={TEXT_SIZE.cardTile}>
            {createdAt && intlDateFormat(createdAt)}
          </Text>
        </Group>
      </Link>
    </Tooltip>
  );
};
