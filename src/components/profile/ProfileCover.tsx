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
import { Icons } from '../../data/icons';
import {
  setSubmitting,
  useCrudSelectors,
  useCrudSliceStore,
} from '../../redux/features/crud/crudSlice';
import { getEntityFromUrl } from '../../utils/helpers/helper-functions';
import axiosInstance from '../../utils/axios-instance';
import { PATH_API } from '../../path/api-routes';
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

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: 12,
    position: 'relative',
    width: '100%',
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
  title: string;
  subtitle?: string;
  avatarUrl?: string;
  coverUrl?: string;
  backgroundImage?: string;
}

const ProfileCover = ({
  data,
  formFields,
  entity,
  noAvatar = false,
  enableCover = false,
  sx,
}: {
  data: CoverDataProp;
  enableCover?: boolean;
  entity?: Sections;
  noAvatar?: boolean;
  formFields?: FormFieldTypes[];
  sx?: Sx;
}) => {
  const { documentId } = useRouter().query;
  const _entity = entity || (getEntityFromUrl() as Sections);
  const { updateCrudDocument } = useCrudSliceStore();

  const { currentSpace } = useCookieContext();

  const { classes } = useStyles();

  const { selectDocumentById, crudDocument } = useCrudSelectors(_entity);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const { openConfirmModal } = use_ModalContext();

  const [selectedImage, setSelectedImage] = useState<string | undefined>(data.avatarUrl);
  const [selectedCover, setSelectedCover] = useState<string | undefined>(data.coverUrl);

  const onChangeCoverClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    coverInputRef.current?.click();
  };

  const handleLightBoxClicked = () => {
    console.log('lightbox');
  };

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
    field: 'avatar' | 'cover' = 'avatar'
  ) => {
    const file = event.target.files?.[0];
    if (!file || !_entity) return;
    if (file && file.size > MAX_FILE_SIZE) {
      window.alert(`File size exceeds the allowed limit of ${formatSize(MAX_FILE_SIZE)}.`);
      event.target.value = ''; // Reset the input
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (field === 'avatar') {
        setSelectedImage(reader.result as string);
      }
      if (field === 'cover') {
        setSelectedCover(reader.result as string);
      }
    };
    reader.readAsDataURL(file);

    try {
      const uploadIdData = await uploadFileAndGetModelId({ [field]: [file] }, _entity);
      updateCrudDocument({
        entity: _entity,
        documentId: data._id || (documentId as string),
        updateData: { [field]: uploadIdData[field][0] },
      });
    } catch (error) {
      console.log(error);
      notifications.hide('submit');
      setSubmitting(false);
      return;
    }
  };
  const handleEditClicked = () => {
    if (!formFields) return console.log('formFields not defined');
    openConfirmModal({
      type: 'crud',
      crudDocument: crudDocument,
      formFields,
      title: `Edit ${_entity}`,
      children: undefined,

      onCancel: function (): void {
        throw new Error('Function not implemented.');
      },
      onConfirm: function (data: any): void {
        throw new Error('Function not implemented.');
      },
    });
  };
  useEffect(() => {
    setSelectedCover(data.coverUrl);
    setSelectedImage(data.avatarUrl);
  }, [data.avatarUrl, data.coverUrl]);
  return (
    <Card
      shadow="sm"
      padding="lg"
      sx={sx}
      className={classes.card}
      style={{
        // backgroundSize: 'object-fit',
        // backgroundRepeat: 'no-repeat',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
          selectedCover || 'https://picsum.photos/410/300'
        })`,
      }}
    >
      {enableCover && (
        <Box onClick={handleLightBoxClicked} className={classes.lightBox}>
          <Group position="right">
            <input
              id="cover-input"
              type="file"
              ref={coverInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleImageChange(e, 'cover')}
            />
            <Button m={8} color="dark" onClick={onChangeCoverClicked}>
              Change cover
            </Button>
          </Group>
        </Box>
      )}
      <Group style={{ justifyContent: 'space-between', width: '100%' }}>
        <Group>
          {!noAvatar && (
            <Box className={classes.avatarWrapper}>
              <label htmlFor="avatar-input">
                <Avatar
                  style={{ cursor: 'pointer', marginRight: '1rem' }}
                  size={100}
                  radius={80}
                  src={selectedImage}
                  alt={data.title + ' avatar'}
                />
                <input
                  id="avatar-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                {formFields && (
                  <Box className={classes.avatarEditBox}>
                    <Text fw={800} mb={8}>
                      Edit
                    </Text>
                  </Box>
                )}
              </label>
            </Box>
          )}
          <Box style={{ alignSelf: 'center' }}>
            <Text weight={700} size="xl">
              {data.title}
            </Text>
            <Text size="md">{data.subtitle}</Text>
          </Box>
        </Group>

        {formFields && (
          <ActionIcon onClick={handleEditClicked}>
            <Icons.pencil />
          </ActionIcon>
        )}
      </Group>
    </Card>
  );
};

export default ProfileCover;
