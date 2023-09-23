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

export function ModalRootCustom() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { isOpenModal: opened, closeModal: close, modals } = useCustomModalContext();
  const isAlert = modals.type === 'alert';
  const [submitting, setSubmitting] = useState(false);
  const handleCancel = () => {
    modals.onCancel?.();
    close();
  };
  const handleConfirm = async (data: any) => {
    try {
      setSubmitting(true);

      await modals.onConfirm(data);
      close();
    } catch (error: any) {
      showNotification(constructErrorNotificationData(error.message || error));
    } finally {
      setSubmitting(false);
    }
  };

  if (!opened) return null;

  if (modals.type === 'custom') {
    return <CustomModal />;
  }
  if (modals.type === 'crud') {
    return <CrudModal />;
  }
  return (
    <Modal opened={opened} centered={modals.centered} onClose={close} title={modals.title}>
      {modals.children}
      <Stack>
        <Box
          display="flex"
          sx={{ flexDirection: isMobile ? 'column' : 'row', gap: 8, justifyContent: 'end' }}
        >
          <Button variant="outline" sx={modals.sx.cancel} onClick={handleCancel}>
            {modals.labels.cancel || 'Cancel'}
          </Button>
          <Button
            sx={{ ...modals.sx.confirm, backgroundColor: isAlert ? 'red' : '' }}
            onClick={handleConfirm}
          >
            {modals.labels.confirm || 'Confirm'}
          </Button>
        </Box>
      </Stack>
      {submitting && <LoadingOverlay visible />}
    </Modal>
  );
}
