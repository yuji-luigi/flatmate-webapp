import React, { Fragment } from 'react';
import { Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { Icons } from '../../../../../data/icons/icons';
import TextWithIcon from '../../../../../components/text/TextWithIcon';
import { MaintainerModel } from '../../../../../types/models/maintainer-model';
import { PATH_CLIENT } from '../../../../../path/path-frontend';
import { dashboardStyle } from '../../../../../styles/global-useStyles';

export const MaintainerList = ({ maintainers }: { maintainers: MaintainerModel[] }) => {
  const { classes: classes1 } = dashboardStyle();

  if (!maintainers.length) return <Text>No maintainer to the space</Text>;
  return (
    <Stack spacing={16}>
      {maintainers.map((maintainer) => {
        const Icon = Icons[maintainer.type as keyof typeof Icons] || Icons.Carpenter;
        return (
          <Fragment key={maintainer.slug}>
            <Link
              className={classes1.navList}
              href={`${PATH_CLIENT.maintainersDetail}/${maintainer.slug}`}
              key={maintainer._id}
            >
              <Stack spacing={0}>
                <TextWithIcon
                  key={maintainer._id}
                  icon={<Icon />}
                  sx={{ marginBottom: 10 }}
                  text={maintainer.name}
                />
              </Stack>
            </Link>
          </Fragment>
        );
      })}
    </Stack>
  );
};