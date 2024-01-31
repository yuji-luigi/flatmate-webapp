import { Button, Skeleton } from '@mantine/core';
import React, { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useCrudSelectors, useCrudSliceStore } from '../../../../redux/features/crud/crudSlice';
import { useCookieContext } from '../../../../context/CookieContext';
import { getEntityFromUrl, sleep } from '../../../../utils/helpers/helper-functions';
import { MaintainerModel } from '../../../../types/models/maintainer-model';
import axiosInstance from '../../../../utils/axios-instance';
import { PATH_API } from '../../../../path/path-api';
import { useCustomModalContext } from '../../../../context/modal-context/_ModalContext';

export const AddRemoveButton = ({ onClick }: { onClick: () => void }) => {
  const _entity = getEntityFromUrl();
  const { setCrudDocument } = useCrudSliceStore();

  const [submitting, setSubmitting] = useState(false);

  const { crudDocument: document } = useCrudSelectors<MaintainerModel>(_entity);
  const { currentSpace } = useCookieContext();
  const { openConfirmModal } = useCustomModalContext();
  const handleRemove = function () {
    openConfirmModal({
      labels: {
        confirm: 'Proceed',
        cancel: 'Go back',
      },
      centered: true,
      type: 'confirm',
      title: 'Remove maintainer from building',
      children: 'Are you sure you want to remove this maintainer from this building?',
      onConfirm: removeMaintainer,
    });
  };

  const removeMaintainer = async (): Promise<void> => {
    try {
      setSubmitting(true);
      notifications.show({
        id: 'submit',
        title: 'Removing maintainer from building',
        message: 'Please wait...',
        autoClose: false,
        loading: true,
      });
      await sleep(1500);

      if (!currentSpace?._id) throw new Error('Building not selected: select a building at navbar');
      if (!document?._id) {
        throw new Error(
          'Error: maintainer id is not found. If error persists please contact flatmates support team.'
        );
      }
      const res = await axiosInstance.delete(
        `${PATH_API.maintainersSpace}?maintainer=${document._id}&space=${currentSpace._id}`
      );
      setCrudDocument({ entity: _entity, document: res.data.data });
      notifications.show({
        title: 'Success',
        message: 'Maintainer removed from building',
        autoClose: 5000,
        // color: 'blue',
      });
    } catch (error: any) {
      console.log(error);
      notifications.show({
        title: 'Error',
        message: error.message || error,
        autoClose: 5000,
        color: 'red',
      });
    } finally {
      notifications.hide('submit');
      setSubmitting(false);
    }
  };

  if (!document?.spaces) return <Skeleton />;
  const assignedToCurrentSpace = currentSpace?._id
    ? document.spaces.map((space) => space._id)?.includes(currentSpace?._id)
    : false;
  return (
    <>
      {assignedToCurrentSpace ? (
        <Button onClick={handleRemove} variant="outline" color="red">
          Remove Maintainer From Building
        </Button>
      ) : (
        <Button onClick={onClick} variant="outline" color="yellow">
          Add Maintainer to Building
        </Button>
      )}
    </>
  );
};
