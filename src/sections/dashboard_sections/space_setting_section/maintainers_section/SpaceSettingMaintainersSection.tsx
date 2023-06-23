import { Divider, Paper, Text } from '@mantine/core';
import React from 'react';
import { UserInfoIcons } from '../../../../components/card/UserInfoIcons';
import { SpaceSettingMaintainerCard } from './SpaceSettingMaintainerCard';

export const SpaceSettingMaintainersSection = ({
  maintainers,
}: {
  maintainers: MaintainerModel[];
}) => {
  // create array of array of maintainers by type
  const maintainersByType = maintainers.reduce((acc, maintainer) => {
    if (acc[maintainer.type]) {
      acc[maintainer.type].push(maintainer);
    } else {
      acc[maintainer.type] = [maintainer];
    }
    return acc;
  }, {} as { [key: string]: MaintainerModel[] });

  const list = Object.keys(maintainersByType).map((key) => {
    return (
      <>
        <Text>{key}</Text>
        {maintainersByType[key].map((maintainer) => (
          <SpaceSettingMaintainerCard maintainer={maintainer} />
        ))}
        <Divider />
      </>
    );
  });

  return (
    <Paper radius="lg" p="xl" withBorder>
      <Text size="lg" weight={500} mb={8}>
        Maintainers of the building/space
      </Text>
      {/* {maintainers.map((maintainer) => (
        <>
          <Text>{maintainer.type}</Text>
          <SpaceSettingMaintainerCard maintainer={maintainer} />
        </>
      ))} */}
      {list}
    </Paper>
  );
};
