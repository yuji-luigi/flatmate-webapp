import { Card, Image, Avatar, Text, Group, Box, Stack } from '@mantine/core';
import Link from 'next/link';
import { threadId } from 'worker_threads';
import { useRouter } from 'next/router';
import { CARD_LINK_PATH, PATH_CLIENT } from '../../path/path-frontend';
import { MaintenanceModel } from '../../types/models/maintenance-model';
import { ThreadModel } from '../../types/models/thread-model';
import { IUser } from '../../types/context/auth/useAuth';
import classes from './CardArticleImageBig.module.css';

interface CardArticleImageDescFooterVerticalProps {
  image?: string;
  category: string;
  title: string;
  date: string | Date;
  hrefRoot: CARD_LINK_PATH;
  author:
    | IUser
    | {
        name: string;
        avatar?: string;
      };
  data: ThreadModel | MaintenanceModel;
}
export function CardArticleSmall({
  image,
  category,
  title,
  date,
  data,
  hrefRoot,
  author = { name: 'not registered user', avatar: '' },
}: CardArticleImageDescFooterVerticalProps) {
  const _description = data.description || '';
  const description =
    _description.length > 50 ? `${_description?.substring(0, 50)}...` : _description;
  const router = useRouter();
  return (
    <Link href={`${hrefRoot}/${data._id}`} className={classes.link}>
      <Card withBorder radius="md" p={0} className={classes.card}>
        <Group wrap="nowrap" style={{ height: 150 }} gap={0}>
          {image && <Image src={image} height={150} width={140} />}
          <div className={classes.body}>
            <Box style={{ height: 100, overflow: 'hidden' }}>
              <Text className={classes.title} mt="xs" mb="xs">
                {title}
              </Text>
              <Text tt="uppercase" color="dimmed" fw={700} size="xs">
                {description}
              </Text>
            </Box>
            <Group wrap="nowrap" gap="xs">
              <Group gap="xs" wrap="nowrap">
                <Avatar size={20} src="" />
                <Text size="xs">{author?.name || 'hh'}</Text>
              </Group>
              <Text size="xs" color="dimmed">
                •
              </Text>
              <Text size="xs" color="dimmed">
                {data._createdAt}
              </Text>
            </Group>
          </div>
        </Group>
      </Card>
    </Link>
  );
}
