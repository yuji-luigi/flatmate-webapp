import { createStyles, Card, Image, Avatar, Text, Group, Box, Stack } from '@mantine/core';
import Link from 'next/link';
import { threadId } from 'worker_threads';
import { useRouter } from 'next/router';
import { CARD_LINK_PATH, PATH_CLIENT } from '../../path/path-frontend';
import { MaintenanceModel } from '../../types/models/maintenance-model';
import { ThreadModel } from '../../types/models/thread-model';
import { IUser } from '../../types/context/auth/useAuth';

const useStyles = createStyles((theme) => ({
  link: {
    textDecoration: 'none',
  },
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white,
    height: 150,
    padding: 10,
    gridRowEnd: 'span 1',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
}));

interface CardArticleImageDescFooterVerticalProps {
  image?: string;
  category: string;
  title: string;
  date: string;
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
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <Link href={`${hrefRoot}/${data._id}`} className={classes.link}>
      <Card withBorder radius="md" p={0} className={classes.card}>
        <Group noWrap sx={{ height: 150 }} spacing={0}>
          {image && <Image src={image} height={150} width={140} />}
          <div className={classes.body}>
            <Box sx={{ height: 100, overflow: 'hidden' }}>
              <Text className={classes.title} mt="xs" mb="xs">
                {title}
              </Text>
              <Text transform="uppercase" color="dimmed" weight={700} size="xs">
                {description}
              </Text>
            </Box>
            <Group noWrap spacing="xs">
              <Group spacing="xs" noWrap>
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
