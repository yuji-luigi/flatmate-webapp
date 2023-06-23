import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
import { Icons } from '../../data/icons';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface UserInfoIconsProps {
  avatar?: string | undefined | null;
  name: string;
  title: string;
  phone: string;
  email: string;
  address?: string;
}

export function UserInfoIcons({
  avatar = '',
  name = 'N/A',
  title = 'N/A',
  phone = 'N/A',
  email = 'N/A',
  address = 'N/A',
}: UserInfoIconsProps) {
  const { classes } = useStyles();
  return (
    <div>
      <Group noWrap>
        <Avatar src={avatar} size={94} radius="md" />
        <div>
          <Text fz="md" tt="uppercase" fw={700} c="dimmed">
            {title}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {name}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="md" c="dimmed">
              {email}
            </Text>
          </Group>
          <Group noWrap spacing={10} mt={3}>
            <Icons.mapPin stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="md" c="dimmed">
              {address}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="md" c="dimmed">
              {phone}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
