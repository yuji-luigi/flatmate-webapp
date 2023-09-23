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
import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore';
import { CARD_LINK_PATH, PATH_CLIENT } from '../../path/path-frontend';
import { PATH_IMAGE } from '../../lib/image-paths';
import { UserModel } from '../../types/models/user-model';
import { UploadModel } from '../../types/models/upload-model';

const useStyles = createStyles((theme) => ({
  link: {
    textDecoration: 'none',
  },
  card: {
    height: 500,
    cursor: 'pointer',
    [theme.fn.smallerThan('sm')]: {
      height: 300,
      width: 300,
    },
    // '&:hover': {
    //   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    // },
    zIndex: 40,
  },

  bgImage: {
    background: 'linearGradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
    height: '100%',
    zIndex: 40,
  },
  bgImageGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
    zIndex: 10,
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.5)',
    },
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    wordBreak: 'break-word',
    lineHeight: 1.2,
    zIndex: 60,
  },

  appear: {
    zIndex: 65,
  },

  body: {
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    height: '100%',
    // zIndex: 55,
  },
  text: {
    color: 'black',
    // color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  },
}));

export interface CardData {
  _id: string;
  name: string;
  address?: string;
  createdAt: string;
  user?: UserModel;
  cover?: UploadModel;
}

interface CardArticleImageDescFooterVerticalProps {
  // image?: string;
  // category: string;
  // title: string;
  // date: string;
  href?: string;
  onClick?: () => void;
  sx?: Sx;

  data: CardData;
  // data: SpaceModel | OrganizationModel;
}
export function CardArticleVerticalTextBottom({
  // image,
  // title,
  data,
  href,
  sx,
  onClick,
}: CardArticleImageDescFooterVerticalProps) {
  // const description =
  //   data.description?.length > 50 ? `${data.description.substring(0, 50)}...` : data.description;
  const { classes, cx } = useStyles();
  const router = useRouter();
  const content = (
    <Card withBorder radius="md" p={0} className={classes.card} onClick={onClick} sx={sx}>
      <BackgroundImage
        className={classes.bgImage}
        src={data.cover?.url || PATH_IMAGE.rootSpaceCard1}
        radius="sm"
      >
        <Box className={classes.bgImageGradient} />

        <div className={classes.body}>
          <Text className={cx(classes.title, classes.appear, classes.text)}>{data.name}</Text>
          <Text
            className={cx(classes.appear, classes.text)}
            transform="uppercase"
            color="dimmed"
            weight={700}
            size="xs"
          >
            {data.address}
          </Text>
          <Group noWrap className={cx(classes.appear)} spacing="xs">
            <Group spacing="xs" noWrap>
              {/* <Avatar size={20} src={''} /> */}
              <Text className={classes.text} size="xs">
                {data.user?.name}
              </Text>
            </Group>
            {data.createdAt && (
              <>
                <Text className={classes.text} size="xs" color="dimmed">
                  •
                </Text>
                <Text size="xs" color="dimmed">
                  {data.createdAt}
                </Text>
              </>
            )}
          </Group>
        </div>
      </BackgroundImage>
    </Card>
  );
  // if (!href && onClick) {
  //   return content;
  // }
  if (href) {
    return (
      <Link href={href} className={classes.link}>
        {content}
      </Link>
    );
  }
  return content;
}
