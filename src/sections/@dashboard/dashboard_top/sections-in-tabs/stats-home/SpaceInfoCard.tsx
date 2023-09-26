import React from 'react';
import { Group, Text } from '@mantine/core';
import { useCookieContext } from '../../../../../context/CookieContext';
import CardWithTitle from '../../../../../components/profile/side/CardWithTitle';
import { ListText } from '../../../../../components/list/ListText';
import { SettingButtonSpaceHome } from '../../components/SettingButtonSpaceHome';

export const SpaceInfoCard = () => {
  const { currentSpace } = useCookieContext();
  const spaceInfo = currentSpace ? (
    <>
      <ListText>{currentSpace.name}</ListText>
      <ListText>{currentSpace.address}</ListText>
      <ListText>admin sato 3248611854</ListText>
    </>
  ) : null;
  return (
    <CardWithTitle
      title={
        <Group style={{ width: '100%' }} position="apart">
          <Text>Info</Text>
          <SettingButtonSpaceHome />
        </Group>
      }
    >
      {spaceInfo}
    </CardWithTitle>
  );
};
