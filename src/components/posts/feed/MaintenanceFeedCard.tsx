import { Card, Box, Title, Divider, Sx } from '@mantine/core';
import React from 'react';
import AttachmentsRow from '../AttachmentsRow';
import ImagesInArticle from '../../carousel/ImagesInArticle';
import useAuth from '../../../../hooks/useAuth';
import { MaintenanceModel } from '../../../types/models/maintenance-model';
import { _PATH_FRONTEND } from '../../../path/path-frontend';
import { TEXT_SIZE } from '../../text/text-size';
import { feedStyles } from '../../../styles/global-useStyles';
import { FeedDescription } from './FeedDesctription';
import classesM from './MaintenanceFeedCard.module.css';
import { FeedHeading } from './feed-heading/FeedHeading';

interface MaintenanceFeedCardProps {
  maintenance: MaintenanceModel;
  sx?: Sx;
}

const MaintenanceFeedCard = ({ maintenance, sx = {} }: MaintenanceFeedCardProps) => {
  const { createdBy, title, description, attachments, images, createdAt, receipts, invoices, _id } =
    maintenance;
  console.log('maintenance', maintenance);
  const { cx, classes, theme } = feedStyles();
  const { user } = useAuth();

  return (
    <Card className={classes.feedCard} sx={sx}>
      <FeedHeading {...maintenance} />
      {/* <Group sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
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
          <Group position="right">
            {user?._id === createdBy?._id && (
              <ActionIcon onClick={() => window.alert('edit fired: PostFeedCard.tsx')}>
                <Icons.dots />
              </ActionIcon>
            )}
            <ActionIcon
              color="primary"
              component={Link}
              href={_PATH_FRONTEND.maintenances.checksPage(_id)}
            >
              <Icons.receipt />
            </ActionIcon>
          </Group>
        </Stack>
      </Group> */}
      <Box className={classes.feedContent}>
        <Title size={TEXT_SIZE.titleCard} mb={16}>
          {title}
        </Title>
        {/* <Text>{description}</Text> */}
        <FeedDescription
          className={classesM.description}
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
