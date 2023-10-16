import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  Avatar,
  Box,
  createStyles,
  rem,
  Tooltip,
  Sx,
} from '@mantine/core';
import Link from 'next/link';
import { Icons } from '../../data/icons/icons';
import { IMAGES_ARRAY, PATH_IMAGE } from '../../lib/image-paths';
import { getRandomItemFromArray } from '../../utils/mock-data-functions';
import { Sections } from '../../types/general/data/sections-type';
import TextWithIcon from '../text/TextWithIcon';
import BadgeWithToolTip from '../text/BadgeWithToolTip';
import { UploadModel } from '../../types/models/upload-model';

const useStyles = createStyles((theme) => ({
  card: {
    background-color: light-dark(var(--mantine-color-gray-7), var(--mantine-color-white)),
  },
  address: {
    cursor: 'pointer',
  },
  avatar: {
    border: `${rem(4)} solid ${light-dark(var(--mantine-color-gray-7), var(--mantine-color-white))}`,
  },
  pinIcon: {
    marginRight: -4,
  },
}));

const ICON_SIZE = 16;

export interface UserCardData {
  _id: string;
  slug: string;
  avatar?: UploadModel;
  cover?: UploadModel;
  name: string;
  email?: string;
  address?: string;
  company?: string;
  type?: string;
  active?: boolean;
  badges?: string[];
  badgeIcon?: JSX.Element;
  badgeSx?: Sx;
}

export function CardMaintainer({ data, entity }: { data: UserCardData; entity: Sections }) {
  const { classes, theme } = useStyles();
  const dark = theme.colorScheme === 'dark';
  return (
    <Card
      component={Link}
      href={`${entity}/detail/${data.slug}`}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        cursor: 'pointer',
        // onhover shadow
        '&:hover': {
          background-color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Card.Section
        style={{
          backgroundImage: `url(${data.cover?.url || PATH_IMAGE.flatmateLogo1})`,
          height: 140,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* <Image src={data.avatar.url} height={160} alt="Norway" /> */}
      {/* </Card.Section> */}
      <Avatar
        src={data.avatar?.url || getRandomItemFromArray(IMAGES_ARRAY)}
        size={80}
        radius={80}
        mx="auto"
        mt={-40}
        className={classes.avatar}
      />
      <Group position="right" align="center">
        <Badge
          color="pink"
          variant="light"
          style={{ position: 'absolute', transform: 'translate(0, -24px)' }}
        >
          {data.type}
        </Badge>
      </Group>

      <Stack spacing={4}>
        {data.name && (
          <Text size="lg" weight={800}>
            {data.name}
          </Text>
        )}

        {data.company && (
          <TextWithIcon icon={<Icons.buildings size={ICON_SIZE} />} text={data.company} />
        )}

        {data.email && (
          <TextWithIcon
            style={{ marginBottom: 4 }}
            icon={<Icons.mail size={ICON_SIZE} />}
            text={data.email}
          />
        )}
        {data.address && (
          <TextWithIcon
            style={{ marginBottom: 4 }}
            icon={<Icons.mapPin size={ICON_SIZE} />}
            text={data.address}
          />
        )}

        <Group>
          {data.badges?.map((badge) => (
            <BadgeWithToolTip
              key={badge}
              icon={data.badgeIcon}
              text={badge || 'add address'}
              disabled={!badge}
              style={{ ...data.badgeSx }}
            />
          ))}
        </Group>
      </Stack>

      {/* <Text lineClamp={5} size="sm" color="dimmed">
        {data.description}
      </Text> */}

      {/* <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Details
      </Button> */}
    </Card>
  );
}
