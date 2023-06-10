import React from 'react';
import { use_ModalContext } from './_ModalContext';
import { Box, Button, Modal, Stack } from '@mantine/core';

const CustomModal = () => {
  const { modals, isOpenModal: opened, closeModal: close } = use_ModalContext();
  if (!opened) return null;
  if (modals.type !== 'custom') return <>something went wrong</>;

  return (
    <Modal opened={opened} centered={modals.centered} onClose={close} title={modals.title}>
      {modals.children}
      {/* <Stack>
    <Box
      display="flex"
      sx={{ flexDirection: isMobile ? 'column' : 'row', gap: 8, justifyContent: 'end' }}
    >
      <Button variant="outline" sx={modals.sx.cancel} onClick={}>
        {modals.labels.cancel || 'Cancel'}
      </Button>
      <Button
        sx={{ ...modals.sx.confirm, backgroundColor: isAlert ? 'red' : '' }}
        onClick={handleConfirm}
      >
        {modals.labels.confirm || 'Confirm'}
      </Button>
    </Box>
  </Stack> */}
    </Modal>
  );
};

export default CustomModal;
