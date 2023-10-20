import { Card, Text } from '@mantine/core';
import React from 'react';
import ImagesInArticle from '../carousel/ImagesInArticle';
import { MaintenanceModel } from '../../types/models/maintenance-model';
import { ArticleActionsGroup } from '../icons/icon-buttons/ArticleActionsGroup';
import { ThreadModel } from '../../types/models/thread-model';
import AttachmentsRow from '../files/AttachmentsRow';
import classes from './SingleArticleCard.module.css';

export const SingleArticleCard = ({ data }: { data: MaintenanceModel | ThreadModel }) => {
  return (
    <Card className={classes.articleArea}>
      <Text fw={500}>{data.description}</Text>
      {!!data.images.length && <ImagesInArticle images={data.images} />}
      <AttachmentsRow attachments={data.attachments} />
      <ArticleActionsGroup />
    </Card>
  );
};
