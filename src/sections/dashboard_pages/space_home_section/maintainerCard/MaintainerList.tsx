import React from 'react';
import { Icons } from '../../../../data/icons';
import TextWithIcon from '../../../../components/text/TextWithIcon';
import { Text } from '@mantine/core';
import { MaintainerModel } from '../../../../types/models/maintainer-model';

export const MaintainerList = ({ maintainers }: { maintainers: MaintainerModel[] }) => {
  if (!maintainers.length) return <Text>No maintainer to the space</Text>;
  return (
    <>
      {maintainers.map((maintainer) => {
        console.log(maintainer.type);
        const Icon = Icons[maintainer.type as keyof typeof Icons] || Icons.Carpenter;
        return (
          <TextWithIcon
            key={maintainer._id}
            icon={<Icon />}
            sx={{ marginBottom: 10 }}
            text={maintainer.name}
          />
        );
      })}
    </>
  );
};
