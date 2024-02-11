import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Card,
  Avatar,
  Text,
  Box,
  Group,
  ActionIcon,
  Button,
  MantineStyleProp,
  useMantineColorScheme,
} from '@mantine/core';
import { hideNotification, showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { Icons } from '../../data/icons/icons';
import {
  setSubmitting,
  useCrudSelectors,
  useCrudSliceStore,
} from '../../redux/features/crud/crudSlice';
import { getEntityFromUrl, sleep } from '../../utils/helpers/helper-functions';
import { uploadFileAndGetModelId } from '../../utils/upload-helper';
import { useCustomModalContext } from '../../context/modal-context/_ModalContext';
import { Sections } from '../../types/general/data/sections-type';
import { FormFieldTypes } from '../../types/general/data/data-table/form-field-type/formField-types';
import { MAX_FILE_SIZE } from '../../lib/files/file-sizes';
import { formatSize } from '../../lib/formatters';
import { SpaceModel } from '../../types/models/space-model';
import { MaintainerModel } from '../../types/models/maintainer-model';
import classes from './ProfileCoverGeneric.module.css';
import { NOTIFICATIONS } from '../../data/showNofification/notificationObjects';

export interface CoverDataProp {
  _id?: string;
  title: string;
  subtitle?: string;
  avatarUrl?: string;
  coverUrl?: string;
  backgroundImage?: string;
}

const ProfileCoverGeneric = ({
  data,
  formFields,
  entity,
  noAvatar = false,
  enableCover = false,
  style,
}: {
  data: CoverDataProp;
  enableCover?: boolean;
  entity?: Sections;
  noAvatar?: boolean;
  formFields?: FormFieldTypes[];
  style?: MantineStyleProp;
}) => {
  const { documentId } = useRouter().query;
  const _entity = entity || (getEntityFromUrl() as Sections);
  const { updateCrudDocument } = useCrudSliceStore();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const gradient = isDark
    ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))'
    : 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))';

  const { crudDocument } = useCrudSelectors<SpaceModel | MaintainerModel>(_entity);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const { openConfirmModal } = useCustomModalContext();

  const [selectedImage, setSelectedImage] = useState<string | undefined>(crudDocument?.avatar?.url);
  const [selectedCover, setSelectedCover] = useState<string | undefined>(crudDocument?.cover?.url);
  // const [selectedImage, setSelectedImage] = useState<string | undefined>(data.avatarUrl);
  // const [selectedCover, setSelectedCover] = useState<string | undefined>(data.coverUrl);

  const onChangeCoverClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    coverInputRef.current?.click();
  };

  const handleLightBoxClicked = () => {
    console.log('lightbox');
  };
  useCrudSelectors;

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
    field: 'avatar' | 'cover' = 'avatar'
  ) => {
    const file = event.target.files?.[0];
    if (!file || !_entity) return;
    if (file && file.size > MAX_FILE_SIZE) {
      window.alert(`File size exceeds the allowed limit of ${formatSize(MAX_FILE_SIZE)}.`);
      // eslint-disable-next-line no-param-reassign
      event.target.value = ''; // Reset the input
      return;
    }
    showNotification(NOTIFICATIONS.LOADING.uploading);
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
        documentId: crudDocument?._id || (documentId as string),
        updateData: { [field]: uploadIdData[field][0] },
      });
      hideNotification(NOTIFICATIONS.LOADING.uploading.id);
    } catch (error) {
      await sleep(700);
      hideNotification(NOTIFICATIONS.LOADING.uploading.id);
      showNotification(NOTIFICATIONS.ERROR.general({ data: error }));
      setSubmitting(false);
    }
  };
  const handleEditClicked = () => {
    if (!crudDocument) return;
    if (!formFields) {
      console.log('formFields not defined');
      return;
    }
    openConfirmModal({
      type: 'crud',
      crudDocument,
      formFields,
      title: `Edit ${_entity}`,
    });
  };
  useEffect(() => {
    if (crudDocument) {
      setSelectedCover(crudDocument.cover?.url);
      setSelectedImage(crudDocument.avatar?.url);
    }
  }, [crudDocument?.avatar?.url, crudDocument?.cover?.url]);
  return (
    <Card
      shadow="sm"
      padding="lg"
      className={classes.card}
      style={{
        backgroundSize: 'object-fit',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `${gradient}, url(${selectedCover || crudDocument?.avatar?.url || ''})`,
      }}
    >
      <Box className={classes.coverContent}>
        {enableCover && (
          <Box onClick={handleLightBoxClicked} className={classes.lightBox}>
            <Group justify="right">
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
                    alt={`${crudDocument?.avatar?.originalFileName} avatar`}
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
              <Text fw={700} size="xl">
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
      </Box>
    </Card>
  );
};

export default ProfileCoverGeneric;
