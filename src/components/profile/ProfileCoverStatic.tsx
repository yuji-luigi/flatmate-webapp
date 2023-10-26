import React from 'react';
import {
  Card,
  Avatar,
  Text,
  Box,
  Group,
  MantineStyleProp,
  useMantineColorScheme,
} from '@mantine/core';
import { UploadModel } from '../../types/models/upload-model';
import classes from './ProfileCoverGeneric.module.css';

export interface CoverDataProp {
  // _id?: string;
  name?: string;
  description?: string;
  // subtitle?: string;
  avatar?: UploadModel;
  disableAvatar?: boolean;
  cover?: UploadModel;
  // backgroundImage?: string;
  style?: MantineStyleProp;
}

const ProfileCoverStatic = (props: CoverDataProp) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { avatar, style, cover, name, description, disableAvatar } = props;
  const gradient = isDark
    ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))'
    : 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))';
  return (
    <Card
      shadow="sm"
      padding="lg"
      className={classes.card}
      style={{
        backgroundImage: `${gradient}, url(${cover?.url || ''})`,
      }}
    >
      <Group style={{ justifyContent: 'space-between', width: '100%' }}>
        <Group>
          {!disableAvatar && (
            <Box className={classes.avatarWrapper}>
              <Avatar
                style={{ cursor: 'pointer', marginRight: '1rem' }}
                size={100}
                radius={80}
                src={avatar?.url}
                alt={`${avatar?.originalFileName} avatar`}
              />
            </Box>
          )}
          <Box style={{ alignSelf: 'center' }}>
            <Text fw={700} size="xl">
              {name}
            </Text>
            <Text size="md">{description}</Text>
          </Box>
        </Group>
      </Group>
    </Card>
  );
};

export default ProfileCoverStatic;
