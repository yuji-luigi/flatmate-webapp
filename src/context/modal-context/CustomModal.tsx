import React from 'react';
import { Box, Button, Modal, Stack } from '@mantine/core';
import { useCustomModalContext } from './_ModalContext';

const CustomModal = () => {
  const { modals, isOpenModal: opened, closeModal: close } = useCustomModalContext();
  if (!opened) return null;
  if (modals.type !== 'custom') return <>something went wrong</>;

  return (
    <Modal
      opened={opened}
      centered={modals.centered}
      withCloseButton
      onClose={close}
      withOverlay
      withinPortal={false}
      fullScreen={modals.fullScreen}
      title={modals.title}
    >
      {modals.children}
    </Modal>
  );
};

export default CustomModal;
