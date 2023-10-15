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
    background-color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white,
    // height: 100,
    padding: 10,
    minWidth: 600,
    gridRowEnd: 'span 1',
    cursor: 'pointer',
    '&:hover': {
      background-color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
    @media (max-width: 768px): {
      minWidth: 300,
    },
  },
  title: {
    fontWeight: 800,
    fontSize: 20,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: var(--mantine-spacing-md,
    display: 'flex',
    flex-direction: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
}));

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

  const { classes } = useStyles();
  const router = useRouter();
  return (
    <Link href={href} className={classes.link}>
      <Card withBorder radius="md" p={0} className={classes.card}>
        <Group noWrap spacing={0}>
          {image && <Image src={image} height={150} width={140} />}
          <div className={classes.body}>
            <Box sx={{ overflow: 'hidden' }}>
              <Text className={classes.title} mt="xs" mb="xs">
                {title}
              </Text>
              <Text transform="uppercase" color="dimmed" weight={700} size="xs">
                {subtitle}
              </Text>
              <Text transform="uppercase" color="dimmed" weight={700} size="xs">
                {description}
              </Text>
            </Box>
            <Group noWrap spacing="xs">
              {createdBy && (
                <Group spacing="xs" noWrap>
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
