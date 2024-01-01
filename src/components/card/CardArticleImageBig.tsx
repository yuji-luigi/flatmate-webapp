import { AspectRatio, Box, Card, Text, Image } from '@mantine/core';
import React from 'react';
import classes from './CardArticleImageBig.module.css';

export interface CardArticleImageBigData {
  title?: string;
  description?: string;
  images?: { url: string }[];
  createdAt?: string;
  _id: string;
}

const CardArticleImageBig = ({ article }: { article: CardArticleImageBigData }) => {
  return (
    <Card
      key={article.title}
      style={{ maxHeight: 400 }}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <Box style={{ height: 300, overflow: 'hidden' }}>
        <Text className={classes.title} ta="center" my={5} mb={10}>
          {article.title}
        </Text>
        {article.images?.[0]?.url && (
          <AspectRatio ratio={1920 / 1080}>
            <Image src={article.images[0].url} />
          </AspectRatio>
        )}

        <Text size="sm" mt={5}>
          {article.description}
        </Text>
      </Box>
      <Box style={{ height: 100 }}>
        <Text color="dimmed" size="xs" tt="uppercase" ta="right" fw={700} mt="md">
          {article.createdAt}
        </Text>
      </Box>
    </Card>
  );
};

export default CardArticleImageBig;
