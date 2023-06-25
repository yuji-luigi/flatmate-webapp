import { createStyles, Avatar, Text, Group, Card, Stack, Badge, Box } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
import { Icons } from '../../../../data/icons';
import { MaintainerCardLeftSection } from './MaintainerCardLeftSection';
import { MaintainerCardRightSection } from './MaintainerCardRightSection';
import { MaintainerModel } from '../../../../types/models/maintainer-model';
const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface SpaceSettingMaintainerCardProps {
  maintainer: MaintainerModel;
}

export function SpaceSettingMaintainerCard({ maintainer }: SpaceSettingMaintainerCardProps) {
  const { classes } = useStyles();
  const { name, company, tel, email, address } = maintainer;

  return (
    <Card>
      <Group align="start" noWrap>
        <Avatar src={maintainer.avatar?.url || ''} size={160} radius="md" />
        <Group grow align="start" sx={{ width: '100%' }}>
          <MaintainerCardLeftSection maintainer={maintainer} />
          <MaintainerCardRightSection maintainer={maintainer} />
        </Group>
      </Group>
    </Card>
  );
}
