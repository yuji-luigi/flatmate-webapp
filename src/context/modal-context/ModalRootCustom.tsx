import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Group, Button, Stack, Box, Sx, LoadingOverlay } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { showNotification } from '@mantine/notifications';

import { CrudModal } from './CrudModal';
import CustomModal from './CustomModal';
import { FormFieldTypes } from '../../types/general/data/data-table/formField-types';
import { constructErrorNotificationData } from '../../data/showNofification/notificationObjects';
import { AllModels } from '../../types/models/allmodels';
import { useCustomModalContext } from './_ModalContext';
import { RegularModal } from './RegularModal';

export function ModalRootCustom() {
  const { isOpenModal: opened, closeModal: close, modalData } = useCustomModalContext();
  if (!opened) return null;

  let modalContent;

  switch (modalData.type) {
    case 'custom':
      modalContent = <CustomModal modalData={modalData} />;
      break;
    case 'crud':
      modalContent = <CrudModal modalData={modalData} />;
      break;
    default:
      modalContent = <RegularModal modalData={modalData} />;
  }
  const withinPortal = modalData.withinPortal !== false;

  return (
    <Modal
      opened={opened}
      withinPortal={withinPortal}
      centered={modalData.centered}
      onClose={close}
      title={modalData.title}
    >
      {modalContent}
    </Modal>
  );
}
