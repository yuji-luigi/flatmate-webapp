import React, { ChangeEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import {
  Card,
  Avatar,
  Text,
  Paper,
  Box,
  Group,
  ActionIcon,
  Button,
  createStyles,
  Sx,
} from '@mantine/core';
import { Icons } from '../../data/icons/icons';
import {
  setSubmitting,
  useCrudSelectors,
  useCrudSliceStore,
} from '../../redux/features/crud/crudSlice';
import { getEntityFromUrl } from '../../utils/helpers/helper-functions';
import axiosInstance from '../../utils/axios-instance';
import { PATH_API } from '../../path/path-api';
import { extractUploadingMedia, uploadFileAndGetModelId } from '../../utils/upload-helper';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useModalContext } from '@mantine/core/lib/Modal/Modal.context';
import { use_ModalContext } from '../../context/modal-context/_ModalContext';
import { Sections } from '../../types/general/data/sections-type';
import { FormFieldTypes } from '../../types/general/data/data-table/formField-types';
import { MAX_FILE_SIZE } from '../../lib/files/file-sizes';
import { formatSize } from '../../lib/formatters';
import { useCookieContext } from '../../context/CookieContext';
import { SpaceModel } from '../../types/models/space-model';
import { MaintainerModel } from '../../types/models/maintainer-model';
import { RADIUS } from '../../styles/global-useStyles';
import { UploadModel } from '../../types/models/upload-model';

const useStyles = createStyles((theme) => ({
  card: {
    flex: 3,
    borderRadius: RADIUS.CARD,
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '200px',
    display: 'flex',
    alignItems: 'flex-end',
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
    borderRadius: 100,
    background: 'black',
    height: 100,
    width: 100,
    opacity: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'end',
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
                alt={avatar?.originalFileName + ' avatar'}
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
