import { createStyles, Card, Image, Avatar, Text, Group, Box, Stack } from '@mantine/core';
import Link from 'next/link';
import { threadId } from 'worker_threads';
import { useRouter } from 'next/router';
import { CARD_LINK_PATH, PATH_CLIENT } from '../../path/path-frontend';
import { MaintenanceModel } from '../../types/models/maintenance-model';
import { ThreadModel } from '../../types/models/thread-model';
import { IUser } from '../../types/context/auth/useAuth';
import classes from './CardArticleSmall.module.css';

interface CardArticleImageDescFooterVerticalProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  href: string;
  createdBy?: IUser;
  createdAt?: Date | string;
}
export function CardForListSmall(props: CardArticleImageDescFooterVerticalProps) {
  const { image, title, subtitle, description, href, createdBy, createdAt } = props;

  const router = useRouter();
  return (
    <Link href={href} className={classes.link}>
      <Card withBorder radius="md" p={0} className={classes.card}>
        <Group wrap="nowrap" gap={0}>
          {image && <Image src={image} height={150} width={140} />}
          <div className={classes.body}>
            <Box style={{ overflow: 'hidden' }}>
              <Text className={classes.title} mt="xs" mb="xs">
                {title}
              </Text>
              <Text tt="uppercase" color="dimmed" fw={700} size="xs">
                {subtitle}
              </Text>
              <Text tt="uppercase" color="dimmed" fw={700} size="xs">
                {description}
              </Text>
            </Box>
            <Group wrap="nowrap" gap="xs">
              {createdBy && (
                <Group gap="xs" wrap="nowrap">
                  <Avatar size={20} src={createdBy.avatar?.url} />
                  <Text size="xs">{createdBy.name}</Text>
                </Group>
              )}
              {createdAt && (
                <>
                  <Text size="xs" color="dimmed">
                    •
                  </Text>
                  <Text size="xs" color="dimmed">
                    {createdAt.toString()}
                  </Text>
                </>
              )}
            </Group>
          </div>
        </Group>
      </Card>
    </Link>
  );
}
