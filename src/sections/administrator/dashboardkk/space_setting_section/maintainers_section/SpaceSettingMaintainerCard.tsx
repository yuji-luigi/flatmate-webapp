import { Avatar, Group, Card } from '@mantine/core';
import { MaintainerCardLeftSection } from './MaintainerCardLeftSection';
import { MaintainerCardRightSection } from './MaintainerCardRightSection';
import { MaintainerModel } from '../../../../../types/models/maintainer-model';

interface SpaceSettingMaintainerCardProps {
  maintainer: MaintainerModel;
}

export function SpaceSettingMaintainerCard({ maintainer }: SpaceSettingMaintainerCardProps) {
  return (
    <Card>
      <Group align="start" wrap="nowrap">
        <Avatar src={maintainer.avatar?.url || ''} size={160} radius="md" />
        <Group grow align="start" style={{ width: '100%' }}>
          <MaintainerCardLeftSection maintainer={maintainer} />
          <MaintainerCardRightSection maintainer={maintainer} />
        </Group>
      </Group>
    </Card>
  );
}
