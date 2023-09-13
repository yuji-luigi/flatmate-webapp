import { createStyles, Card, Image, Avatar, Text, Group, Box, Stack } from '@mantine/core';
import Link from 'next/link';
import { threadId } from 'worker_threads';
import { CARD_LINK_PATH, PATH_CLIENT } from '../../path/path-frontend';
import { useRouter } from 'next/router';

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

interface Props {
  image?: string;
  category: string;
  title: string;
  date: string;
  author: {
    name: string;
    avatar?: string;
  };
  data: CardSmallImageLeftData;
}
interface CardSmallImageLeftData {
  _id: string;
}
export function CardSmallImageLeft({
  image,
  title,
  data,
  author = { name: 'not registered user', avatar: '' },
}: Props) {
  const { classes } = useStyles();

  return (
    <Link href={`/${data._id}`} className={classes.link}>
      <Card withBorder radius="md" p={0} className={classes.card}>
        <Group noWrap sx={{ height: 150 }} spacing={0}>
          {image && <Image src={image} height={150} width={140} />}
          <div className={classes.body}>
            <Box sx={{ height: 100, overflow: 'hidden' }}>
              <Text className={classes.title} mt="xs" mb="xs">
                {title}
              </Text>
              <Text transform="uppercase" color="dimmed" weight={700} size="xs">
                address
              </Text>
            </Box>
            <Group noWrap spacing="xs">
              <Group spacing="xs" noWrap>
                <Avatar size={20} src={''} />
                <Text size="xs">text test</Text>
              </Group>
              <Text size="xs" color="dimmed">
                •
              </Text>
              <Text size="xs" color="dimmed">
                createdAt
              </Text>
            </Group>
          </div>
        </Group>
      </Card>
    </Link>
  );
}
