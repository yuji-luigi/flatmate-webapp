import React from 'react';
import { Card, Avatar, Text, Box, Group, createStyles, Sx } from '@mantine/core';
import { RADIUS } from '../../styles/global-useStyles';
import { UploadModel } from '../../types/models/upload-model';

const useStyles = createStyles(() => ({
  card: {
    flex: 3,
    border-radius: RADIUS.CARD,
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '200px',
    display: 'flex',
    align-items: 'flex-end',
  },
  lightBox: {
    transition: 'opacity 200ms ease-in-out',
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 500,
    opacity: 0,
    '&:hover': {
      opacity: 0.7,
    },
  },
  avatarWrapper: {
    position: 'relative',
    display: 'inline-block',
    zIndex: 20,
  },
  avatarEditBox: {
    position: 'absolute',
    top: 0,
    border-radius: 100,
    background: 'black',
    height: 100,
    width: 100,
    opacity: 0,
    cursor: 'pointer',
    display: 'flex',
    align-items: 'end',
    justifyContent: 'center',
    transition: 'all 200ms ease-in-out',
    '&:hover': {
      opacity: 0.7,
    },
  },
}));
export interface CoverDataProp {
  _id?: string;
  name?: string;
  description?: string;
  subtitle?: string;
  avatar?: UploadModel;
  disableAvatar?: boolean;
  cover?: UploadModel;
  backgroundImage?: string;
  sx?: Sx;
}

const ProfileCoverStatic = (props: CoverDataProp) => {
  // const { documentId } = useRouter().query;
  // const _entity = entity || (getEntityFromUrl() as Sections);
  // const { updateCrudDocument } = useCrudSliceStore();

  // const { currentSpace } = useCookieContext();
  const { avatar, sx, cover, name, description, disableAvatar } = props;
  const { classes } = useStyles();

  return (
    <Card
      shadow="sm"
      padding="lg"
      sx={sx}
      className={classes.card}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
          cover?.url || ''
        })`,
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
            <Text weight={700} size="xl">
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
