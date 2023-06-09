import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Group, Button, Stack, Box, Sx } from '@mantine/core';
import { use_ModalContext } from './_ModalContext';
import { CrudModal } from './CrudModal';
import { ReactNode } from 'react';
import CustomModal from './CustomModal';
import { FormFieldTypes } from '../../types/general/data/data-table/formField-types';

export interface _ModalContextStates {
  isOpenModal: boolean;
  closeModal: () => void;
  openModal: () => void;
  modals: ModalProps;
  toggleOpenModal: (isOpenModal: boolean) => void;
  openConfirmModal: (confirmModalProps: OpenConfirmModalParams) => void;
}

type BaseModalParams = {
  title: string;
  centered?: boolean;
  children: React.ReactNode;
  onCancel?: () => void;
  onConfirm: (data: any) => void;
};

interface ConfirmAlertModalParams extends BaseModalParams {
  type: 'confirm' | 'alert';
  formFields?: FormFieldTypes[];
  sx?: {
    confirm?: Sx;
    cancel?: Sx;
  };
  labels: {
    confirm?: string;
    cancel?: string;
  };
}

interface CrudModalParams extends BaseModalParams {
  type: 'crud';
  formFields: FormFieldTypes[];
  crudDocument?: AllModels;
}
interface CustomModalParams extends BaseModalParams {
  type: 'custom';
}

export type OpenConfirmModalParams = ConfirmAlertModalParams | CrudModalParams | CustomModalParams;

export type ModalProps = OpenConfirmModalParams & {
  id: string;
  labels: {
    confirm?: string;
    cancel?: string;
  };
  sx: {
    confirm?: Sx;
    cancel?: Sx;
  };
};

export function ModalRootCustom() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { isOpenModal: opened, closeModal: close, modals } = use_ModalContext();
  const isAlert = modals.type === 'alert';

  const handleCancel = () => {
    modals.onCancel?.();
    close();
  };
  const handleConfirm = (data: any) => {
    modals.onConfirm(data);
    close();
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
    </Modal>
  );
}
