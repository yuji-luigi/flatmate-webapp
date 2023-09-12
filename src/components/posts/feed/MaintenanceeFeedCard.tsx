import {
  Card,
  Group,
  Avatar,
  Stack,
  Box,
  Title,
  Divider,
  Text,
  createStyles,
  em,
  Sx,
  ActionIcon,
  Button,
} from '@mantine/core';
import React from 'react';
import { Icons } from '../../../data/icons/icons';
import AttachmentsRow from '../AttachmentsRow';
import CarouselBasic from '../../carousel/CarouselBasic';
import useAuth from '../../../../hooks/useAuth';
import { intlDateFormat } from '../../../utils/helpers/date-formatters';
import { IconButton } from 'yet-another-react-lightbox';
import { MaintenanceModel } from '../../../types/models/maintenance-model';
import { PATH_API } from '../../../path/api-routes';
import axiosInstance from '../../../utils/axios-instance';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  feedCard: {
    minHeight: 200,
  },
  feedContent: {
    padding: 16,
    paddingInline: 24,
  },
}));

interface MaintenanceFeedCardProps {
  maintenance: MaintenanceModel;
  sx?: Sx;
}

const MaintenanceFeedCard = ({ maintenance, sx = {} }: MaintenanceFeedCardProps) => {
  const {
    createdBy,
    title,
    description: body,
    attachments,
    images,
    createdAt,
    receipts,
    invoices,
  } = maintenance;
  const { cx, classes, theme } = useStyles();
  const { user } = useAuth();
  const handleOpenCheck = async (checkId: string) => {
    try {
      const rawCheck = await axiosInstance.get(`${PATH_API.checksShowFile}/${checkId}`);
      window.open(rawCheck.data.data.file.url, '_blank');
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: `Something went wrong: ${error.message || error}`,
        color: 'red',
      });
    }
  };
  const latestReceipt = receipts.at(-1);
  const latestInvoice = invoices.at(-1);
  return (
    <Card className={classes.feedCard} sx={sx}>
      <Group sx={{ height: 80, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Group sx={{ height: '100%' }}>
          <Avatar
            src={createdBy?.avatar?.url || 'https://picsum.photos/410/300'}
            radius={90}
            size={80}
          />
          <Stack spacing={0} justify="flex-end" style={{ height: '100%', alignItems: 'flex-end' }}>
            <Text size="lg" weight="bold">
              {createdBy?.name}
            </Text>
            <Text>{intlDateFormat(createdAt)}</Text>
          </Stack>
        </Group>
        <Stack>
          {user?._id === createdBy?._id && (
            <Box sx={{ alignSelf: 'end' }}>
              <ActionIcon onClick={() => window.alert('edit fired: PostFeedCard.tsx')}>
                <Icons.dots />
              </ActionIcon>
            </Box>
          )}
          <Group position="right">
            {latestReceipt && (
              <Button
                onClick={() => {
                  if (typeof latestReceipt !== 'string') return;
                  handleOpenCheck(latestReceipt);
                }}
                leftIcon={<Icons.invoice />}
              >
                Receipt
              </Button>
            )}
            {latestInvoice && (
              <Button
                onClick={() => {
                  if (typeof latestInvoice !== 'string') return;
                  handleOpenCheck(latestInvoice);
                }}
                leftIcon={<Icons.invoice />}
              >
                Invoice
              </Button>
            )}
          </Group>
        </Stack>
      </Group>

      <Box className={classes.feedContent}>
        <Title mb={16}>{title}</Title>
        <Text>{body}</Text>
      </Box>
      <CarouselBasic images={images} />
      <Divider mb={16} />

      {!!attachments?.length && (
        <>
          <Divider mb={16} />
          <AttachmentsRow attachments={attachments} />
        </>
      )}
    </Card>
  );
};

export default MaintenanceFeedCard;
