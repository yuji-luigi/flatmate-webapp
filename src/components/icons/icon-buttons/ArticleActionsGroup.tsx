import React from 'react';
import { Group } from '@mantine/core';
import { HeartIconButton } from './HeartIconButton';
import { BookmarkIconButton } from './BookmarkIconButton';
import { ShareIconButton } from './ShareIconButton';

export const ArticleActionsGroup = () => {
  return (
    <Group justify="right" gap={8}>
      <HeartIconButton />
      <BookmarkIconButton />
      <ShareIconButton />
    </Group>
  );
};
