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
import { IconButton } from 'yet-another-react-lightbox';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Icons } from '../../../data/icons/icons';
import AttachmentsRow from '../AttachmentsRow';
import ImagesInArticle from '../../carousel/ImagesInArticle';
import useAuth from '../../../../hooks/useAuth';
import { intlDateFormat } from '../../../utils/helpers/date-formatters';
import { MaintenanceModel } from '../../../types/models/maintenance-model';
import { PATH_API } from '../../../path/path-api';
import axiosInstance from '../../../utils/axios-instance';
import { _PATH_FRONTEND } from '../../../path/path-frontend';
import { TEXT_SIZE } from '../../text/text-size';
import { feedStyles } from '../../../styles/global-useStyles';
import { FeedDescription } from './FeedDesctription';

interface MaintenanceFeedCardProps {
  maintenance: MaintenanceModel;
  sx?: Sx;
}

const MaintenanceFeedCard = ({ maintenance, sx = {} }: MaintenanceFeedCardProps) => {
  const { createdBy, title, description, attachments, images, createdAt, receipts, invoices, _id } =
    maintenance;
  const { cx, classes, theme } = feedStyles();
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
      <Group sx={{ height: 40, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Group sx={{ height: '100%' }}>
          <Avatar
            src={createdBy?.avatar?.url || 'https://picsum.photos/410/300'}
            radius={90}
            size={40}
          />
          <Stack spacing={0} justify="flex-end" style={{ height: '100%', alignItems: 'flex-end' }}>
            <Text size={TEXT_SIZE.cardTile} weight="bold">
              {createdBy?.name}
            </Text>
            <Text size={TEXT_SIZE.cardTile}>{intlDateFormat(createdAt)}</Text>
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
                component={Link}
                href={_PATH_FRONTEND.maintenances.checksPage(_id)}
                leftIcon={<Icons.invoice />}
              >
                Receipt
              </Button>
            )}
            {/* {latestInvoice && (
              <Button
                onClick={() => {
                  if (typeof latestInvoice !== 'string') return;
                  handleOpenCheck(latestInvoice);
                }}
                leftIcon={<Icons.invoice />}
              >
                Invoice
              </Button>
            )} */}
          </Group>
        </Stack>
      </Group>

      <Box className={classes.feedContent}>
        <Title size={TEXT_SIZE.titleCard} mb={16}>
          {title}
        </Title>
        {/* <Text>{description}</Text> */}
        <FeedDescription
          data={{
            ...maintenance,
            body: description,
            entity: 'maintenances',
          }}
        />
      </Box>
      <ImagesInArticle images={images} />
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
