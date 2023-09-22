import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Group, Button, useMantineTheme } from '@mantine/core';

export function DataTableModal() {
  const theme = useMantineTheme();

  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <>
      <Modal
        opened={false}
        // opened={isOpenModal}
        onClose={() => {}}
        title="You are deleting data"
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        yOffset={!isMobile ? 200 : 0}
        centered={isMobile}
      >
        Are you sure you want to delete this?
      </Modal>
    </>
  );
}
