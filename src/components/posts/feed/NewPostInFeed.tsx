import { Avatar, Text, Group, Card, Box, Stack } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import classes from './NewPostInFeed.module.css';
import { useCustomModalContext } from '../../../context/modal-context/_ModalContext';

export function NewPostInFeed() {
  const { t } = useTranslation('common');
  const { openModal, openConfirmModal } = useCustomModalContext();
  const handleOpenModal = () => {
    openConfirmModal({
      title: (
        <Text component="h4" fz="lg" my={0}>
          New Post/Maintenance
        </Text>
      ),
      type: 'custom',
      children: (
        <Stack>
          <Text>Post</Text>
          <Text>Maintenance</Text>
        </Stack>
      ),
    });
  };
  return (
    <Card className={classes.card}>
      <Group className={classes.parentGroup}>
        <Avatar
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
          size={40}
          radius="100%"
        />
        <Box className={classes.inputBox} onClick={handleOpenModal}>
          <Text fz="xs" tt="uppercase" fw={700} c="dark">
            {t('Post something')}
          </Text>
        </Box>
      </Group>
    </Card>
  );
}
