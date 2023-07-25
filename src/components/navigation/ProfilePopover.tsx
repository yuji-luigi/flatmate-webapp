import {
  Popover,
  Text,
  Button,
  Group,
  Avatar,
  createStyles,
  getStylesRef,
  Box,
  Divider,
  Menu,
} from '@mantine/core';
import useAuth from '../../../hooks/useAuth';
import Link from 'next/link';
import { Icons } from '../../data/icons';
import { PATH_CLIENT } from '../../path/page-paths';

const useStyles = createStyles((theme /* , _params, getRef */) => {
  const icon = getStylesRef('icon') as string;

  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: `calc(${theme.spacing.md} * 1.5)`,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },
    flexVertical: {
      display: 'flex',
      flexDirection: 'column',
    },
    avatar: {
      cursor: 'pointer',
    },
    link: {
      // textDecoration: 'none',
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'light',
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const popoverList = [
  {
    title: 'Edit profile',
    icon: <Icons.user />,
    link: '/profile',
  },
  {
    title: 'Setting condominium',
    icon: <Icons.userSettings />,
    link: PATH_CLIENT.spaceSettings,
  },
];
export function ProfilePopover() {
  const { user, logout } = useAuth();
  const { classes, cx } = useStyles();

  return (
    <Menu position="bottom" withArrow shadow="md">
      <Group className={classes.header} position="left">
        <Menu.Target>
          <Avatar className={classes.avatar} size={50} />
        </Menu.Target>
        <div className={classes.flexVertical}>
          <Text fw={700}>{user?.name}</Text>
          <Text fw={500}>{user?.email}</Text>
        </div>
      </Group>
      <Menu.Dropdown>
        <Menu.Label sx={{ textAlign: 'center' }}>Settings</Menu.Label>
        <Box px={8} py={16}>
          {/* // todo: onhover change color */}
          {popoverList.map((list) => (
            <Link
              key={list.title}
              className={cx(classes.link, {
                [classes.linkActive]: false,
              })}
              href={list.link}
            >
              {list.icon}
              {list.title}
            </Link>
          ))}
        </Box>
      </Menu.Dropdown>
    </Menu>
  );
}
