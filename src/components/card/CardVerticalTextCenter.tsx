import {
  createStyles,
  Card,
  Image,
  Avatar,
  Text,
  Group,
  Box,
  Stack,
  BackgroundImage,
  Sx,
} from '@mantine/core';
import Link from 'next/link';
import { threadId } from 'worker_threads';
import { useRouter } from 'next/router';
import { CARD_LINK_PATH, PATH_CLIENT } from '../../path/path-frontend';
import { PATH_IMAGE } from '../../lib/image-paths';
import { UserModel } from '../../types/models/user-model';

const useStyles = createStyles((theme) => ({
  link: {
    textDecoration: 'none',
  },
  card: {
    '&:hover': {
      background-color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[0],
    },
    // background-color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white,
    height: 500,
    // width: 300,
    // padding: 10,
    // display: 'flex',
    // flex-direction: 'column',
    // gridRowEnd: 'span 1',
    // cursor: 'pointer',
    // '&:hover': {
    //   background-color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    // },
    zIndex: 50,
  },

  bgImage: {
    background: 'linearGradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
    height: '100%',
    zIndex: 50,
  },
  bgImageGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
    zIndex: 51,
  },

  title: {
    fontWeight: 700,
    fontSize: 32,
    textAlign: 'center',
    font-family: Greycliff CF, var(--mantine-font-family),
    wordBreak: 'break-word',
    lineHeight: 1.2,
    zIndex: 55,
  },

  appear: {
    zIndex: 55,
  },

  body: {
    padding: var(--mantine-spacing-md),
    display: 'flex',
    flex-direction: 'column',
    justifyContent: 'center',
    height: '100%',
    // zIndex: 55,
  },
}));

export interface CardData {
  _id: string;
  name: string;
  address: string;
  createdAt: string;
  user?: UserModel;
  onClick?: () => void;
  href: string;
}

interface CardArticleImageDescFooterVerticalProps {
  // data: SpaceModel | OrganizationModel;
}
export function CardArticleVerticalTextCenter({ data, sx }: { data?: CardData; sx?: Sx }) {
  // const description =
  //   data.description?.length > 50 ? `${data.description.substring(0, 50)}...` : data.description;
  const { classes, cx } = useStyles();
  const router = useRouter();

  return (
    <Link href={data?.href || ''} className={classes.link}>
      <Card withBorder radius="md" p={0} className={classes.card} style={sx}>
        <BackgroundImage className={classes.bgImage} src="" radius="sm">
          <Box className={classes.bgImageGradient} />

          <div className={classes.body}>
            <Text className={cx(classes.title, classes.appear)}>
              {data?.name}
              {/* title */}
            </Text>
            <Text
              className={classes.appear}
              transform="uppercase"
              color="dimmed"
              weight={700}
              size="xs"
            >
              {/* description */}
            </Text>
            <Group noWrap className={classes.appear} spacing="xs">
              {data?.user && (
                <Group spacing="xs" noWrap>
                  <Avatar size={20} src="" />
                  <Text size="xs">{/**username */}</Text>
                </Group>
              )}
              <Text size="xs" color="dimmed">
                •
              </Text>
              <Text size="xs" color="dimmed">
                {/* date */}
              </Text>
            </Group>
          </div>
        </BackgroundImage>
      </Card>
    </Link>
  );
}
