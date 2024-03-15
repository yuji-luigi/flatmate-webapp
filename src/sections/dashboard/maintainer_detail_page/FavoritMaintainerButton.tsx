import { ActionIcon, Button, Skeleton } from '@mantine/core';
import React, { useState } from 'react';
import { notifications, showNotification } from '@mantine/notifications';
import { AxiosRequestConfig } from 'axios';
import { useCrudSelectors, useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { useCookieContext } from '../../../context/CookieContext';
import { getEntityFromUrl, sleep } from '../../../utils/helpers/helper-functions';
import { MaintainerModel } from '../../../types/models/maintainer-model';
import axiosInstance from '../../../utils/axios-instance';
import { PATH_API, _PATH_API } from '../../../path/path-api';
import { useCustomModalContext } from '../../../context/modal-context/_ModalContext';
import { useLocale } from '../../../../hooks/useLocale';
import { Icons } from '../../../data/icons/icons';

export const FavoriteMaintainerButton = ({ onClick }: { onClick: () => void }) => {
  const _entity = getEntityFromUrl();
  const { t } = useLocale();
  const { setCrudDocument: setMaintainer } = useCrudSliceStore();
  const { crudDocument: maintainer } = useCrudSelectors<MaintainerModel>(_entity);
  const { currentSpace } = useCookieContext();
  const hasSpace = maintainer.spaces?.map((s) => s._id).includes(currentSpace?._id || '');

  const handleAddRemoveFromSpace = async () => {
    if (!currentSpace?._id) {
      showNotification({
        title: 'Error',
        message: t('Please select a building first'),
        color: 'red',
      });
      return;
    }

    const config: AxiosRequestConfig = {
      method: hasSpace ? 'delete' : 'post',
      url: _PATH_API.maintainers.space(maintainer._id),
      ...(hasSpace ? { data: { space: currentSpace._id } } : { data: { space: currentSpace._id } }),
    };

    const rawMaintainer = await axiosInstance(config);
    setMaintainer({
      entity: _entity,
      document: rawMaintainer.data.data,
    });
  };

  return (
    <ActionIcon onClick={handleAddRemoveFromSpace}>
      <Icons.star
        style={{
          color: hasSpace ? 'var(--mantine-color-primary)' : 'var(--mantine-color-grey)',
          fill: hasSpace ? 'var(--mantine-color-primary)' : '',
        }}
      />
    </ActionIcon>
  );
  // const { setCrudDocument } = useCrudSliceStore();
  // const [submitting, setSubmitting] = useState(false);

  // const { openConfirmModal } = useCustomModalContext();
  // const handleRemove = () => {
  //   openConfirmModal({
  //     labels: {
  //       confirm: 'Proceed',
  //       cancel: 'Go back',
  //     },
  //     centered: true,
  //     type: 'confirm',
  //     title: 'Remove maintainer from building',
  //     children: 'Are you sure you want to remove this maintainer from this building?',
  //     onConfirm: removeMaintainer,
  //     opened: false,
  //     onClose(): void {
  //       throw new Error('Function not implemented.');
  //     },
  //   });
  // };

  // const removeMaintainer = async (): Promise<void> => {
  //   try {
  //     setSubmitting(true);
  //     notifications.show({
  //       id: 'submit',
  //       title: 'Removing maintainer from building',
  //       message: 'Please wait...',
  //       autoClose: false,
  //       loading: true,
  //     });
  //     await sleep(1500);

  //     if (!currentSpace?._id) throw new Error('Building not selected: select a building at navbar');
  //     if (!maintainer?._id) {
  //       throw new Error(
  //         'Error: maintainer id is not found. If error persists please contact flatmates support team.'
  //       );
  //     }
  //     const res = await axiosInstance.delete(
  //       `${PATH_API.maintainersSpace}?maintainer=${maintainer._id}&space=${currentSpace._id}`
  //     );
  //     setCrudDocument({ entity: _entity, maintainer: res.data.data });
  //     notifications.show({
  //       title: 'Success',
  //       message: 'Maintainer removed from building',
  //       autoClose: 5000,
  //       // color: 'blue',
  //     });
  //   } catch (error: any) {
  //     console.log(error);
  //     notifications.show({
  //       title: 'Error',
  //       message: error.message || error,
  //       autoClose: 5000,
  //       color: 'red',
  //     });
  //   } finally {
  //     notifications.hide('submit');
  //     setSubmitting(false);
  //   }
  // };
  // console.log(maintainer);
  // if (!maintainer?.spaces) {
  //   return (
  //     <Button onClick={onClick} variant="outline" color="yellow">
  //       {t('Add/Remove maintainer to building')}
  //     </Button>
  //   );
  // }
  // const assignedToCurrentSpace = currentSpace?._id
  //   ? maintainer.spaces.map((space) => space._id)?.includes(currentSpace?._id)
  //   : false;
  // return (
  //   <>
  //     {assignedToCurrentSpace ? (
  //       <Button onClick={handleRemove} variant="outline" color="red">
  //         Remove Maintainer From Building
  //       </Button>
  //     ) : (
  //       <Button onClick={onClick} variant="outline" color="yellow">
  //         Add Maintainer to Building
  //       </Button>
  //     )}
  //   </>
  // );
};